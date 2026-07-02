import type { Meta, StoryObj } from '@storybook/react-vite';
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';

import { Button } from '@/components/action/Button';
import { NakedButton } from '@/components/action/NakedButton';
import { Container } from '@/components/containers/Container';
import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';

import { ExternalLayout } from './ExternalLayout';

/**
 * `ExternalLayout`'s header is `position: fixed`. The `transform: scale(1)` on this stage makes it
 * the containing block for that fixed header, so the header pins to the stage's top edge instead of
 * the browser viewport — keeping each story self-contained in the docs canvas.
 *
 * The scoped `* { box-sizing: border-box }` reset mirrors Penny's global reset (theme/styles.ts),
 * which is scoped to `melio-wrapper > div` and so doesn't reach Storybook's story root. Without it
 * the fixed header's horizontal padding is added *outside* its inherited width, making it render
 * ~48px wider than the header banner — which left a stray white notch on the right and clipped the
 * header actions. In a real app the layout lives inside `melio-wrapper`, so this comes for free.
 */
const Stage = ({ children, height = 540 }: { children: React.ReactNode; height?: number }) => (
  <div
    className="external-layout-stage"
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
    <style>{`.external-layout-stage *, .external-layout-stage *::before, .external-layout-stage *::after { box-sizing: border-box; }`}</style>
    {children}
  </div>
);

const headerSlot = <NakedButton variant="invert" label="Need help?" />;

const contentSlot = (
  <Container backgroundColor="white" border="regular" paddingX="l" paddingY="l">
    <Group variant="vertical" spacing="m">
      <Text as="h2" textStyle="heading2Semi">
        Pay your invoice
      </Text>
      <Text textStyle="body2" color="semantic.text.secondary">
        Acme Corp sent you an invoice for $2,200.00, due Jun 30, 2026.
      </Text>
      <Button label="Continue to payment" variant="primary" isFullWidth />
    </Group>
  </Container>
);

const footerSlot = (
  <Text textStyle="caption1" color="semantic.text.secondary" textAlign="center">
    Payments are processed securely by Melio. © 2026 Melio Payments Inc.
  </Text>
);

const partnerLogo = (
  <Text textStyle="body1Semi" color="semantic.text.inverse">
    PARTNER
  </Text>
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
    </RelatedComponents>
  ),
};
