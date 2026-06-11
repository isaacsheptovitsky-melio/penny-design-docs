import type { Meta, StoryObj } from '@storybook/react-vite';

import { StatusIndicator } from '@/components/dataDisplay/StatusIndicator';
import {
  SectionBannerContent,
  SectionBannerIcon,
  SectionBannerRoot,
  SectionBannerTitle,
} from '@/components/dataDisplay/SectionBanner';
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

// ─── Use cases ─────────────────────────────────────────────────────────────────

const Radio = ({ label, checked }: { label: string; checked?: boolean }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#18191b' }}>
    <span
      style={{
        width: '18px',
        height: '18px',
        borderRadius: '50%',
        flexShrink: 0,
        border: `1px solid ${checked ? '#7849ff' : '#c7ccd6'}`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {checked ? <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#7849ff' }} /> : null}
    </span>
    {label}
  </div>
);

const Field = ({ label }: { label: string }) => (
  <div>
    <div style={{ fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>{label}</div>
    <div style={{ height: '40px', border: '1px solid #e4e7ec', borderRadius: '8px', background: '#fff' }} />
  </div>
);

// ── Spacing dimension annotation ───────────────────────────────────────────────
const RULE = '#D80E25';
const MONO_LABEL: React.CSSProperties = {
  fontFamily: '"SFMono-Regular", Consolas, monospace',
  fontSize: '10px',
  color: RULE,
  whiteSpace: 'nowrap',
  lineHeight: 1,
};

/**
 * A vertical gap of exactly `px`. A dimension bracket (vertical line with top/bottom ticks)
 * spans the real gap height in the left gutter, with the measurement beside it — so it indicates
 * the spacing *between* the elements rather than just labelling a row.
 */
const VGap = ({ px }: { px: number }) => (
  <div style={{ position: 'relative', height: `${px}px` }}>
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 'calc(100% + 10px)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        pointerEvents: 'none',
      }}
    >
      <span style={MONO_LABEL}>{px}px</span>
      {/* dimension bracket: vertical line spanning the gap + a tick at each end */}
      <div style={{ position: 'relative', width: '5px', alignSelf: 'stretch' }}>
        <div style={{ position: 'absolute', left: '2px', top: 0, bottom: 0, width: '1px', background: RULE }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '1px', background: RULE }} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '1px', background: RULE }} />
      </div>
    </div>
  </div>
);

const UseCaseRow = ({ token, value, description, children }: { token: string; value: string; description: string; children: React.ReactNode }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 260px',
      gap: '24px',
      alignItems: 'center',
      padding: '24px 0',
      borderBottom: '1px solid #E2E8F0',
    }}
  >
    <div style={{ background: '#F8F9FA', borderRadius: '8px', padding: '24px 28px 24px 64px', display: 'flex', justifyContent: 'flex-start' }}>
      {children}
    </div>
    <div>
      <div style={{ fontFamily: '"SFMono-Regular", Consolas, monospace', fontSize: '13px', color: '#475569' }}>
        {token} <span style={{ color: '#94A3B8' }}>({value})</span>
      </div>
      <div style={{ fontSize: '13px', color: '#64748B', marginTop: '4px', lineHeight: 1.6 }}>{description}</div>
    </div>
  </div>
);

export const UseCases: Story = {
  render: () => (
    <div style={{ fontFamily: 'Poppins, sans-serif', padding: '4px' }}>
      <UseCaseRow token="spacing.xxs" value="4px" description="Divide small, related elements — e.g. a status indicator and its label.">
        {/* The 4px gap sits inside the pill; the annotation points to it from below. */}
        <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', background: '#f1f5f8', borderRadius: '9999px', padding: '6px 14px' }}>
          <StatusIndicator status="brand" />
          <span style={{ position: 'relative', display: 'inline-block', width: '4px', alignSelf: 'stretch' }}>
            <span
              style={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                pointerEvents: 'none',
              }}
            >
              {/* horizontal dimension bracket spanning the 4px gap */}
              <span style={{ position: 'relative', display: 'block', width: '4px', height: '5px' }}>
                <span style={{ position: 'absolute', top: '2px', left: 0, right: 0, height: '1px', background: RULE }} />
                <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '1px', background: RULE }} />
                <span style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '1px', background: RULE }} />
              </span>
              <span style={MONO_LABEL}>4px</span>
            </span>
          </span>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#18191b' }}>Brand</span>
        </div>
      </UseCaseRow>

      <UseCaseRow token="spacing.xs" value="8px" description="Gap between small, related elements — e.g. options in a radio group.">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Radio label="Option 1" checked />
          <VGap px={8} />
          <Radio label="Option 2" />
          <VGap px={8} />
          <Radio label="Option 3" />
        </div>
      </UseCaseRow>

      <UseCaseRow token="spacing.s" value="16px" description="Gap between medium-sized elements — e.g. stacked Section Banners.">
        <div style={{ width: '280px' }}>
          <SectionBannerRoot variant="success" isCompact>
            <SectionBannerIcon />
            <SectionBannerContent>
              <SectionBannerTitle>Payment scheduled</SectionBannerTitle>
            </SectionBannerContent>
          </SectionBannerRoot>
          <VGap px={16} />
          <SectionBannerRoot variant="informative" isCompact>
            <SectionBannerIcon />
            <SectionBannerContent>
              <SectionBannerTitle>Vendor updated</SectionBannerTitle>
            </SectionBannerContent>
          </SectionBannerRoot>
        </div>
      </UseCaseRow>

      <UseCaseRow token="spacing.m" value="24px" description="Gap between form fields.">
        <div style={{ width: '280px' }}>
          <Field label="Label" />
          <VGap px={24} />
          <Field label="Label" />
        </div>
      </UseCaseRow>
    </div>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};
