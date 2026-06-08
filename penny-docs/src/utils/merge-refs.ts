// TODO: remove this and its test file once this ticket is resolved: https://meliorisk.atlassian.net/browse/ME-7417
// Source code: https://github.com/gregberge/react-merge-refs/blob/main/src/index.tsx

import { type LegacyRef, type MutableRefObject, type RefCallback, type RefObject } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mergeRefs<T = any>(
  refs: Array<
    MutableRefObject<T> | LegacyRef<T> | RefObject<HTMLDivElement> | ((instance: T | null) => void) | null | undefined
  >
): RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref !== null && ref !== undefined) {
        (ref as MutableRefObject<T | null>).current = value;
      }
    });
  };
}
/**
 * Merges two arrays of React `RefObject`s, combining empty refs with provided refs where available.
 */
export const mergeRefArrays = <T>(
  emptyRefs: RefObject<T>[],
  providedRefs: (RefObject<T> | undefined)[]
): RefObject<T>[] => {
  const mergedRefs = emptyRefs.slice(); // Create a copy of the emptyRefs array

  providedRefs.forEach((ref, index) => {
    if (ref) {
      // If the provided ref exists, merge it into the corresponding empty ref
      mergedRefs[index] = ref;
    }
  });

  return mergedRefs;
};
