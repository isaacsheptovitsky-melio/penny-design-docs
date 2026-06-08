import { forwardRef } from 'react';

import { SelectionItem as _SelectionItem, type SelectionItemProps } from '../../Context/components';

export const FlatMenuSelectionItem = forwardRef<HTMLDivElement, SelectionItemProps>((props, ref) => (
  <_SelectionItem data-component="FlatMenuSelectionItem" {...props} ref={ref} />
));

FlatMenuSelectionItem.displayName = 'FlatMenuSelectionItem';
