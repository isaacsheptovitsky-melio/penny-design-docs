import { autoUpdate, useClick, useDismiss, useFloating, useInteractions, useRole } from '@floating-ui/react';
import { isMobileDevice } from '@melio/penny-utils';

import { type UseFloatingElementOptions, type UseFloatingElementReturn } from './types';
import { getMiddleware } from './useFloatingElement.utils';

/**
 * A custom hook to manage floating UI elements for the floating component.
 * Provides positioning, interaction handling, and accessibility features using @floating-ui/react.
 *
 * @param {UseFloatingElementOptions} options - Configuration options for the floating element.
 * @returns {UseFloatingElementReturn} Props for the trigger and content elements.
 */
export const useFloatingElement = ({
  isOpen,
  onOpenChange: setIsOpen,
  placement,
  role,
  triggerDropdownGap,
  shouldFitAvailableHeight,
  isDisabled,
  middleware,
  whileElementsMounted,
  ...props
}: UseFloatingElementOptions): UseFloatingElementReturn => {
  const { context, ...data } = useFloating({
    open: isOpen,
    onOpenChange: (open, event, reason) => {
      // This detection avoids a bug on mobile with screen readers, which causes the dropdown to close without selecting the item.
      if (isMobileDevice() && (event as PointerEvent).pointerType === 'touch' && reason === 'outside-press') return;
      if (isDisabled) return;
      setIsOpen(open, open ? 'trigger' : 'outside');
    },
    placement,
    middleware: getMiddleware({ middleware, triggerDropdownGap, shouldFitAvailableHeight }),
    whileElementsMounted: whileElementsMounted ?? autoUpdate,
  });
  const click = useClick(context);
  const floatingRole = useRole(context, { role });
  const dismiss = useDismiss(context);

  const interactions = useInteractions([click, floatingRole, dismiss]);

  const { getReferenceProps, getFloatingProps } = interactions;
  const { floatingStyles, refs } = data;

  const triggerProps = { getReferenceProps, setTriggerRef: refs.setReference, isDisabled };

  const floatingProps = {
    isOpen: !isDisabled && isOpen,
    role,
    context,
    setFloatingRef: refs.setFloating,
    styles: floatingStyles,
    ...props,
    ...getFloatingProps({
      ...props,
      onKeyDown: (e) => {
        e.stopPropagation();
      },
    }),
  };

  return {
    triggerProps,
    floatingProps,
  };
};
