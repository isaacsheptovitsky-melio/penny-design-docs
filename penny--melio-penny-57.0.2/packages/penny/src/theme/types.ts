import { type BorderProps, type ResponsiveValue, type SystemProps as _CSSObject } from '@chakra-ui/react';
import type * as CSS from 'csstype';

import { type ThemeSpinner } from '@/theme/foundations/spinner';

import { type ThemeIllustrations } from './defaultIllustrations';
import { type ThemeBlanket } from './foundations/blanket';
import { type ThemeBorderRadii, type ThemeBorderRadiusKey } from './foundations/borderRadii/types';
import { type ThemeBorderKey, type ThemeBorders } from './foundations/borders/types';
import { type ThemeColorKey, type ThemeColors } from './foundations/colors/types';
import { type FontKey, type ThemeFonts } from './foundations/fonts';
import { type ThemeLoader } from './foundations/loader';
import { type ThemeLogos } from './foundations/logos';
import { type ShadowKey } from './foundations/shadows';
import { type SizeKey } from './foundations/sizes';
import { type ThemeSpaceKey } from './foundations/spaces';
import { type textStyles, type ThemeTextStyles } from './foundations/text-styles';
import { type ThemeIcons } from './icons';

export type Theme = {
  colors: ThemeColors;
  textStyles: ThemeTextStyles;
  fonts: ThemeFonts;
  borderRadii: ThemeBorderRadii;
  borders: ThemeBorders;
};

export type ThemeOptions = RecursivePartial<{
  colors: ThemeColors;
  borderRadii: ThemeBorderRadii;
  borders: ThemeBorders;
  textStyles: ThemeTextStyles;
  fonts: ThemeFonts;
  icons: ThemeIcons;
  illustrations: ThemeIllustrations;
  loader: ThemeLoader;
  spinner: ThemeSpinner;
  blanket: ThemeBlanket;
}> & {
  // These are required
  logos: ThemeLogos;
};

type SpaceKey = ResponsiveValue<ThemeSpaceKey | 'auto'>;
export type TextStyle = keyof typeof textStyles;

type BaseColor = 'transparent' | 'inherit' | 'initial';

/**
 * System colors are used to style elements that are part of the system, such as the browser's UI.
 * They are defined in the CSS Color Module Level 4 specification.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#system_colors
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/system-color
 */
type SystemColor = 'Canvas' | 'CanvasText' | 'LinkText' | 'GrayText' | 'Highlight' | 'HighlightText';
export type Color = ResponsiveValue<BaseColor | SystemColor> | ThemeColorKey;

export type BorderRadius = ResponsiveValue<ThemeBorderRadiusKey>;
export type Border = ResponsiveValue<ThemeBorderKey>;

// eslint-disable-next-line @typescript-eslint/naming-convention
type _InternalCSSObject = Omit<
  _CSSObject,
  | keyof BorderProps
  | 'gap'
  | 'rowGap'
  | 'columnGap'
  | 'gridGap'
  | 'textStyle'
  | 'color'
  | 'bgColor'
  | 'backgroundColor'
  | 'boxShadow'
  | 'shadow'
  | 'fontFamily'
  | 'marginLeft'
  | 'ml'
  | 'marginRight'
  | 'mr'
  | 'marginTop'
  | 'mt'
  | 'marginBottom'
  | 'mb'
  | 'my'
  | 'mx'
  | 'marginY'
  | 'marginX'
  | 'm'
  | 'margin'
  | 'paddingLeft'
  | 'pl'
  | 'paddingRight'
  | 'pr'
  | 'paddingTop'
  | 'pt'
  | 'paddingBottom'
  | 'pb'
  | 'py'
  | 'px'
  | 'paddingY'
  | 'paddingX'
  | 'p'
  | 'padding'
  | 'fontSize'
  | 'lineHeight'
  | 'marginBlock'
  | 'marginBlockStart'
  | 'marginBlockEnd'
  | 'marginInline'
  | 'marginInlineStart'
  | 'marginInlineEnd'
  | 'paddingBlock'
  | 'paddingBlockStart'
  | 'paddingBlockEnd'
  | 'paddingInline'
  | 'paddingInlineStart'
  | 'paddingInlineEnd'
  | 'outlineColor'
  | 'aspectRatio'
  | 'caretColor'
  | 'w'
  | 'h'
  | 'width'
  | 'minWidth'
  | 'maxWidth'
  | 'height'
  | 'minHeight'
  | 'maxHeight'
  | 'fill'
  | 'stroke'
> & {
  gap?: SpaceKey;
  rowGap?: SpaceKey;
  columnGap?: SpaceKey;
  gridGap?: SpaceKey;
  textStyle?: ResponsiveValue<TextStyle>;
  fontFamily?: FontKey;
  color?: Color;
  fill?: Color;
  stroke?: Color;
  bgColor?: Color;
  backgroundColor?: Color;
  border?: Border;
  borderColor?: Color;
  borderLeft?: Border;
  borderTop?: Border;
  borderRight?: Border;
  borderBottom?: Border;
  borderRadius?: BorderRadius;
  borderLeftRadius?: BorderRadius;
  borderTopRadius?: BorderRadius;
  borderRightRadius?: BorderRadius;
  borderBottomRadius?: BorderRadius;
  borderTopLeftRadius?: BorderRadius;
  borderTopRightRadius?: BorderRadius;
  borderBottomLeftRadius?: BorderRadius;
  borderBottomRightRadius?: BorderRadius;
  boxShadow?: ResponsiveValue<ShadowKey>;
  shadow?: ResponsiveValue<ShadowKey>;
  marginLeft?: SpaceKey;
  ml?: SpaceKey;
  marginRight?: SpaceKey;
  mr?: SpaceKey;
  marginTop?: SpaceKey;
  mt?: SpaceKey;
  marginBottom?: SpaceKey;
  mb?: SpaceKey;
  my?: SpaceKey;
  mx?: SpaceKey;
  marginY?: SpaceKey;
  marginX?: SpaceKey;
  m?: SpaceKey;
  margin?: SpaceKey;
  paddingLeft?: SpaceKey;
  pl?: SpaceKey;
  paddingRight?: SpaceKey;
  pr?: SpaceKey;
  paddingTop?: SpaceKey;
  pt?: SpaceKey;
  paddingBottom?: SpaceKey;
  pb?: SpaceKey;
  py?: SpaceKey;
  px?: SpaceKey;
  paddingY?: SpaceKey;
  paddingX?: SpaceKey;
  p?: SpaceKey;
  padding?: SpaceKey;
  marginBlockStart?: SpaceKey;
  marginBlock?: SpaceKey;
  marginBlockEnd?: SpaceKey;
  marginInline?: SpaceKey;
  marginInlineStart?: SpaceKey;
  marginInlineEnd?: SpaceKey;
  paddingBlock?: SpaceKey;
  paddingBlockStart?: SpaceKey;
  paddingBlockEnd?: SpaceKey;
  paddingInline?: SpaceKey;
  paddingInlineStart?: SpaceKey;
  paddingInlineEnd?: SpaceKey;
  aspectRatio?: ResponsiveValue<`${number} / ${number}` | 'auto' | 'inherit'>;
  // protect typography
  fontSize?: never;
  lineHeight?: never;
  fontWeight?: never;
  content?: string;
  outlineColor?: Color;
  outlineStyle?: 'solid' | 'hidden' | 'none';
  strokeDashoffset?: number;
  strokeWidth?: number | string;
  strokeDasharray?: number | string;
  caretColor?: Color;
  width?: SizeKey<CSS.Property.Width<number>>;
  maxWidth?: SizeKey<CSS.Property.MaxWidth<number>>;
  minWidth?: SizeKey<CSS.Property.MinWidth<number>>;
  height?: SizeKey<CSS.Property.Height<number>>;
  maxHeight?: SizeKey<CSS.Property.MaxHeight<number>>;
  minHeight?: SizeKey<CSS.Property.MinHeight<number>>;
};
export type InternalCSSObject = _InternalCSSObject | Record<string, _InternalCSSObject>;
