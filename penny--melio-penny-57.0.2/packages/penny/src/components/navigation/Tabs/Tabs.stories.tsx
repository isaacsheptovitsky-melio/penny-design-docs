import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ReactNode, type RefObject, useCallback, useRef, useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Container } from '@/components/containers/Container';
import { getUnionTypeSummary } from '@/test-utils/storybook.utils';

import { Link } from '../Link';
import { Tabs } from './Tabs';
import type { TabItem, TabsVariant } from './Tabs.types';

const tabItemType = `{
  name: string; // Identifier of the tab - will be sent to the onChange function
  label: string; // Label of the tab
  id?: string;
  aria-label?: string; // Dedicated label for screen-readers (used for accessibility)
  aria-controls?: string; // The id of the element whose contents or presence are controlled by the element on which this attribute is set (used for accessibility)
  counters?: CounterProps[];
  pills?: Pick<BadgeProps, 'status' | 'isDisabled' | 'label' | 'aria-label'>[];
}`;

const tabs: TabItem[] = [
  {
    name: 'inbox',
    label: 'Inbox',
    'aria-label': 'Inbox tab',
    'aria-controls': 'inbox-panel',
  },
  {
    name: 'scheduled',
    label: 'Scheduled',
    'aria-label': 'Scheduled tab',
    'aria-controls': 'scheduled-panel',
  },
  {
    name: 'paid',
    label: 'Paid',
    'aria-label': 'Paid tab',
    'aria-controls': 'paid-panel',
  },
];

const tabsContent = {
  inbox: <p id="inbox-panel">Inbox Panel</p>,
  scheduled: <p id="scheduled-panel">Scheduled Panel</p>,
  paid: <p id="paid-panel">Paid Panel</p>,
} as { [key: string]: ReactNode };

const variants: TabsVariant[] = ['default', 'neutral'];

/**
 * Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy.<br/>
 * ### Accessibility
 * In order for the component to be accessible, the following conditions must be met:
 * - The `aria-label` / `aria-labelledby` prop must be provided to the `<Tabs />` so the screen reader will announce it.
 * - The `aria-controls` prop must be provided for each tab. The `aria-controls` property identifies the element (or elements) whose contents or presence are controlled by the element on which this attribute is set.
 * - Each tab content must have an `id` that matches the `aria-controls` value.<br/>
 * For more information [see](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/#wai-ariaroles,states,andproperties)
 */

const meta: Meta<typeof Tabs> = {
  title: 'Navigation Components/Tabs',
  component: Tabs,
  argTypes: {
    tabs: {
      control: 'object',
      description: 'An array of `TabItem` props.',
      type: { required: true, name: 'string' },
      table: {
        category: 'props',
        type: {
          summary: `TabItem[]`,
          detail: tabItemType,
        },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'tabs' },
        category: 'tests',
      },
    },
    variant: {
      control: 'select',
      options: variants,
      description: 'The variant of the tabs.',
      table: {
        category: 'props',
        defaultValue: { summary: 'default' },
        type: {
          summary: getUnionTypeSummary(variants),
        },
      },
    },
    isFullWidth: {
      control: 'boolean',
      description: 'Determines if the tabs should evenly distribute within their container.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    activeTab: {
      control: 'select',
      options: ['inbox', 'scheduled', 'paid'],
      description: 'The name of the tab currently active',
      type: { required: true, name: 'string' },
      table: {
        category: 'props',
        type: {
          summary: 'string',
        },
      },
    },
    onChange: {
      action: 'Change',
      description: 'An event for when the selected tab is changed',
      table: {
        category: 'events',
        type: {
          summary: '(activeTab: string) => void',
        },
      },
    },
    'aria-label': {
      control: 'text',
      description: 'A dedicated label for screen-readers (used for a11y).',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
    'aria-labelledby': {
      control: 'text',
      description: 'The `id` of the element that serves as the label for the tabs (for a11y).',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
  },
  args: {
    activeTab: 'inbox',
    tabs,
    variant: 'default',
    'aria-label': 'Penny tabs',
    'aria-labelledby': undefined,
    'data-testid': 'tabs',
  },
};
export default meta;

/**
 * Press the left and right arrow keys to navigate between tabs.
 */
export const Main: StoryObj<typeof Tabs> = {
  render: (args) => {
    const [selectedTab, setSelectedTab] = useState<string>(args.activeTab);
    return (
      <>
        <Tabs {...args} activeTab={selectedTab} onChange={setSelectedTab} />
        <Container paddingTop="m">{tabsContent[selectedTab]}</Container>
      </>
    );
  },
};

export const FullWidth: StoryObj<typeof Tabs> = {
  render: (args) => {
    const [selectedTab, setSelectedTab] = useState<string>(args.activeTab);
    return (
      <>
        <Tabs {...args} isFullWidth activeTab={selectedTab} onChange={setSelectedTab} />
        <Container paddingTop="m">{tabsContent[selectedTab]}</Container>
      </>
    );
  },
};

export const NeutralVariant: StoryObj<typeof Tabs> = {
  render: (args) => {
    const [selectedTab, setSelectedTab] = useState<string>(args.activeTab);
    return (
      <>
        <Tabs {...args} variant="neutral" activeTab={selectedTab} onChange={setSelectedTab} />
        <Container paddingTop="m">{tabsContent[selectedTab]}</Container>
      </>
    );
  },
};

const tabsWithCounters: TabItem[] = [
  {
    name: 'inbox',
    label: 'Inbox',
    counters: [
      { status: 'critical', number: 103 },
      { status: 'warning', number: 87 },
    ] as TabItem['counters'],
  },
  {
    name: 'scheduled',
    label: 'Scheduled',
    counters: [
      { status: 'success', number: 8 },
      { status: 'warning', number: 55 },
    ] as TabItem['counters'],
  },
  {
    name: 'paid',
    label: 'Paid',
    counters: [
      { status: 'warning', number: 203 },
      { status: 'success', number: 99 },
    ] as TabItem['counters'],
  },
];

export const WithCounters: StoryObj<typeof Tabs> = {
  render: (args) => {
    const [selectedTab, setSelectedTab] = useState<string>(args.activeTab);

    return <Tabs activeTab={selectedTab} onChange={setSelectedTab} tabs={tabsWithCounters} />;
  },
};

/**
 * Display tabs with controlled counters based on the guideline. The counters should disappear when the tab is visited.
 */
export const WithControlledCounters: StoryObj<typeof Tabs> = {
  render: (args) => {
    const getVisitedTabsData = (tabs: TabItem[], visited: TabItem['name'][]) =>
      tabs.map((tab) => (visited.includes(tab.name) ? { ...tab, counters: undefined } : tab));

    const [selectedTab, setSelectedTab] = useState<TabItem['name']>(args.activeTab);
    const [visitedTabs, setVisitedTabs] = useState<TabItem['name'][]>([selectedTab]);
    const [tabs, setTabs] = useState(getVisitedTabsData(tabsWithCounters, visitedTabs));

    const onChangeTab = useCallback(
      (tabName: string) => {
        setSelectedTab(tabName);
        const updatedVisitedTabs = visitedTabs.includes(tabName) ? visitedTabs : [...visitedTabs, tabName];
        setVisitedTabs(updatedVisitedTabs);
        setTabs(getVisitedTabsData(tabs, updatedVisitedTabs));
      },
      [tabs, visitedTabs]
    );

    return <Tabs activeTab={selectedTab} onChange={onChangeTab} tabs={tabs} />;
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

const tabsWithPills: TabItem[] = [
  {
    name: 'inbox',
    label: 'Inbox',
    pills: [
      { status: 'critical', label: 'Critical', 'aria-label': 'Critical badge' },
      { status: 'warning', label: 'Warning' },
    ] as TabItem['pills'],
  },
  {
    name: 'scheduled',
    label: 'Scheduled',
    pills: [
      { status: 'success', label: 'Success' },
      { status: 'warning', label: 'Warning' },
    ] as TabItem['pills'],
  },
  {
    name: 'paid',
    label: 'Paid',
    pills: [
      { status: 'warning', label: 'Warning' },
      { status: 'success', label: 'Success' },
    ] as TabItem['pills'],
  },
];

export const WithPills: StoryObj<typeof Tabs> = {
  render: (args) => {
    const [selectedTab, setSelectedTab] = useState<string>(args.activeTab);

    return <Tabs activeTab={selectedTab} onChange={setSelectedTab} tabs={tabsWithPills} />;
  },
};

/**
 * Here's an example of how to use refs with the Tabs component. <br />
 * This is useful when you want to focus on a specific tab from an external link or button.
 */
export const WithRefs: StoryObj<typeof Tabs> = {
  render: (args) => {
    const [selectedTab, setSelectedTab] = useState<string>(args.activeTab);

    const tabRefs = {
      inbox: useRef<HTMLDivElement>(null),
      scheduled: useRef<HTMLDivElement>(null),
      paid: useRef<HTMLDivElement>(null),
    } as Record<string, RefObject<HTMLDivElement>>;

    const tabsWithRefs: TabItem[] = [
      {
        name: 'inbox',
        label: 'Inbox',
        'aria-label': 'Inbox tab',
        'aria-controls': 'inbox-panel',
        id: 'inbox',
        pills: [
          { status: 'critical', label: 'Critical', 'aria-label': 'Critical badge' },
          { status: 'warning', label: 'Warning' },
        ] as TabItem['pills'],
        ref: tabRefs['inbox'],
      },
      {
        name: 'scheduled',
        label: 'Scheduled',
        id: 'scheduled',
        'aria-label': 'Scheduled tab',
        'aria-controls': 'scheduled-panel',
        pills: [
          { status: 'success', label: 'Success' },
          { status: 'warning', label: 'Warning' },
        ] as TabItem['pills'],
        ref: tabRefs['scheduled'],
      },
      {
        name: 'paid',
        label: 'Paid',
        id: 'paid',
        'aria-label': 'Paid tab',
        'aria-controls': 'paid-panel',
        pills: [
          { status: 'warning', label: 'Warning' },
          { status: 'success', label: 'Success' },
        ] as TabItem['pills'],
        ref: tabRefs['paid'],
      },
    ];

    const tabs = tabsWithRefs.reduce(
      (acc, tab) => {
        acc[tab.name] = tab;
        return acc;
      },
      {} as { [key: string]: TabItem }
    );

    return (
      <Storybook.Container display="flex" flexDirection="column" gap="xl">
        <Storybook.Container>
          <Link
            href={`#${tabs[selectedTab]?.id}`}
            onClick={(e) => {
              e.stopPropagation();
              tabs[selectedTab]?.ref?.current?.focus();
            }}
            label="Skip to content"
            variant="standalone"
          />
        </Storybook.Container>
        <Tabs {...args} tabs={tabsWithRefs} activeTab={selectedTab} onChange={setSelectedTab} />
        <Storybook.Container paddingTop="m">{tabsContent[selectedTab]}</Storybook.Container>
      </Storybook.Container>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
