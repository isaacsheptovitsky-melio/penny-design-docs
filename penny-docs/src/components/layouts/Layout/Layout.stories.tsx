import type { Meta, StoryObj } from '@storybook/react-vite';

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
    children: <Placeholder label="Content" height={520} />,
    tabIndex: 0,
    'data-testid': 'layout',
  },
};
export default meta;

type Story = StoryObj<typeof Layout>;

export const Playground: Story = {
  name: 'Playground',
  render: (args) => (
    <Stage>
      <Layout {...args} />
    </Stage>
  ),
  parameters: {
    controls: {
      include: ['maxWidth', 'backgroundColor', 'isLoading', 'paddingContent'],
    },
  },
};

export const MaxWidth: Story = {
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'Poppins, sans-serif' }}>
      {[
        { width: 'full' as const, label: 'full — spans the whole container' },
        { width: '1200px' as const, label: '1200px — dense, data-heavy pages' },
        { width: '600px' as const, label: '600px — focused, single-task pages' },
      ].map(({ width, label }) => (
        <div key={width}>
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
          <Stage height={220}>
            <Layout maxWidth={width} backgroundColor="lightest" paddingContent="m" tabIndex={0}>
              <Placeholder label={`maxWidth="${width}"`} height="100%" />
            </Layout>
          </Stage>
        </div>
      ))}
    </div>
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
