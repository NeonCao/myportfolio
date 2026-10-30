const DAMAGE_TYPES = ['physical', 'energy', 'distortion', 'thermal', 'biochemical', 'stun'];

function num(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function stat(key, value, unit = '', format = 'number') {
  return { key, value: value ?? null, unit, format };
}

function damagePills(entries) {
  return entries
    .filter(([, value]) => num(value) !== null && value > 0)
    .sort(([, a], [, b]) => b - a)
    .map(([type, value]) => ({ key: type, value, unit: '', format: 'number' }));
}

function personalWeapon(raw) {
  const weapon = raw.personal_weapon;
  const damage = weapon.damage ?? {};
  const dps = num(damage.dps_total);

  return {
    kind: 'personalWeapon',
    headline: dps !== null ? stat('dps', dps, 'DPS') : null,
    groups: [
      {
        key: 'weapon',
        rows: [
          stat('dps', dps, 'DPS'),
          stat('alpha', num(damage.alpha_total) ?? num(weapon.damage_per_shot)),
          stat('rpm', num(weapon.rpm), 'RPM'),
          stat('magazine', num(weapon.magazine_size) ?? num(raw.ammunition?.capacity)),
          stat('effectiveRange', num(weapon.effective_range), 'm'),
          stat('projectileSpeed', num(raw.ammunition?.speed), 'm/s'),
        ],
        pills: damagePills(Object.entries(damage.dps ?? {})),
        pillsKey: 'damageTypes',
      },
    ],
  };
}

function vehicleWeapon(raw) {
  const weapon = raw.vehicle_weapon;
  const mode = (weapon.modes ?? [])[0] ?? {};
  const dps = num(mode.damage_per_second);
  const capacity = num(weapon.capacity);

  return {
    kind: 'vehicleWeapon',
    headline: dps !== null ? stat('dps', dps, 'DPS') : null,
    groups: [
      {
        key: 'weapon',
        rows: [
          stat('dps', dps, 'DPS'),
          stat('alpha', num(weapon.damage_per_shot)),
          stat('rpm', num(weapon.rpm) ?? num(mode.rpm), 'RPM'),
          stat('range', num(weapon.range), 'm'),
          stat('projectileSpeed', num(raw.ammunition?.speed), 'm/s'),
          stat('ammo', capacity && capacity > 0 ? capacity : null),
        ],
        // Same basis as personal weapons (DPS per type); per-shot damages are the fallback for older data.
        pills: weapon.damage?.dps
          ? damagePills(Object.entries(weapon.damage.dps))
          : damagePills(
              (weapon.damages ?? []).map((entry) => [String(entry.name ?? entry.type).toLowerCase(), entry.damage])
            ),
        pillsKey: 'damageTypes',
      },
    ],
  };
}

function shield(raw) {
  const data = raw.shield;
  const maxHp = num(data.max_health);
  const absorption = Object.entries(data.absorption ?? {})
    .filter(([type]) => DAMAGE_TYPES.includes(type))
    .map(([type, range]) => ({ key: type, min: num(range?.min), max: num(range?.max), format: 'percentRange' }));

  return {
    kind: 'shield',
    headline: maxHp !== null ? stat('shieldHp', maxHp, 'HP') : null,
    groups: [
      {
        key: 'shield',
        rows: [
          stat('shieldHp', maxHp, 'HP'),
          stat('regen', num(data.regen_rate), 'HP/s'),
          stat('regenTime', num(data.regen_time), 's'),
          stat('damageDelay', num(data.regen_delay?.damage), 's'),
          stat('downedDelay', num(data.regen_delay?.downed), 's'),
        ],
        pills: absorption,
        pillsKey: 'absorption',
      },
    ],
  };
}

function quantumDrive(raw) {
  const data = raw.quantum_drive;
  const jump = data.standard_jump ?? {};
  const speed = jump.drive_speed_formatted ?? null;

  return {
    kind: 'quantumDrive',
    headline: speed ? stat('driveSpeed', speed, '', 'text') : null,
    groups: [
      {
        key: 'quantum',
        rows: [
          stat('driveSpeed', speed, '', 'text'),
          stat('cooldown', num(jump.cooldown_time), 's'),
          stat('fuelRequirement', num(data.quantum_fuel_requirement)),
          stat('jumpRange', data.jump_range_formatted ?? null, '', 'text'),
        ],
        pills: [],
      },
    ],
  };
}

function cooler(raw) {
  const output = num(raw.cooler?.coolant_segment_generation);

  return {
    kind: 'cooler',
    headline: output !== null ? stat('coolantOutput', output) : null,
    groups: [{ key: 'cooler', rows: [stat('coolantOutput', output)], pills: [] }],
  };
}

function powerPlant(raw) {
  const output = num(raw.power_plant?.power_segment_generation);

  return {
    kind: 'powerPlant',
    headline: output !== null ? stat('powerOutput', output) : null,
    groups: [{ key: 'power', rows: [stat('powerOutput', output)], pills: [] }],
  };
}

function armor(raw) {
  const resistance = raw.suit_armor?.damage_resistance ?? {};
  const reduction = (type) => {
    const multiplier = num(resistance[type]?.multiplier);
    return multiplier === null ? null : 1 - multiplier;
  };
  const temperature = raw.temperature_resistance;
  const tempMin = num(temperature?.min);
  const tempMax = num(temperature?.max);

  return {
    kind: 'armor',
    headline: reduction('physical') !== null ? stat('damageReduction', reduction('physical'), '', 'percent') : null,
    groups: [
      {
        key: 'armor',
        rows: [
          stat('damageReduction', reduction('physical'), '', 'percent'),
          stat(
            'temperatureRange',
            tempMin !== null && tempMax !== null ? `${tempMin} – ${tempMax} °C` : null,
            '',
            'text'
          ),
          stat('radiationCapacity', num(raw.radiation_resistance?.maximum_radiation_capacity)),
          stat('radiationDissipation', num(raw.radiation_resistance?.radiation_dissipation_rate), '/s'),
        ],
        pills: DAMAGE_TYPES.map((type) => ({ key: type, value: reduction(type), format: 'percent' })).filter(
          (pill) => pill.value !== null
        ),
        pillsKey: 'resistances',
      },
    ],
  };
}

function componentGroup(raw) {
  if (!raw.durability && !raw.emission && !raw.distortion) {
    return null;
  }

  return {
    key: 'component',
    rows: [
      stat('health', num(raw.durability?.health), 'HP'),
      stat('emSignature', num(raw.emission?.em_max), 'EM'),
      stat('irSignature', num(raw.emission?.ir), 'IR'),
      stat('distortionCapacity', num(raw.distortion?.max)),
    ],
    pills: [],
  };
}

const MICRO_SCU_UNITS = ['µSCU', 'μSCU'];

function volumeStat(dimension) {
  const volume = num(dimension?.volume_converted);
  const unit = dimension?.volume_converted_unit ?? '';

  // The API reports volume in µSCU; shown in SCU/cSCU like every other amount on the page.
  if (volume !== null && MICRO_SCU_UNITS.includes(unit)) {
    return stat('volume', volume / 1000000, 'SCU', 'scu');
  }

  return stat('volume', volume, unit);
}

function generalGroup(raw) {
  return {
    key: 'general',
    rows: [
      stat('size', num(raw.size) !== null ? `S${raw.size}` : null, '', 'text'),
      stat('grade', raw.grade ?? null, '', 'text'),
      stat('itemClass', raw.class ?? null, '', 'text'),
      stat('mass', num(raw.mass), 'kg'),
      volumeStat(raw.dimension),
    ],
    pills: [],
  };
}

const EXTRACTORS = [
  ['personal_weapon', personalWeapon],
  ['vehicle_weapon', vehicleWeapon],
  ['shield', shield],
  ['quantum_drive', quantumDrive],
  ['cooler', cooler],
  ['power_plant', powerPlant],
  ['suit_armor', armor],
];

export function extractStats(raw) {
  const match = EXTRACTORS.find(([key]) => raw[key] && typeof raw[key] === 'object');
  const specific = match ? match[1](raw) : { kind: 'generic', headline: null, groups: [] };
  const groups = [...specific.groups, componentGroup(raw), generalGroup(raw)]
    .filter(Boolean)
    .map((group) => ({ ...group, rows: group.rows.filter(Boolean) }))
    .filter((group) => group.rows.some((row) => row.value !== null) || group.pills.length);

  const damageGroup = specific.groups.find((group) => group.pillsKey === 'damageTypes');

  return {
    kind: specific.kind,
    headline: specific.headline,
    dominantDamageType: damageGroup?.pills[0]?.key ?? null,
    groups,
  };
}
