import { useEffect, useState } from 'react';

type UseLinearProgressInitialAnimationOptions = {
  /** Starting value
   *  @default 0
   */
  initialValue?: number;

  /** Target value to transition to
   *  @default 100
   */
  targetValue?: number;

  /** Delay in milliseconds before updating to targetValue
   *  @default 20
   */
  delay?: number;
};

/**
 * Hook for animating a LinearProgress value from an initial value to a target value.
 */
export function useLinearProgressInitialAnimation({
  initialValue = 0,
  targetValue = 100,
  delay = 20,
}: UseLinearProgressInitialAnimationOptions) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(targetValue);
    }, delay);

    return () => clearTimeout(timer);
  }, [targetValue, delay]);

  return { value };
}
