import type { Meta, StoryObj } from '@storybook/react-vite';

import { Container } from '@/components/containers/Container';
import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { Tooltip } from '@/components/dataDisplay/Tooltip';
import { Icon } from '@/components/foundations/Icon';
import { Link } from '@/components/navigation/Link';
import { Tabs } from '@/components/navigation/Tabs';
import { DoDont } from '@/storybook-utils/DoDont';
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';
import { VariantCard, VariantCards } from '@/storybook-utils/VariantCard';

import { NavigationItem } from './NavigationItem';

const linkProps = `{
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
}`;

type PlaygroundArgs = {
  label: string;
  isSelected?: boolean;
  isFullWidth?: boolean;
};

const meta: Meta<typeof NavigationItem & PlaygroundArgs> = {
  title: 'Components/Navigation/Navigation Item',
  component: NavigationItem,
  argTypes: {
    isSelected: {
      control: 'boolean',
      description: 'Determines if the item is selected (the active location).',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isFullWidth: {
      control: 'boolean',
      description: 'Stretches the item to fill the width of its container.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    link: {
      control: 'object',
      description: 'When provided, the item renders as an `<a>` tag for navigation.',
      table: { type: { summary: 'object', detail: linkProps }, category: 'props' },
    },
    as: {
      control: false,
      description: 'Override the rendered element (e.g. `div` when nesting a custom button).',
      table: { defaultValue: { summary: 'button' }, type: { summary: 'ElementType' }, category: 'props' },
    },
    children: {
      control: false,
      description: 'The content of the navigation item — text, or an icon + text group.',
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    role: {
      control: 'text',
      description: 'The semantic role of the element.',
      table: { type: { summary: 'AriaRole' }, category: 'accessibility' },
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible name — required for icon-only items.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler.',
      table: { type: { summary: 'MouseEventHandler<HTMLButtonElement>' }, category: 'events' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'navigation-item' }, type: { summary: 'string' }, category: 'tests' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationItem>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: StoryObj<PlaygroundArgs> = {
  name: 'Playground',
  args: { label: 'Payments', isSelected: false, isFullWidth: false },
  argTypes: {
    label: {
      control: 'text',
      description: 'The item label (mapped to `children` for the Playground).',
      table: { type: { summary: 'string' }, category: 'props' },
    },
  },
  parameters: {
    layout: 'fullscreen',
    controls: { include: ['label', 'isFullWidth'] },
  },
  render: ({ label, isSelected, ...args }) => {
    const STATE_LABEL: React.CSSProperties = {
      margin: 0,
      fontSize: '11px',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.07em',
      color: '#8B95A9',
    };
    return (
      <div style={{ padding: '30px 24px', display: 'flex', gap: '40px', alignItems: 'flex-start', fontFamily: 'Poppins, sans-serif' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
          <p style={STATE_LABEL}>Default</p>
          <NavigationItem {...args}>
            <Group variant="horizontal" spacing="xs-s" alignItems="center">
              <Icon size="small" type="wallet" color="inherit" aria-hidden />
              <Text color="inherit" textStyle="inline">{label}</Text>
            </Group>
          </NavigationItem>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
          <p style={STATE_LABEL}>Selected</p>
          <NavigationItem {...args} isSelected>
            <Group variant="horizontal" spacing="xs-s" alignItems="center">
              <Icon size="small" type="wallet" color="inherit" aria-hidden />
              <Text color="inherit" textStyle="inline">{label}</Text>
            </Group>
          </NavigationItem>
        </div>
      </div>
    );
  },
};

// ─── Selected ─────────────────────────────────────────────────────────────────

/**
 * `isSelected` represents the active state, visually indicating the user's current
 * location or selected navigation option.
 */
export const Selected: Story = {
  render: () => (
    <VariantCards>
      <VariantCard preview={<NavigationItem>Payments</NavigationItem>} title="Default">
        The resting state for an inactive destination.
      </VariantCard>
      <VariantCard preview={<NavigationItem isSelected>Payments</NavigationItem>} title="Selected">
        Represents the active state, indicating the user's current location.
      </VariantCard>
    </VariantCards>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

// ─── Custom content ───────────────────────────────────────────────────────────

/**
 * The item accepts any content. Combine an `Icon` with a `Text` label vertically
 * or horizontally, or render an icon on its own — always with an `aria-label`.
 */
export const CustomContent: Story = {
  render: () => (
    <Group spacing="l" alignItems="flex-start">
      <NavigationItem>
        <Group variant="vertical" spacing="xxs" alignItems="center">
          <Icon size="small" type="search" color="inherit" aria-hidden />
          <Text textStyle="inline">Search</Text>
        </Group>
      </NavigationItem>

      <NavigationItem>
        <Group variant="horizontal" spacing="xs-s" alignItems="center">
          <Icon size="small" type="edit" color="inherit" aria-hidden />
          <Text textStyle="inline">Edit</Text>
        </Group>
      </NavigationItem>

      <Tooltip content="Filters" placement="right">
        <NavigationItem aria-label="Filters">
          <Container paddingY="xxxs" alignItems="center">
            <Icon size="large" type="filter" color="inherit" aria-hidden />
          </Container>
        </NavigationItem>
      </Tooltip>
    </Group>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

// ─── Full width ───────────────────────────────────────────────────────────────

/**
 * `isFullWidth` stretches the item to fill its container — useful inside a vertical
 * navigation list.
 */
export const FullWidth: Story = {
  render: () => (
    <div style={{ padding: '32px', background: '#F3F5F7', borderRadius: '8px', display: 'flex', justifyContent: 'flex-start', fontFamily: 'Poppins, sans-serif' }}>
      {/* inner container — the full-width items stretch to fill its width */}
      <div style={{ width: '240px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px' }}>
        <Group variant="vertical" spacing="xxs">
          <NavigationItem isFullWidth isSelected>Dashboard</NavigationItem>
          <NavigationItem isFullWidth>Payments</NavigationItem>
          <NavigationItem isFullWidth>Vendors</NavigationItem>
        </Group>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

// ─── As link ──────────────────────────────────────────────────────────────────

/**
 * Pass a `link` prop to render the item as an `<a>` tag. Any item that navigates
 * to a URL must be a link so screen readers announce it correctly.
 */
export const AsLink: Story = {
  render: () => (
    <NavigationItem link={{ href: 'https://www.google.com', target: '_blank' }}>
      Open Google
    </NavigationItem>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

// ─── Do's and don'ts ──────────────────────────────────────────────────────────

export const DosAndDonts: Story = {
  name: "Do's and don'ts",
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <DoDont
      previewBg="white"
      items={[
        {
          type: 'do',
          title: 'Keep labels clear and concise',
          preview: (
            <NavigationItem>
              <Group variant="horizontal" spacing="xs-s" alignItems="center">
                <Icon size="small" type="invoices" color="inherit" aria-hidden />
                <Text textStyle="inline">Invoices</Text>
              </Group>
            </NavigationItem>
          ),
        },
        {
          type: 'dont',
          title: 'Use vague or long, truncated labels',
          preview: (
            <NavigationItem>
              <Group variant="horizontal" spacing="xs-s" alignItems="center">
                <Icon size="small" type="invoices" color="inherit" aria-hidden />
                <span
                  style={{
                    display: 'block',
                    maxWidth: '150px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Manage all outstanding Bill payments
                </span>
              </Group>
            </NavigationItem>
          ),
        },
      ]}
    />
  ),
};

// ─── Related components ───────────────────────────────────────────────────────

export const RelatedComponentsBlock: Story = {
  name: 'Related components',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <RelatedComponents>
      <RelatedComponent
        name="Link"
        url="/?path=/docs/components-navigation-link--docs"
        preview={<Link href="#" label="View invoice" variant="standalone" />}
      />
      <RelatedComponent
        name="Tabs"
        url="/?path=/docs/components-navigation-tabs--docs"
        preview={
          <Tabs
            tabs={[
              { name: 'vendors', label: 'Vendors' },
              { name: 'bills', label: 'Bills' },
            ]}
            activeTab="vendors"
            onChange={() => {}}
          />
        }
      />
    </RelatedComponents>
  ),
};
