import type { ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

import type { BadgeProps } from './Badge.types';

const getPositionStyle = (placement: BadgeProps['placement']) => {
  if (!placement) return { bottom: '-2px', right: '-2px' };

  return {
    top: placement.includes('top') ? '-2px' : undefined,
    bottom: placement.includes('bottom') ? '-2px' : undefined,
    left: placement.includes('left') ? '-2px' : undefined,
    right: placement.includes('right') ? '-2px' : undefined,
  };
};

export const badgeTheme: ComponentMultiStyleConfig<
  'wrapper' | 'mark' | 'markBorder',
  Pick<BadgeProps, 'placement' | 'customPositions'>
> = {
  parts: ['wrapper', 'mark', 'markBorder'],
  baseStyle: ({ placement, customPositions }) => ({
    wrapper: {
      position: 'relative',
      display: 'inline-flex',
      height: 'fit-content',
    },
    mark: {
      position: 'absolute',
      display: 'inline-flex',
      ...getPositionStyle(placement),
      ...customPositions,
    },
    markBorder: {
      display: 'inline-flex',
      borderRadius: 'global.full',
      border: 'global.50',
      borderColor: 'semantic.border.inverse',
      backgroundColor: 'semantic.fill.primary',
      zIndex: 1,
      overflow: 'hidden',
    },
  }),
};
