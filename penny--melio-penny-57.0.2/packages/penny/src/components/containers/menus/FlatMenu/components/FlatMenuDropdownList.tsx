import { forwardRef } from 'react';

import { DropdownList as _DropdownList, type DropdownListProps } from '../../Context/components';

export const FlatMenuDropdownList = forwardRef<HTMLDivElement, DropdownListProps>((props, ref) => (
  <_DropdownList data-component="FlatMenuDropdownList" {...props} ref={ref} />
));

FlatMenuDropdownList.displayName = 'FlatMenuDropdownList';
