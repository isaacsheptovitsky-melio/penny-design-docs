import { RefCallback, useCallback, useRef } from 'react';

export const useRefCallback = <T>(rawCallback: RefCallback<T>) => {
  const cleanupRef = useRef<VoidFunction | void | null>(null);
  return useCallback(
    (node: T) => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }

      if (node) {
        cleanupRef.current = rawCallback(node);
      }
    },
    [rawCallback]
  );
};
