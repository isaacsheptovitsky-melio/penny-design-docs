import type { SemanticColorTokenKey } from '@/theme/foundations/tokens/colors/defaultSemanticColors.types';

import type { LinkProps } from './Link.types';

const colorSemanticTokenByVariantAndState: Record<
  'secondary' | 'inverse' | 'default',
  Record<'rest' | 'hover' | 'pressed' | 'disabled', SemanticColorTokenKey>
> = {
  default: {
    rest: 'semantic.link.primary.rest',
    hover: 'semantic.link.primary.hover',
    pressed: 'semantic.link.primary.pressed',
    disabled: 'semantic.link.primary.disabled',
  },
  secondary: {
    rest: 'semantic.link.secondary.rest',
    hover: 'semantic.link.secondary.hover',
    pressed: 'semantic.link.secondary.pressed',
    disabled: 'semantic.link.secondary.disabled',
  },
  inverse: {
    rest: 'semantic.link.inverse.rest',
    hover: 'semantic.link.inverse.hover',
    pressed: 'semantic.link.inverse.pressed',
    disabled: 'semantic.link.inverse.disabled',
  },
};

export const getColorSemanticToken = (
  color: LinkProps['color'],
  state: 'hover' | 'pressed' | 'disabled' | 'rest'
): SemanticColorTokenKey | 'inherit' => {
  if (!color || color === 'inherit') return 'inherit';

  return colorSemanticTokenByVariantAndState[color][state] ?? colorSemanticTokenByVariantAndState['default'][state];
};
