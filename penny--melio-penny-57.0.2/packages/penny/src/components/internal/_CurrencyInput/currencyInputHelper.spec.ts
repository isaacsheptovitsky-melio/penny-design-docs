import { expect } from 'vitest';

import { getValidValue } from './currencyInputHelper';

describe('getValidValue', () => {
  const integerLimit = 4;
  const decimalLimit = 2;
  const allowDecimals = true;

  it('same value when limit not exceeded', () => {
    const value = '123';
    const result = getValidValue(value, integerLimit, decimalLimit, allowDecimals);
    expect(result).toBe('123');
  });
  it('same value when limit not exceeded with decimal', () => {
    const value = '123.1';
    const result = getValidValue(value, integerLimit, decimalLimit, allowDecimals);
    expect(result).toBe('123.1');
  });
  it('same value when limit not exceeded and number value', () => {
    const value = 123;
    const result = getValidValue(value, integerLimit, decimalLimit, allowDecimals);
    expect(result).toBe('123');
  });
  it('slice integer when exceeded', () => {
    const value = '12345';
    const result = getValidValue(value, integerLimit, decimalLimit, allowDecimals);
    expect(result).toBe('1234');
  });
  it('slice integer when exceeded and number value', () => {
    const value = 12345;
    const result = getValidValue(value, integerLimit, decimalLimit, allowDecimals);
    expect(result).toBe('1234');
  });
  it('slice integer when exceeded and negative', () => {
    const value = '-12345';
    const result = getValidValue(value, integerLimit, decimalLimit, allowDecimals);
    expect(result).toBe('-1234');
  });
  it('slice integer when exceeded and decimal', () => {
    const value = '12345.1';
    const result = getValidValue(value, integerLimit, decimalLimit, allowDecimals);
    expect(result).toBe('1234.5');
  });
  it('slice integer when exceeded, negative and decimal', () => {
    const value = '-12345.1';
    const result = getValidValue(value, integerLimit, decimalLimit, allowDecimals);
    expect(result).toBe('-1234.5');
  });
  it('slice decimal when exceeded', () => {
    const value = '1234.123';
    const result = getValidValue(value, integerLimit, decimalLimit, allowDecimals);
    expect(result).toBe('1234.12');
  });
  it('slice decimal when exceeded and negative', () => {
    const value = '-1234.123';
    const result = getValidValue(value, integerLimit, decimalLimit, allowDecimals);
    expect(result).toBe('-1234.12');
  });
  it('with decimal point when ends with and not exceeded', () => {
    const value = '-1234.';
    const result = getValidValue(value, integerLimit, decimalLimit, allowDecimals);
    expect(result).toBe('-1234.');
  });
  it('with decimal point when ends with and exceeded', () => {
    const value = '-12345.';
    const result = getValidValue(value, integerLimit, decimalLimit, allowDecimals);
    expect(result).toBe('-1234.');
  });
  it('slices decimal when decimalLimit is 0', () => {
    const value = '1234.123';
    const decimalLimit = 0;
    const result = getValidValue(value, integerLimit, decimalLimit, allowDecimals);
    expect(result).toBe('1234');
  });
  it('slices decimal when allowDecimals is false', () => {
    const value = '1234.123';
    const allowDecimals = false;
    const result = getValidValue(value, integerLimit, decimalLimit, allowDecimals);
    expect(result).toBe('1234');
  });
});
