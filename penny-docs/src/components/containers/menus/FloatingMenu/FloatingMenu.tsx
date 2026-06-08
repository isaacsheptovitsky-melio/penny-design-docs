import { forwardRef } from 'react';

import { MenuContext } from '../Context';
import { Dropdown } from './components/Dropdown';
import { Trigger } from './components/Trigger';
import type { FloatingMenuProps } from './FloatingMenu.types';

/**
 * The `FloatingMenu` component is a flexible menu that appears as a floating element beside its trigger element.
 * The component supports `Header`, `Footer`, `Section`, `Divider`, `DropdownList` and customizable items.
 */
export const FloatingMenu = forwardRef<HTMLDivElement, FloatingMenuProps>(
  (
    {
      width = '240px',
      maxHeight = '256px',
      role = 'menu',
      hasItems = true,
      'data-component': dataComponent = 'FloatingMenu',
      shouldTrapFocus = false,
      ...props
    },
    ref
  ) => (
    <MenuContext
      width={width}
      maxHeight={maxHeight}
      role={role}
      hasItems={hasItems}
      data-component={dataComponent}
      shouldTrapFocus={shouldTrapFocus}
      {...props}
    >
      <Trigger ref={ref} />
      <Dropdown />
    </MenuContext>
  )
);

FloatingMenu.displayName = 'FloatingMenu';
