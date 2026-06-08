import { Box } from '@chakra-ui/react';
import { useBoolean } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { screen, userEvent } from 'storybook/test';
import { Storybook } from 'storybook-utils';
import type { SchemaOf } from 'yup';
import * as yup from 'yup';

import { VisuallyHidden } from '@/components/accessibility/VisuallyHidden';
import { Button } from '@/components/action/Button';
import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { Form } from '@/components/form/components/Form';
import { useMelioForm } from '@/components/form/hooks/useMelioForm';
import { DateField } from '@/components/selectionAndInputs/DateField';
import { TextField } from '@/components/selectionAndInputs/TextField';
import { setChromaticViewports } from '@/test-utils/storybook.utils';

import { FormField } from './FormField';
import type { FormFieldProps } from './FormField.types';

const labelPropsType = `{
  label: string;
  tooltipProps?: { content: ReactNode };
  description?: string;
  isHidden?: boolean;
  id?: string;
}`;

const renderedFieldPropsType = `{
  'data-testid'?: string;
  id?: string;
  name?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isViewMode?: boolean;
  isLoading?: boolean;
  isInvalid?: boolean;
  size?: 'small' | 'large';
  ref?: RefObject<HTMLDivElement>;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  'aria-describedby'?: string;
}`;

/**
 * The `FormField` component acts as a wrapper that standardizes state management and visual presentation for form field components.
 *
 * <b>Why use it:</b>
 * It mostly used to render a form field with easy access to the form's state and validation but can even use it with any data to solve our needs to align the UI. <br />
 *
 * <b>What it does:</b>
 * - It includes optional parts: label, helper text / error message, and chars counter (for `TextArea` only).
 * - It can render react element or any component.
 * - The field gets the form's state by register the field with `useMelioForm` hook (story example).
 * - If the `FormField` is wrapped with `Form`, the `Form`'s state can be overridden by passing a different state directly to the FormField.
 *
 * <b>How it works:</b>
 * The field gets the `Form`'s state / validation by passing the expected props to the rendered component. <br />
 * This is how it looks like: `<FormField render={(props) => <Comp {...props} />} />` <br />
 * For example, the `isDisabled` prop passed to the rendered component to disabled the field.
 *
 * <b>Link the label with the field:</b>
 * Linking means that clicking on the label will activate the field, and will be associated with it.<br />
 * This happens by default when passing `registerField` to the `FormField`.
 * If you need to do it manually, pass a unique `id` prop to `FormField` and make sure you pass along the `id` prop from the `render` function to the field itself.
 *
 * <b>Our form field components include:</b>
 * [Amount Field](?path=/story/selection-inputs-components-amount-field--with-form-field) <br />
 * [Checkbox](?path=/story/selection-inputs-components-checkbox--with-form-field) <br />
 * [Combobox](?path=/story/selection-inputs-components-combobox-new--with-form-field) <br />
 * [Date Field](?path=/story/selection-inputs-components-date-field--with-form-field) <br />
 * [File Upload](?path=/story/selection-inputs-components-file-upload--with-form-field) <br />
 * [Multi Select](?path=/story/selection-inputs-components-multi-select--with-form-field) <br />
 * [Phone Field](?path=/story/selection-inputs-components-phone-field--with-form-field) <br />
 * [Radio Group](?path=/story/selection-inputs-components-radio-group--with-form-field) <br />
 * [Secured Text Field](?path=/story/selection-inputs-components-secured-text-field--with-form-field) <br />
 * [Segmented Control](?path=/story/selection-inputs-components-segmented-control-new-segmented-control--with-form-field) <br />
 * [Select New](?path=/story/selection-inputs-components-select-new--with-form-field) <br />
 * [Switch](?path=/story/selection-inputs-components-switch--with-form-field) <br />
 * [Text Area](?path=/story/selection-inputs-components-text-area--with-form-field) <br />
 * [Text Field](?path=/story/selection-inputs-components-text-field--with-form-field) <br />
 *
 */
const meta: Meta<typeof FormField> = {
  title: 'Form/Form Field',
  component: FormField,
  parameters: { docs: { source: { type: 'code' } } },
  argTypes: {
    render: {
      control: false,
      type: { name: 'string', required: true },
      description: 'The content to render.',
      table: {
        type: { summary: '(props: FormFieldRenderProps) => ReactElement', detail: renderedFieldPropsType },
        category: 'props',
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'form-field' }, type: { summary: 'string' }, category: 'tests' },
    },
    isLoading: {
      control: 'boolean',
      description: 'Sets the field in loading state.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isRequired: {
      control: 'boolean',
      description: 'Sets the field as required.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    showOptionalIndicator: {
      control: 'boolean',
      description: 'Shows (optional) next to optional fields label.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Sets the field as disabled.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isViewMode: {
      control: 'boolean',
      description: 'Sets the field in view-mode.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Sets the field as read-only.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    labelProps: {
      control: 'object',
      description:
        "An object of the field's label props. The form field uses the label for accessibility, so a label generally needs to be defined. `isHidden` can be used to hide the label visually. For `checkbox` inputs, which already have their own visible labels, you can choose whether to provide `labelProps`, as the purpose may already be clear from the visual context.",
      table: { type: { summary: 'LabelProps', detail: labelPropsType }, category: 'props' },
      type: { name: 'string' },
    },
    helperText: {
      control: 'text',
      description: 'The helper text to display below the field.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
      description: 'The size of the field.',
      table: { defaultValue: { summary: 'large' }, type: { summary: 'small | large' }, category: 'props' },
    },
    id: {
      control: 'text',
      description:
        'A unique identifier for the field, essential for accessibility as it allows screen readers to associate labels correctly. <br /> To link the label with the field, the provided id should be passed through the render function to the rendered field component as the id prop.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    colSpan: {
      control: 'number',
      description: 'Decides how many columns this fields will take in a row inside a `Form` component.',
      table: {
        type: { summary: 'number' },
        category: 'props',
      },
    },
    hidden: {
      control: 'boolean',
      description:
        'Allows the field to be visually hidden from the UI while still existing in the DOM. <br /> ** To prevent the field from rendering entirely, use the React pattern: `{condition && <FormField ... />}`. **',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    shouldReserveSpaceForHelperText: {
      control: 'boolean',
      description:
        "Whether to reserve the space for the helper/error text so the UI won't jump when it appears/disappears.",
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    align: {
      control: 'select',
      options: ['start', 'end'],
      description: 'align the field content - label, helper text and error text.',
      table: { defaultValue: { summary: 'start' }, type: { summary: 'start | end' }, category: 'props' },
    },
  },
  args: {
    labelProps: { label: 'Full name' },
    helperText: 'Will be used as the name on checks.',
    isDisabled: false,
    isViewMode: false,
    isReadOnly: false,
    isRequired: false,
    showOptionalIndicator: false,
    size: 'large',
    shouldReserveSpaceForHelperText: false,
    'data-testid': 'form-field',
  },
};
export default meta;

export const Main: StoryObj<typeof FormField> = {
  render: (args) => <FormField {...args} render={() => <Storybook.ContentPlaceholder flexGrow={1} />} />,
};

/**
 * The label can be hidden, but the label is required in `labelProps` to keep the label for accessibility.
 *
 * Set `isHidden` to true in `labelProps` to hide the label.
 */
export const WithoutLabel: StoryObj<typeof FormField> = {
  args: {
    ...Main.args,
  },
  render: (args: FormFieldProps) => (
    <FormField
      {...args}
      labelProps={{ ...args.labelProps, isHidden: true } as FormFieldProps['labelProps']}
      render={() => <Storybook.ContentPlaceholder flexGrow={1} />}
    />
  ),
};

/**
 * Used to set the minimum size of the wrapped container of the rendered component, the size passed to the rendered component.
 */
export const Sizes: StoryObj<typeof FormField> = {
  args: {
    ...Main.args,
  },
  render: (args: FormFieldProps) => (
    <Group width="full">
      <Group variant="vertical" width="full">
        <Text textStyle="body3">Small</Text>
        <FormField {...args} size="small" render={() => <Storybook.ContentPlaceholder flexGrow={1} />} />
      </Group>
      <Group variant="vertical" width="full">
        <Text textStyle="body3">Large</Text>
        <FormField {...args} size="large" render={() => <Storybook.ContentPlaceholder flexGrow={1} />} />
      </Group>
    </Group>
  ),
};

/**
 * This state is used to show the error state and message below the field/rendered component.
 */
export const WithError: StoryObj<typeof FormField> = {
  render: (args) => (
    <FormField
      {...args}
      render={() => <Storybook.ContentPlaceholder flexGrow={1} />}
      error={{ message: 'Please use a human name.' }}
    />
  ),
};

/**
 * Used to set the field with a disabled state, the disabled state passed to the rendered component.
 */
export const Disabled: StoryObj<typeof FormField> = {
  render: (args) => <FormField {...args} render={() => <Storybook.ContentPlaceholder flexGrow={1} />} isDisabled />,
};

/**
 * Used mostly when a form is in a view mode.
 *
 * To ensure accessibility, in case the `Form` component is in view mode, the `FormField` will render as `<li>`.
 *
 */

export const ViewMode: StoryObj<typeof FormField> = {
  render: (args) => <FormField {...args} render={() => <Storybook.ContentPlaceholder flexGrow={1} />} isViewMode />,
};
/**
 * Used to set the field as read-only, the read-only state is also passed to the rendered component.
 */
export const ReadOnly: StoryObj<typeof FormField> = {
  render: (args) => <FormField {...args} render={() => <Storybook.ContentPlaceholder flexGrow={1} />} isReadOnly />,
};

/**
 * Used to render a tooltip next to the label, the tooltip shows when hovering over the info icon.
 */
export const WithLabelTooltip: StoryObj<typeof FormField> = {
  render: (args) => (
    <FormField
      {...args}
      render={() => <Storybook.ContentPlaceholder flexGrow={1} />}
      labelProps={{
        label: 'Full name',
        tooltipProps: {
          content: (
            <>
              <Box as="span" display="inline-flex" textStyle="body4Semi">
                Title
              </Box>
              Label
            </>
          ),
        },
      }}
    />
  ),
  play: async () => userEvent.hover(screen.getByTestId('label-tooltip-trigger')),
};

/**
 `FormField` with `isRequired` will have `*` next to the required field label.
 */
export const Required: StoryObj<typeof FormField> = {
  render: (args) => (
    <Group width="full">
      <Group variant="vertical" width="full">
        <Text textStyle="body3">Required</Text>
        <FormField {...args} isRequired render={() => <Storybook.ContentPlaceholder flexGrow={1} />} />
      </Group>
      <Group variant="vertical" width="full">
        <Text textStyle="body3">Optional</Text>
        <FormField {...args} render={() => <Storybook.ContentPlaceholder flexGrow={1} />} />
      </Group>
    </Group>
  ),
};

/**
 `FormField` with `showOptionalIndicator` will have `(optional)` next to the optional field label.
 */
export const ShowOptionalIndicator: StoryObj<typeof FormField> = {
  render: (args) => (
    <Group width="full">
      <FormField {...args} showOptionalIndicator render={() => <Storybook.ContentPlaceholder flexGrow={1} />} />
    </Group>
  ),
};

/**
 * Here's an example align `Field` to the end by with `align` prop.
 * */

export const Align: StoryObj<typeof FormField> = {
  render: (args) => (
    <Group width="full">
      <Group variant="vertical" width="full">
        <Text textStyle="body3">Start</Text>
        <FormField {...args} render={() => <Storybook.ContentPlaceholder flexGrow={1} />} />
      </Group>
      <Group variant="vertical" width="full">
        <Text textStyle="body3">End</Text>
        <FormField {...args} align="end" render={() => <Storybook.ContentPlaceholder flexGrow={1} />} />
      </Group>
    </Group>
  ),
};

/**
 * Set a maximum number of characters that can be entered in the field.<br />
 * - Require using the `useMelioForm` hook to register the field.
 * - The chars counter works only with `TextArea` and `TextField`.
 */
export const WithMaxChars: StoryObj<typeof FormField> = {
  args: {
    ...Main.args,
    maxChars: 20,
  },
  render: (args) => {
    const { registerField } = useMelioForm({
      defaultValues: { textField: 'Text here' },
      onSubmit: () => null,
    });

    return <FormField {...args} {...registerField('textField')} render={(props) => <TextField {...props} />} />;
  },
};

/**
 * Use the `colSpan` to set how many columns this fields will take in a row inside a `Form` component.
 *
 * In the following example, the `Form` set with 2 columns grid - the first two fields take one column each, and the third field takes two columns.
 */
export const ColSpan: StoryObj<typeof FormField> = {
  render: (args) => (
    <Storybook.Container maxWidth="900px" margin="auto">
      <Form columns={2}>
        <FormField
          {...args}
          id="field1"
          labelProps={{ ...args.labelProps, label: 'Field 1 label' }}
          render={(props) => <TextField {...props} />}
        />
        <FormField
          {...args}
          id="field2"
          labelProps={{ ...args.labelProps, label: 'Field 2 label' }}
          render={(props) => <TextField {...props} />}
        />
        <FormField
          {...args}
          id="field3"
          labelProps={{ ...args.labelProps, label: 'Field 3 label' }}
          colSpan={2}
          render={(props) => <TextField {...props} />}
        />
      </Form>
    </Storybook.Container>
  ),
};

/**
 * In the following example, `useMelioForm` is used to register the fields and manage the `Form`'s state and validation through schema validation.
 *
 * To pass the `Form`'s state and validation, you should spread the `registerField` props into the `FormField` and pass the props from the `render` function into the rendered component.
 */
export const UsingForm: StoryObj<typeof FormField> = {
  render: ({ isViewMode, ...args }: FormFieldProps) => {
    type FormFields = { field4: string; field5: string; optional: string; required: string };

    const schema = yup.object().shape({
      field4: yup.string(),
      field5: yup.string(),
      optional: yup.string(),
      required: yup
        .mixed()
        .required('This field is required')
        .test((value: string) => !!value),
    }) as SchemaOf<FormFields>;

    const { formProps, registerField, submitButtonProps } = useMelioForm({
      schema,
      defaultValues: {
        field4: "Field 1's value",
        field5: "Field 2's value",
        optional: "Optional field's value",
        required: "Required field's value",
      },
      onSubmit: () => null,
    });

    return (
      <Group variant="vertical">
        <Form {...formProps} columns={2}>
          <FormField
            {...args}
            {...registerField('field4')}
            labelProps={{ ...args.labelProps, label: 'Field 1 label' }}
            render={(props) => <TextField {...props} />}
          />
          <FormField
            {...args}
            {...registerField('field5')}
            labelProps={{ ...args.labelProps, label: 'Field 2 label' }}
            render={(props) => <TextField {...props} />}
          />
          <FormField
            {...args}
            {...registerField('optional')}
            labelProps={{
              ...args.labelProps,
              label: 'Optional Field',
            }}
            render={(props) => <TextField {...props} />}
          />
          <FormField
            {...args}
            {...registerField('required')}
            labelProps={{ ...args.labelProps, label: 'Required Field' }}
            helperText="I'll show an error message if I'm empty. (psst, use Enter/Submit button)"
            render={(props) => <TextField {...props} />}
          />
        </Form>
        <Button {...submitButtonProps} label="Submit" />
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
 * The `FormField` can render any component.
 *
 * In the following example, `Form` includes a custom content that renders as a `FormField`.
 */
export const UsingFormWithCustomContent: StoryObj<typeof FormField> = {
  render: (args) => {
    type FormFields = { field4: string; field5: string; field6: string };

    const schema = yup.object().shape({
      field4: yup.string(),
      field5: yup.string(),
      field6: yup.string(),
    }) as SchemaOf<FormFields>;

    const { formProps, registerField, submitButtonProps } = useMelioForm({
      schema,
      defaultValues: {
        field4: "Field 1's value",
        field5: "Field 2's value",
        field6: "Field 3's value",
      },
      onSubmit: () => null,
    });

    return (
      <Group variant="vertical">
        <Form {...formProps} columns={2}>
          <FormField
            {...args}
            {...registerField('field4')}
            labelProps={{ ...args.labelProps, label: 'Field 1 label' }}
            render={(props) => <TextField {...props} />}
          />
          <FormField
            {...args}
            {...registerField('field5')}
            labelProps={{ ...args.labelProps, label: 'Field 2 label' }}
            render={(props) => <TextField {...props} />}
          />
          <FormField
            {...args}
            isReadOnly
            helperText={undefined}
            colSpan={2}
            render={() => (
              <Group variant="vertical" alignItems="center">
                <Text textStyle="body2" as="h2">
                  Basic access to manage bills and schedule payments
                </Text>
                <Text textStyle="body2">May require Admin approval for payments over a set amount</Text>
              </Group>
            )}
          />
          <FormField
            {...args}
            {...registerField('field6')}
            labelProps={{
              ...args.labelProps,
              label: 'Field 3 label',
            }}
            render={(props) => <TextField {...props} />}
          />
        </Form>
        <Button {...submitButtonProps} label="Submit" />
      </Group>
    );
  },
};

/**
 * The `FormField` is used to align the UI elements in the center of the container.
 */
export const CenteringElements: StoryObj<typeof FormField> = {
  render: (args) => (
    <Group width="full" variant="vertical">
      <Text>Large</Text>
      <Group width="full">
        <FormField {...args} id="field1" size="large" render={(props) => <TextField {...props} />} />
        <FormField
          {...args}
          size="large"
          labelProps={{ ...args.labelProps, label: 'Full name', isHidden: true }}
          helperText={undefined}
          justifyContent="center"
          render={() => <Text textStyle="body3">text in FormField</Text>}
        />
      </Group>
      <Text>Small</Text>
      <Group width="full">
        <FormField {...args} id="field2" size="small" render={(props) => <TextField {...props} />} />
        <FormField
          {...args}
          size="small"
          labelProps={{ ...args.labelProps, label: 'Full name', isHidden: true }}
          helperText={undefined}
          justifyContent="center"
          render={() => <Text textStyle="body3">text in FormField</Text>}
        />
      </Group>
    </Group>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 For accessibility reasons, you can set helper text as `ReactNode`. For example, describing to screen reader the date format of a type-able date field.
 */
export const HelperText: StoryObj<typeof FormField> = {
  render: (args) => (
    <FormField
      {...args}
      id="deliver-date"
      labelProps={{ label: 'Deliver date' }}
      render={(props) => <DateField {...props} isTypable />}
      helperText={
        <>
          <VisuallyHidden>date format: MM/DD/YYYY</VisuallyHidden>
          Visible helper text
        </>
      }
    />
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * This example demonstrates how to visually hide a field from the UI while keeping it present in the DOM.<br />
 * Use the `hidden` attribute prop to hide the field, and inspect the DOM using developer tools to see the `hidden` attribute.<br />
 *
 * **Note:** To prevent the field from rendering entirely, use the React pattern: `{condition && <FormField ... />}`.<br />
 */
export const Hidden: StoryObj<typeof FormField> = {
  render: (args) => {
    const [isFieldHidden, setIsFieldHidden] = useBoolean(true);

    return (
      <Group variant="vertical">
        <Storybook.Container maxWidth="150px">
          <Button label={`${isFieldHidden ? 'Show' : 'Hide'} Field`} onClick={setIsFieldHidden.toggle} />
        </Storybook.Container>
        {/* Field with isHidden prop, hidden from UI but still exists in the DOM */}
        <FormField {...args} render={() => <Storybook.ContentPlaceholder flexGrow={1} />} hidden={isFieldHidden} />
        {/* Field conditionally rendered based on `isFieldHidden` */}
        {!isFieldHidden && <FormField {...args} render={() => <Storybook.ContentPlaceholder flexGrow={1} />} />}
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
 * Here's a demonstration of scrolling to the first invalid field in the form after the form is submitted.
 */
export const ScrollToViewFieldWithError: StoryObj<typeof FormField> = {
  render: ({ isViewMode, ...args }: FormFieldProps) => {
    type FormFields = { name: string; email: string };

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
    }) as SchemaOf<FormFields>;

    const { formProps, registerField, submitButtonProps } = useMelioForm({
      schema,
      onSubmit: () => null,
    });

    return (
      <Group variant="vertical">
        <Button {...submitButtonProps} label="Click here to scroll to the first field with error" />
        <Box height="100vh" />
        <Form {...formProps}>
          <FormField
            {...args}
            {...registerField('name')}
            labelProps={{
              ...args.labelProps,
              label: 'Name',
            }}
            render={(props) => <TextField placeholder="Enter your name..." {...props} />}
          />
          <FormField
            {...args}
            {...registerField('email')}
            labelProps={{ ...args.labelProps, label: 'Email' }}
            helperText="Will be used as the email on checks"
            render={(props) => <TextField placeholder="Enter your email..." {...props} />}
          />
        </Form>
      </Group>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
  name: 'Scroll to the first field with error',
};

setChromaticViewports([ColSpan], ['xl', 'xs']);
