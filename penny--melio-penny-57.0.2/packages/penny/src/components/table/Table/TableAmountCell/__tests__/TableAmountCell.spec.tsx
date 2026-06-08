import { screen } from '@testing-library/react';
import { expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { TableAmountCell, type TableAmountCellProps } from '../TableAmountCell';

describe('TableAmountCell', () => {
  validateComponent<TableAmountCellProps>(TableAmountCell, 'TableAmountCell', { props: { value: 200 } });

  it('does not display info icon when cell is disabled', () => {
    renderComponent(
      <TableAmountCell value={200} additionalAmount={{ amount: 10, tooltip: { content: 'test' } }} isDisabled />
    );

    expect(screen.queryByTestId('icon-indicator')).not.toBeInTheDocument();
  });
});
