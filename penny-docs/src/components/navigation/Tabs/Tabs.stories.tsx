import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { Icon } from '@/components/foundations/Icon';
import { Link } from '@/components/navigation/Link';
import { NavigationItem } from '@/components/navigation/NavigationItem';
import { Pagination } from '@/components/navigation/Pagination';
import { DoDont } from '@/storybook-utils/DoDont';
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';

import { Tabs } from './Tabs';
import type { TabItem } from './Tabs.types';

const BASE_TABS: TabItem[] = [
  { name: 'vendors', label: 'Vendors' },
  { name: 'bills', label: 'Bills' },
  { name: 'payments', label: 'Payments' },
];

const meta: Meta<typeof Tabs> = {
  title: 'Components/Navigation/Tabs',
  component: Tabs,
  argTypes: {
    tabs: {
      control: false,
      description: 'Array of tab items (`{ name, label, counters?, pills? }`).',
      table: { type: { summary: 'TabItem[]' }, category: 'props' },
    },
    activeTab: {
      control: false,
      description: 'The `name` of the currently active tab.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    onChange: {
      action: 'changed',
      description: 'Called with the `name` of the tab the user selects.',
      table: { type: { summary: '(name: string) => void' }, category: 'events' },
    },
    variant: {
      control: 'select',
      options: ['default', 'neutral'],
      description: 'Visual style. `default` uses the brand colour; `neutral` is low-emphasis.',
      table: { defaultValue: { summary: 'default' }, type: { summary: "'default' | 'neutral'" }, category: 'props' },
    },
    isFullWidth: {
      control: 'boolean',
      description: 'Distributes the tabs evenly across the container width.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'tabs' }, type: { summary: 'string' }, category: 'tests' },
    },
  },
  args: {
    variant: 'default',
    isFullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    layout: 'fullscreen',
    controls: { include: ['variant', 'isFullWidth'] },
  },
  render: (args) => {
    const [activeTab, setActiveTab] = useState('vendors');
    return (
      <div style={{ padding: '24px', borderBottom: '1px solid #E2E8F0' }}>
        <Tabs {...args} tabs={BASE_TABS} activeTab={activeTab} onChange={setActiveTab} />
      </div>
    );
  },
};

// ─── Full width ───────────────────────────────────────────────────────────────

/**
 * `isFullWidth` stretches the tabs to fill their container — use for balanced,
 * evenly-spaced layouts or when you have only a few tabs.
 */
export const FullWidth: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('vendors');
    return (
      <div style={{ width: '480px', borderBottom: '1px solid #E2E8F0' }}>
        <Tabs isFullWidth tabs={BASE_TABS} activeTab={activeTab} onChange={setActiveTab} />
      </div>
    );
  },
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

// ─── Neutral ──────────────────────────────────────────────────────────────────

/**
 * The `neutral` variant avoids the brand purple — use it for secondary or
 * less-prominent navigation sections.
 */
export const Neutral: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('vendors');
    return (
      <div style={{ borderBottom: '1px solid #E2E8F0' }}>
        <Tabs variant="neutral" tabs={BASE_TABS} activeTab={activeTab} onChange={setActiveTab} />
      </div>
    );
  },
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

// ─── With counters ──────────────────────────────────────────────────────────

/**
 * Attach `counters` to a tab to show item counts at a glance (e.g. unread or
 * pending items).
 */
export const WithCounters: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('bills');
    const tabs: TabItem[] = [
      { name: 'vendors', label: 'Vendors' },
      { name: 'bills', label: 'Bills', counters: [{ status: 'brand', number: 12 }] },
      { name: 'approvals', label: 'Approvals', counters: [{ status: 'critical', number: 3 }] },
    ];
    return (
      <div style={{ borderBottom: '1px solid #E2E8F0' }}>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>
    );
  },
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

// ─── With pills ───────────────────────────────────────────────────────────────

/**
 * Attach `pills` to highlight status like "New" or "Pending" without showing an
 * exact count.
 */
export const WithPills: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('vendors');
    const tabs: TabItem[] = [
      { name: 'vendors', label: 'Vendors' },
      { name: 'financing', label: 'Financing', pills: [{ status: 'success', label: 'New', type: 'primary' }] },
      { name: 'approvals', label: 'Approvals', pills: [{ status: 'warning', label: 'Pending', type: 'secondary' }] },
    ];
    return (
      <div style={{ borderBottom: '1px solid #E2E8F0' }}>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>
    );
  },
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

// ─── Bottom border ────────────────────────────────────────────────────────────

/**
 * Tabs don't draw their own full-width divider. Wrap them in a container with a
 * `1px` bottom border (`semantic.border.static`) so the boundary spans the full
 * width of the navigation bar.
 */
export const BottomBorder: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('vendors');
    return (
      <div style={{ fontFamily: 'Poppins, sans-serif' }}>
        <div style={{ borderBottom: '1px solid #E2E8F0' }}>
          <Tabs tabs={BASE_TABS} activeTab={activeTab} onChange={setActiveTab} />
        </div>
        <div style={{ padding: '20px 4px', fontSize: '14px', color: '#6B7280' }}>
          {BASE_TABS.find((t) => t.name === activeTab)?.label} content
        </div>
      </div>
    );
  },
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

// ─── Do's and don'ts ──────────────────────────────────────────────────────────

export const DosAndDonts: StoryObj<typeof Tabs> = {
  name: "Do's and don'ts",
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <DoDont
      items={[
        {
          type: 'do',
          title: 'Use clear, short, and descriptive labels',
          preview: (
            <div style={{ width: '100%' }}>
              <Tabs tabs={BASE_TABS} activeTab="vendors" onChange={() => {}} />
            </div>
          ),
        },
        {
          type: 'dont',
          title: 'Nest tabs inside other tabs',
          preview: (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Tabs
                tabs={[
                  { name: 'invoices', label: 'Invoices' },
                  { name: 'customers', label: 'Customers' },
                ]}
                activeTab="invoices"
                onChange={() => {}}
              />
              <div style={{ paddingLeft: '16px' }}>
                <Tabs
                  variant="neutral"
                  tabs={[
                    { name: 'open', label: 'Open' },
                    { name: 'paid', label: 'Paid' },
                  ]}
                  activeTab="open"
                  onChange={() => {}}
                />
              </div>
            </div>
          ),
        },
      ]}
    />
  ),
};

// ─── Related components ───────────────────────────────────────────────────────

export const RelatedComponentsBlock: StoryObj<typeof Tabs> = {
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
        name="Navigation Item"
        url="/?path=/docs/components-navigation-navigation-item--docs"
        preview={
          <NavigationItem isSelected>
            <Group variant="horizontal" spacing="xs-s" alignItems="center">
              <Icon size="small" type="wallet" color="inherit" aria-hidden />
              <Text color="inherit" textStyle="inline">Payments</Text>
            </Group>
          </NavigationItem>
        }
      />
      <RelatedComponent
        name="Pagination"
        url="/?path=/docs/components-navigation-pagination--docs"
        preview={<Pagination totalItems={200} pageSize={25} currentPage={1} onPageChange={() => {}} />}
      />
    </RelatedComponents>
  ),
};
