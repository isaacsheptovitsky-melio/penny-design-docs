import { type TestIdProp } from '@melio/penny-utils';

import { type RadioOption } from '../Radio';
import { type TextFieldProps } from '../TextField';

export type RadioGroupVariant = 'vertical' | 'horizontal';

export type RadioGroupProps = Omit<TextFieldProps, 'value' | 'variant' | 'isLoading'> & {
  /**
   * The currently selected value.
   */
  value?: string;

  /**
   * The radio options to display in the group.
   */
  options: RadioOption[];

  /**
   * The layout orientation of the radio group.
   */
  variant?: RadioGroupVariant;
} & TestIdProp;
