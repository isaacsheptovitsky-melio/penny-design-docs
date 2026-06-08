import type { ResponsiveValue } from '@chakra-ui/react';
import type { TestIdProp } from '@melio/penny-utils';
import type { CSSProperties, MouseEventHandler, ReactNode, SyntheticEvent } from 'react';

import type { ThemeColorKey } from '@/theme/foundations/colors/types';
import type { GlobalBorderRadiusTokenKey } from '@/theme/foundations/tokens/radii/defaultGlobalBorderRadii.types';
import type { InternalCSSObject } from '@/theme/types';

/**
 * Available aspect ratios for the Image component
 */
export type AspectRatio = '1 / 1' | '16 / 9' | '4 / 3' | '7 / 3';

export type BaseImageProps = {
  /** The path to the image. */
  src: HTMLImageElement['src'];
  /** An alternate text for the image, if the image cannot be displayed. Necessary for a11y. */
  alt: HTMLImageElement['alt'];
  /** Title to provide further supporting information if needed, This gives us a tooltip on mouse hover */
  title?: HTMLImageElement['title'];
  /** A callback for when there was an error loading the image. */
  onError?: (event: SyntheticEvent<HTMLImageElement, Event>) => void;
  /** A callback for when the image has been loaded. */
  onLoad?: (event: SyntheticEvent<HTMLImageElement, Event>) => void;
  /** A callback for when clicking the image. */
  onClick?: MouseEventHandler<HTMLDivElement>;
  /** Determines if the image is disabled. */
  isDisabled?: boolean;
  /** Determines if the image is read-only. */
  isReadOnly?: boolean;
  /** How the image to fit within its bounds. It maps to css ['object-fit'](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) property. @default 'cover' */
  objectFit?: CSSProperties['objectFit'];
  /** used to align the image within the box that contains it ['object-position'](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) property. @default 'center' */
  objectPosition?: CSSProperties['objectPosition'];
  /** The width of the Image, if not provided it will take the width of the container. */
  width?: CSSProperties['width'];
  /** The height of the Image, if not provided it will take the height of the container. */
  height?: CSSProperties['height'];
  /** Property allows you to define the desired width-to-height ratio of an element's box. */
  aspectRatio?: InternalCSSObject['aspectRatio'] | AspectRatio;
  /** The border radius of the image. */
  borderRadius?: ResponsiveValue<GlobalBorderRadiusTokenKey>;
  /** The fallback icon to display when an error occurred while loading the image / the provided image `src` is wrong */
  fallbackIcon?: ReactNode;
} & TestIdProp;

export type ImageThemeProps = Pick<
  BaseImageProps,
  'borderRadius' | 'aspectRatio' | 'width' | 'height' | 'objectFit' | 'objectPosition'
> & {
  variant?: 'circle' | 'square';
  fallbackImageBackgroundColor?: ThemeColorKey | 'transparent';
};

type SquareBorderRadius = {
  borderRadius?: Extract<InternalCSSObject['borderRadius'], GlobalBorderRadiusTokenKey>;
};

type InvalidSquareImageProps = SquareBorderRadius & { aspectRatio: AspectRatio } & {
  width: CSSProperties['width'];
  height: CSSProperties['height'];
};

type InvalidCircleImageProps = { borderRadius: 'global.full'; aspectRatio: AspectRatio };

export type ImageValidateProps<T extends BaseImageProps> = T extends InvalidSquareImageProps
  ? '`aspectRatio` is not supported for images with fixed width and height.'
  : T extends InvalidCircleImageProps
    ? '`aspectRatio` is not supported for circle images.'
    : T;

export type ImageProps = ImageValidateProps<BaseImageProps>;
