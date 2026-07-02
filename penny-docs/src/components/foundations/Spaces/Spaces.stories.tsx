import type { Meta, StoryObj } from '@storybook/react-vite';
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';

import { StatusIndicator } from '@/components/dataDisplay/StatusIndicator';
import { MeasuredGap } from '@/storybook-utils/MeasuredGap';
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

const MONO = '"SFMono-Regular", Consolas, monospace';
const TH = {
  padding: '8px 14px',
  textAlign: 'left' as const,
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.07em',
  color: '#6B7280',
};

export const SpaceTokens: Story = {
  render: () => (
    <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontFamily: 'Poppins, sans-serif', fontSize: '12px' }}>
        <thead>
          <tr style={{ background: '#EDF2F7' }}>
            <th style={{ ...TH, borderRight: '1px solid #E2E8F0' }}>Token</th>
            <th style={{ ...TH, borderRight: '1px solid #E2E8F0', width: '72px' }}>Value</th>
            <th style={TH}>Use case</th>
          </tr>
        </thead>
        <tbody>
          {(Object.keys(themeSpaces) as (keyof typeof themeSpaces)[]).map((key, i, arr) => {
            const value = themeSpaces[key];
            const px = parseInt(value, 10) || 0;
            const isLast = i === arr.length - 1;
            const border = isLast ? 'none' : '1px solid #E2E8F0';
            return (
              <tr key={key}>
                <td style={{ padding: '8px 14px', borderRight: '1px solid #E2E8F0', borderBottom: border }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: `${Math.max(px, 2)}px`, height: '12px', background: px === 0 ? '#E2E8F0' : '#7849ff', borderRadius: '2px', flexShrink: 0 }} />
                    <span style={{ fontFamily: MONO, color: '#475569' }}>spacing.{key}</span>
                  </div>
                </td>
                <td style={{ padding: '8px 14px', borderRight: '1px solid #E2E8F0', borderBottom: border, fontFamily: MONO, color: '#18191b' }}>{value}</td>
                <td style={{ padding: '8px 14px', borderBottom: border, color: '#64748B', lineHeight: 1.5 }}>{USE_CASE[key]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
      <UseCaseRow token="spacing.xxxs" value="2px" description="Divide small, related elements — e.g. a status indicator and its label.">
        <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', background: '#fff', borderRadius: '9999px', padding: '6px 14px' }}>
          <StatusIndicator status="brand" />
          <MeasuredGap size={2} orientation="horizontal" />
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#18191b' }}>Brand</span>
        </div>
      </UseCaseRow>

      <UseCaseRow token="spacing.xs" value="8px" description="Gap between small, related elements — e.g. options in a radio group.">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Radio label="Option 1" checked />
          <MeasuredGap size={8} />
          <Radio label="Option 2" />
          <MeasuredGap size={8} />
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
          <MeasuredGap size={16} />
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
          <MeasuredGap size={24} />
          <Field label="Label" />
        </div>
      </UseCaseRow>
    </div>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

export const RelatedComponentsBlock: StoryObj = {
  name: 'Related',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <RelatedComponents>
      <RelatedComponent
        name="Breakpoints"
        url="/?path=/docs/foundations-breakpoints--docs"
        preview={
          <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end' }}>
            {[
              { w: 18, label: 'xs' },
              { w: 34, label: 's' },
              { w: 50, label: 'm' },
              { w: 66, label: 'l' },
              { w: 82, label: 'xl' },
            ].map(({ w, label }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                <div style={{ width: w, height: 8, background: '#7849ff', borderRadius: '2px' }} />
                <span style={{ fontSize: '8px', color: '#94A3B8', fontFamily: 'monospace' }}>{label}</span>
              </div>
            ))}
          </div>
        }
      />
    </RelatedComponents>
  ),
};
