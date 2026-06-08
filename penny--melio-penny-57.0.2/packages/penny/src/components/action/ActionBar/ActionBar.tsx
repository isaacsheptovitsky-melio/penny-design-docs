import { Box } from '@chakra-ui/react';
import { forwardRef, Fragment, type NamedExoticComponent } from 'react';

import { Group, type GroupProps } from '@/components/containers/Group';
import { ActionsDropdownMenu } from '@/components/containers/menus/ActionsDropdownMenu';
import { Panel } from '@/components/containers/Panel';
import { Loader } from '@/components/foundations/Loader';
import { _IconIndicator } from '@/components/internal/_IconIndicator';
import { LayoutMaxWidthDefault } from '@/components/layouts/Layout/Layout.types';
import { type ThemeSpaceKey, themeSpaces } from '@/theme/foundations/spaces';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { useBreakpointValue } from '@/theme/hooks/useBreakpointValue';

import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { NakedButton } from '../NakedButton/NakedButton';
import type { ActionBarProps } from './ActionBar.types';
import { paddingByBreakpoint } from './ActionBar.types';

const actionComponentNames = [
  Button?.displayName,
  IconButton?.displayName,
  NakedButton?.displayName,
  (ActionsDropdownMenu as NamedExoticComponent)?.displayName,
];

/**
 * This component is meant to be placed at the bottom of its container. In order to do that, its container should have `position: relative` set to it.
 */
export const ActionBar = forwardRef<HTMLDivElement, ActionBarProps>(
  (
    {
      maxWidth = LayoutMaxWidthDefault,
      isOpen,
      isLoading,
      summaryItems,
      actions,
      backgroundColor,
      loadingText,
      ...props
    },
    ref
  ) => {
    const styles = useMultiStyleConfig('ActionBar', { backgroundColor });

    const panelPadding = useBreakpointValue(paddingByBreakpoint) as ThemeSpaceKey;
    const summaryItemsGroupVariant = useBreakpointValue<GroupProps['variant']>({ xs: 'vertical', m: 'horizontal' });
    const summaryItemsSpacing = useBreakpointValue<GroupProps['spacing']>({ xs: 'none', s: 'xs', m: 's' });
    const summaryItemsDivider = useBreakpointValue({ xs: null, m: '|' });
    const actionGroupVariant = useBreakpointValue<GroupProps['variant']>({ xs: 'vertical', s: 'horizontal' });
    const actionsSpacing = useBreakpointValue<GroupProps['spacing']>({ xs: 'xs', s: 's' });

    return (
      <Panel
        backgroundColor={backgroundColor}
        transitionConfig={{ in: isOpen }}
        data-component="ActionBar"
        position="absolute"
        maxWidth={maxWidth}
        width={`calc(100% - ${themeSpaces[panelPadding]} * 2)`}
        {...props}
        ref={ref}
      >
        <Box __css={styles['bar']}>
          <>
            {isLoading ? (
              <Group alignItems="center" spacing="s">
                <Loader color="semantic.icon.inverse" />
                {loadingText}
              </Group>
            ) : (
              <>
                <Group variant={summaryItemsGroupVariant} spacing={summaryItemsSpacing}>
                  {summaryItems?.map(({ label, value, tooltip, testId }, idx) => (
                    <Fragment key={label}>
                      <Group
                        key={`${label}-${idx}`}
                        spacing="xs"
                        alignItems="center"
                        data-testid={testId || `action-bar-summary-item-${idx}`}
                      >
                        <Box __css={styles['itemLabel']}>{label}</Box>
                        <Box __css={styles['itemValue']}>{value}</Box>
                        {tooltip && <_IconIndicator variant="informative" tooltip={tooltip} isInverse />}
                      </Group>
                      {idx !== summaryItems.length - 1 && summaryItemsDivider}
                    </Fragment>
                  ))}
                </Group>
                <Group variant={actionGroupVariant} spacing={actionsSpacing}>
                  {actions?.map((action, idx) => {
                    const { displayName } = action.component as NamedExoticComponent;
                    if (!(displayName && actionComponentNames.includes(displayName))) return null;

                    const Comp = action.component;

                    return (
                      <Comp
                        key={`${displayName}-${idx}`}
                        // Some props are required but we're spreading all anyway.
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        {...(action.props as any)}
                        data-testid={action.testId || `action-bar-action-${idx}`}
                        data-inverse // This is a temporary prop to invert the color of the outline. Jira ticket: ME-54641
                      />
                    );
                  })}
                </Group>
              </>
            )}
          </>
        </Box>
      </Panel>
    );
  }
);

ActionBar.displayName = 'ActionBar';
