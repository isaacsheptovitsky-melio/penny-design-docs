import {
  arrow,
  autoUpdate,
  flip,
  offset,
  type Placement,
  type ReferenceElement,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  type UseFloatingReturn,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { useDelayUnmount } from '@melio/penny-utils';
import { type Dispatch, type RefObject, type SetStateAction } from 'react';

import { getThemeSpacingAsNumber } from '@/theme/foundations/spaces';
import { useControlled } from '@/utils/useControlled';
import { useDebounceState } from '@/utils/useDebounceState';

import { type BasePopoverOpenChangeTriggerEvent } from './BasePopover.types';

export type UsePopoverOptions = {
  /** The event that triggers the popover. @default 'hover' */
  triggerEvent?: 'click' | 'hover';
  /** The default open state of the popover (uncontrolled mode). */
  defaultIsOpen?: boolean;
  /** If true, the popover will be open (controlled mode). */
  isOpen?: boolean;
  /** Callback fired when the popover open state changes. */
  onOpenChange?: (isOpen: boolean, triggerEvent?: BasePopoverOpenChangeTriggerEvent) => void;
  /** The placement of the popover relative to the trigger. @default 'top' */
  placement?: Placement;
  /** Reference to the arrow element for positioning. */
  arrowRef?: RefObject<HTMLDivElement>;
  /** If true, the popover will show an arrow pointing to the trigger. @default true */
  showArrow?: boolean;
  /**
   * Enables animation frame for better performance during scrolling.
   * @see https://floating-ui.com/docs/autoUpdate#animationframe
   */
  enableAnimationFrame?: boolean;
};

export type UsePopoverReturn = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean, triggerEvent: BasePopoverOpenChangeTriggerEvent) => void;
  isMounted: boolean;
  descriptionId?: string;
  setDescriptionId: Dispatch<SetStateAction<string | undefined>>;
  titleId?: string;
  setTitleId: Dispatch<SetStateAction<string | undefined>>;
} & ReturnType<typeof useInteractions> &
  UseFloatingReturn;

const closeDelay = 500;

export const useBasePopover = ({
  triggerEvent = 'hover',
  defaultIsOpen = false,
  placement = 'top',
  isOpen: controlledOpen,
  onOpenChange: onControlledOpenChange,
  arrowRef,
  showArrow,
  enableAnimationFrame = false,
}: UsePopoverOptions): UsePopoverReturn => {
  const [isOpen, onOpenChange] = useControlled(controlledOpen, onControlledOpenChange, defaultIsOpen);
  const [titleId, setTitleId] = useDebounceState<string | undefined>(undefined, 100);
  const [descriptionId, setDescriptionId] = useDebounceState<string | undefined>(undefined, 100);

  const defaultOffset = getThemeSpacingAsNumber('xs');

  const mainAxis = showArrow ? defaultOffset * 2 : defaultOffset;
  const alignmentAxis = showArrow ? getThemeSpacingAsNumber('s') : 0;

  const sharedMiddleware = [
    offset({ mainAxis, alignmentAxis: -alignmentAxis }),
    flip(),
    shift({
      padding: getThemeSpacingAsNumber('m'),
    }),
  ];

  const isMounted = useDelayUnmount({ isOpen });
  const data = useFloating({
    placement,
    open: isOpen,
    onOpenChange: (open) => onOpenChange(open, 'outside'),
    whileElementsMounted: (reference: ReferenceElement, floating: HTMLElement, update: VoidFunction) =>
      autoUpdate(reference, floating, update, { animationFrame: enableAnimationFrame }),
    middleware: arrowRef ? [...sharedMiddleware, arrow({ element: arrowRef })] : sharedMiddleware,
  });
  const { context } = data;

  const triggeredByHover = triggerEvent === 'hover';
  const hover = useHover(context, {
    enabled: triggeredByHover && !controlledOpen,
    handleClose: safePolygon(),
    delay: { close: closeDelay },
  });
  const click = useClick(context, { enabled: !controlledOpen });
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const interactions = useInteractions([hover, click, dismiss, role]);

  return {
    isOpen,
    onOpenChange,
    isMounted,
    ...interactions,
    ...data,
    descriptionId,
    setDescriptionId,
    titleId,
    setTitleId,
  };
};
