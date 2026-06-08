import type { AriaAttributes } from 'react';
import { forwardRef, useState } from 'react';

import { IconButton } from '@/components/action/IconButton/IconButton';
import { ActionsDropdownMenu } from '@/components/containers/menus/ActionsDropdownMenu/ActionsDropdownMenu';
import { type ActionsDropdownMenuItemProps } from '@/components/containers/menus/ActionsDropdownMenu/ActionsDropdownMenu.types';
import type { TriggerPropsGetter } from '@/components/containers/menus/Context';
import { Tooltip } from '@/components/dataDisplay/Tooltip/Tooltip';

import { TableCell } from '../TableCell/TableCell';

export type TableActionsCellProps = {
  options: ActionsDropdownMenuItemProps[];
  isDisabled?: boolean;
  isLoading?: boolean;
  'data-testid'?: string;
  tooltipLabel?: string;
} & AriaAttributes;

export const TableActionsCell = forwardRef<HTMLDivElement, TableActionsCellProps>(
  (
    {
      options,
      isDisabled = false,
      isLoading,
      tooltipLabel = 'Options',
      'aria-label': ariaLabel = 'Table actions trigger',
      ...props
    },
    ref
  ) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return !isLoading ? (
      <TableCell
        data-component="TableActionsCell"
        data-testid="table-actions-cell"
        ref={ref}
        {...props}
        textAlign="center"
      >
        <ActionsDropdownMenu
          isOpen={isMenuOpen}
          onOpenChange={setIsMenuOpen}
          trigger={(getTriggerProps: TriggerPropsGetter) => (
            <Tooltip content={tooltipLabel} isEnabled={!isMenuOpen}>
              <IconButton
                isDisabled={isDisabled}
                icon="more-vertical"
                data-testid="table-actions-cell-button"
                size="extra-small"
                variant="naked"
                aria-label={ariaLabel}
                {...getTriggerProps()}
              />
            </Tooltip>
          )}
          isDisabled={isDisabled}
          items={options}
        />
      </TableCell>
    ) : (
      <TableCell ref={ref} /> // we need this empty cell for the Blanket to be positioned properly when isLoading
    );
  }
);

TableActionsCell.displayName = 'TableActionsCell';
