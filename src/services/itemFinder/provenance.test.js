import blueprintFixture from './__fixtures__/blueprint-omnisky.json';
import { normalizeBlueprint, normalizeCommodity } from './wikiApi';
import {
  buildMiningPlan,
  describeEffect,
  groupOffersBySystem,
  locationTrail,
  modifierAtQuality,
  resolveMiningSource,
  summarizeOffers,
} from './provenance';

const offer = (terminal, system, price, updatedAt) => ({
  terminal,
  system,
  place: terminal,
  parent: system,
  price,
  updatedAt,
});

test('offer summary gives min, median, max and the freshness span', () => {
  const summary = summarizeOffers([
    offer('A', 'Stanton', 300, '2026-10-01T00:00:00Z'),
    offer('B', 'Pyro', 100, '2026-09-01T00:00:00Z'),
    offer('C', 'Stanton', 200, '2026-10-20T00:00:00Z'),
  ]);

  expect(summary).toEqual({
    count: 3,
    min: 100,
    median: 200,
    max: 300,
    newest: '2026-10-20T00:00:00.000Z',
    oldest: '2026-09-01T00:00:00.000Z',
  });
  expect(summarizeOffers([])).toMatchObject({ count: 0, min: null, median: null, newest: null });
});

test('offers group by system, cheapest system first, cheapest offer first', () => {
  const groups = groupOffersBySystem([offer('A', 'Stanton', 300), offer('B', 'Pyro', 250), offer('C', 'Stanton', 120)]);

  expect(groups.map((group) => [group.system, group.min, group.count])).toEqual([
    ['Stanton', 120, 2],
    ['Pyro', 250, 1],
  ]);
  expect(groups[0].offers.map((entry) => entry.terminal)).toEqual(['C', 'A']);
});

test('location trails drop repeats and the system name in either spelling', () => {
  expect(locationTrail(['Orison', 'Crusader'], 'Stanton')).toBe('Orison, Crusader');
  expect(locationTrail(['HUR-L3 Station', 'Stanton'], 'Stanton')).toBe('HUR-L3 Station');
  expect(locationTrail(['Stanton'], 'Stanton System')).toBe('');
  expect(locationTrail(['Area18', 'Area18', null], 'Stanton')).toBe('Area18');
});

test('blueprint slots carry quality modifiers that interpolate linearly', () => {
  const blueprint = normalizeBlueprint(blueprintFixture.data);
  const frame = blueprint.slots.find((slot) => slot.key === 'FRAME');

  expect(frame.ingredients).toEqual([{ name: 'Agricium', minQuality: 1 }]);
  const integrity = frame.modifiers[0];
  expect(integrity).toMatchObject({ label: 'Integrity', betterWhen: 'higher', atMin: 0.9, atMax: 1.1 });

  expect(modifierAtQuality(integrity, 0)).toBeCloseTo(0.9);
  expect(modifierAtQuality(integrity, 500)).toBeCloseTo(1);
  expect(modifierAtQuality(integrity, 1000)).toBeCloseTo(1.1);
  expect(modifierAtQuality(integrity, 5000)).toBeCloseTo(1.1);
  expect(modifierAtQuality({ ...integrity, type: 'segmented' }, 500)).toBeNull();
});

test('effects are judged by whether higher or lower is better', () => {
  expect(describeEffect({ betterWhen: 'higher' }, 1.05)).toMatchObject({ verdict: 'better' });
  expect(describeEffect({ betterWhen: 'higher' }, 0.95)).toMatchObject({ verdict: 'worse' });
  expect(describeEffect({ betterWhen: 'lower' }, 0.95)).toMatchObject({ verdict: 'better' });
  expect(describeEffect({ betterWhen: 'higher' }, 1)).toMatchObject({ verdict: 'neutral', delta: 0 });
  expect(describeEffect({ betterWhen: 'higher' }, null)).toMatchObject({ verdict: 'unknown' });
});

const commodity = (name, locations) =>
  normalizeCommodity({
    uuid: name,
    name,
    locations: locations.map(([id, system]) => ({ uuid: id, name: id, system, quality_min: 1, quality_max: 1000 })),
  });

test('mining plan ranks systems by coverage and spots by how many resources they hold', () => {
  const plan = buildMiningPlan([
    {
      name: 'Copper',
      commodity: commodity('Copper', [
        ['arc-l1', 'Stanton'],
        ['pyro-belt', 'Pyro'],
      ]),
    },
    { name: 'Corundum', commodity: commodity('Corundum', [['arc-l1', 'Stanton']]) },
    { name: 'Yormandi Eye', commodity: null },
  ]);

  expect(plan.total).toBe(3);
  expect(plan.systems).toEqual([
    { system: 'Stanton', covered: 2, resources: ['Copper', 'Corundum'] },
    { system: 'Pyro', covered: 1, resources: ['Copper'] },
  ]);
  expect(plan.spots[0]).toMatchObject({ id: 'arc-l1', resources: ['Copper', 'Corundum'] });
  expect(plan.missing).toEqual(['Yormandi Eye']);
});

test('resolveMiningSource follows refined materials to their ore and mineral items to their commodity', async () => {
  const refined = normalizeCommodity({
    uuid: 'agri',
    name: 'Agricium',
    locations: [],
    raw_versions: [{ uuid: 'agri-ore', name: 'Agricium (Ore)' }],
  });
  const ore = commodity('Agricium (Ore)', [['loc', 'Stanton']]);
  const api = {
    getCommodity: jest.fn(async (id) => (id === 'agri' ? refined : ore)),
    getItem: jest.fn(async (id) => (id === 'mineral' ? { composition: [{ id: 'agri' }] } : { composition: [] })),
  };

  await expect(resolveMiningSource(api, { ref: { type: 'commodity', id: 'agri' } })).resolves.toBe(ore);
  await expect(resolveMiningSource(api, { ref: { type: 'item', id: 'mineral' } })).resolves.toBe(ore);
  await expect(resolveMiningSource(api, { ref: { type: 'item', id: 'crafted-part' } })).resolves.toBeNull();
});
