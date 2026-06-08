import { type ComponentPropsWithoutRef, forwardRef } from 'react';

import { FloatingMenuSelectionItem } from '@/components/containers/menus/FloatingMenu';

export type OptionProps = ComponentPropsWithoutRef<typeof FloatingMenuSelectionItem>;

export const Option = forwardRef<HTMLDivElement, OptionProps>((props: OptionProps, ref) => (
  <FloatingMenuSelectionItem
    data-component="MultiSelect.Option"
    role="option"
    isMulti
    aria-selected={props.isSelected}
    {...props}
    ref={ref}
  />
));

Option.displayName = 'MultiSelect.Option';
