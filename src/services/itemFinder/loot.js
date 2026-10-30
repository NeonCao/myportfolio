// The game's loot system picks items by tag. Most tags are generic (manufacturer, weapon type, rarity),
// but a few tie an item to one place, event or faction. Only those map to a pool here (found by surveying
// the tags of every lootable item); labels live in content/itemFinder.js. Ambiguous tags such as "Pyro"
// or "Lab" are left out on purpose.
const POOL_BY_TAG = {
  SoO: 'SoO',
  ContestedZone: 'ContestedZone',
  Ninetails: 'NineTails',
  XenoThreat: 'XenoThreat',
  Xenothreat: 'XenoThreat',
};

// Prison_Stash, Prison_Consumable, Prison_Shiv... all belong to Klescher's loot.
function poolForTag(tag) {
  return tag.startsWith('Prison_') ? 'Prison' : (POOL_BY_TAG[tag] ?? null);
}

const CONTAINER_LOOT_TAG = 'CanGenerateAsLoot';
const NO_CONTAINER_LOOT_TAG = 'CannotGenerateAsLoot';
const NPC_LOOT_TAG = 'LootableFromSuit';

// Search results come without entity tags, so `tagsKnown` is false there and the facts below are unknown.
export function describeLoot(raw) {
  const tagsKnown = Array.isArray(raw.entity_tag_map);
  const tags = new Set(tagsKnown ? raw.entity_tag_map.map((tag) => tag?.name).filter(Boolean) : []);

  let inContainers = null;
  if (tags.has(CONTAINER_LOOT_TAG)) {
    inContainers = true;
  } else if (tags.has(NO_CONTAINER_LOOT_TAG)) {
    inContainers = false;
  }

  return {
    tagsKnown,
    pools: [...new Set([...tags].map(poolForTag).filter(Boolean))].sort(),
    inContainers,
    fromNpcs: tagsKnown ? tags.has(NPC_LOOT_TAG) : null,
  };
}
