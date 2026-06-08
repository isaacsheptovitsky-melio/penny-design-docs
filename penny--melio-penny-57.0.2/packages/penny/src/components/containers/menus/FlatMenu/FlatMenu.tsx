import { forwardRef } from 'react';

import { MenuContext } from '../Context';
import { Trigger } from '../Context/components';
import { Dropdown } from './components/Dropdown';
import { type FlatMenuProps } from './FlatMenu.types';

/**
 * The `FlatMenu` component is a static menu that opens directly below its trigger element, fully integrated with the surrounding layout.
 * It is ideal for inline dropdowns, comboboxes, and other embedded menu interactions.
 * The component supports `Header`, `Footer`, `DropdownList` and customizable items.
 * The component is fully accessible, offering seamless keyboard navigation and an optimal experience for screen reader users.
 */
export const FlatMenu = forwardRef<HTMLDivElement, FlatMenuProps>(
  (
    {
      role = 'menu',
      'data-component': dataComponent = 'FlatMenu',
      triggerDropdownGap = 16,
      shouldTrapFocus = false,
      ...props
    },
    ref
  ) => (
    <MenuContext
      data-component={dataComponent}
      role={role}
      triggerDropdownGap={triggerDropdownGap}
      shouldTrapFocus={shouldTrapFocus}
      disableMenuTransform
      disableMenuShift
      shouldFitAvailableHeight={false}
      {...props}
    >
      <Trigger ref={ref} />
      <Dropdown />
    </MenuContext>
  )
);

FlatMenu.displayName = 'FlatMenu';
