import { screen, waitFor } from '@testing-library/react';
import { createRef } from 'react';
import { expect } from 'vitest';

import { renderComponent } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import * as scrollToActiveTab from '../hooks/useScrollToActiveTab';
import { Tabs } from '../Tabs';
import type { TabItem, TabsProps } from '../Tabs.types';

const tabs: TabItem[] = [
  {
    name: 'tab1',
    label: 'Tab 1',
  },
  {
    name: 'tab2',
    label: 'Tab 2',
  },
  {
    name: 'tab3',
    label: 'Tab 3',
  },
];

const createScrollToActiveTabSpy = () => {
  vi.spyOn(scrollToActiveTab, 'useScrollToActiveTab').mockReturnValue({
    tabsRefs: [{ current: { scrollIntoView: vi.fn() } as unknown as HTMLDivElement }],
  });
};

describe('Tabs', () => {
  it('validates the component', () => {
    createScrollToActiveTabSpy();
    validateComponent<TabsProps>(Tabs, 'Tabs', {
      props: { tabs, activeTab: 'tab1', onChange: vi.fn() },
      defaultDataTestId: 'tabs',
      componentParts: ['list', ...tabs.map((tab) => tab.name)],
    });
  });

  it('selects a tab and verifies it is the only one selected', () => {
    createScrollToActiveTabSpy();
    const handleOnChange = vi.fn();
    renderComponent(<Tabs activeTab="tab1" onChange={handleOnChange} tabs={tabs} />);

    expect(screen.getByTestId('tabs-tab-tab1')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByTestId('tabs-tab-tab2')).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByTestId('tabs-tab-tab3')).toHaveAttribute('aria-selected', 'false');
  });

  it('invokes the onChange handler when changing tabs', async () => {
    createScrollToActiveTabSpy();
    const handleOnChange = vi.fn();
    const { user } = renderComponent(<Tabs activeTab="tab1" onChange={handleOnChange} tabs={tabs} />);

    const tab = tabs[1] as TabItem;
    await user.click(screen.getByText(tab.label));

    expect(handleOnChange).toHaveBeenCalledWith(tab.name);
  });

  it('passes an id to each tab', () => {
    const tabs: TabItem[] = [
      {
        name: 'tab1',
        label: 'Tab 1',
        id: 'tab1id',
      },
      {
        name: 'tab2',
        label: 'Tab 2',
        id: 'tab2id',
      },
    ];

    const { getAllByRole } = renderComponent(<Tabs activeTab="tab1" onChange={vi.fn()} tabs={tabs} />);
    getAllByRole('tab').forEach((tab, index) => expect(tab.id).toEqual(`tab${index + 1}id`));
  });

  describe('Navigation', () => {
    it('navigates to the next tab when pressing the right arrow key', async () => {
      const handleOnChange = vi.fn();
      const { getByTestId, user } = renderComponent(<Tabs activeTab="tab1" onChange={handleOnChange} tabs={tabs} />);
      getByTestId('tabs-tab-tab1').focus();
      await user.keyboard('{arrowright}');
      expect(handleOnChange).toBeCalledWith('tab2');
    });

    it('navigates to the previous tab when pressing the left arrow key', async () => {
      const handleOnChange = vi.fn();
      const { getByTestId, user } = renderComponent(<Tabs activeTab="tab2" onChange={handleOnChange} tabs={tabs} />);
      getByTestId('tabs-tab-tab2').focus();
      await user.keyboard('{arrowleft}');
      expect(handleOnChange).toBeCalledWith('tab1');
    });

    it('navigates to the first tab when pressing the right arrow key', async () => {
      const handleOnChange = vi.fn();
      const { getByTestId, user } = renderComponent(<Tabs activeTab="tab3" onChange={handleOnChange} tabs={tabs} />);
      getByTestId('tabs-tab-tab3').focus();
      await user.keyboard('{arrowright}');
      expect(handleOnChange).toBeCalledWith('tab1');
    });

    it('navigates to the last tab when pressing the left arrow key', async () => {
      const handleOnChange = vi.fn();
      const { getByTestId, user } = renderComponent(<Tabs activeTab="tab1" onChange={handleOnChange} tabs={tabs} />);
      getByTestId('tabs-tab-tab1').focus();
      await user.keyboard('{arrowleft}');
      expect(handleOnChange).toBeCalledWith('tab3');
    });

    it('has ref for each tab', async () => {
      const handleOnChange = vi.fn();
      const tab1Ref = createRef<HTMLDivElement>();
      const tab2Ref = createRef<HTMLDivElement>();

      const tabs: TabItem[] = [
        {
          name: 'tab1',
          label: 'Tab 1',
          id: 'tab1id',
          ref: tab1Ref,
        },
        {
          name: 'tab2',
          label: 'Tab 2',
          id: 'tab2id',
          ref: tab2Ref,
        },
      ];

      renderComponent(<Tabs activeTab="tab1" onChange={handleOnChange} tabs={tabs} />);
      await waitFor(() => expect(tab1Ref).toBeTruthy());
      await waitFor(() => expect(tab2Ref).toBeTruthy());
    });
  });
});
