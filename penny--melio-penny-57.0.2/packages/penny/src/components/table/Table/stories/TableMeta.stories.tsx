import type { Meta } from '@storybook/react-vite';

import type { useTable } from '../hooks/useTable';
import { Table } from '../Table';

const columnsType = `
type CellRenderer<T, M> = (props: { row: T; rowIndex: number; columnId: string; meta?: M }) => ReactNode;

// Infers the sub-row's data type
type SubRow<T> = T extends { subRows?: Array<infer S> } ? S : never;

type TableColumnDef<T, M = void> = {
  id: string;
  header?: string | ReactElement;
  cell: CellRenderer<T, M>;
  subRowCell?: CellRenderer<SubRow<T>, M>;
  size?: 'xs' | 's' | 'm' | 'l' | number;
  textAlign?: 'start' | 'end';
  isPinnedToLeft?: boolean;
  isPinnedToRight?: boolean;
  isRowHeader?: boolean;
  headerAriaLabel?: string;
}[];
`;

const rowSelectionTooltipsType = `
type RowSelectionTooltipProps = Pick<TooltipProps, 'content'>;

type RowSelectionTooltips<T> = {
  header?: RowSelectionTooltipProps;
  row?: ({
    rowData,
    isSelectionDisabled,
  }: {
    rowData: T;
    isSelectionDisabled: boolean;
  }) => RowSelectionTooltipProps | undefined;
};
`;

const onRowSelectionChangeType = `
({
  rowId: string;
  rowData: T;
  isSelected: boolean;
}) => void;
`;

const meta: Meta<typeof useTable> = {
  title: 'Table/Table',
  component: Table,
  argTypes: {
    data: {
      control: false,
      description: 'The data to be rendered by the table.',
      type: { required: true, name: 'array' },
      table: {
        type: { summary: 'T[]' },
        category: 'props',
      },
    },
    columns: {
      control: false,
      description: 'The column definitions for the table.',
      type: { required: true, name: 'array' },
      table: {
        type: { summary: 'TableColumnDef<T, M>[]', detail: columnsType },
        category: 'props',
      },
    },
    meta: {
      control: false,
      description:
        'Any object that may be accessed from the cell renderer and the header component props. This is a great way to pass arbitrary data or functions to your table without having to pass it to every thing the table touches. A good example is passing a locale object to your table to use for formatting dates, numbers, etc or even a function that can be used to update editable data like in the [Table.AmountInput example](https://penny.melio.com/?path=/docs/table-amount-input--docs).',
      table: {
        type: { summary: 'M' },
        category: 'props',
      },
    },
    headerVariant: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Determines the variant of the header.',
      table: {
        defaultValue: { summary: 'light' },
        type: { summary: 'light | dark' },
        category: 'props',
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Determines if the loader is shown instead of all table rows or not.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    hideHeaderWhileLoading: {
      control: 'boolean',
      description: 'Determines if the header should be shown while loading.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    loadingRowIds: {
      control: false,
      description: "Sets the rows associated with the id's to loading state.",
      table: {
        type: { summary: 'string[]' },
        category: 'props',
      },
    },
    highlightedRowIds: {
      control: false,
      description: "Highlights the rows associated with the id's.",
      table: {
        type: { summary: 'string[]' },
        category: 'props',
      },
    },
    onRowClick: {
      control: false,
      action: 'click',
      description: 'Callback that fires on each row click.',
      table: {
        type: { summary: '({ rowId: string; rowData: T }) => void' },
        category: 'events',
      },
    },
    defaultExpandedRows: {
      control: false,
      description: 'Sets the rows that should be expanded by default.',
      table: {
        defaultValue: { summary: '{}' },
        type: { summary: 'true | Record<string, boolean>' },
        category: 'props',
      },
    },
    onRowExpandChange: {
      control: false,
      action: 'expand',
      description: 'Callback that fires each time a row is expanded or collapsed.',
      table: {
        type: { summary: '({ rowId: string; isExpanded: boolean }) => void' },
        category: 'events',
      },
    },
    disableAllRowsSelection: {
      control: false,
      description: 'Disable row selection for all rows.',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    disableRowSelection: {
      control: false,
      description: 'Disable row selection for specific rows.',
      table: {
        type: { summary: '(rowData: T) => boolean' },
        category: 'props',
      },
    },
    rowSelectionTooltips: {
      control: false,
      description: 'Displays tooltips on header and row selection cell checkboxes.',
      table: {
        type: { summary: 'RowSelectionTooltips', detail: rowSelectionTooltipsType },
        category: 'props',
      },
    },
    defaultSelectedRows: {
      control: false,
      description: 'Sets the rows that should be selected by default when using **uncontrolled** row-selection.',
      table: {
        defaultValue: { summary: '{}' },
        type: { summary: 'Record<string, boolean>' },
        category: 'props',
      },
    },
    selectedRows: {
      control: false,
      description: 'The selected rows when using **controlled** row-selection.',
      table: {
        type: { summary: 'Record<string, boolean>' },
        category: 'props',
      },
    },
    setSelectedRows: {
      control: false,
      description: 'Sets the selected rows when using **controlled** row-selection.',
      table: {
        type: { summary: 'Dispatch<SetStateAction<Record<string, boolean>>>' },
        category: 'props',
      },
    },
    onRowSelectionChange: {
      control: false,
      action: 'select',
      description: "Callback that fires on row's checkbox click.",
      table: {
        type: { summary: '(rowSelectionState: TableRowSelectionState<T>) => void', detail: onRowSelectionChangeType },
        category: 'events',
      },
    },
    onAllRowsSelectionChange: {
      control: false,
      action: 'select',
      description: "Callback that fires on header-row's checkbox click.",
      table: {
        type: { summary: '(areAllSelected: boolean) => void' },
        category: 'events',
      },
    },
    renderRowSelectionHeaderRightElement: {
      control: false,
      description: 'Renders a custom element to the right of the header selectable cell checkbox.',
      table: {
        type: {
          summary: '(headerContext: HeaderContext<T, unknown>) => ReactNode',
        },
        category: 'props',
      },
    },
    mobileRowRenderer: {
      control: false,
      description: 'Allow to define a different view to table row in mobile',
      table: {
        type: { summary: '(rowData: T, meta?: M) => ReactElement' },
        category: 'props',
      },
    },
    mobileViewBreakpoint: {
      control: 'select',
      options: ['xs', 's', 'm', 'l', 'xl'],
      description: 'The breakpoint at which the table should switch to mobile view.',
      table: {
        defaultValue: { summary: 'xs' },
        type: { summary: 'xs | s | m | l | xl' },
        category: 'props',
      },
    },
    isHeaderSticky: {
      control: 'boolean',
      description: 'Determines if the header should be sticky or not.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    captionId: {
      control: 'text',
      description: 'The id of the caption of the table. This is required for a11y.',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
    },
  },
  args: {
    data: [],
    columns: [],
    captionId: 'Penny table',
    meta: undefined,
    isLoading: false,
    hideHeaderWhileLoading: false,
    loadingRowIds: undefined,
    highlightedRowIds: [],
    onRowClick: undefined,
    disableAllRowsSelection: undefined,
    disableRowSelection: undefined,
    rowSelectionTooltips: undefined,
    defaultSelectedRows: undefined,
    selectedRows: undefined,
    setSelectedRows: undefined,
    onRowSelectionChange: undefined,
    onAllRowsSelectionChange: undefined,
    renderRowSelectionHeaderRightElement: undefined,
    defaultExpandedRows: undefined,
    onRowExpandChange: undefined,
    headerVariant: 'light',
    mobileRowRenderer: undefined,
    isHeaderSticky: false,
  },
};
export default meta;
