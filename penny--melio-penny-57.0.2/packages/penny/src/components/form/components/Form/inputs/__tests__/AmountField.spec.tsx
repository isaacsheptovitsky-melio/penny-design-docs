import { renderHook, screen } from '@testing-library/react';
import { type ComponentType } from 'react';
import { expect } from 'vitest';

import { useMelioForm } from '@/components/form/hooks';
import { testFormField, testReadOnly } from '@/components/form/test/utils';
import { type AmountFieldProps } from '@/components/selectionAndInputs/AmountField';
import { renderComponent } from '@/test-utils/render.utils';

import { Form } from '../..';
import StoryMeta, { Disabled, Invalid, Main, Required, ViewMode } from '../stories/AmountField.stories';

testFormField(
  'AmountField',
  { Disabled, Invalid, Main, ViewMode, Required, storyArgs: StoryMeta.args as AmountFieldProps },
  { errorHandlingMessage: 'NO! You used the number in the "sub-total" field!' }
);

testReadOnly<AmountFieldProps>({
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  Comp: Form.AmountField as unknown as ComponentType<AmountFieldProps>,
  options: { isFormField: true },
});

type FormFieldProps = {
  helperTextProps?: { label: string };
  error?: {
    message: string;
  };
};

const render = (inputProps: Partial<AmountFieldProps> & FormFieldProps = {}) => {
  const { result } = renderHook(() => useMelioForm({ onSubmit: () => null }));
  const { children, ...restInputProps } = inputProps;
  const { user } = renderComponent(
    <Form>
      {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
      <Form.AmountField
        labelProps={{ label: 'My Label' }}
        {...result.current.registerField('amount-field')}
        {...restInputProps}
        currencySign="$"
        locale="en-US"
        currency="USD"
        aria-label={undefined}
      />
    </Form>
  );

  return {
    user,
    inputElement: screen.getByTestId('form-input-amount-field'),
    formResult: result,
  };
};

describe('Amount Field', () => {
  // Accessibility tests
  it('text field input associated to the helper text', () => {
    const { inputElement } = render({ helperTextProps: { label: 'Test helper text' } });

    expect(screen.getByText('Test helper text')).toHaveAttribute('id', 'amount-field-helper-text');
    expect(inputElement).toHaveAttribute('aria-describedby', 'amount-field-helper-text');
  });

  it('invalid text field input associated to the error message', () => {
    const { inputElement } = render({
      helperTextProps: { label: 'Test helper text' },
      error: { message: 'Test error message' },
    });

    expect(screen.queryByText('Test helper text')).not.toBeInTheDocument();
    expect(screen.getByText('Test error message')).toHaveAttribute('id', 'amount-field-error-message');
    expect(inputElement).toHaveAttribute('aria-describedby', 'amount-field-helper-text amount-field-error-message');
  });

  it("overrides the field's autocomplete attribute", () => {
    const { inputElement } = render({ autoComplete: 'amount' });

    expect(inputElement).toHaveAttribute('autocomplete', 'amount');
  });
});
