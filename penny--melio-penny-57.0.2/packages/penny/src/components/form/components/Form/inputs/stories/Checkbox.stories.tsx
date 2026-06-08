/* eslint-disable @typescript-eslint/no-deprecated */
import { Box, SimpleGrid } from '@chakra-ui/react';
import { useBoolean } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect } from 'react';
import { screen, userEvent } from 'storybook/test';
import { Storybook } from 'storybook-utils';
import type { SchemaOf } from 'yup';
import * as yup from 'yup';

import { Button } from '@/components/action/Button';
import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import type { TypographyLabelProps } from '@/components/dataDisplay/typography';
import { useMelioForm } from '@/components/form/hooks';
import { commonFormFieldControls } from '@/test-utils/stories.utils';

import { Form } from '../..';

const meta: Meta<typeof Form.Checkbox> = {
  title: 'Internal Components/Form Fields/Checkbox',
  component: Form.Checkbox,
  parameters: {
    docs: { source: { type: 'code' } },
  },
  argTypes: {
    label: {
      control: 'text',
      name: 'label',
      description: 'The label of the checkbox field.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    isIndeterminate: {
      control: 'boolean',
      description: 'Determines if the checkbox is indeterminate.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isDisabled: commonFormFieldControls['isDisabled'],
    isHidden: commonFormFieldControls['isHidden'],
    labelProps: commonFormFieldControls['labelProps'],
    helperTextProps: commonFormFieldControls['helperTextProps'],
    isRequired: commonFormFieldControls['isRequired'],
    showOptionalIndicator: commonFormFieldControls['showOptionalIndicator'],
    'aria-labelledby': {
      control: 'text',
      description: 'The id of the element that labels the checkbox.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
    'aria-describedby': {
      control: 'text',
      description: 'The id of the element that describes the checkbox.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'checkbox' }, type: { summary: 'string' }, category: 'tests' },
    },
  },
  args: {
    labelProps: { label: 'Terms and conditions' },
    label: 'I agree!',
    helperTextProps: { label: 'please check the box if you accept the terms' },
    isRequired: false,
    showOptionalIndicator: false,
    'data-testid': 'checkbox',
  },
};
export default meta;

export const Main: StoryObj<typeof Form.Checkbox> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { field1: false }, onSubmit: () => null });

    return (
      <Form>
        <Form.Checkbox {...registerField('field1')} {...args} />
      </Form>
    );
  },
};

export const Invalid: StoryObj<typeof Form.Checkbox> = {
  render: (args) => {
    const { registerField, setError } = useMelioForm({
      defaultValues: { invalid: false },
      onSubmit: () => null,
    });

    useEffect(() => {
      setError('invalid', { message: 'Please agree to terms.' });
    }, [setError]);

    return (
      <Form>
        <Form.Checkbox {...registerField('invalid')} {...args} />
      </Form>
    );
  },
};

export const Disabled: StoryObj<typeof Form.Checkbox> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { disabled: false }, onSubmit: () => null });

    return (
      <Form>
        <Form.Checkbox {...registerField('disabled')} {...args} isDisabled />
      </Form>
    );
  },
};

export const Indeterminate: StoryObj<typeof Form.Checkbox> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { indeterminate: false }, onSubmit: () => null });

    return (
      <Form>
        <Form.Checkbox {...registerField('indeterminate')} {...args} isIndeterminate />
      </Form>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 `FormField` with `isRequired` will have `*` next to the required field label.
 */
export const Required: StoryObj<typeof Form.Checkbox> = {
  render: ({ isRequired, ...args }) => {
    type FormFields = { optional: boolean; required: boolean };

    const schema = yup.object().shape({
      optional: yup.boolean(),
      required: yup.boolean().required(),
    }) as SchemaOf<FormFields>;

    const { registerField } = useMelioForm<FormFields>({
      schema,
      defaultValues: { required: true, optional: false },
      onSubmit: () => null,
    });

    return (
      <Form>
        <SimpleGrid textAlign="start" columns={2}>
          <Text>Required</Text>
          <Text>Optional</Text>
          <Form.Checkbox {...registerField('required')} {...args} />
          <Form.Checkbox {...registerField('optional')} {...args} />
        </SimpleGrid>
      </Form>
    );
  },
  parameters: {
    chromatic: { delay: 1000 },
  },
};

/**
 `FormField` with `showOptionalIndicator` will have `(optional)` next to the optional field label.
 */
export const ShowOptionalIndicator: StoryObj<typeof Form.Checkbox> = {
  render: ({ showOptionalIndicator, ...args }) => {
    type FormFields = { optional: boolean };

    const schema = yup.object().shape({
      optional: yup.boolean(),
    }) as SchemaOf<FormFields>;

    const { registerField } = useMelioForm<FormFields>({
      schema,
      showOptionalIndicator,
      defaultValues: { optional: false },
      onSubmit: () => null,
    });

    return (
      <Form>
        <Form.Checkbox {...registerField('optional')} {...args} />
      </Form>
    );
  },
  args: { showOptionalIndicator: true },
};

export const WithLabelTooltip: StoryObj<typeof Form.Checkbox> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { field1: false }, onSubmit: () => null });

    const labelWithTooltip = {
      label: 'Terms and conditions',
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
        <Form.Checkbox
          {...registerField('field1')}
          {...args}
          aria-label={undefined}
          labelProps={labelWithTooltip as TypographyLabelProps}
        />
      </Form>
    );
  },
  play: async () => userEvent.hover(screen.getByTestId('label-tooltip-trigger')),
};

/**
 * This example demonstrates how to visually hide a field from the UI while keeping it present in the DOM.<br />
 * Use the `isHidden` prop to hide the field, and inspect the DOM using developer tools to see the `data-hidden` attribute.<br />
 *
 * **Note:** To prevent the field from rendering entirely, use the React pattern: `{condition && <Form.Checkbox ... />}`.<br />
 */
export const IsHidden: StoryObj<typeof Form.Checkbox> = {
  render: (args) => {
    const [isFieldHidden, setIsFieldHidden] = useBoolean(true);
    const { registerField } = useMelioForm({
      defaultValues: { field1: false, field2: false },
      onSubmit: () => null,
    });

    return (
      <Group variant="vertical">
        <Storybook.Container maxWidth="150px">
          <Button label={`${isFieldHidden ? 'Show' : 'Hide'} Field`} onClick={setIsFieldHidden.toggle} />
        </Storybook.Container>
        <Form>
          {/* Field with isHidden prop, hidden from UI but still exists in the DOM */}
          <Form.Checkbox {...registerField('field1')} {...args} isHidden={isFieldHidden} />
          {/* Field conditionally rendered based on `isFieldHidden` */}
          {!isFieldHidden && <Form.Checkbox {...registerField('field2')} {...args} />}
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
