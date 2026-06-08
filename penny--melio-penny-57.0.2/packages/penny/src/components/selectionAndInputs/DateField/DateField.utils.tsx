import { autoUpdate, flip, offset, shift, size as floatingSize, type UseFloatingOptions } from '@floating-ui/react';

import { type FormSize } from '@/theme/utils/form.utils';

export const getUseFloatingOptions = (
  size: FormSize
): Pick<UseFloatingOptions, 'middleware' | 'whileElementsMounted' | 'placement'> => ({
  placement: 'bottom-end',
  middleware: [
    offset({ mainAxis: size === 'large' ? 20 : 16, crossAxis: 12 }),
    flip(),
    shift(),
    floatingSize({
      apply({ availableHeight, elements }) {
        elements.floating.style.maxHeight = `${availableHeight}px`;
        elements.floating.style.display = 'block';
        elements.floating.style.overflow = 'auto';
      },
    }),
  ],
  whileElementsMounted: (reference, floating, update) =>
    autoUpdate(reference, floating, update, {
      animationFrame: true,
      elementResize: false,
    }),
});
const normalizeDate = (date: Date) => date.setHours(0, 0, 0, 0);

export const isDateNotInRange = ({
  parsedDate,
  minDate,
  maxDate,
}: {
  parsedDate: Date;
  minDate?: Date;
  maxDate?: Date;
}) =>
  (minDate && normalizeDate(parsedDate) < normalizeDate(minDate)) ||
  (maxDate && normalizeDate(parsedDate) > normalizeDate(maxDate));
