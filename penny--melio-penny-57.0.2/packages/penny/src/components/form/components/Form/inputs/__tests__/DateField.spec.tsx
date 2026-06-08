import { createDate } from '@melio/penny-utils';
import { act, renderHook, screen, waitFor } from '@testing-library/react';
import { type ReactNode } from 'react';
import { expect } from 'vitest';
import * as yup from 'yup';

import { VisuallyHidden } from '@/components/accessibility/VisuallyHidden';
import { useMelioForm, type UseMelioFormProps } from '@/components/form/hooks';
import { testFormField } from '@/components/form/test';
import { type DateFieldProps } from '@/components/selectionAndInputs/DateField';
import { renderComponent } from '@/test-utils/render.utils';

import { Form } from '../..';
import StoryMeta, { Disabled, Invalid, Main, Required, ViewMode } from '../stories/DateField.stories';

// Desktop: not typable mode
testFormField(
  'DateFieldDesktopTrigger',
  {
    Disabled,
    Invalid,
    Main,
    ViewMode,
    Required,
    storyArgs: { ...StoryMeta.args, value: undefined } as DateFieldProps,
  },
  { errorHandlingMessage: "Wait, you're not born yet." }
);

// Typable mode
testFormField(
  'DateField',
  {
    Disabled,
    Invalid,
    Main,
    ViewMode,
    Required,
    storyArgs: { ...StoryMeta.args, value: undefined, isTypable: true } as DateFieldProps,
  },
  { errorHandlingMessage: "Wait, you're not born yet." }
);

type Fields = {
  date: Date;
};

type FormFieldProps = {
  helperTextProps?: { label: string | ReactNode };
  error?: {
    message: string;
  };
};

const render = (
  hookProps: Partial<UseMelioFormProps<Fields>> = {},
  inputProps: Partial<DateFieldProps> & FormFieldProps = {}
) => {
  const { result } = renderHook(() => useMelioForm({ onSubmit: () => null, ...hookProps }));
  const { children, ...restInputProps } = inputProps;
  const { user } = renderComponent(
    <Form>
      {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
      <Form.DateField
        labelProps={{ label: 'My Label' }}
        {...result.current.registerField('date')}
        {...restInputProps}
        aria-label={undefined}
      />
    </Form>
  );

  return {
    user,
    formResult: result,
    getInput: () => screen.getByTestId('form-input-date'),
    getClearButton: () => screen.getByTestId('form-input-date-toggle-clear'),
    getLabel: () => screen.getByTestId('form-label-date'),
    getIconButton: () => screen.getByTestId('form-input-date-toggle'),
    getHelperText: () => screen.getByTestId('form-helper-text-date'),
  };
};

describe('Date Field', () => {
  describe('when not typable', () => {
    it('changes the selected date of the input in case the value is changed from outside', () => {
      const { getInput, formResult } = render({
        defaultValues: { date: createDate('2022-02-02') },
      });

      expect(getInput().textContent).toBe('Feb 2, 2022'); // We display the date in New York time zone and set the date in UTC so the day is a day before

      act(() => formResult.current.reset({ date: createDate('2022-12-12') }));

      expect(getInput().textContent).toBe('Dec 12, 2022');
    });

    it('clear the date and shows validation error', async () => {
      const schema = yup.object().shape({
        date: yup.date().nullable().required('Please enter a date'),
      });

      const { getClearButton, formResult, user } = render({
        defaultValues: { date: createDate('2022-02-02') },
        schema,
        mode: 'onChange',
      });

      expect(formResult.current.formState.errors.date?.message).not.toBe('Please enter a date');

      await act(async () => user.click(getClearButton()));

      await waitFor(() => expect(formResult.current.formState.errors.date?.message).toBe('Please enter a date'));
    });

    // Accessibility tests
    it('date input associated to the helper text', () => {
      const schema = yup.object().shape({
        date: yup.date().nullable().required('Please enter a date'),
      });

      const { getInput } = render(
        {
          defaultValues: { date: createDate('2022-02-02') },
          schema,
          mode: 'onChange',
        },
        {
          helperTextProps: {
            label: (
              <>
                Test helper text <VisuallyHidden>hidden helper text</VisuallyHidden>
              </>
            ),
          },
        }
      );

      expect(screen.getByText('Test helper text')).toHaveAttribute('id', 'date-helper-text');
      expect(getInput()).toHaveAccessibleDescription('Test helper text hidden helper text');
    });

    it('invalid date input associated to the error message', () => {
      const errorMessage = 'Test error message';
      const schema = yup.object().shape({
        date: yup.date().nullable().required('Please enter a date'),
      });

      const { getInput } = render(
        {
          defaultValues: { date: createDate('2022-02-02') },
          schema,
          mode: 'onChange',
        },
        { helperTextProps: { label: 'Test helper text' }, error: { message: errorMessage } }
      );

      expect(getInput()).toHaveAccessibleDescription(errorMessage);
    });

    it("overrides the field's autocomplete attribute", () => {
      const { getInput } = render({ defaultValues: { date: createDate('2022-02-02') } }, { autoComplete: 'birthday' });

      expect(getInput()).toHaveAttribute('autocomplete', 'birthday');
    });

    it('icon button associated to the provided element id', () => {
      const { getInput, getIconButton } = render(
        {
          defaultValues: { date: createDate('2022-02-02') },
          mode: 'onChange',
        },
        {
          toggleDatePickerAriaLabelledBy: 'date',
        }
      );
      expect(screen.getByLabelText('My Label')).toHaveAttribute('id', 'date');
      expect(getIconButton()).toHaveAttribute('aria-labelledby', 'date');
      expect(getInput()).toHaveAccessibleName('My Label');
    });
  });

  describe('when typable', () => {
    it('changes the selected date of the input in case the value is changed from outside', () => {
      const { getInput, formResult } = render(
        {
          defaultValues: { date: createDate('2022-02-02') },
        },
        { isTypable: true }
      );

      expect(getInput()).toHaveValue('Feb 2, 2022'); // We display the date in New York time zone and set the date in UTC so the day is a day before

      act(() => formResult.current.reset({ date: createDate('2022-12-12') }));

      expect(getInput()).toHaveValue('Dec 12, 2022');
    });

    it('clear the date and shows validation error', async () => {
      const schema = yup.object().shape({
        date: yup.date().nullable().required('Please enter a date'),
      });

      const { getClearButton, formResult, user } = render(
        {
          defaultValues: { date: createDate('2022-02-02') },
          schema,
          mode: 'onChange',
        },
        { isTypable: true }
      );

      expect(formResult.current.formState.errors.date?.message).not.toBe('Please enter a date');

      await act(async () => user.click(getClearButton()));

      await waitFor(() => expect(formResult.current.formState.errors.date?.message).toBe('Please enter a date'));
    });

    // Accessibility tests
    it('date input associated to the helper text', () => {
      const schema = yup.object().shape({
        date: yup.date().nullable().required('Please enter a date'),
      });

      const { getInput } = render(
        {
          defaultValues: { date: createDate('2022-02-02') },
          schema,
          mode: 'onChange',
        },
        {
          helperTextProps: {
            label: (
              <>
                Test helper text <VisuallyHidden>hidden helper text</VisuallyHidden>
              </>
            ),
          },
          isTypable: true,
        }
      );

      expect(screen.getByText('Test helper text')).toHaveAttribute('id', 'date-helper-text');
      expect(getInput()).toHaveAccessibleDescription('Test helper text hidden helper text');
    });

    it('invalid date input associated to the error message', () => {
      const schema = yup.object().shape({
        date: yup.date().nullable().required('Please enter a date'),
      });

      const { getInput } = render(
        {
          defaultValues: { date: createDate('2022-02-02') },
          schema,
          mode: 'onChange',
        },
        { helperTextProps: { label: 'Test helper text' }, error: { message: 'Test error message' }, isTypable: true }
      );

      expect(screen.queryByText('Test helper text')).not.toBeInTheDocument();
      expect(screen.getByText('Test error message')).toHaveAttribute('id', 'date-error-message');
      expect(getInput()).toHaveAttribute('aria-describedby', 'date-helper-text date-error-message');
    });

    it("overrides the field's autocomplete attribute", () => {
      const { getInput } = render(
        { defaultValues: { date: createDate('2022-02-02') } },
        { autoComplete: 'birthday', isTypable: true }
      );

      expect(getInput()).toHaveAttribute('autocomplete', 'birthday');
    });

    it('icon button should have an accessible name', () => {
      const { getIconButton } = render(
        {
          defaultValues: { date: createDate('2022-02-02') },
          mode: 'onChange',
        },
        {
          toggleDatePickerAriaLabelledBy: 'date',
          isTypable: true,
        }
      );

      expect(getIconButton()).toHaveAccessibleName('My Label');
    });
  });
});
