import {
  autoUpdate,
  flip,
  offset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { isMobileDevice, useDelayUnmount } from '@melio/penny-utils';
import { createContext, useContext, useEffect, useState } from 'react';

import { getThemeSpacingAsNumber } from '@/theme/foundations/spaces';
import { useFloatingFocus } from '@/utils/useFloatingFocus';

import type { ContextType, UseTooltipOptions, UseTooltipReturn } from './tooltip.types';

export const useTooltip = ({
  placement = 'top',
  isEnabled = true,
  isOpen: controlledOpen,
  onOpenChange: setControlledOpen,
}: UseTooltipOptions): UseTooltipReturn => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = controlledOpen ?? uncontrolledOpen;

  const setIsOpen = setControlledOpen ?? setUncontrolledOpen;

  // Force close the tooltip if `isEnabled` state changes while the tooltip is open.
  useEffect(() => {
    if (isOpen && !isEnabled) {
      setIsOpen(false);
    }
  }, [isEnabled, isOpen, setIsOpen]);

  const isMounted = useDelayUnmount({ isOpen });
  const data = useFloating({
    // Since we removed the `Portal` on mobile, we must change the position to "fixed".
    strategy: isMobileDevice() ? 'fixed' : 'absolute',
    placement,
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset(getThemeSpacingAsNumber('xs')), flip(), shift({ padding: getThemeSpacingAsNumber('m') })],
  });
  const { context } = data;
  const hover = useHover(context, {
    move: false,
    enabled: isEnabled,
    handleClose: safePolygon(),
  });

  const click = useClick(context, {
    enabled: false,
  });
  const focus = useFloatingFocus(context, { enabled: isEnabled, visibleOnly: !isMobileDevice() });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });
  const interactions = useInteractions([hover, click, focus, dismiss, role]);

  return {
    isOpen,
    setIsOpen,
    isMounted,
    ...interactions,
    ...data,
  };
};

export const TooltipContext = createContext<ContextType>(null);

export const useTooltipContext = () => {
  const context = useContext(TooltipContext);

  if (context === null) {
    throw new Error('Tooltip components must be wrapped in <Tooltip />');
  }

  return context;
};
