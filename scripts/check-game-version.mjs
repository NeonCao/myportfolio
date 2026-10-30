// Cheap check (one API request) for whether the game data moved on since the committed snapshots.
// Prints the result and, inside GitHub Actions, writes `changed`, `live` and `snapshot` step outputs.
import { appendFile, readFile } from 'node:fs/promises';
import { VERSION_PATTERN, compareVersions, latestVersion, versionOf } from './game-version.mjs';
import { createGet } from './wiki-fetch.mjs';

const LIVE_PATH = '/missions?filter[mission_giver]=Wikelo&page[size]=100';
const SNAPSHOTS = ['../src/data/wikeloContracts.json', '../src/data/missionRewards.json'];
const get = createGet('neon-portfolio-item-finder/1.0 (version check)');

async function snapshotVersion(path) {
  try {
    const snapshot = JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'));
    // The placeholder has no version, so it always counts as out of date.
    const version = snapshot.source === 'placeholder' ? null : snapshot.gameVersion;
    return VERSION_PATTERN.test(String(version ?? '')) ? version : null;
  } catch {
    return null;
  }
}

async function main() {
  const { data } = await get(LIVE_PATH);
  const live = latestVersion(data.map(versionOf));
  if (!live) {
    throw new Error('The API returned no valid game version; refusing to guess.');
  }

  const versions = await Promise.all(SNAPSHOTS.map(snapshotVersion));
  // The oldest snapshot decides: if either is behind (or missing), both are rebuilt.
  const snapshot = versions.includes(null) ? null : versions.sort(compareVersions)[0];
  const changed = !snapshot || compareVersions(live, snapshot) > 0;

  console.log(`live ${live}, snapshot ${snapshot ?? 'none'} -> ${changed ? 'refresh needed' : 'up to date'}`);

  if (process.env.GITHUB_OUTPUT) {
    await appendFile(
      process.env.GITHUB_OUTPUT,
      `changed=${changed}
live=${live}
snapshot=${snapshot ?? ''}
`
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
