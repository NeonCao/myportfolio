import arlingtonFixture from './__fixtures__/item-arlington-rifle.json';
import { describeLoot } from './loot';
import { normalizeItem } from './wikiApi';

const withTags = (...names) => ({ entity_tag_map: names.map((name, index) => ({ uuid: String(index), name })) });

test('place tags become loot pools, alongside container and NPC loot flags', () => {
  expect(describeLoot(arlingtonFixture.data)).toEqual({
    tagsKnown: true,
    pools: ['SoO'],
    inContainers: true,
    fromNpcs: true,
  });
  expect(normalizeItem(arlingtonFixture.data).loot.pools).toEqual(['SoO']);
});

test('generic tags give no pool, and CannotGenerateAsLoot is reported as no container loot', () => {
  expect(describeLoot(withTags('Quartz', 'SMG', 'Common', 'CanGenerateAsLoot'))).toMatchObject({
    pools: [],
    inContainers: true,
    fromNpcs: false,
  });
  expect(describeLoot(withTags('CannotGenerateAsLoot', 'ContestedZone'))).toMatchObject({
    pools: ['ContestedZone'],
    inContainers: false,
  });
  // Spelling variants share one pool, every Prison_* tag means Klescher, ambiguous tags give none.
  expect(
    describeLoot(withTags('XenoThreat', 'Xenothreat', 'Prison_Stash', 'Prison_Consumable', 'Pyro', 'Lab')).pools
  ).toEqual(['Prison', 'XenoThreat']);
  expect(describeLoot(withTags('Ninetails')).pools).toEqual(['NineTails']);
});

test('items without tag data (search results) leave every loot fact unknown', () => {
  expect(describeLoot({ name: 'Listed item' })).toEqual({
    tagsKnown: false,
    pools: [],
    inContainers: null,
    fromNpcs: null,
  });
});
