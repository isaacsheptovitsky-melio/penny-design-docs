import type { Meta, StoryObj } from '@storybook/react-vite';

import { Text } from '@/components/dataDisplay/Text';
import { textStyles } from '@/theme/foundations/text-styles';

const meta: Meta = {
  title: 'Foundations/Typography',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

type Size = string | number | { xs?: string | number; s?: string | number } | undefined;

const desktop = (v: Size) => (v && typeof v === 'object' ? String(v.s ?? v.xs ?? '') : v != null ? String(v) : '');
const mobile = (v: Size) => (v && typeof v === 'object' ? String(v.xs ?? v.s ?? '') : v != null ? String(v) : '');

const weightLabel = (w: unknown) => (w === 600 ? 'SemiBold 600' : w === 400 ? 'Regular 400' : String(w));

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

const Specimen = ({ items }: { items: [string, string][] }) => (
  <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
    <table style={{ borderCollapse: 'collapse', width: '100%', fontFamily: 'Poppins, sans-serif', fontSize: '12px' }}>
      <thead>
        <tr style={{ background: '#EDF2F7' }}>
          <th style={{ ...TH, borderRight: '1px solid #E2E8F0' }}>Style</th>
          <th style={{ ...TH, borderRight: '1px solid #E2E8F0', width: '150px' }}>Token</th>
          <th style={{ ...TH, borderRight: '1px solid #E2E8F0', width: '130px' }}>Size / Line height</th>
          <th style={{ ...TH, width: '120px' }}>Weight</th>
        </tr>
      </thead>
      <tbody>
        {items.map(([key, label], i, arr) => {
          const t = (textStyles as Record<string, { fontSize?: Size; lineHeight?: Size; fontWeight?: unknown }>)[key] ?? {};
          const dSize = desktop(t.fontSize);
          const dLh = desktop(t.lineHeight);
          const responsive =
            t.fontSize && typeof t.fontSize === 'object' && (t.fontSize.xs ?? '') !== (t.fontSize.s ?? '');
          const isLast = i === arr.length - 1;
          const border = isLast ? 'none' : '1px solid #E2E8F0';
          return (
            <tr key={key}>
              <td style={{ padding: '12px 14px', borderRight: '1px solid #E2E8F0', borderBottom: border }}>
                <Text textStyle={key} as="div" color="#18191b">{label}</Text>
              </td>
              <td style={{ padding: '12px 14px', borderRight: '1px solid #E2E8F0', borderBottom: border, fontFamily: MONO, color: '#475569', verticalAlign: 'middle' }}>{key}</td>
              <td style={{ padding: '12px 14px', borderRight: '1px solid #E2E8F0', borderBottom: border, color: '#18191b', verticalAlign: 'middle' }}>
                <div>{dSize} / {dLh}</div>
                {responsive ? (
                  <div style={{ color: '#94A3B8', fontSize: '11px', marginTop: '2px' }}>
                    mobile {mobile(t.fontSize)} / {mobile(t.lineHeight)}
                  </div>
                ) : null}
              </td>
              <td style={{ padding: '12px 14px', borderBottom: border, color: '#18191b', verticalAlign: 'middle' }}>{weightLabel(t.fontWeight)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

// ─── Font family ─────────────────────────────────────────────────────────────

export const FontFamily: Story = {
  render: () => (
    <div style={{ fontFamily: 'Poppins, sans-serif', padding: '8px 4px', color: '#18191b' }}>
      <div style={{ fontSize: '15px', fontWeight: 400, marginBottom: '4px' }}>Poppins · Regular (400)</div>
      <div style={{ fontSize: '34px', fontWeight: 400, marginBottom: '20px' }}>AaBbCcDdEe 0123456789</div>
      <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>Poppins · SemiBold (600)</div>
      <div style={{ fontSize: '34px', fontWeight: 600 }}>AaBbCcDdEe 0123456789</div>
    </div>
  ),
  parameters: { docs: { canvas: { sourceState: 'none' } } },
};

// ─── Display & headings ────────────────────────────────────────────────────────

export const DisplayAndHeadings: Story = {
  render: () => (
    <Specimen
      items={[
        ['display1Semi', 'Display 1 Semi'],
        ['display2Semi', 'Display 2 Semi'],
        ['display2', 'Display 2'],
        ['heading1Semi', 'Heading 1 Semi'],
        ['heading2Semi', 'Heading 2 Semi'],
        ['heading2', 'Heading 2'],
        ['heading3Semi', 'Heading 3 Semi'],
      ]}
    />
  ),
  parameters: { docs: { canvas: { sourceState: 'none' } } },
};

// ─── Metrics ───────────────────────────────────────────────────────────────────

export const Metrics: Story = {
  render: () => (
    <Specimen
      items={[
        ['metric1Semi', 'Metric 1 Semi'],
        ['metric2Semi', 'Metric 2 Semi'],
      ]}
    />
  ),
  parameters: { docs: { canvas: { sourceState: 'none' } } },
};

// ─── Body ──────────────────────────────────────────────────────────────────────

export const Body: Story = {
  render: () => (
    <Specimen
      items={[
        ['body1Semi', 'Body 1 Semi'],
        ['body1', 'Body 1'],
        ['body2Semi', 'Body 2 Semi'],
        ['body2', 'Body 2'],
        ['body3Semi', 'Body 3 Semi'],
        ['body3', 'Body 3'],
        ['body4Semi', 'Body 4 Semi'],
        ['body4', 'Body 4'],
        ['body4SemiUpper', 'Body 4 Semi Upper'],
        ['body5SemiUpper', 'Body 5 Semi Upper'],
      ]}
    />
  ),
  parameters: { docs: { canvas: { sourceState: 'none' } } },
};

// ─── Captions ────────────────────────────────────────────────────────────────

export const Captions: Story = {
  render: () => (
    <Specimen
      items={[
        ['caption1Semi', 'Caption 1 Semi'],
        ['caption1', 'Caption 1'],
        ['caption1SemiUpper', 'Caption 1 Semi Upper'],
        ['caption2Semi', 'Caption 2 Semi'],
      ]}
    />
  ),
  parameters: { docs: { canvas: { sourceState: 'none' } } },
};
