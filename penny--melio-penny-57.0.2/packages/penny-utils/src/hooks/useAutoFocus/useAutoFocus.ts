import { RefObject, useEffect } from 'react';

export const useAutoFocus = <T extends HTMLElement>(inputRef: RefObject<T>, autoFocus: boolean = false) => {
  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus, inputRef]);
};
