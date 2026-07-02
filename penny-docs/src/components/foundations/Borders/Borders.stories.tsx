import type { Meta, StoryObj } from '@storybook/react-vite';

import { defaultGlobalBorders } from '@/theme/foundations/tokens/borders/defaultGlobalBorders';

const meta: Meta = {
  title: 'Foundations/Borders',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

const USE_CASE: Record<string, string> = {
  none: 'No border.',
  25: 'The default border for actions, containers, and inputs.',
  50: 'Heavier weight — used for the focus ring.',
};

const Card = ({ selected, label }: { selected?: boolean; label: string }) => (
  <div
    style={{
      width: '180px',
      padding: '16px',
      borderRadius: '8px',
      background: '#fff',
      border: `${selected ? '2px' : '1px'} solid ${selected ? '#7849ff' : '#e4e7ec'}`,
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontFamily: 'Poppins, sans-serif',
    }}
  >
    <span
      style={{
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        flexShrink: 0,
        border: `${selected ? '2px' : '1px'} solid ${selected ? '#7849ff' : '#c7ccd6'}`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {selected ? <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7849ff' }} /> : null}
    </span>
    <span style={{ fontSize: '14px', color: '#18191b' }}>{label}</span>
  </div>
);

export const Selected: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', padding: '16px 8px' }}>
      <Card label="Default" />
      <Card label="Selected" selected />
    </div>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

export const GlobalTokens: Story = {
  render: () => (
    <div style={{ fontFamily: 'Poppins, sans-serif', padding: '8px 4px' }}>
      {(Object.keys(defaultGlobalBorders) as (keyof typeof defaultGlobalBorders)[]).map((key) => {
        const value = defaultGlobalBorders[key];
        const widthPx = parseInt(value, 10) || 0;
        return (
          <div
            key={key}
            style={{
              display: 'grid',
              gridTemplateColumns: '160px 120px 1fr',
              alignItems: 'center',
              gap: '20px',
              padding: '16px 0',
              borderBottom: '1px solid #E2E8F0',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '48px',
                borderRadius: '8px',
                background: '#fff',
                border: widthPx ? `${widthPx}px solid #18191b` : '1px dashed #CBD5E1',
              }}
            />
            <div>
              <div style={{ fontFamily: '"SFMono-Regular", Consolas, monospace', fontSize: '12px', color: '#475569' }}>
                global.{key}
              </div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>{value}</div>
            </div>
            <span style={{ fontSize: '13px', color: '#64748B' }}>{USE_CASE[key]}</span>
          </div>
        );
      })}
    </div>
  ),
  parameters: { docs: { canvas: { sourceState: 'none' } } },
};
