import { Box } from '@chakra-ui/react';
import { type TestIdProp, useTestId } from '@melio/penny-utils';
import { forwardRef, useEffect, useRef, useState } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { useCircleSvg } from './useCircleSvg';

export type CircularProgressProps = {
  /**
   * Current progress percentage value (0-100)
   */
  percentage: number;
  /**
   * CSS transition timing for smooth progress animation
   * Set to null to disable animation
   * @default "0.6s ease"
   */
  transition?: string | null;
} & TestIdProp;

/**
 * A circular progress indicator that visually represents completion percentage
 * in a ring format.
 */
export const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>(
  ({ percentage, 'data-testid': dataTestId = 'circular-progress', transition = '0.6s ease', ...rest }, ref) => {
    const [offset, setOffset] = useState(0);
    const progressAnimation = useRef<number>();
    const { circleAttributes, strokeDasharray } = useCircleSvg(offset);
    const getTestId = useTestId(dataTestId);

    const styles = useMultiStyleConfig('CircularProgress', { strokeDasharray, transition });

    useEffect(() => {
      // set the progress animation
      progressAnimation.current = window.setTimeout(() => {
        setOffset(percentage);
      }, 20);

      return () => {
        clearTimeout(progressAnimation.current);
      };
    }, [percentage]);

    return (
      <Box
        ref={ref}
        __css={styles['container']}
        data-component="CircularProgress"
        {...getTestId()}
        {...rest}
        as="svg"
        // ts-ignore is used due to `svg` props issues with `<Box/>`.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        viewBox="0 0 100 100"
      >
        <Box as="circle" __css={styles['circle']} {...circleAttributes} />
        <Box as="circle" __css={styles['track']} {...circleAttributes} data-progress={offset} />
      </Box>
    );
  }
);

CircularProgress.displayName = 'CircularProgress';
