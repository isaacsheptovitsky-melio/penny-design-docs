/* eslint-disable @typescript-eslint/no-deprecated */
import { useBoolean } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useEffect } from 'react';
import { screen, userEvent } from 'storybook/test';
import { Storybook } from 'storybook-utils';
import * as yup from 'yup';
import { type SchemaOf } from 'yup';

import { Button } from '@/components/action/Button';
import { Group } from '@/components/containers/Group';
import type { TypographyLabelProps } from '@/components/dataDisplay/typography';
import { useMelioForm } from '@/components/form/hooks';
import { commonFormFieldControls } from '@/test-utils/stories.utils';

import { Form } from '../../index';

const meta: Meta<typeof Form.Switch> = {
  title: 'Internal Components/Form Fields/Switch',
  component: Form.Switch,
  argTypes: {
    label: {
      control: 'text',
      name: 'label',
      description: 'The label next to the switch.',
      table: {
        category: 'props',
        type: {
          summary: 'string',
        },
      },
    },
    'aria-label': {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'The aria-label for the switch component.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
    size: commonFormFieldControls['size'],
    isDisabled: commonFormFieldControls['isDisabled'],
    isHidden: commonFormFieldControls['isHidden'],
    labelProps: commonFormFieldControls['labelProps'],
    helperTextProps: commonFormFieldControls['helperTextProps'],
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'switch' }, type: { summary: 'string' }, category: 'tests' },
    },
  },
  args: {
    labelProps: { label: 'Terms and conditions' },
    label: 'I agree!',
    helperTextProps: { label: 'please check the box if you accept the terms' },
    size: 'large',
    isDisabled: false,
  },
};
export default meta;

export const Main: StoryObj<typeof Form.Switch> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { field1: false }, onSubmit: () => null });

    return (
      <Form>
        <Form.Switch {...args} {...registerField('field1')} />
      </Form>
    );
  },
};

export const Sizes: StoryObj<typeof Form.Switch> = {
  render: () => {
    const { registerField } = useMelioForm({
      defaultValues: { field1: false, field2: false, field3: false, field4: false },
      onSubmit: () => null,
    });
    const items = [
      {
        label: 'Large Size',
        component: (
          <Form>
            <Form.Switch
              size="large"
              labelProps={{ label: 'Terms and conditions' }}
              helperTextProps={{ label: 'please check the box if you accept the terms' }}
              {...registerField('field1')}
            />
            <Form.Switch
              size="large"
              label="Label"
              labelProps={{ label: 'Terms and conditions' }}
              helperTextProps={{ label: 'please check the box if you accept the terms' }}
              {...registerField('field2')}
            />
          </Form>
        ),
      },
      {
        label: 'Small Size',
        component: (
          <Form>
            <Form.Switch
              size="small"
              labelProps={{ label: 'Terms and conditions' }}
              helperTextProps={{ label: 'please check the box if you accept the terms' }}
              {...registerField('field3')}
            />
            <Form.Switch
              size="small"
              label="Label"
              labelProps={{ label: 'Terms and conditions' }}
              helperTextProps={{ label: 'please check the box if you accept the terms' }}
              {...registerField('field4')}
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

export const Invalid: StoryObj<typeof Form.Switch> = {
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
        <Form.Switch {...registerField('invalid')} {...args} />
      </Form>
    );
  },
};

/**
 `FormField` with `isRequired` will have `*` next to the required field label.
 */
export const Required: StoryObj<typeof Form.Switch> = {
  render: () => {
    type FormFields = { optional: boolean; required: boolean };

    const schema = yup.object().shape({
      optional: yup.boolean(),
      required: yup.boolean().required(),
    }) as SchemaOf<FormFields>;

    const { registerField } = useMelioForm<FormFields>({
      schema,
      defaultValues: { required: false, optional: false },
      onSubmit: () => null,
    });

    const items = [
      {
        label: 'Required',
        component: (
          <Form>
            <Form.Switch
              size="large"
              labelProps={{ label: 'Terms and conditions' }}
              helperTextProps={{ label: 'please check the box if you accept the terms' }}
              {...registerField('required')}
            />
          </Form>
        ),
      },
      {
        label: 'Optional',
        component: (
          <Form>
            <Form.Switch
              size="large"
              labelProps={{ label: 'Terms and conditions' }}
              helperTextProps={{ label: 'please check the box if you accept the terms' }}
              {...registerField('optional')}
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
export const ShowOptionalIndicator: StoryObj<typeof Form.Switch> = {
  render: ({ showOptionalIndicator }) => {
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
        <Form.Switch
          size="large"
          labelProps={{ label: 'Terms and conditions' }}
          helperTextProps={{ label: 'please check the box if you accept the terms' }}
          {...registerField('optional')}
        />
      </Form>
    );
  },
  args: { showOptionalIndicator: true },
};

export const Disabled: StoryObj<typeof Form.Switch> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { disabled: false }, onSubmit: () => null });

    return (
      <Form>
        <Form.Switch {...registerField('disabled')} {...args} isDisabled />
      </Form>
    );
  },
};

export const WithLabelTooltip: StoryObj<typeof Form.Switch> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { field1: false }, onSubmit: () => null });

    const labelWithTooltip = {
      label: 'Terms and conditions',
      tooltipProps: {
        content: 'Something',
      },
    };

    return (
      <Form>
        <Form.Switch
          {...args}
          {...registerField('field1')}
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
 * **Note:** To prevent the field from rendering entirely, use the React pattern: `{condition && <Form.Switch ... />}`.<br />
 */
export const IsHidden: StoryObj<typeof Form.Switch> = {
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
          <Form.Switch {...registerField('field1')} {...args} isHidden={isFieldHidden} />
          {/* Field conditionally rendered based on `isFieldHidden` */}
          {!isFieldHidden && <Form.Switch {...registerField('field2')} {...args} />}
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
