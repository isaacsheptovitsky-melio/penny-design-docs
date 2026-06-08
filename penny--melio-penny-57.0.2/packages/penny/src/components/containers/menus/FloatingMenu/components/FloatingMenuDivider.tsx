import { forwardRef } from 'react';

import { MenuDivider } from '../../Context/components';

export const FloatingMenuDivider = forwardRef<HTMLDivElement>((props, ref) => (
  <MenuDivider data-component="FloatingMenuDivider" {...props} ref={ref} />
));

FloatingMenuDivider.displayName = 'FloatingMenuDivider';
