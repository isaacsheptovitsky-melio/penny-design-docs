import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@/components/action/Button';
import { NakedButton } from '@/components/action/NakedButton';

import { ExternalLayout } from './ExternalLayout';

/**
 * `ExternalLayout`'s header is `position: fixed`. The `transform: scale(1)` on this stage makes
 * it the containing block for that fixed header, so the header pins to the stage's top edge
 * instead of the browser viewport — keeping each story self-contained in the docs canvas.
 * In a real app the layout owns the whole viewport, so no stage is needed.
 */
const Stage = ({ children, height = 540 }: { children: React.ReactNode; height?: number }) => (
  <div
    style={{
      position: 'relative',
      transform: 'scale(1)',
      height: `${height}px`,
      width: '100%',
      border: '1px solid #E2E8F0',
      borderRadius: '8px',
      overflow: 'hidden',
    }}
  >
    {children}
  </div>
);

const headerSlot = <NakedButton variant="invert" label="Need help?" />;

const contentSlot = (
  <div
    style={{
      fontFamily: 'Poppins, sans-serif',
      background: '#FFFFFF',
      border: '1px solid #E2E8F0',
      borderRadius: '12px',
      padding: '32px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    }}
  >
    <div style={{ fontSize: '22px', fontWeight: 700, color: '#18191b' }}>Pay your invoice</div>
    <div style={{ fontSize: '15px', color: '#64748B', lineHeight: 1.5 }}>
      Acme Corp sent you an invoice for <strong>$2,200.00</strong>, due Jun 30, 2026. Choose how you'd like to pay.
    </div>
    <div
      style={{
        height: '120px',
        borderRadius: '8px',
        background: 'repeating-linear-gradient(45deg, #F8FAFC, #F8FAFC 12px, #EEF2F7 12px, #EEF2F7 24px)',
        border: '1px dashed #CBD5E1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '13px',
        fontWeight: 600,
        color: '#64748B',
      }}
    >
      Payment details
    </div>
    <Button label="Continue to payment" variant="primary" isFullWidth />
  </div>
);

const footerSlot = (
  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', color: '#94A3B8', textAlign: 'center' }}>
    Payments are processed securely by Melio. © 2026 Melio Payments Inc.
  </div>
);

const partnerLogo = (
  <span
    style={{
      fontFamily: 'Poppins, sans-serif',
      fontSize: '18px',
      fontWeight: 800,
      letterSpacing: '0.04em',
      color: '#FFFFFF',
    }}
  >
    PARTNER
  </span>
);

const meta: Meta<typeof ExternalLayout> = {
  title: 'Components/Layouts/External Layout',
  component: ExternalLayout,
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: 'Shows a single centered Loader, blocking interaction during background processing.',
      table: { category: 'props', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    logo: {
      control: false,
      description: 'Overrides the default Melio wordmark — pass a partner logo for white-labeled experiences, or `<></>` to hide it.',
      table: { category: 'props', type: { summary: 'ReactElement' } },
    },
    header: {
      control: false,
      description: 'The right side of the header — use for auxiliary actions like "Login" or "Help".',
      table: { category: 'props', type: { summary: 'ReactElement' } },
    },
    content: {
      control: false,
      description: 'The primary workspace — form inputs, payment details, or confirmation messages.',
      table: { category: 'props', type: { summary: 'ReactElement' } },
    },
    footer: {
      control: false,
      description: 'The bottom section — legal disclaimers, copyright, or secondary links.',
      table: { category: 'props', type: { summary: 'ReactElement' } },
    },
    tabIndex: {
      control: 'number',
      description: 'Sets the tab index of the scrollable wrapper, needed for keyboard accessibility.',
      table: { category: 'props', type: { summary: 'number' } },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { category: 'tests', type: { summary: 'string' }, defaultValue: { summary: "'external-layout'" } },
    },
  },
  args: {
    header: headerSlot,
    content: contentSlot,
    footer: footerSlot,
    isLoading: false,
    tabIndex: 0,
    'data-testid': 'external-layout',
  },
};
export default meta;

type Story = StoryObj<typeof ExternalLayout>;

export const Playground: Story = {
  name: 'Playground',
  render: (args) => (
    <Stage>
      <ExternalLayout {...args} />
    </Stage>
  ),
  parameters: {
    controls: {
      include: ['isLoading'],
    },
  },
};

export const HideLogo: Story = {
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: (args) => (
    <Stage>
      <ExternalLayout {...args} logo={<></>} />
    </Stage>
  ),
};

export const OverrideLogo: Story = {
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: (args) => (
    <Stage>
      <ExternalLayout {...args} logo={partnerLogo} />
    </Stage>
  ),
};

export const LoadingState: Story = {
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: (args) => (
    <Stage height={320}>
      <ExternalLayout {...args} isLoading />
    </Stage>
  ),
};
