export const MISSING = '—';

// Sentinel for offers and locations without a star system; components show a translated label instead.
export const UNKNOWN_SYSTEM = 'Unknown system';

export function isNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

export function formatNumber(value, { maximumFractionDigits = 2, maximumSignificantDigits } = {}) {
  if (!isNumber(value)) {
    return MISSING;
  }

  const options = maximumSignificantDigits ? { maximumSignificantDigits } : { maximumFractionDigits };
  return new Intl.NumberFormat('en-US', options).format(value);
}

export function formatPrice(value) {
  return isNumber(value) ? `${formatNumber(value, { maximumFractionDigits: 0 })} aUEC` : MISSING;
}

// Amounts below one SCU read better as centi-SCU, the unit the in-game fabricator uses.
export function formatScu(scu) {
  if (!isNumber(scu)) {
    return MISSING;
  }

  if (scu < 1) {
    return `${formatNumber(scu * 100)} cSCU`;
  }

  return `${formatNumber(scu, { maximumFractionDigits: 3 })} SCU`;
}

export function formatDuration(seconds) {
  if (!isNumber(seconds) || seconds < 0) {
    return MISSING;
  }

  const total = Math.round(seconds);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = total % 60;

  if (hours) {
    return minutes ? `${hours}h ${minutes}m` : `${hours}h`;
  }

  if (minutes) {
    return secs ? `${minutes}m ${secs}s` : `${minutes}m`;
  }

  return `${secs}s`;
}

export function formatPercent(ratio, { signed = false, maximumFractionDigits = 0 } = {}) {
  if (!isNumber(ratio)) {
    return MISSING;
  }

  const percent = ratio * 100;
  const body = `${formatNumber(Math.abs(percent), { maximumFractionDigits })}%`;

  if (percent < 0) {
    return `-${body}`;
  }

  return signed && percent > 0 ? `+${body}` : body;
}

export function ageInDays(isoDate, now = Date.now()) {
  const time = Date.parse(isoDate);

  if (Number.isNaN(time)) {
    return null;
  }

  return Math.max(0, Math.floor((now - time) / 86400000));
}

export function freshnessTone(days) {
  if (days === null || days === undefined) {
    return 'unknown';
  }

  if (days <= 7) {
    return 'fresh';
  }

  return days <= 30 ? 'ok' : 'stale';
}

export function median(values) {
  const sorted = values.filter(isNumber).sort((a, b) => a - b);

  if (!sorted.length) {
    return null;
  }

  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}
