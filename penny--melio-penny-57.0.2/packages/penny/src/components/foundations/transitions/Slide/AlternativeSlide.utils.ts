import type { InternalCSSObject } from '@/theme/types';

export type SlideVariantsType = {
  position: InternalCSSObject;
  enter: InternalCSSObject;
  exit: InternalCSSObject;
};

export const SlideVariants = {
  slideLeft: {
    position: { top: 0, bottom: 0, width: '100%' },
    enter: { left: 0 },
    exit: { left: '-100%' },
  },
  slideRight: {
    position: { top: 0, bottom: 0, width: '100%' },
    enter: { right: 0 },
    exit: { right: '-100%' },
  },
  slideUp: {
    position: { left: 0, right: 0, maxWidth: '100vw' },
    enter: { top: 0 },
    exit: { top: '-100%' },
  },
  slideDown: {
    position: { left: 0, right: 0, maxWidth: '100vw' },
    enter: { bottom: 0 },
    exit: { bottom: '-100%' },
  },
};

export type SlideDirection = 'top' | 'left' | 'bottom' | 'right';

export const slideTransition = {
  right: SlideVariants.slideRight,
  left: SlideVariants.slideLeft,
  bottom: SlideVariants.slideDown,
  top: SlideVariants.slideUp,
};
