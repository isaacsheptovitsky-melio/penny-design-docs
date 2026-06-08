import type { TestIdProp } from '@melio/penny-utils';
import type { LottieRefCurrentProps } from 'lottie-react';
import type { CSSProperties } from 'react';

import type { ThemeColorKey } from '@/theme/foundations/colors/types';

export type LottieProps = {
  /** The animation function for the Lottie animation. This can be either the Lottie animation directly, or a function that returns the Lottie animation (used to allow overriding the colors with theme colors). */
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  animation: unknown | ((...rest: number[][]) => unknown);
  /** Determines if the Lottie animation should loop. @default true */
  loop?: boolean;
  /** Pass color names to be used in the Lottie. This prop is relevant if you pass the Lottie animation as a function. We use these colors to pass to the animation so it could override the colors. */
  colors?: ThemeColorKey[];
  /** The width of the Lottie container @default '450px' */
  width?: CSSProperties['width'];
  /** The height of the Lottie container @default '340px' */
  height?: CSSProperties['height'];
} & TestIdProp;
export type { LottieRefCurrentProps as LottieRef };
