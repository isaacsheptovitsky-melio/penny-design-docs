import type { Meta, StoryObj } from '@storybook/react-vite';

import { Group } from '@/components/containers/Group';
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

const UseCaseRow = ({ token, value, description, children }: { token: string; value: string; description: string; children: React.ReactNode }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 280px',
      gap: '32px',
      alignItems: 'center',
      padding: '24px 0',
      borderBottom: '1px solid #E2E8F0',
    }}
  >
    <div style={{ background: '#F8F9FA', borderRadius: '8px', padding: '24px', display: 'flex', justifyContent: 'center' }}>
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
        <div style={{ display: 'inline-flex', alignItems: 'center', background: '#f1f5f8', borderRadius: '9999px', padding: '6px 14px' }}>
          <Group variant="horizontal" spacing="xxs" alignItems="center">
            <StatusIndicator status="brand" />
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#18191b' }}>Brand</span>
          </Group>
        </div>
      </UseCaseRow>

      <UseCaseRow token="spacing.xs" value="8px" description="Gap between small, related elements — e.g. options in a radio group.">
        <Group variant="vertical" spacing="xs" alignItems="flex-start">
          <Radio label="Option 1" checked />
          <Radio label="Option 2" />
          <Radio label="Option 3" />
        </Group>
      </UseCaseRow>

      <UseCaseRow token="spacing.s" value="16px" description="Gap between medium-sized elements — e.g. stacked Section Banners.">
        <div style={{ width: '320px', maxWidth: '100%' }}>
          <Group variant="vertical" spacing="s" alignItems="stretch">
            <SectionBannerRoot variant="success" isCompact>
              <SectionBannerIcon />
              <SectionBannerContent>
                <SectionBannerTitle>Payment scheduled</SectionBannerTitle>
              </SectionBannerContent>
            </SectionBannerRoot>
            <SectionBannerRoot variant="informative" isCompact>
              <SectionBannerIcon />
              <SectionBannerContent>
                <SectionBannerTitle>Vendor updated</SectionBannerTitle>
              </SectionBannerContent>
            </SectionBannerRoot>
          </Group>
        </div>
      </UseCaseRow>

      <UseCaseRow token="spacing.m" value="24px" description="Gap between form fields.">
        <div style={{ width: '320px', maxWidth: '100%' }}>
          <Group variant="vertical" spacing="m" alignItems="stretch">
            <Field label="Label" />
            <Field label="Label" />
          </Group>
        </div>
      </UseCaseRow>
    </div>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};
