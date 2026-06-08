import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card } from '@/components/containers/cards/Card/Card';
import { Group } from '@/components/containers/Group/Group';
import { Text } from '@/components/dataDisplay/Text/Text';
import { isUsingVisualTesting } from '@/test-utils/storybook.utils';

import type { TableColumnDef } from '../hooks/types';
import { useTable } from '../hooks/useTable';
import { Table } from '../Table';
import { TableCell } from '../TableCell/TableCell';
import { TableHeaderCell } from '../TableHeaderCell/TableHeaderCell';
import { TableHeaderCellDescription } from '../TableHeaderCellDescription/TableHeaderCellDescription';

const meta: Meta<typeof TableHeaderCellDescription> = {
  title: 'Table/Header Cells/Header Cell Description [pattern]',
  component: TableHeaderCellDescription,
  parameters: { docs: { source: { type: 'code' } } },
  argTypes: {
    text: {
      description: 'The description text of the header cell.',
      type: { name: 'string', required: true },
      table: { category: 'props' },
    },
  },
  args: {
    text: 'Description text',
  },
};
export default meta;

export const Main: StoryObj<typeof TableHeaderCellDescription> = {
  render: ({ text }) => {
    const data: { id: string; name: string }[] = [
      {
        id: '0',
        name: 'simone',
      },
    ];

    const columns: TableColumnDef<{ name: string }>[] = [
      {
        id: 'name',
        header: (
          <TableHeaderCell>
            <Group width="full" variant="vertical" spacing="xxxs">
              <Text textStyle="body4Semi">Text</Text>
              <TableHeaderCellDescription text={text} />
            </Group>
          </TableHeaderCell>
        ),
        cell: ({ row }) => <TableCell>{row.name}</TableCell>,
        textAlign: 'start',
        size: isUsingVisualTesting() ? 'l' : 'm',
      },
    ];

    const tableProps = useTable({ data, columns });

    return (
      // `Card` can be replaced with any surface.
      <Card width="fit-content" paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    );
  },
};
