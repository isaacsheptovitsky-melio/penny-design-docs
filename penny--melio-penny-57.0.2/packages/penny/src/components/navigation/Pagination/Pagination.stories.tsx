import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Navigation Components/Pagination [pattern]',
  component: Pagination,
  argTypes: {
    currentPage: {
      control: 'number',
      description: 'Current page number',
      table: {
        defaultValue: {
          summary: '1',
        },
        category: 'props',
      },
    },
    totalItems: {
      control: 'number',
      description: 'Total number of items in all pages combined',
      type: {
        required: true,
        name: 'other',
        value: 'number',
      },
      table: {
        category: 'props',
      },
    },
    pageSize: {
      control: 'number',
      description: 'Number of items per single page',
      type: {
        required: true,
        name: 'other',
        value: 'number',
      },
      table: {
        category: 'props',
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Determines whether the pagination component is disabled.',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    onPageChange: {
      description: 'Function called on next/prev click',
      table: {
        category: 'Events',
        type: { summary: '(newPageNumber: number) => void' },
      },
    },
    ariaLabels: {
      control: 'object',
      description: 'Set aria-label for each chevron button.',
      table: {
        category: 'accessibility',
        defaultValue: { summary: '{}' },
        type: { summary: ' { chevronLeftLabel?: string; chevronRightLabel?: string } ' },
      },
    },
    nextButtonRef: {
      control: false,
      description: 'A ref for the "next" button.',
      table: {
        category: 'props',
        type: { summary: 'RefObject<HTMLButtonElement>' },
      },
    },
    previousButtonRef: {
      control: false,
      description: 'A ref for the "previous" button.',
      table: {
        category: 'props',
        type: { summary: 'RefObject<HTMLButtonElement>' },
      },
    },
  },
  args: {
    totalItems: 143,
    pageSize: 50,
    currentPage: 1,
    onPageChange: () => null,
    ariaLabels: {},
  },
};
export default meta;

export const Main: StoryObj<typeof Pagination> = {
  render: ({ currentPage, onPageChange, ...rest }) => {
    const [page, setPage] = useState(currentPage);

    return <Pagination currentPage={page} onPageChange={setPage} {...rest} />;
  },
};

export const Disabled: StoryObj<typeof Pagination> = {
  ...Main,
  args: {
    ...Main.args,
    isDisabled: true,
  },
};
