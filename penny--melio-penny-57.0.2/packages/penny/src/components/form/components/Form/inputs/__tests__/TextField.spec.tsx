import { renderHook, screen } from '@testing-library/react';
import { type ComponentType } from 'react';
import { expect } from 'vitest';

import { useMelioForm } from '@/components/form/hooks';
import { testFormField, testReadOnly } from '@/components/form/test/utils';
import { type TextFieldProps } from '@/components/selectionAndInputs/TextField';
import { renderComponent } from '@/test-utils/render.utils';

import { Form } from '../..';
import StoryMeta, { Disabled, Invalid, Main, Required, ViewMode } from '../stories/TextField.stories';

testFormField(
  'TextField',
  { Disabled, Invalid, Main, ViewMode, Required, storyArgs: StoryMeta.args as TextFieldProps },
  { errorHandlingMessage: 'Please use a human name.' }
);

testReadOnly<TextFieldProps>({
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  Comp: Form.TextField as unknown as ComponentType<TextFieldProps>,
  options: { isFormField: true },
});

type FormFieldProps = {
  helperTextProps?: { label: string };
  error?: {
    message: string;
  };
};

const render = (inputProps: Partial<TextFieldProps> & FormFieldProps = {}) => {
  const { result } = renderHook(() => useMelioForm({ onSubmit: () => null }));
  const { children, ...restInputProps } = inputProps;
  const { user } = renderComponent(
    <Form>
      {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
      <Form.TextField
        labelProps={{ label: 'My Label' }}
        {...result.current.registerField('text-field')}
        {...restInputProps}
        aria-label={undefined}
      />
    </Form>
  );

  return {
    user,
    inputElement: screen.getByTestId('form-input-text-field'),
    formResult: result,
  };
};

describe('Text Field', () => {
  // Accessibility tests
  it('text field input associated to the helper text', () => {
    const { inputElement } = render({ helperTextProps: { label: 'Test helper text' } });

    expect(screen.getByText('Test helper text')).toHaveAttribute('id', 'text-field-helper-text');
    expect(inputElement).toHaveAttribute('aria-describedby', 'text-field-helper-text');
  });

  it('invalid text field input associated to the error message', () => {
    const { inputElement } = render({
      helperTextProps: { label: 'Test helper text' },
      error: { message: 'Test error message' },
    });

    expect(screen.queryByText('Test helper text')).not.toBeInTheDocument();
    expect(screen.getByText('Test error message')).toHaveAttribute('id', 'text-field-error-message');
    expect(inputElement).toHaveAttribute('aria-describedby', 'text-field-helper-text text-field-error-message');
  });

  it("overrides the field's autocomplete attribute", () => {
    const { inputElement } = render({ autoComplete: 'name' });

    expect(inputElement).toHaveAttribute('autocomplete', 'name');
  });
});
