import { forwardRef } from 'react';

import { SelectionItem as _SelectionItem } from '../Context/components/SelectionItem/SelectionItem';
import { type SelectionItemProps } from '../Context/components/SelectionItem/SelectionItem.types';

export const BottomSheetMenuSelectionItem = forwardRef<HTMLDivElement, SelectionItemProps>((props, ref) => (
  <_SelectionItem data-component="BottomSheetMenuSelectionItem" {...props} ref={ref} />
));

BottomSheetMenuSelectionItem.displayName = 'BottomSheetMenuSelectionItem';
