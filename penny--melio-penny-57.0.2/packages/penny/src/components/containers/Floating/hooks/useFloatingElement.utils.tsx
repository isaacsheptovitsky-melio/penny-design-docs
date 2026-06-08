import { flip, offset, shift, size, type UseFloatingOptions } from '@floating-ui/react';
import { unionBy } from '@melio/penny-utils';

export const getMiddleware = ({
  middleware = [],
  triggerDropdownGap,
  shouldFitAvailableHeight,
}: {
  middleware: UseFloatingOptions['middleware'];
  triggerDropdownGap?: number;
  shouldFitAvailableHeight?: boolean;
}) => {
  const defaultMiddleware = [
    offset({
      mainAxis: triggerDropdownGap,
      alignmentAxis: 0,
    }),
    flip(),
    shift(),
    size({
      apply: ({ availableHeight, elements }) => {
        if (shouldFitAvailableHeight) {
          elements.floating.style.maxHeight = `${availableHeight}px`;
        }
      },
    }),
  ];

  return unionBy(middleware, defaultMiddleware, (item) => (item ? item.name : undefined));
};
