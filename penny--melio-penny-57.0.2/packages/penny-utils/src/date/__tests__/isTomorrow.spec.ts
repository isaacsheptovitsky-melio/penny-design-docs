import { describe } from 'vitest';

import { addDays, isTomorrow } from '..';

// eslint-disable-next-line no-restricted-syntax
const date = new Date('2024-01-01T00:00:00.000Z');

describe('isTomorrow', () => {
  const tomorrowDate = addDays(date, 1);

  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(date);
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  describe('timezones', () => {
    it('true when local timezone (UTC)', () => {
      const tomorrow = isTomorrow(tomorrowDate);
      expect(tomorrow).toBeTruthy();
    });

    it('false when local timezone (UTC)', () => {
      const tomorrow = isTomorrow(date);
      expect(tomorrow).toBeFalsy();
    });

    it('true when UTC', () => {
      const tomorrow = isTomorrow(tomorrowDate, { timeZone: 'UTC' });
      expect(tomorrow).toBeTruthy();
    });

    it('false when UTC', () => {
      const tomorrow = isTomorrow(date, { timeZone: 'UTC' });
      expect(tomorrow).toBeFalsy();
    });

    it('true when Jerusalem', () => {
      const tomorrow = isTomorrow(tomorrowDate, { timeZone: 'Asia/Jerusalem' });
      expect(tomorrow).toBeTruthy();
    });

    it('false when Jerusalem', () => {
      const tomorrow = isTomorrow(date, { timeZone: 'Asia/Jerusalem' });
      expect(tomorrow).toBeFalsy();
    });

    it('true when NY', () => {
      const tomorrow = isTomorrow(tomorrowDate, { timeZone: 'America/New_York' });
      expect(tomorrow).toBeTruthy();
    });

    it('false when NY', () => {
      const tomorrow = isTomorrow(date, { timeZone: 'America/New_York' });
      expect(tomorrow).toBeFalsy();
    });
  });

  describe('date types', () => {
    it('true when UTC in epoch', () => {
      const tomorrow = isTomorrow(tomorrowDate.getTime());
      expect(tomorrow).toBeTruthy();
    });

    it('false when UTC in epoch', () => {
      const tomorrow = isTomorrow(date.getTime());
      expect(tomorrow).toBeFalsy();
    });

    it('true when UTC in ISO', () => {
      const tomorrow = isTomorrow(tomorrowDate.toISOString());
      expect(tomorrow).toBeTruthy();
    });

    it('false when UTC in ISO', () => {
      const tomorrow = isTomorrow(date.toISOString());
      expect(tomorrow).toBeFalsy();
    });
  });
});
