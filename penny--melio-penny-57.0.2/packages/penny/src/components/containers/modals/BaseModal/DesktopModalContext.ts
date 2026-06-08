import { createContext, useContext } from 'react';

export const DesktopModalContext = createContext<{
  setIsBodyMounted: ((isBodyMounted: boolean) => void) | undefined;
}>({
  setIsBodyMounted: undefined,
});

export const useDesktopModalContext = () => useContext(DesktopModalContext);
