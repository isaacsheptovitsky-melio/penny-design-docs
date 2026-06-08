import { Box } from '@chakra-ui/react';
import { FloatingOverlay } from '@floating-ui/react';
import { type TestIdProp, useTestId } from '@melio/penny-utils';
import { forwardRef, useCallback } from 'react';

import { Icon, type IconProps } from '@/components/foundations/Icon';
import { Loader, type LoaderProps } from '@/components/foundations/Loader';
import { Fade, type FadeProps } from '@/components/foundations/transitions/Fade';
import { zIndices } from '@/theme/foundations/z-indices';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { useBlanket } from '@/theme/providers/BlanketProvider';

/**
 * @private For internal use only
 */

export type BlanketProps = {
  variant?: 'light' | 'dark' | 'darker';
  icon?: IconProps['type'];
  isFullScreen?: boolean;
  isLoading?: boolean;
  onClick?: VoidFunction;
  isOpen?: boolean;
} & Pick<LoaderProps, 'hideLoadingText' | 'loadingText'> &
  TestIdProp;

export const fadeStyle: FadeProps['style'] = { zIndex: zIndices.docked, inset: 0 };

/**
 * @private For internal use only
 */

export const Blanket = forwardRef<HTMLDivElement, BlanketProps>(
  (
    {
      isOpen = false,
      icon,
      isFullScreen,
      variant,
      isLoading,
      onClick,
      loadingText,
      hideLoadingText,
      'data-testid': dataTestId = 'blanket',
      ...props
    },
    ref
  ) => {
    const styles = useMultiStyleConfig('Blanket', {
      variant: variant ?? (isFullScreen ? 'darker' : 'dark'),
      isFullScreen,
      isLoading,
    });
    const getTestId = useTestId(dataTestId);

    const handleClick = useCallback(() => {
      if (!isFullScreen) return;
      if (onClick) onClick();
    }, [isFullScreen, onClick]);

    const BlanketOverride = useBlanket();

    return (
      <Fade
        in={isOpen}
        unmountOnExit
        transition={{
          enter: { duration: 0.1 },
          exit: { duration: 0.1 },
        }}
        style={{ ...fadeStyle, position: isFullScreen ? 'fixed' : 'absolute' }}
      >
        <Box
          data-component="Blanket"
          __css={styles['container']}
          ref={ref}
          onClick={handleClick}
          {...props}
          {...getTestId()}
          // Leveraging `FloatingOverlay` to lock scroll when `isFullScreen`.
          {...(isFullScreen && {
            as: FloatingOverlay,
            lockScroll: true,
          })}
        >
          {/* TODO:https://meliorisk.atlassian.net/browse/ME-110373 */}
          {/* eslint-disable-next-line react-hooks/static-components */}
          {BlanketOverride && <BlanketOverride isOpen={isOpen} isFullScreen={isFullScreen} />}

          {isLoading ? (
            <Loader
              {...getTestId('loader')}
              color={variant !== 'light' ? 'semantic.text.inverse' : undefined}
              hideLoadingText={hideLoadingText}
              loadingText={loadingText}
            />
          ) : (
            icon && (
              <Box __css={styles['icon']}>
                <Icon type={icon} color={variant === 'light' ? 'default' : 'inverse'} />
              </Box>
            )
          )}
        </Box>
      </Fade>
    );
  }
);

Blanket.displayName = 'Blanket';
