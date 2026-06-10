import type { Meta, StoryObj } from '@storybook/react-vite';

import { Icon, type IconColor, type IconProps, type IconSize } from './Icon';

const ICON_KEYS: IconProps['type'][] = [
  'add',
  'caret-down',
  'checked',
  'chevron-left',
  'chevron-right',
  'close',
  'delete',
  'edit',
  'filter',
  'info',
  'invoices',
  'more-vertical',
  'search',
  'wallet',
  'warning',
];

const meta: Meta<typeof Icon> = {
  title: 'Foundations/Icons',
  component: Icon,
  argTypes: {
    type: {
      control: 'select',
      options: ICON_KEYS,
      description: 'Which icon to render.',
      table: { type: { summary: 'IconKey' }, category: 'props' },
    },
    size: {
      control: 'inline-radio',
      options: ['extra-small', 'small', 'large'],
      description: 'Icon size — extra-small (12), small (16), large (24).',
      table: { defaultValue: { summary: 'small' }, type: { summary: "'extra-small' | 'small' | 'large'" }, category: 'props' },
    },
    color: {
      control: 'select',
      options: ['default', 'inherit', 'inverse', 'brand', 'critical', 'success', 'informative'] satisfies IconColor[],
      description: 'Semantic color of the icon.',
      table: { defaultValue: { summary: 'default' }, type: { summary: 'IconColor' }, category: 'props' },
    },
  },
  args: { type: 'search', size: 'large', color: 'default' },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'fullscreen', controls: { include: ['type', 'size', 'color'] } },
  render: (args) => {
    const inverse = args.color === 'inverse';
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          background: inverse ? '#0F0728' : 'transparent',
        }}
      >
        <Icon {...args} />
      </div>
    );
  },
};

export const Gallery: Story = {
  render: () => (
    <div
      style={{
        fontFamily: 'Poppins, sans-serif',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
        gap: '16px',
        padding: '16px 8px',
      }}
    >
      {ICON_KEYS.map((type) => (
        <div
          key={type}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            padding: '18px 8px',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
          }}
        >
          <Icon type={type} size="large" />
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
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '28px', padding: '24px 8px' }}>
      {(['extra-small', 'small', 'large'] as IconSize[]).map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <Icon type="wallet" size={size} />
          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', color: '#64748B' }}>{size}</span>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', padding: '24px 8px', alignItems: 'center', flexWrap: 'wrap' }}>
      {(['default', 'brand', 'critical', 'success', 'informative'] as IconColor[]).map((color) => (
        <div key={color} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Icon type="info" size="large" color={color} />
          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', color: '#64748B' }}>{color}</span>
        </div>
      ))}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '12px', background: '#0F0728', borderRadius: '8px' }}>
        <Icon type="info" size="large" color="inverse" />
        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', color: '#CBD5E1' }}>inverse</span>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};
