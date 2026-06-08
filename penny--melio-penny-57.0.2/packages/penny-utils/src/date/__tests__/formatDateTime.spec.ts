import { describe } from 'vitest';

import { formatDateTime } from '..';

// eslint-disable-next-line no-restricted-syntax
const date = new Date('2024-01-01T00:00:00.000Z');

describe('formatDateTime', () => {
  describe('timezones', () => {
    it('format default when no format mentioned', () => {
      const formatted = formatDateTime(date);
      expect(formatted).toBe('Jan 1, 2024');
    });

    it('format "MMM d, yyyy" when mentioned', () => {
      const formatted = formatDateTime(date, { format: 'MMM d, yyyy' });
      expect(formatted).toBe('Jan 1, 2024');
    });

    it('format "EEE, MMM d, yyyy" when mentioned', () => {
      const formatted = formatDateTime(date, { format: 'EEE, MMM d, yyyy' });
      expect(formatted).toBe('Mon, Jan 1, 2024');
    });

    it('format "EEEE, MMM d, yyyy" when mentioned', () => {
      const formatted = formatDateTime(date, { format: 'EEEE, MMM d, yyyy' });
      expect(formatted).toBe('Monday, Jan 1, 2024');
    });

    it('format "MM/dd/yyyy" when mentioned', () => {
      const formatted = formatDateTime(date, { format: 'MM/dd/yyyy' });
      expect(formatted).toBe('01/01/2024');
    });

    it('format "MM/dd/yyyy, hh:mm aa" when mentioned', () => {
      const formatted = formatDateTime(date, { format: 'MM/dd/yyyy, hh:mm aa' });
      expect(formatted).toBe('01/01/2024, 12:00 AM');
    });

    it('format MM/yyyy" when mentioned', () => {
      const formatted = formatDateTime(date, { format: 'MM/yyyy' });
      expect(formatted).toBe('01/2024');
    });

    it('format to Jerusalem timezone when mentioned', () => {
      const formatted = formatDateTime(date, { format: 'MM/dd/yyyy, hh:mm aa', timeZone: 'Asia/Jerusalem' });
      expect(formatted).toBe('01/01/2024, 02:00 AM');
    });

    it('format to NY timezone when mentioned', () => {
      const formatted = formatDateTime(date, { format: 'MM/dd/yyyy, hh:mm aa', timeZone: 'America/New_York' });
      expect(formatted).toBe('12/31/2023, 07:00 PM');
    });

    it('format to UTC timezone when mentioned', () => {
      const formatted = formatDateTime(date, { format: 'MM/dd/yyyy, hh:mm aa', timeZone: 'UTC' });
      expect(formatted).toBe('01/01/2024, 12:00 AM');
    });
  });

  describe('date types', () => {
    it('format empty when undefined', () => {
      const formatted = formatDateTime(undefined);
      expect(formatted).toBe('');
    });

    it('format empty when null', () => {
      const formatted = formatDateTime(null);
      expect(formatted).toBe('');
    });

    it('format when UTC in epoch', () => {
      const formatted = formatDateTime(date.getTime());
      expect(formatted).toBe('Jan 1, 2024');
    });

    it('format when UTC in ISO', () => {
      const formatted = formatDateTime(date.toISOString());
      expect(formatted).toBe('Jan 1, 2024');
    });
  });
});
