import { type CustomTokenValue } from '../globalTokens.types';
import { type GlobalColorTokenKey } from './defaultGlobalColors.types';

export type SemanticColorTokenValue = `{${GlobalColorTokenKey}}` | CustomTokenValue;

export type SemanticColorTokens = {
  background: {
    primary: SemanticColorTokenValue;
    secondary: SemanticColorTokenValue;
    brand: {
      primary: SemanticColorTokenValue;
      secondary: SemanticColorTokenValue;
    };
  };
  surface: {
    primary: {
      rest: SemanticColorTokenValue;
      hover: SemanticColorTokenValue;
      pressed: SemanticColorTokenValue;
      selected: SemanticColorTokenValue;
      disabled: SemanticColorTokenValue;
    };
    secondary: {
      rest: SemanticColorTokenValue;
      hover: SemanticColorTokenValue;
      pressed: SemanticColorTokenValue;
      selected: SemanticColorTokenValue;
      disabled: SemanticColorTokenValue;
    };
    inverse: SemanticColorTokenValue;
    tertiary: {
      rest: SemanticColorTokenValue;
      hover: SemanticColorTokenValue;
      pressed: SemanticColorTokenValue;
      selected: SemanticColorTokenValue;
      disabled: SemanticColorTokenValue;
    };
  };
  action: {
    primary: {
      rest: SemanticColorTokenValue;
      hover: SemanticColorTokenValue;
      pressed: SemanticColorTokenValue;
      disabled: SemanticColorTokenValue;
    };
    secondary: {
      rest: SemanticColorTokenValue;
      hover: SemanticColorTokenValue;
      pressed: SemanticColorTokenValue;
      disabled: SemanticColorTokenValue;
    };
    tertiary: {
      rest: SemanticColorTokenValue;
      hover: SemanticColorTokenValue;
      pressed: SemanticColorTokenValue;
      disabled: SemanticColorTokenValue;
    };
    success: {
      rest: SemanticColorTokenValue;
      hover: SemanticColorTokenValue;
      pressed: SemanticColorTokenValue;
      disabled: SemanticColorTokenValue;
    };
    criticalPrimary: {
      rest: SemanticColorTokenValue;
      hover: SemanticColorTokenValue;
      pressed: SemanticColorTokenValue;
      disabled: SemanticColorTokenValue;
    };
    criticalSecondary: {
      rest: SemanticColorTokenValue;
      hover: SemanticColorTokenValue;
      pressed: SemanticColorTokenValue;
      disabled: SemanticColorTokenValue;
    };
    inversePrimary: {
      rest: SemanticColorTokenValue;
      hover: SemanticColorTokenValue;
      pressed: SemanticColorTokenValue;
      disabled: SemanticColorTokenValue;
    };
    inverseSecondary: {
      rest: SemanticColorTokenValue;
      hover: SemanticColorTokenValue;
      pressed: SemanticColorTokenValue;
      disabled: SemanticColorTokenValue;
    };
    inverseTertiary: {
      rest: SemanticColorTokenValue;
      hover: SemanticColorTokenValue;
      pressed: SemanticColorTokenValue;
      disabled: SemanticColorTokenValue;
    };
  };
  fill: {
    primary: SemanticColorTokenValue;
    secondary: SemanticColorTokenValue;
    tertiary: SemanticColorTokenValue;
    disabled: SemanticColorTokenValue;
    inverse: SemanticColorTokenValue;
    readOnly: SemanticColorTokenValue;
    brand: {
      primary: SemanticColorTokenValue;
      secondary: SemanticColorTokenValue;
    };
    informative: {
      primary: SemanticColorTokenValue;
      secondary: SemanticColorTokenValue;
    };
    critical: {
      primary: SemanticColorTokenValue;
      secondary: SemanticColorTokenValue;
    };
    success: {
      primary: SemanticColorTokenValue;
      secondary: SemanticColorTokenValue;
    };
    warning: {
      primary: SemanticColorTokenValue;
      secondary: SemanticColorTokenValue;
    };
    decorative: {
      '1': SemanticColorTokenValue;
      '2': SemanticColorTokenValue;
      '3': SemanticColorTokenValue;
      '4': SemanticColorTokenValue;
      '5': SemanticColorTokenValue;
    };
  };
  text: {
    primary: SemanticColorTokenValue;
    secondary: SemanticColorTokenValue;
    inverse: SemanticColorTokenValue;
    disabled: SemanticColorTokenValue;
    brand: {
      rest: SemanticColorTokenValue;
      hover: SemanticColorTokenValue;
      pressed: SemanticColorTokenValue;
      onColor: SemanticColorTokenValue;
    };
    informative: {
      rest: SemanticColorTokenValue;
      hover: SemanticColorTokenValue;
      pressed: SemanticColorTokenValue;
      onColor: SemanticColorTokenValue;
    };
    critical: {
      rest: SemanticColorTokenValue;
      hover: SemanticColorTokenValue;
      pressed: SemanticColorTokenValue;
      onColor: SemanticColorTokenValue;
    };
    success: {
      rest: SemanticColorTokenValue;
      hover: SemanticColorTokenValue;
      pressed: SemanticColorTokenValue;
      onColor: SemanticColorTokenValue;
    };
  };
  link: {
    primary: {
      rest: SemanticColorTokenValue;
      hover: SemanticColorTokenValue;
      pressed: SemanticColorTokenValue;
      disabled: SemanticColorTokenValue;
    };
    secondary: {
      rest: SemanticColorTokenValue;
      hover: SemanticColorTokenValue;
      pressed: SemanticColorTokenValue;
      disabled: SemanticColorTokenValue;
    };
    inverse: {
      rest: SemanticColorTokenValue;
      hover: SemanticColorTokenValue;
      pressed: SemanticColorTokenValue;
      disabled: SemanticColorTokenValue;
    };
  };
  border: {
    static: SemanticColorTokenValue;
    interactive: {
      rest: SemanticColorTokenValue;
      hover: SemanticColorTokenValue;
      selected: SemanticColorTokenValue;
      disabled: SemanticColorTokenValue;
    };
    inverse: SemanticColorTokenValue;
    brand: SemanticColorTokenValue;
    critical: SemanticColorTokenValue;
    success: SemanticColorTokenValue;
    warning: SemanticColorTokenValue;
    informative: SemanticColorTokenValue;
    neutral: SemanticColorTokenValue;
  };
  icon: {
    primary: SemanticColorTokenValue;
    disabled: SemanticColorTokenValue;
    readOnly: SemanticColorTokenValue;
    inverse: SemanticColorTokenValue;
    inverseDisabled: SemanticColorTokenValue;
    brand: SemanticColorTokenValue;
    informative: SemanticColorTokenValue;
    critical: SemanticColorTokenValue;
    success: SemanticColorTokenValue;
    warning: SemanticColorTokenValue;
  };
  illustration: {
    background: SemanticColorTokenValue;
    border: SemanticColorTokenValue;
    critical: SemanticColorTokenValue;
    success: SemanticColorTokenValue;
    brand: {
      primary: SemanticColorTokenValue;
      secondary: SemanticColorTokenValue;
    };
  };
  focus: {
    primary: SemanticColorTokenValue;
    inverse: SemanticColorTokenValue;
  };
};

export type SemanticColorTokenKey = `semantic.${Join<PathsToStringProps<SemanticColorTokens>, '.'>}`;
