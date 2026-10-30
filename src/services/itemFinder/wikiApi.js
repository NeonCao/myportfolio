import { UNKNOWN_SYSTEM, formatScu } from './format';
import { pickItemImage } from './images';
import { describeLoot } from './loot';
import { extractStats } from './stats';

const DEFAULT_BASE_URL = 'https://api.star-citizen.wiki/api';
const REQUEST_TIMEOUT_MS = 20000;
const MAX_CONCURRENT_REQUESTS = 3;
const MAX_CACHED_ENTRIES = 80;

export class WikiApiError extends Error {
  constructor(message, { status = 0, retryAfterSeconds = null, cause } = {}) {
    super(message);
    this.name = 'WikiApiError';
    this.status = status;
    this.retryAfterSeconds = retryAfterSeconds;
    this.cause = cause;
  }
}

export function idFromLink(link) {
  if (!link) {
    return null;
  }

  const clean = String(link).split('?')[0].replace(/\/+$/, '');
  return clean.slice(clean.lastIndexOf('/') + 1) || null;
}

export function normalizeOffers(purchase = []) {
  return purchase
    .filter((offer) => Number(offer.price_buy) > 0)
    .map((offer) => ({
      terminal: offer.terminal_name,
      system: offer.starmap_location?.star_system_name ?? null,
      place: offer.starmap_location?.name ?? null,
      parent: offer.starmap_location?.parent_name ?? null,
      price: Number(offer.price_buy),
      updatedAt: offer.date_updated ?? null,
    }))
    .sort((a, b) => a.price - b.price);
}

export function normalizeItem(raw) {
  return {
    uuid: raw.uuid,
    slug: raw.slug,
    name: raw.name,
    className: raw.class_name ?? null,
    typeLabel: raw.type_label ?? null,
    subTypeLabel: raw.sub_type_label ?? null,
    rarity: raw.rarity ?? null,
    size: raw.size ?? null,
    grade: raw.grade ?? null,
    itemClass: raw.class ?? null,
    manufacturer: raw.manufacturer?.name ?? null,
    isCraftable: Boolean(raw.is_craftable),
    isLootable: Boolean(raw.is_lootable),
    blueprintIds: (raw.blueprint ?? []).map((blueprint) => ({ uuid: blueprint.uuid, name: blueprint.name })),
    offers: normalizeOffers(raw.uex_prices?.purchase),
    composition: (raw.resource_container?.default_composition ?? [])
      .map((entry) => {
        if (entry.commodity) {
          return { id: entry.commodity.uuid, name: entry.commodity.name, slug: entry.commodity.slug };
        }

        return entry.entry ? { id: entry.entry, name: null, slug: null } : null;
      })
      .filter(Boolean),
    stats: extractStats(raw),
    loot: describeLoot(raw),
    version: raw.version ?? null,
    webUrl: raw.web_url ?? null,
    image: pickItemImage(raw.images),
  };
}

function normalizeIngredient(ingredient) {
  if (ingredient.kind === 'item') {
    return {
      name: ingredient.name,
      kind: 'item',
      quantity: ingredient.quantity ?? 1,
      quantityLabel: `×${ingredient.quantity ?? 1}`,
      ref: { type: 'item', id: ingredient.item_uuid },
    };
  }

  return {
    name: ingredient.name,
    kind: 'resource',
    quantityScu: typeof ingredient.quantity_scu === 'number' ? ingredient.quantity_scu : null,
    quantityLabel: formatScu(ingredient.quantity_scu),
    ref: { type: 'commodity', id: idFromLink(ingredient.link) ?? ingredient.resource_type_uuid },
  };
}

function groupMissions(missions) {
  const groups = new Map();

  missions.forEach((mission) => {
    const title = String(mission.title ?? '').replace(/\[TargetName\]/g, '[target]');
    const rewardScope = mission.reward_scope ?? null;
    const key = `${title}|${rewardScope}`;
    const existing = groups.get(key);

    if (existing) {
      existing.count += 1;
    } else {
      groups.set(key, { title, rewardScope, url: mission.web_url ?? null, count: 1 });
    }
  });

  return [...groups.values()];
}

function normalizeSlots(groups) {
  return groups.map((group) => ({
    key: group.key ?? group.name,
    name: group.name ?? group.key,
    ingredients: (group.children ?? []).map((child) => ({
      name: child.name,
      minQuality: typeof child.min_quality === 'number' ? child.min_quality : null,
    })),
    modifiers: (group.modifiers ?? []).map((modifier) => ({
      label: modifier.label ?? modifier.property_key,
      betterWhen: modifier.better_when === 'lower' ? 'lower' : 'higher',
      type: modifier.value_range_type ?? null,
      qualityMin: modifier.quality_range?.min ?? 0,
      qualityMax: modifier.quality_range?.max ?? 1000,
      atMin:
        typeof modifier.modifier_range?.at_min_quality === 'number' ? modifier.modifier_range.at_min_quality : null,
      atMax:
        typeof modifier.modifier_range?.at_max_quality === 'number' ? modifier.modifier_range.at_max_quality : null,
    })),
  }));
}

export function normalizeBlueprint(raw) {
  return {
    uuid: raw.uuid,
    name: raw.output_name,
    craftTimeSeconds: typeof raw.craft_time_seconds === 'number' ? raw.craft_time_seconds : null,
    craftTimeLabel: raw.craft_time_label ?? null,
    isDefault: Boolean(raw.is_available_by_default),
    missionCount: raw.unlocking_missions_count ?? 0,
    missions: groupMissions(raw.unlocking_missions ?? []),
    ingredients: (raw.ingredients ?? []).map(normalizeIngredient),
    slots: normalizeSlots(raw.requirement_groups ?? []),
    version: raw.game_version ?? null,
  };
}

export function normalizeCommodity(raw) {
  const numbers = (values) => values.filter((value) => typeof value === 'number');

  const locations = (raw.locations ?? []).map((location) => {
    // Ground (FPS) deposits list quality per entry; ship ore locations carry it at the top level.
    const entries = location.entries ?? [];
    const mins = numbers([...entries.map((entry) => entry.quality_min), location.quality_min]);
    const maxs = numbers([...entries.map((entry) => entry.quality_max), location.quality_max]);

    return {
      id: location.uuid,
      name: location.display_name || location.name,
      system: location.system ?? UNKNOWN_SYSTEM,
      type: location.type ?? null,
      parent: location.parent_name ?? null,
      qualityMin: mins.length ? Math.min(...mins) : null,
      qualityMax: maxs.length ? Math.max(...maxs) : null,
    };
  });

  return {
    id: raw.uuid,
    name: raw.name,
    displayName: raw.display_name ?? raw.name,
    kind: raw.kind ?? null,
    isMineable: Boolean(raw.is_mineable),
    hasHarvestables: Boolean(raw.has_harvestables),
    hasSalvage: Boolean(raw.has_salvage),
    methods: raw.methods ?? [],
    rawVersions: (raw.raw_versions ?? []).map((version) => ({ id: version.uuid, name: version.name })),
    locations,
  };
}

function buildUrl(baseUrl, path, params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, String(value));
    }
  });

  const queryString = query.toString();
  return `${baseUrl}${path}${queryString ? `?${queryString}` : ''}`;
}

export function createWikiApi({
  fetchImpl,
  baseUrl = DEFAULT_BASE_URL,
  timeoutMs = REQUEST_TIMEOUT_MS,
  maxConcurrent = MAX_CONCURRENT_REQUESTS,
} = {}) {
  const doFetch = fetchImpl || ((...args) => window.fetch(...args));
  const cache = new Map();
  const queue = [];
  let active = 0;

  function start({ run, resolve, reject }) {
    active += 1;
    run()
      .then(resolve, reject)
      .finally(() => {
        active -= 1;
        pump();
      });
  }

  function pump() {
    while (active < maxConcurrent && queue.length) {
      start(queue.shift());
    }
  }

  function schedule(run) {
    return new Promise((resolve, reject) => {
      queue.push({ run, resolve, reject });
      pump();
    });
  }

  async function fetchJson(url) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const failure = (cause, status = 0) =>
      new WikiApiError(cause?.name === 'AbortError' ? 'The request timed out.' : 'Network error.', { status, cause });

    try {
      let response;

      try {
        response = await doFetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } });
      } catch (cause) {
        throw failure(cause);
      }

      if (!response.ok) {
        const retryAfter = Number(response.headers?.get?.('retry-after'));
        throw new WikiApiError(`HTTP ${response.status}`, {
          status: response.status,
          retryAfterSeconds: Number.isFinite(retryAfter) ? retryAfter : null,
        });
      }

      try {
        return await response.json();
      } catch (cause) {
        if (cause?.name === 'AbortError') {
          throw failure(cause, response.status);
        }

        throw new WikiApiError('The response was not valid JSON.', { status: response.status, cause });
      }
    } finally {
      clearTimeout(timer);
    }
  }

  const get = (path, params) => schedule(() => fetchJson(buildUrl(baseUrl, path, params)));

  function memo(key, produce) {
    if (cache.has(key)) {
      const hit = cache.get(key);
      cache.delete(key);
      cache.set(key, hit);
      return hit;
    }

    const promise = produce().catch((error) => {
      cache.delete(key);
      throw error;
    });

    cache.set(key, promise);

    if (cache.size > MAX_CACHED_ENTRIES) {
      cache.delete(cache.keys().next().value);
    }

    return promise;
  }

  return {
    searchItems({ query, category = '', baseOnly = false, itemSize = '', sort = 'name', page = 1, size = 8 }) {
      const trimmed = query.trim();
      const params = {
        [trimmed.includes('_') ? 'filter[class_name]' : 'filter[name]']: trimmed,
        'filter[category]': category,
        'filter[variants]': baseOnly ? 'false' : '',
        'filter[size]': itemSize,
        'page[size]': size,
        'page[number]': page,
        // Size sorts get a name tiebreaker so equal sizes keep a stable order across pages.
        sort: sort && sort.endsWith('size') ? `${sort},name` : sort || 'name',
      };

      return memo(buildUrl(baseUrl, '/items', params), async () => {
        const json = await get('/items', params);

        return {
          total: json.meta?.total ?? json.data.length,
          lastPage: json.meta?.last_page ?? 1,
          items: json.data.map(normalizeItem),
        };
      });
    },

    getItem(idOrSlug) {
      return memo(`item:${idOrSlug}`, async () => {
        const item = normalizeItem((await get(`/items/${encodeURIComponent(idOrSlug)}`)).data);

        // Pages open items by slug (search) or uuid (trade links); remember both so neither refetches.
        [item.uuid, item.slug].forEach((key) => {
          if (key && key !== idOrSlug && !cache.has(`item:${key}`)) {
            cache.set(`item:${key}`, Promise.resolve(item));
          }
        });

        return item;
      });
    },

    getBlueprint(uuid) {
      return memo(`blueprint:${uuid}`, async () =>
        normalizeBlueprint((await get(`/blueprints/${encodeURIComponent(uuid)}`)).data)
      );
    },

    getCommodity(id) {
      return memo(`commodity:${id}`, async () =>
        normalizeCommodity((await get(`/commodities/${encodeURIComponent(id)}`)).data)
      );
    },

    clearCache() {
      cache.clear();
    },
  };
}

export const wikiApi = createWikiApi();
