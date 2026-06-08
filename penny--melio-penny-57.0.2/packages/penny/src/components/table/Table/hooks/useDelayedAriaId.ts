import { isVitestEnv, isWindowsOS } from '@melio/penny-utils';
import { useCallback, useRef, useState } from 'react';

/**
 * Custom hook that manages the delayed visibility of an ARIA ID on focus and blur events.
 * If the environment is not Windows, the ARIA ID is always visible.
 * If the environment is Windows and not a test environment (Vitest), the ARIA ID visibility is delayed on focus.
 *
 * @param delay - The delay in milliseconds before showing the ARIA ID (default is 100ms).
 * @returns An object containing `shouldShowId` (boolean), `handleFocus` (focus event handler),
 * and `handleBlur` (blur event handler).
 */
export const useDelayedAriaId = (delay: number = 100) => {
  const [shouldShowId, setShouldShowId] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [announceKey, setAnnounceKey] = useState(0);

  // Detect if the environment is Windows and not a test environment
  const isWindowEnv = isWindowsOS() && !isVitestEnv();

  const handleFocus = useCallback(() => {
    // If on Windows, introduce a delay to show ARIA ID
    if (isWindowEnv) {
      timeoutRef.current = setTimeout(() => setShouldShowId(true), delay);
    } else {
      // Always show the ARIA ID immediately in non-Windows environments
      setShouldShowId(true);
    }
    setAnnounceKey((prev) => prev + 1); // Increment announce key
  }, [delay, isWindowEnv]);

  const handleBlur = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShouldShowId(false);
  }, []);

  // Ensure ARIA ID is always visible for non-Windows environments, without causing re-renders
  if (!isWindowEnv && !shouldShowId) {
    setShouldShowId(true);
  }

  return { shouldShowId, handleFocus, handleBlur, announceKey };
};
