import { renderHook, screen } from '@testing-library/react';
import { type ComponentType } from 'react';
import { expect } from 'vitest';

import { useMelioForm } from '@/components/form/hooks';
import { testFormField, testReadOnly } from '@/components/form/test/utils';
import { type TextAreaProps } from '@/components/selectionAndInputs/TextArea';
import { renderComponent } from '@/test-utils/render.utils';

import { Form } from '../..';
import StoryMeta, { Disabled, Invalid, Main } from '../stories/TextArea.stories';

testFormField(
  'TextArea',
  { Disabled, Invalid, Main, storyArgs: StoryMeta.args as TextAreaProps },
  { errorHandlingMessage: 'What are you talkin bout willis?!' }
);

testReadOnly<TextAreaProps>({
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  Comp: Form.TextArea as unknown as ComponentType<TextAreaProps>,
  options: { isFormField: true },
});

type FormFieldProps = {
  helperTextProps?: { label: string };
  error?: {
    message: string;
  };
};

const render = (textAreaProps: Partial<TextAreaProps> & FormFieldProps = {}) => {
  const {
    result: {
      current: { registerField },
    },
  } = renderHook(() => useMelioForm({ onSubmit: () => null }));

  const { user } = renderComponent(
    <Form>
      {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
      <Form.TextArea labelProps={{ label: 'My Label' }} {...registerField('field')} {...textAreaProps} />
    </Form>
  );

  return {
    user,
    inputElement: screen.getByTestId('form-input-field'),
    checkboxElement: screen.queryByTestId('checkbox-input'),
  };
};

describe('Text area', () => {
  it('Type text in textarea', async () => {
    const { inputElement, user } = render();
    await user.type(inputElement, 'lalala');
    expect(inputElement).toHaveValue('lalala');
  });
  it("When text area is on Read-Only mode, the user can't type", async () => {
    const { inputElement, user } = render({ isReadOnly: true });
    await user.type(inputElement, 'lalala');
    expect(inputElement).toHaveValue('');
  });
  it("When text area is Disabled, the user can't type", async () => {
    const { inputElement, user } = render({ isDisabled: true });
    await user.type(inputElement, 'lalala');
    expect(inputElement).toHaveValue('');
  });
  it('When text area is not-Editable and with footer, render checkbox', () => {
    const { checkboxElement } = render({ isEditable: false, footer: { label: 'hi! check me' } });
    expect(checkboxElement).toHaveRole('checkbox');
  });

  it('limits the amount of chars', async () => {
    const { inputElement, user } = render({ maxChars: 3 });
    expect(screen.getByTestId('max-chars')).toHaveTextContent('0/3');
    await user.type(inputElement, '12345');
    expect(inputElement).toHaveValue('123');
    expect(screen.getByTestId('max-chars')).toHaveTextContent('3/3');
  });
  it('prevents focusing the text-area on a disabled field when clicking the label', async () => {
    const { inputElement, user } = render({ isDisabled: true });
    await user.click(screen.getByLabelText(/My Label/));
    expect(inputElement).toHaveAttribute('aria-disabled', 'true');
    expect(inputElement).not.toHaveFocus();
  });
  it('ensure focusing the text-area on a read-only field when clicking the label', async () => {
    const { inputElement, user } = render({ isReadOnly: true });
    await user.click(screen.getByLabelText(/My Label/));
    expect(inputElement).toHaveAttribute('aria-readonly', 'true');
    expect(inputElement).toHaveFocus();
  });
  // Accessibility tests
  it('text area field input associated to the helper text', () => {
    const { inputElement } = render({ helperTextProps: { label: 'Test helper text' } });

    expect(screen.getByText('Test helper text')).toHaveAttribute('id', 'field-helper-text');
    expect(screen.queryByTestId('max-chars')).not.toBeInTheDocument();
    expect(inputElement).toHaveAttribute('aria-describedby', 'field-helper-text');
  });
  it('text area field input associated to the max chars element', () => {
    const { inputElement } = render({ maxChars: 3 });

    expect(screen.queryByText('Test helper text')).not.toBeInTheDocument();
    expect(screen.getByTestId('max-chars')).toHaveAttribute('id', 'field-max-chars');
    expect(inputElement).toHaveAttribute('aria-describedby', 'field-max-chars');
  });
  it('invalid text area field input associated to the error message', () => {
    const { inputElement } = render({
      helperTextProps: { label: 'Test helper text' },
      error: { message: 'Test error message' },
    });

    expect(screen.queryByText('Test helper text')).not.toBeInTheDocument();
    expect(screen.queryByTestId('max-chars')).not.toBeInTheDocument();
    expect(screen.getByText('Test error message')).toHaveAttribute('id', 'field-error-message');
    expect(inputElement).toHaveAttribute('aria-describedby', 'field-helper-text field-error-message');
  });
});
