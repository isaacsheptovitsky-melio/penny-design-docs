import { useEffect, useState } from 'react';

import { Button } from '@/components/action/Button/Button';
import { Card } from '@/components/containers/cards/Card/Card';
import { Container } from '@/components/containers/Container/Container';
import { Group } from '@/components/containers/Group/Group';
import type { OpenChangeTriggerEvent } from '@/components/containers/menus/Context/types';
import { isUsingVisualTesting } from '@/test-utils/storybook.utils';

import type { TableColumnDef } from '../../hooks/types';
import { useTable } from '../../hooks/useTable';
import { Table } from '../../Table';
import { TableDateCell, type TableDateCellProps } from '../../TableDateCell/TableDateCell';

const DateCellComponent = ({ value, onSelect, ...args }: TableDateCellProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [localValue, setLocalValue] = useState<Date | undefined>(value);
  const [localSelection, setLocalSelection] = useState<Date | undefined>(value);

  useEffect(() => {
    // TODO:https://meliorisk.atlassian.net/browse/ME-110373
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (value) setLocalValue(value);
  }, [value]);

  // saves the local selection as value and closes the `FloatingCalendar`.
  const saveSelection = () => {
    setLocalValue(localSelection);
    setIsOpen(false);
    if (localSelection) {
      onSelect?.(localSelection);
    }
  };

  // resets the local selection and closes the `FloatingCalendar`.
  const resetSelection = () => {
    setLocalSelection(value);
    setIsOpen(false);
  };

  const onOpenChange = (isOpen: boolean, triggerEvent?: OpenChangeTriggerEvent) => {
    if (isOpen) {
      setIsOpen(true);
    } else if (triggerEvent === 'outside') {
      // when the user clicks outside the `FloatingCalendar`, it resets the selection and close the `FloatingCalendar`.
      resetSelection();
    }
  };

  return (
    <TableDateCell
      {...args}
      value={localValue}
      selectedDate={localSelection}
      onSelect={(date: Date) => {
        // sets the local selection but don't save it yet.
        setLocalSelection(date);
      }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      footer={
        <Container paddingX="s" paddingY="s">
          <Group justifyContent="space-between" spacing="s">
            <Button variant="secondary" onClick={resetSelection} label="Cancel" />
            <Button variant="primary" onClick={saveSelection} label="Apply" />
          </Group>
        </Container>
      }
    />
  );
};

export const ControlledWithFooterActionsExample = (args: TableDateCellProps) => {
  type TableMeta = { updateData: (rowIndex: number, columnId: string, date: Date) => void };
  const [data, setData] = useState<{ select?: Date }[]>(() => [
    {
      select: undefined,
    },
  ]);

  const columns: TableColumnDef<{ select?: Date }, TableMeta>[] = [
    {
      id: 'select',
      header: 'Select',
      cell: ({ row, rowIndex, columnId, meta }) => (
        <DateCellComponent
          {...args}
          value={row.select}
          onSelect={(date: Date) => {
            meta?.updateData?.(rowIndex, columnId, date);
          }}
        />
      ),
      size: isUsingVisualTesting() ? 'l' : 'm',
    },
  ];

  const tableProps = useTable({
    data,
    columns,
    meta: {
      // Updating only the changed date cell
      updateData: (rowIndex: number, columnId: string, value: Date) => {
        setData((prev) =>
          prev.map((row, index) =>
            index === rowIndex
              ? {
                  ...row,
                  [columnId]: value,
                }
              : row
          )
        );
      },
    },
  });

  return (
    <Card width="fit-content" paddingX="none" paddingY="none">
      <Table {...tableProps} />
    </Card>
  );
};
