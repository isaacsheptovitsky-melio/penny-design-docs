import type { ComponentColorTokenKey } from '@/theme/foundations/tokens/colors/defaultComponentColors.types';

import type { NakedButtonProps } from './NakedButton.types';

const colorComponentTokenByVariantAndState: Record<
  'primary' | 'secondary' | 'invert' | 'critical',
  Record<'rest' | 'hover' | 'pressed' | 'disabled', ComponentColorTokenKey>
> = {
  primary: {
    rest: 'component.button.textPrimary.rest.label',
    hover: 'component.button.textPrimary.hover.label',
    pressed: 'component.button.textPrimary.pressed.label',
    disabled: 'component.button.textPrimary.disabled.label',
  },
  secondary: {
    rest: 'component.button.textSecondary.rest.label',
    hover: 'component.button.textSecondary.hover.label',
    pressed: 'component.button.textSecondary.pressed.label',
    disabled: 'component.button.textSecondary.disabled.label',
  },
  critical: {
    rest: 'component.button.textCritical.rest.label',
    hover: 'component.button.textCritical.hover.label',
    pressed: 'component.button.textCritical.pressed.label',
    disabled: 'component.button.textCritical.disabled.label',
  },
  invert: {
    rest: 'component.button.textInverse.rest.label',
    hover: 'component.button.textInverse.hover.label',
    pressed: 'component.button.textInverse.pressed.label',
    disabled: 'component.button.textInverse.disabled.label',
  },
};

export const getColorComponentToken = (
  variant: NakedButtonProps['variant'],
  state: 'hover' | 'pressed' | 'disabled' | 'rest'
): ComponentColorTokenKey => {
  if (!variant) return colorComponentTokenByVariantAndState['primary'][state];
  return (
    colorComponentTokenByVariantAndState[variant][state] ?? colorComponentTokenByVariantAndState['primary']['rest']
  );
};
