import { type CustomTokenValue } from '../globalTokens.types';
import { type ButtonColors } from './componentColors/button';
import { type IconButtonColors } from './componentColors/iconButton';
import { type GlobalColorTokenKey } from './defaultGlobalColors.types';
import { type SemanticColorTokenKey } from './defaultSemanticColors.types';

export type ComponentColorTokenValue = `{${GlobalColorTokenKey}}` | `{${SemanticColorTokenKey}}` | CustomTokenValue;

export type ComponentColorTokens = {
  button: {
    textPrimary: {
      rest: { label: ComponentColorTokenValue };
      hover: { label: ComponentColorTokenValue };
      pressed: { label: ComponentColorTokenValue };
      disabled: { label: ComponentColorTokenValue };
    };
    textSecondary: {
      rest: { label: ComponentColorTokenValue };
      hover: { label: ComponentColorTokenValue };
      pressed: { label: ComponentColorTokenValue };
      disabled: { label: ComponentColorTokenValue };
    };
    textCritical: {
      rest: { label: ComponentColorTokenValue };
      hover: { label: ComponentColorTokenValue };
      pressed: { label: ComponentColorTokenValue };
      disabled: { label: ComponentColorTokenValue };
    };
    textInverse: {
      rest: { label: ComponentColorTokenValue };
      hover: { label: ComponentColorTokenValue };
      pressed: { label: ComponentColorTokenValue };
      disabled: { label: ComponentColorTokenValue };
    };
  } & ButtonColors;
  iconButton: IconButtonColors;
  tab: {
    default: {
      rest: { label: ComponentColorTokenValue; border: ComponentColorTokenValue; background: ComponentColorTokenValue };
      pressed: {
        label: ComponentColorTokenValue;
        border: ComponentColorTokenValue;
        background: ComponentColorTokenValue;
      };
      hover: {
        label: ComponentColorTokenValue;
        border: ComponentColorTokenValue;
        background: ComponentColorTokenValue;
      };
      selected: {
        label: ComponentColorTokenValue;
        border: ComponentColorTokenValue;
        background: ComponentColorTokenValue;
      };
    };
    neutral: {
      rest: { label: ComponentColorTokenValue; border: ComponentColorTokenValue; background: ComponentColorTokenValue };
      pressed: {
        label: ComponentColorTokenValue;
        border: ComponentColorTokenValue;
        background: ComponentColorTokenValue;
      };
      hover: {
        label: ComponentColorTokenValue;
        border: ComponentColorTokenValue;
        background: ComponentColorTokenValue;
      };
      selected: {
        label: ComponentColorTokenValue;
        border: ComponentColorTokenValue;
        background: ComponentColorTokenValue;
      };
    };
  };
  pill: {
    secondaryWarning: {
      rest: {
        label: ComponentColorTokenValue;
        border: ComponentColorTokenValue;
        background: ComponentColorTokenValue;
      };
    };
    secondaryCritical: {
      rest: {
        label: ComponentColorTokenValue;
        border: ComponentColorTokenValue;
        background: ComponentColorTokenValue;
      };
    };
    secondarySuccess: {
      rest: {
        label: ComponentColorTokenValue;
        border: ComponentColorTokenValue;
        background: ComponentColorTokenValue;
      };
    };
    secondaryNeutral: {
      rest: {
        label: ComponentColorTokenValue;
        border: ComponentColorTokenValue;
        background: ComponentColorTokenValue;
      };
    };
    secondaryBrand: {
      rest: {
        label: ComponentColorTokenValue;
        border: ComponentColorTokenValue;
        background: ComponentColorTokenValue;
      };
    };
    secondaryInformative: {
      rest: {
        label: ComponentColorTokenValue;
        border: ComponentColorTokenValue;
        background: ComponentColorTokenValue;
      };
    };
  };
};

export type ComponentColorTokenKey = `component.${Join<PathsToStringProps<ComponentColorTokens>, '.'>}`;
