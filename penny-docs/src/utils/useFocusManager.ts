import { type MutableRefObject, type RefObject, useEffect, useRef } from 'react';

/**
 * useFocusManager hook manages focus based on the isActive state.
 *
 * When `isActive` is `true`, it stores the currently focused element
 * (or a specified element via `otherRef`) and shifts focus to a target element.
 * When `isActive` becomes `false`, it restores focus to the previously focused element.
 *
 * Useful for scenarios like loaders, modals, popups, or any temporary UI state that requires controlled focus management.
 *
 * @param {boolean} isActive - Determines when focus management is active.
 * @param {RefObject<HTMLElement>} [otherRef=null] - Optional reference to an element to be focused or stored.
 * @returns {RefObject<HTMLElement>} - Ref to attach to the element that should be focused when isActive is true.
 */
export const useFocusManager = <T extends HTMLElement>(
  isActive: boolean = false,
  otherRef?: MutableRefObject<T | null>
): RefObject<T> => {
  const activeElementRef = useRef<T | null>(null);
  const focusElementRef = useRef<T>(null);

  useEffect(() => {
    const focusElement = focusElementRef.current;

    if (isActive) {
      // Store the currently focused element
      activeElementRef.current = otherRef?.current ?? (document.activeElement as T);

      // Set focus on the target element if it exists
      if (focusElement) {
        focusElement.setAttribute('tabindex', '-1');
        focusElement.focus();
      }
    } else {
      // Restore focus to the previously active element
      if (activeElementRef.current?.focus) {
        activeElementRef.current.focus();
      }

      // Clean up: remove tabindex from the target element
      if (focusElement) {
        focusElement.removeAttribute('tabindex');
      }
    }

    // Cleanup function to run when the component unmounts or isActive changes
    return () => {
      if (focusElement) {
        focusElement.removeAttribute('tabindex');
      }
    };
  }, [isActive, otherRef]);

  // Return the ref to be used by the target element
  return focusElementRef;
};
