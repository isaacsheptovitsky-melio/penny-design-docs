import { renderHook } from '@testing-library/react';
import { expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';
import { resizeScreenByBreakpointKey } from '@/test-utils/resize-screen';

import { columns, data as mockData, nestedData, type Person } from '../__fixtures__/mock-data';
import { DesktopTable } from '../DesktopTable/DesktopTable';
import type { UseTableOptions } from '../hooks/types';
import { useTable } from '../hooks/useTable';
import { getCellSizes } from '../Table.utils';

export const TestTable = ({ data = mockData, ...otherProps }: Partial<UseTableOptions<Person>>) => {
  const tableProps = useTable({ data, columns, ...otherProps });

  return <DesktopTable {...tableProps} />;
};

const { result } = renderHook(() => useTable({ data: mockData, columns }));

validateComponent(DesktopTable, 'Table', { props: result.current });

describe('Table', () => {
  it('renders its content in the correct order', () => {
    const { container, getAllByTestId } = renderComponent(<TestTable />);
    const theadCells = container.querySelectorAll('[role="columnheader"]');
    const tbodyRows = getAllByTestId(/table-row/);

    theadCells.forEach((_th, colIdx) => {
      tbodyRows.forEach((tr, rowIdx) => {
        const cell = tr.querySelectorAll('[role="cell"]')[colIdx];
        const content = Object.values(mockData[rowIdx] as Person)[colIdx + 1]; // skip 'id' column
        expect(cell).toHaveTextContent(content as string);
      });
    });
  });

  it('renders correct column widths', () => {
    resizeScreenByBreakpointKey('xl');
    const { container, getAllByTestId } = renderComponent(<TestTable />);
    const theadCells = container.querySelectorAll('[role="columnheader"]');
    const tbodyRows = getAllByTestId(/table-row/);

    const columnSizes = [
      ...Object.values(getCellSizes())
        .map((size) => size.minWidth)
        .reverse(),
      `${columns[columns.length - 1]?.size as number}px`,
    ];

    theadCells.forEach((th, colIdx) => {
      expect(th).toHaveStyle(`min-width: ${columnSizes[colIdx] as string}`);

      tbodyRows.forEach((tr) => {
        const cell = tr.querySelectorAll('[role="cell"]')[colIdx];
        expect(cell).toHaveStyle(`min-width: ${columnSizes[colIdx] as string}`);
      });
    });
  });

  it('renders a row with sub-rows', () => {
    const defaultExpandedRows = { '4': true };
    const { getByTestId } = renderComponent(<TestTable data={nestedData} defaultExpandedRows={defaultExpandedRows} />);

    expect(getByTestId('table-row-4')).toBeInTheDocument();
    expect(getByTestId('table-sub-row-5')).toBeInTheDocument();
    expect(getByTestId('table-sub-row-6')).toBeInTheDocument();
  });

  it('fires `onRowExpandChange` with correct params', async () => {
    const onRowExpandChange = vi.fn();
    const { getByTestId, queryByTestId, user } = renderComponent(
      <TestTable data={nestedData} onRowExpandChange={onRowExpandChange} />
    );

    // expands row
    await user.click(getByTestId('table-row-4-expand-cell'));

    expect(onRowExpandChange).toHaveBeenLastCalledWith({ rowId: '4', isExpanded: true });
    expect(getByTestId('table-row-4')).toBeInTheDocument();
    expect(getByTestId('table-sub-row-5')).toBeInTheDocument();
    expect(getByTestId('table-sub-row-6')).toBeInTheDocument();

    // collapses the expanded row
    await user.click(getByTestId('table-row-4-expand-cell'));

    expect(onRowExpandChange).toHaveBeenLastCalledWith({ rowId: '4', isExpanded: false });
    expect(queryByTestId('table-sub-row-5')).not.toBeInTheDocument();
    expect(queryByTestId('table-sub-row-6')).not.toBeInTheDocument();
  });

  it('hides the header while loading if chosen to', () => {
    const { queryByTestId } = renderComponent(<TestTable isLoading hideHeaderWhileLoading />);

    expect(queryByTestId('table-head')).not.toBeInTheDocument();
  });
});
