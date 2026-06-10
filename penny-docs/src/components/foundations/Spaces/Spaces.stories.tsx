import type { Meta, StoryObj } from '@storybook/react-vite';

import { themeSpaces } from '@/theme/foundations/spaces';

const meta: Meta = {
  title: 'Foundations/Spaces',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

const USE_CASE: Record<string, string> = {
  none: 'Reset spacing or eliminate gaps.',
  xxxs: 'Divide small elements, e.g. a status indicator and its label.',
  xxs: 'Small, related elements within a component (e.g. Pill).',
  xs: 'Gaps between form elements, icons, and labels; padding for Tooltips and Pills.',
  'xs-s': 'Vertical padding for smaller components such as Inputs.',
  s: 'Standard padding for medium components (Calendar, Tabs, Section Banner) and gaps between them.',
  's-m': '—',
  m: 'Padding for Modal and Card; spacing between form fields.',
  l: 'Padding for the Drawer, or larger spacing between major sections.',
  xl: 'Padding for Container components or outer layout margins.',
  xxl: 'Separating large content blocks or generous page margins.',
  xxxl: '—',
};

export const SpaceTokens: Story = {
  render: () => (
    <div style={{ fontFamily: 'Poppins, sans-serif', padding: '8px 4px' }}>
      {(Object.keys(themeSpaces) as (keyof typeof themeSpaces)[]).map((key) => {
        const value = themeSpaces[key];
        const px = parseInt(value, 10) || 0;
        return (
          <div
            key={key}
            style={{
              display: 'grid',
              gridTemplateColumns: '180px 64px 1fr',
              alignItems: 'center',
              gap: '20px',
              padding: '12px 0',
              borderBottom: '1px solid #E2E8F0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: `${px}px`, height: '16px', background: '#7849ff', borderRadius: '2px', flexShrink: 0 }} />
              <span style={{ fontFamily: '"SFMono-Regular", Consolas, monospace', fontSize: '12px', color: '#475569' }}>
                {key}
              </span>
            </div>
            <span style={{ fontSize: '13px', color: '#18191b' }}>{value}</span>
            <span style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.5 }}>{USE_CASE[key]}</span>
          </div>
        );
      })}
    </div>
  ),
  parameters: { docs: { canvas: { sourceState: 'none' } } },
};
