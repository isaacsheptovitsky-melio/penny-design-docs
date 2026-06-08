import { type CustomTokenValue } from '../globalTokens.types';
import { type GlobalBorderTokenKey } from './defaultGlobalBorders.types';
import { type SemanticBorderTokenKey } from './defaultSemanticBorders.types';

export type ComponentBorderTokenValue = `{${GlobalBorderTokenKey}}` | `{${SemanticBorderTokenKey}}` | CustomTokenValue;

export type ComponentBorderTokens = {
  button: {
    primary: {
      rest: ComponentBorderTokenValue;
      hover: ComponentBorderTokenValue;
      pressed: ComponentBorderTokenValue;
      disabled: ComponentBorderTokenValue;
      loading: ComponentBorderTokenValue;
    };
    secondary: {
      rest: ComponentBorderTokenValue;
      hover: ComponentBorderTokenValue;
      pressed: ComponentBorderTokenValue;
      disabled: ComponentBorderTokenValue;
      loading: ComponentBorderTokenValue;
    };
    tertiary: {
      rest: ComponentBorderTokenValue;
      hover: ComponentBorderTokenValue;
      pressed: ComponentBorderTokenValue;
      disabled: ComponentBorderTokenValue;
      loading: ComponentBorderTokenValue;
    };
    critical: {
      rest: ComponentBorderTokenValue;
      hover: ComponentBorderTokenValue;
      pressed: ComponentBorderTokenValue;
      disabled: ComponentBorderTokenValue;
      loading: ComponentBorderTokenValue;
    };
    criticalSecondary: {
      rest: ComponentBorderTokenValue;
      hover: ComponentBorderTokenValue;
      pressed: ComponentBorderTokenValue;
      disabled: ComponentBorderTokenValue;
      loading: ComponentBorderTokenValue;
    };
    primaryInverse: {
      rest: ComponentBorderTokenValue;
      hover: ComponentBorderTokenValue;
      pressed: ComponentBorderTokenValue;
      disabled: ComponentBorderTokenValue;
      loading: ComponentBorderTokenValue;
    };
    secondaryInverse: {
      rest: ComponentBorderTokenValue;
      hover: ComponentBorderTokenValue;
      pressed: ComponentBorderTokenValue;
      disabled: ComponentBorderTokenValue;
      loading: ComponentBorderTokenValue;
    };
  };
  iconButton: {
    primary: {
      rest: ComponentBorderTokenValue;
      hover: ComponentBorderTokenValue;
      pressed: ComponentBorderTokenValue;
      disabled: ComponentBorderTokenValue;
      loading: ComponentBorderTokenValue;
    };
    secondary: {
      rest: ComponentBorderTokenValue;
      hover: ComponentBorderTokenValue;
      pressed: ComponentBorderTokenValue;
      disabled: ComponentBorderTokenValue;
      loading: ComponentBorderTokenValue;
    };
    tertiary: {
      rest: ComponentBorderTokenValue;
      hover: ComponentBorderTokenValue;
      pressed: ComponentBorderTokenValue;
      disabled: ComponentBorderTokenValue;
      loading: ComponentBorderTokenValue;
    };
    critical: {
      rest: ComponentBorderTokenValue;
      hover: ComponentBorderTokenValue;
      pressed: ComponentBorderTokenValue;
      disabled: ComponentBorderTokenValue;
      loading: ComponentBorderTokenValue;
    };
    criticalSecondary: {
      rest: ComponentBorderTokenValue;
      hover: ComponentBorderTokenValue;
      pressed: ComponentBorderTokenValue;
      disabled: ComponentBorderTokenValue;
      loading: ComponentBorderTokenValue;
    };
    primaryInverse: {
      rest: ComponentBorderTokenValue;
      hover: ComponentBorderTokenValue;
      pressed: ComponentBorderTokenValue;
      disabled: ComponentBorderTokenValue;
      loading: ComponentBorderTokenValue;
    };
    secondaryInverse: {
      rest: ComponentBorderTokenValue;
      hover: ComponentBorderTokenValue;
      pressed: ComponentBorderTokenValue;
      disabled: ComponentBorderTokenValue;
      loading: ComponentBorderTokenValue;
    };
  };
  pill: {
    secondaryWarning: {
      rest: ComponentBorderTokenValue;
    };
    secondaryCritical: {
      rest: ComponentBorderTokenValue;
    };
    secondarySuccess: {
      rest: ComponentBorderTokenValue;
    };
    secondaryNeutral: {
      rest: ComponentBorderTokenValue;
    };
    secondaryBrand: {
      rest: ComponentBorderTokenValue;
    };
    secondaryInformative: {
      rest: ComponentBorderTokenValue;
    };
  };
};
