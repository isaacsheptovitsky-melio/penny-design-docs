import { Box } from '@chakra-ui/react';
import { type ComponentPropsWithoutRef, type ForwardedRef, forwardRef, type NamedExoticComponent } from 'react';

import { FloatingMenuSelectionItem } from '@/components/containers/menus/FloatingMenu';

import { type SelectNewOption, type SelectNewProps } from '../SelectNew.types';

export type OptionProps<V, O extends SelectNewOption<V>> = {
  option: O;
  id: string;
  setActiveOptionId: (id: string) => void;
} & Pick<ComponentPropsWithoutRef<typeof FloatingMenuSelectionItem>, 'onClick' | 'disabled' | 'isSelected'> &
  Pick<SelectNewProps<V, O>, 'optionRenderer' | 'data-testid'>;

const OptionComponent = <V, O extends SelectNewOption<V>>(
  { option, optionRenderer, onClick, isSelected = false, id, setActiveOptionId, ...otherProps }: OptionProps<V, O>,
  ref: ForwardedRef<HTMLDivElement>
) => (
  <FloatingMenuSelectionItem
    data-component="SelectNew.Option"
    role="option"
    label={option.label}
    isSelected={isSelected}
    aria-selected={isSelected}
    disabled={option.disabled}
    id={id}
    onFocus={() => setActiveOptionId(id)}
    onBlur={() => setActiveOptionId('')}
    {...(!option.disabled && { onClick })}
    {...otherProps}
    ref={ref}
  >
    {optionRenderer?.(option, isSelected) ?? (
      <Box as="span" textStyle="inline" color="inherit">
        {option.label}
      </Box>
    )}
  </FloatingMenuSelectionItem>
);

export const Option = forwardRef(OptionComponent) as <V, O extends SelectNewOption<V>>(
  props: OptionProps<V, O> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof OptionComponent>;

(Option as NamedExoticComponent).displayName = 'SelectNew.Option';
