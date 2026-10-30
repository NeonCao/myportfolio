// Builds src/data/missionRewards.json: every released mission that hands out items, so the page can
// answer "which missions give this item" (ASD Secure Drives, scrip, medals...). The API has no reverse
// lookup, so this reads each mission once. Run with `npm run data:missions` after a game patch; it takes
// about half an hour because it stays at one request per second.
import { readFile, writeFile } from 'node:fs/promises';
import { assertNotShrunk, latestVersion, requireVersion, versionOf } from './game-version.mjs';
import { createGet, sleep } from './wiki-fetch.mjs';

const OUTPUT = new URL('../src/data/missionRewards.json', import.meta.url);
const get = createGet('neon-portfolio-item-finder/1.0 (mission reward index)');
const DELAY_MS = 1100;
// Wikelo trades are covered in more detail by wikeloContracts.json.
const SKIPPED_GIVERS = new Set(['Wikelo']);

function systemsOf(mission) {
  return [
    ...new Set(
      (mission.star_systems ?? []).map((system) => (typeof system === 'string' ? system : system?.name)).filter(Boolean)
    ),
  ];
}

function rewardsOf(mission) {
  const byId = new Map();

  (mission.reward_groups?.length
    ? mission.reward_groups.flatMap((group) => group.items ?? [])
    : (mission.reward_items ?? [])
  ).forEach((item) => {
    if (item?.uuid && !byId.has(item.uuid)) {
      byId.set(item.uuid, { uuid: item.uuid, name: item.name, amount: item.amount ?? 1 });
    }
  });

  return [...byId.values()];
}

async function previousCount(select) {
  try {
    const previous = JSON.parse(await readFile(OUTPUT, 'utf8'));
    return previous.source === 'placeholder' ? 0 : (select(previous)?.length ?? 0);
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

  const candidates = list.filter(
    (mission) => mission.released && !mission.not_for_release && !SKIPPED_GIVERS.has(mission.mission_giver)
  );
  const missions = [];
  const versions = [];
  let skipped = 0;

  for (const [index, summary] of candidates.entries()) {
    await sleep(DELAY_MS);
    let data;

    try {
      ({ data } = await get(`/missions/${summary.uuid}`));
    } catch (error) {
      skipped += 1;
      console.warn(`skip ${summary.uuid}: ${error.message}`);
      continue;
    }

    const rewards = rewardsOf(data);
    if (versionOf(data)) {
      versions.push(versionOf(data));
    }

    if (rewards.length) {
      missions.push({
        uuid: data.uuid,
        title: data.title,
        giver: data.mission_giver ?? null,
        scope: data.reward_scope ?? null,
        systems: systemsOf(data),
        randomReward: (data.reward_groups?.length ?? 0) > 1,
        rewards,
      });
    }

    if ((index + 1) % 50 === 0) {
      console.log(`${index + 1}/${candidates.length} read, ${missions.length} give items`);
    }
  }

  assertNotShrunk('Item-rewarding missions', await previousCount((snapshot) => snapshot.missions), missions.length);
  // Too many unreadable missions means the index would silently miss sources; fail instead.
  if (skipped > candidates.length * 0.05) {
    throw new Error(`${skipped} of ${candidates.length} missions could not be read; not writing a partial index.`);
  }

  const snapshot = {
    source: 'https://api.star-citizen.wiki',
    fetchedAt: new Date().toISOString(),
    gameVersion: requireVersion('Item-rewarding missions', latestVersion(versions)),
    missions: missions.sort((a, b) => a.title.localeCompare(b.title)),
  };

  await writeFile(OUTPUT, `${JSON.stringify(snapshot)}\n`);
  console.log(`Wrote ${missions.length} item-rewarding missions to ${OUTPUT.pathname}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
