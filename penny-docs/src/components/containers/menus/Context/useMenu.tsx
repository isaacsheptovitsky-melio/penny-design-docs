import {
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead,
} from '@floating-ui/react';
import { isMobileDevice } from '@melio/penny-utils';
import { createContext, useContext, useRef, useState } from 'react';

import { type ContextType, type OpenChangeTriggerEvent, type UseMenuOptions, type UseMenuReturn } from './types';
import { calculateMaxHeight } from './utils/calculateMaxHeight';

export const useMenu = ({
  isOpen,
  isTypingRef,
  onOpenChange: setIsOpen,
  width,
  disableMenuTransform,
  disableMenuShift,
  disableTypeahead,
  disablePressOutsideDissmis,
  disableOpenByTriggerClick,
  isVirtualList,
  focusItemOnOpen,
  role = 'menu',
  triggerDropdownGap = 8,
  placement = 'bottom-start',
  trigger,
  isDisabled,
  isReadOnly,
  initialFocus,
  shouldFitAvailableHeight = true,
  maxHeight,
  focusItemOnHover = true,
  ...props
}: UseMenuOptions): UseMenuReturn => {
  const _setIsOpen = (open: boolean, triggerEvent: OpenChangeTriggerEvent) => {
    setIsOpen(open, triggerEvent);
  };
  const { context, ...data } = useFloating({
    open: isOpen,
    onOpenChange: (open, event, reason) => {
      // This detection avoids a bug on mobile with screen readers, which causes the dropdown to close without selecting the item.
      if (isMobileDevice() && (event as PointerEvent).pointerType === 'touch' && reason === 'outside-press') return;

      _setIsOpen(open, open ? 'trigger' : 'outside');
    },
    placement,
    transform: !disableMenuTransform,
    middleware: [
      offset({
        mainAxis: triggerDropdownGap,
        alignmentAxis: 0,
      }),
      flip(),
      !disableMenuShift && shift(),
      // The `width` prop doesn't update when inside the `size` middleware, so we need to check it before.
      width === 'match-trigger'
        ? size({
            apply: ({ rects, availableHeight, elements }) => {
              if (data.refs.floating.current) {
                Object.assign(data.refs.floating.current.style, {
                  width: `${rects.reference.width}px`,
                });
              }
              if (shouldFitAvailableHeight) {
                const finalHeight = calculateMaxHeight(availableHeight, maxHeight);
                elements.floating.style.maxHeight = `${finalHeight}px`;
              }
            },
          })
        : size({
            apply: ({ availableHeight, elements }) => {
              if (shouldFitAvailableHeight) {
                const finalHeight = calculateMaxHeight(availableHeight, maxHeight);
                elements.floating.style.maxHeight = `${finalHeight}px`;
              }
            },
          }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const elementsRef = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);

  const listNavigation = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    onNavigate: setActiveIndex,
    focusItemOnOpen,
    loop: true,
    virtual: isVirtualList,
    focusItemOnHover,
    disabledIndices: [],
  });

  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    onMatch: setActiveIndex,
    enabled: !disableTypeahead,
    onTypingChange: (isTypeing) => {
      if (!disableTypeahead && isTypingRef) {
        isTypingRef.current = isTypeing;
      }
    },
    resetMs: 1000,
  });

  const click = useClick(context, { enabled: !disableOpenByTriggerClick });
  const menuRole = useRole(context, { role });
  const dismiss = useDismiss(context, {
    outsidePress: !disablePressOutsideDissmis,
  });

  const interactions = useInteractions([click, menuRole, dismiss, listNavigation, typeahead]);

  const triggerProps = {
    trigger,
    isReadOnly,
    isDisabled,
  };

  const dropdownProps = {
    role,
    width,
    initialFocus,
    maxHeight,
    ...props,
  };

  return {
    ...data,
    ...interactions,
    activeIndex,
    isTypingRef,
    setActiveIndex,
    elementsRef,
    labelsRef,
    context,
    isOpen,
    setIsOpen,
    triggerProps,
    dropdownProps,
  };
};

export const MenuContext = createContext<ContextType>({} as ContextType);

export const useMenuContext = () => useContext(MenuContext);
