import { type ReactNode } from 'react';

import { type CommonInputProps } from '@/components/form/components/Form/inputs/types';
import {
  type BaseSelectBaseProps,
  type BaseSelectOption,
  type BaseSelectSection,
} from '@/components/internal/BaseSelect';

export type SelectValue = string | Record<string, unknown>;

/**
 * @deprecated Please use `SelectNewProps` instead.
 */
export type SelectProps = Pick<
  BaseSelectBaseProps<SelectValue>,
  | 'placeholder'
  | 'viewModePlaceholder'
  | 'size'
  | 'creatableOption'
  | 'isDisabled'
  | 'isViewMode'
  | 'isReadOnly'
  | 'isInvalid'
  | 'isLoading'
  | 'onInputChange'
  | 'onChange'
  | 'onClick'
  | 'formatSelectedValue'
  | 'onKeyDown'
  | 'onFocus'
  | 'onBlur'
  | 'valueRightElement'
  | 'onSearchTermReset'
  | 'aria-label'
> &
  CommonInputProps & {
    emptyState: BaseSelectBaseProps<SelectValue>['emptyState'];
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    options: SelectOptions;
    value?: SelectValue;
    id?: string;
    children?: ReactNode;
  };

/**
 * @deprecated Please use `SelectNewOption` instead.
 */
export type SelectOption = BaseSelectOption<SelectValue>;

/**
 * @deprecated
 */
export type SelectSection = BaseSelectSection<SelectValue>;

/**
 * @deprecated Please use `SelectNewOption` instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export type SelectOptions = SelectOption[] | SelectSection[];
