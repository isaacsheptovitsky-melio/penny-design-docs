import type { Meta, StoryObj } from '@storybook/react-vite';

import { themeBreakpoints } from '@/theme/foundations/breakpoints';
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';

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

const CONTAINER_VARIANTS = [
  { label: '480px', maxWidth: 480, description: 'Login and authentication screens.' },
  { label: '600px', maxWidth: 600, description: 'Default. Single-task flows — elements stacked vertically to keep focus.' },
  { label: '900px', description: 'When 600px is too narrow. Horizontal layouts, multi-column form fields.' },
  { label: '1200px', description: 'Side-by-side comparison screens (e.g. Choose a Plan).' },
  { label: '100%', description: 'Resource screens and tables that need the full viewport.' },
];

const MAX_BAR = 1200;

export const ContainerWidths: Story = {
  render: () => (
    <div style={{ fontFamily: 'Poppins, sans-serif', padding: '8px 4px' }}>
      {CONTAINER_VARIANTS.map(({ label, maxWidth, description }) => {
        const barPct = maxWidth ? `${Math.round((maxWidth / MAX_BAR) * 100)}%` : '100%';
        const isDefault = label === '600px';
        return (
          <div
            key={label}
            style={{
              display: 'grid',
              gridTemplateColumns: '72px 1fr',
              alignItems: 'center',
              gap: '20px',
              padding: '14px 0',
              borderBottom: '1px solid #E2E8F0',
            }}
          >
            <span style={{
              fontFamily: '"SFMono-Regular", Consolas, monospace',
              fontSize: '13px',
              color: '#475569',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              {label}
              {isDefault && (
                <span style={{ fontSize: '10px', background: '#F0ECFF', color: '#7849ff', borderRadius: '4px', padding: '1px 5px', fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                  default
                </span>
              )}
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ width: barPct, height: '8px', background: '#7849ff', borderRadius: '2px', minWidth: '8px' }} />
              <span style={{ fontSize: '12px', color: '#64748B' }}>{description}</span>
            </div>
          </div>
        );
      })}
    </div>
  ),
  parameters: { docs: { canvas: { sourceState: 'none' } } },
};

export const RelatedComponentsBlock: Story = {
  name: 'Related',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <RelatedComponents>
      <RelatedComponent
        name="Spaces"
        url="/?path=/docs/foundations-spaces--docs"
        preview={
          <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end' }}>
            {[4, 8, 12, 16, 24, 32].map((s) => (
              <div key={s} style={{ width: s, height: s, background: '#7849ff', borderRadius: '2px' }} />
            ))}
          </div>
        }
      />
      <RelatedComponent
        name="Split Screen"
        url="/?path=/docs/components-layouts-split-screen--docs"
        preview={
          <div style={{ width: '140px', height: '72px', border: '1px solid #E2E8F0', borderRadius: '6px', overflow: 'hidden', display: 'flex', background: '#fff' }}>
            <div style={{ flex: 1, background: '#F1F5F8', borderRight: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '4px', background: '#E2E8F0' }} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px', padding: '10px 8px', justifyContent: 'center' }}>
              <div style={{ height: '6px', width: '80%', background: '#EDF0F4', borderRadius: '3px' }} />
              <div style={{ height: '6px', width: '60%', background: '#EDF0F4', borderRadius: '3px' }} />
              <div style={{ height: '6px', width: '70%', background: '#EDF0F4', borderRadius: '3px' }} />
            </div>
          </div>
        }
      />
    </RelatedComponents>
  ),
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
