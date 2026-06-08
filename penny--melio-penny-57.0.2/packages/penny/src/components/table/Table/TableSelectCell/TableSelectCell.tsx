import { Box } from '@chakra-ui/react';
import { forwardRef, useState } from 'react';

import { NakedButton } from '@/components/action/NakedButton/NakedButton';
import { Group } from '@/components/containers/Group/Group';
import { SelectableDropdownMenu } from '@/components/containers/menus/SelectableDropdownMenu/SelectableDropdownMenu';
import type {
  SelectableDropdownMenuItem,
  SelectableDropdownMenuProps,
} from '@/components/containers/menus/SelectableDropdownMenu/SelectableDropdownMenu.types';
import { BrandSymbol } from '@/components/dataDisplay/BrandSymbol';
import { Text } from '@/components/dataDisplay/Text/Text';
import { Icon } from '@/components/foundations/Icon/Icon';
import { _IconIndicator as IconIndicator } from '@/components/internal/_IconIndicator/_IconIndicator';
import { type _IconIndicatorProps } from '@/components/internal/_IconIndicator/_IconIndicator.types';
import { Image } from '@/components/media/Image/Image';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { isBrandSymbol } from '@/theme/icons/utils';

import { TableCell } from '../TableCell/TableCell';

export type TableSelectCellProps = {
  placeholder?: string;
  options?: SelectableDropdownMenuItem[];
  value?: SelectableDropdownMenuItem['value'];
  onSelect: (option: SelectableDropdownMenuItem['value']) => void;
  optionsToDisplayOnSelect?: SelectableDropdownMenuItem[];
  isReadOnly?: boolean;
  addButton?: {
    text: string;
    onClick: VoidFunction;
    dataTestId?: string;
  };
  footerAction?: SelectableDropdownMenuProps['footer'];
  isLoading?: boolean;
  isInvalid?: boolean;
  'data-testid'?: string;
  tooltipProps?: _IconIndicatorProps['tooltip'];
  popoverProps?: _IconIndicatorProps['popover'];
};

export const TableSelectCell = forwardRef<HTMLDivElement, TableSelectCellProps>(
  (
    {
      placeholder,
      value,
      onSelect,
      options,
      addButton,
      isReadOnly,
      footerAction,
      isLoading,
      optionsToDisplayOnSelect,
      isInvalid,
      popoverProps,
      tooltipProps,
      ...props
    },
    ref
  ) => {
    const styles = useMultiStyleConfig('TableSelectCell', {});

    const selectedOptionToDisplay: SelectableDropdownMenuItem | undefined =
      optionsToDisplayOnSelect?.find((option) => option.value === value) ||
      options?.find((option) => option.value === value);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleSelect = (item: SelectableDropdownMenuItem) => {
      if (!value || item.value !== value) {
        onSelect(item.value);
      }
      setIsMenuOpen(false);
    };

    const iconOrImage = selectedOptionToDisplay?.icon ? (
      isBrandSymbol(selectedOptionToDisplay.icon) ? (
        <BrandSymbol type={selectedOptionToDisplay.icon} size="medium" aria-hidden />
      ) : (
        <Icon size="small" type={selectedOptionToDisplay?.icon} color="default" aria-hidden />
      )
    ) : (
      selectedOptionToDisplay?.image && (
        <Image
          src={selectedOptionToDisplay.image.src}
          alt={selectedOptionToDisplay.image.alt}
          {...(!selectedOptionToDisplay.image.alt ? { 'aria-hidden': true } : {})}
        />
      )
    );

    const optionLabel = selectedOptionToDisplay?.label ?? placeholder;
    const dataTestIdPrefix = props['data-testid'] ?? 'table-select-cell';
    const dropdownSelectableTestId = `${dataTestIdPrefix}-dropdown-selectable`;

    const warningIcon = (
      <IconIndicator
        variant="warning"
        {...(popoverProps ? { popover: popoverProps } : tooltipProps ? { tooltip: tooltipProps } : {})}
        data-testid={`${dataTestIdPrefix}-warning-icon`}
      />
    );
    const caretIcon = <Icon type={isMenuOpen ? 'caret-up' : 'caret-down'} size="small" color="default" aria-hidden />;
    const showWarningIcon = !isLoading && isInvalid;
    const triggerRight = !isLoading && !isReadOnly && caretIcon;
    const noOptionsRight = showWarningIcon ? warningIcon : undefined;

    const tableCell = (
      <TableCell
        data-component="TableSelectCell"
        data-testid="table-select-cell"
        data-readonly={isReadOnly || null}
        {...props}
      >
        <Group width="full" alignItems="center" spacing="none">
          {!!iconOrImage && <Box __css={styles['leftIcon']}>{iconOrImage}</Box>}
          {optionLabel && (
            <Text textStyle="inline" color={!isReadOnly && value ? 'inherit' : 'semantic.text.secondary'}>
              {optionLabel}
            </Text>
          )}
          {!!showWarningIcon && <Box __css={styles['warningIcon']}>{warningIcon}</Box>}
          {!!triggerRight && <Box __css={styles['rightIcon']}>{triggerRight}</Box>}
        </Group>
      </TableCell>
    );

    const optionsWithTestIds = options?.map((option, index) => ({
      ...option,
      index,
      dataTestId: `table-select-cell-dropdown-item-${option.value}`,
    }));

    if (isReadOnly) {
      return tableCell;
    }

    return (
      <>
        {options?.length || selectedOptionToDisplay ? (
          <SelectableDropdownMenu
            selectedItemValue={options?.find((option) => option.value === value)?.value}
            trigger={tableCell}
            items={optionsWithTestIds}
            onOpenChange={setIsMenuOpen}
            onSelect={handleSelect}
            isOpen={isMenuOpen}
            ref={ref}
            footer={footerAction?.label ? footerAction : undefined}
            data-testid={dropdownSelectableTestId}
            size="small"
          />
        ) : (
          <TableCell
            data-component="TableSelectCell"
            onClick={addButton?.onClick}
            ref={ref}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...props}
          >
            <Group alignItems="center" justifyContent="flex-start" spacing="xxs" width="full">
              <NakedButton
                variant="secondary"
                data-hover={isHovered || undefined}
                onClick={addButton?.onClick}
                data-testid={addButton?.dataTestId}
                label={addButton?.text || 'Add'}
              />
              {noOptionsRight}
            </Group>
          </TableCell>
        )}
      </>
    );
  }
);

TableSelectCell.displayName = 'TableSelectCell';
