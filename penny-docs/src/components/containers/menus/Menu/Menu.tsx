import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { useBreakpoint } from '@/theme/providers/BreakpointProvider';

import { BottomSheetMenu, BottomSheetMenuDropdownList } from '../BottomSheetMenu';
import { FloatingMenu, FloatingMenuDropdownList } from '../FloatingMenu';
import { _MenuFooter } from './components/_MenuFooter/_MenuFooter';
import { _MenuTitle } from './components/_MenuTitle/_MenuTitle';
import type { MenuProps } from './Menu.types';

/**
 * The Menu component is a combination of the `FloatingMenu` (desktop) and the `BottomSheet` (mobile) components.
 * It automatically adapts based on screen size to provide the optimal user experience.
 */
export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      children,
      onOpenChange,
      isOpen,
      title,
      footer,
      size,
      maxHeight,
      isDisabled,
      shouldTrapFocus,
      hasItems = true,
      hasSections,
      'data-testid': dataTestId = 'menu',
      ...props
    },
    ref
  ) => {
    const { isExtraSmallScreen: isMobile } = useBreakpoint();
    const getTestId = useTestId(dataTestId);

    return isMobile ? (
      <BottomSheetMenu
        data-component="Menu"
        ref={ref}
        {...props}
        {...getTestId()}
        isOpen={!isDisabled && isOpen}
        onOpenChange={onOpenChange}
        hasItems={hasItems}
        title={title}
        content={
          <BottomSheetMenuDropdownList
            {...getTestId('dropdown-list')}
            as={hasItems && !hasSections ? 'ul' : 'div'}
            gap="xs"
          >
            {children}
          </BottomSheetMenuDropdownList>
        }
        footer={
          footer && (
            <_MenuFooter {...footer}>
              {typeof footer?.children === 'string' ? <Box>{footer?.children}</Box> : footer.children}
            </_MenuFooter>
          )
        }
      />
    ) : (
      <FloatingMenu
        data-component="Menu"
        ref={ref}
        {...props}
        isOpen={!isDisabled && isOpen}
        onOpenChange={onOpenChange}
        {...getTestId()}
        content={
          <FloatingMenuDropdownList
            {...getTestId('dropdown-list')}
            paddingY="xs"
            as={hasItems && !hasSections ? 'ul' : 'div'}
          >
            {title && <_MenuTitle {...getTestId('title')} label={title} />}
            {children}
          </FloatingMenuDropdownList>
        }
        footer={footer && <_MenuFooter {...footer} />}
        width={(size === 'small' && '198px') || (size === 'large' && '234px') || 'fit-content'}
        maxHeight={maxHeight}
        isDisabled={isDisabled}
        shouldTrapFocus={shouldTrapFocus}
        hasItems={hasItems}
      />
    );
  }
);

Menu.displayName = 'Menu';
