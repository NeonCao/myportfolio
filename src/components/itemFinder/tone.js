// Maps meanings to the Item Finder palette in index.css. Use with the .if-* helper classes:
// <span className="if-chip" style={tone('buy')}>.
const KNOWN_TONES = new Set([
  'buy',
  'craft',
  'raw',
  'loot',
  'wikelo',
  'mission',
  'physical',
  'energy',
  'distortion',
  'thermal',
  'biochemical',
  'stun',
  'shield',
  'quantum',
  'cooler',
  'power',
  'armor',
  'stanton',
  'pyro',
  'nyx',
]);

export function tone(name) {
  return { '--tone': KNOWN_TONES.has(name) ? `var(--if-${name})` : 'var(--if-neutral)' };
}

const GROUP_TONES = {
  weapon: 'thermal',
  shield: 'shield',
  quantum: 'quantum',
  cooler: 'cooler',
  power: 'power',
  armor: 'armor',
};

// The weapon card follows the weapon's main damage type, so an energy gun reads cyan and a ballistic one copper.
export function groupTone(groupKey, dominantDamageType = null) {
  return tone(groupKey === 'weapon' && dominantDamageType ? dominantDamageType : GROUP_TONES[groupKey]);
}

const KIND_TONES = {
  shield: 'shield',
  quantumDrive: 'quantum',
  cooler: 'cooler',
  powerPlant: 'power',
  armor: 'armor',
};

// Weapons take the colour of their main damage type; other items the colour of their stat group.
export function itemTone(stats) {
  if (!stats) {
    return tone(null);
  }

  return tone(stats.dominantDamageType ?? KIND_TONES[stats.kind]);
}

// "Stanton" and "Stanton System" both map to the Stanton tone.
export function systemTone(system) {
  return tone(
    String(system ?? '')
      .replace(/ System$/, '')
      .toLowerCase()
  );
}
