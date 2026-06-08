import { useEffect, useState } from 'react';

type UseDelayUnmountOptions = {
  isOpen: boolean;
  delay?: number;
};

/**
 * Delays the unmounting of a component to allow for animations to complete.
 * @param isOpen - Whether the component is open.
 * @param delay - The delay in milliseconds before unmounting the component. Defaults to 500ms which is more than enough for most animations.
 * @returns Whether the component is mounted.
 */
export const useDelayUnmount = ({ isOpen, delay = 500 }: UseDelayUnmountOptions): boolean => {
  const [isMounted, setIsMounted] = useState(isOpen);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isOpen) {
      // TODO:https://meliorisk.atlassian.net/browse/ME-110373
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsMounted(true);
    } else {
      timeoutId = setTimeout(() => {
        setIsMounted(false);
      }, delay);
    }

    return () => clearTimeout(timeoutId);
  }, [delay, isOpen]);

  return isMounted;
};
