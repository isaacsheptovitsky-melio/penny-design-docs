import { Box } from '@chakra-ui/react';
import { forwardRef, type NamedExoticComponent, type Ref } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { type MultiSelectOption, type MultiSelectProps } from '../../../MultiSelect.types';

type TriggerInputProps<V, O extends MultiSelectOption<V>> = Pick<
  MultiSelectProps<V, O>,
  'onClick' | 'onFocus' | 'onBlur' | 'isDisabled' | 'isReadOnly' | 'isLoading' | 'isRequired' | 'aria-required' | 'id'
>;

const TriggerInputComponent = <V, O extends MultiSelectOption<V>>(
  {
    isDisabled,
    isReadOnly,
    isLoading,
    isRequired,
    'aria-required': ariaRequired,
    ...otherProps
  }: TriggerInputProps<V, O>,
  ref: Ref<HTMLInputElement>
) => {
  const styles = useMultiStyleConfig('MultiSelect', {});

  return (
    <Box
      ref={ref}
      data-component="MultiSelect.TriggerInput"
      __css={styles['triggerInput']}
      {...otherProps}
      aria-busy={isLoading || undefined}
      aria-readonly={isReadOnly || undefined}
      aria-disabled={isDisabled || undefined}
      aria-required={isRequired || ariaRequired || undefined}
      // We need to pass the role explicitly because it may receive a different role when we use "dialog" role on the menu.
      role="combobox"
      // We need to remove all combobox related props from the trigger element when it's disabled.
      {...(isDisabled && {
        'aria-autocomplete': undefined,
        'aria-haspopup': undefined,
        'aria-expanded': undefined,
        'aria-activedescendant': undefined,
        'aria-label': undefined,
        'aria-describedby': undefined,
        'aria-labelledby': undefined,
        role: undefined,
      })}
    />
  );
};

export const TriggerInput = forwardRef(TriggerInputComponent) as <V, O extends MultiSelectOption<V>>(
  props: TriggerInputProps<V, O> & { ref?: Ref<HTMLInputElement> }
) => ReturnType<typeof TriggerInputComponent>;

(TriggerInput as NamedExoticComponent).displayName = 'MultiSelect.TriggerInput';
