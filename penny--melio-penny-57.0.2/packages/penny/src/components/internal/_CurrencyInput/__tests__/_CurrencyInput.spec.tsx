import { type FocusEventHandler } from 'react';
import { expect } from 'vitest';

import { renderComponent } from '../../../../test-utils';
import { _CurrencyInput } from '..';
import { nonDecimalCurrencies } from '../currencyInputHelper';

describe('_CurrencyInput', () => {
  it.each(nonDecimalCurrencies)('should not allow decimals for non-decimal currency %s', async (currency) => {
    const handleChange = vi.fn();
    const { getByTestId, user } = renderComponent(
      <_CurrencyInput
        data-testid="currency-input"
        currencySign="¥"
        locale="en-US"
        currency={currency}
        onValueChange={handleChange}
      />
    );
    const inputElement = getByTestId('currency-input');

    await user.type(inputElement, '123.45');
    expect(handleChange).toHaveBeenLastCalledWith('12345');
  });

  it('fire `onChange` when typing and `decimalScale` is set', async () => {
    const handleChange = vi.fn();
    const { getByTestId, user } = renderComponent(
      <_CurrencyInput
        data-testid="currency-input"
        currencySign="$"
        locale="en-US"
        currency="USD"
        onValueChange={handleChange}
        decimalScale={2}
      />
    );
    const inputElement = getByTestId('currency-input');

    await user.type(inputElement, '1');
    expect(handleChange).toHaveBeenCalledWith('1');
  });

  it('fire `onBlur` value with decimal scale when leave focus and `decimalScale` is set', async () => {
    const handleChange = vi.fn();
    const handleBlur = vi.fn<FocusEventHandler<HTMLInputElement>>();
    const { getByTestId, user } = renderComponent(
      <_CurrencyInput
        data-testid="currency-input"
        currencySign="$"
        locale="en-US"
        currency="USD"
        onBlur={handleBlur}
        onValueChange={handleChange}
        value={1}
        decimalScale={2}
      />
    );
    const inputElement = getByTestId('currency-input');
    await user.click(inputElement);
    expect(handleBlur).not.toHaveBeenCalled();

    // Blur
    await user.click(document.body);
    expect(handleBlur).toHaveBeenCalledOnce();
    // `toHaveBeenCalledWith` with `objectContaining` fails with an out of memory exception
    expect(handleBlur.mock.calls[0]?.[0].target.value).toBe('$1.00');
    expect(handleChange).toHaveBeenCalledWith('1.00');
  });
});
