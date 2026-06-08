import {
  type AriaAttributes,
  type ChangeEventHandler,
  type FocusEventHandler,
  type KeyboardEventHandler,
  type MouseEventHandler,
  type ReactElement,
} from 'react';

import { type BrandSymbolKey, type FormSize, type IconKey } from '../../../theme';
import { type AvatarProps, type PillProps } from '../../dataDisplay';

export type Option<T> = {
  value: T;
  label: string;
  description?: string;
  rightIcon?: IconKey;
  pillProps?: PillProps;
  testId?: string;
} & OneOrNone<{
  avatarProps: Partial<Pick<AvatarProps, 'name' | 'data-testid' | 'bgColor' | 'src' | 'badge'>>;
  leftIcon: BrandSymbolKey;
}>;

export type SectionMeta = {
  label: string;
  icon?: 'verified';
};

export type Section<T> = {
  metadata: SectionMeta;
  options: Option<T>[];
};

export type OptionWithSection<T> = Option<T> & { section: SectionMeta };

export type CallbackOptions = {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLElement>;
  onFocus?: FocusEventHandler<HTMLElement>;
  onBlur?: FocusEventHandler<HTMLElement>;
  onClick?: MouseEventHandler<HTMLElement>;
};

export type BaseProps<T> = {
  placeholder?: string;
  viewModePlaceholder?: string;
  size?: FormSize;
  valueRightElement?: ReactElement;
  emptyState?: {
    label: string;
    onClick?: VoidFunction;
  };
  creatableOption?: {
    label: string | ((value: string) => string);
    onClick?: (inputValue: string) => void;
    shouldDisplay?: (inputValue: string) => boolean;
  };
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isViewMode?: boolean;
  isInvalid?: boolean;
  isLoading?: boolean;
  shouldShowPresetOptions?: boolean;
  onInputChange?: (inputValue: string) => void;
  onSearchTermReset?: VoidFunction;
  filterOptions: <O extends Option<T> | OptionWithSection<T>>(options: O[], searchTerm?: string | null) => O[];
  formatSelectedValue?: (option: Option<T>) => string;
} & CallbackOptions &
  AriaAttributes;

export type BaseTriggerProps<T> = Pick<
  BaseProps<T>,
  | 'isDisabled'
  | 'isReadOnly'
  | 'isViewMode'
  | 'isInvalid'
  | 'isLoading'
  | 'onClick'
  | 'onBlur'
  | 'onFocus'
  | 'size'
  | 'placeholder'
  | 'viewModePlaceholder'
>;
