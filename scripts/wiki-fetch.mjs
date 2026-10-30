// Shared, polite fetch for the snapshot scripts: one caller at a time, retries on rate limits,
// Cloudflare 5xx errors and dropped connections (all seen during unattended runs).
const BASE = 'https://api.star-citizen.wiki/api';
const MAX_ATTEMPTS = 6;

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function createGet(userAgent) {
  const headers = { Accept: 'application/json', 'User-Agent': userAgent };

  return async function get(path, attempt = 1) {
    let response;

    try {
      response = await fetch(`${BASE}${path}`, { headers });
    } catch (error) {
      if (attempt < MAX_ATTEMPTS) {
        console.warn(`network error on ${path} (${error.message}), retrying`);
        await sleep(5000 * attempt);
        return get(path, attempt + 1);
      }
      throw error;
    }

    if ((response.status === 429 || response.status >= 500) && attempt < MAX_ATTEMPTS) {
      const wait = Number(response.headers.get('retry-after')) || 15 * attempt;
      console.warn(`${response.status} on ${path}, waiting ${wait}s`);
      await sleep(wait * 1000);
      return get(path, attempt + 1);
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} for ${path}`);
    }

    return response.json();
  };
}
