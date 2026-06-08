import { Box } from '@chakra-ui/react';
import type { TestIdProp } from '@melio/penny-utils';
import { useDelayMount } from '@melio/penny-utils';
import {
  type CSSProperties,
  forwardRef,
  type HTMLAttributes,
  type PropsWithChildren,
  type TransitionEvent,
} from 'react';

import { useStyleConfig } from '@/theme/hooks/use-style-config';

import { type SlideDirection, slideTransition } from './AlternativeSlide.utils';
import type { SlideProps } from './Slide.type';

export type AlternativeSlideProps = PropsWithChildren<{
  isOpen: boolean;
  direction?: SlideDirection;
  style?: CSSProperties;
}> &
  TestIdProp &
  HTMLAttributes<HTMLDivElement> &
  Pick<SlideProps, 'onAnimationComplete'>;

export const AlternativeSlide = forwardRef<HTMLDivElement, AlternativeSlideProps>(
  ({ direction = 'right', style, isOpen, onAnimationComplete, ...props }, ref) => {
    const transition = slideTransition[direction];

    const styles = useStyleConfig('AlternativeSlide', { transition });

    const delayedMount = useDelayMount({ isOpen, delay: 100 });

    const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
      if (event.propertyName === direction && onAnimationComplete) {
        onAnimationComplete(delayedMount ? 'enter' : 'exit'); // Only fires once when the slide finishes
      }
    };

    return (
      <Box
        onTransitionEnd={handleTransitionEnd}
        data-component="AlternativeSlide"
        ref={ref}
        data-open={delayedMount}
        __css={{
          ...styles,
          ...(style as CSSProperties),
        }}
        {...props}
      />
    );
  }
);
