import { isIOS, isMacOS, uniqueId } from '@melio/penny-utils';
import {
  type FocusEvent,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type RefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

type ActionAreaEvents<T> = Pick<
  HTMLAttributes<T>,
  'onClick' | 'onMouseEnter' | 'onMouseLeave' | 'onFocus' | 'onBlur' | 'onMouseDown' | 'onKeyDown'
>;

type UseActionAreaReturnType<T> = {
  containerProps: {
    'data-hover': true | null;
    'data-focus-visible': true | null;
    id?: string;
  };
  actionAreaProps: { ref: RefObject<T>; disabled?: boolean } & HTMLAttributes<T> & ActionAreaEvents<T>;
};

export type UseActionAreaProps<T extends HTMLElement = HTMLButtonElement> = {
  isDisabled?: boolean;
  id?: string;
} & ActionAreaEvents<T>;

const isInsideElementRect = <T extends HTMLElement = HTMLButtonElement>(elementRect: DOMRect, event: MouseEvent<T>) =>
  event.clientX >= elementRect.left &&
  event.clientX <= elementRect.right &&
  event.clientY >= elementRect.top &&
  event.clientY <= elementRect.bottom;

/**
 * useActionArea is a hook for managing hover, focus, and keyboard interactions on interactive elements.
 *
 * Features:
 * - Handles hover, focus-visible, and keyboard states.
 * - Supports `Space` and `Enter` for triggering `onClick`.
 * - Includes refs and ARIA attributes for accessibility.
 */
export const useActionArea = <T extends HTMLElement = HTMLButtonElement>(
  props?: UseActionAreaProps
): UseActionAreaReturnType<T> => {
  const { id, onClick, onMouseEnter, onMouseLeave, onFocus, onBlur, onMouseDown, onKeyDown, isDisabled } = props || {};
  const actionAreaRef = useRef<T>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusVisible, setIsFocusVisible] = useState(false);
  const [isKeyboardFocusDetection, setIsKeyboardFocusDetection] = useState(false);

  const handleMouseEnter = useCallback(
    (event: MouseEvent<T>) => {
      if (isDisabled) return;
      setIsHovered(true);
      onMouseEnter?.(event as unknown as MouseEvent<HTMLButtonElement>);
    },
    [isDisabled, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (event: MouseEvent<T>) => {
      if (isDisabled || !actionAreaRef.current) return;

      const elementRect = actionAreaRef.current.getBoundingClientRect();

      if (!isInsideElementRect(elementRect, event)) {
        setIsHovered(false);
        onMouseLeave?.(event as unknown as MouseEvent<HTMLButtonElement>);
      }
    },
    [isDisabled, onMouseLeave]
  );

  const handleMouseDown = useCallback(
    (event: MouseEvent<T>) => {
      if (isDisabled) return;
      setIsKeyboardFocusDetection(false);
      // Apply blur only on iOS and macOS and avoid blurring on Windows and Android to prevent losing the focus indicator
      if (isIOS() && isMacOS()) {
        actionAreaRef.current?.blur();
      }
      onMouseDown?.(event as unknown as MouseEvent<HTMLButtonElement>);
    },
    [isDisabled, onMouseDown]
  );

  const handleFocus = useCallback(
    (event: FocusEvent) => {
      if (isDisabled) return;

      // Assume focus is keyboard-driven if no prior mouse interaction
      if (isKeyboardFocusDetection || !isHovered) {
        setIsFocusVisible(true);
      }
      onFocus?.(event as unknown as FocusEvent<HTMLButtonElement>);
    },
    [isDisabled, isHovered, isKeyboardFocusDetection, onFocus]
  );

  const handleBlur = useCallback(
    (event: FocusEvent) => {
      if (isDisabled) return;
      setIsFocusVisible(false);
      onBlur?.(event as unknown as FocusEvent<HTMLButtonElement>);
    },
    [isDisabled, onBlur]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<T>) => {
      if (isDisabled) return;

      if (event.code === 'Space' || event.code === 'Enter') {
        event.preventDefault();
        onClick?.(event as unknown as MouseEvent<HTMLButtonElement>);
      }

      if (event.code === 'Tab') {
        setIsKeyboardFocusDetection(true);
        actionAreaRef.current?.focus();
      }

      onKeyDown?.(event as unknown as KeyboardEvent<HTMLButtonElement>);
    },
    [isDisabled, onClick, onKeyDown]
  );

  const handleClick = useCallback(
    (event: MouseEvent<T>) => {
      if (isDisabled) return;
      onClick?.(event as unknown as MouseEvent<HTMLButtonElement>);
    },
    [isDisabled, onClick]
  );

  const associatedId = useMemo(() => id ?? uniqueId('action-area-'), [id]);

  return {
    containerProps: {
      'data-hover': isHovered || null,
      'data-focus-visible': isFocusVisible || null,
      id: associatedId,
    },
    actionAreaProps: {
      ref: actionAreaRef,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onMouseDown: handleMouseDown,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
      onClick: handleClick,
      'aria-labelledby': associatedId,
      disabled: isDisabled,
    },
  };
};
