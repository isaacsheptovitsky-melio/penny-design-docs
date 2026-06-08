import { MutableRefObject, useEffect, useRef, useState } from 'react';

/**
 * useIntersectionObserver hook
 *
 * @param {Object} options - Intersection observer options
 * @param {number} options.threshold - The proportion of the target visible (between 0 and 1)
 * @param {string} options.rootMargin - Margin around the root (e.g., '0px 0px -200px 0px')
 * @param {HTMLElement} options.root - The root element for observation (null for viewport)
 * @returns {ref, isVisible} - A ref to attach to the target element, and a boolean indicating visibility
 */
export const useIntersectionObserver = ({ threshold = 0.1, root = null, rootMargin = '0px' } = {}): {
  targetRef: MutableRefObject<HTMLElement | null>;
  isVisible: boolean;
} => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLElement | null>(null); // This will be passed to the element

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observerCurrentRef = observerRef?.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(Boolean(entry?.isIntersecting));
      },
      { root, rootMargin, threshold }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (observerCurrentRef) observer.disconnect();
    };
  }, [root, rootMargin, threshold]);

  return { targetRef, isVisible };
};
