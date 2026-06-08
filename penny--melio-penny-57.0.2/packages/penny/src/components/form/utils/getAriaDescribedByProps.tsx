import { type ReactNode } from 'react';

export const getAriaDescribedByProps = ({
  id,
  error,
  helperText,
  maxChars,
}: {
  id?: string;
  error?: { message?: string };
  helperText?: string | ReactNode;
  maxChars?: number;
}) => {
  // Create IDs for the helper text and max chars elements
  const helperTextId = helperText ? `${id}-helper-text` : '';
  const errorMessageId = error?.message ? `${id}-error-message` : '';
  const maxCharsId = maxChars ? `${id}-max-chars` : '';

  /**
   * `aria-describedby` is necessary to associate the input with the helper text and max chars elements.
   * attribute expects an ([ID reference list](https://www.w3.org/TR/wai-aria/#typemapping)) as it's value. Multiple IDs can be provided, separated by spaces.
   */
  const fieldAriaDescribedby = [helperTextId, errorMessageId, maxCharsId].filter((id) => !!id).join(' ');

  return {
    helperTextId,
    errorMessageId,
    maxCharsId,
    'aria-describedby': fieldAriaDescribedby,
  };
};
