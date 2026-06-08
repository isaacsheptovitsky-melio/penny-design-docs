import { expect } from 'vitest';

import { Switch } from '@/components/selectionAndInputs/Switch/Switch';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { TableHeaderCell, type TableHeaderCellProps } from '../TableHeaderCell';

describe('TableHeaderCell', () => {
  validateComponent<TableHeaderCellProps>(TableHeaderCell, 'TableHeaderCell', {
    props: { children: 'Header Text' },
  });

  // Regression test for ME-35550
  it('allows interacting with inner content', async () => {
    const mockOnChange = vi.fn();
    const { getByTestId, user } = renderComponent(
      // Explicitly set data-active to true to cover the case that failed in ME-35550
      <TableHeaderCell data-active="true">
        <Switch onChange={mockOnChange} />
      </TableHeaderCell>
    );
    await user.click(getByTestId('switch-input'));
    expect(mockOnChange).toBeCalled();
  });
});
