import { buttonColors } from './componentColors/button';
import { iconButtonColors } from './componentColors/iconButton';
import type { ComponentColorTokens } from './defaultComponentColors.types';

export const defaultComponentColors: ComponentColorTokens = {
  button: {
    textPrimary: {
      rest: { label: '{semantic.text.primary}' },
      hover: { label: '{semantic.text.brand.rest}' },
      pressed: { label: '{semantic.text.brand.hover}' },
      disabled: { label: '{semantic.text.disabled}' },
    },
    textSecondary: {
      rest: { label: '{semantic.text.brand.rest}' },
      hover: { label: '{semantic.text.brand.hover}' },
      pressed: { label: '{semantic.text.brand.pressed}' },
      disabled: { label: '{semantic.text.disabled}' },
    },
    textCritical: {
      rest: { label: '{semantic.text.critical.rest}' },
      hover: { label: '{semantic.text.critical.hover}' },
      pressed: { label: '{semantic.text.critical.pressed}' },
      disabled: { label: '{semantic.text.disabled}' },
    },
    textInverse: {
      rest: { label: '{semantic.link.inverse.rest}' },
      hover: { label: '{semantic.link.inverse.hover}' },
      pressed: { label: '{semantic.link.inverse.pressed}' },
      disabled: { label: '{semantic.link.inverse.disabled}' },
    },
    ...buttonColors,
  },
  iconButton: iconButtonColors,
  tab: {
    default: {
      rest: {
        label: '{semantic.text.secondary}',
        border: '{semantic.border.static}',
        background: '{global.neutral.A0}',
      },
      pressed: {
        label: '{semantic.text.brand.pressed}',
        border: '{semantic.border.static}',
        background: '{global.neutral.A0}',
      },
      hover: {
        label: '{semantic.text.brand.hover}',
        border: '{semantic.border.static}',
        background: '{global.neutral.A0}',
      },
      selected: {
        label: '{semantic.text.brand.rest}',
        border: '{semantic.border.brand}',
        background: '{global.neutral.A0}',
      },
    },
    neutral: {
      rest: {
        label: '{semantic.text.secondary}',
        border: '{semantic.border.static}',
        background: '{global.neutral.A0}',
      },
      pressed: {
        label: '{semantic.text.primary}',
        border: '{semantic.border.static}',
        background: '{global.neutral.A0}',
      },
      hover: {
        label: '{semantic.text.primary}',
        border: '{semantic.border.static}',
        background: '{global.neutral.A0}',
      },
      selected: {
        label: '{semantic.text.primary}',
        border: '{semantic.border.neutral}',
        background: '{global.neutral.A0}',
      },
    },
  },
  pill: {
    secondaryWarning: {
      rest: {
        label: '{semantic.text.primary}',
        border: '{global.neutral.A0}',
        background: '{semantic.fill.warning.secondary}',
      },
    },
    secondaryCritical: {
      rest: {
        label: '{semantic.text.critical.onColor}',
        border: '{global.neutral.A0}',
        background: '{semantic.fill.critical.secondary}',
      },
    },
    secondarySuccess: {
      rest: {
        label: '{semantic.text.success.onColor}',
        border: '{global.neutral.A0}',
        background: '{semantic.fill.success.secondary}',
      },
    },
    secondaryNeutral: {
      rest: {
        label: '{semantic.text.primary}',
        border: '{global.neutral.A0}',
        background: '{semantic.fill.secondary}',
      },
    },
    secondaryBrand: {
      rest: {
        label: '{semantic.text.brand.onColor}',
        border: '{global.neutral.A0}',
        background: '{semantic.fill.brand.secondary}',
      },
    },
    secondaryInformative: {
      rest: {
        label: '{semantic.text.informative.onColor}',
        border: '{global.neutral.A0}',
        background: '{semantic.fill.informative.secondary}',
      },
    },
  },
};
