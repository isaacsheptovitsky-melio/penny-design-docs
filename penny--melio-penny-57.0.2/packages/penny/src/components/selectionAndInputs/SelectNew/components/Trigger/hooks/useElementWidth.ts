import { type RefCallback, useCallback, useState } from 'react';

import { type SelectNewOption, type SelectNewProps } from '../../../SelectNew.types';

type UseElementWidthOptions<V, O extends SelectNewOption<V>> = Pick<SelectNewProps<V, O>, 'isLoading'>;

type UseElementWidthReturn = {
  elementWidth: number;
  elementRef: RefCallback<HTMLElement>;
};

export const useElementWidth = <V, O extends SelectNewOption<V>>({
  isLoading,
}: UseElementWidthOptions<V, O>): UseElementWidthReturn => {
  const [elementWidth, setElementWidth] = useState(0);

  const elementRef = useCallback(
    (el: HTMLElement | null) => {
      if (!el) return;

      setElementWidth(el.offsetWidth);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- We need to recalculate when `isLoading` changes because the loader has a different width.
    [setElementWidth, isLoading]
  );

  return {
    elementWidth,
    elementRef,
  };
};
