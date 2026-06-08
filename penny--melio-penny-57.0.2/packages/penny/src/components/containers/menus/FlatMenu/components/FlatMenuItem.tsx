import { forwardRef } from 'react';

import { Item as _Item, type ItemProps } from '../../Context/components';

export const FlatMenuItem = forwardRef<HTMLDivElement, ItemProps>((props, ref) => (
  <_Item data-component="FlatMenuItem" {...props} ref={ref} />
));
FlatMenuItem.displayName = 'FlatMenuItem';
