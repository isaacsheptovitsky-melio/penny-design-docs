import { useId } from '@floating-ui/react';
import { uniqueId } from '@melio/penny-utils';
import { forwardRef, useMemo } from 'react';

import { Divider } from '@/components/dataDisplay/Divider';

import { Container } from '../Container';
import { LoadingContainer } from '../LoadingContainer';
import { DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader } from './components';
import { type DrawerProps } from './Drawer.types';
import { DrawerContext } from './DrawerContext';
import { useDrawer } from './hooks';

/**
 * The drawer is a dialog window that overlays the main content of a page.
 */
export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      isOpen,
      onClose,
      onCloseComplete,
      'data-testid': dataTestId,
      closeButtonAriaLabel,
      header,
      headerProps,
      body,
      footer,
      footerProps,
      isLoading,
      closeButtonAriaLabelledBy,
      shouldReturnFocus,
      shouldRestoreFocus,
      'aria-labelledby': ariaLabelledby,
      size,
      onEsc,
      onOverlayClick,
      ...otherProps
    },
    ref
  ) => {
    const loaderId = useMemo(() => uniqueId('loader-'), []);
    const id = useId();
    // make sure the loaderId is only added when the button is loading, to avoid adding invalid value to aria-labelledby.
    const closeAriaLabeledBy = useMemo(() => {
      const value = [isLoading ? loaderId : undefined, closeButtonAriaLabelledBy].filter((id) => !!id).join(' ');
      return value ? { 'aria-labelledby': value } : {};
    }, [closeButtonAriaLabelledBy, isLoading, loaderId]);

    return (
      <DrawerContext.Provider
        value={useDrawer({
          isOpen,
          onClose,
          onCloseComplete,
          'data-testid': dataTestId,
          closeButtonAriaLabel,
          shouldReturnFocus,
          shouldRestoreFocus,
          size,
          onEsc,
          onOverlayClick,
        })}
      >
        {/* The aria-describedby attribute is set to undefined to prevent the SR from announcing the DrawerBody (ME-65396). */}
        {/* The aria-labelledby attribute is set to undefined by default but can be override. */}
        <DrawerContent
          data-component="Drawer"
          ref={ref}
          {...otherProps}
          id={`floating-${id}`}
          aria-describedby={undefined}
          aria-labelledby={ariaLabelledby}
        >
          <DrawerHeader data-component="DrawerHeader" {...headerProps}>
            <DrawerCloseButton
              data-component="DrawerCloseButton"
              /**
               * use aria-labelledby to reference an element that dynamically updates based on the button’s state.
               * This allows you to maintain a descriptive label while also indicating the loading state
               */
              {...closeAriaLabeledBy}
            />
            <Container width="full">{header}</Container>
          </DrawerHeader>
          <Divider />
          {isLoading ? (
            <LoadingContainer isLoading id={loaderId} />
          ) : (
            <>
              <DrawerBody data-component="DrawerBody">{body}</DrawerBody>
              {footer && (
                <DrawerFooter data-component="DrawerFooter" {...footerProps}>
                  {footer}
                </DrawerFooter>
              )}
            </>
          )}
        </DrawerContent>
      </DrawerContext.Provider>
    );
  }
);

Drawer.displayName = 'Drawer';
