import { useTestId } from '@melio/penny-utils';
import type { ForwardedRef, NamedExoticComponent } from 'react';
import { forwardRef } from 'react';

import { IconButton } from '@/components/action/IconButton';
import { Tooltip } from '@/components/dataDisplay/Tooltip';
import { ConditionalWrapper } from '@/components/internal/ConditionalWrapper';
import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils/constants';
import { useBreakpoint } from '@/theme/providers/BreakpointProvider';

import { FloatingMenuActionTrigger } from '../FloatingMenu';
import { Menu } from '../Menu';
import { ActionItem } from './ActionItem';
import type {
  ActionsDropdownMenuProps,
  ActionsDropdownMenuValidateProps,
  BaseActionsDropdownMenuProps,
} from './ActionsDropdownMenu.types';

/**
 * A dropdown menu component for displaying action items.
 */
const ActionsDropdownMenuComponent = (
  {
    isOpen,
    onOpenChange,
    trigger,
    label,
    title,
    items,
    size = 'medium',
    variant = 'default',
    icon,
    isDisabled,
    shouldCloseMenuOnItemClick = true,
    triggerAriaLabel,
    isFullWidthTrigger = false,
    'data-testid': dataTestId = COMPONENTS_DEFAULT_TEST_IDS.ACTIONS_DROPDOWN_MENU,
    ...props
  }: ActionsDropdownMenuProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const { isExtraSmallScreen: isMobile } = useBreakpoint();
  const getTestId = useTestId(dataTestId);

  const internalTrigger =
    size === 'small' ? (
      <IconButton
        data-component="ActionsDropdownMenu.Trigger"
        aria-label={triggerAriaLabel}
        aria-expanded={isOpen}
        size="medium"
        icon="more"
        aria-haspopup="menu"
        variant={variant === 'default' ? 'tertiary' : 'secondary-inverse'}
        {...getTestId('trigger')}
      />
    ) : (
      <FloatingMenuActionTrigger
        data-component="ActionsDropdownMenu.Trigger"
        size={size}
        label={label}
        aria-label={triggerAriaLabel}
        aria-expanded={isOpen}
        variant={variant}
        icon={icon}
        isFullWidth={isFullWidthTrigger}
        {...getTestId('trigger')}
      />
    );

  return (
    <Menu
      data-component="ActionsDropdownMenu"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size={size === 'large' ? 'large' : 'small'}
      trigger={trigger ?? internalTrigger}
      title={title ?? (isMobile ? label : undefined)}
      isDisabled={isDisabled}
      ref={ref}
      {...getTestId()}
      {...props}
    >
      {items.map((item, index) => {
        const { dataTestId, label, onClick, tooltipProps, ...itemProps } = item;

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
            <ActionItem
              {...(dataTestId ? { 'data-testid': dataTestId } : getTestId('item', index))}
              onClick={() => {
                if (shouldCloseMenuOnItemClick) {
                  onOpenChange(false);
                }

                onClick?.();
              }}
              {...itemProps}
              label={label}
            />
          </ConditionalWrapper>
        );
      })}
    </Menu>
  );
};

export const ActionsDropdownMenu = forwardRef(ActionsDropdownMenuComponent) as <T extends BaseActionsDropdownMenuProps>(
  props: ActionsDropdownMenuValidateProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof ActionsDropdownMenuComponent>;

(ActionsDropdownMenu as NamedExoticComponent).displayName = 'ActionsDropdownMenu';
