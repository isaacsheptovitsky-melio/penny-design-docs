import { forwardRef } from 'react';

import { Item as _Item, type ItemProps } from '../../Context/components';

export const FloatingMenuItem = forwardRef<HTMLDivElement, ItemProps>((props, ref) => (
  <_Item data-component="FloatingMenuItem" {...props} ref={ref} />
));
FloatingMenuItem.displayName = 'FloatingMenuItem';
