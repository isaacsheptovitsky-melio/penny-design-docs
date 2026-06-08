import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';

import { Counter } from '@/components/dataDisplay/Counter';
import { Pill } from '@/components/dataDisplay/Pill';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { useScrollToActiveTab } from './hooks/useScrollToActiveTab';
import { useTabs } from './hooks/useTabs';
import type { TabItem, TabsProps } from './Tabs.types';

/**
 * Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy.
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    { tabs, activeTab, onChange, variant = 'default', 'data-testid': dataTestId = 'tabs', isFullWidth, ...props },
    forwardRef
  ) => {
    const styles = useMultiStyleConfig('Tabs', { variant, isFullWidth });
    const getTestId = useTestId(dataTestId);
    const tabsListRef = useRef<HTMLDivElement>(null);
    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(forwardRef, () => tabsListRef.current);
    const getTabCounters = useCallback((tab: TabItem) => {
      if (!tab.counters) return;

      // renders one pill for all tabs, and only for last tab renders maximum 2 pills.
      return tab.counters.map((counter, i) => i <= 1 && <Counter key={`tab-${tab.name}-counter-${i}`} {...counter} />);
    }, []);

    const getTabPills = useCallback(
      (tab: TabItem, index: number) => {
        if (!tab.pills) return;

        const isLastTab = index === tabs.length - 1;

        // renders one pill for all tabs, and only for last tab renders maximum 2 pills.
        return tab.pills.map(
          (pill, i) => (i === 0 || (isLastTab && i === 1)) && <Pill key={`tab-${tab.name}-pill-${i}`} {...pill} />
        );
      },
      [tabs]
    );

    const activeTabIndex = useMemo(() => tabs.findIndex((tab) => tab.name === activeTab), [tabs, activeTab]);

    const { tabsRefs } = useScrollToActiveTab({ tabsListRef, tabs, activeTabIndex });

    const { handleKeyDown } = useTabs({ tabs, activeTabIndex, onChange, tabsRefs });

    return (
      <Box data-component="Tabs" __css={styles['container']} {...props} {...getTestId()}>
        <Box __css={styles['tabs']} role="tablist" ref={tabsListRef} {...getTestId('list')}>
          {tabs.map((tab, index) => {
            const { name, counters, pills, ...rest } = tab;
            return (
              <Box
                role="tab"
                as="button"
                key={`tab-${name}`}
                __css={styles['tab']}
                {...getTestId(`tab-${name}`)}
                aria-selected={activeTab === name}
                aria-label={tab['aria-label']}
                onClick={() => {
                  onChange(name);
                }}
                onKeyDown={handleKeyDown}
                {...rest}
                ref={tabsRefs[index]}
              >
                <Box as="span" id={`tab-${name}`}>
                  {tab.label}
                </Box>
                {counters && (
                  <Box sx={styles['counters']} {...getTestId('tab-counters')}>
                    {getTabCounters(tab)}
                  </Box>
                )}
                {pills && (
                  <Box sx={styles['pills']} {...getTestId('tab-pills')}>
                    {getTabPills(tab, index)}
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }
);

Tabs.displayName = 'Tabs';
