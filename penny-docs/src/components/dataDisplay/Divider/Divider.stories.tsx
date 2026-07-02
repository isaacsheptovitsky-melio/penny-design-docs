import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@/components/action/Button';
import { Group } from '@/components/containers/Group';
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';

import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Data Display/Divider',
  component: Divider,
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the divider.',
      table: { defaultValue: { summary: 'horizontal' }, type: { summary: "'horizontal' | 'vertical'" }, category: 'props' },
    },
    label: {
      control: 'text',
      description: 'Optional text embedded in the divider. Rendered only for the `horizontal` variant.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    as: {
      control: false,
      description: 'The element the divider renders as.',
      table: { defaultValue: { summary: 'div' }, type: { summary: 'ElementType' }, category: 'props' },
    },
    role: {
      control: false,
      description: 'The semantic role of the element (e.g. `separator`).',
      table: { type: { summary: 'AriaRole' }, category: 'accessibility' },
    },
  },
  args: {
    variant: 'horizontal',
    label: '',
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

// ─── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: { controls: { include: ['variant', 'label'] } },
  render: (args) =>
    args.variant === 'vertical' ? (
      <div style={{ height: '64px', display: 'flex', alignItems: 'center', padding: '0 24px' }}>
        <Divider {...args} />
      </div>
    ) : (
      <div style={{ width: '420px', maxWidth: '100%', padding: '0 24px' }}>
        <Divider {...args} />
      </div>
    ),
};

// ─── Horizontal ──────────────────────────────────────────────────────────────

/**
 * The default. A full-width line that separates stacked sections of content.
 */
export const Horizontal: Story = {
  render: () => (
    <div style={{ width: '420px', maxWidth: '100%', fontFamily: 'Poppins, sans-serif' }}>
      <Group variant="vertical" spacing="m" alignItems="stretch">
        <span style={{ fontSize: '13px', color: '#475569' }}>Vendor details</span>
        <Divider />
        <span style={{ fontSize: '13px', color: '#475569' }}>Payment method</span>
      </Group>
    </div>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

// ─── With label ────────────────────────────────────────────────────────────────

/**
 * Embed short text — such as "Or" — to divide a group of options.
 */
export const WithLabel: Story = {
  render: () => (
    <div style={{ width: '320px', maxWidth: '100%', fontFamily: 'Poppins, sans-serif' }}>
      <Group variant="vertical" spacing="m" alignItems="stretch">
        <Button label="Continue with Google" variant="tertiary" isFullWidth />
        <Divider label="Or" />
        <Button label="Continue with email" variant="primary" isFullWidth />
      </Group>
    </div>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

// ─── Vertical ──────────────────────────────────────────────────────────────────

/**
 * An upright line that separates inline elements, such as items in a horizontal summary bar.
 */
export const Vertical: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        height: '40px',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '13px',
        color: '#475569',
      }}
    >
      <span>3 invoices</span>
      <Divider variant="vertical" />
      <span>$1,240 total</span>
      <Divider variant="vertical" />
      <span>Due May 2</span>
    </div>
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
        name="Group"
        url="/?path=/docs/components-containers-group--docs"
        preview={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#475569' }}>
            <span>A</span>
            <Divider variant="vertical" />
            <span>B</span>
          </div>
        }
      />
    </RelatedComponents>
  ),
};
