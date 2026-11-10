// Index over src/data/missions.json (built by scripts/fetch-missions.mjs): every released contract with its
// giver, the standing it needs, its pay, its reputation gain and the blueprints it can award.

const TRACK_LABELS = {
  FactionReputation: 'Standing',
  MissionProviderReputation: 'Standing',
  BountyHunter: 'Bounty hunting',
};

const spaced = (name) =>
  String(name)
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .trim();

// "HiredMuscle" -> "Hired Muscle". Some tracks carry the faction after an underscore
// ("BountyHunter_BountyHuntersGuild"); the faction is already shown next to the label.
export function trackLabel(track) {
  if (!track) {
    return null;
  }

  const [kind] = String(track).split('_');
  return TRACK_LABELS[kind] ?? spaced(kind);
}

const DIFFICULTY = { VE: 'very easy', E: 'easy', M: 'medium', H: 'hard', VH: 'very hard', S: 'super' };

// About one title in five reaches the data as an unfilled text token ("[Contractor|BountyTitleHard]"), because
// the game writes the real title when the contract is offered. The token still says what the contract is.
export function readableTitle(title) {
  const token = /^\[\w+(?:\|(\w+))?\]$/.exec(String(title ?? '').trim());

  if (!token) {
    // Tokens inside a real title ("Active Bounty: [TargetName]") stand for a name the game fills in later.
    return String(title ?? '').replace(/\[(\w+)\]/g, (match, name) => `[${spaced(name).toLowerCase()}]`);
  }
  if (!token[1]) {
    return 'Contract';
  }

  const [name, level = ''] = token[1].split('Title');
  const difficulty = DIFFICULTY[level.replace(/_/g, '')] ?? spaced(level).toLowerCase();

  return `${spaced(name)}${difficulty ? ` (${difficulty})` : ''}`;
}

const sameTier = (a, b) => (a?.rep ?? null) === (b?.rep ?? null) && (a?.name ?? null) === (b?.name ?? null);

function normalize(mission) {
  return {
    id: mission.id,
    title: readableTitle(mission.title),
    slug: mission.slug ?? null,
    giver: mission.giver ?? null,
    faction: mission.faction ?? null,
    track: mission.track ?? null,
    type: mission.type ?? null,
    systems: mission.systems ?? [],
    illegal: Boolean(mission.illegal),
    pay: mission.pay ?? null,
    payMax: mission.payMax ?? null,
    currency: mission.currency ?? 'aUEC',
    rep: mission.rep ?? null,
    tier: mission.tier ?? null,
    tierMax: mission.tierMax ?? null,
    minutes: mission.minutes ?? null,
    cooldown: mission.cooldown ?? null,
    shareable: Boolean(mission.shareable),
    once: Boolean(mission.once),
    combat: Boolean(mission.combat),
    chain: Boolean(mission.chain),
    prison: Boolean(mission.prison),
    enemies: mission.enemies ?? null,
    cargo: mission.cargo ?? [],
    blueprints: mission.blueprints ?? [],
  };
}

const range = (values) => {
  const known = values.filter((value) => typeof value === 'number');
  return known.length ? { min: Math.min(...known), max: Math.max(...known) } : null;
};

// The game holds one record per location or difficulty of the same contract ("Assassination" x 40).
// They are shown as one line: same title, giver, reputation track and standing.
export function groupContracts(missions) {
  const groups = new Map();

  missions.forEach((mission) => {
    const key = [
      mission.title,
      mission.giver,
      mission.faction,
      mission.track,
      mission.tier?.rep,
      mission.tierMax?.rep,
      mission.illegal,
    ].join('|');

    if (!groups.has(key)) {
      groups.set(key, []);
    }

    groups.get(key).push(mission);
  });

  return [...groups.entries()].map(([key, variants]) => {
    const first = variants[0];
    const pools = new Map();

    variants.forEach((variant) =>
      variant.blueprints.forEach((pool) => {
        const poolKey = pool.items
          .map((item) => item.id)
          .sort()
          .join(',');

        if (!pools.has(poolKey)) {
          pools.set(poolKey, pool);
        }
      })
    );

    return {
      key,
      title: first.title,
      slug: first.slug,
      giver: first.giver,
      faction: first.faction,
      track: first.track,
      type: first.type,
      illegal: first.illegal,
      tier: first.tier,
      tierMax: first.tierMax,
      currency: first.currency,
      count: variants.length,
      systems: [...new Set(variants.flatMap((variant) => variant.systems))].sort(),
      pay: range(variants.flatMap((variant) => [variant.pay, variant.payMax])),
      rep: range(variants.map((variant) => variant.rep)),
      minutes: range(variants.map((variant) => variant.minutes)),
      cooldown: range(variants.map((variant) => variant.cooldown)),
      enemies: range(variants.flatMap((variant) => variant.enemies ?? [])),
      cargo: [...new Set(variants.flatMap((variant) => variant.cargo))].sort(),
      blueprints: [...pools.values()],
      shareable: variants.some((variant) => variant.shareable),
      once: variants.every((variant) => variant.once),
      combat: variants.some((variant) => variant.combat),
      chain: variants.some((variant) => variant.chain),
      prison: variants.some((variant) => variant.prison),
    };
  });
}

// A reputation track is one ladder you climb: a faction plus the kind of work ("Hurston Dynamics", "Security").
// Its tiers are the standings that at least one contract asks for, lowest first.
function buildTracks(contracts) {
  const tracks = new Map();

  contracts
    .filter((contract) => contract.faction && contract.track && contract.rep)
    .forEach((contract) => {
      const key = `${contract.faction}|${contract.track}`;

      if (!tracks.has(key)) {
        tracks.set(key, { key, faction: contract.faction, track: contract.track, contracts: [] });
      }

      tracks.get(key).contracts.push(contract);
    });

  return [...tracks.values()]
    .map((track) => {
      const tiers = [];

      track.contracts.forEach((contract) => {
        [contract.tier, contract.tierMax].forEach((tier) => {
          if (tier && !tiers.some((known) => known.rep === tier.rep)) {
            tiers.push(tier);
          } else if (tier?.name) {
            // The same threshold sometimes arrives once with a name and once without; keep the name.
            const known = tiers.find((entry) => entry.rep === tier.rep);
            known.name = known.name ?? tier.name;
          }
        });
      });

      return {
        ...track,
        label: `${track.faction} · ${trackLabel(track.track)}`,
        givers: [...new Set(track.contracts.map((contract) => contract.giver).filter(Boolean))].sort(),
        tiers: tiers.sort((a, b) => a.rep - b.rep),
      };
    })
    .sort((a, b) => b.contracts.length - a.contracts.length || a.label.localeCompare(b.label));
}

const offeredAt = (contract, tier) =>
  (contract.tier?.rep ?? -Infinity) <= tier.rep && (contract.tierMax === null || contract.tierMax.rep >= tier.rep);

const byReputation = (a, b) =>
  b.rep.max - a.rep.max || (b.pay?.max ?? 0) - (a.pay?.max ?? 0) || a.title.localeCompare(b.title);
const byPay = (a, b) =>
  b.pay.max - a.pay.max || (b.rep?.max ?? 0) - (a.rep?.max ?? 0) || a.title.localeCompare(b.title);

// For every tier of a track: what you can take there, which contract moves you up fastest, which pays best,
// and how many runs of the fastest one it takes to reach the next tier. Contracts with no standing requirement
// are on offer at every tier.
export function planTrack(track, { top = 3 } = {}) {
  const tiers = track.tiers.length ? track.tiers : [{ name: null, rep: 0 }];

  return tiers.map((tier, index) => {
    const offered = track.contracts.filter((contract) => offeredAt(contract, tier));
    const repeatable = offered.filter((contract) => !contract.once);
    const pool = repeatable.length ? repeatable : offered;
    const bestReputation = [...pool].sort(byReputation).slice(0, top);
    const bestPay = pool
      .filter((contract) => contract.pay)
      .sort(byPay)
      .slice(0, top);
    const next = tiers[index + 1] ?? null;
    const fastest = bestReputation[0] ?? null;

    return {
      tier,
      next,
      offered,
      unlocked: offered.filter((contract) => sameTier(contract.tier, tier) || (!contract.tier && index === 0)),
      bestReputation,
      bestPay,
      reputationToNext: next ? next.rep - tier.rep : null,
      runsToNext: next && fastest ? Math.ceil((next.rep - tier.rep) / fastest.rep.max) : null,
    };
  });
}

const SORTS = {
  reputation: (a, b) => (b.rep?.max ?? -1) - (a.rep?.max ?? -1) || a.title.localeCompare(b.title),
  pay: (a, b) => (b.pay?.max ?? -1) - (a.pay?.max ?? -1) || a.title.localeCompare(b.title),
  tier: (a, b) => (a.tier?.rep ?? -Infinity) - (b.tier?.rep ?? -Infinity) || a.title.localeCompare(b.title),
  title: (a, b) => a.title.localeCompare(b.title),
};

export const CONTRACT_SORTS = Object.keys(SORTS);

export function filterContracts(
  contracts,
  {
    query = '',
    faction = '',
    track = '',
    system = '',
    type = '',
    legality = '',
    blueprintsOnly = false,
    sort = 'title',
  }
) {
  const needle = query.trim().toLowerCase();

  return contracts
    .filter((contract) => {
      if (faction && contract.faction !== faction) return false;
      if (track && contract.track !== track) return false;
      if (system && !contract.systems.includes(system)) return false;
      if (type && contract.type !== type) return false;
      if (legality && contract.illegal !== (legality === 'illegal')) return false;
      if (blueprintsOnly && !contract.blueprints.length) return false;
      if (!needle) return true;

      return [
        contract.title,
        contract.giver,
        contract.faction,
        ...contract.cargo,
        ...contract.blueprints.flatMap((pool) => pool.items.map((item) => item.name)),
      ].some((value) => value && value.toLowerCase().includes(needle));
    })
    .sort(SORTS[sort] ?? SORTS.title);
}

export function createMissionIndex(snapshot) {
  const contracts = groupContracts((snapshot.missions ?? []).map(normalize));
  const byBlueprint = new Map();

  contracts.forEach((contract) =>
    contract.blueprints.forEach((pool) =>
      pool.items.forEach((item) => {
        if (!byBlueprint.has(item.id)) {
          byBlueprint.set(item.id, []);
        }

        byBlueprint.get(item.id).push({ contract, chance: pool.chance, poolSize: pool.items.length });
      })
    )
  );

  const distinct = (pick) => [...new Set(contracts.flatMap(pick).filter(Boolean))].sort();

  return {
    // False for the placeholder committed before the first `npm run data:contracts`.
    ready: snapshot.source !== 'placeholder' && Array.isArray(snapshot.missions),
    gameVersion: snapshot.gameVersion ?? null,
    fetchedAt: snapshot.fetchedAt ?? null,
    missionCount: snapshot.missions?.length ?? 0,
    contracts,
    tracks: buildTracks(contracts),
    factions: distinct((contract) => [contract.faction]),
    systems: distinct((contract) => contract.systems),
    types: distinct((contract) => [contract.type]),
    // Contracts that can award the blueprint of this item.
    blueprintSources: (itemId) => byBlueprint.get(itemId) ?? [],
  };
}

export async function loadMissionIndex() {
  const module = await import('../../data/missions.json');
  return createMissionIndex(module.default ?? module);
}
