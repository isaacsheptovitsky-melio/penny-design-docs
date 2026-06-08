import { describe } from 'vitest';

import { addHours, isToday } from '..';

// eslint-disable-next-line no-restricted-syntax
const date = new Date('2024-01-01T00:00:00.000Z');

describe('isToday', () => {
  const beforeDate = addHours(date, -12);
  const afterDate = addHours(date, 12);

  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(date);
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  describe('timezones', () => {
    it('true when local timezone (UTC)', () => {
      const today = isToday(afterDate);
      expect(today).toBeTruthy();
    });

    it('false when local timezone (UTC)', () => {
      const today = isToday(beforeDate);
      expect(today).toBeFalsy();
    });

    it('true when UTC', () => {
      const today = isToday(afterDate, { timeZone: 'UTC' });
      expect(today).toBeTruthy();
    });

    it('false when UTC', () => {
      const today = isToday(beforeDate, { timeZone: 'UTC' });
      expect(today).toBeFalsy();
    });

    it('true when Jerusalem', () => {
      const today = isToday(afterDate, { timeZone: 'Asia/Jerusalem' });
      expect(today).toBeTruthy();
    });

    it('false when Jerusalem', () => {
      const today = isToday(beforeDate, { timeZone: 'Asia/Jerusalem' });
      expect(today).toBeFalsy();
    });

    it('true when NY', () => {
      const today = isToday(beforeDate, { timeZone: 'America/New_York' });
      expect(today).toBeTruthy();
    });

    it('false when NY', () => {
      const today = isToday(afterDate, { timeZone: 'America/New_York' });
      expect(today).toBeFalsy();
    });
  });

  describe('date types', () => {
    it('true when UTC in epoch', () => {
      const today = isToday(afterDate.getTime());
      expect(today).toBeTruthy();
    });

    it('false when UTC in epoch', () => {
      const today = isToday(beforeDate.getTime());
      expect(today).toBeFalsy();
    });

    it('true when UTC in ISO', () => {
      const today = isToday(afterDate.toISOString());
      expect(today).toBeTruthy();
    });

    it('false when UTC in ISO', () => {
      const today = isToday(beforeDate.toISOString());
      expect(today).toBeFalsy();
    });
  });
});
