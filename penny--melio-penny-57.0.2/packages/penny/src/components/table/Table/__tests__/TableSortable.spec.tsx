import { expect } from 'vitest';

import { columns } from '@/components/table/Table/__fixtures__/mock-data';
import { renderComponent } from '@/test-utils/render.utils';

import { type SortDirection } from '../Table.types';
import { TableHeaderSortableCell } from '../TableHeaderSortableCell/TableHeaderSortableCell';
import { TestTable } from './Table.spec';

const onSortingChangeMock = vi.fn();
const getSortableColumns = (props?: { initialSortDirection?: SortDirection; sortDirection?: SortDirection }) => {
  const { initialSortDirection, sortDirection } = props || {};
  return columns.map((column) => {
    if (column.id === 'firstName') {
      return {
        ...column,
        header: (
          <TableHeaderSortableCell
            onClick={onSortingChangeMock}
            initialSortDirection={initialSortDirection}
            sortDirection={sortDirection}
          >
            First Name
          </TableHeaderSortableCell>
        ),
      };
    }

    return column;
  });
};

describe('Sortable Table', () => {
  it('has sortable header cell when sortable', () => {
    const { getByTestId } = renderComponent(
      <TestTable
        columns={getSortableColumns()}
        sortingState={{ id: 'firstName', sortDirection: 'desc' }}
        setSortState={vi.fn()}
      />
    );

    expect(getByTestId('header-sortable-cell')).toBeInTheDocument();
  });

  it('trigger desc when header clicked', async () => {
    const { getByTestId, user } = renderComponent(<TestTable columns={getSortableColumns()} setSortState={vi.fn()} />);

    await user.click(getByTestId('header-sortable-cell'));
    expect(onSortingChangeMock).toHaveBeenLastCalledWith('desc');
  });

  it('trigger asc when header clicked and `initialSort` asc', async () => {
    const { getByTestId, user } = renderComponent(
      <TestTable columns={getSortableColumns({ initialSortDirection: 'asc' })} setSortState={vi.fn()} />
    );

    await user.click(getByTestId('header-sortable-cell'));
    expect(onSortingChangeMock).toHaveBeenLastCalledWith('asc');
  });

  /* A regression visual test for focus behavior */
  it('the sortable header cell stays focus after sorting', async () => {
    const { getByTestId, user, rerender } = renderComponent(
      <TestTable columns={getSortableColumns()} setSortState={vi.fn()} />
    );

    await user.tab();
    expect(getByTestId('header-sortable-cell')).toHaveFocus();

    // press 'Enter' to change the sort direction
    await user.keyboard('{Enter}');
    expect(onSortingChangeMock).toHaveBeenLastCalledWith('desc');

    // mock the rendering the component after sorting.
    rerender(<TestTable columns={getSortableColumns({ sortDirection: 'desc' })} setSortState={vi.fn()} />);
    expect(getByTestId('header-sortable-cell')).toHaveFocus();
  });
});
