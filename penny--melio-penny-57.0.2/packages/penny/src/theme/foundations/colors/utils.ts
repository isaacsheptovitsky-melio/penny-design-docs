/* eslint-disable @typescript-eslint/no-deprecated */
import { cloneDeep, get, merge } from '@melio/penny-utils';
import { flatten } from 'flat';

import { type ThemeOptions } from '../../types';
import { defaultDesignTokens } from '../tokens/defaultDesignTokens';
import { type ThemeDesignTokens } from '../tokens/types';
import { replaceReferenceTokens } from '../tokens/utils';

export const getColorPalettes = (colors: ThemeOptions['colors']) => {
  const colorPalettes = getThemeColorsFromTokens(defaultDesignTokens['colors'], colors);

  Object.values(colorPalettes).forEach((colorType) => {
    Object.entries(colorType).forEach(
      ([key, value]) =>
        ((colorType[key as keyof typeof colorType] as string) = get(colorPalettes, value, value) as string)
    );
  });

  return colorPalettes;
};

export const getThemeColorKeys = (): Record<string, string> => flatten(defaultDesignTokens.colors);

export const getColorByBgColor = ({
  bgColor,
  darkColor = 'black',
  lightColor = 'white',
}: {
  bgColor: string;
  darkColor?: string;
  lightColor?: string;
}) => {
  const hexCode = bgColor.charAt(0) === '#' ? bgColor.substr(1, 6) : bgColor;

  const hexR = parseInt(hexCode.substr(0, 2), 16);
  const hexG = parseInt(hexCode.substr(2, 2), 16);
  const hexB = parseInt(hexCode.substr(4, 2), 16);
  // Gets the average value of the colors
  const contrastRatio = (hexR + hexG + hexB) / (255 * 3);

  return contrastRatio >= 0.7 ? darkColor : lightColor;
};

export const getThemeColorsFromTokens = (
  defaultColorTokens: ThemeDesignTokens['colors'],
  customColorTokens: RecursivePartial<ThemeDesignTokens['colors']> | undefined
): ThemeDesignTokens['colors'] => {
  // Merge default with custom tokens
  const mergedTokens = merge(cloneDeep(defaultColorTokens), cloneDeep(customColorTokens));

  // Replace references. Semantic and component tokens can link to other token value, we want to have the actual values.
  const semantic = replaceReferenceTokens(mergedTokens.semantic, { global: mergedTokens.global });
  const component = replaceReferenceTokens(mergedTokens.component, { global: mergedTokens.global, semantic });

  return { ...mergedTokens, semantic, component };
};
