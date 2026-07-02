import type { Meta, StoryObj } from '@storybook/react-vite';

import { Counter } from '@/components/dataDisplay/Counter';
import { Group } from '@/components/containers/Group';
import { Icon } from '@/components/foundations/Icon';
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';

import { Pill } from './Pill';
import type { PillStatus, PillType } from './Pill.types';

const statuses: readonly PillStatus[] = ['neutral', 'informative', 'brand', 'success', 'warning', 'critical'];
const types: readonly PillType[] = ['primary', 'secondary', 'tertiary'];

const meta: Meta<typeof Pill> = {
  title: 'Components/Data Display/Pill',
  component: Pill,
  argTypes: {
    label: {
      control: 'text',
      description: 'The text on the pill.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    status: {
      control: 'select',
      options: statuses,
      description: 'The semantic color of the pill.',
      table: { type: { summary: statuses.join(' | ') }, category: 'props' },
    },
    type: {
      control: 'inline-radio',
      options: types,
      description: 'Visual emphasis of the pill.',
      table: { defaultValue: { summary: 'primary' }, type: { summary: types.join(' | ') }, category: 'props' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Applies the disabled visual style.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Renders the pill as read-only.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    leftElement: {
      control: false,
      description: 'Custom element (icon, logo, avatar) before the label. Must fit the 20px pill height.',
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    rightElement: {
      control: false,
      description: 'Custom element after the label. Must fit the 20px pill height.',
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    'aria-label': {
      control: 'text',
      description: 'Dedicated label for screen readers.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
  },
  args: {
    label: 'Verified',
    status: 'success',
    type: 'primary',
    isDisabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Pill>;

// ─── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: { controls: { include: ['label', 'status', 'type', 'isDisabled', 'isReadOnly'] } },
  render: (args) => (
    <div style={{ padding: '24px' }}>
      <Pill {...args} />
    </div>
  ),
};

// ─── Types ─────────────────────────────────────────────────────────────────────

/**
 * Three types vary the visual emphasis while keeping the same semantic status color.
 */
export const Types: Story = {
  render: () => (
    <Group spacing="m" alignItems="center">
      {types.map((type) => (
        <Group key={type} variant="vertical" spacing="xs" alignItems="center">
          <Pill status="brand" type={type} label="Beta" />
          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', color: '#64748B' }}>{type}</span>
        </Group>
      ))}
    </Group>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

// ─── Statuses ──────────────────────────────────────────────────────────────────

/**
 * Six semantic statuses for warnings, errors, success, and general info.
 */
export const Statuses: Story = {
  render: () => (
    <Group spacing="s" alignItems="center" style={{ flexWrap: 'wrap' }}>
      <Pill status="neutral" label="Draft" />
      <Pill status="informative" label="In review" />
      <Pill status="brand" label="New" />
      <Pill status="success" label="Paid" />
      <Pill status="warning" label="Pending" />
      <Pill status="critical" label="Failed" />
    </Group>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

// ─── Left and right elements ─────────────────────────────────────────────────────

/**
 * Add an icon, logo, or avatar before or after the label to add meaning. Keep it within
 * the 20px pill height.
 */
export const LeftAndRightElements: Story = {
  render: () => (
    <Group spacing="s" alignItems="center">
      <Pill status="informative" label="Info" leftElement={<Icon type="info" size="small" color="inherit" aria-hidden />} />
      <Pill status="warning" label="Action needed" rightElement={<Icon type="warning" size="small" color="inherit" aria-hidden />} />
    </Group>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

// ─── Related components ────────────────────────────────────────────────────────

export const RelatedComponentsBlock: StoryObj = {
  name: 'Related',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <RelatedComponents>
      <RelatedComponent
        name="Counter"
        url="/?path=/docs/components-data-display-counter--docs"
        preview={<Counter status="informative" number={3} />}
      />
    </RelatedComponents>
  ),
};
