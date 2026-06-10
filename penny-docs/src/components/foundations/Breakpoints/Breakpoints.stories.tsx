import type { Meta, StoryObj } from '@storybook/react-vite';

import { themeBreakpoints } from '@/theme/foundations/breakpoints';

const meta: Meta = {
  title: 'Foundations/Breakpoints',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

const RANGE: Record<string, string> = {
  xs: '0 – 599px',
  s: '600 – 904px',
  m: '905 – 1239px',
  l: '1240 – 1439px',
  xl: '1440px and up',
};

const LABEL: Record<string, string> = {
  xs: 'Mobile',
  s: 'Large mobile / small tablet',
  m: 'Tablet / small desktop',
  l: 'Desktop',
  xl: 'Large desktop',
};

export const BreakpointTokens: Story = {
  render: () => (
    <div style={{ fontFamily: 'Poppins, sans-serif', padding: '8px 4px' }}>
      {(Object.keys(themeBreakpoints) as (keyof typeof themeBreakpoints)[]).map((key) => (
        <div
          key={key}
          style={{
            display: 'grid',
            gridTemplateColumns: '120px 120px 1fr',
            alignItems: 'center',
            gap: '20px',
            padding: '14px 0',
            borderBottom: '1px solid #E2E8F0',
          }}
        >
          <span style={{ fontFamily: '"SFMono-Regular", Consolas, monospace', fontSize: '13px', color: '#475569' }}>
            {key}
          </span>
          <span style={{ fontSize: '13px', color: '#18191b' }}>{themeBreakpoints[key]}</span>
          <span style={{ fontSize: '13px', color: '#64748B' }}>
            {RANGE[key]} · <span style={{ color: '#94A3B8' }}>{LABEL[key]}</span>
          </span>
        </div>
      ))}
    </div>
  ),
  parameters: { docs: { canvas: { sourceState: 'none' } } },
};
