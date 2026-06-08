/* eslint-disable max-lines */
import { Box } from '@chakra-ui/react';
import { createFormFieldTestKit } from '@melio/penny-testkit-rtl';
import { act, renderHook, screen } from '@testing-library/react';
import { describe, expect } from 'vitest';

import { Form, type FormProps } from '@/components/form/components/Form';
import { FormLineItems } from '@/components/form/components/FormLineItems';
import { type FieldValues, useMelioForm, type UseMelioFormProps } from '@/components/form/hooks';
import { Checkbox } from '@/components/selectionAndInputs/Checkbox';
import { TextArea } from '@/components/selectionAndInputs/TextArea';
import { TextField } from '@/components/selectionAndInputs/TextField';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { FormField } from '../FormField';
import { type FormFieldProps } from '../FormField.types';

validateComponent<FormFieldProps>(FormField, 'FormField', {
  props: { labelProps: { label: 'Label' }, helperText: 'helper text', render: () => <Box /> },
  defaultDataTestId: 'form-field',
  componentParts: ['label', 'helper-text'],
});

describe('FormField', () => {
  const render = ({
    formFieldsProps,
    maxChars,
    formConfig,
    formProps,
  }: {
    formFieldsProps: FormFieldProps[];
    maxChars?: number[];
    formConfig?: Omit<UseMelioFormProps<FieldValues>, 'onSubmit'>;
    formProps?: FormProps;
  }) => {
    const {
      result: {
        current: { registerField },
      },
    } = renderHook(() => useMelioForm({ onSubmit: () => null, ...formConfig }));

    const { user } = renderComponent(
      <Form data-testid="form" {...formProps}>
        {formFieldsProps.map((formFieldProps, i) => (
          <FormField
            key={`${formFieldProps.labelProps?.label || 'form-field'}${i}`}
            {...formFieldProps}
            {...registerField(`field${i + 1}`)}
            maxChars={maxChars?.[i]}
          />
        ))}
      </Form>
    );

    return {
      user,
      formFieldsTestKits: formFieldsProps.map((formFieldProps) =>
        createFormFieldTestKit({
          inputType: 'TextField',
          dataTestId: `${formFieldProps['data-testid'] ?? 'form-field'}`,
        })
      ),
    };
  };

  describe('renders react element with label and helper text', () => {
    it('renders properly', () => {
      const formFieldTestKit = createFormFieldTestKit({ inputType: 'TextField' });

      renderComponent(
        <FormField
          labelProps={{ label: 'Test Label' }}
          render={(props) => <TextField {...props} value="Test Content" />}
          helperText="Test helper text"
        />
      );

      expect(formFieldTestKit.getElement()).toBeInTheDocument();
      expect(formFieldTestKit.getLabelText()).toBe('Test Label');
      expect(formFieldTestKit.input.getValue()).toBe('Test Content');
      expect(formFieldTestKit.getHelperText()).toBe('Test helper text');
    });

    it('renders properly with hidden label', () => {
      const formFieldTestKit = createFormFieldTestKit({ inputType: 'TextField' });

      renderComponent(
        <FormField
          labelProps={{ label: 'Test Label', isHidden: true }}
          render={(props) => <TextField {...props} value="Test Content" />}
          helperText="Test helper text"
        />
      );

      expect(formFieldTestKit.getElement()).toBeInTheDocument();
      expect(formFieldTestKit.getLabelText()).toBe('Test Label');
      expect(formFieldTestKit.getIsLabelHidden()).toBeTruthy();
      expect(formFieldTestKit.input.getValue()).toBe('Test Content');
      expect(formFieldTestKit.getHelperText()).toBe('Test helper text');
    });

    it('renders properly read-only & required', () => {
      const formFieldTestKit = createFormFieldTestKit({ inputType: 'TextField' });

      renderComponent(
        <FormField
          labelProps={{ label: 'Test Label' }}
          render={(props) => <TextField {...props} />}
          helperText="Test helper text"
          isReadOnly
          isRequired
        />
      );

      expect(formFieldTestKit.getIsReadOnly()).toBeTruthy();
      expect(formFieldTestKit.getIsRequired()).toBeTruthy();
      expect(formFieldTestKit.getHelperText()).toBe('Test helper text');
    });

    it('renders properly read-only & showOptionalIndicator', () => {
      const formFieldTestKit = createFormFieldTestKit({ inputType: 'TextField' });

      renderComponent(
        <FormField
          labelProps={{ label: 'Test Label' }}
          render={(props) => <TextField {...props} />}
          helperText="Test helper text"
          isReadOnly
          showOptionalIndicator
        />
      );

      expect(formFieldTestKit.getIsReadOnly()).toBeTruthy();
      expect(formFieldTestKit.getIsLabelHasOptionalIndicator()).toBeTruthy();
      expect(formFieldTestKit.getHelperText()).toBe('Test helper text');
    });

    it('renders properly view-mode & required', () => {
      const formFieldTestKit = createFormFieldTestKit({ inputType: 'TextField' });

      renderComponent(
        <FormField
          labelProps={{ label: 'Test Label' }}
          render={(props) => <TextField {...props} />}
          helperText="Test helper text"
          isViewMode
          isRequired
        />
      );
      expect(formFieldTestKit.getIsViewMode()).toBeTruthy();
      expect(formFieldTestKit.getIsRequired()).toBeFalsy();
      expect(screen.queryByTestId(`${formFieldTestKit.dataTestId}-helper-text`)).toBeNull();
    });

    it('renders properly view-mode & showOptionalIndicator', () => {
      const formFieldTestKit = createFormFieldTestKit({ inputType: 'TextField' });

      renderComponent(
        <FormField
          labelProps={{ label: 'Test Label' }}
          render={(props) => <TextField {...props} />}
          helperText="Test helper text"
          isViewMode
          showOptionalIndicator
        />
      );

      expect(formFieldTestKit.getIsViewMode()).toBeTruthy();
      expect(formFieldTestKit.getIsLabelHasOptionalIndicator()).toBeFalsy();
      expect(screen.queryByTestId(`${formFieldTestKit.dataTestId}-helper-text`)).toBeNull();
    });

    it('renders properly required', () => {
      const formFieldTestKit = createFormFieldTestKit({ inputType: 'TextField' });

      renderComponent(
        <FormField
          labelProps={{ label: 'Test Label' }}
          render={(props) => <TextField {...props} />}
          helperText="Test helper text"
          isRequired
        />
      );

      expect(formFieldTestKit.getElement()).toBeInTheDocument();
      expect(formFieldTestKit.getLabelText()).toBe('Test Label*');
      expect(formFieldTestKit.getIsRequired()).toBeTruthy();
      expect(formFieldTestKit.getIsLabelHasOptionalIndicator()).toBeFalsy();
      expect(formFieldTestKit.getHelperText()).toBe('Test helper text');
    });

    it('renders properly showOptionalIndicator', () => {
      const formFieldTestKit = createFormFieldTestKit({ inputType: 'TextField' });

      renderComponent(
        <FormField
          labelProps={{ label: 'Test Label' }}
          render={(props) => <TextField {...props} />}
          helperText="Test helper text"
          showOptionalIndicator
        />
      );

      expect(formFieldTestKit.getElement()).toBeInTheDocument();
      expect(formFieldTestKit.getLabelText()).toBe('Test Label(optional)');
      expect(formFieldTestKit.getIsRequired()).toBeFalsy();
      expect(formFieldTestKit.getIsLabelHasOptionalIndicator()).toBeTruthy();
      expect(formFieldTestKit.getHelperText()).toBe('Test helper text');
    });

    it('renders properly loading state & required', () => {
      const formFieldTestKit = createFormFieldTestKit({ inputType: 'TextField' });

      renderComponent(
        <FormField
          labelProps={{ label: 'Test Label' }}
          render={(props) => <TextField {...props} />}
          helperText="Test helper text"
          isLoading
          isRequired
        />
      );
      expect(formFieldTestKit.getIsReadOnly()).toBeTruthy();
      expect(formFieldTestKit.input.getIsLoading()).toBeTruthy();
      expect(formFieldTestKit.getHelperText()).toBe('Test helper text');
    });

    it('renders properly loading state & showOptionalIndicator', () => {
      const formFieldTestKit = createFormFieldTestKit({ inputType: 'TextField' });

      renderComponent(
        <FormField
          labelProps={{ label: 'Test Label' }}
          render={(props) => <TextField {...props} />}
          helperText="Test helper text"
          isLoading
          showOptionalIndicator
        />
      );

      expect(formFieldTestKit.getIsReadOnly()).toBeTruthy();
      expect(formFieldTestKit.input.getIsLoading()).toBeTruthy();
      expect(formFieldTestKit.getIsLabelHasOptionalIndicator()).toBeTruthy();
      expect(formFieldTestKit.getHelperText()).toBe('Test helper text');
    });

    it('renders properly with error and invalid state', () => {
      const formFieldTestKit = createFormFieldTestKit({ inputType: 'TextField' });

      renderComponent(
        <FormField
          labelProps={{ label: 'Test Label' }}
          render={(props) => <TextField {...props} />}
          helperText="Test helper text"
          error={{ message: 'Test error message' }}
        />
      );

      expect(formFieldTestKit.getElement()).toBeInTheDocument();
      expect(formFieldTestKit.getIsInvalid()).toBeTruthy();
      expect(formFieldTestKit.getIsLabelHasOptionalIndicator()).toBeFalsy();
      expect(formFieldTestKit.getErrorMessage()).toBe('Test error message');
    });

    it('specific field overrides form view-mode state', () => {
      const { formFieldsTestKits } = render({
        formFieldsProps: [
          {
            labelProps: { label: 'Field 1' },
            render: (props) => <TextField {...props} />,
            'data-testid': 'field1',
          },
          {
            labelProps: { label: 'Field 2' },
            render: (props) => <TextField {...props} />,
            'data-testid': 'field2',
            isViewMode: false,
          },
        ],
        formProps: { isViewMode: true },
      });

      const [formField1TestKit, formField2TestKit] = formFieldsTestKits;
      expect(screen.getByTestId('form')).toHaveAttribute('data-view-mode', 'true');

      expect(formField1TestKit?.getIsViewMode()).toBeTruthy();
      expect(formField2TestKit?.getIsViewMode()).toBeFalsy();
    });

    it('should render as a list item when render inside form in view mode', () => {
      const { formFieldsTestKits } = render({
        formFieldsProps: [
          {
            labelProps: { label: 'Field 1' },
            render: (props) => <TextField {...props} />,
            'data-testid': 'field1',
          },
        ],
        formProps: { isViewMode: true },
      });

      const [formFieldTestKit] = formFieldsTestKits;

      expect(screen.getByTestId('form')).toHaveAttribute('data-view-mode', 'true');
      expect(formFieldTestKit?.getElement().tagName).toBe('LI');
    });

    it('should render as a regular div when in view mode and not in a form', () => {
      const formFieldTestKit = createFormFieldTestKit({ inputType: 'TextField' });

      renderComponent(
        <FormField
          labelProps={{ label: 'Test Label' }}
          render={(props) => <TextField {...props} />}
          helperText="Test helper text"
          isViewMode
        />
      );
      expect(formFieldTestKit.getIsViewMode()).toBeTruthy();
      expect(formFieldTestKit.getElement()?.tagName).toBe('DIV');
    });

    it('associates the input with the label id', () => {
      const formFieldTestKit = createFormFieldTestKit({ inputType: 'TextField' });

      renderComponent(
        <FormField
          labelProps={{ label: 'Test Label', id: 'label1' }}
          render={(props) => <TextField {...props} />}
          id="field1"
        />
      );
      expect(formFieldTestKit.input.getElement()).toHaveAttribute('aria-labelledby', 'label1');
    });

    it('excludes hidden form field label from aria-labelledby', () => {
      const { getByLabelText } = renderComponent(
        <FormField
          labelProps={{ label: 'Test Label', id: 'label1', isHidden: true }}
          render={(props) => <Checkbox {...props} label="Shown label" />}
          id="field1"
        />
      );

      expect(getByLabelText('Shown label').getAttribute('aria-labelledby')).not.toContain('label1');
    });

    it('invalid field input associated to the helper-text and error-message id reference', () => {
      const formFieldTestKit = createFormFieldTestKit({ inputType: 'TextField' });

      renderComponent(
        <FormField
          labelProps={{ label: 'Test Label' }}
          render={(props) => <TextField {...props} />}
          helperText="Test helper text"
          error={{ message: 'Test error message' }}
          id="field1"
        />
      );
      expect(screen.queryByTestId(`${formFieldTestKit.dataTestId}-helper-text`)).toBeNull();
      expect(screen.getByTestId(`${formFieldTestKit.dataTestId}-error-message`)).toHaveAttribute(
        'id',
        'field1-error-message'
      );
      expect(formFieldTestKit.input.getElement()).toHaveAttribute(
        'aria-describedby',
        'field1-helper-text field1-error-message'
      );
    });

    it('the field input associated to the helper-text id reference', () => {
      const formFieldTestKit = createFormFieldTestKit({ inputType: 'TextField' });

      renderComponent(
        <FormField
          labelProps={{ label: 'Test Label' }}
          render={(props) => <TextField {...props} />}
          helperText="Test helper text"
          id="field1"
        />
      );

      expect(screen.queryByTestId(`${formFieldTestKit.dataTestId}-error-message`)).toBeNull();
      expect(screen.getByTestId(`${formFieldTestKit.dataTestId}-helper-text`)).toHaveAttribute(
        'id',
        'field1-helper-text'
      );
      expect(formFieldTestKit.input.getElement()).toHaveAttribute('aria-describedby', 'field1-helper-text');
    });
  });
  describe('clicking on label', () => {
    it('focuses the input when label is clicked', async () => {
      const { formFieldsTestKits } = render({
        formFieldsProps: [
          {
            labelProps: { label: 'Field 1' },
            render: (props) => <TextField {...props} />,
          },
        ],
      });
      const [formFieldTestKit] = formFieldsTestKits;
      await formFieldTestKit?.clickLabel();
      expect(formFieldTestKit?.input.getElement()).toHaveFocus();
    });

    it('prevents focusing the input on a disabled field when clicking the label', async () => {
      const { formFieldsTestKits } = render({
        formFieldsProps: [
          {
            labelProps: { label: 'Field 1' },
            isDisabled: true,
            render: (props) => <TextField {...props} />,
          },
        ],
      });
      const [formFieldTestKit] = formFieldsTestKits;

      await formFieldTestKit?.clickLabel();

      expect(formFieldTestKit?.input.getElement()).toBeDisabled();
      expect(formFieldTestKit?.input.getElement()).not.toHaveFocus();
    });
  });
  describe('max chars counter', () => {
    it('it shows the correct number of chars', async () => {
      const { formFieldsTestKits } = render({
        formFieldsProps: [
          {
            labelProps: { label: 'Field 1' },
            render: (props) => <TextField {...props} />,
            'data-testid': 'field1',
          },
        ],
        maxChars: [5],
      });

      const [formFieldTestKit] = formFieldsTestKits;
      expect(formFieldTestKit?.getMaxCharsCounter()).toBe('0/5');
      await formFieldTestKit?.input.type('123456789');
      expect(formFieldTestKit?.getMaxCharsCounter()).toBe('5/5');
      expect(formFieldTestKit?.input.getValue()).toBe('12345');
    });

    it('the text-area input associated to the max-chars id reference', () => {
      const { formFieldsTestKits } = render({
        formFieldsProps: [
          {
            labelProps: { label: 'Field 1' },
            render: (props) => <TextArea {...props} />,
            'data-testid': 'field1',
          },
        ],
        maxChars: [5],
      });

      const [formFieldTestKit] = formFieldsTestKits;

      expect(screen.getByTestId('field1-chars-counter-for-sr')).toHaveAttribute('id', 'field1-max-chars');
      expect(formFieldTestKit?.input.getElement()).toHaveAttribute('aria-describedby', 'field1-max-chars');
    });

    it('should update character count for screen readers on blur', async () => {
      const { formFieldsTestKits } = render({
        formFieldsProps: [
          {
            labelProps: { label: 'Field 1' },
            render: (props) => <TextArea {...props} />,
            'data-testid': 'field1',
          },
        ],
        maxChars: [5],
      });

      const [formFieldTestKit] = formFieldsTestKits;
      await formFieldTestKit?.input.type('text');
      expect(screen.getByTestId('field1-chars-counter-for-sr')).toHaveTextContent('0/5');

      act(() => {
        formFieldTestKit?.input.getElement().blur();
      });

      expect(screen.getByTestId('field1-chars-counter-for-sr')).toHaveTextContent('4/5');
    });
  });

  describe('Helper text space reservation', () => {
    it('should not reserve space by default', () => {
      renderComponent(
        <FormField
          labelProps={{ label: 'Field 1' }}
          render={(props) => <TextField {...props} />}
          data-testid="field1"
        />
      );

      expect(screen.queryByTestId('field1-helper-text-space')).not.toBeInTheDocument();
    });

    it('should not reserve space when explicitly stating not to reserve', () => {
      renderComponent(
        <FormField
          labelProps={{ label: 'Field 1' }}
          render={(props) => <TextField {...props} />}
          data-testid="field1"
          shouldReserveSpaceForHelperText={false}
        />
      );

      expect(screen.queryByTestId('field1-helper-text-space')).not.toBeInTheDocument();
    });

    it('should reserve space when explicitly stating to reserve', () => {
      renderComponent(
        <FormField
          labelProps={{ label: 'Field 1' }}
          render={(props) => <TextField {...props} />}
          data-testid="field1"
          shouldReserveSpaceForHelperText
        />
      );

      expect(screen.getByTestId('field1-helper-text-space')).toBeInTheDocument();
    });

    it('should reserve space when inside a form line items', () => {
      renderComponent(
        <FormLineItems>
          <FormField
            labelProps={{ label: 'Field 1' }}
            render={(props) => <TextField {...props} />}
            data-testid="field1"
          />
        </FormLineItems>
      );

      expect(screen.getByTestId('field1-helper-text-space')).toBeInTheDocument();
    });

    it('should not reserve space when inside a form line items and explicitly stating not to reserve', () => {
      renderComponent(
        <FormLineItems>
          <FormField
            labelProps={{ label: 'Field 1' }}
            render={(props) => <TextField {...props} />}
            shouldReserveSpaceForHelperText={false}
            data-testid="field1"
          />
        </FormLineItems>
      );

      expect(screen.queryByTestId('field1-helper-text-space')).not.toBeInTheDocument();
    });

    // Just an explicit test to verify there is no space reservation in within Form
    it('should not reserve space when inside a form', () => {
      renderComponent(
        <Form>
          <FormField
            labelProps={{ label: 'Field 1' }}
            render={(props) => <TextField {...props} />}
            data-testid="field1"
          />
        </Form>
      );

      expect(screen.queryByTestId('field1-helper-text-space')).not.toBeInTheDocument();
    });
  });
});
