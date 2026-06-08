import { forwardRef } from 'react';

import { Item as _Item } from '../Context/components/Item/Item';
import { type ItemProps } from '../Context/components/Item/Item.types';

export const BottomSheetMenuItem = forwardRef<HTMLDivElement, ItemProps>((props, ref) => (
  <_Item data-component="BottomSheetMenuItem" {...props} ref={ref} />
));

BottomSheetMenuItem.displayName = 'BottomSheetMenuItem';
