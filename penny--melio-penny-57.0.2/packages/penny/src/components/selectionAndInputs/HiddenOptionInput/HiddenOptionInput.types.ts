import { type TestIdProp } from '@melio/penny-utils';
import type { HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode } from 'react';

export type HiddenOptionInputProps = {
  /**
   * The content of the hidden option input,
   * it is a render prop that receives hover and active states.
   */
  children: ReactNode;
  /**
   * If `true`, the input is selected.
   */
  selected: boolean;
  /**
   * The type of the input element.
   * @default 'radio'
   */
  type?: HTMLInputTypeAttribute;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'children'> &
  TestIdProp;
