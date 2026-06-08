import { RefObject, useEffect } from 'react';

type UseEventListener<T> = {
  ref: RefObject<T>;
  eventName: keyof HTMLElementEventMap;
  callback: (event: Event) => void;
};

export const useEventListener = <T extends HTMLElement>({ ref, eventName, callback }: UseEventListener<T>) => {
  // TODO:https://meliorisk.atlassian.net/browse/ME-110373
  // eslint-disable-next-line react-hooks/refs
  const element = ref.current;

  useEffect(() => {
    if (element) {
      element.addEventListener(eventName, callback);
    }

    return () => {
      if (element) {
        element.removeEventListener(eventName, callback);
      }
    };
  }, [eventName, element, callback]);
};
