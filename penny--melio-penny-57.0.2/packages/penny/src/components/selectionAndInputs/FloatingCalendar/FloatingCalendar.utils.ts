import { size, type UseFloatingOptions } from '@floating-ui/react';
import { useDateUtils } from '@melio/penny-utils';

export const useIsSelectingDifferentDate = () => {
  const { isDatePartEqual } = useDateUtils();
  const isSelectingDifferentDate = (currentValue: Date | undefined) => (newValue: Date) =>
    !currentValue || !isDatePartEqual(newValue, currentValue);

  return { isSelectingDifferentDate };
};

export const getUseFloatingOptions = (isExtraSmallScreen: boolean): Pick<UseFloatingOptions, 'middleware'> => ({
  middleware: [
    size({
      apply: ({ availableHeight, elements }) => {
        if (!isExtraSmallScreen) {
          elements.floating.style.maxHeight = `${availableHeight}px`;
          elements.floating.style.overflow = 'auto';
        }
      },
    }),
  ],
});
