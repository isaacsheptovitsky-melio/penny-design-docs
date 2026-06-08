import type { Meta, StoryObj } from '@storybook/react-vite';
import { screen } from 'storybook/test';

import { extractComponentSource } from '@/test-utils/storybook.utils';

import { Table } from '../Table';
import { ColumnSizesExample, PinnedColumnsExample } from './examples/TableColumns.examples';
import TableColumnsRaw from './examples/TableColumns.examples?raw';

const meta: Meta<typeof Table> = {
  title: 'Table/Table/Columns',
  component: Table,
};
export default meta;

/**
 `Table` columns width is determined using the `size` prop of each colum in `columns` definition your passing to the `useTable` hook.

Those are the different size properties:

 | Size | Factor* | min-width | Fixed width |
 | --- | --- | --- | --- |
 | **xs** | - | 48px | V |
 | **s** | 1 | 128px | X |
 | **m** | 1.5 | 248px | X |
 | **l** | 2.5 | 350px | X |
 | **number** (width in px) | - | - | V |

 \* **Factor** <br>
 sets a fixed proportion between the different cell sizes. For example, when the container is 1000px width, **s** width is 200px: **m** width = 300px, **l** width: 500px. <br>
 It is similar to flex grow and helps keeping the same column sizes ratio in any scenario (any container width, any column size settings).
 */
export const ColumnSizes: StoryObj<typeof Table> = {
  render: () => <ColumnSizesExample />,
  parameters: {
    docs: { source: { code: extractComponentSource(TableColumnsRaw, 'ColumnSizesExample') } },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * You can set a pinned column that will be pinned to the left / right side of the table.<br />
 * Any column set with `isPinnedToLeft`, will always pin to the left.
 * Any column set with `isPinnedToRight`, will always pin to the right.
 */
export const PinnedColumns: StoryObj<typeof Table> = {
  render: () => <PinnedColumnsExample />,
  parameters: {
    docs: { source: { code: extractComponentSource(TableColumnsRaw, 'PinnedColumnsExample') } },
    chromatic: { viewports: [700] },
  },
  play: () => {
    screen.getByTestId('table-container').scrollLeft = 50;
  },
};
