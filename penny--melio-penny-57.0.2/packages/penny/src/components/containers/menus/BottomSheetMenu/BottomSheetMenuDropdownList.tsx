import { forwardRef } from 'react';

import { DropdownList as _DropdownList } from '../Context/components/DropdownList/DropdownList';
import { type DropdownListProps } from '../Context/components/DropdownList/DropdownList.types';

export const BottomSheetMenuDropdownList = forwardRef<HTMLDivElement, DropdownListProps>((props, ref) => (
  <_DropdownList data-component="BottomSheetMenuDropdownList" {...props} ref={ref} />
));

BottomSheetMenuDropdownList.displayName = 'BottomSheetMenuDropdownList';
