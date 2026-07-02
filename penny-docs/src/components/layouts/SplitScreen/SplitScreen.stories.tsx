import type { Meta, StoryObj } from '@storybook/react-vite';
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';

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

// ─── Related components ──────────────────────────────────────

export const RelatedComponentsBlock: StoryObj = {
  name: 'Related',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <RelatedComponents>
      <RelatedComponent
        name="Layout"
        url="/?path=/docs/components-layouts-layout--docs"
        preview={(
        <div style={{ width: '140px', height: '92px', border: '1px solid #E2E8F0', borderRadius: '6px', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          <div style={{ height: '16px', background: '#7849ff' }} />
          <div style={{ flex: 1, display: 'flex' }}>
            <div style={{ width: '34px', background: '#F1F5F8', borderRight: '1px solid #E2E8F0' }} />
            <div style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div style={{ height: '7px', width: '70%', background: '#EDF0F4', borderRadius: '3px' }} />
              <div style={{ height: '7px', width: '90%', background: '#EDF0F4', borderRadius: '3px' }} />
              <div style={{ height: '7px', width: '55%', background: '#EDF0F4', borderRadius: '3px' }} />
            </div>
          </div>
        </div>
      )}
      />
      <RelatedComponent
        name="Breakpoints"
        url="/?path=/docs/foundations-breakpoints--docs"
        preview={
          <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end' }}>
            {[18, 34, 50, 66, 82].map((w, i) => (
              <div key={i} style={{ width: w, height: 8, background: '#7849ff', borderRadius: '2px' }} />
            ))}
          </div>
        }
      />
      <RelatedComponent
        name="External Layout"
        url="/?path=/docs/components-layouts-external-layout--docs"
        preview={(
        <div style={{ width: '140px', height: '92px', border: '1px solid #E2E8F0', borderRadius: '6px', overflow: 'hidden', background: '#F1F5F8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '80px', height: '60px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '5px', padding: '8px', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '22px', height: '10px', borderRadius: '3px', background: '#7849ff' }} />
            <div style={{ height: '6px', width: '80%', background: '#EDF0F4', borderRadius: '3px' }} />
            <div style={{ height: '6px', width: '60%', background: '#EDF0F4', borderRadius: '3px' }} />
          </div>
        </div>
      )}
      />
    </RelatedComponents>
  ),
};
