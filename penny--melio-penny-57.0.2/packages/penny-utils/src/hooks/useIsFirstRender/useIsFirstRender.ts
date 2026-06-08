import { useRef } from 'react';

export function useIsFirstRender() {
  // TODO:https://meliorisk.atlassian.net/browse/ME-110373
  const isFirst = useRef(true);
  // eslint-disable-next-line react-hooks/refs
  if (isFirst.current) {
    // eslint-disable-next-line react-hooks/refs
    isFirst.current = false;
    return true;
  }
  // eslint-disable-next-line react-hooks/refs
  return isFirst.current;
}
