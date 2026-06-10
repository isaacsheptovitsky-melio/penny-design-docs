import type { Meta, StoryObj } from '@storybook/react-vite';

import { defaultGlobalBorderRadii } from '@/theme/foundations/tokens/radii/defaultGlobalBorderRadii';

const meta: Meta = {
  title: 'Foundations/Border Radius',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const GlobalTokens: Story = {
  render: () => (
    <div
      style={{
        fontFamily: 'Poppins, sans-serif',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '24px',
        padding: '16px 8px',
      }}
    >
      {(Object.keys(defaultGlobalBorderRadii) as (keyof typeof defaultGlobalBorderRadii)[]).map((key) => {
        const value = defaultGlobalBorderRadii[key];
        return (
          <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '100%',
                height: '72px',
                background: '#f6f2fd',
                border: '1px solid #7849ff',
                borderRadius: value === 'full' ? '9999px' : value,
              }}
            />
            <div>
              <div style={{ fontFamily: '"SFMono-Regular", Consolas, monospace', fontSize: '12px', color: '#475569' }}>
                border-radius.{key}
              </div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>{value}</div>
            </div>
          </div>
        );
      })}
    </div>
  ),
  parameters: { docs: { canvas: { sourceState: 'none' } } },
};
