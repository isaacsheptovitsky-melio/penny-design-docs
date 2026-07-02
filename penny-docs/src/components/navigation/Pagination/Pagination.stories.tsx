import type { Meta, StoryObj } from '@storybook/react-vite';
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';
import { Tabs } from '@/components/navigation/Tabs';
import { Link } from '@/components/navigation/Link';
import { useState } from 'react';

import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Navigation/Pagination',
  component: Pagination,
  argTypes: {
    totalItems: {
      control: { type: 'number', min: 0 },
      description: 'Total number of items across all pages.',
      table: { type: { summary: 'number' }, category: 'props' },
    },
    pageSize: {
      control: { type: 'number', min: 1 },
      description: 'Number of items per page.',
      table: { type: { summary: 'number' }, category: 'props' },
    },
    currentPage: {
      control: { type: 'number', min: 1 },
      description: 'The current page number.',
      table: { defaultValue: { summary: '1' }, type: { summary: 'number' }, category: 'props' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables both navigation controls.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    onPageChange: {
      action: 'pageChanged',
      description: 'Called with the new page number on next/previous click.',
      table: { type: { summary: '(newPageNumber: number) => void' }, category: 'events' },
    },
    ariaLabels: {
      control: false,
      description: 'Accessible labels for the chevron buttons.',
      table: { type: { summary: '{ chevronLeftLabel?: string; chevronRightLabel?: string }' }, category: 'accessibility' },
    },
  },
  args: {
    totalItems: 200,
    pageSize: 25,
    isDisabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    layout: 'fullscreen',
    controls: { include: ['totalItems', 'pageSize', 'isDisabled'] },
  },
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(1);
    return (
      <div style={{ padding: '30px 24px', display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination {...args} currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>
    );
  },
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

/**
 * `isDisabled` turns off both controls — use it while a page of data is loading.
 */
export const Disabled: Story = {
  args: { isDisabled: true, currentPage: 2 },
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Pagination {...args} />
    </div>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

// ─── Related components ──────────────────────────────────────

export const RelatedComponentsBlock: StoryObj = {
  name: 'Related',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <RelatedComponents>
      <RelatedComponent
        name="Tabs"
        url="/?path=/docs/components-navigation-tabs--docs"
        preview={<Tabs tabs={[{ name: 'vendors', label: 'Vendors' }, { name: 'bills', label: 'Bills' }]} activeTab="vendors" onChange={() => {}} />}
      />
      <RelatedComponent
        name="Link"
        url="/?path=/docs/components-navigation-link--docs"
        preview={<Link href="#" label="View invoice" variant="standalone" />}
      />
    </RelatedComponents>
  ),
};
