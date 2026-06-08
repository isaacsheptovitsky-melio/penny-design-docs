import { type ComponentBorderTokens } from './defaultComponentBorders.types';

export const defaultComponentBorders: ComponentBorderTokens = {
  button: {
    primary: {
      rest: '{global.none}',
      hover: '{global.none}',
      pressed: '{global.none}',
      disabled: '{global.none}',
      loading: '{global.none}',
    },
    secondary: {
      rest: '{semantic.action.default}',
      hover: '{semantic.action.default}',
      pressed: '{semantic.action.default}',
      loading: '{semantic.action.default}',
      disabled: '{global.none}',
    },
    tertiary: {
      rest: '{semantic.action.default}',
      hover: '{semantic.action.default}',
      pressed: '{semantic.action.default}',
      loading: '{semantic.action.default}',
      disabled: '{global.none}',
    },
    critical: {
      rest: '{global.none}',
      hover: '{global.none}',
      pressed: '{global.none}',
      loading: '{global.none}',
      disabled: '{global.none}',
    },
    criticalSecondary: {
      rest: '{semantic.action.default}',
      hover: '{semantic.action.default}',
      pressed: '{semantic.action.default}',
      loading: '{semantic.action.default}',
      disabled: '{global.none}',
    },
    primaryInverse: {
      rest: '{global.none}',
      hover: '{global.none}',
      pressed: '{global.none}',
      loading: '{global.none}',
      disabled: '{global.none}',
    },
    secondaryInverse: {
      rest: '{semantic.action.default}',
      hover: '{semantic.action.default}',
      pressed: '{semantic.action.default}',
      loading: '{semantic.action.default}',
      disabled: '{global.none}',
    },
  },
  iconButton: {
    primary: {
      rest: '{global.none}',
      hover: '{global.none}',
      pressed: '{global.none}',
      disabled: '{global.none}',
      loading: '{global.none}',
    },
    secondary: {
      rest: '{semantic.action.default}',
      hover: '{semantic.action.default}',
      pressed: '{semantic.action.default}',
      disabled: '{global.none}',
      loading: '{semantic.action.default}',
    },
    tertiary: {
      rest: '{semantic.action.default}',
      hover: '{semantic.action.default}',
      pressed: '{semantic.action.default}',
      disabled: '{global.none}',
      loading: '{semantic.action.default}',
    },
    critical: {
      rest: '{global.none}',
      hover: '{global.none}',
      pressed: '{global.none}',
      disabled: '{global.none}',
      loading: '{global.none}',
    },
    criticalSecondary: {
      rest: '{semantic.action.default}',
      hover: '{semantic.action.default}',
      pressed: '{semantic.action.default}',
      disabled: '{global.none}',
      loading: '{semantic.action.default}',
    },
    primaryInverse: {
      rest: '{global.none}',
      hover: '{global.none}',
      pressed: '{global.none}',
      disabled: '{global.none}',
      loading: '{global.none}',
    },
    secondaryInverse: {
      rest: '{semantic.action.default}',
      hover: '{semantic.action.default}',
      pressed: '{semantic.action.default}',
      disabled: '{global.none}',
      loading: '{semantic.action.default}',
    },
  },
  pill: {
    secondaryWarning: {
      rest: '{global.none}',
    },
    secondaryCritical: {
      rest: '{global.none}',
    },
    secondarySuccess: {
      rest: '{global.none}',
    },
    secondaryNeutral: {
      rest: '{global.none}',
    },
    secondaryBrand: {
      rest: '{global.none}',
    },
    secondaryInformative: {
      rest: '{global.none}',
    },
  },
};
