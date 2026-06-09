import type { Meta, StoryObj } from '@storybook/react-vite';
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';

import { Layout } from './Layout';

const maxWidthOptions = ['full', '1600px', '1200px', '900px', '800px', '600px', '480px'];
const backgroundColors = ['default', 'white', 'lightest'];

const sectionType = `{
  content: ReactElement;
  isSticky?: boolean;
}`;

/**
 * `Layout` fills its parent (`height: 100%`), so every story renders it inside a
 * fixed-height, bordered, scrollable stage — in a real app the page itself provides
 * that container. The stage is not part of the component.
 */
const Stage = ({ children, height = 460 }: { children: React.ReactNode; height?: number }) => (
  <div style={{ height: `${height}px`, border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
    {children}
  </div>
);

/** A labelled filler block standing in for real header / content / footer slots. */
const Placeholder = ({
  label,
  height,
  tone = 'content',
}: {
  label: string;
  height: number | string;
  tone?: 'content' | 'bar';
}) => (
  <div
    style={{
      height: typeof height === 'number' ? `${height}px` : height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Poppins, sans-serif',
      fontSize: '13px',
      fontWeight: 600,
      color: tone === 'bar' ? '#475569' : '#64748B',
      background:
        tone === 'bar'
          ? '#EEF2F7'
          : 'repeating-linear-gradient(45deg, #F8FAFC, #F8FAFC 12px, #EEF2F7 12px, #EEF2F7 24px)',
      border: tone === 'bar' ? '1px solid #E2E8F0' : '1px dashed #CBD5E1',
      borderRadius: tone === 'bar' ? 0 : '8px',
      boxSizing: 'border-box',
    }}
  >
    {label}
  </div>
);

const defaultHeader = { isSticky: false, content: <Placeholder label="Header" height={64} tone="bar" /> };
const defaultFooter = { isSticky: false, content: <Placeholder label="Footer" height={64} tone="bar" /> };

const meta: Meta<typeof Layout> = {
  title: 'Components/Layouts/Layout',
  component: Layout,
  argTypes: {
    maxWidth: {
      control: 'select',
      options: maxWidthOptions,
      description: 'The maximum width of the centered content area.',
      table: {
        category: 'props',
        type: { summary: `${maxWidthOptions.map((o) => `'${o}'`).join(' | ')} | number` },
        defaultValue: { summary: "'1600px'" },
      },
    },
    backgroundColor: {
      control: 'select',
      options: backgroundColors,
      description: 'The background color of the content area.',
      table: {
        category: 'props',
        type: { summary: backgroundColors.map((c) => `'${c}'`).join(' | ') },
        defaultValue: { summary: "'default'" },
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows a centered Loader over the content area and blocks interaction until loading completes.',
      table: { category: 'props', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    paddingContent: {
      control: 'text',
      description: "Overrides the content area's default responsive padding.",
      table: {
        category: 'props',
        type: { summary: 'SpacingValue', detail: 'A string built from SpaceKey tokens, e.g. "m" or "xxl"' },
      },
    },
    header: {
      control: false,
      description: 'The header slot. Can be made `isSticky` to stay pinned while the content scrolls.',
      table: { category: 'props', type: { summary: sectionType } },
    },
    footer: {
      control: false,
      description: 'The footer slot. Can also be made `isSticky`.',
      table: { category: 'props', type: { summary: sectionType } },
    },
    children: {
      control: false,
      description: "The layout's main content.",
      table: { category: 'props', type: { summary: 'ReactNode' } },
    },
    tabIndex: {
      control: 'number',
      description: 'Sets the tab index of the scrollable content, needed for keyboard accessibility.',
      table: { category: 'props', type: { summary: 'number' } },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { category: 'tests', type: { summary: 'string' }, defaultValue: { summary: "'layout'" } },
    },
  },
  args: {
    maxWidth: '600px',
    backgroundColor: 'default',
    isLoading: false,
    header: defaultHeader,
    footer: defaultFooter,
    children: <Placeholder label="Content" height={360} />,
    tabIndex: 0,
    'data-testid': 'layout',
  },
};
export default meta;

type Story = StoryObj<typeof Layout>;

export const Playground: Story = {
  name: 'Playground',
  render: (args) => (
    <Stage height={560}>
      <Layout {...args} />
    </Stage>
  ),
  parameters: {
    controls: {
      include: ['maxWidth', 'backgroundColor', 'isLoading', 'paddingContent'],
    },
  },
};

/**
 * The fixed widths can't be shown at 1:1 — `1600px` alone would overflow the docs canvas, and
 * `full` would be indistinguishable from it. Instead each variant is drawn as a centered bar
 * scaled proportionally (relative to `1600px`) inside a track that stands in for the container,
 * so the relative sizing — and the always-centered content area — reads at a glance.
 */
const maxWidthScale: { width: string; note?: string }[] = [
  { width: 'full', note: 'spans the whole container' },
  { width: '1600px', note: 'widest — expansive dashboards' },
  { width: '1200px', note: 'dense, data-heavy pages' },
  { width: '900px' },
  { width: '800px' },
  { width: '600px', note: 'focused, single-task pages' },
  { width: '480px', note: 'narrowest — compact forms' },
];

const scalePercent = (width: string) => (width === 'full' ? 100 : (parseInt(width, 10) / 1600) * 90);

export const MaxWidth: Story = {
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div
      style={{
        fontFamily: 'Poppins, sans-serif',
        background: '#F7FAFC',
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {maxWidthScale.map(({ width, note }) => {
        const isFull = width === 'full';
        return (
          <div key={width} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{ width: '56px', flexShrink: 0, textAlign: 'right', fontSize: '12px', fontWeight: 700, color: '#475569' }}
            >
              {width}
            </div>
            <div
              style={{
                flex: 1,
                height: '32px',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${scalePercent(width)}%`,
                  height: '100%',
                  background: isFull ? '#7849ff' : '#C4B5FD',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {note && (
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: isFull ? '#FFFFFF' : '#4C1D95',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      padding: '0 8px',
                    }}
                  >
                    {note}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ),
};

export const Structure: Story = {
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <Stage height={420}>
      <Layout
        maxWidth="600px"
        backgroundColor="lightest"
        header={{ isSticky: false, content: <Placeholder label="Header" height={56} tone="bar" /> }}
        footer={{ isSticky: false, content: <Placeholder label="Footer" height={56} tone="bar" /> }}
        tabIndex={0}
      >
        <Placeholder label="Content — the area constrained by maxWidth" height={260} />
      </Layout>
    </Stage>
  ),
};

export const BackgroundColor: Story = {
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'Poppins, sans-serif' }}>
      {[
        { color: 'default' as const, label: 'default — the standard off-white page background' },
        { color: 'white' as const, label: 'white — a pure white surface' },
        { color: 'lightest' as const, label: 'lightest — a light gray for subtle section separation' },
      ].map(({ color, label }) => (
        <div key={color}>
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
          <Stage height={140}>
            <Layout maxWidth="full" backgroundColor={color} paddingContent="m" tabIndex={0}>
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#475569',
                }}
              >
                backgroundColor="{color}"
              </div>
            </Layout>
          </Stage>
        </div>
      ))}
    </div>
  ),
};

export const StickyHeaderAndFooter: Story = {
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <Stage height={420}>
      <Layout
        maxWidth="600px"
        header={{ isSticky: true, content: <Placeholder label="Sticky header" height={64} tone="bar" /> }}
        footer={{ isSticky: true, content: <Placeholder label="Sticky footer" height={64} tone="bar" /> }}
        tabIndex={0}
      >
        <Placeholder label="Scroll the content — the header and footer stay pinned" height={900} />
      </Layout>
    </Stage>
  ),
};

export const LoadingState: Story = {
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <Stage height={320}>
      <Layout maxWidth="600px" isLoading tabIndex={0}>
        <Placeholder label="Content" height={520} />
      </Layout>
    </Stage>
  ),
};

// ─── Related components ──────────────────────────────────────

export const RelatedComponentsBlock: StoryObj = {
  name: 'Related components',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <RelatedComponents>
      <RelatedComponent
        name="Split Screen"
        url="/?path=/docs/components-layouts-split-screen--docs"
        preview={(
        <div style={{ width: '140px', height: '92px', border: '1px solid #E2E8F0', borderRadius: '6px', overflow: 'hidden', display: 'flex', background: '#fff' }}>
          <div style={{ width: '50%', background: '#F6F2FD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#7849ff' }} />
          </div>
          <div style={{ width: '50%', padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'center' }}>
            <div style={{ height: '7px', width: '80%', background: '#EDF0F4', borderRadius: '3px' }} />
            <div style={{ height: '7px', width: '60%', background: '#EDF0F4', borderRadius: '3px' }} />
          </div>
        </div>
      )}
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
