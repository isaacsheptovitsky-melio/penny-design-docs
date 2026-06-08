import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import { Group } from '@/components/containers/Group';
import { Divider, type DividerProps } from '@/components/dataDisplay/Divider';
import { Icon } from '@/components/foundations/Icon';
import { Loader } from '@/components/foundations/Loader';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { useBreakpointValue } from '@/theme/hooks/useBreakpointValue';
import { useBreakpoint } from '@/theme/providers/BreakpointProvider';

import type { SplitScreenProps, SplitScreenVariant } from './SplitScreen.types';

const variantToSizeMap: Record<SplitScreenVariant, { panelA: number; panelB: number }> = {
  '2:1': { panelA: 66.67, panelB: 33.33 },
  '1:2': { panelA: 33.33, panelB: 66.67 },
  '1:1': { panelA: 50, panelB: 50 },
};

const ResizeHandle = ({ id, shouldAllowResizing, ...props }: { id?: string; shouldAllowResizing: boolean }) => {
  const styles = useMultiStyleConfig('SplitScreen', {});
  const dividerVariant = useBreakpointValue<DividerProps['variant']>({ xs: 'horizontal', l: 'vertical' });

  return (
    <>
      {shouldAllowResizing ? (
        <Box as={PanelResizeHandle} id={id} __css={styles['resizableBar']} {...props}>
          {/* aria-hidden is for hiding the resize icon from the screen reader. */}
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/*@ts-ignore*/}
          <Box as={Icon} type="resize" size="small" __css={styles['handle']} aria-hidden />
        </Box>
      ) : (
        <Box __css={styles['resizableBar']} {...props}>
          <Divider variant={dividerVariant} />
        </Box>
      )}
    </>
  );
};

const PanelElements = ({ panel, ...props }: { panel: SplitScreenProps['panelA'] | SplitScreenProps['panelB'] }) => {
  const styles = useMultiStyleConfig('SplitScreen', { panelPadding: panel?.padding });

  return (
    <Box __css={styles['panel']} data-loading={panel?.isLoading || undefined} {...props}>
      {!panel?.isLoading && panel?.header && <Box __css={styles['panelHeader']}>{panel?.header}</Box>}
      {panel?.isLoading ? (
        <Loader />
      ) : (
        // Scrollable container should be accessible by keyboard
        // https://dequeuniversity.com/rules/axe/4.8/scrollable-region-focusable?application=axeAPI
        <Box __css={styles['panelContent']} tabIndex={panel?.tabIndex}>
          {panel?.content}
        </Box>
      )}
      {!panel?.isLoading && panel?.footer && <Box __css={styles['panelFooter']}>{panel?.footer}</Box>}
    </Box>
  );
};

const SmallScreensPanelElements = ({
  panel,
  ...props
}: {
  panel: SplitScreenProps['panelA'] | SplitScreenProps['panelB'];
}) => {
  const styles = useMultiStyleConfig('SplitScreen', { panelPadding: panel?.padding });

  return (
    <>
      {!panel?.isLoading && panel?.header && <Box __css={styles['panelHeader']}>{panel?.header}</Box>}
      {/* Scrollable container should be accessible by keyboard */}
      {/* https://dequeuniversity.com/rules/axe/4.8/scrollable-region-focusable?application=axeAPI */}
      <Box __css={styles['panelContent']} {...props} tabIndex={panel?.tabIndex}>
        {panel?.content}
      </Box>
      {!panel?.isLoading && panel?.footer && <Box __css={styles['panelFooter']}>{panel?.footer}</Box>}
    </>
  );
};

/**
 * `SplitScreen` layout organizes elements into two horizontally arranged panels
 */
export const SplitScreen = forwardRef<HTMLDivElement, SplitScreenProps>(
  (
    {
      isLoading,
      header,
      footer,
      panelA,
      panelB,
      variant = '1:2',
      'data-testid': dataTestId = 'split-screen',
      ...props
    },
    ref
  ) => {
    // shouldAllowResizing is allways false, due to accessibility violation, it's been decided not to use the resize option for now - [ME-54308]
    const shouldAllowResizing = false;
    const maxWidth = panelA?.maxWidth ?? 66.67;
    const minWidth = panelA?.minWidth ?? 12.5;
    const styles = useMultiStyleConfig('SplitScreen', {});
    // using useBreakpointValue to detect the small screens 'xs', 's', 'm'.
    const isSmallBreakpoint = useBreakpointValue({ xs: true, l: false });
    const { isExtraSmallScreen: isMobile } = useBreakpoint();
    const isSmallScreensLoading = panelA?.isLoading || panelB?.isLoading;
    const getTestId = useTestId(dataTestId);

    if (isLoading) {
      return (
        <Box
          data-component="SplitScreen"
          __css={styles['container']}
          {...getTestId()}
          {...props}
          ref={ref}
          data-loading
        >
          <Loader />
        </Box>
      );
    }

    if (isSmallBreakpoint) {
      return (
        <Box data-component="SplitScreen" __css={styles['container']} {...getTestId()} {...props} ref={ref}>
          {header}
          <Box __css={styles['panel']} data-loading={isSmallScreensLoading}>
            {isSmallScreensLoading ? (
              <Loader {...getTestId('loader')} />
            ) : (
              <Group variant="vertical" hasDivider spacing={isMobile ? 'xs' : 'none'} height="full">
                <SmallScreensPanelElements panel={panelA} {...getTestId('panel-a')} />
                <SmallScreensPanelElements panel={panelB} {...getTestId('panel-b')} />
              </Group>
            )}
          </Box>
          {footer}
        </Box>
      );
    }

    return (
      <Box data-component="SplitScreen" __css={styles['container']} {...getTestId()} {...props} ref={ref}>
        {header}
        <PanelGroup direction="horizontal">
          <Panel
            id="panelA"
            defaultSizePercentage={variantToSizeMap[variant].panelA}
            minSizePercentage={minWidth}
            maxSizePercentage={maxWidth}
            order={1}
          >
            <PanelElements panel={panelA} {...getTestId('panel-a')} />
          </Panel>
          <ResizeHandle shouldAllowResizing={shouldAllowResizing} {...getTestId('resize-handle')} />
          <Panel id="panelB" defaultSizePercentage={variantToSizeMap[variant].panelB} order={2}>
            <PanelElements panel={panelB} {...getTestId('panel-b')} />
          </Panel>
        </PanelGroup>
        {footer}
      </Box>
    );
  }
);

SplitScreen.displayName = 'SplitScreen';
