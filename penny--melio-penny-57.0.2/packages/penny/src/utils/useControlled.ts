import { useCallback, useState } from 'react';

type OnControlledValueChangeType<T, R extends unknown[]> = (newValue: T, ...rest: R) => void;

/**
 * A hook to manage controlled and uncontrolled state.
 * It returns the current value and a function to update the value.
 */
export function useControlled<T, R extends unknown[]>(
  controlledValue?: T,
  onControlledValueChange?: OnControlledValueChangeType<T, R>,
  controlledDefaultValue?: T
): [T, OnControlledValueChangeType<T, R>] {
  const isControlled = controlledValue !== undefined;
  const [localValue, setLocalValue] = useState(controlledDefaultValue);

  const value = isControlled ? controlledValue : localValue;

  const onChange = useCallback(
    (newValue: T, ...rest: R) => {
      if (!isControlled) {
        setLocalValue(newValue);
      }
      if (onControlledValueChange) {
        onControlledValueChange(newValue, ...rest);
      }
    },
    [isControlled, onControlledValueChange]
  );

  return [value as T, onChange] as const;
}
