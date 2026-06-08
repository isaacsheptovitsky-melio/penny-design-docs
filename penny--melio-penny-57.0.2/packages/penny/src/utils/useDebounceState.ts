import { useDebounceCallback } from '@melio/penny-utils';
import { useState } from 'react';

export const useDebounceState = <T>(defaultValue: T, delay = 500) => {
  const [state, setState] = useState<T>(defaultValue);

  const setDebounceState = useDebounceCallback(setState, delay);

  return [state, setDebounceState, setState] as const;
};
