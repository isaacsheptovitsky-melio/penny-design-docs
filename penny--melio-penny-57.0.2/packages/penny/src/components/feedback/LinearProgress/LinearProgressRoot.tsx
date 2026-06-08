import { chakra, forwardRef } from '@chakra-ui/react';
import { clamp, type TestIdProp } from '@melio/penny-utils';
import { type ReactNode, useMemo } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { DataTestIdContext, type DataTestIdContextValue } from '@/utils/dataTestIdContext';

import { LinearProgressContext, type LinearProgressContextValue, StylesProvider } from './LinearProgress.context';

export type LinearProgressRootProps = {
  /**
   * The current progress value
   */
  value: number;

  /**
   * The maximum value
   * @default 100
   */
  max?: number;

  children: ReactNode | ((props: LinearProgressContextValue) => ReactNode);
} & TestIdProp;

/**
 * For composition and customization options, see the <a href="?path=/docs/composition-customization--docs" target="_self">composition & customization documentation</a>.
 */
export const LinearProgressRoot = forwardRef<LinearProgressRootProps, 'div'>(
  (
    {
      value,
      max = 100,
      'data-testid': dataTestId = 'linear-progress',
      children,
      ...restProps
    }: LinearProgressRootProps,
    ref
  ) => {
    const clampedValue = clamp(value, 0, max);
    const percentage = (clampedValue / max) * 100;
    const styles = useMultiStyleConfig('LinearProgress', { percentage });

    const contextValue = useMemo(
      () => ({
        value,
        max,
        percentage,
      }),
      [value, max, percentage]
    );

    const dataTestIdContextValue: DataTestIdContextValue = useMemo(
      () => ({ rootDataTestId: dataTestId }),
      [dataTestId]
    );

    return (
      <LinearProgressContext.Provider value={contextValue}>
        <StylesProvider value={styles}>
          <DataTestIdContext.Provider value={dataTestIdContextValue}>
            <chakra.div
              data-component="LinearProgressRoot"
              role="progressbar"
              aria-label="Progress"
              aria-valuemin={0}
              aria-valuemax={max}
              aria-valuenow={clampedValue}
              data-testid={dataTestId}
              __css={styles['container']}
              {...restProps}
              ref={ref}
            >
              {typeof children === 'function' ? children(contextValue) : children}
            </chakra.div>
          </DataTestIdContext.Provider>
        </StylesProvider>
      </LinearProgressContext.Provider>
    );
  }
);

LinearProgressRoot.displayName = 'LinearProgressRoot';
