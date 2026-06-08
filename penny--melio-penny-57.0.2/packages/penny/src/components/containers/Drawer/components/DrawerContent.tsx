import { Box } from '@chakra-ui/react';
import { useMergeRefs } from '@floating-ui/react';
import { isAndroid } from '@melio/penny-utils';
import { forwardRef, useCallback, useRef } from 'react';

import { Slide } from '@/components/foundations/transitions/Slide';
import { Blanket } from '@/components/internal/Blanket';
import { Floater } from '@/components/internal/Floater';
import { zIndices } from '@/theme/foundations/z-indices';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { useHideFromSR } from '@/theme/hooks/useHideFromSR';

import { useDrawerContext } from '../DrawerContext';
import { useDrawerSize } from '../hooks';
import type { DrawerContentProps } from './DrawerContent.type';

/**
 * @private For internal use only. Should be consumed only by `Drawer`.
 */
export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>((props, propRef) => {
  const styles = useMultiStyleConfig('Drawer', {});
  const {
    context,
    isOpen,
    isMounted,
    onClose,
    onCloseComplete,
    getFloatingProps,
    refs,
    labelId,
    descriptionId,
    getTestId,
    shouldReturnFocus,
    shouldRestoreFocus,
    size,
    onEsc,
    onOverlayClick,
  } = useDrawerContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useMergeRefs([refs.setFloating, propRef, containerRef]);
  const maxWidth = useDrawerSize(size);

  const onAnimationComplete = useCallback(
    (definition: string) => {
      if (definition === 'enter') return;

      onCloseComplete?.();
    },
    [onCloseComplete]
  );

  const onEscClickHandler = () => {
    onEsc?.();
    onClose();
  };

  const onOverlayClickHandler = () => {
    onOverlayClick?.();
    onClose();
  };

  useHideFromSR({
    // eslint-disable-next-line react-hooks/refs
    ignoreEl: containerRef.current,
    enable: isOpen,
  });

  return (
    <Floater
      isOpen={isMounted}
      overlay={<Blanket isOpen={isOpen} isFullScreen {...getTestId('overlay')} onClick={onOverlayClickHandler} />}
      focusManagerProps={{ context, returnFocus: shouldReturnFocus, restoreFocus: shouldRestoreFocus }}
    >
      <Slide
        direction="right"
        in={isOpen}
        style={{
          zIndex: zIndices.modal,
          width: '100%',
          maxWidth,
        }}
        onAnimationComplete={onAnimationComplete}
        transition={{
          enter: { duration: 0.3 },
          exit: { duration: 0.3 },
        }}
        shouldRenderAlternativeSlide={isAndroid()}
        onEsc={onEscClickHandler}
      >
        <Box
          __css={styles['content']}
          ref={ref}
          aria-labelledby={labelId}
          aria-describedby={descriptionId}
          aria-modal
          {...getTestId()}
          {...getFloatingProps(props)}
        />
      </Slide>
    </Floater>
  );
});

DrawerContent.displayName = 'DrawerContent';
