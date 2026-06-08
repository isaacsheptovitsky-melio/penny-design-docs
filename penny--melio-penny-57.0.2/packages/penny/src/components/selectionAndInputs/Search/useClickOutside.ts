import { type MutableRefObject, useEffect } from 'react';

export const useClickOutside = (
  dropdownRef: MutableRefObject<HTMLDivElement>,
  inputRef: MutableRefObject<HTMLInputElement>,
  closeMenu: VoidFunction
) => {
  useEffect(() => {
    if (!inputRef?.current || !dropdownRef?.current || !closeMenu) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node) && !inputRef.current?.contains(event.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdownRef?.current, inputRef?.current, closeMenu]);
};
