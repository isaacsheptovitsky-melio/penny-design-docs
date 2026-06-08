import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@/components/action/Button';
import { type ThemeBreakpointsKey } from '@/theme/foundations/breakpoints';
import { BreakpointContext } from '@/theme/providers/BreakpointProvider';

import { SplitScreen } from './SplitScreen';

const variantOptions = ['1:2', '2:1', '1:1'];

/**
 * `SplitScreen` chooses between its horizontal (side-by-side) and stacked layouts from the
 * `BreakpointProvider` context. The Storybook docs canvas is far narrower than the `l` (1240px)
 * breakpoint, so without an override every demo would render in its stacked/mobile form. These
 * wrappers force a breakpoint so each story shows the layout it's meant to document.
 */
const ForceBreakpoint = ({ value, children }: { value: ThemeBreakpointsKey; children: React.ReactNode }) => (
  <BreakpointContext.Provider value={value}>{children}</BreakpointContext.Provider>
);

/**
 * `SplitScreen` fills its parent (`height: 100%`), so every story renders it inside a
 * fixed-height, bordered stage — in a real app the page provides that container.
 */
const Stage = ({
  children,
  height = 380,
  breakpoint = 'xl',
}: {
  children: React.ReactNode;
  height?: number;
  breakpoint?: ThemeBreakpointsKey;
}) => (
  <ForceBreakpoint value={breakpoint}>
    <div style={{ height: `${height}px`, border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
      {children}
    </div>
  </ForceBreakpoint>
);

/** A tinted filler block standing in for a panel's real content. */
const PanelFill = ({ label, tone = 'a' }: { label: string; tone?: 'a' | 'b' }) => (
  <div
    style={{
      height: '100%',
      minHeight: '120px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Poppins, sans-serif',
      fontSize: '13px',
      fontWeight: 600,
      color: '#475569',
      borderRadius: '8px',
      background:
        tone === 'a'
          ? 'repeating-linear-gradient(45deg, #F8FAFC, #F8FAFC 12px, #EEF2F7 12px, #EEF2F7 24px)'
          : '#F1F5F9',
      border: '1px dashed #CBD5E1',
      boxSizing: 'border-box',
    }}
  >
    {label}
  </div>
);

const meta: Meta<typeof SplitScreen> = {
  title: 'Components/Layouts/Split Screen',
  component: SplitScreen,
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: variantOptions,
      description: 'The width ratio between panel A and panel B.',
      table: {
        category: 'props',
        type: { summary: variantOptions.map((v) => `'${v}'`).join(' | ') },
        defaultValue: { summary: "'1:2'" },
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows a single centered Loader in place of the whole layout.',
      table: { category: 'props', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    panelA: {
      control: false,
      description:
        'The left panel on large screens / top panel on small screens. Accepts `header`, `content`, `footer`, `padding`, `isLoading`, `tabIndex`, plus `minWidth` / `maxWidth` (percentages).',
      table: { category: 'props', type: { summary: 'PanelProps & { minWidth?: number; maxWidth?: number }' } },
    },
    panelB: {
      control: false,
      description: 'The right panel on large screens / bottom panel on small screens.',
      table: { category: 'props', type: { summary: 'PanelProps' } },
    },
    header: {
      control: false,
      description: 'Optional content shown above both panels, spanning the full width.',
      table: { category: 'props', type: { summary: 'ReactNode' } },
    },
    footer: {
      control: false,
      description: 'Optional content shown below both panels, spanning the full width.',
      table: { category: 'props', type: { summary: 'ReactNode' } },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { category: 'tests', type: { summary: 'string' }, defaultValue: { summary: "'split-screen'" } },
    },
  },
  args: {
    variant: '1:1',
    isLoading: false,
    panelA: { content: <PanelFill label="Panel A" tone="a" /> },
    panelB: { content: <PanelFill label="Panel B" tone="b" /> },
  },
};
export default meta;

type Story = StoryObj<typeof SplitScreen>;

export const Playground: Story = {
  name: 'Playground',
  render: (args) => (
    <Stage>
      <SplitScreen {...args} />
    </Stage>
  ),
  parameters: {
    controls: {
      include: ['variant', 'isLoading'],
    },
  },
};

export const Variants: Story = {
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'Poppins, sans-serif' }}>
      {[
        { variant: '1:1' as const, label: '1:1 — equal panels' },
        { variant: '1:2' as const, label: '1:2 — narrow left, wide right (default)' },
        { variant: '2:1' as const, label: '2:1 — wide left, narrow right' },
      ].map(({ variant, label }) => (
        <div key={variant}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              color: '#8B95A9',
              marginBottom: '8px',
            }}
          >
            {label}
          </div>
          <Stage height={200}>
            <SplitScreen
              variant={variant}
              panelA={{ content: <PanelFill label={`Panel A (${variant.split(':')[0]})`} tone="a" /> }}
              panelB={{ content: <PanelFill label={`Panel B (${variant.split(':')[1]})`} tone="b" /> }}
            />
          </Stage>
        </div>
      ))}
    </div>
  ),
};

export const CommonUse: Story = {
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <Stage height={420}>
      <SplitScreen
        variant="1:1"
        panelA={{
          content: (
            <div
              style={{
                height: '100%',
                minHeight: '320px',
                borderRadius: '8px',
                background: '#F1F5F9',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '13px',
                fontWeight: 600,
                color: '#64748B',
              }}
            >
              Invoice preview
            </div>
          ),
        }}
        panelB={{
          content: (
            <div style={{ fontFamily: 'Poppins, sans-serif', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#18191b' }}>Invoice from Acme Corp</div>
              <div style={{ fontSize: '14px', color: '#64748B' }}>$2,200.00 · Due Jun 30, 2026</div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <Button label="Pay invoice" variant="primary" />
                <Button label="Download" variant="tertiary" />
              </div>
            </div>
          ),
        }}
      />
    </Stage>
  ),
};

export const LoadingState: Story = {
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <Stage height={300}>
      <SplitScreen
        isLoading
        panelA={{ content: <PanelFill label="Panel A" tone="a" /> }}
        panelB={{ content: <PanelFill label="Panel B" tone="b" /> }}
      />
    </Stage>
  ),
};

export const MobileStacking: Story = {
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div style={{ maxWidth: '380px', margin: '0 auto' }}>
      <Stage height={420} breakpoint="xs">
        <SplitScreen
          variant="1:1"
          panelA={{ content: <PanelFill label="Panel A (top)" tone="a" /> }}
          panelB={{ content: <PanelFill label="Panel B (bottom)" tone="b" /> }}
        />
      </Stage>
    </div>
  ),
};
