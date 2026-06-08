import { renderHook, screen } from '@testing-library/react';
import { type ComponentType } from 'react';
import { expect } from 'vitest';

import { useMelioForm } from '@/components/form/hooks';
import { testFormField, testReadOnly } from '@/components/form/test/utils';
import { type PhoneFieldProps } from '@/components/selectionAndInputs/PhoneField';
import { renderComponent } from '@/test-utils/render.utils';

import { Form } from '../..';
import StoryMeta, { Disabled, Invalid, Main, ReadOnly, Required, ViewMode } from '../stories/PhoneField.stories';

testFormField(
  'PhoneField',
  {
    Disabled,
    Invalid,
    Main,
    ViewMode,
    ReadOnly,
    Required,
    storyArgs: StoryMeta.args as PhoneFieldProps,
  },
  { errorHandlingMessage: 'Wait, how do you know my number?' }
);

// eslint-disable-next-line @typescript-eslint/no-deprecated
testReadOnly({ Comp: Form.PhoneField as unknown as ComponentType<PhoneFieldProps>, options: { isFormField: true } });

type FormFieldProps = {
  helperTextProps?: { label: string };
  error?: {
    message: string;
  };
};

const render = (inputProps: Partial<PhoneFieldProps> & FormFieldProps = {}) => {
  const { result } = renderHook(() => useMelioForm({ onSubmit: () => null }));
  const { children, ...restInputProps } = inputProps;
  const { user } = renderComponent(
    <Form>
      {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
      <Form.PhoneField
        labelProps={{ label: 'My Label' }}
        {...result.current.registerField('phone-field')}
        {...restInputProps}
        aria-label={undefined}
      />
    </Form>
  );

  return {
    user,
    inputElement: screen.getByTestId('form-input-phone-field'),
    formResult: result,
  };
};

describe('Phone Field', () => {
  // Accessibility tests
  it('phone field input associated to the helper text', () => {
    const { inputElement } = render({ helperTextProps: { label: 'Test helper text' } });

    expect(screen.getByText('Test helper text')).toHaveAttribute('id', 'phone-field-helper-text');
    expect(inputElement).toHaveAttribute('aria-describedby', 'phone-field-helper-text');
  });

  it('invalid phone field input associated to the error message', () => {
    const { inputElement } = render({
      helperTextProps: { label: 'Test helper text' },
      error: { message: 'Test error message' },
    });

    expect(screen.queryByText('Test helper text')).not.toBeInTheDocument();
    expect(screen.getByText('Test error message')).toHaveAttribute('id', 'phone-field-error-message');
    expect(inputElement).toHaveAttribute('aria-describedby', 'phone-field-helper-text phone-field-error-message');
  });

  it("field's autocomplete attribute default set to 'tel'", () => {
    const { inputElement } = render();

    expect(inputElement).toHaveAttribute('autocomplete', 'tel');
  });

  it("overrides the field's autocomplete attribute", () => {
    const { inputElement } = render({ autoComplete: 'tel-national' });

    expect(inputElement).toHaveAttribute('autocomplete', 'tel-national');
  });
});
