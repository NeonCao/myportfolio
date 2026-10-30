import {
  ageInDays,
  formatDuration,
  formatNumber,
  formatPercent,
  formatPrice,
  formatScu,
  freshnessTone,
  median,
  MISSING,
} from './format';

test('numbers and prices get separators and units, missing values a dash', () => {
  expect(formatNumber(1234567.891)).toBe('1,234,567.89');
  expect(formatPrice(4533)).toBe('4,533 aUEC');
  expect(formatPrice(null)).toBe(MISSING);
  expect(formatNumber(Number.NaN)).toBe(MISSING);
});

test('volumes under one SCU switch to cSCU', () => {
  expect(formatScu(0.04)).toBe('4 cSCU');
  expect(formatScu(0.365)).toBe('36.5 cSCU');
  expect(formatScu(1)).toBe('1 SCU');
  expect(formatScu(2.25)).toBe('2.25 SCU');
  expect(formatScu(undefined)).toBe(MISSING);
});

test('durations read like the in-game timers', () => {
  expect(formatDuration(150)).toBe('2m 30s');
  expect(formatDuration(540)).toBe('9m');
  expect(formatDuration(45)).toBe('45s');
  expect(formatDuration(5160)).toBe('1h 26m');
  expect(formatDuration(7200)).toBe('2h');
  expect(formatDuration(-1)).toBe(MISSING);
});

test('percentages can be signed', () => {
  expect(formatPercent(0.05)).toBe('5%');
  expect(formatPercent(0.1, { signed: true })).toBe('+10%');
  expect(formatPercent(-0.05, { signed: true })).toBe('-5%');
  expect(formatPercent(0.0525, { maximumFractionDigits: 1 })).toBe('5.3%');
});

test('age and freshness tone', () => {
  const now = Date.parse('2026-10-29T12:00:00Z');
  expect(ageInDays('2026-10-29T01:00:00Z', now)).toBe(0);
  expect(ageInDays('2026-10-20T12:00:00Z', now)).toBe(9);
  expect(ageInDays('not a date', now)).toBeNull();
  expect(freshnessTone(3)).toBe('fresh');
  expect(freshnessTone(20)).toBe('ok');
  expect(freshnessTone(45)).toBe('stale');
  expect(freshnessTone(null)).toBe('unknown');
});

test('median ignores non-numbers', () => {
  expect(median([3, 1, 2])).toBe(2);
  expect(median([4, 1, 3, 2])).toBe(2.5);
  expect(median([null, 'x'])).toBeNull();
});
