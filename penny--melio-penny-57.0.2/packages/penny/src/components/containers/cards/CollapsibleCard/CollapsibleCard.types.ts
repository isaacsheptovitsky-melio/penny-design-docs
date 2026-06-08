import { type ReactNode } from 'react';

import { type InteractiveCardProps } from '../InteractiveCard';

type TitleOrHeader =
  | {
      title: string;
      description?: string;
      header?: never;
    }
  | {
      header: ReactNode;
      title?: never;
      description?: never;
    };

export type BaseCollapsibleCardProps = Omit<InteractiveCardProps, 'paddingX' | 'paddingY'> &
  TitleOrHeader & {
    /** Determines if the component is expanded, for controlled collapsibleCard */
    isExpanded?: boolean;
    /** The initial state of isExpanded (when disabled/readOnly true defaultIsExpanded is not supported) */
    defaultIsExpanded?: boolean;
    /** Element displayed on the right side of the title. Commonly used to render a status icon. */
    titleRightElement?: ReactNode;
    /** Callback for controlled collapsibleCard, the expanded state should be controlled from outside. */
    onExpandChange?: (expanded: boolean) => void;
  };

type Expanded = { isExpanded: true } | { defaultIsExpanded: true };

type DisabledUnsupportedProps = { disabled: true } & Expanded;

type ReadOnlyUnsupportedProps = { readOnly: true } & Expanded;

//  disallow deprecated props (with custom TS error messages)
type DisallowDeprecatedProps<T> = 'isDisabled' extends keyof T
  ? '`CollapsibleCard` does not support `isDisabled`. Use `disabled` instead.'
  : 'isReadOnly' extends keyof T
    ? '`CollapsibleCard` does not support `isReadOnly`. Use `readOnly` instead.'
    : 'isSelected' extends keyof T
      ? '`CollapsibleCard` does not support `isSelected`. Use `selected` instead.'
      : 'status' extends keyof T
        ? '`CollapsibleCard` does not support `status`. Use `titleRightElement` instead.'
        : T;

type ValidateExpandedState<T> = T extends DisabledUnsupportedProps
  ? '`CollapsibleCard` cannot be expanded when disabled.'
  : T extends ReadOnlyUnsupportedProps
    ? '`CollapsibleCard` cannot be expanded when readOnly.'
    : T;

export type CollapsibleCardValidateProps<T extends BaseCollapsibleCardProps> = ValidateExpandedState<
  DisallowDeprecatedProps<T>
>;

export type CollapsibleCardProps = CollapsibleCardValidateProps<BaseCollapsibleCardProps>;
