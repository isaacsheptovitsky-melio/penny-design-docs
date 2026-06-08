import { type CustomTokenValue } from '../globalTokens.types';
import { type GlobalBorderRadiusTokenKey } from './defaultGlobalBorderRadii.types';
import { type SemanticBorderRadiusTokenKey } from './defaultSemanticBorderRadii.types';

export type ComponentBorderRadiusTokenValue =
  | `{${GlobalBorderRadiusTokenKey}}`
  | `{${SemanticBorderRadiusTokenKey}}`
  | CustomTokenValue;

export type ComponentBorderRadiusTokens = {
  pill: { default: ComponentBorderRadiusTokenValue };
  card: { default: ComponentBorderRadiusTokenValue };
  container: { default: ComponentBorderRadiusTokenValue };
  navigationItem: { default: ComponentBorderRadiusTokenValue };
  sectionBanner: { default: ComponentBorderRadiusTokenValue };
  baseModal: { default: ComponentBorderRadiusTokenValue };
  bottomSheet: { default: ComponentBorderRadiusTokenValue };
};
