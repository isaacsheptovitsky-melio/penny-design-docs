import type { Meta, StoryObj } from '@storybook/react-vite';

import { Group } from '@/components/containers/Group';
import { Pill } from '@/components/dataDisplay/Pill';
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';

import { Counter } from './Counter';
import type { CounterStatus } from './Counter.types';

const statuses: readonly CounterStatus[] = ['neutral', 'informative', 'brand', 'success', 'warning', 'critical'];

const meta: Meta<typeof Counter> = {
  title: 'Components/Data Display/Counter',
  component: Counter,
  argTypes: {
    number: {
      control: { type: 'number', min: 0 },
      description: 'The value to display. Values above 99 render as `+99`.',
      table: { type: { summary: 'number' }, category: 'props' },
    },
    status: {
      control: 'select',
      options: statuses,
      description: 'The semantic color of the counter.',
      table: { defaultValue: { summary: 'neutral' }, type: { summary: statuses.join(' | ') }, category: 'props' },
    },
  },
  args: {
    number: 4,
    status: 'neutral',
  },
};

export default meta;
type Story = StoryObj<typeof Counter>;

// ─── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: { controls: { include: ['number', 'status'] } },
  render: (args) => (
    <div style={{ padding: '24px' }}>
      <Counter {...args} />
    </div>
  ),
};

// ─── Statuses ──────────────────────────────────────────────────────────────────

/**
 * Six semantic statuses. Choose the color that matches the meaning of the count in context.
 */
export const Statuses: Story = {
  render: () => (
    <Group spacing="m" alignItems="center">
      {statuses.map((status) => (
        <Group key={status} variant="vertical" spacing="xs" alignItems="center">
          <Counter status={status} number={4} />
          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', color: '#64748B' }}>{status}</span>
        </Group>
      ))}
    </Group>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

// ─── Large number ──────────────────────────────────────────────────────────────

/**
 * Values above 99 are clamped to `+99` so the counter keeps a consistent size.
 */
export const LargeNumber: Story = {
  render: () => (
    <Group spacing="m" alignItems="center">
      <Counter status="informative" number={4} />
      <Counter status="informative" number={42} />
      <Counter status="informative" number={99} />
      <Counter status="informative" number={150} />
    </Group>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

// ─── Related components ────────────────────────────────────────────────────────

export const RelatedComponentsBlock: StoryObj = {
  name: 'Related components',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <RelatedComponents>
      <RelatedComponent
        name="Pill"
        url="/?path=/docs/components-data-display-pill--docs"
        preview={<Pill status="neutral" label="Archived" />}
      />
    </RelatedComponents>
  ),
};
