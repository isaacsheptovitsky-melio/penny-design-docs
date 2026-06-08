import { renderHook, screen } from '@testing-library/react';
import { type ComponentType } from 'react';
import { expect } from 'vitest';

import { useMelioForm } from '@/components/form/hooks';
import { testFormField, testReadOnly } from '@/components/form/test/utils';
import { type SwitchProps } from '@/components/selectionAndInputs/Switch';
import { renderComponent } from '@/test-utils/render.utils';

import { Form } from '../..';
import StoryMeta, { Disabled, Main } from '../stories/Switch.stories';
import { type FormSwitchProps } from '../types';

testFormField(
  'Switch',
  { Disabled, Main, storyArgs: StoryMeta.args as FormSwitchProps },
  { errorHandlingMessage: 'Switch field is required' }
);

type FormFieldProps = {
  helperTextProps?: { label: string };
  error?: {
    message: string;
  };
};

const render = (inputProps: Partial<FormSwitchProps> & FormFieldProps = {}) => {
  const { result } = renderHook(() => useMelioForm({ onSubmit: () => null }));
  const { user } = renderComponent(
    <Form>
      {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
      <Form.Switch
        labelProps={{ label: 'My Label' }}
        {...result.current.registerField('switch')}
        {...inputProps}
        aria-label={undefined}
      />
    </Form>
  );

  return {
    user,
    inputElement: screen.getByTestId('form-input-switch-input'),
    formResult: result,
  };
};

describe('Checkbox', () => {
  // Accessibility tests
  it('text field input associated to the helper text', () => {
    const { inputElement } = render({ helperTextProps: { label: 'Test helper text' } });

    expect(screen.getByText('Test helper text')).toHaveAttribute('id', 'switch-helper-text');
    expect(inputElement).toHaveAttribute('aria-describedby', 'switch-helper-text');
  });

  it('invalid text field input associated to the error message', () => {
    const { inputElement } = render({
      helperTextProps: { label: 'Test helper text' },
      error: { message: 'Test error message' },
    });

    expect(screen.queryByText('Test helper text')).not.toBeInTheDocument();
    expect(screen.getByText('Test error message')).toHaveAttribute('id', 'switch-error-message');
    expect(inputElement).toHaveAttribute('aria-describedby', 'switch-helper-text switch-error-message');
  });

  testReadOnly<SwitchProps>({
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    Comp: Form.Switch as unknown as ComponentType<SwitchProps>,
    options: { isFormField: true, customTestIdToGet: 'form-input-read-only-field-input', skipLabelClick: true },
  });
});
