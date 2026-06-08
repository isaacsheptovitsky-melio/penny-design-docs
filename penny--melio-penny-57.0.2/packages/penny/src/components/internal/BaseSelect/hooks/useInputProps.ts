import { type UseComboboxGetInputPropsReturnValue, type UseComboboxReturnValue } from 'downshift';
import { type KeyboardEvent, type MouseEvent, useMemo } from 'react';

import { getAutoCompleteProps } from '../../../../utils/form-field-utils';
import { type Option } from '../BaseSelect.types';
import { type BaseUseSelectOptions } from './types';

type UseInputPropsOptions<T> = Pick<BaseUseSelectOptions<T>, 'onBlur' | 'onClick' | 'onFocus' | 'onKeyDown' | 'ref'> & {
  getInputProps: UseComboboxReturnValue<Option<T>>['getInputProps'];
  closeMenu: UseComboboxReturnValue<Option<T>>['closeMenu'];
  disableClick?: boolean;
  isLoading?: boolean;
};

export type UseInputPropsReturn = Omit<UseComboboxGetInputPropsReturnValue, 'autoComplete' | 'aria-labelledby'> &
  ReturnType<typeof getAutoCompleteProps>;

export const useInputProps = <T>({
  ref,
  getInputProps,
  disableClick,
  onClick,
  onKeyDown,
  onBlur,
  closeMenu,
  isLoading,
}: UseInputPropsOptions<T>): UseInputPropsReturn => {
  // Based on https://github.com/downshift-js/downshift#customizing-handlers
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (isLoading) {
        // Prevent Downshift's default 'Enter' behavior.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore -- `preventDownshiftDefault` is a custom property from Downshift.
        event.nativeEvent.preventDownshiftDefault = true;
      }
      // Prevent sending the form when the menu is closed.
      event.preventDefault();
    }
    // Close the menu when the user tabs out of the input.
    if (event.key === 'Tab') closeMenu();

    onKeyDown?.(event);
  };

  const {
    onClick: onInputClick,
    autoComplete,
    ...otherInputProps
  } = getInputProps({
    ref,
    onKeyDown: handleKeyDown,
    onBlur,
    // 'aria-labelledby' causes a11y issue because its value doesn't correspond to an element in the document.
    // The reason is because we use our own label (only when needed) using `FormField` wrapper instead of using `downshift`.
    'aria-labelledby': undefined,
  });

  const handleClick = (event: MouseEvent<HTMLInputElement>) => {
    if (disableClick) return;

    onClick?.(event);
    onInputClick(event);
  };

  const autoCompleteProps = useMemo(() => getAutoCompleteProps({ autoComplete }), [autoComplete]);

  return {
    ...otherInputProps,
    onClick: handleClick,
    ...autoCompleteProps,
  };
};
