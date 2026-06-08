import { type KeyboardEventHandler, type MouseEventHandler } from 'react';

type GetInteractiveElementPropsOptions<T> = {
  isDisabled?: boolean;
  isLoading?: boolean;
  isReadOnly?: boolean;
  onClick?: MouseEventHandler<T>;
  onKeyDown?: KeyboardEventHandler<T>;
  onKeyUp?: KeyboardEventHandler<T>;
  tabIndex?: number;
};

type GetInteractiveElementReturnType<T> = {
  'aria-disabled'?: boolean;
  tabIndex?: number;
  onClick?: MouseEventHandler<T>;
};

export const getInteractiveElementProps = <T>({
  isDisabled,
  isReadOnly,
  isLoading,
  tabIndex,
  ...events
}: GetInteractiveElementPropsOptions<T> = {}): GetInteractiveElementReturnType<T> => ({
  'aria-disabled': isDisabled || undefined,
  ...(isDisabled || isLoading || isReadOnly ? {} : { ...events }),
  ...(isDisabled ? { tabIndex: -1 } : { tabIndex }),
});
