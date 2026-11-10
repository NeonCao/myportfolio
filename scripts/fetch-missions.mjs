// Builds src/data/missions.json: every released contract with who gives it, the standing it needs, what it
// pays in aUEC and reputation, and the blueprints it can award. The Mission Grinder view is built on it.
// The list endpoint carries almost everything; only contracts flagged as awarding blueprints are read one by
// one, so a run takes about eight minutes at one request per second. Run with `npm run data:contracts`.
import { readFile, writeFile } from 'node:fs/promises';
import { assertNotShrunk, latestVersion, requireVersion, versionOf } from './game-version.mjs';
import { createGet, sleep } from './wiki-fetch.mjs';

const OUTPUT = new URL('../src/data/missions.json', import.meta.url);
const get = createGet('neon-portfolio-item-finder/1.0 (mission grinder index)');
const DELAY_MS = 1100;
// Wikelo trades have their own view, built from wikeloContracts.json.
const SKIPPED_GIVERS = new Set(['Wikelo']);
// Unfilled text tokens that leak out of the game files instead of a real name.
const PLACEHOLDER = /^(<=|~mission\(|SENDER NOT FOUND)/;

const clean = (name) =>
  typeof name === 'string' && name.trim() && !PLACEHOLDER.test(name.trim()) ? name.trim() : null;

function standing(entry) {
  if (!entry || typeof entry.min_reputation !== 'number') {
    return null;
  }

  return { name: clean(entry.name), rep: entry.min_reputation };
}

// The reputation a contract is really run for: its biggest gain, ignoring the small "affinity" side reward.
function mainReputation(mission) {
  const gains = (mission.reputation_gained ?? []).filter((gain) => gain.amount > 0);
  const main = gains.filter((gain) => gain.scope !== 'Affinity').sort((a, b) => b.amount - a.amount)[0] ?? gains[0];

  return main ? { faction: clean(main.faction), track: main.scope ?? null, amount: main.amount } : null;
}

function blueprintsOf(detail) {
  return (detail.blueprints ?? [])
    .map((pool) => ({
      chance: typeof pool.drop_chance === 'number' ? pool.drop_chance : null,
      items: (pool.items ?? []).filter((item) => item?.uuid).map((item) => ({ id: item.uuid, name: item.name })),
    }))
    .filter((pool) => pool.items.length);
}

// Only what is set is written, which keeps the file small: most contracts have no cargo, enemies or limits.
function compact(record) {
  return Object.fromEntries(
    Object.entries(record).filter(
      ([, value]) =>
        value !== null && value !== undefined && value !== false && !(Array.isArray(value) && !value.length)
    )
  );
}

function summarise(mission, blueprints) {
  const reputation = mainReputation(mission);
  const systems = (mission.star_systems ?? [])
    .map((system) => (typeof system === 'string' ? system : system?.name))
    .filter(Boolean);

  return compact({
    id: mission.uuid,
    title: clean(mission.title) ?? mission.debug_name ?? 'Untitled contract',
    slug:
      String(mission.web_url ?? '')
        .split('/')
        .pop() || null,
    giver: clean(mission.mission_giver),
    faction: reputation?.faction ?? clean(mission.faction?.name),
    track: reputation?.track ?? null,
    type: mission.reward_scope ?? null,
    systems: [...new Set(systems)].sort(),
    illegal: Boolean(mission.illegal),
    pay: mission.reward_min || null,
    payMax: mission.reward_max || null,
    currency: mission.reward_currency && mission.reward_currency !== 'UEC' ? mission.reward_currency : null,
    rep: reputation?.amount ?? null,
    tier: standing(mission.min_standing),
    tierMax: standing(mission.max_standing),
    minutes: mission.time_to_complete_minutes || null,
    cooldown: mission.cooldown_seconds > 60 ? mission.cooldown_seconds : null,
    shareable: Boolean(mission.shareable),
    once: Boolean(mission.once_only),
    combat: Boolean(mission.has_combat),
    chain: Boolean(mission.has_chain),
    prison: Boolean(mission.available_in_prison),
    enemies: mission.enemy_count_max ? [mission.enemy_count_min ?? 0, mission.enemy_count_max] : null,
    cargo: (mission.hauling_summary ?? []).map((cargo) => cargo?.name).filter(Boolean),
    blueprints,
  });
}

async function previousCount() {
  try {
    const previous = JSON.parse(await readFile(OUTPUT, 'utf8'));
    return previous.source === 'placeholder' ? 0 : (previous.missions?.length ?? 0);
  } catch {
    return 0;
  }
}

async function main() {
  const list = [];

  for (let page = 1; ; page += 1) {
    const json = await get(`/missions?page[size]=100&page[number]=${page}`);
    list.push(...json.data);
    if (page >= (json.meta?.last_page ?? 1)) {
      break;
    }
    await sleep(DELAY_MS);
  }

  const released = list.filter(
    (mission) => mission.released && !mission.not_for_release && !SKIPPED_GIVERS.has(mission.mission_giver)
  );
  const withBlueprints = released.filter((mission) => mission.has_blueprints);
  const blueprints = new Map();
  let skipped = 0;

  for (const [index, mission] of withBlueprints.entries()) {
    await sleep(DELAY_MS);

    try {
      blueprints.set(mission.uuid, blueprintsOf((await get(`/missions/${mission.uuid}`)).data));
    } catch (error) {
      skipped += 1;
      console.warn(`skip ${mission.uuid}: ${error.message}`);
    }

    if ((index + 1) % 50 === 0) {
      console.log(`${index + 1}/${withBlueprints.length} blueprint contracts read`);
    }
  }

  // Too many unreadable contracts means blueprint sources would silently go missing; fail instead.
  if (skipped > withBlueprints.length * 0.05) {
    throw new Error(`${skipped} of ${withBlueprints.length} blueprint contracts could not be read; not writing.`);
  }

  const missions = released
    .map((mission) => summarise(mission, blueprints.get(mission.uuid) ?? []))
    .sort((a, b) => a.title.localeCompare(b.title) || a.id.localeCompare(b.id));

  assertNotShrunk('Contracts', await previousCount(), missions.length);

  const snapshot = {
    source: 'https://api.star-citizen.wiki',
    fetchedAt: new Date().toISOString(),
    gameVersion: requireVersion('Contracts', latestVersion(released.map(versionOf))),
    missions,
  };

  await writeFile(OUTPUT, `${JSON.stringify(snapshot)}\n`);
  console.log(`Wrote ${missions.length} contracts (${blueprints.size} with blueprints) to ${OUTPUT.pathname}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
