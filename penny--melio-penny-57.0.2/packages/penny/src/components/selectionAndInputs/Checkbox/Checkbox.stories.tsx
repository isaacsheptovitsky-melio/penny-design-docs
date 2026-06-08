import { SimpleGrid } from '@chakra-ui/react';
import { noop } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { screen, userEvent, within } from 'storybook/test';

import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { FormField } from '@/components/form/components/FormField';
import { Link } from '@/components/navigation/Link';

import { Checkbox } from './Checkbox';

const tooltipProps = `{
  content: ReactNode;
  triggerAriaLabel?: string;
}`;

const meta: Meta<typeof Checkbox> = {
  title: 'Selection & Inputs Components/Checkbox',
  component: Checkbox,
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'large'],
      description: 'The size of the field.',
      table: { type: { summary: 'small | large' }, category: 'props' },
    },
    label: {
      control: 'text',
      description: 'The label of the field.',
      type: 'string',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    onChange: {
      action: 'clicked',
      description: 'Handles the click event from the checkbox.',
      table: {
        type: { summary: 'ChangeEventHandler<HTMLInputElement>' },
        category: 'events',
      },
    },
    isChecked: {
      control: 'boolean',
      description: 'Determines if the checkbox is checked.',
      type: 'boolean',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isIndeterminate: {
      control: 'boolean',
      description: 'Sets the checkbox in indeterminate state.',
      type: 'boolean',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Determines if the checkbox is disabled.',
      type: 'boolean',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    children: {
      control: false,
      description: 'used to render the checkbox label as ReactNode. to allow rendering of custom content.',
      type: 'string',
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Determines if the checkbox is read only.',
      type: 'boolean',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isInvalid: {
      control: 'boolean',
      description: 'Determines if the checkbox is invalid.',
      type: 'boolean',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    tooltipProps: {
      control: 'object',
      table: { type: { summary: `Pick<TitleProps, 'label' | 'title'>`, detail: tooltipProps }, category: 'props' },
      description: 'The tooltip to display.',
    },
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
    autoFocus: {
      control: 'boolean',
      description: 'Sets the field to be focused on mount.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'checkbox' }, category: 'tests' },
    },
  },
  args: {
    size: 'large',
    label: 'Label',
    isChecked: false,
    isIndeterminate: false,
    isDisabled: false,
    onChange: noop,
    isReadOnly: false,
    isInvalid: false,
    autoFocus: false,
    'data-testid': 'checkbox',
  },
};
export default meta;

export const Main: StoryObj<typeof Checkbox> = {
  render: ({ isChecked: isCheckedControlled, ...args }) => {
    const [isChecked, setIsChecked] = useState(isCheckedControlled);

    const handleOnChange = () => {
      setIsChecked(!isChecked);
    };

    return <Checkbox {...args} isChecked={isChecked} onChange={handleOnChange} />;
  },
};

export const Sizes: StoryObj<typeof Checkbox> = {
  render: (args) => (
    <SimpleGrid columns={2} rowGap="s" columnGap="m" width="fit-content">
      <Checkbox {...args} size="small" label="Small" />
      <Checkbox {...args} size="large" label="Large" />
      <Checkbox {...args} isChecked size="small" label="Small" />
      <Checkbox {...args} isChecked size="large" label="Large" />
      <Checkbox {...args} isIndeterminate size="small" label="Small" />
      <Checkbox {...args} isIndeterminate size="large" label="Large" />
    </SimpleGrid>
  ),
};

export const Unchecked: StoryObj<typeof Checkbox> = {
  render: ({ label, ...args }) => (
    <Group spacing="xl" alignItems="center">
      <Checkbox {...args} isChecked={false} aria-label="unchecked" />
      <Checkbox {...args} isChecked={false} label={label} />
    </Group>
  ),
};

export const Checked: StoryObj<typeof Checkbox> = {
  render: ({ label, ...args }) => (
    <Group spacing="xl" alignItems="center">
      <Checkbox {...args} isChecked aria-label="checked" />
      <Checkbox {...args} isChecked label={label} />
    </Group>
  ),
};

export const Indeterminate: StoryObj<typeof Checkbox> = {
  render: ({ label, ...args }) => (
    <Group spacing="xl" alignItems="center">
      <Checkbox {...args} isIndeterminate aria-label="indeterminate" />
      <Checkbox {...args} isIndeterminate label={label} />
    </Group>
  ),
};

export const Disabled: StoryObj<typeof Checkbox> = {
  render: (args) => (
    <Group variant="vertical" spacing="s" width="fit-content">
      <Checkbox {...args} isDisabled label="Disabled unchecked" />
      <Checkbox {...args} isChecked isDisabled label="Disabled checked" />
      <Checkbox {...args} isIndeterminate isDisabled label="Disabled indeterminate" />
    </Group>
  ),
};

export const ReadOnly: StoryObj<typeof Checkbox> = {
  render: ({ onChange, ...args }) => (
    <Group variant="vertical" spacing="s" width="fit-content">
      <Checkbox {...args} isReadOnly label="Read Only unchecked" />
      <Checkbox {...args} isChecked isReadOnly label="Read Only checked" />
      <Checkbox {...args} isIndeterminate isReadOnly label="Read Only indeterminate" />
    </Group>
  ),
};

export const Invalid: StoryObj<typeof Checkbox> = {
  render: (args) => (
    <Group variant="vertical" spacing="s" width="fit-content">
      <Checkbox {...args} isInvalid label="Invalid unchecked" />
      <Checkbox {...args} isChecked isInvalid label="Invalid checked" />
      <Checkbox {...args} isIndeterminate isInvalid label="Invalid indeterminate" />
    </Group>
  ),
};

/**
 * Here’s an example of how to implement a tooltip on the Checkbox, along with the desired tooltip behavior:
 * - Hovering over both the checkbox input and the label will display the tooltip.
 * - Using the keyboard (tab), focusing on the checkbox input will display the tooltip.
 * - The tooltip will not be displayed on disabled elements.
 */
export const WithTooltip: StoryObj<typeof Checkbox> = {
  render: ({ isChecked: isCheckedControlled, ...args }) => {
    const [isChecked, setIsChecked] = useState(isCheckedControlled);

    const handleOnChange = () => {
      setIsChecked(!isChecked);
    };

    return (
      <Checkbox
        {...args}
        data-testid="trigger"
        tooltipProps={{ content: 'Beware! The lord of the land approaches.' }}
        onChange={handleOnChange}
        isChecked={isChecked}
      />
    );
  },
  play: async () => {
    const trigger = screen.getByTestId('trigger');
    await userEvent.hover(within(trigger).getByTestId('trigger-input'));
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const WithCustomContent: StoryObj<typeof Checkbox> = {
  render: (args) => (
    <Group variant="vertical" spacing="xl">
      <Checkbox {...args}>
        I agree to the <Link href="#" newTab label="Terms and Conditions" />
      </Checkbox>
      <Checkbox {...args} isDisabled>
        I agree to the <Link href="#" newTab label="Terms and Conditions" />
      </Checkbox>
      <Checkbox {...args} isReadOnly>
        I agree to the <Link href="#" newTab label="Terms and Conditions" />
      </Checkbox>
      <Checkbox {...args} isInvalid>
        I agree to the <Link href="#" newTab label="Terms and Conditions" />
      </Checkbox>
    </Group>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const WithFormField: StoryObj<typeof Checkbox> = {
  render: ({ isChecked: isCheckedControlled, ...args }) => {
    const [isChecked, setIsChecked] = useState(isCheckedControlled);

    const handleOnChange = () => {
      setIsChecked(!isChecked);
    };

    return (
      <Group spacing="xxxl">
        <Group variant="vertical">
          <Text textStyle="body2Semi">With Label</Text>

          <FormField
            labelProps={{ label: 'Terms and conditions', id: 'terms-and-conditions' }}
            helperText="Please check the box if you accept the terms"
            render={({ isViewMode, isLoading, ...props }) => (
              <Checkbox {...args} {...props} label="I agree" isChecked={isChecked} onChange={handleOnChange} />
            )}
          />
        </Group>

        <Group variant="vertical">
          <Text textStyle="body2Semi">Without Label</Text>
          <FormField
            helperText="Please check the box if you accept the terms"
            render={({ isViewMode, isLoading, ...props }) => (
              <Checkbox {...args} {...props} label="I agree" isChecked={isChecked} onChange={handleOnChange} />
            )}
          />
        </Group>
      </Group>
    );
  },
};
