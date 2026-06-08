import { type CustomTokenValue } from '../globalTokens.types';
import { type GlobalBorderTokenKey } from './defaultGlobalBorders.types';

export type SemanticBorderTokenValue = `{${GlobalBorderTokenKey}}` | CustomTokenValue;

export type SemanticBorderTokens = {
  action: { default: SemanticBorderTokenValue };
  container: { default: SemanticBorderTokenValue };
  input: { default: SemanticBorderTokenValue };
  focus: SemanticBorderTokenValue;
};

export type SemanticBorderTokenKey = `semantic.${Join<PathsToStringProps<SemanticBorderTokens>, '.'>}`;
