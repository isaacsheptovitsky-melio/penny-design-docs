import { Box } from '@chakra-ui/react';
import { forwardRef, useEffect, useState } from 'react';

import { Slide } from '@/components/foundations/transitions/Slide';
import { zIndices } from '@/theme/foundations';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import type { PanelProps } from './Panel.types';
import { PanelContainer } from './parts/PanelContainer';

/**
 * The Panel is a container that can stick to the top, bottom, left, or right of its container.
 */
export const Panel = forwardRef<HTMLDivElement, PanelProps>(
  (
    {
      backgroundColor,
      placement = 'bottom',
      position = 'sticky',
      children,
      paddingX,
      paddingY,
      transitionConfig,
      maxWidth,
      width,
      borderRadius = 'global.200',
      ...props
    },
    ref
  ) => {
    const [isPanelExitOver, setIsPanelExitOver] = useState(!transitionConfig?.in);
    const styles = useMultiStyleConfig('Panel', { backgroundColor, paddingX, paddingY, maxWidth, width, borderRadius });

    useEffect(() => {
      if (transitionConfig?.in) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsPanelExitOver(false);
      }
    }, [transitionConfig?.in]);

    // Detects if the panel's slide is horizontal to adjust the height or width.
    const isHorizontal = placement === 'top' || placement === 'bottom';

    const onAnimationComplete = (definition: string) => {
      if (definition === 'exit') {
        setIsPanelExitOver(true);
      }
    };

    const bar = (
      <Box __css={styles['bar']} data-placement={placement}>
        {children}
      </Box>
    );

    if (transitionConfig) {
      const panelNotVisible = !transitionConfig?.in && isPanelExitOver;

      if (panelNotVisible) {
        return null;
      }

      return (
        <PanelContainer
          placement={placement}
          position={position}
          transitionConfig={transitionConfig}
          width={width}
          maxWidth={maxWidth}
          {...props}
          ref={ref}
        >
          <Slide
            {...transitionConfig}
            data-placement={placement}
            style={{
              zIndex: zIndices.docked,
              position: 'relative',
              height: isHorizontal ? 'auto' : '100%',
              width: isHorizontal ? '100%' : 'auto',
            }}
            direction={placement}
            onAnimationComplete={onAnimationComplete}
          >
            {bar}
          </Slide>
        </PanelContainer>
      );
    }

    return (
      <PanelContainer placement={placement} position={position} width={width} maxWidth={maxWidth} {...props} ref={ref}>
        {bar}
      </PanelContainer>
    );
  }
);

Panel.displayName = 'Panel';
