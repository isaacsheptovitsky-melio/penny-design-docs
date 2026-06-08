import { type FocusEvent, type RefObject, useCallback, useEffect, useMemo } from 'react';

/**
 * useFocus - A hook that manages focus behavior for a given ref and focus state.
 *
 * It accepts an optional callback functions:
 * - `handleOnFocus` - callback function to be called when the element is focused.
 * - `handleOnBlur` - callback function to be called when the element loses focus.
 */
export const useFocus = ({
  ref,
  isFocused,
  handleOnFocus,
  handleOnBlur,
}: {
  ref: RefObject<HTMLDivElement>;
  isFocused?: boolean;
  handleOnFocus?: () => void;
  handleOnBlur?: () => void;
}) => {
  // TODO:https://meliorisk.atlassian.net/browse/ME-110373
  // eslint-disable-next-line react-hooks/refs
  const shouldFocusRef = useMemo(() => isFocused && ref.current !== document.activeElement, [ref, isFocused]);

  useEffect(() => {
    if (!ref.current) return;

    if (shouldFocusRef) {
      ref.current.focus();
    }
  }, [ref, shouldFocusRef]);

  const onFocus = useCallback(
    (e: FocusEvent<HTMLDivElement, Element>) => {
      if (handleOnFocus) {
        e.preventDefault();
        handleOnFocus?.();
      }
    },
    [handleOnFocus]
  );

  const onBlur = useCallback(
    (e: FocusEvent<HTMLDivElement, Element>) => {
      if (handleOnBlur) {
        e.preventDefault();
        handleOnBlur?.();
      }
    },
    [handleOnBlur]
  );

  return { onBlur, onFocus };
};
