import type { TestIdProp } from '@melio/penny-utils';
import type { HTMLAttributes, ReactNode } from 'react';

import type { ThemeColors } from '@/theme/foundations/colors/types';
import type { TextStyleKey } from '@/theme/foundations/text-styles';

/**
 * Available HTML element types for text rendering
 */
export const asOptions = [
  'span',
  'p',
  'div',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'section',
  'caption',
] as const;

/**
 * HTML element type for text component
 */
export type AsType = (typeof asOptions)[number];

type TextColorType = Join<PathsToStringProps<ThemeColors & { inherit: 'inherit' }>, '.'>;

export type TextProps = {
  /**
   * The text to display.
   */
  children: ReactNode;

  /**
   * Determines the typography of the text.
   * @default 'body2'
   */
  textStyle?: TextStyleKey;

  /**
   * Determines the color of the text.
   * @default 'semantic.text.primary'
   */
  color?: TextColorType;

  /**
   * Determines which type of element the component should be rendered as.
   * @default 'span'
   */
  as?: AsType;

  /**
   * If true, the text will support ellipsis and a tooltip will be shown when the text is truncated.
   * The tooltip will show the full text. This will only work if the `children` are of type `string`.
   * @default false
   */
  shouldSupportEllipsis?: boolean;

  /**
   * Disables the `resize` event listener.
   * Useful if you know your text container has static width and you want to avoid unnecessary renders that might affect performance.
   * @default false
   */
  disableResizeListener?: boolean;
} & HTMLAttributes<HTMLDivElement> &
  TestIdProp;
