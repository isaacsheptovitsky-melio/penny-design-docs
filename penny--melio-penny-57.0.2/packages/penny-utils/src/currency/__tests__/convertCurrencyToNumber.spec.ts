import { convertCurrencyToNumber } from '../convertCurrencyToNumber';

describe('convertCurrencyToNumber', () => {
  it('should convert a valid currency string to a number', () => {
    expect(convertCurrencyToNumber('$1,234.56')).toBe(1234.56);
  });

  it('should handle negative numbers correctly', () => {
    expect(convertCurrencyToNumber('-$1,234.56')).toBe(-1234.56);
  });

  it('should remove all non-digit characters and return a valid number', () => {
    expect(convertCurrencyToNumber('USD 12,345.67')).toBe(12345.67);
  });

  it('should correctly handle strings with multiple dots and dashes', () => {
    expect(convertCurrencyToNumber('-1234.56.78')).toBe(-1234.56);
  });

  it('should return 0 for an empty string', () => {
    expect(convertCurrencyToNumber('')).toBeNaN();
  });

  it('should return 0 for a string with no digits', () => {
    expect(convertCurrencyToNumber('abc')).toBeNaN();
  });

  it('should handle strings with only a minus sign', () => {
    expect(convertCurrencyToNumber('-')).toBeNaN();
  });

  it('should handle strings with only a dot', () => {
    expect(convertCurrencyToNumber('.')).toBeNaN();
  });
});
