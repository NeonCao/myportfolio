import {
  MISSING,
  UNKNOWN_SYSTEM,
  formatDuration,
  formatNumber,
  formatPercent,
  formatScu,
} from '../../services/itemFinder/format';

export function systemLabel(system, text) {
  return system === UNKNOWN_SYSTEM ? text.unknownSystem : system;
}

export function formatStat(stat) {
  if (stat.value === null || stat.value === undefined) {
    return MISSING;
  }

  if (stat.format === 'text') {
    return String(stat.value);
  }

  if (stat.format === 'scu') {
    return formatScu(stat.value);
  }

  if (stat.format === 'percent') {
    return formatPercent(stat.value, { maximumFractionDigits: 1 });
  }

  // Short delays keep their fractions ("0.5 s"); a minute or more reads like a timer ("2m 30s").
  if (stat.unit === 's' && stat.value >= 60) {
    return formatDuration(stat.value);
  }

  // Small values (e.g. quantum fuel use 0.009156) keep three significant digits instead of rounding to 0.01 or 0.
  const magnitude = Math.abs(stat.value);
  const number =
    magnitude > 0 && magnitude < 1
      ? formatNumber(stat.value, { maximumSignificantDigits: 3 })
      : formatNumber(stat.value, { maximumFractionDigits: magnitude >= 100 ? 0 : 2 });
  return stat.unit ? `${number} ${stat.unit}` : number;
}

export function formatPill(pill) {
  if (pill.format === 'percentRange') {
    if (pill.min === null && pill.max === null) {
      return MISSING;
    }

    const low = formatPercent(pill.min);
    const high = formatPercent(pill.max);
    return low === high ? low : `${low}–${high}`;
  }

  return formatStat(pill);
}
