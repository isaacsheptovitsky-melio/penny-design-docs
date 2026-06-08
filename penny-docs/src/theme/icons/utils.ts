import { flatten } from 'flat';

import { defaultDesignTokens } from '../foundations/tokens/defaultDesignTokens';
import { getBrandSymbolsMap } from './brandSymbol.generated';
import { type BrandSymbolKey } from './brandSymbol.generated.types';
import { type IconSize, iconSizeMapping } from './icon.types';

export const getBaseIconColors = (): Record<string, string> =>
  flatten({ ...defaultDesignTokens.colors, inherit: 'inherit' });

export const getIconSize = ({ size = 'medium', isURLIcon }: { size?: IconSize; isURLIcon?: boolean }) => ({
  // Using explicit pixels because the icon is an svg and its size is determined by its parent's font-size.
  fontSize: iconSizeMapping[size] as never,
  width: isURLIcon ? (iconSizeMapping[size] as never) : undefined,
  height: isURLIcon ? (iconSizeMapping[size] as never) : undefined,
});

export const getImageIconSize = ({ size = 'medium' }: { size?: IconSize }) => ({
  width: iconSizeMapping[size],
  minWidth: iconSizeMapping[size],
  height: iconSizeMapping[size],
  minHeight: iconSizeMapping[size],
});

export const isBrandSymbol = (icon: unknown): icon is BrandSymbolKey =>
  typeof icon === 'string' && Boolean(Object.keys(getBrandSymbolsMap('')).includes(icon));
