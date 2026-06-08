import { createRef, type RefObject, useCallback, useEffect, useState } from 'react';

import { mergeRefArrays } from '@/utils/merge-refs';

import type { TabItem } from '../Tabs.types';

type UseScrollToActiveTabReturn = {
  tabsRefs: RefObject<HTMLDivElement>[];
};

/**
 * Hook to scroll to the active tab when it is not in the viewport.
 * @param tabs - The tabs to scroll to.
 * @param activeTabIndex - The index of the active tab.
 * @returns The refs of all the tabs.
 */
export const useScrollToActiveTab = ({
  tabsListRef,
  tabs,
  activeTabIndex,
}: {
  tabs: TabItem[];
  activeTabIndex: number;
  tabsListRef: RefObject<HTMLDivElement>;
}): UseScrollToActiveTabReturn => {
  const [tabsRefs, setTabsRefs] = useState<RefObject<HTMLDivElement>[]>([]);
  const [activeTabCurrentRef, setActiveTabCurrentRef] = useState<HTMLDivElement | null | undefined>();

  const scrollToActiveTab = useCallback(() => {
    if (activeTabCurrentRef) {
      tabsListRef.current?.scrollTo({
        left: activeTabCurrentRef.offsetLeft,
        behavior: 'smooth',
      });
    }
  }, [activeTabCurrentRef, tabsListRef]);

  useEffect(() => {
    if (tabsRefs.length === 0) {
      const emptyTabsRefs = Array(tabs.length)
        .fill('')
        .map(() => createRef<HTMLDivElement>());

      const tabRefs = tabs.map((tab) => tab.ref);

      // TODO:https://meliorisk.atlassian.net/browse/ME-110373
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTabsRefs(mergeRefArrays(emptyTabsRefs, tabRefs));
    }
  }, [tabs, tabsRefs.length, tabsListRef]);

  useEffect(() => {
    if (!tabsRefs.length) return;

    // TODO:https://meliorisk.atlassian.net/browse/ME-110373
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveTabCurrentRef(tabsRefs[activeTabIndex]?.current);
    scrollToActiveTab();

    const detectFocusedTab = () => {
      const focusedTab = tabsRefs.find((ref) => ref.current === document.activeElement);
      if (focusedTab) {
        scrollToActiveTab();
      }
    };

    const tabsListRefCurrent = tabsListRef.current;

    // Add event listener to listen for focus change
    tabsListRefCurrent?.addEventListener('focusin', detectFocusedTab);

    return () => {
      tabsListRefCurrent?.removeEventListener('focusin', detectFocusedTab);
    };
  }, [scrollToActiveTab, tabsRefs.length, activeTabIndex, tabsRefs, tabsListRef]);

  return { tabsRefs };
};
