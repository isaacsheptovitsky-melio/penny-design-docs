import { cloneDeep, merge } from '@melio/penny-utils';

import { defaultDesignTokens } from '../tokens/defaultDesignTokens';
import { type ThemeDesignTokens } from '../tokens/types';
import { replaceReferenceTokens } from '../tokens/utils';

/**
 * Combines default and custom border radius tokens.
 *
 * @param customBorderRadii - The custom border radius tokens to merge with the default ones.
 * @returns The merged border radius tokens.
 */
export const getThemeRadiiFromTokens = (
  customBorderRadii?: RecursivePartial<ThemeDesignTokens['borderRadii']>
): ThemeDesignTokens['borderRadii'] => {
  // Merge the default border radii tokens with custom ones, if provided
  const mergedTokens = merge(cloneDeep(defaultDesignTokens['borderRadii']), cloneDeep(customBorderRadii));
  const semantic = replaceReferenceTokens(mergedTokens.semantic, { global: mergedTokens.global });
  const component = replaceReferenceTokens(mergedTokens.component, { global: mergedTokens.global, semantic });

  return { ...mergedTokens, semantic, component };
};
