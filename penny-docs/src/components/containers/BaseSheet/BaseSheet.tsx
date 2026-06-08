import { Box } from '@chakra-ui/react';
import {
  FloatingFocusManager,
  useDismiss,
  useFloating,
  useInteractions,
  useMergeRefs,
  useRole,
} from '@floating-ui/react';
import { isAndroid, useDelayUnmount, useTestId } from '@melio/penny-utils';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';

import { IconButton } from '@/components/action/IconButton';
import { Slide } from '@/components/foundations/transitions/Slide';
import { Blanket } from '@/components/internal/Blanket';
import { Portal } from '@/components/internal/Portal';
import { themeSpaces } from '@/theme/foundations/spaces';
import { zIndices } from '@/theme/foundations/z-indices';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { useHideFromSR } from '@/theme/hooks/useHideFromSR';
import { useScrollBorders } from '@/theme/hooks/useScrollBorders';
import { getAriaProps } from '@/utils/getAriaProps';
import { useDebounceState } from '@/utils/useDebounceState';

import { LoadingContainer } from '../LoadingContainer';
import type { BaseSheetProps } from './BaseSheet.types';
import { CLOSE_BUTTON_DATA_TEST_ID } from './BaseSheet.types';
import { BaseSheetContext } from './BaseSheetContext';

/**
 * The base sheet is a dialog window that overlays the main content of the page.
 */
export const BaseSheet = forwardRef<HTMLDivElement, BaseSheetProps>(
  (
    {
      isOpen,
      onClose,
      onCloseComplete,
      placement = 'left',
      isLoading = false,
      closeButtonAriaLabel = 'Close dialog',
      children,
      paddingX = 's',
      paddingY = 's',
      initialFocus,
      returnFocus,
      isModal,
      onEsc,
      onOverlayClick,
      'data-testid': dataTestId = 'base-sheet',
      ...props
    },
    propRef
  ) => {
    const [isOpenTransitionComplete, setIsOpenTransitionComplete] = useState(false);
    const { refs, context } = useFloating({
      open: isOpen,
      onOpenChange: onClose,
    });
    const containerRef = useRef<HTMLDivElement>(null);
    const {
      isOverflowY: isOverflow,
      scrollAtBottom,
      isMounted: isContentMounted,
    } = useScrollBorders({ ref: containerRef });
    const showFooterBorder = isOverflow && !scrollAtBottom;
    const ref = useMergeRefs([refs.setFloating, propRef, containerRef]);
    const role = useRole(context);
    const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' });
    const { getFloatingProps } = useInteractions([role, dismiss]);
    const getTestId = useTestId(dataTestId);

    useEffect(
      function resetIsOpenTransitionComplete() {
        if (!isOpen) {
          setIsOpenTransitionComplete(false);
        }
      },
      [isOpen]
    );

    const onAnimationComplete = useCallback((definition: string): void => {
      if (definition === 'enter') {
        setIsOpenTransitionComplete(true);
        return;
      }

      onCloseComplete?.();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const styles = useMultiStyleConfig('BaseSheet', { placement, paddingX, paddingY });

    useHideFromSR({
      ignoreEl: containerRef.current,
      enable: isOpen && isOpenTransitionComplete,
    });

    const isMounted = useDelayUnmount({ isOpen });

    const [headerId, setHeaderId] = useDebounceState<string | undefined>(undefined, 500);
    const ariaLabelledby = getAriaProps('aria-labelledby', [headerId ?? undefined]);

    return (
      <BaseSheetContext.Provider
        value={{
          paddingX,
          paddingY,
          onClose,
          closeButtonAriaLabel,
          showFooterBorder,
          isOverflow,
          headerId,
          setHeaderId,
        }}
      >
        {isMounted && (
          <Portal isAlwaysVisible={isModal}>
            <Blanket isOpen={isOpen} onClick={onOverlayClick} isFullScreen data-testid="base-sheet-overlay" />
            <FloatingFocusManager
              context={context}
              initialFocus={initialFocus}
              returnFocus={returnFocus}
              disabled={!isContentMounted || !isOpenTransitionComplete}
            >
              <Slide
                direction={placement}
                in={isOpen}
                style={{
                  zIndex: zIndices.modal,
                  width: placement === 'bottom' ? '100vw' : `calc(100vw - ${themeSpaces.xxxl})`,
                  maxWidth: placement === 'bottom' ? '100vw' : '375px',
                }}
                onAnimationComplete={onAnimationComplete}
                transition={{
                  enter: { duration: 0.3 },
                  exit: { duration: 0.3 },
                }}
                shouldRenderAlternativeSlide={isAndroid()}
                onEsc={onEsc}
              >
                <Box
                  __css={styles['mainContainer']}
                  data-component="BaseSheet"
                  ref={ref}
                  {...getTestId()}
                  {...props}
                  {...ariaLabelledby}
                  {...getFloatingProps()}
                >
                  <Box __css={styles['closeButtonContainer']}>
                    <IconButton
                      variant="naked"
                      size="small"
                      onClick={onClose}
                      icon="close"
                      aria-label={closeButtonAriaLabel}
                      data-testid={CLOSE_BUTTON_DATA_TEST_ID}
                    />
                  </Box>
                  {isLoading ? (
                    <Box __css={styles['loadingContainer']}>
                      <LoadingContainer isLoading />
                    </Box>
                  ) : (
                    children
                  )}
                </Box>
              </Slide>
            </FloatingFocusManager>
          </Portal>
        )}
      </BaseSheetContext.Provider>
    );
  }
);

BaseSheet.displayName = 'BaseSheet';
