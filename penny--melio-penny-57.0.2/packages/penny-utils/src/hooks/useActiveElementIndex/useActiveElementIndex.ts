import { RefCallback, useState } from 'react';
import { tabbable } from 'tabbable';

import { useRefCallback } from '../useRefCallback';

/**
 * Return active element index for a container element
 */
export const useActiveElementIndex = () => {
  const [activeElementIndex, setActiveElementIndex] = useState<number>(0);

  // We're using `refCallback` so we will register the event only when it's rendered
  // This is for cases like modal when its content is not rendered yet.
  const setActiveElementRef: RefCallback<Element> = useRefCallback((element) => {
    function handleFocusIn(event: Event) {
      const focusableElements = element ? tabbable(element) : [];

      const index = focusableElements.findIndex((element) => element === event.target);
      setActiveElementIndex(index);
    }

    element?.addEventListener('focusin', handleFocusIn);

    return () => {
      element?.removeEventListener('focusin', handleFocusIn);
    };
  });

  const resetActiveElementIndex = () => {
    setActiveElementIndex(0);
  };

  return { activeElementIndex, setActiveElementRef, resetActiveElementIndex };
};
