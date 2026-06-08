import { type RefCallback, useCallback, useState } from 'react';

import { type MultiSelectOption, type MultiSelectProps } from '../../../MultiSelect.types';

type UseRightElementWidthOptions<V, O extends MultiSelectOption<V>> = Pick<MultiSelectProps<V, O>, 'isLoading'>;

type UseRightElementWidthReturn = {
  rightElementWidth: number;
  rightElementRef: RefCallback<HTMLElement>;
};

export const useRightElementWidth = <V, O extends MultiSelectOption<V>>({
  isLoading,
}: UseRightElementWidthOptions<V, O>): UseRightElementWidthReturn => {
  const [rightElementWidth, setRightElementWidth] = useState(0);

  const rightElementRef = useCallback(
    (el: HTMLElement | null) => {
      if (!el) return;

      setRightElementWidth(el.offsetWidth);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- We need to recalculate when `isLoading` changes because the loader has a different width.
    [setRightElementWidth, isLoading]
  );

  return {
    rightElementWidth,
    rightElementRef,
  };
};
