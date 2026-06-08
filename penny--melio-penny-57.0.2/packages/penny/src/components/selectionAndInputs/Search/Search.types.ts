import { type ReactNode } from 'react';

import { type CommonInputProps } from '@/components/form/components/Form/inputs/types';
import {
  type BaseSelectBaseProps,
  type BaseSelectOption,
  type BaseSelectSection,
} from '@/components/internal/BaseSelect';

export type SearchValue = string | Record<string, unknown>;

/**
 * @deprecated Please use `ComboboxProps` instead.
 */
export type SearchProps = Pick<
  BaseSelectBaseProps<SearchValue>,
  | 'placeholder'
  | 'viewModePlaceholder'
  | 'size'
  | 'isDisabled'
  | 'isViewMode'
  | 'isReadOnly'
  | 'isInvalid'
  | 'isLoading'
  | 'shouldShowPresetOptions'
  | 'onInputChange'
  | 'onChange'
  | 'emptyState'
  | 'onKeyDown'
  | 'onFocus'
  | 'onBlur'
  | 'onClick'
  | 'formatSelectedValue'
  | 'creatableOption'
  | 'valueRightElement'
  | 'onSearchTermReset'
  | 'aria-label'
> &
  CommonInputProps & {
    emptyState: BaseSelectBaseProps<SearchValue>['emptyState'];
    debounce?: number;
    options: SearchOptions;
    value?: SearchValue;
    filterOptions?: BaseSelectBaseProps<SearchValue>['filterOptions'];
    isLoadingField?: boolean;
    onClear?: VoidFunction;
    clearButtonAriaLabel?: string;
    statusMessageParentSelector?: string;
    children?: ReactNode;
  };

export type SearchOption = BaseSelectOption<SearchValue>;

export type SearchSection = BaseSelectSection<SearchValue>;

export type SearchOptions = SearchOption[] | SearchSection[];
