import { Box, Modal as ChakraModal, ModalContent } from '@chakra-ui/react';
import { FloatingFocusManager, useFloating, useMergeRefs } from '@floating-ui/react';
import { useActiveElementIndex, useTestId } from '@melio/penny-utils';
import { forwardRef, useEffect, useRef, useState } from 'react';

import { Blanket } from '@/components/internal/Blanket';
import { Portal } from '@/components/internal/Portal';
import { useHideFromSR } from '@/theme/hooks';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { useBreakpoint } from '@/theme/providers/BreakpointProvider';

import { BaseSheet } from '../../BaseSheet';
import { LoadingContainer } from '../../LoadingContainer';
import { type BaseModalProps } from './BaseModal.types';
import { BASE_MODAL_DEFAULT_DATA_TEST_ID } from './BaseModal.utils';
import { BaseModalCloseButton } from './components';
import { DesktopModalContext } from './DesktopModalContext';
import { useDispatchState } from './useDispatchState';

/**
 * The modal is a dialog window that overlays the main content of a page.
 */
export const BaseModal = forwardRef<HTMLDivElement, BaseModalProps>(
  (
    {
      isOpen,
      onClose,
      size = 'small',
      children,
      isLoading,
      closeButtonAriaLabel,
      role = 'dialog',
      'aria-modal': ariaModal,
      shouldReturnFocus = true,
      'data-testid': dataTestId = BASE_MODAL_DEFAULT_DATA_TEST_ID,
      onEsc,
      onOverlayClick,
      ...props
    },
    ref
  ) => {
    const { isExtraSmallScreen: isMobile } = useBreakpoint();
    const getTestId = useTestId(dataTestId);
    const { context, refs } = useFloating({
      open: isOpen,
    });

    const [wasModalBodyMounted, setWasModalBodyMounted] = useState(false);
    const { activeElementIndex, setActiveElementRef, resetActiveElementIndex } = useActiveElementIndex();

    useEffect(() => {
      if (!isOpen) {
        resetActiveElementIndex();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    const styles = useMultiStyleConfig('BaseModal', {
      size,
      isLoading,
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const modalRef = useMergeRefs([ref, refs.setFloating, setActiveElementRef, containerRef]);
    const bottomSheetRef = useMergeRefs([ref, setActiveElementRef]);

    useDispatchState(isOpen);

    useHideFromSR({
      ignoreEl: containerRef.current,
      enable: isOpen,
    });

    // This will set Chakra's aria-modal to `false` so SR will announce tooltip inside the modal
    // `useHideFromSR` should be enough to hide the elements outside the modal from SR
    // http://localhost:6006/?path=/story/containers-modals-status-modal-pattern--bug-drawer
    useEffect(() => {
      if (ariaModal === false && wasModalBodyMounted && containerRef.current) {
        containerRef.current.removeAttribute('aria-modal');
      }
    }, [wasModalBodyMounted, ariaModal]);

    return isMobile ? (
      <BaseSheet
        {...props}
        ref={bottomSheetRef}
        isOpen={isOpen}
        onClose={onClose}
        isLoading={isLoading}
        closeButtonAriaLabel={closeButtonAriaLabel}
        initialFocus={activeElementIndex}
        returnFocus={shouldReturnFocus}
        onOverlayClick={onOverlayClick}
        onEsc={onEsc}
        {...getTestId()}
        isModal
        placement="bottom"
      >
        <Box __css={styles['mobileModalContent']}>{children}</Box>
      </BaseSheet>
    ) : (
      <DesktopModalContext.Provider value={{ setIsBodyMounted: setWasModalBodyMounted }}>
        <ChakraModal
          isOpen={isOpen}
          size="unset"
          trapFocus={false}
          onClose={onClose}
          onEsc={onEsc}
          onOverlayClick={onOverlayClick}
        >
          <Portal isAlwaysVisible>
            <Blanket isOpen={isOpen} isFullScreen {...getTestId('overlay')} />
            <FloatingFocusManager context={context} initialFocus={activeElementIndex} returnFocus={shouldReturnFocus}>
              <ModalContent
                data-component="BaseModal"
                {...getTestId()}
                ref={modalRef}
                {...props}
                sx={styles['modalContent']}
                role={role}
              >
                <Box __css={styles['modalFloatingContent']}>
                  <BaseModalCloseButton closeButtonAriaLabel={closeButtonAriaLabel} />
                  {isLoading ? <LoadingContainer isLoading /> : children}
                </Box>
              </ModalContent>
            </FloatingFocusManager>
          </Portal>
        </ChakraModal>
      </DesktopModalContext.Provider>
    );
  }
);

BaseModal.displayName = 'BaseModal';
