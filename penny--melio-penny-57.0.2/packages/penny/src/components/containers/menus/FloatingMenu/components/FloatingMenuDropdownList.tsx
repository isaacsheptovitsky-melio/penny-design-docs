import { forwardRef } from 'react';

import { DropdownList as _DropdownList, type DropdownListProps } from '../../Context/components';

export const FloatingMenuDropdownList = forwardRef<HTMLDivElement, DropdownListProps>((props, ref) => (
  <_DropdownList data-component="FloatingMenuDropdownList" {...props} ref={ref} />
));

FloatingMenuDropdownList.displayName = 'FloatingMenuDropdownList';
