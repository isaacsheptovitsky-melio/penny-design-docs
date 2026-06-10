import type { Meta, StoryObj } from '@storybook/react-vite';

import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';

import { Group } from './Group';

const themeSpaceKeys = ['none', 'xxxs', 'xxs', 'xs', 'xs-s', 's', 's-m', 'm', 'l', 'xl', 'xxl', 'xxxl'];

const Tile = ({ label }: { label: string }) => (
  <div
    style={{
      padding: '14px 18px',
      background: '#EEF2F7',
      border: '1px solid #E2E8F0',
      borderRadius: '8px',
      fontFamily: 'Poppins, sans-serif',
      fontSize: '13px',
      fontWeight: 600,
      color: '#475569',
      whiteSpace: 'nowrap',
    }}
  >
    {label}
  </div>
);

const meta: Meta<typeof Group> = {
  title: 'Components/Containers/Group',
  component: Group,
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      description: 'Layout direction.',
      table: { defaultValue: { summary: 'horizontal' }, type: { summary: "'horizontal' | 'vertical'" }, category: 'props' },
    },
    spacing: {
      control: 'select',
      options: themeSpaceKeys,
      description: 'Spacing between items (a spacing token).',
      table: { defaultValue: { summary: 's' }, type: { summary: 'ThemeSpaceKey' }, category: 'props' },
    },
    hasDivider: {
      control: 'boolean',
      description: 'Adds a divider between items.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    alignItems: {
      control: 'select',
      options: ['stretch', 'center', 'flex-start', 'flex-end', 'baseline'],
      description: 'Alignment on the secondary axis.',
      table: { defaultValue: { summary: 'stretch' }, category: 'props' },
    },
    justifyContent: {
      control: 'select',
      options: ['stretch', 'center', 'flex-start', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
      description: 'Alignment on the primary axis.',
      table: { defaultValue: { summary: 'stretch' }, category: 'props' },
    },
    allowOverflowX: {
      control: 'boolean',
      description: 'Allow content to scroll horizontally.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
  },
  args: { variant: 'horizontal', spacing: 's', hasDivider: false, alignItems: 'stretch' },
};

export default meta;
type Story = StoryObj<typeof Group>;

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    layout: 'fullscreen',
    controls: { include: ['variant', 'spacing', 'hasDivider', 'alignItems', 'justifyContent', 'allowOverflowX'] },
  },
  render: (args) => (
    <div style={{ padding: '24px' }}>
      <Group {...args}>
        <Tile label="One" />
        <Tile label="Two" />
        <Tile label="Three" />
      </Group>
    </div>
  ),
};

export const Direction: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '40px', padding: '16px 8px', fontFamily: 'Poppins, sans-serif' }}>
      <div>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#8B95A9', textTransform: 'uppercase', marginBottom: '10px' }}>
          Horizontal (default)
        </div>
        <Group variant="horizontal" spacing="s">
          <Tile label="One" />
          <Tile label="Two" />
          <Tile label="Three" />
        </Group>
      </div>
      <div>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#8B95A9', textTransform: 'uppercase', marginBottom: '10px' }}>
          Vertical
        </div>
        <Group variant="vertical" spacing="s" alignItems="flex-start">
          <Tile label="One" />
          <Tile label="Two" />
          <Tile label="Three" />
        </Group>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

export const WithDividers: Story = {
  render: () => (
    <div style={{ padding: '16px 8px' }}>
      <Group variant="horizontal" spacing="s" hasDivider alignItems="center">
        <Tile label="Profile" />
        <Tile label="Billing" />
        <Tile label="Team" />
      </Group>
    </div>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

export const HorizontalScroll: Story = {
  render: () => (
    <div style={{ maxWidth: '360px', padding: '16px 8px' }}>
      <Group variant="horizontal" spacing="s" allowOverflowX>
        {Array.from({ length: 8 }, (_, i) => (
          <Tile key={i} label={`Item ${i + 1}`} />
        ))}
      </Group>
    </div>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

export const RelatedComponentsBlock: StoryObj = {
  name: 'Related components',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <RelatedComponents>
      <RelatedComponent
        name="Container"
        url="/?path=/docs/components-containers-container--docs"
        preview={
          <Group variant="horizontal" spacing="xs">
            <Tile label="A" />
            <Tile label="B" />
          </Group>
        }
      />
    </RelatedComponents>
  ),
};
