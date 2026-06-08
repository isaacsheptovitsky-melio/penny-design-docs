import { forwardRef } from 'react';

import { MenuContext } from '../Context';
import { type BottomSheetMenuProps } from './BottomSheetMenu.types';
import { BottomSheetMenuDropdown } from './BottomSheetMenuDropdown';
import { BottomSheetMenuTrigger } from './BottomSheetMenuTrigger';

/**
 * The `BottomSheetMenu` component is an overlay menu that slides up from the bottom of the screen, making it ideal for mobile and compact layouts.
 * The component supports `DropdownList`, `Footer`, and customizable items.
 * The component is fully accessible, offering seamless keyboard navigation and an optimal experience for screen reader users.
 */
export const BottomSheetMenu = forwardRef<HTMLDivElement, BottomSheetMenuProps>(
  (
    { 'data-component': dataComponent = 'BottomSheetMenu', focusItemOnOpen = false, closeButtonAriaLabel, ...props },
    ref
  ) => (
    <MenuContext data-component={dataComponent} focusItemOnOpen={focusItemOnOpen} disablePressOutsideDissmis {...props}>
      <BottomSheetMenuTrigger ref={ref} />
      <BottomSheetMenuDropdown closeButtonAriaLabel={closeButtonAriaLabel} />
    </MenuContext>
  )
);

BottomSheetMenu.displayName = 'BottomSheetMenu';
