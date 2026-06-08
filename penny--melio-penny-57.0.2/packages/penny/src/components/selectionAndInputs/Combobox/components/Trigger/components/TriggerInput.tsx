import { Box } from '@chakra-ui/react';
import {
  type ChangeEvent,
  forwardRef,
  type KeyboardEvent,
  type NamedExoticComponent,
  type Ref,
  useEffect,
} from 'react';

import { useMenuContext } from '@/components/containers/menus/Context';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { type ComboboxOption, type ComboboxProps } from '../../../Combobox.types';

export type TriggerInputProps<V, O extends ComboboxOption<V>> = {
  isMobileTrigger?: boolean;
  options: O[];
  onSelect: (option: O) => void;
  inputValue: string;
  showInputCaret: boolean;
  isOpenWithItems: boolean;
} & Pick<
  ComboboxProps<V, O>,
  | 'autoFocus'
  | 'onInputChange'
  | 'onClick'
  | 'onKeyDown'
  | 'onFocus'
  | 'onBlur'
  | 'isDisabled'
  | 'isReadOnly'
  | 'isLoading'
  | 'isRequired'
  | 'id'
>;

const TriggerInputComponent = <V, O extends ComboboxOption<V>>(
  {
    isMobileTrigger,
    showInputCaret,
    inputValue,
    onInputChange,
    options,
    onKeyDown,
    onSelect,
    isOpenWithItems,
    isDisabled,
    isReadOnly,
    isLoading,
    isRequired,
    ...otherProps
  }: TriggerInputProps<V, O>,
  ref: Ref<HTMLInputElement>
) => {
  const styles = useMultiStyleConfig('Combobox', { showInputCaret });
  const { setActiveIndex, activeIndex } = useMenuContext();
  const activeOption = activeIndex !== null ? options[activeIndex] : undefined;

  useEffect(() => {
    if (!inputValue || isMobileTrigger) return;

    setActiveIndex(isOpenWithItems ? 0 : null);
  }, [inputValue, isMobileTrigger, isOpenWithItems, options, setActiveIndex]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isLoading) return;

    onInputChange?.(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);

    if (event.code === 'Tab' || event.key === 'Tab') {
      // Reset the active index when tabbing to fix tab order when the menu is open and there's an interactive element in the footer.
      setActiveIndex(null);
    }

    if (event.code === 'Enter' || event.key === 'Enter') {
      // Prevent form submission when pressing Enter.
      event.preventDefault();

      if (isOpenWithItems && activeOption) onSelect(activeOption);
    }
  };

  const inputProps = {
    as: 'input' as const,
    'aria-autocomplete': 'list' as const,
    value: inputValue,
    onChange: handleInputChange,
    onKeyDown: handleKeyDown,
    // We need to pass the role explicitly because it may receive a different role when we use "dialog" role on the menu.
    role: 'combobox',
  };

  const buttonProps = {
    as: 'button' as const,
    type: 'button',
    // Remove unwanted form-field props from the button element.
    autoComplete: undefined,
    id: undefined,
    name: undefined,
  };

  return (
    <Box
      data-component="Combobox.TriggerInput"
      ref={ref}
      __css={styles['triggerInput']}
      disabled={isDisabled}
      // @ts-expect-error -- `Box` type issues due to `input` and `button` props.
      readOnly={isReadOnly}
      required={isRequired}
      aria-busy={isLoading || undefined}
      {...otherProps}
      // `tabIndex` is redundant for input and button elements.
      tabIndex={undefined}
      {...(isMobileTrigger ? buttonProps : inputProps)}
      // We need to remove all combobox related props from the input element when it's disabled.
      {...(isDisabled && {
        'aria-autocomplete': undefined,
        'aria-haspopup': undefined,
        'aria-expanded': undefined,
        role: undefined,
      })}
    />
  );
};

export const TriggerInput = forwardRef(TriggerInputComponent) as <V, O extends ComboboxOption<V>>(
  props: TriggerInputProps<V, O> & { ref?: Ref<HTMLInputElement> }
) => ReturnType<typeof TriggerInputComponent>;

(TriggerInput as NamedExoticComponent).displayName = 'Combobox.TriggerInput';
