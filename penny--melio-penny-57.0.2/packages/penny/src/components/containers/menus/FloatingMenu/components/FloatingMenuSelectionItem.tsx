import { forwardRef } from 'react';

import { SelectionItem as _SelectionItem, type SelectionItemProps } from '../../Context/components';

export const FloatingMenuSelectionItem = forwardRef<HTMLDivElement, SelectionItemProps>((props, ref) => (
  <_SelectionItem data-component="FloatingMenuSelectionItem" {...props} ref={ref} />
));

FloatingMenuSelectionItem.displayName = 'FloatingMenuSelectionItem';
