import type { Meta, StoryObj } from '@storybook/react-vite';

import { extractComponentSource } from '@/test-utils/storybook.utils';

import { Table } from '../Table';
import {
  ControlledRowSelectionExample,
  DefaultRowSelectionExample,
  DisableAllRowSelectionExample,
  DisabledRowSelectionExample,
  LoadingRowIdsExample,
  RowSelectionExample,
  RowSelectionTooltipsExample,
} from './examples/TableRows.examples';
import TableRowsExamplesRaw from './examples/TableRows.examples?raw';
import {
  ExpandedRowExample,
  HeaderSelectableCellRightElementExample,
  HighlightedRowExample,
  RowSelectionTooltipReplacementExample,
} from './examples/TableRowsAdvanced.examples';
import TableRowsAdvancedExamplesRaw from './examples/TableRowsAdvanced.examples?raw';

const meta: Meta<typeof Table> = {
  title: 'Table/Table/Rows',
  component: Table,
};
export default meta;

/**
 * You can set individual rows in loading state.<br />
 * This is mostly used when manipulating a row and waiting for the server's response.
 */
export const RowsInLoadingState: StoryObj<typeof Table> = {
  render: () => <LoadingRowIdsExample />,
  parameters: {
    docs: { source: { code: extractComponentSource(TableRowsExamplesRaw, 'LoadingRowIdsExample') } },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * You can tab through the cells and when you check a checkbox, you can press tab again and a "skip to payment" link will be available. You need to press Enter to skip to the "Review and pay" button.
 */
export const RowSelection: StoryObj<typeof Table> = {
  render: () => <RowSelectionExample />,
  parameters: {
    docs: { source: { code: extractComponentSource(TableRowsExamplesRaw, 'RowSelectionExample') } },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * You can tab through the cells and when you check a checkbox, you can press tab again and a "skip to payment" link will be available. You need to press Enter to skip to the next step.
 */
export const DefaultSelectedRows: StoryObj<typeof Table> = {
  render: () => <DefaultRowSelectionExample />,
  parameters: {
    docs: { source: { code: extractComponentSource(TableRowsExamplesRaw, 'DefaultRowSelectionExample') } },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * You can tab through the cells and when you check a checkbox, you can press tab again and a "skip to payment" link will be available. You need to press Enter to skip to the next step.
 */
export const DisableRowSelection: StoryObj<typeof Table> = {
  render: () => <DisabledRowSelectionExample />,
  parameters: {
    docs: { source: { code: extractComponentSource(TableRowsExamplesRaw, 'DisabledRowSelectionExample') } },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const DisableAllRowsSelection: StoryObj<typeof Table> = {
  render: () => <DisableAllRowSelectionExample />,
  parameters: {
    docs: { source: { code: extractComponentSource(TableRowsExamplesRaw, 'DisableAllRowSelectionExample') } },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * You can set an explanatory tooltip on checkboxes for each row.<br />
 * One good usage example is adding a tooltip to a disabled row checkbox that explains the reason for the disablement.<br />
 *
 * Also, you can tab through the cells and when you check a checkbox, you can press tab again and a "skip to payment" link will be available. You need to press Enter to skip to the next step.
 */
export const RowSelectionTooltips: StoryObj<typeof Table> = {
  render: () => <RowSelectionTooltipsExample />,
  parameters: {
    docs: { source: { code: extractComponentSource(TableRowsExamplesRaw, 'RowSelectionTooltipsExample') } },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * You can tab through the cells and when you check a checkbox, you can press tab again and a "skip to payment" link will be available. You need to press Enter to skip to the next step.
 */
export const ControlledRowSelection: StoryObj<typeof Table> = {
  render: () => <ControlledRowSelectionExample />,
  parameters: {
    docs: { source: { code: extractComponentSource(TableRowsExamplesRaw, 'ControlledRowSelectionExample') } },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * Rows can have nested data which is collapsed into it.<br />
 * The row can then be expanded to expose the nested information.
 */
export const Expandable: StoryObj<typeof Table> = {
  render: () => <ExpandedRowExample />,
  parameters: {
    docs: { source: { code: extractComponentSource(TableRowsAdvancedExamplesRaw, 'ExpandedRowExample') } },
  },
};

/**
 * You can highlight rows using the `highlightedRowIds` argument.<br />
 * You decide when the rows are highlighted.<br />
 * So for example, if you want to flash a row using the highlight - you need to set a timer turning the highlight off.
 */
export const HighlightedRows: StoryObj<typeof Table> = {
  render: () => <HighlightedRowExample />,
  parameters: {
    docs: { source: { code: extractComponentSource(TableRowsAdvancedExamplesRaw, 'HighlightedRowExample') } },
  },
};

export const RowSelectionTooltipReplacementSolution: StoryObj<typeof Table> = {
  render: () => <RowSelectionTooltipReplacementExample />,
  parameters: {
    docs: {
      source: { code: extractComponentSource(TableRowsAdvancedExamplesRaw, 'RowSelectionTooltipReplacementExample') },
    },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * Demonstrates how to render a custom right-side element inside the header selectable cell.
 *
 * This example is useful when you want to enhance the header checkbox area with
 * additional UI while still supporting row selection.
 *
 * ⚠️ Server-side pagination note:
 * With server-side pagination in TanStack Table, there is no behavioral difference
 * between `toggleAllRowsSelected` and `toggleAllPageRowsSelected`.
 * Both APIs toggle all rows currently held in memory by the table instance.
 * Since the data is already paginated on the server, this effectively toggles
 * only the rows of the current page.
 *
 * 🔗 Render prop typing:
 * The render prop argument is typed as a TanStack Table Header Context.
 * See: https://tanstack.com/table/latest/docs/api/core/column-def#header
 */
export const HeaderSelectableCellRightElement: StoryObj<typeof Table> = {
  render: () => <HeaderSelectableCellRightElementExample />,
  parameters: {
    docs: {
      source: { code: extractComponentSource(TableRowsAdvancedExamplesRaw, 'HeaderSelectableCellRightElementExample') },
    },
    chromatic: {
      disableSnapshot: true,
    },
  },
};
