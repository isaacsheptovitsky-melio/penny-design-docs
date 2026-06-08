import { type BoxProps } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';
import { type AriaAttributes, type CSSProperties, type HTMLAttributes } from 'react';

import { type ThemeSpaceKey } from '@/theme/foundations/spaces';
import { type HeightProp, type WidthProp } from '@/theme/utils/utils';

export const BackgroundColorOptions = {
  Light: 'light',
  White: 'white',
  Default: 'default',
} as const;

/**
 * Background color options for the container.
 */
export type BackgroundColorOptions = (typeof BackgroundColorOptions)[keyof typeof BackgroundColorOptions];

export const BorderOptions = {
  None: 'none',
  Regular: 'regular',
  Dashed: 'dashed',
} as const;

/**
 * Border style options for the container.
 */
export type BorderOptions = (typeof BorderOptions)[keyof typeof BorderOptions];

/**
 * Alignment options for items on the secondary axis.
 */
export type ContainerAlignItems = Extract<
  CSSProperties['alignItems'],
  'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline'
>;

/**
 * Alignment options for items on the primary axis.
 */
export type ContainerJustifyContent = Extract<
  CSSProperties['justifyContent'],
  'stretch' | 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | 'baseline'
>;

/**
 * Text alignment options for the container.
 */
export type ContainerTextAlign = Extract<CSSProperties['textAlign'], 'start' | 'center' | 'end' | 'justify'>;

/**
 * Width options for the container.
 */
export type ContainerWidth = Extract<WidthProp, 'full' | 'fit-content'>;

/**
 * Height options for the container.
 */
export type ContainerHeight = Extract<HeightProp, 'full' | 'auto' | 'fit-content'>;

export type ContainerProps = AriaAttributes &
  HTMLAttributes<HTMLDivElement> & {
    /** Determines the container's border styles. @default 'none' */
    border?: BorderOptions;
    /** The container's x-axis padding. @default 'none' */
    paddingX?: ThemeSpaceKey;
    /** The container's y-axis padding. @default 'none' */
    paddingY?: ThemeSpaceKey;
    /** The container's top padding. */
    paddingTop?: ThemeSpaceKey;
    /** The container's bottom padding. */
    paddingBottom?: ThemeSpaceKey;
    /** The container's left padding. */
    paddingLeft?: ThemeSpaceKey;
    /** The container's right padding. */
    paddingRight?: ThemeSpaceKey;
    /** Determines the container's background color. @default 'default' */
    backgroundColor?: BackgroundColorOptions;
    /** The width of the container. @default 'full' */
    width?: ContainerWidth;
    /** The height of the container. @default 'auto' */
    height?: ContainerHeight;
    /** Determines if the container is in a sticky position. When provided, it overrides the 'position' and 'top' properties. */
    isSticky?: boolean;
    /** Align the items on the secondary axis. @default 'stretch' */
    alignItems?: ContainerAlignItems;
    /** Align the items on the primary axis. @default 'stretch' */
    justifyContent?: ContainerJustifyContent;
    /** Align the text in the items. @default 'start' */
    textAlign?: ContainerTextAlign;
    /** Determine what should happen if content overflows. @default 'hidden' */
    overflow?: CSSProperties['overflow'];
    /** The HTML element to render as. */
    as?: BoxProps['as'];
    /** Sets the container's position. @default 'static' */
    position?: CSSProperties['position'];
    /** The max-width of the container. If the width of the container set to fit-content then you shouldn't define a max-width. @default 'none' */
    maxWidth?: CSSProperties['maxWidth'];
    /** Determine the final top location of positioned container. This prop should be used to override the default top position locations. */
    top?: CSSProperties['top'];
    /** Determine the final right location of positioned container. This prop should be used to override the default right position locations. */
    right?: CSSProperties['right'];
    /** Determine the final left location of positioned container. This prop should be used to override the default left position locations. */
    left?: CSSProperties['left'];
    /** Determine the final bottom location of positioned container. This prop should be used to override the default bottom position locations. */
    bottom?: CSSProperties['bottom'];
    /** Sets the tab index of the container, needed for accessibility when the content is scrollable. */
    tabIndex?: BoxProps['tabIndex'];
  } & TestIdProp;
