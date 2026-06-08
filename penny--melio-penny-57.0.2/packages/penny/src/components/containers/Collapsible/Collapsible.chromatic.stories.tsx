import { type Meta, type StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Group } from '../Group';
import { Collapsible } from './Collapsible';

const meta: Meta<typeof Collapsible> = {
  title: 'Chromatic/Collapsible',
  component: Collapsible,
  parameters: {
    chromatic: { delay: 300 },
  },
  args: {
    label: 'View next 4 recurring payments',
    secondaryLabel: '',
    children: <Storybook.ContentPlaceholder />,
    defaultIsExpanded: true,
  },
};
export default meta;

export const ClosedWithSecondaryLabel: StoryObj<typeof Collapsible> = {
  render: (args) => <Collapsible {...args} secondaryLabel="second label" defaultIsExpanded={false} />,
  parameters: {
    pseudo: { hover: true },
  },
};

export const OpenWithSecondaryLabelWithHover: StoryObj<typeof Collapsible> = {
  render: (args) => <Collapsible {...args} secondaryLabel="second label" />,
  parameters: {
    pseudo: { hover: true },
  },
};

export const FullLabelView: StoryObj<typeof Collapsible> = {
  render: (args) => (
    <Group variant="vertical" spacing="l" hasDivider>
      <Collapsible {...args} labelView="full" label="Label view set to 'full' without secondary label" />
      <Collapsible
        {...args}
        labelView="full"
        label="Label view set to 'full' with secondary label"
        secondaryLabel="second label"
      />
    </Group>
  ),
};

export const WithLongText: StoryObj<typeof Collapsible> = {
  render: (args) => (
    <Group variant="vertical" spacing="l" hasDivider>
      <Collapsible
        {...args}
        label="This is an example collapsible without secondary label with very long label that will be truncated with ellipsis: Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      />
      <Collapsible
        {...args}
        label="This is an example collapsible with very long label that will be truncated with ellipsis: Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        secondaryLabel="second label"
      />
      <Collapsible
        {...args}
        label="This is an example collapsible with very that will be truncated with ellipsis: Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        secondaryLabel="This is a second label with very long text that will be truncated with ellipsis"
      />
    </Group>
  ),
};
