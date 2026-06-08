import { Box } from '@chakra-ui/react';
import { forwardRef, type NamedExoticComponent, type Ref } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { type SelectNewOption, type SelectNewProps } from '../../../SelectNew.types';

type TriggerInputProps<V, O extends SelectNewOption<V>> = { isButton: boolean } & Pick<
  SelectNewProps<V, O>,
  'onClick' | 'onFocus' | 'onBlur' | 'isDisabled' | 'isReadOnly' | 'isLoading' | 'isRequired' | 'id'
>;

const TriggerInputComponent = <V, O extends SelectNewOption<V>>(
  { onClick, isButton, isDisabled, isReadOnly, isLoading, isRequired, ...otherProps }: TriggerInputProps<V, O>,
  ref: Ref<HTMLInputElement>
) => {
  const styles = useMultiStyleConfig('SelectNew', {});

  return (
    <Box
      ref={ref}
      data-component="SelectNew.TriggerInput"
      __css={styles['triggerInput']}
      {...otherProps}
      onClick={isDisabled ? undefined : onClick}
      aria-busy={isLoading || undefined}
      aria-readonly={isReadOnly || undefined}
      aria-disabled={isDisabled || undefined}
      aria-required={isRequired || undefined}
      // We need to pass the role explicitly because it may receive a different role when we use "dialog" role on the menu.
      role="combobox"
      // We override combobox and form-related attributes when we have a dialog with search-bar.
      {...(isButton && {
        role: 'button',
        autoComplete: undefined,
        name: undefined,
        'aria-required': undefined,
      })}
      // We need to remove all combobox related props from the trigger element when it's disabled.
      {...(isDisabled && {
        'aria-autocomplete': undefined,
        'aria-haspopup': undefined,
        'aria-expanded': undefined,
        'aria-activedescendant': undefined,
        'aria-labelledby': undefined,
        'aria-label': undefined,
        'aria-describedby': undefined,
        role: undefined,
      })}
    />
  );
};

export const TriggerInput = forwardRef(TriggerInputComponent) as <V, O extends SelectNewOption<V>>(
  props: TriggerInputProps<V, O> & { ref?: Ref<HTMLInputElement> }
) => ReturnType<typeof TriggerInputComponent>;

(TriggerInput as NamedExoticComponent).displayName = 'SelectNew.TriggerInput';
