import type { Meta, StoryObj } from '@storybook/react-vite';
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

// ─── In a table footer ──────────────────────────────────────────────────────

/**
 * Pagination lives at the **bottom of a table or list** once the total number of
 * items exceeds the page size. The label shows the current range out of the total.
 */
export const InTableFooter: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const rows = ['Acme Corp', 'Globex', 'Initech', 'Umbrella', 'Soylent'];
    return (
      <div style={{ fontFamily: 'Poppins, sans-serif', width: '520px', border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
        {rows.map((r, i) => (
          <div key={r} style={{ padding: '14px 20px', fontSize: '14px', color: '#18191b', borderBottom: i < rows.length - 1 ? '1px solid #EDF0F2' : 'none' }}>
            {r}
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '12px 20px', borderTop: '1px solid #E2E8F0', background: '#FBFCFD' }}>
          <Pagination totalItems={128} pageSize={25} currentPage={currentPage} onPageChange={setCurrentPage} />
        </div>
      </div>
    );
  },
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
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
