import { isVitestEnv, isWindowsOS, useBoolean } from '@melio/penny-utils';
import { useMemo } from 'react';

export const useTableSelectableCellAriaLabel = ({ ariaLabel }: { ariaLabel?: string }) => {
  const [isFocused, setIsFocus] = useBoolean();

  // detect if env OS is real Windows and is not test environment
  const isWindowEnv = isWindowsOS() && !isVitestEnv();

  const ariaLabelProps = useMemo(() => {
    if (isWindowEnv) {
      return isFocused ? { 'aria-label': ariaLabel } : { 'aria-label': '' };
    }

    return { 'aria-label': ariaLabel };
  }, [ariaLabel, isFocused, isWindowEnv]);

  return {
    ...ariaLabelProps,
    onFocus: () => setIsFocus.on(),
    onBlur: () => setIsFocus.off(),
  };
};
