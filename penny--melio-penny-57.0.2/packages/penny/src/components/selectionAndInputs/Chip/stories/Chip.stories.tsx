import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { StatusIndicator } from '@/components/dataDisplay';
import { extractComponentSource } from '@/test-utils/storybook.utils';

import { Chip } from '../Chip';
import { MultipleSelectionExample, SingleSelectionExample } from './examples/GroupSelection.examples';
import GroupSelectionExampleRaw from './examples/GroupSelection.examples?raw';

const meta: Meta<typeof Chip> = {
  title: 'Selection & Inputs Components/Chip',
  component: Chip,
  argTypes: {
    as: {
      control: 'select',
      options: ['button', 'div'],
      description: 'The semantic meaning of the element.',
      table: { defaultValue: { summary: 'button' }, type: { summary: 'button | div' }, category: 'accessibility' },
    },
    label: {
      control: false,
      description: 'The text inside the button, display on hover',
      table: {
        type: { summary: 'ReactNode' },
        category: 'props',
      },
    },
    selected: {
      control: 'boolean',
      description: 'Determines if the chip is selected.',
      type: { name: 'boolean' },
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    onClick: {
      control: false,
      description: 'An event handler for clicking the button.',
      table: { type: { summary: 'MouseEventHandler<HTMLDivElement>' }, category: 'events' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'chip' }, type: { summary: 'string' }, category: 'tests' },
    },
    hover: {
      control: 'boolean',
      description: 'Determines if the chip is hovered.',
      type: { name: 'boolean' },
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    active: {
      control: 'boolean',
      description: 'Determines if the chip is active.',
      type: { name: 'boolean' },
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
  },
  args: {
    label: 'Filter',
    selected: false,
    active: false,
    hover: false,
  },
};
export default meta;

export const Main: StoryObj<typeof Chip> = {
  render: ({ selected: selectedProp, ...args }) => {
    const [selected, setSelected] = useState<boolean | undefined>(selectedProp);

    const handleOnClick = () => {
      setSelected(!selected);
    };

    return <Chip {...args} onClick={handleOnClick} selected={selected} />;
  },
};

export const WithStatusIndicator: StoryObj<typeof Chip> = {
  render: ({ selected: selectedProp, ...args }) => {
    const [selected, setSelected] = useState<boolean | undefined>(selectedProp);

    return (
      <StatusIndicator status="critical">
        <Chip {...args} onClick={() => setSelected(!selected)} selected={selected} />
      </StatusIndicator>
    );
  },
};

/**
 * If you need to use `Chip` in a group of multiple chips with a `single selection options`,
 * for accessibility you need to:
 * 1. Render the `Chip`  component as `div`
 * 2. Wrap it in a [HiddenOptionInput](?path=/docs/selection-inputs-components-hidden-option-input--docs) component with `type=radio`
 */

export const SingleSelectionChipGroup: StoryObj<typeof Chip> = {
  render: () => <SingleSelectionExample />,
  parameters: {
    docs: { source: { code: extractComponentSource(GroupSelectionExampleRaw, 'SingleSelectionExample') } },
  },
};

/**
 * If you need to use `Chip` in a group of multiple chips with a `multiple selection options`,
 * for accessibility you need to:
 * 1. Render the `Chip`  component as `div`
 * 2. Wrap it in a [HiddenOptionInput](?path=/docs/selection-inputs-components-hidden-option-input--docs) component with `type=checkbox`
 */

export const MultipleSelectionChipGroup: StoryObj<typeof Chip> = {
  render: () => <MultipleSelectionExample />,
  parameters: {
    docs: { source: { code: extractComponentSource(GroupSelectionExampleRaw, 'MultipleSelectionExample') } },
  },
};
