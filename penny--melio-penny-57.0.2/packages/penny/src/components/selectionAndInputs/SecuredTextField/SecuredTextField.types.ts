import { type TestIdProp } from '@melio/penny-utils';

import { type TextFieldProps } from '../TextField';

export type SecuredTextFieldProps = TextFieldProps &
  TestIdProp & {
    /**
     * Hides the toggle button that toggles the visibility of the input value.
     * @default false
     */
    disableToggle?: boolean;

    /**
     * Decides if the value in the input is visible or masked.
     * @default false
     */
    isTextVisible?: boolean;

    /**
     * A function that returns the aria-label for the toggle visibility button.
     */
    getToggleVisibilityAriaLabel?: (isTextVisible: boolean) => string;
  };
