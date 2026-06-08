import { Slide as ChakraSlide } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { type CSSProperties, forwardRef, type KeyboardEvent } from 'react';

import { AlternativeSlide } from './AlternativeSlide';
import type { SlideProps } from './Slide.type';

export const Slide = forwardRef<HTMLDivElement, SlideProps>(
  (
    {
      shouldRenderAlternativeSlide,
      unmountOnExit = true,
      in: isOpen = false,
      style,
      'data-testid': dataTestId = 'slide',
      direction = 'right',
      onEsc,
      children,
      onAnimationComplete,
      ...props
    },
    ref
  ) => {
    const getTestId = useTestId(dataTestId);

    const onKeyUpHandler = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        onEsc?.();
      }
    };

    // The `isAndroid` check addresses a bug on Android where focus is lost when opening a floating element.
    // This happens because Chakra UI uses the `transform` CSS property, which causes issues with focus management on Android.
    // If the bug is detected, we fallback to a different rendering approach to avoid the issue.
    if (shouldRenderAlternativeSlide) {
      return (
        <AlternativeSlide
          onAnimationComplete={onAnimationComplete}
          isOpen={isOpen}
          direction={direction}
          style={{ ...(style as CSSProperties) }}
          ref={ref}
          onKeyUp={onKeyUpHandler}
          {...getTestId('alternative-slide')}
        >
          {children}
        </AlternativeSlide>
      );
    }
    return (
      <ChakraSlide
        data-component="Slide"
        in={isOpen}
        ref={ref}
        onAnimationComplete={onAnimationComplete}
        unmountOnExit={unmountOnExit}
        direction={direction}
        style={style}
        onKeyUp={onKeyUpHandler}
        {...getTestId()}
        {...props}
      >
        {children}
      </ChakraSlide>
    );
  }
);

Slide.displayName = 'Slide';
