import { useAutoFocus } from '@melio/penny-utils';
import { type RefObject, useEffect, useState } from 'react';

import { type MultiSelectOption, type MultiSelectProps } from '../../../MultiSelect.types';

type UseTriggerFocusOptions<V, O extends MultiSelectOption<V>> = {
  inputRef: RefObject<HTMLInputElement>;
  isOpen: boolean;
  isFocusable: boolean;
} & Pick<MultiSelectProps<V, O>, 'onBlur' | 'onFocus' | 'autoFocus'>;

type UseTriggerFocusReturn<V, O extends MultiSelectOption<V>> = {
  isFocused: boolean;
  tabIndex: number;
} & Pick<UseTriggerFocusOptions<V, O>, 'onBlur' | 'onFocus'>;

export const useTriggerFocus = <V, O extends MultiSelectOption<V>>({
  inputRef,
  autoFocus,
  isOpen,
  isFocusable,
  onFocus,
  onBlur,
}: UseTriggerFocusOptions<V, O>): UseTriggerFocusReturn<V, O> => {
  useAutoFocus(inputRef, autoFocus);

  const [isFocused, setIsFocused] = useState(false);

  // This is to blur the input when closing the menu by clicking outside.
  useEffect(() => {
    if (isOpen || !isFocused) return;

    inputRef.current?.focus();
  }, [isOpen, isFocused, inputRef]);

  return {
    onFocus: (event) => {
      if (isFocused || !isFocusable) return;

      setIsFocused(true);
      onFocus?.(event);
    },
    onBlur: (event) => {
      if (isOpen || !isFocused) return;

      setIsFocused(false);
      onBlur?.(event);
    },
    tabIndex: isFocusable ? 0 : -1,
    isFocused,
  };
};
