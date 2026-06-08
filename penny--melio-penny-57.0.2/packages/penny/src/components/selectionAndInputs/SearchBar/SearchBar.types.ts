import { type TestIdProp } from '@melio/penny-utils';
import { type AriaAttributes, type InputHTMLAttributes } from 'react';

import { type _BaseInputProps } from '../../types';

export type SearchBarProps = _BaseInputProps & {
  /**
   * If set to true, the search bar is disabled
   */
  isDisabled?: boolean;

  /**
   * Performs an action when the clear button or icon is clicked to remove the search text.
   */
  onClear?: VoidFunction;

  /**
   * If set to true, the search bar will take the full width of its parent and will not expand / collapse.
   */
  isFullWidth?: boolean;

  /**
   * The label of the SearchBar component.
   */
  label?: string;

  /**
   * The instructions the screen-reader will read, when the search field focus (used for accessibility).
   */
  instructionsText?: string;

  /**
   * The message the screen-reader will read, when the search field value cleared (used for accessibility).
   */
  valueClearedMessage?: string;

  /**
   * Triggers an action when the search button clicked or when pressing Enter using the keyboard. When using the `onSearch` event, the search icon will be displayed on the right side of the search bar as button.
   */
  onSearch?: (value?: InputHTMLAttributes<HTMLInputElement>['value']) => void;

  /**
   * The aria-label of the search button
   */
  searchButtonAriaLabel?: string;

  /**
   * The aria-label of the clear button
   */
  clearButtonAriaLabel?: string;

  /**
   * The props to be passed to the input element.
   */
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
} & AriaAttributes &
  TestIdProp;
