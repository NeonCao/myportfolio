import itemFixture from './__fixtures__/item-gallant-boneyard.json';
import blueprintFixture from './__fixtures__/blueprint-gallant-boneyard.json';
import commodityFixture from './__fixtures__/commodity-dolivine.json';
import dolivineItemFixture from './__fixtures__/item-dolivine.json';
import rawOreFixture from './__fixtures__/commodity-corundum-raw.json';
import refinedFixture from './__fixtures__/commodity-agricium-refined.json';
import {
  createWikiApi,
  idFromLink,
  normalizeBlueprint,
  normalizeCommodity,
  normalizeItem,
  WikiApiError,
} from './wikiApi';
import { describeBlueprintAccess, groupLocationsBySystem, loadItemCrafting, summarizeItem } from './provenance';

function jsonResponse(body, init = {}) {
  return {
    ok: init.status ? init.status < 400 : true,
    status: init.status ?? 200,
    headers: { get: (name) => (init.headers ?? {})[name.toLowerCase()] ?? null },
    json: async () => body,
  };
}

describe('normalizers (real API fixtures)', () => {
  test('item exposes buy offers, craftability and the lootable flag', () => {
    const item = normalizeItem(itemFixture.data);

    expect(item.name).toBe('Gallant "Boneyard" Rifle');
    expect(item.stats).toMatchObject({ kind: 'generic' });
    expect(item.grade).toBeNull();
    expect(item.isCraftable).toBe(true);
    expect(item.isLootable).toBe(true);
    expect(item.blueprintIds).toEqual([
      { uuid: 'fd7ffb99-40f0-4353-b09c-ed6be87a0359', name: 'Gallant "Boneyard" Rifle' },
    ]);
    expect(item.offers).toHaveLength(2);
    expect(item.offers[0]).toMatchObject({
      terminal: 'Live Fire Pyro Gateway (Nyx)',
      system: 'Nyx',
      place: 'Pyro Gateway',
      price: 5056,
    });
    expect(summarizeItem(item)).toMatchObject({ offerCount: 2, cheapestPrice: 5056, craftable: true, lootable: true });
  });

  test('offers without a positive buy price are dropped and the rest sorted cheapest first', () => {
    const raw = JSON.parse(JSON.stringify(itemFixture.data));
    raw.uex_prices.purchase = [
      { ...raw.uex_prices.purchase[0], price_buy: 900, terminal_name: 'B' },
      { ...raw.uex_prices.purchase[0], price_buy: 0, terminal_name: 'free?' },
      { ...raw.uex_prices.purchase[0], price_buy: null, terminal_name: 'null' },
      { ...raw.uex_prices.purchase[0], price_buy: 100, terminal_name: 'A' },
    ];

    expect(normalizeItem(raw).offers.map((offer) => offer.terminal)).toEqual(['A', 'B']);
  });

  test('blueprint ingredients keep the commodity id from the link, not the refined resource uuid', () => {
    const blueprint = normalizeBlueprint(blueprintFixture.data);

    expect(blueprint.craftTimeLabel).toBe('2 minutes 30 seconds');
    expect(blueprint.isDefault).toBe(false);
    expect(blueprint.craftTimeSeconds).toBe(150);
    expect(blueprint.ingredients).toEqual([
      {
        name: 'Corundum',
        kind: 'resource',
        quantityScu: 0.04,
        quantityLabel: '4 cSCU',
        ref: { type: 'commodity', id: '4ceb21c5-48f8-418a-8188-0b0196c33505' },
      },
      {
        name: 'Copper',
        kind: 'resource',
        quantityScu: 0.02,
        quantityLabel: '2 cSCU',
        ref: { type: 'commodity', id: 'd4ba4af8-80f1-4a8a-b8cd-5ba7e37c005c' },
      },
      {
        name: 'Dolivine',
        kind: 'item',
        quantity: 1,
        quantityLabel: '×1',
        ref: { type: 'item', id: '20094ded-ad04-46a3-b734-9e37aa3154b3' },
      },
    ]);
    expect(describeBlueprintAccess(blueprint)).toEqual({ kind: 'unknown', missionCount: 0 });
  });

  test('blueprints unlocked by missions report them, default blueprints say so', () => {
    const missionBlueprint = normalizeBlueprint({
      ...blueprintFixture.data,
      unlocking_missions: [
        { title: 'Tactical Strike Group Needed', reward_scope: 'Assassination', chance: 1, web_url: 'https://x/y' },
      ],
    });
    expect(describeBlueprintAccess(missionBlueprint)).toEqual({
      kind: 'missions',
      missions: [{ title: 'Tactical Strike Group Needed', rewardScope: 'Assassination', url: 'https://x/y', count: 1 }],
    });

    const defaultBlueprint = normalizeBlueprint({ ...blueprintFixture.data, is_available_by_default: true });
    expect(describeBlueprintAccess(defaultBlueprint)).toEqual({ kind: 'default' });
  });

  test('a mineral item links to its commodity through its resource container', () => {
    const item = normalizeItem(dolivineItemFixture.data);

    expect(item.composition).toEqual([
      { id: '7e86e2f4-6c31-41f8-9438-0fd8ad037426', name: 'Dolivine', slug: 'dolivine' },
    ]);
    expect(summarizeItem(item).harvestable).toBe(true);
  });

  test('commodity locations are summarised and grouped by system', () => {
    const commodity = normalizeCommodity(commodityFixture.data);

    expect(commodity.isMineable).toBe(true);
    expect(commodity.methods).toEqual(['FPS']);
    expect(commodity.locations[0]).toMatchObject({
      name: 'Aberdeen',
      system: 'Stanton System',
      parent: 'Hurston',
      qualityMin: 201,
      qualityMax: 1000,
    });
    expect(groupLocationsBySystem(commodity.locations).map((group) => group.system)).toEqual([
      'Pyro System',
      'Stanton System',
    ]);
  });

  test('ship ore locations take their quality range from the top-level fields', () => {
    const commodity = normalizeCommodity(rawOreFixture.data);

    expect(commodity.locations).toHaveLength(3);
    expect(commodity.locations[0]).toMatchObject({
      name: 'ARC L1',
      type: 'Asteroid',
      qualityMin: 245,
      qualityMax: 1000,
    });
    expect(commodity.locations.every((location) => location.qualityMin !== null && location.qualityMax !== null)).toBe(
      true
    );
  });

  test('a refined material has no locations of its own but points at its raw ore', () => {
    const commodity = normalizeCommodity(refinedFixture.data);

    expect(commodity.locations).toEqual([]);
    expect(commodity.rawVersions).toEqual([{ id: 'fc1ec740-3047-48d8-81f0-396f4c9a90ef', name: 'Agricium (Ore)' }]);
  });

  test('list entries that only carry the commodity uuid still count as raw material', () => {
    const raw = JSON.parse(JSON.stringify(dolivineItemFixture.data));
    raw.resource_container.default_composition = [{ entry: '7e86e2f4-6c31-41f8-9438-0fd8ad037426', weight: 1 }];

    const item = normalizeItem(raw);

    expect(item.composition).toEqual([{ id: '7e86e2f4-6c31-41f8-9438-0fd8ad037426', name: null, slug: null }]);
    expect(summarizeItem(item).harvestable).toBe(true);
  });

  test('duplicate unlock missions collapse into one row with a count, template tokens are neutralised', () => {
    const blueprint = normalizeBlueprint({
      ...blueprintFixture.data,
      unlocking_missions: [
        { title: 'Eliminate [TargetName]', reward_scope: 'Assassination', web_url: 'https://x/1' },
        { title: 'Eliminate [TargetName]', reward_scope: 'Assassination', web_url: 'https://x/2' },
        { title: 'Eliminate [TargetName]', reward_scope: 'Bounty', web_url: 'https://x/3' },
      ],
    });

    expect(blueprint.missions).toEqual([
      { title: 'Eliminate [target]', rewardScope: 'Assassination', url: 'https://x/1', count: 2 },
      { title: 'Eliminate [target]', rewardScope: 'Bounty', url: 'https://x/3', count: 1 },
    ]);
  });

  test('idFromLink handles trailing slashes and query strings', () => {
    expect(idFromLink('https://api.star-citizen.wiki/api/commodities/abc?x=1')).toBe('abc');
    expect(idFromLink('https://api.star-citizen.wiki/api/commodities/abc/')).toBe('abc');
    expect(idFromLink(null)).toBeNull();
  });
});

describe('createWikiApi', () => {
  test('searchItems builds the documented query and normalizes the list', async () => {
    const fetchImpl = jest
      .fn()
      .mockResolvedValue(jsonResponse({ data: [itemFixture.data], meta: { total: 41, last_page: 6 } }));
    const api = createWikiApi({ fetchImpl });

    const result = await api.searchItems({ query: ' gallant ', category: 'weapons', baseOnly: true, page: 2 });

    const url = new URL(fetchImpl.mock.calls[0][0]);
    expect(url.origin + url.pathname).toBe('https://api.star-citizen.wiki/api/items');
    expect(url.searchParams.get('filter[name]')).toBe('gallant');
    expect(url.searchParams.has('filter[query]')).toBe(false);
    expect(url.searchParams.get('filter[category]')).toBe('weapons');
    expect(url.searchParams.get('filter[variants]')).toBe('false');
    expect(url.searchParams.get('page[number]')).toBe('2');
    expect(result).toMatchObject({ total: 41, lastPage: 6 });
    expect(result.items[0].slug).toBe('gallant-boneyard-rifle');
  });

  test('a query that looks like a class name searches class names instead', async () => {
    const fetchImpl = jest.fn().mockResolvedValue(jsonResponse({ data: [], meta: { total: 0, last_page: 1 } }));
    const api = createWikiApi({ fetchImpl });

    await api.searchItems({ query: 'klwe_rifle_energy' });

    const url = new URL(fetchImpl.mock.calls[0][0]);
    expect(url.searchParams.get('filter[class_name]')).toBe('klwe_rifle_energy');
    expect(url.searchParams.has('filter[name]')).toBe(false);
  });

  test('size and sort are passed through, defaulting to name order', async () => {
    const fetchImpl = jest.fn().mockResolvedValue(jsonResponse({ data: [], meta: { total: 0, last_page: 1 } }));
    const api = createWikiApi({ fetchImpl });

    await api.searchItems({ query: 'shield', itemSize: 2, sort: '-size' });
    await api.searchItems({ query: 'shield' });

    const first = new URL(fetchImpl.mock.calls[0][0]);
    const second = new URL(fetchImpl.mock.calls[1][0]);
    expect(first.searchParams.get('filter[size]')).toBe('2');
    expect(first.searchParams.get('sort')).toBe('-size,name');
    expect(second.searchParams.has('filter[size]')).toBe(false);
    expect(second.searchParams.get('sort')).toBe('name');
  });

  test('omits empty filters', async () => {
    const fetchImpl = jest.fn().mockResolvedValue(jsonResponse({ data: [], meta: { total: 0, last_page: 1 } }));
    const api = createWikiApi({ fetchImpl });

    await api.searchItems({ query: 'rifle' });

    const url = new URL(fetchImpl.mock.calls[0][0]);
    expect(url.searchParams.has('filter[category]')).toBe(false);
    expect(url.searchParams.has('filter[variants]')).toBe(false);
  });

  test('identical requests are shared and cached', async () => {
    const fetchImpl = jest.fn().mockResolvedValue(jsonResponse(blueprintFixture));
    const api = createWikiApi({ fetchImpl });

    const [a, b] = await Promise.all([api.getBlueprint('bp-1'), api.getBlueprint('bp-1')]);
    await api.getBlueprint('bp-1');

    expect(a).toBe(b);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  test('an item loaded by slug is also cached under its uuid, and the other way round', async () => {
    const fetchImpl = jest.fn().mockResolvedValue(jsonResponse(itemFixture));
    const api = createWikiApi({ fetchImpl });
    const { uuid, slug } = itemFixture.data;

    const bySlug = await api.getItem(slug);
    const byUuid = await api.getItem(uuid);

    expect(byUuid).toBe(bySlug);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  test('failed requests are not cached, 429 exposes retry-after', async () => {
    const fetchImpl = jest
      .fn()
      .mockResolvedValueOnce(jsonResponse({}, { status: 429, headers: { 'retry-after': '30' } }))
      .mockResolvedValueOnce(jsonResponse(commodityFixture));
    const api = createWikiApi({ fetchImpl });

    await expect(api.getCommodity('c-1')).rejects.toMatchObject({
      name: 'WikiApiError',
      status: 429,
      retryAfterSeconds: 30,
    });
    await expect(api.getCommodity('c-1')).resolves.toMatchObject({ name: 'Dolivine' });
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  test('network failures become WikiApiError', async () => {
    const api = createWikiApi({ fetchImpl: jest.fn().mockRejectedValue(new TypeError('Failed to fetch')) });
    await expect(api.getItem('x')).rejects.toBeInstanceOf(WikiApiError);
  });

  test('a response body that stalls is aborted by the timeout and frees its slot', async () => {
    const stalledBody = (signal) =>
      new Promise((resolve, reject) => {
        signal.addEventListener('abort', () => reject(Object.assign(new Error('aborted'), { name: 'AbortError' })));
      });
    const fetchImpl = jest
      .fn()
      .mockImplementationOnce((url, { signal }) =>
        Promise.resolve({ ok: true, status: 200, headers: { get: () => null }, json: () => stalledBody(signal) })
      )
      .mockResolvedValueOnce(jsonResponse(commodityFixture));
    const api = createWikiApi({ fetchImpl, timeoutMs: 30, maxConcurrent: 1 });

    await expect(api.getCommodity('stalled')).rejects.toMatchObject({
      name: 'WikiApiError',
      message: 'The request timed out.',
    });
    await expect(api.getCommodity('next')).resolves.toMatchObject({ name: 'Dolivine' });
  });

  test('never runs more requests at once than the concurrency limit', async () => {
    let inFlight = 0;
    let peak = 0;
    const fetchImpl = jest.fn(async () => {
      inFlight += 1;
      peak = Math.max(peak, inFlight);
      await new Promise((resolve) => setTimeout(resolve, 5));
      inFlight -= 1;
      return jsonResponse(commodityFixture);
    });
    const api = createWikiApi({ fetchImpl, maxConcurrent: 2 });

    await Promise.all(['a', 'b', 'c', 'd', 'e'].map((id) => api.getCommodity(id)));

    expect(fetchImpl).toHaveBeenCalledTimes(5);
    expect(peak).toBeLessThanOrEqual(2);
  });

  test('loadItemCrafting fetches each blueprint of a craftable item, and nothing for others', async () => {
    const fetchImpl = jest.fn().mockResolvedValue(jsonResponse(blueprintFixture));
    const api = createWikiApi({ fetchImpl });

    const blueprints = await loadItemCrafting(api, normalizeItem(itemFixture.data));
    expect(blueprints).toHaveLength(1);
    expect(blueprints[0].ingredients).toHaveLength(3);

    fetchImpl.mockClear();
    expect(await loadItemCrafting(api, normalizeItem(dolivineItemFixture.data))).toEqual([]);
    expect(fetchImpl).not.toHaveBeenCalled();
  });
});
