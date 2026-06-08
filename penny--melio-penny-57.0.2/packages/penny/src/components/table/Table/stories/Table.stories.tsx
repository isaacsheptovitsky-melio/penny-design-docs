import type { Meta, StoryObj } from '@storybook/react-vite';

import { extractComponentSource, setChromaticViewports } from '@/test-utils/storybook.utils';

import type { useTable } from '../hooks/useTable';
import { Table } from '../Table';
import { WithAdvancedFeaturesExample } from './examples/Advanced.examples';
import AdvancedExamplesRaw from './examples/Advanced.examples?raw';
import { HeaderWithDescriptionExample, WithStickyHeaderExample } from './examples/Headers.examples';
import HeadersExamplesRaw from './examples/Headers.examples?raw';
import { LoadingExample, LoadingWithoutHeaderExample } from './examples/Loading.examples';
import LoadingExamplesRaw from './examples/Loading.examples?raw';
import { MainExample } from './examples/Main.examples';
import MainExampleRaw from './examples/Main.examples?raw';
import { MetaOptionExample } from './examples/MetaOption.examples';
import MetaOptionExampleRaw from './examples/MetaOption.examples?raw';
import * as tableMeta from './TableMeta.stories';

/**
 * The `Table` component handles everything regarding how to display data in table.<br />
 * To start using the `Table` you need to first pass the relevant definitions to the `useTable` hook which will emit the relevant `tableProps` to pass to the `Table`.<br />
 * The below args table depicts the arguments the `useTable` receives.
 *
 * #### Re-rendering
 * In order for the table to not re-render the whole table, make sure the `columns` definitions are not changing (you can use memoization for this).
 * #### Mobile View
 * The mobile view of the table is a list.<br />
 * Since each table is different, we can't presume how each list item will look like.<br />
 * You will have to define how to render the list item in mobile using the `mobileRowRenderer` argument.
 */

const meta: Meta<typeof useTable> = {
  title: 'Table/Table',
  component: Table,
  ...tableMeta.default,
};

export default meta;

export const Main: StoryObj<typeof Table> = {
  render: ({ captionId, ...args }) => <MainExample args={args} captionId={captionId} />,
  parameters: { docs: { source: { code: extractComponentSource(MainExampleRaw, 'MainExample') } } },
};

export const UsingMetaOption: StoryObj<typeof Table> = {
  render: () => <MetaOptionExample />,
  parameters: {
    docs: { source: { code: extractComponentSource(MetaOptionExampleRaw, 'MetaOptionExample') } },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * The loading state can be used for loading when data is being fetched.
 */
export const Loading: StoryObj<typeof Table> = {
  render: () => <LoadingExample />,
  parameters: { docs: { source: { code: extractComponentSource(LoadingExamplesRaw, 'LoadingExample') } } },
};

/**
 * In some cases, the loading state of the table requires "hiding" the table.
 */
export const LoadingWithoutHeader: StoryObj<typeof Table> = {
  render: () => <LoadingWithoutHeaderExample />,
  parameters: {
    docs: { source: { code: extractComponentSource(LoadingExamplesRaw, 'LoadingWithoutHeaderExample') } },
    chromatic: { disableSnapshot: true },
  },
};

export const HeadersWithDescription: StoryObj<typeof Table> = {
  render: () => <HeaderWithDescriptionExample />,
  parameters: {
    docs: { source: { code: extractComponentSource(HeadersExamplesRaw, 'HeaderWithDescriptionExample') } },
  },
};

/**
 * Example of Table with sticky header.
 *
 * Requirements:
 * - Passing `isHeaderSticky: true` to `useTable`.
 * - The element’s nearest scrollable ancestor (with `overflow: auto` or `overflow: scroll`) must allow scrolling.
 * If no ancestor is scrollable, the sticky element cannot “stick.”
 * - The nearest scrollable ancestor should have a defined `max-height` to enable scrolling within its bounds.
 */

export const WithStickyHeader: StoryObj<typeof Table> = {
  render: (args) => <WithStickyHeaderExample {...args} />,
  parameters: {
    docs: { source: { code: extractComponentSource(HeadersExamplesRaw, 'WithStickyHeaderExample') } },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * Example of Table with the following features:
 * - Row selection (row checkboxes)
 * - Left pinned column
 * - Right pinned column
 * - Row checkbox aria label
 * - All checkbox aria label
 * - Mocking skip to link behavior.
 *
 * Requirements:
 * - Row selection - show row checkboxes by passing `onRowSelectionChange: VoidFunction` or `onAllRowsSelectionChange: VoidFunction` to `useTable` .
 * - Left pinned column - add to the column `isPinnedToLeft: true`.
 * - Right pinned column - add to the column `isPinnedToRight: true`.
 * - Row checkbox aria label - by passing `getRowSelectionAriaLabel: (row: rowData) => {}` to `useTable`.
 * - All checkbox aria label - by passing `allRowsSelectionAriaLabel: string` to `useTable`.
 */
export const WithAdvancedFeatures: StoryObj<typeof Table> = {
  render: (args) => <WithAdvancedFeaturesExample {...args} />,
  parameters: {
    docs: {
      source: {
        code: extractComponentSource(AdvancedExamplesRaw, 'WithAdvancedFeaturesExample'),
      },
    },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

setChromaticViewports([Main], ['xs', 'xl']);
