import { isWindowsOS } from '@melio/penny-utils';
import { type Dispatch, type KeyboardEvent, type SetStateAction, useEffect, useMemo, useRef, useState } from 'react';

// Keys that do not represent character input
const NON_CHARACTER_KEYS = new Set([
  'Enter',
  'Escape',
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'Tab',
  'Backspace',
  'Delete',
  'Shift',
  'Control',
  'Alt',
  'Meta',
]);

type UseLiveRegionActivationReturn = {
  handleOnKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  setIsFocusedWithin: Dispatch<SetStateAction<boolean>>;
  announceKey: number;
  isAriaRegionActive: boolean;
};

/**
 * Hook to manage live region activation for accessibility purposes.
 * Dynamically activates a live region to announce messages when:
 * - Typing has stopped
 * - The field is focused
 * - A new message is available
 *
 * This hook ensures that the screen reader only announces messages when they are relevant
 * and avoids redundant announcements for unchanged messages.
 *
 * // Example usage
 * const { handleOnKeyDown, setIsFocusedWithin, announceKey, isAriaRegionActive } =
 *   useLiveRegionActivation('Error: Invalid email address.');
 *
 * <div
 *   onFocus={() => setIsFocusedWithin(true)}
 *   onBlur={() => setIsFocusedWithin(false)}
 * >
 *   <input type="text" onKeyDown={handleOnKeyDown} />
 *   {isAriaRegionActive && <div key={announceKey} role="alert">{message}</div>}
 * </div>
 */
export const useLiveRegionActivation = (message = ''): UseLiveRegionActivationReturn => {
  const [announceKey, setAnnounceKey] = useState(0);
  const [isAriaRegionActive, setIsAriaRegionActive] = useState(false);
  const [isFocusedWithin, setIsFocusedWithin] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const previousMessageRef = useRef<string>('');

  /**
   * Detects typing activity in the input field and updates the typing state.
   * Ignores non-character keys like `Enter`, `Escape`, and arrows.
   */
  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!NON_CHARACTER_KEYS.has(event.key) && event.key.length === 1) {
      setIsTyping(true);

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

      typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 500);
    }
  };

  /**
   * Cleans up typing and debounce timeouts on component unmount.
   */
  useEffect(
    () => () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    }, // Cleanup on unmount
    []
  );

  /**
   * Determines if the message should be announced to the screen reader.
   * The message is announced if:
   * - The field is focused
   * - Typing has stopped
   * - The message exists and has changed
   * - The system is not Windows (custom behavior for WindowsOS)
   */
  const shouldAnnounce = useMemo(
    // TODO:https://meliorisk.atlassian.net/browse/ME-110373
    /* eslint-disable-next-line react-hooks/refs */
    () => !isWindowsOS() && isFocusedWithin && !isTyping && message && message !== previousMessageRef.current,
    [isFocusedWithin, isTyping, message]
  );

  /**
   * Handles live region updates when the announcement state changes.
   * Sets the live region to active and increments the announce key for updates.
   * Updates the previously announced message to avoid redundant announcements.
   */
  useEffect(() => {
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);

    if (shouldAnnounce) {
      debounceTimeoutRef.current = setTimeout(() => {
        setIsAriaRegionActive(true);
        previousMessageRef.current = message; // Update the previous message
        setAnnounceKey((prev) => prev + 1); // Increment announce key
      }, 500);
    } else {
      setIsAriaRegionActive(false);
      if (!message) {
        previousMessageRef.current = ''; // Clear previous message if no message exists
      }
      if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    }
  }, [shouldAnnounce, message]);

  return {
    handleOnKeyDown,
    setIsFocusedWithin,
    announceKey,
    isAriaRegionActive,
  };
};
