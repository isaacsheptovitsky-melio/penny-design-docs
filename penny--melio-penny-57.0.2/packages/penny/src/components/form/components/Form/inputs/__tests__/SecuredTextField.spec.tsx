import { renderHook, screen } from '@testing-library/react';
import { type ComponentType } from 'react';
import { expect } from 'vitest';

import { useMelioForm } from '@/components/form/hooks';
import { testFormField, testReadOnly } from '@/components/form/test/utils';
import { type SecuredTextFieldProps } from '@/components/selectionAndInputs/SecuredTextField';
import { renderComponent } from '@/test-utils/render.utils';

import { Form } from '../..';
import StoryMeta, { Disabled, Invalid, Main, Required, ViewMode } from '../stories/SecuredTextField.stories';

testFormField(
  'SecuredTextField',
  { Disabled, Invalid, Main, ViewMode, Required, storyArgs: StoryMeta.args as SecuredTextFieldProps },
  { errorHandlingMessage: 'Please use a stronger password.' }
);

testReadOnly({
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  Comp: Form.SecuredTextField as unknown as ComponentType<SecuredTextFieldProps>,
  options: { isFormField: true },
});

type FormFieldProps = {
  helperTextProps?: { label: string };
  error?: {
    message: string;
  };
};

const render = (inputProps: Partial<SecuredTextFieldProps> & FormFieldProps = {}) => {
  const { result } = renderHook(() => useMelioForm({ onSubmit: vi.fn() }));
  const { children, ...restInputProps } = inputProps;
  const { user } = renderComponent(
    <Form>
      {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
      <Form.SecuredTextField
        labelProps={{ label: 'My Label' }}
        {...result.current.registerField('secured-text-field')}
        {...restInputProps}
        aria-label={undefined}
      />
    </Form>
  );

  return {
    user,
    inputElement: screen.getByTestId('form-input-secured-text-field'),
    formResult: result,
  };
};

describe('SecuredTextField', () => {
  // Accessibility tests
  it('secured field input associated to the helper text', () => {
    const { inputElement } = render({ helperTextProps: { label: 'Test helper text' } });

    expect(screen.getByText('Test helper text')).toHaveAttribute('id', 'secured-text-field-helper-text');
    expect(inputElement).toHaveAttribute('aria-describedby', 'secured-text-field-helper-text');
  });

  it('invalid secured field input associated to the error message', () => {
    const { inputElement } = render({
      helperTextProps: { label: 'Test helper text' },
      error: { message: 'Test error message' },
    });

    expect(screen.queryByText('Test helper text')).not.toBeInTheDocument();
    expect(screen.getByText('Test error message')).toHaveAttribute('id', 'secured-text-field-error-message');
    expect(inputElement).toHaveAttribute(
      'aria-describedby',
      'secured-text-field-helper-text secured-text-field-error-message'
    );
  });

  it("overrides the field's autocomplete attribute", () => {
    const { inputElement } = render({ autoComplete: 'password' });

    expect(inputElement).toHaveAttribute('autocomplete', 'password');
  });
});
