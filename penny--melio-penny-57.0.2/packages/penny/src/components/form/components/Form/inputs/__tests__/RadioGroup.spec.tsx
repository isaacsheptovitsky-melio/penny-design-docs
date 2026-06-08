/* eslint-disable @typescript-eslint/no-deprecated */
import { renderHook } from '@testing-library/react';
import { type ComponentType } from 'react';
import { expect } from 'vitest';

import { useMelioForm } from '@/components/form/hooks';
import { testFormField, testReadOnly } from '@/components/form/test/utils';
import { type RadioGroupProps } from '@/components/selectionAndInputs/RadioGroup';
import { renderComponent } from '@/test-utils/render.utils';

import { Form } from '../..';
import StoryMeta, { Disabled, Main, ViewMode } from '../stories/RadioGroup.stories';

testFormField(
  'Radio Group',
  {
    Main,
    ViewMode,
    Disabled,
    storyArgs: StoryMeta.args as RadioGroupProps,
  },
  { errorHandlingMessage: "I know you. You're exaggerating." }
);

testReadOnly<RadioGroupProps>({
  Comp: Form.RadioGroup as unknown as ComponentType<RadioGroupProps>,
  compProps: { options: [{ value: '1', mainLabelProps: { label: 'First' } }], name: 'radio-group' },
  options: {
    isFormField: true,
    customTestIdToGet: 'form-input-read-only-field-1-input',
    attributeToGet: 'data-readonly',
    skipLabelClick: true,
  },
});

describe('Form.RadioGroup', () => {
  it('disabled inputs when isDisabled is true', () => {
    const {
      result: {
        current: { registerField, formProps },
      },
    } = renderHook(() => useMelioForm({ onSubmit: () => null }));
    const { getByTestId, container } = renderComponent(
      <Form {...formProps}>
        <Form.RadioGroup
          {...registerField('field1')}
          options={[
            { value: '1', mainLabelProps: { label: 'First' } },
            { value: '2', mainLabelProps: { label: 'Second' } },
          ]}
          aria-label="test"
          isDisabled
        />
      </Form>
    );

    const inputs = container.querySelectorAll('input[name^="field1"]');
    expect(getByTestId('form-input-field1-1-input')).toHaveAttribute('aria-disabled');
    expect(getByTestId('form-input-field1-2-input')).toHaveAttribute('aria-disabled');
    expect(inputs).toHaveLength(2);
    inputs.forEach((input) => {
      expect(input).toHaveAttribute('aria-disabled', 'true');
    });
  });
  it('selects a value', async () => {
    const {
      result: {
        current: { registerField, formProps, getValues },
      },
    } = renderHook(() => useMelioForm({ onSubmit: () => null }));

    const { getByTestId, user } = renderComponent(
      <Form {...formProps}>
        <Form.RadioGroup
          {...registerField('field1')}
          options={[
            { value: '1', mainLabelProps: { label: 'First' } },
            { value: '2', mainLabelProps: { label: 'Second' } },
          ]}
          aria-label="test"
        />
      </Form>
    );
    await user.click(getByTestId('form-input-field1-1-input'));
    expect(getValues('field1')).toBe('1');
  });
  it('starts with a default value', () => {
    const {
      result: {
        current: { registerField, formProps },
      },
    } = renderHook(() => useMelioForm({ onSubmit: () => null, defaultValues: { field1: '1' } }));

    const { getByTestId } = renderComponent(
      <Form {...formProps}>
        <Form.RadioGroup
          {...registerField('field1')}
          options={[
            { value: '1', mainLabelProps: { label: 'First' } },
            { value: '2', mainLabelProps: { label: 'Second' } },
          ]}
          aria-label="test"
        />
      </Form>
    );
    expect(getByTestId('form-input-field1-1-input')).toBeChecked();
  });
  // Accessibility tests
  it('radio-group input associated to the helper text', () => {
    const {
      result: {
        current: { registerField, formProps },
      },
    } = renderHook(() => useMelioForm({ onSubmit: () => null, defaultValues: { radioGroup: '1' } }));

    const { getByText, getAllByRole } = renderComponent(
      <Form {...formProps}>
        <Form.RadioGroup
          {...registerField('radioGroup')}
          helperTextProps={{ label: 'Test helper text' }}
          options={[
            { value: '1', mainLabelProps: { label: 'First' } },
            { value: '2', mainLabelProps: { label: 'Second' } },
          ]}
          aria-label="test"
        />
      </Form>
    );

    const inputElements = getAllByRole('radio');
    expect(getByText('Test helper text')).toHaveAttribute('id', 'radioGroup-helper-text');
    inputElements.forEach((inputElement) => {
      expect(inputElement).toHaveAttribute('aria-describedby', 'radioGroup-helper-text');
    });
  });

  it('radio-group input associated to the helper text and to the provided description ID of each option', () => {
    const {
      result: {
        current: { registerField, formProps },
      },
    } = renderHook(() => useMelioForm({ onSubmit: () => null, defaultValues: { radioGroup: '1' } }));

    const { getByRole } = renderComponent(
      <Form {...formProps}>
        <Form.RadioGroup
          {...registerField('radioGroup')}
          helperTextProps={{ label: 'Test helper text' }}
          options={[
            {
              value: '1',
              mainLabelProps: { label: 'First' },
              descriptionProps: { label: 'First Description', id: 'first-description' },
            },
            {
              value: '2',
              mainLabelProps: { label: 'Second' },
              descriptionProps: { label: 'Second Description', id: 'second-description' },
            },
          ]}
          aria-label="test"
        />
      </Form>
    );

    expect(getByRole('radio', { name: 'First' })).toHaveAccessibleDescription('First Description Test helper text');
    expect(getByRole('radio', { name: 'Second' })).toHaveAccessibleDescription('Second Description Test helper text');
  });

  it('radio group input is associated with the helper text and the unique ID generated for the provided description for each option', () => {
    const {
      result: {
        current: { registerField, formProps },
      },
    } = renderHook(() => useMelioForm({ onSubmit: () => null, defaultValues: { radioGroup: '1' } }));

    const { getByRole } = renderComponent(
      <Form {...formProps}>
        <Form.RadioGroup
          {...registerField('radioGroup')}
          helperTextProps={{ label: 'Test helper text' }}
          options={[
            {
              value: '1',
              mainLabelProps: { label: 'First' },
              descriptionProps: { label: 'First Description' },
            },
            {
              value: '2',
              mainLabelProps: { label: 'Second' },
              descriptionProps: { label: 'Second Description' },
            },
          ]}
          aria-label="test"
        />
      </Form>
    );

    expect(getByRole('radio', { name: 'First' })).toHaveAccessibleDescription('First Description Test helper text');
    expect(getByRole('radio', { name: 'Second' })).toHaveAccessibleDescription('Second Description Test helper text');
  });

  it('invalid radio-group input associated to the error message', () => {
    const {
      result: {
        current: { registerField, formProps },
      },
    } = renderHook(() => useMelioForm({ onSubmit: () => null, defaultValues: { radioGroup: '1' } }));

    const { getByText, getAllByRole, queryByText } = renderComponent(
      <Form {...formProps}>
        <Form.RadioGroup
          {...registerField('radioGroup')}
          helperTextProps={{ label: 'Test helper text' }}
          options={[
            { value: '1', mainLabelProps: { label: 'First' } },
            { value: '2', mainLabelProps: { label: 'Second' } },
          ]}
          aria-label="test"
          isInvalid
          error={{ message: 'Test error message' }}
        />
      </Form>
    );
    const inputElements = getAllByRole('radio');
    expect(queryByText('Test helper text')).not.toBeInTheDocument();
    expect(getByText('Test error message')).toHaveAttribute('id', 'radioGroup-error-message');
    inputElements.forEach((inputElement) => {
      expect(inputElement).toHaveAttribute('aria-describedby', 'radioGroup-helper-text radioGroup-error-message');
    });
  });
});
