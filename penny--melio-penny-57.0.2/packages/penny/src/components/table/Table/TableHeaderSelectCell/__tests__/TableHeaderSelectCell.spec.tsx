import { screen, within } from '@testing-library/react';
import { expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { TableHeaderSelectCell, type TableHeaderSelectCellProps } from '../TableHeaderSelectCell';

const label1 = 'label 1';
const onSelect = vi.fn();
const props = {
  label: 'Selectable',
  options: [
    { value: 'value1', label: label1 },
    { value: 'value2', label: 'label 2' },
  ],
  onSelect,
};

describe('TableHeaderSelectCell', () => {
  validateComponent<TableHeaderSelectCellProps>(TableHeaderSelectCell, 'TableHeaderSelectCell', {
    props,
    skipRefCheck: true,
  });

  // Since the menu is opened with transition need to wait for it to end
  const waitForMenu = async ({ open }: { open: boolean }) =>
    open
      ? await screen.findByTestId('table-select-header-cell-dropdown-selectable')
      : expect(screen.queryByTestId('table-select-header-cell-dropdown-selectable')).not.toBeInTheDocument();

  it('fires `onSelect` when clicking an option', async () => {
    const { user } = renderComponent(<TableHeaderSelectCell {...props} />);

    await waitForMenu({ open: false });
    await user.click(screen.getByTestId('table-select-cell'));
    await waitForMenu({ open: true });
    await user.click(screen.getByText(label1));

    expect(onSelect).toBeCalledTimes(1);
    await waitForMenu({ open: false });
  });

  it('does not fire `onSelect` when clicking an option that is already selected', async () => {
    const { user } = renderComponent(<TableHeaderSelectCell value="value1" {...props} />);

    await waitForMenu({ open: false });
    await user.click(screen.getByTestId('table-select-cell'));
    await waitForMenu({ open: true });

    await user.click(screen.getByText(label1));

    expect(onSelect).not.toHaveBeenCalled();
  });

  it("fires the footer's action callback", async () => {
    const action = vi.fn();
    const actionLabel = 'do something';

    const { user } = renderComponent(
      <TableHeaderSelectCell {...props} footerAction={{ label: actionLabel, onClick: action }} />
    );
    await waitForMenu({ open: false });
    await user.click(screen.getByTestId('table-select-cell'));
    await waitForMenu({ open: true });
    await user.click(screen.getByText(actionLabel));
    expect(action).toBeCalledTimes(1);
  });

  it('marks value option as selected', async () => {
    const { getByTestId, user } = renderComponent(<TableHeaderSelectCell {...props} value="value1" />);
    await waitForMenu({ open: false });
    await user.click(screen.getByTestId('table-select-cell'));
    await waitForMenu({ open: true });
    expect(within(getByTestId('table-select-header-cell-dropdown-selectable')).getByTestId(/value1/)).toHaveAttribute(
      'data-selected',
      'true'
    );
  });
});
