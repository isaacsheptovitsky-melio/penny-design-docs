import { usePrefersReducedMotion } from '@chakra-ui/react';

import { cssAnimations, type CssAnimationsKey } from '../foundations/animations';

export function useCssAnimation(key: CssAnimationsKey) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const animation = cssAnimations[key];

  return prefersReducedMotion ? undefined : `${animation.keyframes} ${animation?.animation}`;
}
