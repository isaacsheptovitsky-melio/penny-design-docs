import { type ThemeDesignTokens } from '../tokens/types';

export type ThemeBorderRadii = ThemeDesignTokens['borderRadii'];

export type ThemeBorderRadiusKey = Join<PathsToStringProps<ThemeBorderRadii>, '.'>;
