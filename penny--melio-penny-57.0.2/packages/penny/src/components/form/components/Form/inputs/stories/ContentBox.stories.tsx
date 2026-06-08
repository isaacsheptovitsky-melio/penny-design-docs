/* eslint-disable @typescript-eslint/no-deprecated */
import { type Meta, type StoryObj } from '@storybook/react-vite';

import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { useMelioForm } from '@/components/form/hooks';

import { Form, type FormProps } from '../..';

const defaultFormArgs: FormProps = {
  columns: 2,
  size: 'large',
  isDisabled: false,
  isViewMode: false,
  isReadOnly: false,
};

/**
 * This component is **deprecated**. Please use [FormField](?path=/docs/form-form-field--using-form-with-custom-content).
 */

const meta: Meta<typeof Form.ContentBox> = {
  title: 'Internal Components/Form Fields/Content Box [deprecated]',

  component: Form.ContentBox,
  parameters: { docs: { source: { type: 'code' } } },
  argTypes: {
    children: {
      control: false,
      description: 'Free content to use inside the form',
      table: {
        type: { summary: 'ReactNode' },
        category: 'props',
      },
    },
    colSpan: {
      control: 'number',
      description: 'Decides how many columns this fields will take in a row inside a `Form` component.',
      table: {
        type: { summary: 'number' },
        category: 'props',
      },
    },
  },
  args: {
    children: undefined,
  },
};
export default meta;

export const Main: StoryObj<typeof Form.ContentBox> = {
  render: (args) => {
    const { registerField } = useMelioForm({
      defaultValues: {
        'content-box-field1': 'Field 1',
        'content-box-field2': 'Field 2',
        'content-box-field3': 'Field 3',
      },
      onSubmit: () => null,
    });

    return (
      <Form {...defaultFormArgs}>
        <Form.TextField
          {...registerField('content-box-field1')}
          labelProps={{ label: 'Field 1' }}
          helperTextProps={{ label: 'Helper text' }}
          placeholder="Field 1"
        />
        <Form.TextField
          {...registerField('content-box-field2')}
          labelProps={{ label: 'Field 2' }}
          helperTextProps={{ label: 'Helper text' }}
          placeholder="Field 2"
        />
        {/* This is an example of how to use `Form.ContentBox` */}
        <Form.ContentBox {...args} colSpan={2}>
          <Group variant="vertical" alignItems="center">
            <Text textStyle="body2" as="h2">
              Basic access to manage bills and schedule payments
            </Text>
            <Text textStyle="body2">May require Admin approval for payments over a set amount</Text>
          </Group>
        </Form.ContentBox>
        <Form.TextField
          {...registerField('content-box-field3')}
          labelProps={{ label: 'Field 3' }}
          helperTextProps={{ label: 'Helper text' }}
          colSpan={2}
        />
      </Form>
    );
  },
};
