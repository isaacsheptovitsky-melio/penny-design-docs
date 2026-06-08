import { expect } from 'vitest';

import { renderComponent } from '@/test-utils/render.utils';
import { resizeScreenByBreakpointKey } from '@/test-utils/resize-screen';

import { useTable } from '../hooks/useTable';
import { Table } from '../Table';

const TestTableWithMobileBreakpoint = ({ mobileViewBreakpoint }: { mobileViewBreakpoint?: 'xs' | 's' | 'm' }) => {
  const data = [{ id: '1', name: 'Test' }];
  const columns = [
    {
      id: 'name',
      header: 'Name',
      cell: ({ row }: { row: { name: string } }) => <div>{row.name}</div>,
    },
  ];

  const mobileRowRenderer = (rowData: { name: string }) => <div data-testid="mobile-row">{rowData.name}</div>;

  const tableProps = useTable({
    data,
    columns,
    mobileRowRenderer,
  });

  return <Table {...tableProps} mobileViewBreakpoint={mobileViewBreakpoint} data-testid="test-table" />;
};

describe('Table mobileViewBreakpoint', () => {
  afterEach(() => {
    // Reset to default screen size
    resizeScreenByBreakpointKey('xl');
  });

  it("Should not show mobile view at 's' breakpoint when mobileViewBreakpoint is 'xs'", () => {
    resizeScreenByBreakpointKey('s');
    const { queryByTestId } = renderComponent(<TestTableWithMobileBreakpoint mobileViewBreakpoint="xs" />);

    expect(queryByTestId('mobile-row')).not.toBeInTheDocument();
  });

  it("Should show mobile view at 's' breakpoint when mobileViewBreakpoint is 's'", () => {
    resizeScreenByBreakpointKey('s');
    const { getByTestId } = renderComponent(<TestTableWithMobileBreakpoint mobileViewBreakpoint="s" />);

    expect(getByTestId('mobile-row')).toBeInTheDocument();
  });

  it("Should show mobile view at 'm' breakpoint when mobileViewBreakpoint is 'm'", () => {
    resizeScreenByBreakpointKey('m');
    const { getByTestId } = renderComponent(<TestTableWithMobileBreakpoint mobileViewBreakpoint="m" />);

    expect(getByTestId('mobile-row')).toBeInTheDocument();
  });

  it("Should not show mobile view at 'l' breakpoint when mobileViewBreakpoint is 'm'", () => {
    resizeScreenByBreakpointKey('l');
    const { queryByTestId } = renderComponent(<TestTableWithMobileBreakpoint mobileViewBreakpoint="m" />);

    expect(queryByTestId('mobile-row')).not.toBeInTheDocument();
  });

  it("Should not show mobile view at 's' breakpoint when mobileViewBreakpoint is not provided (defaults to 'xs')", () => {
    resizeScreenByBreakpointKey('s');
    const { queryByTestId } = renderComponent(<TestTableWithMobileBreakpoint />);

    expect(queryByTestId('mobile-row')).not.toBeInTheDocument();
  });

  it("Should show mobile view at 'xs' breakpoint when mobileViewBreakpoint is not provided (defaults to 'xs')", () => {
    resizeScreenByBreakpointKey('xs');
    const { getByTestId } = renderComponent(<TestTableWithMobileBreakpoint />);

    expect(getByTestId('mobile-row')).toBeInTheDocument();
  });
});
