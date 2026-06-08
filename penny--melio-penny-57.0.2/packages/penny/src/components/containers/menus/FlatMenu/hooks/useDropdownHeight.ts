import { type CSSProperties, useEffect, useState } from 'react';

export const useDropdownHeight = (top: CSSProperties['top'] = 0): CSSProperties['height'] => {
  const [dropdownHeight, setDropdownHeight] = useState<CSSProperties['height']>();

  useEffect(() => {
    const calculateDropdownHeight = () => {
      const visibleHeight = window.visualViewport?.height || window.innerHeight;

      setDropdownHeight(`calc(${visibleHeight}px - ${top}px)`);
    };

    calculateDropdownHeight();

    window.visualViewport?.addEventListener('resize', calculateDropdownHeight);

    return () => {
      window.visualViewport?.removeEventListener('resize', calculateDropdownHeight);
    };
  }, [top]);

  return dropdownHeight;
};
