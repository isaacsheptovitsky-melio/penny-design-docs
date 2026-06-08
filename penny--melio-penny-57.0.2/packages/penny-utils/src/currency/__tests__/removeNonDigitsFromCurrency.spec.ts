import { removeNonDigitsFromCurrency } from '../removeNonDigitsFromCurrency';

describe('removeNonDigitsFromCurrency', () => {
  it('should convert valid currency string to a number and return it as a string', () => {
    expect(removeNonDigitsFromCurrency('$1,234.56')).toBe('1234.56');
  });

  it('should handle negative numbers correctly', () => {
    expect(removeNonDigitsFromCurrency('-$1,234.56')).toBe('-1234.56');
  });

  it('should throw an error for an empty string', () => {
    expect(() => removeNonDigitsFromCurrency('')).toThrowError();
  });

  it('should throw an error for a string with no digits', () => {
    expect(() => removeNonDigitsFromCurrency('abc')).toThrowError();
  });

  it('should handle strings with multiple dots and dashes and return the valid number as string', () => {
    expect(removeNonDigitsFromCurrency('-1234.56.78')).toBe('-1234.56');
  });

  it('should handle strings with only a minus sign and throw an error', () => {
    expect(() => removeNonDigitsFromCurrency('-')).toThrowError();
  });

  it('should handle strings with only a dot and throw an error', () => {
    expect(() => removeNonDigitsFromCurrency('.')).toThrowError();
  });
});
