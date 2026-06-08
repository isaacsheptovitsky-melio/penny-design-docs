import { expect } from 'vitest';

import { renderComponent } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { Currency, type CurrencyProps } from '..';

describe('Currency', () => {
  validateComponent<CurrencyProps>(Currency, 'Currency', { props: { value: 123.543 } });

  it('renders the fraction correctly', () => {
    const { getByTestId } = renderComponent(<Currency value={123.45} />);

    expect(getByTestId('currency-fraction')).toHaveTextContent(/^45$/);
  });

  it('renders the fraction correctly when no fraction is defined in the given value', () => {
    const { getByTestId } = renderComponent(<Currency value={123} />);

    expect(getByTestId('currency-fraction')).toHaveTextContent(/^00$/);
  });
});
