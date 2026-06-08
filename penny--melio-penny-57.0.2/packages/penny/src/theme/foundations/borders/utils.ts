import { cloneDeep, merge } from '@melio/penny-utils';

import { defaultDesignTokens } from '../tokens/defaultDesignTokens';
import { type ThemeDesignTokens } from '../tokens/types';
import { replaceReferenceTokens } from '../tokens/utils';

/**
 * Combines default and custom border tokens.
 *
 * @param customBorders - The custom border tokens to merge with the default ones.
 * @returns The merged border tokens.
 */
export const getThemeBordersFromTokens = (
  customBorders?: RecursivePartial<ThemeDesignTokens['borders']>
): ThemeDesignTokens['borders'] => {
  // Merge the default border radii tokens with custom ones, if provided
  const mergedTokens = merge(cloneDeep(defaultDesignTokens['borders']), cloneDeep(customBorders));
  const semantic = replaceReferenceTokens(mergedTokens.semantic, { global: mergedTokens.global });
  const component = replaceReferenceTokens(mergedTokens.component, { global: mergedTokens.global, semantic });

  return { ...mergedTokens, semantic, component };
};
