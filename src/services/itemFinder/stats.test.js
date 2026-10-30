import weaponFixture from './__fixtures__/item-weapon-gallant.json';
import shipWeaponFixture from './__fixtures__/item-ship-weapon-omnisky.json';
import shieldFixture from './__fixtures__/item-shield-chimalli.json';
import quantumFixture from './__fixtures__/item-quantum-aither.json';
import armorFixture from './__fixtures__/item-armor-odyssey.json';
import dolivineItemFixture from './__fixtures__/item-dolivine.json';
import { extractStats } from './stats';

const valueOf = (stats, key) => stats.groups.flatMap((group) => group.rows).find((row) => row.key === key)?.value;

test('FPS weapons headline DPS and list their damage types', () => {
  const stats = extractStats(weaponFixture.data);

  expect(stats.kind).toBe('personalWeapon');
  expect(stats.headline).toMatchObject({ key: 'dps', value: 315, unit: 'DPS' });
  expect(valueOf(stats, 'rpm')).toBe(900);
  expect(valueOf(stats, 'magazine')).toBe(45);
  expect(valueOf(stats, 'effectiveRange')).toBe(4800);
  expect(stats.dominantDamageType).toBe('energy');
  expect(stats.groups[0].pills).toEqual([{ key: 'energy', value: 315, unit: '', format: 'number' }]);
});

test('ship weapons use the first fire mode for DPS and hide ammo for energy guns', () => {
  const stats = extractStats(shipWeaponFixture.data);

  expect(stats.kind).toBe('vehicleWeapon');
  expect(stats.headline.value).toBe(243);
  expect(valueOf(stats, 'range')).toBe(2004);
  expect(valueOf(stats, 'ammo')).toBeNull();
  expect(stats.dominantDamageType).toBe('energy');
  expect(stats.groups[0].pills).toEqual([{ key: 'energy', value: 243, unit: '', format: 'number' }]);
  expect(valueOf(stats, 'health')).toBe(550);
  expect(valueOf(stats, 'grade')).toBe('A');
  expect(stats.groups.flatMap((group) => group.rows).find((row) => row.key === 'volume')).toMatchObject({
    value: 0.084,
    format: 'scu',
  });
});

test('shields headline HP and show absorption ranges', () => {
  const stats = extractStats(shieldFixture.data);

  expect(stats.kind).toBe('shield');
  expect(stats.headline.value).toBe(shieldFixture.data.shield.max_health);
  expect(valueOf(stats, 'regen')).toBe(shieldFixture.data.shield.regen_rate);
  const physical = stats.groups[0].pills.find((pill) => pill.key === 'physical');
  expect(physical).toMatchObject({ format: 'percentRange', min: shieldFixture.data.shield.absorption.physical.min });
});

test('quantum drives headline the formatted drive speed', () => {
  const stats = extractStats(quantumFixture.data);

  expect(stats.kind).toBe('quantumDrive');
  expect(stats.headline).toMatchObject({
    format: 'text',
    value: quantumFixture.data.quantum_drive.standard_jump.drive_speed_formatted,
  });
  expect(valueOf(stats, 'cooldown')).toBe(quantumFixture.data.quantum_drive.standard_jump.cooldown_time);
});

test('armor turns damage multipliers into reductions', () => {
  const stats = extractStats(armorFixture.data);

  expect(stats.kind).toBe('armor');
  expect(stats.headline.value).toBeCloseTo(0.05);
  expect(valueOf(stats, 'temperatureRange')).toBe('-30 – 60 °C');
  expect(stats.groups[0].pills.find((pill) => pill.key === 'energy').value).toBeCloseTo(0.05);
});

test('items without a stat block still get the general group and no headline', () => {
  const stats = extractStats(dolivineItemFixture.data);

  expect(stats.kind).toBe('generic');
  expect(stats.headline).toBeNull();
  expect(stats.groups.map((group) => group.key)).toContain('general');
});
