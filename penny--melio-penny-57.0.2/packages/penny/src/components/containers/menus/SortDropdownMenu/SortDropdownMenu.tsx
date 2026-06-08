import { useTestId } from '@melio/penny-utils';
import { cloneElement, forwardRef, isValidElement } from 'react';

import { Tooltip } from '@/components/dataDisplay/Tooltip';
import { ConditionalWrapper } from '@/components/internal/ConditionalWrapper';
import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils/constants';

import { Menu } from '../Menu';
import type { SortDropdownMenuProps } from './SortDropdownMenu.types';
import { SortItem } from './SortItem/SortItem';

/**
 * A dropdown menu component specifically designed for sorting operations.
 * Displays sort options with visual indicators for sort direction (ascending/descending).
 */
export const SortDropdownMenu = forwardRef<HTMLDivElement, SortDropdownMenuProps>(
  (
    {
      items,
      selectedItemIndex,
      sortDirection,
      trigger,
      'data-testid': dataTestId = COMPONENTS_DEFAULT_TEST_IDS.SORT_DROPDOWN_MENU,
      ...props
    },
    ref
  ) => {
    const getTestId = useTestId(dataTestId);

    const triggerWithProps = isValidElement(trigger)
      ? cloneElement(trigger, {
          'data-component': 'SortDropdownMenu.Trigger',
          ...getTestId('trigger'),
          ...trigger.props,
        } as Record<string, unknown>)
      : trigger;

    return (
      <Menu data-component="SortDropdownMenu" {...getTestId()} {...props} trigger={triggerWithProps} ref={ref}>
        {items.map((item, index) => {
          const { dataTestId, onClick, tooltipProps, ...itemProps } = item;

          return (
            <ConditionalWrapper
              key={index}
              condition={!!tooltipProps?.content}
              wrapper={(children) => (
                <Tooltip {...(tooltipProps || {})} content={tooltipProps?.content || ''}>
                  {children}
                </Tooltip>
              )}
            >
              <SortItem
                {...itemProps}
                {...(dataTestId ? { 'data-testid': dataTestId } : { ...getTestId('item', index) })}
                sortDirection={selectedItemIndex === index ? sortDirection : 'none'}
                onClick={() => onClick?.(index)}
              />
            </ConditionalWrapper>
          );
        })}
      </Menu>
    );
  }
);

SortDropdownMenu.displayName = 'SortDropdownMenu';
