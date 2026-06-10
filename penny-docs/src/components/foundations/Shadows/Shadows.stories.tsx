import type { Meta, StoryObj } from '@storybook/react-vite';

import { shadows } from '@/theme/foundations/shadows';

const meta: Meta = {
  title: 'Foundations/Shadows',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

const USE_CASE: Record<string, string> = {
  0: 'No elevation.',
  200: 'Subtle separator / hairline divider.',
  300: 'Upward elevation, e.g. sticky footers.',
  400: 'Low elevation for raised surfaces.',
  500: 'Floating elements — menus and popovers.',
  600: 'Highest elevation for prominent overlays.',
};

export const ShadowTokens: Story = {
  render: () => (
    <div
      style={{
        fontFamily: 'Poppins, sans-serif',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '28px',
        padding: '16px 8px',
        background: '#ffffff',
      }}
    >
      {([0, 200, 300, 400, 500, 600] as (keyof typeof shadows)[]).map((key) => (
        <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div
            style={{
              height: '88px',
              borderRadius: '8px',
              background: '#ffffff',
              border: '1px solid #F1F5F8',
              boxShadow: shadows[key] === 'none' ? undefined : shadows[key],
            }}
          />
          <div>
            <div style={{ fontFamily: '"SFMono-Regular", Consolas, monospace', fontSize: '12px', color: '#475569' }}>
              shadow-{key}
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', lineHeight: 1.5, marginTop: '2px' }}>{USE_CASE[key]}</div>
            <div style={{ fontSize: '10px', color: '#94A3B8', lineHeight: 1.5, marginTop: '4px', wordBreak: 'break-word' }}>
              {shadows[key]}
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: { docs: { canvas: { sourceState: 'none' } } },
};
