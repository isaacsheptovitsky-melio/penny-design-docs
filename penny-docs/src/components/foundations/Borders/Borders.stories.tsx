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
