import { type DateTimeFormat, formatDateTime, isEqualDates, noop } from '@melio/penny-utils';
import { forwardRef, type ReactNode, useEffect, useState } from 'react';

import { Group } from '@/components/containers/Group/Group';
import { type OpenChangeTriggerEvent } from '@/components/containers/menus/Context/types';
import { Text } from '@/components/dataDisplay/Text/Text';
import { Icon } from '@/components/foundations/Icon/Icon';
import type { _BaseCalendarProps } from '@/components/internal/_BaseCalendar/_BaseCalendar.types';
import { FloatingCalendar } from '@/components/selectionAndInputs/FloatingCalendar/FloatingCalendar';
import { type FloatingCalendarProps } from '@/components/selectionAndInputs/FloatingCalendar/FloatingCalendar.types';

import { TableCell } from '../TableCell/TableCell';

export type TableDateCellProps = {
  onSelect: FloatingCalendarProps['onSelect'];
  placeholder: string;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  value?: FloatingCalendarProps['value'];
  displayValue?: ReactNode;
  defaultIsOpen?: boolean;
  'data-testid'?: string;
  format?: DateTimeFormat;
  selectedDate?: Date;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean, triggerEvent?: OpenChangeTriggerEvent) => void;
} & Pick<
  FloatingCalendarProps,
  | 'minDate'
  | 'maxDate'
  | 'shouldDisableDate'
  | 'weekDays'
  | 'secondarySelectedDate'
  | 'showToday'
  | 'legendItems'
  | 'backButton'
  | 'legendWidth'
  | 'footer'
  | 'shouldTrapFocus'
> &
  Pick<_BaseCalendarProps, 'selectedDateAriaLabel' | 'secondaryDateAriaLabel' | 'currentDateAriaLabel'>;

export const TableDateCell = forwardRef<HTMLDivElement, TableDateCellProps>(
  (
    {
      isReadOnly,
      isDisabled,
      isLoading,
      placeholder,
      value,
      displayValue,
      onSelect,
      defaultIsOpen,
      weekDays,
      shouldDisableDate,
      secondarySelectedDate,
      minDate,
      maxDate,
      showToday,
      backButton,
      legendItems,
      format,
      footer,
      isOpen,
      onOpenChange,
      selectedDate,
      shouldTrapFocus,
      selectedDateAriaLabel,
      secondaryDateAriaLabel,
      currentDateAriaLabel,
      ...props
    },
    ref
  ) => {
    const isEnabled = !isDisabled && !isReadOnly && !isLoading;
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(((defaultIsOpen || isOpen) ?? false) && isEnabled);
    const [localSelectedDate, setLocalSelectedDate] = useState<Date | undefined>(value ?? selectedDate ?? undefined);
    const isControlledOpenState = isOpen !== undefined && onOpenChange !== undefined;

    useEffect(() => {
      if (!isControlledOpenState) return;
      setIsMenuOpen(isOpen);
    }, [isControlledOpenState, isOpen]);

    useEffect(() => {
      setLocalSelectedDate(selectedDate);
    }, [selectedDate]);

    useEffect(() => {
      // updates localSelectedDate if selectedDate is undefined.
      if (!selectedDate) {
        setLocalSelectedDate(value);
      } // update localSelectedDate if selectedDate and value are the same. (is controlled out of context)
      else if (selectedDate && value && isEqualDates(value, selectedDate)) {
        setLocalSelectedDate(value);
      }
    }, [value, selectedDate]);

    const handleOpenChange = (isOpen: boolean, triggerEvent?: OpenChangeTriggerEvent) => {
      if (onOpenChange) {
        onOpenChange(isOpen, triggerEvent);
      } else {
        setIsMenuOpen(isOpen);
      }
    };

    const formattedDate = formatDateTime(value, { format });

    const labelColor = value
      ? isDisabled
        ? 'semantic.text.disabled'
        : isReadOnly
          ? 'semantic.text.secondary'
          : 'semantic.text.primary'
      : 'semantic.text.secondary';

    const displayValueContent =
      typeof displayValue === 'string' ? (
        <Text textStyle="inline" color={labelColor}>
          {displayValue}
        </Text>
      ) : (
        displayValue
      );

    const valueContent = (
      <Text textStyle="inline" color={labelColor}>
        {value ? formattedDate : placeholder}
      </Text>
    );

    const selectCell = (
      // TODO: remove empty onClick. It must be passed in order for the hover background color to show.
      // ticket - ME-452 - https://meliorisk.atlassian.net/browse/ME-452
      <TableCell
        data-component="TableDateCell"
        data-testid="table-date-cell"
        onClick={isReadOnly || isDisabled ? undefined : noop}
        ref={ref}
        tabIndex={isDisabled ? -1 : 0}
        aria-disabled={isDisabled}
        role="button"
        data-readonly={isReadOnly || null}
        {...props}
      >
        <Group width="full" alignItems="center" justifyContent="space-between" spacing="m">
          <>
            {displayValueContent ?? valueContent}
            {!isReadOnly && !isDisabled && !isLoading && (
              <Icon type={isMenuOpen ? 'caret-up' : 'caret-down'} size="small" color="default" aria-hidden />
            )}
          </>
        </Group>
      </TableCell>
    );

    const floatingCalendarTestId = `${props['data-testid'] || 'table-date-cell'}-dropdown-floating-calendar`;

    if (isReadOnly) {
      return selectCell;
    }

    return (
      <FloatingCalendar
        trigger={selectCell}
        isOpen={isMenuOpen}
        onOpenChange={handleOpenChange}
        isDisabled={isDisabled}
        onSelect={onSelect}
        value={localSelectedDate}
        weekDays={weekDays}
        shouldDisableDate={shouldDisableDate}
        secondarySelectedDate={secondarySelectedDate}
        minDate={minDate}
        maxDate={maxDate}
        showToday={showToday}
        backButton={backButton}
        legendItems={legendItems}
        data-testid={floatingCalendarTestId}
        footer={footer}
        shouldTrapFocus={shouldTrapFocus}
        selectedDateAriaLabel={selectedDateAriaLabel}
        secondaryDateAriaLabel={secondaryDateAriaLabel}
        currentDateAriaLabel={currentDateAriaLabel}
      />
    );
  }
);

TableDateCell.displayName = 'TableDateCell';
