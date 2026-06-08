import { flatten } from 'flat';

import type { ThemeOptions } from '@/theme';

import { type DesignTokenMetadata, type DesignTokenType, type ThemeTokenType } from './types';

const tokenTypeByThemeType: Record<ThemeTokenType, DesignTokenType> = {
  colors: 'color',
  borders: 'border',
  breakpoints: 'breakpoints',
  radii: 'borderRadius',
  fonts: 'fontFamily',
  fontWeights: 'fontWeight',
  space: 'spacing',
  shadows: 'shadow',
  zIndices: 'zIndex',
  textStyles: 'textStyle',
};

export function extractDesignTokens(): DesignTokenMetadata[] {
  const tokens: DesignTokenMetadata[] = [];

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { extendTheme } = require('../../src/theme/theme');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const theme = extendTheme({}) as ThemeOptions;

  Object.entries(tokenTypeByThemeType).forEach(([themeKey, tokenType]) => {
    const typeTokens = theme[themeKey as keyof ThemeOptions];
    if (typeTokens) {
      const extractedTokens = extractFlattenedTokens(typeTokens, tokenType);
      tokens.push(...extractedTokens);
    }
  });

  return tokens.sort((a, b) => a.name.localeCompare(b.name));
}

function extractFlattenedTokens(obj: unknown, tokenType: DesignTokenType): DesignTokenMetadata[] {
  if (!obj || typeof obj !== 'object') return [];

  // `textStyles` are not tokens but shortcut for several tokens so need to be handled differently
  const maxDepth = tokenType === 'textStyle' ? 1 : undefined;
  const flattenedTokens: Record<string, string> = flatten(obj, { delimiter: '.', maxDepth });
  const tokens: DesignTokenMetadata[] = [];

  Object.entries(flattenedTokens).forEach(([path, value]) => {
    const level = detectTokenLevel(path);

    tokens.push({
      name: path,
      value,
      type: tokenType,
      level,
    });
  });

  return tokens;
}

function detectTokenLevel(tokenName: string): 'global' | 'semantic' | 'component' | undefined {
  if (tokenName.startsWith('global.')) {
    return 'global';
  }
  if (tokenName.startsWith('semantic.')) {
    return 'semantic';
  }
  if (tokenName.startsWith('component.')) {
    return 'component';
  }

  return undefined;
}
