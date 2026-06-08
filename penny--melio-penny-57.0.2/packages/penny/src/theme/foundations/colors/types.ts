import { type ThemeDesignTokens } from '../tokens/types';

export type ThemeColors = ThemeDesignTokens['colors'];

export type ThemeColorKey = Join<PathsToStringProps<ThemeColors>, '.'>;
