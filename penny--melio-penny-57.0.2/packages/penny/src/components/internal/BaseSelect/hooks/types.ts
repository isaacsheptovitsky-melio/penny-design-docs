import { type GetTestId } from '@melio/penny-utils';
import {
  type UseComboboxGetItemPropsReturnValue,
  type UseComboboxReturnValue,
  type UseSelectReturnValue,
} from 'downshift';
import { type Ref, type RefObject } from 'react';

import { type CallbackOptions, type Option, type Section } from '../BaseSelect.types';

export type BaseUseSelectOptions<T> = {
  ref: Ref<HTMLInputElement>;
  clearButtonRef?: RefObject<HTMLButtonElement>;
  options: Option<T>[] | Section<T>[];
  value?: T;
} & CallbackOptions;

export type BaseUseMultiSelectOptions<T> = {
  ref: Ref<HTMLElement>;
  options: Option<T>[];
  value?: T[];
} & CallbackOptions;

export type GetOptionProps<T> = (options: {
  index: number;
  option: Option<T>;
  isCreatableOption?: boolean;
}) => UseComboboxGetItemPropsReturnValue & {
  isHighlighted: boolean;
  isFocused: boolean;
  isSelected?: boolean;
  'data-testid'?: string;
};

export type GetOptionPropsHelperOptions<T> = (
  | Pick<UseComboboxReturnValue<Option<T>>, 'getItemProps' | 'highlightedIndex'>
  | Pick<UseSelectReturnValue<Option<T>>, 'getItemProps' | 'highlightedIndex'>
) & { getTestId: GetTestId; focusedIndex: number; resetFocusedIndex: VoidFunction; selectedOption?: Option<T> | null };

export type UseGetStatusMessageOptions = {
  isLoading?: boolean;
  optionsCount: number;
  emptyStateLabel?: string;
};

export type GetStatusMessage = (isOpen: boolean) => string;
