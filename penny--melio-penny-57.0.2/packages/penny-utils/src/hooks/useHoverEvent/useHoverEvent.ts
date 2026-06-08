import { MouseEvent, MouseEventHandler, useCallback, useState } from 'react';

export const useHoverEvent = ({
  onMouseOver,
  onMouseLeave,
}: {
  onMouseOver?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleMouseOver = useCallback(
    (event: MouseEvent) => {
      setIsHover(true);

      onMouseOver?.(event);
    },
    [onMouseOver]
  );

  const handleMouseLeave = useCallback(
    (event: MouseEvent) => {
      setIsHover(false);

      onMouseLeave?.(event);
    },
    [onMouseLeave]
  );

  return {
    isHover,
    onMouseOver: handleMouseOver,
    onMouseLeave: handleMouseLeave,
  };
};
