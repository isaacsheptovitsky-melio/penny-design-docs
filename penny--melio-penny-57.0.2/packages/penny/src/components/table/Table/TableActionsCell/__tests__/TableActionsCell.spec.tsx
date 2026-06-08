import { act, screen, waitFor } from '@testing-library/react';
import { expect, vi } from 'vitest';

import { type ActionsDropdownMenuItemProps } from '@/components/containers/menus/ActionsDropdownMenu';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { TableActionsCell as TableActionsCell, type TableActionsCellProps } from '../TableActionsCell';

const options: ActionsDropdownMenuItemProps[] = [
  { label: 'action 1', onClick: vi.fn() },
  { label: 'action 2', onClick: vi.fn() },
  { label: 'action 3', onClick: vi.fn() },
];

validateComponent<TableActionsCellProps>(TableActionsCell, 'TableActionsCell', {
  props: {
    options,
    isLoading: false,
  },
});

describe('TableActionsCell', () => {
  // Since the menu is opened with transition need to wait for it to end
  const waitForMenu = async ({ open }: { open: boolean }) =>
    open
      ? await screen.findByTestId('actions-dropdown-menu')
      : expect(screen.queryByTestId('actions-dropdown-menu')).not.toBeInTheDocument();

  it("if disabled don't open the menu", async () => {
    const { getByTestId, user } = renderComponent(<TableActionsCell options={options} isDisabled isLoading={false} />);

    await act(async () => user.click(getByTestId('table-actions-cell-button')));
    await waitForMenu({ open: false });
  });

  it('tooltip appears when hovering the action cell', async () => {
    const { getByTestId, user } = renderComponent(<TableActionsCell options={options} />);
    await act(async () => user.hover(getByTestId('table-actions-cell-button')));
    await waitFor(() => {
      expect(screen.queryByText('Options')).toBeInTheDocument();
    });
  });

  it('tooltip appears when focusing the action cell via keyboard', async () => {
    const { user } = renderComponent(<TableActionsCell options={options} />);
    await user.tab();
    await waitFor(() => {
      expect(screen.queryByText('Options')).toBeInTheDocument();
    });
  });

  it('tooltip appears when hovering a disabled action cell', async () => {
    const { getByTestId, user } = renderComponent(<TableActionsCell options={options} isDisabled />);
    await act(async () => user.hover(getByTestId('table-actions-cell-button')));
    await waitFor(() => {
      expect(screen.queryByText('Options')).toBeInTheDocument();
    });
  });

  it("while the menu is open the tooltip doesn't appear when hovering the action cell", async () => {
    const { getByTestId, user } = renderComponent(<TableActionsCell options={options} />);

    await act(async () => user.click(getByTestId('table-actions-cell-button')));
    await waitForMenu({ open: true });
    await act(async () => user.hover(getByTestId('table-actions-cell-button')));
    await waitFor(() => {
      expect(screen.queryByText('Options')).not.toBeInTheDocument();
    });
  });

  it('passes an aria-label to the cell', () => {
    const { getByRole } = renderComponent(<TableActionsCell options={options} aria-label="test" />);
    expect(getByRole('button')).toHaveAttribute('aria-label', 'test');
  });
});
