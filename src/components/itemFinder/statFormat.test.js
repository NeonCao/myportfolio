import { UNKNOWN_SYSTEM } from '../../services/itemFinder/format';
import { formatPill, formatStat, systemLabel } from './statFormat';

const stat = (value, unit = '', format = 'number') => ({ key: 'x', value, unit, format });

test('small values keep three significant digits instead of rounding away', () => {
  expect(formatStat(stat(0.009156))).toBe('0.00916');
  expect(formatStat(stat(0.0001234))).toBe('0.000123');
  expect(formatStat(stat(97.2))).toBe('97.2');
  expect(formatStat(stat(1234.5, 'HP'))).toBe('1,235 HP');
  expect(formatStat(stat(0))).toBe('0');
});

test('seconds read as timers from one minute up, units and formats apply', () => {
  expect(formatStat(stat(0.5, 's'))).toBe('0.5 s');
  expect(formatStat(stat(150, 's'))).toBe('2m 30s');
  expect(formatStat(stat(0.084, 'SCU', 'scu'))).toBe('8.4 cSCU');
  expect(formatStat(stat(0.05, '', 'percent'))).toBe('5%');
  expect(formatStat(stat(null))).toBe('—');
  expect(formatPill({ key: 'physical', min: 0.1, max: 0.3, format: 'percentRange' })).toBe('10%–30%');
});

test('the unknown-system sentinel is translated', () => {
  expect(systemLabel(UNKNOWN_SYSTEM, { unknownSystem: '未知星系' })).toBe('未知星系');
  expect(systemLabel('Pyro', { unknownSystem: '未知星系' })).toBe('Pyro');
});
