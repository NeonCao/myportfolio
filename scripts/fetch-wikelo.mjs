// Builds src/data/wikeloContracts.json from the Star Citizen Wiki API.
// Run with `npm run data:wikelo` after a game patch. The page reads the snapshot so it can answer
// "which Wikelo trades give or use this item" without 90 API calls per visit.
import { readFile, writeFile } from 'node:fs/promises';
import { assertNotShrunk, latestVersion, requireVersion, versionOf } from './game-version.mjs';
import { createGet, sleep } from './wiki-fetch.mjs';

const OUTPUT = new URL('../src/data/wikeloContracts.json', import.meta.url);
const get = createGet('neon-portfolio-item-finder/1.0 (wikelo snapshot)');
const DELAY_MS = 1100;

const KEEP = [
  'uuid',
  'title',
  'debug_name',
  'not_for_release',
  'work_in_progress',
  'released',
  'once_only',
  'min_standing',
  'max_standing',
  'reputation_gained',
  'reputation_prerequisite',
  'hauling_orders',
  'reward_items',
  'reward_groups',
  'blueprints',
  'prerequisite_groups',
  'mission_tokens',
  'reward_min',
  'reward_max',
  'reward_currency',
  'game_version',
  'version',
];

// Nested entries repeat API and web URLs for every item; the page rebuilds what it needs from uuids.
// blueprint_link is kept because it is the only place the blueprint uuid appears.
function stripLinks(value) {
  if (Array.isArray(value)) {
    return value.map(stripLinks);
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => key === 'blueprint_link' || !/(^|_)link$|web_url/.test(key))
        .map(([key, entry]) => [key, stripLinks(entry)])
    );
  }

  return value;
}

function pick(raw) {
  return stripLinks(Object.fromEntries(KEEP.filter((key) => raw[key] !== undefined).map((key) => [key, raw[key]])));
}

// Thumbnails for what Wikelo hands out (ships, weapons, armor), so the trade list can show them without
// one item request per row in the browser. Only the wiki's media host is kept.
function thumbnailOf(item) {
  for (const image of item?.images ?? []) {
    for (const candidate of [image?.thumbnail_url, image?.original_url]) {
      try {
        const url = new URL(candidate);
        if (url.protocol === 'https:' && url.hostname === 'media.starcitizen.tools') {
          return url.href;
        }
      } catch {
        // not a URL; try the next one
      }
    }
  }

  return null;
}

async function fetchRewardImages(contracts) {
  const ids = new Set();
  contracts.forEach((contract) => {
    [...(contract.reward_groups ?? []).flatMap((group) => group.items ?? []), ...(contract.reward_items ?? [])].forEach(
      (item) => item?.uuid && ids.add(item.uuid)
    );
    (contract.blueprints ?? []).flatMap((pool) => pool.items ?? []).forEach((item) => item?.uuid && ids.add(item.uuid));
  });

  const images = {};
  for (const [index, id] of [...ids].entries()) {
    await sleep(DELAY_MS);
    try {
      const url = thumbnailOf((await get(`/items/${id}`)).data);
      if (url) {
        images[id] = url;
      }
    } catch (error) {
      // A missing picture is cosmetic; keep going.
      console.warn(`no image for ${id}: ${error.message}`);
    }
    if ((index + 1) % 25 === 0) {
      console.log(`images ${index + 1}/${ids.size}`);
    }
  }

  return images;
}

async function previousCount(select) {
  try {
    return select(JSON.parse(await readFile(OUTPUT, 'utf8')))?.length ?? 0;
  } catch {
    return 0;
  }
}

async function main() {
  const list = [];
  for (let page = 1; ; page += 1) {
    const json = await get(`/missions?filter[mission_giver]=Wikelo&page[size]=100&page[number]=${page}`);
    list.push(...json.data);
    if (page >= (json.meta?.last_page ?? 1)) {
      break;
    }
    await sleep(DELAY_MS);
  }

  // Some contracts share a uuid across variants in the list; fetch each detail once.
  const ids = [...new Set(list.map((mission) => mission.uuid))];
  const contracts = [];
  let ladder = null;

  for (const [index, id] of ids.entries()) {
    await sleep(DELAY_MS);
    const { data } = await get(`/missions/${id}`);
    ladder = ladder ?? data.faction?.reputation_ladder ?? null;
    contracts.push(pick(data));
    console.log(`${index + 1}/${ids.length} ${data.title}`);
  }

  assertNotShrunk('Wikelo contracts', await previousCount((snapshot) => snapshot.contracts), contracts.length);
  const rewardImages = await fetchRewardImages(contracts);

  const snapshot = {
    source: 'https://api.star-citizen.wiki',
    fetchedAt: new Date().toISOString(),
    gameVersion: requireVersion('Wikelo contracts', latestVersion(contracts.map(versionOf))),
    reputationLadder: ladder,
    rewardImages,
    contracts: contracts.sort((a, b) => a.title.localeCompare(b.title)),
  };

  await writeFile(OUTPUT, `${JSON.stringify(snapshot, null, 1)}\n`);
  console.log(`Wrote ${contracts.length} contracts to ${OUTPUT.pathname}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
