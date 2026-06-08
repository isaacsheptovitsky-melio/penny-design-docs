import type { Meta, StoryObj } from '@storybook/react-vite';
import { screen, userEvent, within } from 'storybook/test';
import { Storybook } from 'storybook-utils';

import { Card } from '@/components/containers/cards/Card/Card';
import { Group } from '@/components/containers/Group/Group';
import { Text } from '@/components/dataDisplay/Text/Text';

import type { TableColumnDef } from '../hooks/types';
import { useTable } from '../hooks/useTable';
import { Table } from '../Table';
import { TableCell } from '../TableCell/TableCell';
import { TableHeaderCell } from '../TableHeaderCell/TableHeaderCell';
import { TableHeaderCellDescription } from '../TableHeaderCellDescription/TableHeaderCellDescription';

const meta: Meta<typeof TableHeaderCellDescription> = {
  title: 'Chromatic/Table Header Cell Description',
  component: TableHeaderCellDescription,
};
export default meta;

export const LongText: StoryObj<typeof TableHeaderCellDescription> = {
  render: (args) => {
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
            <Storybook.Container width={120}>
              <Group width="full" variant="vertical" spacing="xxs">
                <Text textStyle="body4Semi">Text</Text>
                <TableHeaderCellDescription
                  {...args}
                  data-testid="description"
                  text="Long long long long description"
                />
              </Group>
            </Storybook.Container>
          </TableHeaderCell>
        ),
        cell: ({ row }) => <TableCell>{row.name}</TableCell>,
        size: 's',
        textAlign: 'start',
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
  play: async () => userEvent.hover(within(screen.getByTestId('table-container')).getByTestId('description')),
  parameters: {
    chromatic: { delay: 1000 },
  },
};
