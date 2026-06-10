import type { Meta, StoryObj } from '@storybook/react-vite';

import { Illustration, type IllustrationType } from './Illustration';

const TYPES: IllustrationType[] = ['new-email', 'announce', 'celebration', 'error', 'approve', 'bank-success'];

const meta: Meta<typeof Illustration> = {
  title: 'Foundations/Illustrations',
  component: Illustration,
  argTypes: {
    type: {
      control: 'select',
      options: TYPES,
      description: 'Which illustration to render.',
      table: { type: { summary: TYPES.join(' | ') }, category: 'props' },
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
      description: 'Illustration size — small (96), medium (120), large (144).',
      table: { defaultValue: { summary: 'medium' }, type: { summary: "'small' | 'medium' | 'large'" }, category: 'props' },
    },
  },
  args: { type: 'new-email', size: 'medium' },
};

export default meta;
type Story = StoryObj<typeof Illustration>;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'fullscreen', controls: { include: ['type', 'size'] } },
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
      <Illustration {...args} />
    </div>
  ),
};

export const Gallery: Story = {
  render: () => (
    <div
      style={{
        fontFamily: 'Poppins, sans-serif',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '16px',
        padding: '16px 8px',
      }}
    >
      {TYPES.map((type) => (
        <div
          key={type}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            padding: '20px 8px',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
          }}
        >
          <Illustration type={type} size="small" />
          <span style={{ fontFamily: '"SFMono-Regular", Consolas, monospace', fontSize: '11px', color: '#64748B' }}>
            {type}
          </span>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '32px', padding: '24px 8px' }}>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <Illustration type="celebration" size={size} />
          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', color: '#64748B' }}>{size}</span>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};
