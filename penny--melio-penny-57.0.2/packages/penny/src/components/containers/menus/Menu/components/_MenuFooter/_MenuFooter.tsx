import { Box } from '@chakra-ui/react';
import { useListItem } from '@floating-ui/react';
import { cloneElement, forwardRef, isValidElement, type KeyboardEvent, useState } from 'react';

import { useStyleConfig } from '@/theme/hooks/use-style-config';

import { useMenuContext } from '../../../Context';
import { type _MenuFooterProps } from './_MenuFooter.types';

/**
 * @private For internal use only.
 */
export const _MenuFooter = forwardRef<HTMLDivElement, _MenuFooterProps>(
  ({ label, isDisabled, onClick, dataTestId, children, ...rest }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    const styles = useStyleConfig('_MenuFooter');

    const { getItemProps, activeIndex } = useMenuContext();
    const { ref: itemRef, index } = useListItem();

    const handleClick = () => {
      if (!isDisabled) {
        onClick?.();
      }
    };

    const itemProps = getItemProps({
      ref: itemRef,
      tabIndex: activeIndex === index ? 0 : -1,
      onClick: handleClick,
      onKeyDown: (event: KeyboardEvent) => {
        event.preventDefault();
        if (event.key === 'Enter') {
          handleClick();
        }
      },
    });

    const childrenWithProps =
      isValidElement(children) &&
      cloneElement(children, { 'data-hover': isHovered || undefined, isDisabled, ...itemProps } as Record<
        string,
        unknown
      >);

    return (
      <Box
        ref={ref}
        data-component="Menu.Footer"
        __css={styles}
        role="menuitem"
        data-disabled={isDisabled || undefined}
        {...rest}
        aria-label={label}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-testid={dataTestId ?? 'menu-footer-btn'}
      >
        {childrenWithProps}
      </Box>
    );
  }
);

_MenuFooter.displayName = 'Menu.Footer';
