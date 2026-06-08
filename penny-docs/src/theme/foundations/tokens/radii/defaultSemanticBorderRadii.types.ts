import { type CustomTokenValue } from '../globalTokens.types';
import { type GlobalBorderRadiusTokenKey } from './defaultGlobalBorderRadii.types';

export type SemanticBorderRadiusTokenValue = `{${GlobalBorderRadiusTokenKey}}` | CustomTokenValue;

export type SemanticBorderRadiusTokens = {
  action: { default: SemanticBorderRadiusTokenValue };
  input: { default: SemanticBorderRadiusTokenValue };
};

export type SemanticBorderRadiusTokenKey = `semantic.${Join<PathsToStringProps<SemanticBorderRadiusTokens>, '.'>}`;
