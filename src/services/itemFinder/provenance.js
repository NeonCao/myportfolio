import { UNKNOWN_SYSTEM, isNumber, median } from './format';

export const MAX_TRACE_DEPTH = 4;

export function summarizeItem(item) {
  return {
    offerCount: item.offers.length,
    cheapestPrice: item.offers[0]?.price ?? null,
    craftable: item.isCraftable && item.blueprintIds.length > 0,
    lootable: item.isLootable,
    harvestable: item.composition.length > 0,
  };
}

export function describeBlueprintAccess(blueprint) {
  if (blueprint.isDefault) {
    return { kind: 'default' };
  }

  if (blueprint.missions.length) {
    return { kind: 'missions', missions: blueprint.missions };
  }

  return { kind: 'unknown', missionCount: blueprint.missionCount };
}

export function groupLocationsBySystem(locations) {
  const bySystem = new Map();

  locations.forEach((location) => {
    if (!bySystem.has(location.system)) {
      bySystem.set(location.system, []);
    }

    bySystem.get(location.system).push(location);
  });

  return [...bySystem.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([system, entries]) => ({
      system,
      locations: [...entries].sort((a, b) => a.name.localeCompare(b.name)),
    }));
}

// "Orison, Crusader" without repeating the system, which appears as "Stanton" or "Stanton System" depending on the source.
export function locationTrail(parts, system) {
  const isSystem = (part) => system && (part === system || system === `${part} System` || part === `${system} System`);

  return parts
    .filter(Boolean)
    .filter((part, index, all) => part !== all[index - 1] && !isSystem(part))
    .join(', ');
}

export function refKey(ref) {
  return `${ref.type}:${ref.id}`;
}

export function loadItemCrafting(api, item) {
  if (!item.isCraftable || !item.blueprintIds.length) {
    return Promise.resolve([]);
  }

  return Promise.all(item.blueprintIds.map((blueprint) => api.getBlueprint(blueprint.uuid)));
}

export function summarizeOffers(offers) {
  const prices = offers.map((offer) => offer.price).filter(isNumber);
  const dates = offers.map((offer) => Date.parse(offer.updatedAt)).filter((time) => !Number.isNaN(time));

  return {
    count: offers.length,
    min: prices.length ? Math.min(...prices) : null,
    median: median(prices),
    max: prices.length ? Math.max(...prices) : null,
    newest: dates.length ? new Date(Math.max(...dates)).toISOString() : null,
    oldest: dates.length ? new Date(Math.min(...dates)).toISOString() : null,
  };
}

export function groupOffersBySystem(offers) {
  const bySystem = new Map();

  offers.forEach((offer) => {
    const system = offer.system ?? UNKNOWN_SYSTEM;

    if (!bySystem.has(system)) {
      bySystem.set(system, []);
    }

    bySystem.get(system).push(offer);
  });

  return [...bySystem.entries()]
    .map(([system, entries]) => {
      const sorted = [...entries].sort((a, b) => a.price - b.price);
      return { system, offers: sorted, min: sorted[0]?.price ?? null, count: sorted.length };
    })
    .sort((a, b) => (a.min ?? Infinity) - (b.min ?? Infinity) || a.system.localeCompare(b.system));
}

export function modifierAtQuality(modifier, quality) {
  if (modifier.type !== 'linear' || modifier.atMin === null || modifier.atMax === null) {
    return null;
  }

  const span = modifier.qualityMax - modifier.qualityMin;
  const clamped = Math.min(Math.max(quality, modifier.qualityMin), modifier.qualityMax);
  const progress = span > 0 ? (clamped - modifier.qualityMin) / span : 1;

  return modifier.atMin + progress * (modifier.atMax - modifier.atMin);
}

export function describeEffect(modifier, multiplier) {
  if (multiplier === null) {
    return { delta: null, verdict: 'unknown' };
  }

  const delta = multiplier - 1;

  if (Math.abs(delta) < 0.0005) {
    return { delta: 0, verdict: 'neutral' };
  }

  const improves = modifier.betterWhen === 'lower' ? delta < 0 : delta > 0;
  return { delta, verdict: improves ? 'better' : 'worse' };
}

async function minedCommodity(api, commodityId) {
  const commodity = await api.getCommodity(commodityId);

  if (!commodity.locations.length && commodity.rawVersions.length) {
    return api.getCommodity(commodity.rawVersions[0].id);
  }

  return commodity;
}

// Resolves a blueprint ingredient to the commodity that is actually mined, or null if it is not a mined material.
export async function resolveMiningSource(api, ingredient) {
  if (!ingredient.ref?.id) {
    return null;
  }

  if (ingredient.ref.type === 'commodity') {
    return minedCommodity(api, ingredient.ref.id);
  }

  const item = await api.getItem(ingredient.ref.id);
  return item.composition.length ? minedCommodity(api, item.composition[0].id) : null;
}

// resources: [{ name, commodity }] where commodity is a normalized commodity (or null when it failed to load)
export function buildMiningPlan(resources, { maxSpots = 6 } = {}) {
  const loaded = resources.filter((resource) => resource.commodity);
  const total = resources.length;
  const systems = new Map();
  const spots = new Map();

  loaded.forEach(({ name, commodity }) => {
    commodity.locations.forEach((location) => {
      if (!systems.has(location.system)) {
        systems.set(location.system, new Set());
      }
      systems.get(location.system).add(name);

      const spot = spots.get(location.id) ?? { ...location, resources: new Set() };
      spot.resources.add(name);
      spots.set(location.id, spot);
    });
  });

  return {
    total,
    systems: [...systems.entries()]
      .map(([system, names]) => ({ system, covered: names.size, resources: [...names].sort() }))
      .sort((a, b) => b.covered - a.covered || a.system.localeCompare(b.system)),
    spots: [...spots.values()]
      .map((spot) => ({ ...spot, resources: [...spot.resources].sort() }))
      .sort((a, b) => b.resources.length - a.resources.length || a.name.localeCompare(b.name))
      .slice(0, maxSpots),
    missing: resources
      .filter((resource) => !resource.commodity || !resource.commodity.locations.length)
      .map((r) => r.name),
  };
}
