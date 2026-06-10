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

const Specimen = ({ items }: { items: [string, string][] }) => (
  <div style={{ fontFamily: 'Poppins, sans-serif', padding: '8px 4px' }}>
    {items.map(([key, label]) => {
      const t = (textStyles as Record<string, { fontSize?: Size; lineHeight?: Size; fontWeight?: unknown }>)[key] ?? {};
      const dSize = desktop(t.fontSize);
      const dLh = desktop(t.lineHeight);
      const responsive =
        t.fontSize && typeof t.fontSize === 'object' && (t.fontSize.xs ?? '') !== (t.fontSize.s ?? '');
      return (
        <div
          key={key}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 280px',
            alignItems: 'baseline',
            gap: '24px',
            padding: '16px 0',
            borderBottom: '1px solid #E2E8F0',
          }}
        >
          <Text textStyle={key} as="div">
            {label}
          </Text>
          <div style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.7 }}>
            <div style={{ fontFamily: '"SFMono-Regular", Consolas, monospace', color: '#475569' }}>{key}</div>
            <div>
              {dSize}/{dLh} · {weightLabel(t.fontWeight)}
            </div>
            {responsive ? (
              <div>
                mobile {mobile(t.fontSize)}/{mobile(t.lineHeight)}
              </div>
            ) : null}
          </div>
        </div>
      );
    })}
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
