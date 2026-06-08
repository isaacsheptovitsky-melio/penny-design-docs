import { renderHook, screen } from '@testing-library/react';
import { type ComponentType } from 'react';
import { expect } from 'vitest';

import { useMelioForm } from '@/components/form/hooks';
import { testFormField, testReadOnly } from '@/components/form/test/utils';
import { type CheckboxProps } from '@/components/selectionAndInputs/Checkbox';
import { renderComponent } from '@/test-utils/render.utils';

import { Form } from '../..';
import StoryMeta, { Main, Required } from '../stories/Checkbox.stories';

testFormField(
  'Checkbox',
  { Main, Required, storyArgs: StoryMeta.args as CheckboxProps },
  { errorHandlingMessage: 'Checkbox field is required' }
);

testReadOnly({
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  Comp: Form.Checkbox as unknown as ComponentType<CheckboxProps>,
  options: {
    isFormField: true,
    customTestIdToGet: 'form-input-read-only-field-input',
    attributeToGet: 'aria-readonly',
  },
});

type FormFieldProps = {
  helperTextProps?: { label: string };
  error?: {
    message: string;
  };
};

const render = (inputProps: Partial<CheckboxProps> & FormFieldProps = {}) => {
  const { result } = renderHook(() => useMelioForm({ onSubmit: () => null }));
  const { user } = renderComponent(
    <Form>
      {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
      <Form.Checkbox
        labelProps={{ label: 'My Label' }}
        {...result.current.registerField('checkbox')}
        {...inputProps}
        aria-label={undefined}
      />
    </Form>
  );

  return {
    user,
    containerElement: screen.getByTestId('form-input-checkbox'),
    inputElement: screen.getByTestId('form-input-checkbox-input'),
    formResult: result,
  };
};

describe('Checkbox', () => {
  it('set to disabled', () => {
    const { containerElement, inputElement } = render({ isDisabled: true });

    expect(inputElement).toHaveAttribute('aria-disabled', 'true');
    expect(containerElement).toHaveAttribute('data-disabled', 'true');
  });

  it('text field input associated to the helper text', () => {
    const { inputElement } = render({ helperTextProps: { label: 'Test helper text' } });

    expect(screen.getByText('Test helper text')).toHaveAttribute('id', 'checkbox-helper-text');
    expect(inputElement).toHaveAttribute('aria-describedby', 'checkbox-helper-text');
  });

  it('invalid text field input associated to the error message', () => {
    const { inputElement } = render({
      helperTextProps: { label: 'Test helper text' },
      error: { message: 'Test error message' },
    });

    expect(screen.queryByText('Test helper text')).not.toBeInTheDocument();
    expect(screen.getByText('Test error message')).toHaveAttribute('id', 'checkbox-error-message');
    expect(inputElement).toHaveAttribute('aria-describedby', 'checkbox-helper-text checkbox-error-message');
  });
});
