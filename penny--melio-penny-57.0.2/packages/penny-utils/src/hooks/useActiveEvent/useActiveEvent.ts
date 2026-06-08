import { MouseEvent, MouseEventHandler, useCallback, useState } from 'react';

export const useActiveEvent = ({
  onMouseDown,
  onMouseUp,
  onMouseLeave,
}: {
  onMouseDown?: MouseEventHandler;
  onMouseUp?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
      setIsActive(true);

      onMouseDown?.(event);
    },
    [onMouseDown]
  );

  const handleMouseUp = useCallback(
    (event: MouseEvent) => {
      setIsActive(false);

      onMouseUp?.(event);
    },
    [onMouseUp]
  );

  const handleMouseLeave = useCallback(
    (event: MouseEvent) => {
      setIsActive(false);

      onMouseLeave?.(event);
    },
    [onMouseLeave]
  );

  return {
    isActive,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseLeave,
  };
};
