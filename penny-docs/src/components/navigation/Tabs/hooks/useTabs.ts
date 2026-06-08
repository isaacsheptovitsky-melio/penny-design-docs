import type { KeyboardEvent, RefObject } from 'react';

import type { TabItem, TabsProps } from '../Tabs.types';

type UseTabsReturn = {
  handleKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
};

export const useTabs = ({
  tabs,
  onChange,
  activeTabIndex,
  tabsRefs,
}: Pick<TabsProps, 'onChange'> & {
  tabs: TabItem[];
  activeTabIndex: number;
  tabsRefs: RefObject<HTMLDivElement>[];
}): UseTabsReturn => {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      const rightTabIndex = activeTabIndex === tabs.length - 1 ? 0 : activeTabIndex + 1;
      tabsRefs[rightTabIndex]?.current?.focus();
      onChange((tabs[rightTabIndex] as TabItem).name);
    }
    if (e.key === 'ArrowLeft') {
      const leftTabIndex = activeTabIndex === 0 ? tabs.length - 1 : activeTabIndex - 1;
      tabsRefs[leftTabIndex]?.current?.focus();
      onChange((tabs[leftTabIndex] as TabItem).name);
    }
  };

  return { handleKeyDown };
};
