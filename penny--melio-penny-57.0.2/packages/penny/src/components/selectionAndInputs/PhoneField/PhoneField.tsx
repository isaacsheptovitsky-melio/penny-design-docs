import { type ChangeEvent, forwardRef } from 'react';

import { TextField, type TextFieldProps } from '../TextField';

export type PhoneFieldProps = Omit<TextFieldProps, 'maskProps'>;

/**
 * The Phone Field component is used for collecting phone numbers in forms.
 */
export const PhoneField = forwardRef<HTMLInputElement, PhoneFieldProps>(
  (
    {
      onChange,
      isReadOnly,
      isViewMode,
      autoFocus = false,
      autoComplete = 'tel',
      inputMode = 'tel',
      'data-testid': dataTestId = 'phone-field',
      ...props
    },
    ref
  ) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const unmaskedValue = event.target.value.replace(/[^\d]/g, '');

      onChange?.({ target: { value: unmaskedValue } } as ChangeEvent<HTMLInputElement>);
    };

    return (
      <TextField
        data-component="PhoneField"
        {...props}
        data-testid={dataTestId}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        inputMode={inputMode}
        onChange={handleChange}
        isReadOnly={isReadOnly}
        isViewMode={isViewMode}
        ref={ref}
        maskProps={{ mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/] }}
      />
    );
  }
);

PhoneField.displayName = 'PhoneField';
