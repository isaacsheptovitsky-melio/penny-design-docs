import { describe } from 'vitest';

import { addYears, formatDateRange, subYears } from '..';

// eslint-disable-next-line no-irregular-whitespace
// Note: we are using the built-in Intl formatter that is using special range chars  –  (small space large dash)

// eslint-disable-next-line no-restricted-syntax
const date = new Date('2024-01-01T00:00:00.000Z');
describe('formatDateTimeRange', () => {
  // eslint-disable-next-line no-restricted-syntax
  const endDate = new Date('2024-01-09T00:00:00.000Z');

  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(date);
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  describe('formats', () => {
    it('format when same day current year', () => {
      const formatted = formatDateRange(date, date);
      expect(formatted).toBe('Jan 1');
    });

    it('format when same day not current year', () => {
      const formatted = formatDateRange(subYears(date, 1), subYears(date, 1));
      expect(formatted).toBe('Jan 1, 2023');
    });

    it('format when same month current year', () => {
      const formatted = formatDateRange(date, endDate);
      expect(formatted).toBe('Jan 1 – 9');
    });

    it('format when same month not current year', () => {
      const formatted = formatDateRange(subYears(date, 1), subYears(endDate, 1));
      expect(formatted).toBe('Jan 1 – 9, 2023');
    });

    it('format when different years', () => {
      const formatted = formatDateRange(date, addYears(endDate, 1));
      expect(formatted).toBe('Jan 1, 2024 – Jan 9, 2025');
    });
  });

  describe('timezone', () => {
    it('format local (UTC) when no mentioned', () => {
      const formatted = formatDateRange(date, endDate);
      expect(formatted).toBe('Jan 1 – 9');
    });

    it('format UTC when mentioned', () => {
      const formatted = formatDateRange(date, endDate, { timeZone: 'UTC' });
      expect(formatted).toBe('Jan 1 – 9');
    });

    it('format to timeZone when mentioned', () => {
      const formatted = formatDateRange(date, endDate, { timeZone: 'America/New_York' });
      expect(formatted).toBe('Dec 31, 2023 – Jan 8, 2024');
    });
  });

  describe('date types', () => {
    it('format empty when startDate undefined', () => {
      const formatted = formatDateRange(undefined, endDate);
      expect(formatted).toBe('');
    });

    it('format empty when endDate undefined', () => {
      const formatted = formatDateRange(date, undefined);
      expect(formatted).toBe('');
    });

    it('format empty when both undefined', () => {
      const formatted = formatDateRange(undefined, undefined);
      expect(formatted).toBe('');
    });

    it('format when UTC in epoch', () => {
      const formatted = formatDateRange(date.getTime(), endDate.getTime());
      expect(formatted).toBe('Jan 1 – 9');
    });

    it('format when UTC in ISO', () => {
      const formatted = formatDateRange(date.toISOString(), endDate.toISOString());
      expect(formatted).toBe('Jan 1 – 9');
    });
  });
});
