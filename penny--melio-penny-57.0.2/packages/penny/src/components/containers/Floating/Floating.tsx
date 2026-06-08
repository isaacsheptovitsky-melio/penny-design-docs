import { useMergeRefs } from '@floating-ui/react';
import { isMobileIOS, useDelayUnmount, useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { Floater } from '@/components/internal/Floater';

import { FloatingContainer, Trigger as FloatingTrigger } from './components';
import { useFloatingElement } from './hooks';
import { type FloatingProps } from './types';

/**
 * The `Floating` component connects a trigger element with a floating element,
 * allowing you to create any accessible and interactive UI elements you need.
 */
export const Floating = forwardRef<HTMLDivElement, FloatingProps>(
  (
    {
      trigger,
      placement = 'bottom-start',
      triggerDropdownGap = 8,
      role = 'dialog',
      'data-testid': dataTestId = 'floating',
      ...props
    },
    propRef
  ) => {
    const { triggerProps, floatingProps } = useFloatingElement({
      role,
      placement,
      triggerDropdownGap,
      ...props,
    });

    const {
      setFloatingRef,
      initialFocus,
      context,
      closeOnFocusOut,
      returnFocus,
      shouldTrapFocus,
      isOpen,
      ...restFloatingProps
    } = floatingProps;

    const ref = useMergeRefs([setFloatingRef, propRef]);
    const getTestId = useTestId(dataTestId);

    // We are using delay on mobile devices to give time to the focus to return to it's place when selecting and closing the dropdown.
    const isMounted = useDelayUnmount({ isOpen });
    const isOpenByCondition = isMobileIOS() ? isMounted : isOpen;

    return (
      <>
        <FloatingTrigger {...triggerProps}>{trigger}</FloatingTrigger>
        <Floater
          isOpen={isOpenByCondition}
          data-component="Floating"
          as={FloatingContainer}
          ref={ref}
          focusManagerProps={{ modal: shouldTrapFocus, context, closeOnFocusOut, initialFocus, returnFocus }}
          {...getTestId()}
          {...restFloatingProps}
        />
      </>
    );
  }
);

Floating.displayName = 'Floating';
