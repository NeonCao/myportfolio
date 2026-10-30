// Game builds look like "4.10.2-LIVE.12881860". Compare the numeric parts so 4.10 sorts after 4.9.
function parts(version) {
  return String(version ?? '')
    .split(/[^0-9]+/)
    .filter(Boolean)
    .map(Number);
}

export function compareVersions(a, b) {
  const left = parts(a);
  const right = parts(b);

  for (let index = 0; index < Math.max(left.length, right.length); index += 1) {
    const difference = (left[index] ?? 0) - (right[index] ?? 0);
    if (difference) {
      return difference;
    }
  }

  return 0;
}

// Builds look like "4.10.2-LIVE.12881860" (channel LIVE, PTU, EPTU...). Anything else is refused, because the
// version ends up in commit messages and must never carry shell or markdown text from the API.
export const VERSION_PATTERN = /^\d+\.\d+(\.\d+)?-[A-Za-z]+\.\d+$/;

// The API deprecated game_version in favour of version; read both while it migrates.
export function versionOf(entry) {
  return entry?.version ?? entry?.game_version ?? null;
}

export function latestVersion(versions) {
  return (
    versions
      .filter((version) => VERSION_PATTERN.test(String(version ?? '')))
      .sort(compareVersions)
      .at(-1) ?? null
  );
}

export function requireVersion(label, version) {
  if (!version) {
    throw new Error(`${label}: no valid game version in the API response; not writing a snapshot without one.`);
  }

  return version;
}

// Refuses to replace a snapshot with one that lost most of its entries, which is what an API outage
// or a changed response shape looks like. FORCE_SNAPSHOT=1 skips the check after a real removal.
export function assertNotShrunk(label, previousCount, nextCount, minimumShare = 0.8) {
  if (process.env.FORCE_SNAPSHOT === '1' || !previousCount) {
    return;
  }

  if (nextCount < previousCount * minimumShare) {
    throw new Error(
      `${label}: ${nextCount} entries vs ${previousCount} in the current snapshot. Not overwriting; set FORCE_SNAPSHOT=1 if this is expected.`
    );
  }
}
