import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { Button } from '@/components/action/Button';
import { NakedButton } from '@/components/action/NakedButton';
import { Tooltip } from '@/components/dataDisplay/Tooltip';
import { ConditionalWrapper } from '@/components/internal/ConditionalWrapper';
import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils/constants';
import { useBreakpoint } from '@/theme/providers/BreakpointProvider';

import { Menu } from '../Menu';
import type { SelectableDropdownMenuProps } from './SelectableDropdownMenu.types';
import { SelectableItem } from './SelectableItem';

/**
 * A dropdown menu component that allows selection of items from a list.
 * Provides a structured interface for single-item selection with optional footer actions.
 */
export const SelectableDropdownMenu = forwardRef<HTMLDivElement, SelectableDropdownMenuProps>(
  (
    {
      items,
      selectedItemValue,
      onSelect,
      footer,
      'data-testid': dataTestId = COMPONENTS_DEFAULT_TEST_IDS.SELECTABLE_DROPDOWN_MENU,
      ...props
    },
    ref
  ) => {
    const { isExtraSmallScreen: isMobile } = useBreakpoint();
    const getTestId = useTestId(dataTestId);

    const footerChildren =
      footer &&
      (footer?.type === 'button' ? (
        <Button
          label={footer.label}
          isDisabled={footer.isDisabled}
          variant="tertiary"
          isFullWidth
          size={isMobile ? 'large' : 'medium'}
          {...getTestId('footer-action')}
        />
      ) : (
        <NakedButton
          label={footer.label}
          isDisabled={footer.isDisabled}
          variant={footer.variant ?? 'secondary'}
          {...getTestId('footer-action')}
        />
      ));

    return (
      <Menu
        data-component="SelectableDropdownMenu"
        footer={footer && { ...footer, children: footerChildren }}
        ref={ref}
        {...getTestId()}
        {...props}
      >
        {items?.map((item, index) => {
          const { dataTestId: itemDataTestId, label, value, onClick, tooltipProps, ...itemProps } = item;

          return (
            <ConditionalWrapper
              key={`${label}-${index}`}
              condition={!!tooltipProps?.content}
              wrapper={(children) => (
                <Tooltip {...(tooltipProps || {})} content={tooltipProps?.content || ''}>
                  {children}
                </Tooltip>
              )}
            >
              <SelectableItem
                {...(itemDataTestId ? { 'data-testid': itemDataTestId } : { ...getTestId('item', value) })}
                {...itemProps}
                label={label}
                value={value}
                isSelected={selectedItemValue === item.value}
                onClick={() => {
                  onClick?.();
                  onSelect?.(item);
                }}
              />
            </ConditionalWrapper>
          );
        })}
      </Menu>
    );
  }
);

SelectableDropdownMenu.displayName = 'SelectableDropdownMenu';
