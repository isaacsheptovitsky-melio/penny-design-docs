import { useEffect, useState } from 'react';

type UseDelayMountOptions = {
  isOpen: boolean;
  delay?: number;
};

/**
 * Delays the mounting of a component for smoother enter animations.
 * @param isOpen - Whether the component should be mounted.
 * @param delay - The delay before mounting the component.
 * @returns Whether the component should be mounted.
 */
export const useDelayMount = ({ isOpen, delay = 500 }: UseDelayMountOptions): boolean => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isOpen) {
      timeoutId = setTimeout(() => setIsMounted(true), delay);
    } else {
      // TODO:https://meliorisk.atlassian.net/browse/ME-110373
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsMounted(false);
    }

    return () => clearTimeout(timeoutId);
  }, [isOpen, delay]);

  return isMounted;
};
