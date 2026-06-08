import { Box, type BoxProps } from '@chakra-ui/react';
import { useListItem, useMergeRefs } from '@floating-ui/react';
import { useBoolean } from '@melio/penny-utils';
import { type FocusEvent, forwardRef, type KeyboardEvent, type KeyboardEventHandler } from 'react';

import { useStyleConfig } from '@/theme/hooks/use-style-config';

import { useMenuContext } from '../..';
import type { ItemProps } from './Item.types';

export const Item = forwardRef<HTMLDivElement, ItemProps>(
  (
    { onClick, onFocus, children, isSelected, disabled, label, index: indexProp, onKeyDown, isMulti = false, ...props },
    componentRef
  ) => {
    const { getItemProps, activeIndex, elementsRef } = useMenuContext();
    const { ref: listItemRef, index: listItemIndex } = useListItem({ label: disabled ? null : label });
    const styles = useStyleConfig('MenuItem', { isMulti });
    const index = indexProp ?? listItemIndex;
    const virtualItemRef = (node: HTMLDivElement | null) => {
      elementsRef.current[index] = node;
    };
    // `useListItem` doesn't work well with async data fetching so we need to use the `index` prop and handle the ref ourselves.
    const navigationRef = indexProp !== undefined ? virtualItemRef : listItemRef;
    const ref = useMergeRefs([navigationRef, componentRef]);

    const isDisabled = disabled || false;
    const isActive = activeIndex === index;

    const handleKeyDown: KeyboardEventHandler = (event: KeyboardEvent<HTMLElement>) => {
      onKeyDown?.(event);

      if (!event.defaultPrevented && ['Space', 'Enter'].includes(event.code)) {
        event.preventDefault();
        onClick?.(event as never, 'content');
      }
    };

    // Using manual hover detection to avoid "focus" styles in hover state.
    const [isHover, setIsHover] = useBoolean(false);

    const {
      onMouseMove,
      onFocus: onItemFocus,
      ...itemProps
    }: BoxProps = getItemProps({
      ref,
      onClick: isDisabled ? undefined : (e) => onClick?.(e, 'content'),
      onKeyDown: isDisabled ? undefined : handleKeyDown,
      onMouseOver: setIsHover.on,
      onMouseOut: setIsHover.off,
      ...props,
    });

    const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
      onFocus?.(event);
      onItemFocus?.(event);
    };

    return (
      <Box
        data-component="Item"
        role="menuitem"
        as="li"
        data-selected={isSelected}
        aria-disabled={isDisabled}
        data-highlighted={isActive || null}
        // Mimics the `:focus-visible` for combobox while other items will use native focus visible selector
        data-focus-visible={(isActive && !isHover) || null}
        __css={styles}
        {...itemProps}
        tabIndex={isActive ? 0 : -1}
        onFocus={handleFocus}
        onMouseMove={onMouseMove}
      >
        {children}
      </Box>
    );
  }
);

Item.displayName = 'Item';
