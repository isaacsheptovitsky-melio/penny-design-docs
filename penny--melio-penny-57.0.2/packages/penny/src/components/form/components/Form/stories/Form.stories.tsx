import { Box } from '@chakra-ui/react';
import { useBoolean } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Storybook } from 'storybook-utils';
import * as yup from 'yup';

import { Button } from '@/components/action/Button';
import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { SelectNew } from '@/components/selectionAndInputs/SelectNew';
import { TextField } from '@/components/selectionAndInputs/TextField';
import { extractComponentSource } from '@/test-utils/storybook.utils';

import { type FieldValues, useMelioForm } from '../../../hooks';
import { FormField } from '../../FormField';
import { Form } from '..';
import { DynamicRequiredFieldsExample } from './Form.examples';
import FormExamplesRaw from './Form.examples?raw';

const meta: Meta<typeof Form> = {
  title: 'Form/Form',
  component: Form,
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
  argTypes: {
    columns: {
      control: 'number',
      table: { category: 'props', defaultValue: { summary: '1' } },
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
      table: { category: 'props', defaultValue: { summary: 'large' } },
    },
    isDisabled: {
      control: 'boolean',
      description:
        'Set all the fields in the form as disabled.<br />Can be overridden by explicitly defining this prop in a specific field.',
      table: { category: 'props', defaultValue: { summary: 'false' } },
    },
    isViewMode: {
      control: 'boolean',
      description:
        'Set all the fields in the form to view-mode.<br />Can be overridden by explicitly defining this prop in a specific field.',
      table: { category: 'props', defaultValue: { summary: 'false' } },
    },
    errorState: {
      description: 'Force error state on all fields',
      control: 'boolean',
      table: {
        category: 'props',
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      description: 'Force general error on form',
      control: 'object',
      table: {
        category: 'props',
        type: {
          summary: 'object',
          detail: `{
  title?: string; // title of the form general error
  description: string; // description of the general error
}`,
        },
      },
    },
    as: {
      control: 'text',
      description:
        'Change the renders tag element.<br />A classic use-case is when you have to split the form into several groups on the page.',
      table: {
        category: 'props',
        defaultValue: { summary: 'form' },
      },
    },
    inputRef: {
      table: {
        category: 'props',
      },
    },
    isReadOnly: {
      control: 'boolean',
      description:
        'Set all the fields in the form as read-only.<br />Can be overridden by explicitly defining this prop in a specific field.',
      table: {
        category: 'props',
        defaultValue: { summary: 'false' },
      },
    },
    isLoading: {
      control: 'boolean',
      description:
        "Set the form in loading state.<br />This is for cases where you need to reload the form's data due to a side-effect.<br /><b>Don't use this when submitting the form. The `Form` will handle this case.</b>",
      table: {
        category: 'props',
      },
    },
  },
  args: {
    isDisabled: false,
    isReadOnly: false,
    isViewMode: false,
    isLoading: false,
    errorState: false,
    size: 'large',
  },
};
export default meta;

export const Main: StoryObj<FC<{ errorState: boolean; columns: number }>> = {
  render: ({ errorState, ...args }) => {
    const defaultValues = {
      'main-field1': 'Default value',
      'main-field2': 'Default value',
      'main-field3': 'Default value',
      'main-field4': 'Default value',
    };
    const { registerField } = useMelioForm({ defaultValues, onSubmit: () => null });

    return (
      <Form {...args}>
        {Array.from({ length: 4 }).map((_value, idx) => {
          const fieldName = `main-field${idx + 1}`;
          return (
            <FormField
              {...registerField(fieldName as keyof typeof defaultValues)}
              key={idx}
              labelProps={{ label: `Field ${idx + 1}` }}
              helperText="helper text"
              data-testid={`form-${fieldName}`}
              error={errorState ? { message: 'Error state' } : undefined}
              render={(props) => (
                <TextField {...props} placeholder={`Field ${idx + 1}`} data-testid={`form-input-${fieldName}`} />
              )}
            />
          );
        })}
      </Form>
    );
  },
};

export const Colspan: StoryObj<typeof Form> = {
  render: (args) => {
    const { registerField } = useMelioForm({
      defaultValues: { 'colspan-field1': 'Field 1', 'colspan-field2': 'Field 2', 'colspan-field3': 'Field 3' },
      onSubmit: () => null,
    });

    return (
      <Form {...args}>
        <FormField
          {...registerField('colspan-field1')}
          labelProps={{ label: 'Field 1' }}
          helperText="helper text"
          render={(props) => <TextField {...props} placeholder="Field 1" />}
        />
        <FormField
          {...registerField('colspan-field2')}
          labelProps={{ label: 'Field 2' }}
          helperText="helper text"
          render={(props) => <TextField {...props} placeholder="Field 2" />}
        />
        <FormField
          {...registerField('colspan-field3')}
          labelProps={{ label: 'Field 3' }}
          helperText="helper text"
          colSpan={2}
          render={(props) => <TextField {...props} />}
        />
      </Form>
    );
  },
  name: 'Columns and colSpan',
  args: {
    size: 'large',
    columns: 2,
  },
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
};

export const Sizes: StoryObj<typeof Form> = {
  render: (args) => {
    const { registerField: registerField1 } = useMelioForm({
      defaultValues: { 'large-field1': 'Field 1', 'large-field2': 'Field 2', 'large-field3': 'Field 3' },
      onSubmit: () => null,
    });
    const { registerField: registerField2 } = useMelioForm({
      defaultValues: { 'small-field1': 'Field 1', 'small-field2': 'Field 2', 'small-field3': 'Field 3' },
      onSubmit: () => null,
    });

    return (
      <Group variant="vertical">
        <Text textStyle="body1Semi" as="h2">
          Large
        </Text>
        <Form {...args} size="large" columns={2}>
          <FormField
            {...registerField1('large-field1')}
            labelProps={{ label: 'Field 1' }}
            helperText="helper text"
            render={(props) => <TextField {...props} placeholder="Field 1" />}
          />
          <FormField
            {...registerField1('large-field2')}
            labelProps={{ label: 'Field 2' }}
            helperText="helper text"
            render={(props) => <TextField {...props} placeholder="Field 2" />}
          />
          <FormField
            colSpan={2}
            {...registerField1('large-field3')}
            labelProps={{ label: 'Field 3' }}
            helperText="helper text"
            render={(props) => <TextField {...props} placeholder="Field 3" />}
          />
        </Form>
        <Text textStyle="body1Semi" as="h2">
          Small
        </Text>
        <Form size="small" columns={2}>
          <FormField
            {...registerField2('small-field1')}
            labelProps={{ label: 'Field 1' }}
            helperText="helper text"
            render={(props) => <TextField {...props} placeholder="Field 1" />}
          />
          <FormField
            {...registerField2('small-field2')}
            labelProps={{ label: 'Field 2' }}
            helperText="helper text"
            render={(props) => <TextField {...props} placeholder="Field 2" />}
          />
          <FormField
            colSpan={2}
            {...registerField2('small-field3')}
            labelProps={{ label: 'Field 3' }}
            helperText="helper text"
            render={(props) => <TextField {...props} placeholder="Field 3" />}
          />
        </Form>
      </Group>
    );
  },
};

export const Disabled: StoryObj<typeof Form> = {
  render: (args) => {
    const { registerField } = useMelioForm({
      defaultValues: { name: 'John Doe', email: '' },
      onSubmit: () => null,
    });

    return (
      <Form {...args} isDisabled columns={2} data-testid="form">
        <FormField
          {...registerField('name')}
          labelProps={{ label: 'Name' }}
          helperText="helper text"
          data-testid="form-name"
          render={(props) => <TextField {...props} data-testid="form-input-name" />}
        />
        <FormField
          {...registerField('email')}
          labelProps={{ label: 'Email' }}
          helperText="helper text"
          data-testid="form-email"
          render={(props) => <TextField {...props} placeholder="Enter you email..." data-testid="form-input-email" />}
        />
      </Form>
    );
  },
};

export const ViewMode: StoryObj<typeof Form> = {
  render: (args) => {
    const { registerField } = useMelioForm({
      defaultValues: { name: 'John Doe', email: '' },
      onSubmit: () => null,
    });

    return (
      <Form {...args} isViewMode columns={2} data-testid="form">
        <FormField
          {...registerField('name')}
          labelProps={{ label: 'Name' }}
          data-testid="form-name"
          render={(props) => <TextField {...props} data-testid="form-input-name" />}
        />
        <FormField
          {...registerField('email')}
          labelProps={{ label: 'Email' }}
          data-testid="form-email"
          render={(props) => (
            <TextField {...props} viewModePlaceholder="No email provided" data-testid="form-input-email" />
          )}
        />
      </Form>
    );
  },
};

export const ReadOnly: StoryObj<typeof Form> = {
  render: (args) => {
    const { registerField } = useMelioForm({
      defaultValues: { name: 'John Doe', email: '' },
      onSubmit: () => null,
    });

    return (
      <Form {...args} isReadOnly columns={2} data-testid="form">
        <FormField
          {...registerField('name')}
          labelProps={{ label: 'Name' }}
          data-testid="form-name"
          render={(props) => <TextField {...props} />}
        />
        <FormField
          {...registerField('email')}
          labelProps={{ label: 'Email' }}
          data-testid="form-email"
          render={(props) => <TextField {...props} />}
        />
      </Form>
    );
  },
};

export const FormWithGeneralError: StoryObj<typeof Form> = {
  render: (args) => {
    const { registerField } = useMelioForm({
      defaultValues: {
        'general-error-field1': 'Field 1',
        'general-error-field2': 'Field 2',
        'general-error-field3': 'Field 3',
      },
      onSubmit: () => null,
    });
    const error = {
      title: 'Critical',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vene`,
    };

    return (
      <Form error={error} {...args}>
        <FormField
          {...registerField('general-error-field1')}
          labelProps={{ label: 'Field 1' }}
          helperText="helper text"
          data-testid="form-general-error-field1"
          render={(props) => (
            <TextField {...props} placeholder="Field 1" data-testid="form-input-general-error-field1" />
          )}
        />
        <FormField
          {...registerField('general-error-field2')}
          labelProps={{ label: 'Field 2' }}
          helperText="helper text"
          data-testid="form-general-error-field2"
          render={(props) => (
            <TextField {...props} placeholder="Field 2" data-testid="form-input-general-error-field2" />
          )}
        />
        <FormField
          {...registerField('general-error-field3')}
          labelProps={{ label: 'Field 3' }}
          helperText="helper text"
          data-testid="form-general-error-field3"
          render={(props) => <TextField {...props} data-testid="form-input-general-error-field3" />}
        />
      </Form>
    );
  },
};

export const Saving: StoryObj<FC> = {
  render: (args) => {
    const { registerField, formProps, submitButtonProps } = useMelioForm({
      defaultValues: { name: 'John Doe', email: '' },
      onSubmit: () => null,
      isSaving: true,
    });

    return (
      <Group variant="vertical" spacing="m">
        <Form {...args} {...formProps} columns={2} data-testid="form">
          <FormField
            {...registerField('name')}
            labelProps={{ label: 'Name' }}
            helperText="helper text"
            render={(props) => <TextField {...props} />}
          />
          <FormField
            {...registerField('email')}
            labelProps={{ label: 'Email' }}
            helperText="helper text"
            render={(props) => <TextField {...props} placeholder="Enter you email..." />}
          />
        </Form>
        <Button {...submitButtonProps} label="Submit" />
      </Group>
    );
  },
};

export const Loading: StoryObj<FC> = {
  render: (args) => {
    const { registerField, submitButtonProps, formProps } = useMelioForm({
      defaultValues: {
        'loading-field1': 'Field 1',
        'loading-field2': 'Field2',
        'loading-field3': 'Field3',
        'loading-field4': 'Field4',
      },
      onSubmit: () => null,
      isLoading: true,
    });

    return (
      <Group variant="vertical" alignItems="center" spacing="xxl">
        <Form {...args} {...formProps} columns={2} data-testid="form">
          <FormField
            {...registerField('loading-field1')}
            labelProps={{ label: 'Field 1' }}
            data-testid="form-loading-field1"
            render={(props) => <TextField {...props} data-testid="form-input-loading-field1" />}
          />
          <FormField
            {...registerField('loading-field2')}
            labelProps={{ label: 'Field 2' }}
            data-testid="form-loading-field2"
            render={(props) => <TextField {...props} data-testid="form-input-loading-field2" />}
          />
          <FormField
            {...registerField('loading-field3')}
            labelProps={{ label: 'Field 3' }}
            data-testid="form-loading-field3"
            render={(props) => <TextField {...props} data-testid="form-input-loading-field3" />}
          />
          <FormField
            {...registerField('loading-field4')}
            labelProps={{ label: 'Field 4' }}
            data-testid="form-loading-field4"
            render={(props) => <TextField {...props} data-testid="form-input-loading-field4" />}
          />
        </Form>
        <Button {...submitButtonProps} label="Submit" size="small" />
      </Group>
    );
  },
};

export const DynamicFields: StoryObj<FC> = {
  render: (args) => {
    const [showNameField, setShowNameField] = useState<boolean>(false);
    const [showEmailField, setShowEmailField] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const schema: yup.SchemaOf<{ name?: string; email?: string; accountType: string }> = yup.object().shape({
      accountType: yup.string().required(),
      name: yup.string().when('accountType', { is: 'private', then: yup.string().required() }),
      email: yup.string().email().when('accountType', { is: 'business', then: yup.string().email().required() }),
    });

    const { watch, registerField, submitButtonProps, formProps } = useMelioForm({
      onSubmit: () => setIsSubmitted(true),
      schema,
    });

    useEffect(() => {
      if (watch('accountType') === 'business') {
        setShowEmailField(true);
        setShowNameField(false);
      }

      if (watch('accountType') === 'private') {
        setShowNameField(true);
        setShowEmailField(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('accountType')]);

    return (
      <Group variant="vertical">
        <Form {...args} {...formProps} data-testid="form">
          <FormField
            {...registerField('accountType')}
            labelProps={{ label: 'Account Type' }}
            render={(props) => (
              <SelectNew
                {...props}
                emptyState="No options"
                options={[
                  { label: 'Business', value: 'business' },
                  { label: 'Private', value: 'private' },
                ]}
                placeholder="Enter your name..."
              />
            )}
          />
          {showEmailField && (
            <FormField
              {...registerField('email')}
              labelProps={{ label: 'Email' }}
              render={(props) => <TextField {...props} placeholder="Enter your email..." />}
            />
          )}
          {showNameField && (
            <FormField
              {...registerField('name')}
              labelProps={{ label: 'Name' }}
              render={(props) => <TextField {...props} placeholder="Enter your name..." />}
            />
          )}
        </Form>
        <Group justifyContent="flex-end">
          <Button {...submitButtonProps} label="Submit" />
        </Group>
        {isSubmitted && <Text>Submitted!</Text>}
      </Group>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * There are cases where you might need to dynamically required fields based on the user's selection.
 * To do this, you will need to watch the dependent field to trigger re-render on value change.
 */

export const DynamicRequiredFields: StoryObj<FC> = {
  render: () => <DynamicRequiredFieldsExample />,
  parameters: {
    docs: { source: { code: extractComponentSource(FormExamplesRaw, 'DynamicRequiredFieldsExample') } },
  },
};

/**
 * There are some cases where you might need to split the form into several groups throughout the page.
 * We've got your back here, and this requires you just some minor adjustements.
 * 1. Add `as=<tag-name>` to the `Form` components you have to change the default `form` tag that is used with them.
 * 2. Wrap the whole section containg -all- fields with a `form` tag (then give it the `formProps` you get from the `useMelioForm`).
 * 3. Add a hidden submission input and put it anywhere inside the `form` tag.
 * 4. Extract the `inputRef` from the `formProps` you get from the `useMelioForm` and pass it to the hidden input.
 *
 * And voila!
 */
export const SplittingFormFieldsOnThePage: StoryObj<typeof Form> = {
  render: (args) => {
    const [formValues, setFormValues] = useState<FieldValues>();
    const {
      registerField,
      formProps: { inputRef, ...formProps },
      submitButtonProps,
    } = useMelioForm({
      onSubmit: (data) => setFormValues(data),
    });

    return (
      <form {...formProps}>
        <Group variant="vertical">
          <Text textStyle="heading3Semi">Fields Group 1</Text>
          <Form {...args}>
            <FormField
              {...registerField('field-1')}
              labelProps={{ label: 'Field 1' }}
              helperText="helper text"
              render={(props) => <TextField {...props} placeholder="Field 1" />}
            />
            <FormField
              {...registerField('field-2')}
              labelProps={{ label: 'Field 2' }}
              helperText="helper text"
              render={(props) => <TextField {...props} placeholder="Field 2" />}
            />
          </Form>
          <Text textStyle="heading3Semi">Fields Group 2</Text>
          <Form {...args}>
            <FormField
              {...registerField('field-3')}
              labelProps={{ label: 'Field 3' }}
              helperText="helper text"
              render={(props) => <TextField {...props} placeholder="Field 3" />}
            />
            <FormField
              {...registerField('field-4')}
              labelProps={{ label: 'Field 4' }}
              helperText="helper text"
              render={(props) => <TextField {...props} placeholder="Field 4" />}
            />
          </Form>
          {/* Note that you need to add this hidden submit input to make the submit button send the form */}
          <input ref={inputRef} type="submit" hidden />
          <Button {...submitButtonProps} label="Submit" />
          <Text>Submitted values:</Text>
          <pre>{JSON.stringify(formValues, null, 2)}</pre>
        </Group>
      </form>
    );
  },
  args: {
    columns: 2,
    as: 'div',
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Toggle: StoryObj<typeof Form> = {
  render: (args) => {
    const [isViewMode, viewMode] = useBoolean(true);

    const schema: yup.SchemaOf<{ 'toggle-name': string; 'toggle-email': string }> = yup.object().shape({
      'toggle-name': yup.string().required(),
      'toggle-email': yup.string().email().required(),
    });

    const { reset, registerField, submitButtonProps, cancelButtonProps, formProps } = useMelioForm({
      defaultValues: { 'toggle-name': 'John Doe', 'toggle-email': '' },
      onSubmit: viewMode.on,
      schema,
    });

    const onCancel = () => {
      reset();
      viewMode.on();
    };

    const toggle = isViewMode ? viewMode.off : onCancel;

    return (
      <Storybook.Container display="flex" flexDirection="column" gap="m">
        <Storybook.Container width="fit-content">
          <Button
            aria-label="toggle"
            onClick={toggle}
            variant="tertiary"
            size="small"
            label={isViewMode ? 'Edit' : 'Cancel'}
          />
        </Storybook.Container>
        <Form {...args} {...formProps} isViewMode={isViewMode} data-testid="form">
          <FormField
            {...registerField('toggle-name')}
            labelProps={{ label: 'Name' }}
            render={(props) => (
              <TextField {...props} placeholder="Enter your name..." viewModePlaceholder="No name provided" autoFocus />
            )}
          />
          <FormField
            {...registerField('toggle-email')}
            labelProps={{ label: 'Email' }}
            render={(props) => (
              <TextField {...props} placeholder="Enter your email..." viewModePlaceholder="No email provided" />
            )}
          />

          {!isViewMode && (
            <Group justifyContent="flex-end">
              <Button {...cancelButtonProps} onClick={onCancel} variant="secondary" label="Cancel" />
              <Button {...submitButtonProps} label="Submit" />
            </Group>
          )}
        </Form>
      </Storybook.Container>
    );
  },
  name: 'Toggle view mode with autoFocus',
};

export const ScrollToViewFieldWithError: StoryObj<typeof Form> = {
  render: (args) => {
    const schema: yup.SchemaOf<{ name: string; email: string }> = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
    });

    const { registerField, submitButtonProps, formProps } = useMelioForm({ onSubmit: () => null, schema });

    return (
      <Form {...args} {...formProps}>
        <Button {...submitButtonProps} label="Click here to scroll to the first field with error" />
        <Box height="100vh" />
        <FormField
          {...registerField('name')}
          labelProps={{ label: 'Name' }}
          render={(props) => <TextField {...props} placeholder="Enter your name..." />}
        />
        <FormField
          {...registerField('email')}
          labelProps={{ label: 'Email' }}
          render={(props) => <TextField {...props} placeholder="Enter your email..." />}
        />
      </Form>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
  name: 'Scroll to the first field with error',
};
