import type { Meta, StoryObj } from '@storybook/react-vite';

import { Group } from '@/components/containers/Group';
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';
import { VariantGrid, VariantGridItem } from '@/storybook-utils/VariantGrid';

import { StatusIndicator } from './StatusIndicator';
import type { StatusType } from './StatusIndicator.types';

const statuses: readonly StatusType[] = ['success', 'informative', 'brand', 'warning', 'critical', 'neutral', 'secondary'];

const meta: Meta<typeof StatusIndicator> = {
  title: 'Components/Data Display/Status Indicator',
  component: StatusIndicator,
  argTypes: {
    status: {
      control: 'select',
      options: statuses,
      description: 'Semantic color of the indicator.',
      table: { defaultValue: { summary: 'brand' }, type: { summary: statuses.join(' | ') }, category: 'props' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Muted / de-emphasized appearance.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Dark-grey, informational-only appearance.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    children: {
      control: 'text',
      description: 'Optional content rendered beside the dot.',
      table: { category: 'content', type: { summary: 'ReactNode' } },
    },
  },
  args: { status: 'success', isDisabled: false, isReadOnly: false, children: 'Active' },
};

export default meta;
type Story = StoryObj<typeof StatusIndicator>;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'fullscreen', controls: { include: ['status', 'isDisabled', 'isReadOnly', 'children'] } },
  render: (args) => (
    <div style={{ padding: '32px', fontFamily: 'Poppins, sans-serif' }}>
      <StatusIndicator {...args} />
    </div>
  ),
};

const LABEL: Record<StatusType, string> = {
  success: 'Success',
  informative: 'Informative',
  brand: 'Brand',
  warning: 'Warning',
  critical: 'Critical',
  neutral: 'Neutral',
  secondary: 'Secondary',
};

export const Statuses: Story = {
  render: () => (
    <VariantGrid minItemWidth={120}>
      {statuses.map((status) => (
        <VariantGridItem key={status} label={LABEL[status]}>
          <StatusIndicator status={status} />
        </VariantGridItem>
      ))}
    </VariantGrid>
  ),
  parameters: { controls: { disable: true } },
};

export const States: Story = {
  render: () => (
    <VariantGrid minItemWidth={120}>
      <VariantGridItem label="Default">
        <StatusIndicator status="success" />
      </VariantGridItem>
      <VariantGridItem label="Read-only">
        <StatusIndicator status="success" isReadOnly />
      </VariantGridItem>
      <VariantGridItem label="Disabled">
        <StatusIndicator status="success" isDisabled />
      </VariantGridItem>
    </VariantGrid>
  ),
  parameters: { controls: { disable: true } },
};

export const WithLabel: Story = {
  render: () => (
    <Group variant="vertical" spacing="s" alignItems="flex-start">
      <StatusIndicator status="success">Active</StatusIndicator>
      <StatusIndicator status="warning">Pending</StatusIndicator>
      <StatusIndicator status="critical">Failed</StatusIndicator>
    </Group>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

export const RelatedComponentsBlock: StoryObj = {
  name: 'Related components',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <RelatedComponents>
      <RelatedComponent
        name="Tooltip"
        url="/?path=/docs/components-data-display-tooltip--docs"
        preview={<StatusIndicator status="success" />}
      />
      <RelatedComponent
        name="Status Icon Solid"
        url="/?path=/docs/foundations-status-icon-solid--docs"
        preview={<StatusIndicator status="informative" />}
      />
    </RelatedComponents>
  ),
};
