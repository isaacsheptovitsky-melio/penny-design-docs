import { type DependencyList, useCallback, useState } from 'react';

export const useElementRef = (dep: DependencyList) => {
  const [elementWidth, setElementWidth] = useState<number | null>(null);
  const elementRef = useCallback(
    (ref: HTMLElement | null) => {
      if (!ref) return;
      setElementWidth(ref.clientWidth);
    },
    // This needs to update when isLoading changes in order to update the padding.
    // If the text field is inside a collapsed card, we need to trigger an update when the card becomes visible.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dep
  );
  return {
    elementRef,
    elementWidth,
  };
};
