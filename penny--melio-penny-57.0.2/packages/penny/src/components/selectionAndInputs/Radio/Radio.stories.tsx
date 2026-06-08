import { noop } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Selection & Inputs Components/Radio [new]',
  component: Radio,
  parameters: { docs: { source: { type: 'code' } } },
  argTypes: {
    label: {
      description: 'The label of the radio item',
      control: 'text',
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    value: {
      description: 'The value of the radio item.',
      control: 'text',
      type: { name: 'string', required: true },
      table: { type: { summary: 'string' }, category: 'props' },
    },
    id: {
      description: 'The id of the radio item.',
      control: 'text',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    isChecked: {
      description: 'Decides if the radio item is checked.',
      control: 'boolean',
      table: { type: { summary: 'boolean' }, category: 'props' },
    },
    disabled: {
      control: 'boolean',
      description: 'Determines if the radio item is disabled.',
      type: 'boolean',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isInvalid: {
      control: 'boolean',
      description: 'Determines if the radio item is invalid.',
      type: 'boolean',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    onChange: {
      action: 'clicked',
      description: 'Handles the click event from the radio item.',
      table: {
        type: { summary: 'ChangeEventHandler<HTMLInputElement>' },
        category: 'events',
      },
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Determines if the radio item is in read-only state.',
      type: 'boolean',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    ariaLabel: {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'The aria-label for Radio item.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
  },
  args: {
    value: '1',
    name: 'radio-button',
    label: 'Radio button',
    disabled: false,
    isInvalid: false,
    onChange: noop,
    ariaLabel: 'radio button',
  },
};
export default meta;

export const Main: StoryObj<typeof Radio> = {
  render: ({ isChecked, ...args }) => {
    const [localIsChecked, setLocalIsChecked] = useState(isChecked ?? false);

    useEffect(() => {
      setLocalIsChecked(isChecked ?? false);
    }, [isChecked]);

    return <Radio {...args} isChecked={localIsChecked} onChange={(e) => setLocalIsChecked(!!e.target.value)} />;
  },
  args: {
    id: '1',
  },
};

/**
 * The `Radio` component supports using `Typography.MainLabel` and `Typography.Description` in the label using the `mainLabelProps` and `descriptionProps`.
 */
export const WithBadgeAndIconAndDescription: StoryObj<typeof Radio> = {
  ...Main,
  args: {
    ...Main.args,
    id: '2',
    label: undefined,
    mainLabelProps: {
      label: 'Main label',
      pillProps: { label: 'Badge', status: 'brand' },
      tooltipProps: { content: "You're the best!", triggerStatus: 'warning' },
    },
    descriptionProps: {
      label: 'Slightly longer description',
      action: { label: 'With CTA', onClick: () => null },
    },
  },
};

export const Disabled: StoryObj<typeof Radio> = {
  ...Main,
  args: {
    ...Main.args,
    id: '3',
    disabled: true,
  },
};

export const ReadOnly: StoryObj<typeof Radio> = {
  ...Main,
  args: { ...Main.args, id: '3', isReadOnly: true },
};

export const Invalid: StoryObj<typeof Radio> = {
  ...Main,
  args: {
    ...Main.args,
    id: '4',
    isInvalid: true,
  },
};

/**
 * You can put a `ReactNode` in the `label` to have more customized label.
 */
export const CustomOptionContent: StoryObj<typeof Radio> = {
  ...Main,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  args: {
    ...Main.args,
    id: '5',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    label: <Storybook.ContentPlaceholder />,
  },
};
