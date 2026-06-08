/* eslint-disable @typescript-eslint/no-deprecated */
import { Box } from '@chakra-ui/react';
import { useBoolean } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect } from 'react';
import { screen, userEvent } from 'storybook/test';
import { Storybook } from 'storybook-utils';
import type { SchemaOf } from 'yup';
import * as yup from 'yup';

import { Button } from '@/components/action/Button';
import { Group } from '@/components/containers/Group';
import type { TypographyLabelProps } from '@/components/dataDisplay/typography';
import { useMelioForm } from '@/components/form/hooks';
import { commonFormFieldControls } from '@/test-utils/stories.utils';

import { Form } from '../..';

const meta: Meta<typeof Form.TextArea> = {
  title: 'Internal Components/Form Fields/Text Area',
  component: Form.TextArea,
  parameters: { docs: { source: { type: 'code' } } },
  argTypes: {
    isEditable: {
      control: 'boolean',
      description: 'Sets the field as editable.',
      table: { defaultValue: { summary: 'true' }, type: { summary: 'boolean' }, category: 'props' },
    },
    footer: {
      control: 'object',
      description: 'An object of the text-area footer checkbox.',
      table: {
        type: {
          summary: `Pick<CheckboxProps, 'isDisabled' | 'isIndeterminate' | 'isInvalid' | 'isReadOnly' | 'label'>`,
        },
        category: 'props',
      },
    },
    'aria-label': {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'The aria-label for the text area.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
    isReadOnly: commonFormFieldControls['isReadOnly'],
    isDisabled: commonFormFieldControls['isDisabled'],
    isLoading: commonFormFieldControls['isLoading'],
    placeholder: commonFormFieldControls['placeholder'],
    isHidden: commonFormFieldControls['isHidden'],
    labelProps: commonFormFieldControls['labelProps'],
    helperTextProps: commonFormFieldControls['helperTextProps'],
    numberOfRows: {
      control: 'number',
      description: 'Number of rows in the text area.',
      table: { defaultValue: { summary: '4' }, type: { summary: 'number' }, category: 'props' },
    },
    maxChars: {
      control: 'number',
      description: 'The maximum length (in characters) of the text area.',
      table: {
        type: { summary: 'number' },
        category: 'props',
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'text-area-input' }, type: { summary: 'string' }, category: 'tests' },
    },
  },
  args: {
    labelProps: { label: 'Comment' },
    helperTextProps: { label: 'What are your thoughts' },
    placeholder: 'Placeholder',
    isEditable: true,
    isReadOnly: false,
    isDisabled: false,
    isHidden: false,
    isLoading: false,
    footer: undefined,
    numberOfRows: undefined,
    maxChars: undefined,
  },
};
export default meta;

export const Main: StoryObj<typeof Form.TextArea> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    return (
      <Form>
        <Form.TextArea {...args} {...registerField('main')} />
      </Form>
    );
  },
};

/**
 * Max Chars is 10
 */
export const MaxChars: StoryObj<typeof Form.TextArea> = {
  args: {
    ...Main.args,
    maxChars: 10,
  },
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });
    return (
      <Form>
        <Form.TextArea {...args} {...registerField('main')} />
      </Form>
    );
  },
};

export const Invalid: StoryObj<typeof Form.TextArea> = {
  render: (args) => {
    const { registerField, setError } = useMelioForm({
      onSubmit: () => null,
    });

    useEffect(() => {
      setError('invalid', { message: 'What are you talkin bout willis?!' });
    }, [setError]);

    return (
      <Form>
        <Form.TextArea
          {...registerField('invalid')}
          {...args}
          labelProps={{ label: 'Comment' }}
          aria-label={undefined}
          helperTextProps={{ label: 'What are your thoughts?' }}
          placeholder="Placeholder"
        />
      </Form>
    );
  },
};

/**
 `FormField` with `isRequired` will have `*` next to the required field label.
 */
export const Required: StoryObj<typeof Form.TextArea> = {
  render: () => {
    type FormFields = { optional: string; required: string };

    const schema = yup.object().shape({
      optional: yup.string(),
      required: yup.string().required(),
    }) as SchemaOf<FormFields>;

    const { registerField } = useMelioForm<FormFields>({
      schema,
      defaultValues: { required: undefined, optional: undefined },
      onSubmit: () => null,
    });

    const items = [
      {
        label: 'Required',
        component: (
          <Form>
            <Form.TextArea
              {...registerField('required')}
              labelProps={{ label: 'Comment' }}
              helperTextProps={{ label: 'What are your thoughts?' }}
              placeholder="Placeholder"
            />
          </Form>
        ),
      },
      {
        label: 'Optional',
        component: (
          <Form>
            <Form.TextArea
              {...registerField('optional')}
              labelProps={{ label: 'Comment' }}
              helperTextProps={{ label: 'What are your thoughts?' }}
              placeholder="Placeholder"
            />
          </Form>
        ),
      },
    ];

    return (
      <Storybook.Row items={items} alignCompLabel="vertical" alignItems="flex-start" justifyContent="flex-start" />
    );
  },
};

/**
 `FormField` with `showOptionalIndicator` will have `(optional)` next to the optional field label.
 */
export const ShowOptionalIndicator: StoryObj<typeof Form.TextArea> = {
  render: ({ showOptionalIndicator }) => {
    type FormFields = { optional: string };

    const schema = yup.object().shape({
      optional: yup.string(),
    }) as SchemaOf<FormFields>;

    const { registerField } = useMelioForm<FormFields>({
      schema,
      showOptionalIndicator,
      defaultValues: { optional: undefined },
      onSubmit: () => null,
    });

    return (
      <Form>
        <Form.TextArea
          {...registerField('optional')}
          labelProps={{ label: 'Comment' }}
          helperTextProps={{ label: 'What are your thoughts?' }}
          placeholder="Placeholder"
        />
      </Form>
    );
  },
  args: { showOptionalIndicator: true },
};

export const Disabled: StoryObj<typeof Form.TextArea> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    return (
      <Form>
        <Form.TextArea
          {...registerField('disabled')}
          {...args}
          labelProps={{ label: 'Comment' }}
          aria-label={undefined}
          helperTextProps={{ label: 'What are your thoughts?' }}
          isDisabled
          placeholder="Placeholder"
        />
      </Form>
    );
  },
};

export const ReadOnly: StoryObj<typeof Form.TextArea> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    return (
      <Form>
        <Form.TextArea
          {...registerField('readOnly')}
          {...args}
          labelProps={{ label: 'Instructions' }}
          aria-label={undefined}
          helperTextProps={{
            label:
              'If you recieved bank account or payment instructions by email, we strongly recommend to contact your vendor to confirm the information.',
          }}
          isReadOnly
          placeholder="Placeholder"
        />
      </Form>
    );
  },
};

export const Loading: StoryObj<typeof Form.TextArea> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { loading: undefined }, onSubmit: () => null });

    return (
      <Form>
        <Form.TextArea {...args} {...registerField('loading')} isLoading />
      </Form>
    );
  },
};

export const WithLabelTooltip: StoryObj<typeof Form.TextArea> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    const labelWithTooltip = {
      label: 'Comment',
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
    };

    return (
      <Form>
        <Form.TextArea
          {...args}
          {...registerField('main')}
          aria-label={undefined}
          labelProps={labelWithTooltip as TypographyLabelProps}
        />
      </Form>
    );
  },
  play: async () => userEvent.hover(screen.getByTestId('label-tooltip-trigger')),
};

export const NotEditable: StoryObj<typeof Form.TextArea> = {
  render: (args) => {
    const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et t aliquip ex ea commodo consequat.`;

    const { registerField } = useMelioForm({
      onSubmit: () => null,
    });

    return (
      <Form>
        <Form.TextArea
          {...registerField('NotEditable')}
          {...args}
          labelProps={{ label: 'Instructions' }}
          aria-label={undefined}
          helperTextProps={{
            label:
              'If you recieved bank account or payment instructions by email, we strongly recommend to contact your vendor to confirm the information.',
          }}
          isEditable={false}
          placeholder={longText}
        />
      </Form>
    );
  },
  parameters: { chromatic: { delay: 1000 } },
};

export const NotEditableWithFooter: StoryObj<typeof Form.TextArea> = {
  render: (args) => {
    const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et t aliquip ex ea commodo consequat.`;
    const { formProps, registerField, submitButtonProps } = useMelioForm({
      defaultValues: { field1: undefined },
      onSubmit: () => null,
    });

    return (
      <Form {...formProps}>
        <Form.TextArea
          {...registerField('field1')}
          {...args}
          labelProps={{ label: 'Instructions' }}
          aria-label={undefined}
          helperTextProps={{
            label:
              'If you recieved bank account or payment instructions by email, we strongly recommend to contact your vendor to confirm the information.',
          }}
          isEditable={false}
          placeholder={longText}
          footer={{ label: 'I’ve read and agree to the Credit Key Business Loan Agreement.' }}
        />
        <Button {...submitButtonProps} label="Submit" />
      </Form>
    );
  },
};

/**
 * This example demonstrates how to visually hide a field from the UI while keeping it present in the DOM.<br />
 * Use the `isHidden` prop to hide the field, and inspect the DOM using developer tools to see the `data-hidden` attribute.<br />
 *
 * **Note:** To prevent the field from rendering entirely, use the React pattern: `{condition && <Form.TextArea ... />}`.<br />
 */
export const IsHidden: StoryObj<typeof Form.TextArea> = {
  render: (args) => {
    const [isFieldHidden, setIsFieldHidden] = useBoolean(true);
    const { registerField } = useMelioForm({
      onSubmit: () => null,
    });

    return (
      <Group variant="vertical">
        <Storybook.Container maxWidth="150px">
          <Button label={`${isFieldHidden ? 'Show' : 'Hide'} Field`} onClick={setIsFieldHidden.toggle} />
        </Storybook.Container>
        <Form>
          {/* Field with isHidden prop, hidden from UI but still exists in the DOM */}
          <Form.TextArea {...registerField('field1')} {...args} isHidden={isFieldHidden} />
          {/* Field conditionally rendered based on `isFieldHidden` */}
          {!isFieldHidden && <Form.TextArea {...registerField('field2')} {...args} />}
        </Form>
      </Group>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
