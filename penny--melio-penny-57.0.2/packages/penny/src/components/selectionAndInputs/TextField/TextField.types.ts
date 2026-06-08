import { type InputProps as ChakraInputProps } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';
import { type ReactElement, type Ref } from 'react';
import { type MaskedInputProps } from 'react-text-mask';

import { type CommonInputProps } from '@/components/form/components/Form/inputs/types';
import { type FormSize } from '@/theme/utils/form.utils';

type MaskProps = Pick<MaskedInputProps, 'mask'> &
  Partial<Pick<MaskedInputProps, 'guide' | 'placeholderChar' | 'keepCharPositions' | 'showMask' | 'pipe'>>;

export type Align = 'start' | 'end';

export type TextFieldProps = Omit<ChakraInputProps, 'variant' | 'size' | 'isReadOnly'> & {
  /**
   * The size of the field.
   * @default 'large'
   */
  size?: FormSize;

  /**
   * value alignment.
   * @default 'start'
   */
  align?: Align;

  /**
   * Sets the field as read-only.
   * @default false
   */
  isReadOnly?: boolean;

  /**
   * Sets the field in loading state.
   * @default false
   */
  isLoading?: boolean;

  /**
   * Sets the field as view-mode.
   * @default false
   */
  isViewMode?: boolean;

  /**
   * The maximum length (in characters) of the text field.
   */
  maxChars?: number;

  /**
   * The placeholder text for when there is no value and the field is in view-only mode.
   */
  viewModePlaceholder?: string;

  /**
   * Options for input masking.
   * See [text-mask](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme) for more information.
   */
  maskProps?: MaskProps;
} & CommonInputProps &
  TestIdProp;

// The left and right elements and containerRef are used only internally.
// eslint-disable-next-line @typescript-eslint/naming-convention
export type _TextFieldProps = TextFieldProps & {
  leftElement?: ReactElement;
  rightElement?: ReactElement;
  containerRef?: Ref<HTMLDivElement>;
};
