import { idFromLink } from './wikiApi';

export const WIKELO_FAVOR_NAME = 'Wikelo Favor';
export const POLARIS_BIT_NAME = 'Polaris Bit';

// Contract kinds come from CIG's internal contract names (TheCollector_Vehicle_..., TheCollector_Favours_...).
function contractKind(debugName = '') {
  if (/_Favours_/i.test(debugName)) {
    return 'currency';
  }

  if (/_Vehicle_Ground_/i.test(debugName)) {
    return 'vehicle';
  }

  if (/_Vehicle_/i.test(debugName)) {
    return 'ship';
  }

  if (/_Intro$|_FoodOrder$/i.test(debugName)) {
    return 'other';
  }

  return 'gear';
}

function normalizeInput(order) {
  if (order.kind === 'Resource') {
    return {
      kind: 'resource',
      id: order.uuid,
      name: order.name,
      amount: null,
      scu: order.max_scu ?? order.min_scu ?? null,
    };
  }

  // max_amount is the quantity Wikelo asks for; min_amount is often left empty.
  return {
    kind: 'item',
    id: order.uuid,
    name: order.name,
    amount: order.max_amount ?? order.min_amount ?? 1,
    scu: null,
  };
}

function normalizeRewardItem(item) {
  return { id: item.uuid, name: item.name, amount: item.amount ?? 1 };
}

// One group: everything in it is handed out. Several groups: one is picked at random,
// weighted, so zero-weight groups never come up.
function normalizeRewards(raw) {
  const groups = raw.reward_groups ?? [];

  if (groups.length > 1) {
    return {
      random: true,
      sets: groups
        .filter((group) => (group.weight ?? 1) > 0)
        .map((group) => (group.items ?? []).map(normalizeRewardItem)),
    };
  }

  const items = groups.length ? (groups[0].items ?? []) : (raw.reward_items ?? []);
  return { random: false, sets: [items.map(normalizeRewardItem)] };
}

function normalizeStanding(standing) {
  return standing ? { name: standing.name, reputation: standing.min_reputation ?? null } : null;
}

export function normalizeWikeloContract(raw) {
  const reputationGained = (raw.reputation_gained ?? [])
    .filter((entry) => !entry.scope || entry.scope === 'Wikelo')
    .reduce((sum, entry) => sum + (entry.amount ?? 0), 0);

  return {
    id: raw.uuid,
    title: raw.title,
    kind: contractKind(raw.debug_name),
    available: Boolean(raw.released) && !raw.not_for_release && !raw.work_in_progress,
    onceOnly: Boolean(raw.once_only),
    reputationGained,
    minStanding: normalizeStanding(raw.reputation_prerequisite?.min_standing),
    inputs: (raw.hauling_orders ?? []).map(normalizeInput),
    rewards: normalizeRewards(raw),
    blueprints: (raw.blueprints ?? []).flatMap((pool) =>
      (pool.items ?? []).map((item) => ({
        itemId: item.uuid,
        name: item.name,
        blueprintId: idFromLink(item.blueprint_link),
        chancePercent: pool.drop_chance_percent ?? null,
      }))
    ),
    stations: raw.mission_tokens?.['destination|ListAll'] ?? [],
    prerequisites: (raw.prerequisite_groups ?? []).flatMap((group) =>
      (group.missions ?? []).map((mission) => mission.title)
    ),
    version: raw.version ?? raw.game_version ?? null,
  };
}

export function rewardItems(contract) {
  return contract.rewards.sets.flat();
}

export function createWikeloIndex(snapshot) {
  const contracts = (snapshot.contracts ?? [])
    .filter((raw) => raw.uuid && raw.title && !raw.title.startsWith('<='))
    .map(normalizeWikeloContract);
  const byId = new Map(contracts.map((contract) => [contract.id, contract]));
  const givers = new Map();
  const blueprintGivers = new Map();
  const users = new Map();

  const add = (map, id, contract) => {
    if (!id) {
      return;
    }

    if (!map.has(id)) {
      map.set(id, []);
    }

    if (!map.get(id).includes(contract)) {
      map.get(id).push(contract);
    }
  };

  contracts.forEach((contract) => {
    rewardItems(contract).forEach((item) => add(givers, item.id, contract));
    contract.blueprints.forEach((blueprint) => add(blueprintGivers, blueprint.itemId, contract));
    contract.inputs.forEach((input) => add(users, input.id, contract));
  });

  const byAvailability = (list = []) =>
    [...list].sort((a, b) => Number(b.available) - Number(a.available) || a.title.localeCompare(b.title));
  const ladder = (snapshot.reputationLadder?.standings ?? [])
    .map((standing) => ({ name: standing.display_name ?? standing.name, reputation: standing.min_reputation ?? 0 }))
    .sort((a, b) => a.reputation - b.reputation);

  return {
    contracts,
    ladder,
    gameVersion: snapshot.gameVersion ?? null,
    fetchedAt: snapshot.fetchedAt ?? null,
    get: (id) => byId.get(id) ?? null,
    // Thumbnail for a reward item, captured when the snapshot was built (null if none).
    imageFor: (itemId) => snapshot.rewardImages?.[itemId] ?? null,
    // Contracts that hand out the item itself.
    giving: (itemId) => byAvailability(givers.get(itemId)),
    // Contracts that hand out a blueprint for the item (you still craft it yourself).
    givingBlueprint: (itemId) => byAvailability(blueprintGivers.get(itemId)),
    // Contracts that ask for the item or resource as an input.
    using: (id) => byAvailability(users.get(id)),
  };
}

// The one rule for "Wikelo is a source of this item": a currently offered trade gives the item itself.
export function liveTradesGiving(index, itemId) {
  return index.giving(itemId).filter((contract) => contract.available);
}

let indexPromise = null;

// The snapshot is ~100 kB, so it loads in its own chunk the first time the page needs it.
export function loadWikeloIndex() {
  if (!indexPromise) {
    indexPromise = import('../../data/wikeloContracts.json')
      .then((module) => createWikeloIndex(module.default ?? module))
      .catch((error) => {
        indexPromise = null;
        throw error;
      });
  }

  return indexPromise;
}
