import { type ThemeDesignTokens } from '../tokens/types';

export type ThemeBorders = ThemeDesignTokens['borders'];

export type ThemeBorderKey = Join<PathsToStringProps<ThemeBorders>, '.'>;
