import { type CustomTokenValue } from '../../globalTokens.types';
import { type GlobalColorTokenKey } from '../defaultGlobalColors.types';
import { type SemanticColorTokenKey } from '../defaultSemanticColors.types';

export type TokenValue = `{${GlobalColorTokenKey}}` | `{${SemanticColorTokenKey}}` | CustomTokenValue;
export type States = 'rest' | 'hover' | 'pressed' | 'disabled' | 'loading';
export type Variants =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'critical'
  | 'criticalSecondary'
  | 'primaryInverse'
  | 'secondaryInverse';
export type Parts = 'border' | 'background' | 'content';

type ButtonTokensByPart = Record<Parts, TokenValue>;
type ButtonPartsByState = Record<States, ButtonTokensByPart>;
export type ButtonColors = Record<Variants, ButtonPartsByState>;

export const buttonColors: ButtonColors = {
  primary: {
    rest: {
      border: '{semantic.border.inverse}',
      background: '{semantic.action.primary.rest}',
      content: '{semantic.text.inverse}',
    },
    hover: {
      border: '{semantic.border.inverse}',
      background: '{semantic.action.primary.hover}',
      content: '{semantic.text.inverse}',
    },
    pressed: {
      border: '{semantic.border.inverse}',
      background: '{semantic.action.primary.pressed}',
      content: '{semantic.text.inverse}',
    },
    loading: {
      border: '{semantic.border.inverse}',
      background: '{semantic.action.primary.hover}',
      content: '{semantic.text.inverse}',
    },
    disabled: {
      border: '{semantic.border.inverse}',
      background: '{semantic.action.primary.disabled}',
      content: '{semantic.text.disabled}',
    },
  },
  secondary: {
    rest: {
      border: '{semantic.border.brand}',
      background: '{semantic.action.secondary.rest}',
      content: '{semantic.text.brand.rest}',
    },
    hover: {
      border: '{semantic.border.brand}',
      background: '{semantic.action.secondary.hover}',
      content: '{semantic.text.brand.hover}',
    },
    pressed: {
      border: '{semantic.border.brand}',
      background: '{semantic.action.secondary.pressed}',
      content: '{semantic.text.brand.pressed}',
    },
    loading: {
      border: '{semantic.border.brand}',
      background: '{semantic.action.secondary.hover}',
      content: '{semantic.text.brand.hover}',
    },
    disabled: {
      border: '{semantic.border.inverse}',
      background: '{semantic.action.secondary.disabled}',
      content: '{semantic.text.disabled}',
    },
  },
  tertiary: {
    rest: {
      border: '{semantic.border.interactive.rest}',
      background: '{semantic.action.tertiary.rest}',
      content: '{semantic.text.primary}',
    },
    hover: {
      border: '{semantic.border.interactive.hover}',
      background: '{semantic.action.tertiary.hover}',
      content: '{semantic.text.primary}',
    },
    pressed: {
      border: '{semantic.border.interactive.rest}',
      background: '{semantic.action.tertiary.pressed}',
      content: '{semantic.text.primary}',
    },
    loading: {
      border: '{semantic.border.interactive.rest}',
      background: '{semantic.action.tertiary.hover}',
      content: '{semantic.text.primary}',
    },
    disabled: {
      border: '{semantic.border.inverse}',
      background: '{semantic.action.tertiary.disabled}',
      content: '{semantic.text.disabled}',
    },
  },
  critical: {
    rest: {
      border: '{semantic.border.inverse}',
      background: '{semantic.action.criticalPrimary.rest}',
      content: '{semantic.text.inverse}',
    },
    hover: {
      border: '{semantic.border.inverse}',
      background: '{semantic.action.criticalPrimary.hover}',
      content: '{semantic.text.inverse}',
    },
    pressed: {
      border: '{semantic.border.inverse}',
      background: '{semantic.action.criticalPrimary.pressed}',
      content: '{semantic.text.inverse}',
    },
    loading: {
      border: '{semantic.border.inverse}',
      background: '{semantic.action.criticalPrimary.hover}',
      content: '{semantic.text.inverse}',
    },
    disabled: {
      border: '{semantic.border.inverse}',
      background: '{semantic.action.criticalPrimary.disabled}',
      content: '{semantic.text.disabled}',
    },
  },
  criticalSecondary: {
    rest: {
      border: '{semantic.border.critical}',
      background: '{semantic.action.criticalSecondary.rest}',
      content: '{semantic.text.critical.rest}',
    },
    hover: {
      border: '{semantic.border.critical}',
      background: '{semantic.action.criticalSecondary.hover}',
      content: '{semantic.text.critical.hover}',
    },
    pressed: {
      border: '{semantic.border.critical}',
      background: '{semantic.action.criticalSecondary.pressed}',
      content: '{semantic.text.critical.pressed}',
    },
    loading: {
      border: '{semantic.border.critical}',
      background: '{semantic.action.criticalSecondary.hover}',
      content: '{semantic.text.critical.hover}',
    },
    disabled: {
      border: '{semantic.border.inverse}',
      background: '{semantic.action.criticalSecondary.disabled}',
      content: '{semantic.text.disabled}',
    },
  },
  primaryInverse: {
    rest: {
      border: '{semantic.border.neutral}',
      background: '{semantic.action.inversePrimary.rest}',
      content: '{semantic.text.brand.rest}',
    },
    hover: {
      border: '{semantic.border.neutral}',
      background: '{semantic.action.inversePrimary.hover}',
      content: '{semantic.text.brand.hover}',
    },
    pressed: {
      border: '{semantic.border.neutral}',
      background: '{semantic.action.inversePrimary.pressed}',
      content: '{semantic.text.brand.pressed}',
    },
    loading: {
      border: '{semantic.border.neutral}',
      background: '{semantic.action.inversePrimary.hover}',
      content: '{semantic.text.brand.hover}',
    },
    disabled: {
      border: '{semantic.border.neutral}',
      background: '{semantic.action.inversePrimary.disabled}',
      content: '{semantic.text.disabled}',
    },
  },
  secondaryInverse: {
    rest: {
      border: '{semantic.border.inverse}',
      background: '{semantic.action.inverseSecondary.rest}',
      content: '{semantic.text.inverse}',
    },
    hover: {
      border: '{semantic.border.inverse}',
      background: '{semantic.action.inverseSecondary.hover}',
      content: '{semantic.text.inverse}',
    },
    pressed: {
      border: '{semantic.border.inverse}',
      background: '{semantic.action.inverseSecondary.pressed}',
      content: '{semantic.text.inverse}',
    },
    loading: {
      border: '{semantic.border.inverse}',
      background: '{semantic.action.inverseSecondary.hover}',
      content: '{semantic.text.inverse}',
    },
    disabled: {
      border: '{semantic.border.neutral}',
      background: '{semantic.action.inverseSecondary.disabled}',
      content: '{semantic.text.disabled}',
    },
  },
};
