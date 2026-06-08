import { type AriaRole, type CSSProperties, type ElementType, type HTMLAttributes, type ReactNode } from 'react';

import { type ThemeSpaceKey } from '@/theme/foundations/spaces';
import { type HeightProp, type WidthProp } from '@/theme/utils/utils';

import { type GroupVariants } from './Group.utils';
import { type GroupDividerProps } from './GroupDivider';

/**
 * Alignment options for items on the secondary axis.
 */
export type GroupAlignItems = Extract<
  CSSProperties['alignItems'],
  'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline'
>;

/**
 * Alignment options for items on the primary axis.
 */
export type GroupJustifyContent = Extract<
  CSSProperties['justifyContent'],
  'stretch' | 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | 'baseline'
>;

/**
 * Text alignment options for the group.
 */
export type GroupTextAlign = Extract<CSSProperties['textAlign'], 'start' | 'center' | 'end' | 'justify'>;

/**
 * Width options for the group.
 */
export type GroupWidth = Extract<WidthProp, 'full' | 'fit-content' | 'auto'>;

/**
 * Height options for the group.
 */
export type GroupHeight = Extract<HeightProp, 'full' | 'fit-content' | 'auto'>;

export type GroupProps = {
  /** Determines the spacing between the elements. @default 's' */
  spacing?: ThemeSpaceKey;
  /** Determines the variant of the group (to which direction it will flow). @default 'horizontal' */
  variant?: GroupVariants;
  /** Determines if to add a divider between elements. */
  hasDivider?: boolean;
  /** The dividers a11y props */
  dividerProps?: GroupDividerProps['dividerProps'];
  /** Should the group allow the content to overflow in the X axis. */
  allowOverflowX?: boolean;
  /** Align the items on the secondary axis. @default 'stretch' */
  alignItems?: GroupAlignItems;
  /** Align the items on the primary axis. @default 'stretch' */
  justifyContent?: GroupJustifyContent;
  /** Align the text in the items. @default 'start' */
  textAlign?: GroupTextAlign;
  /** The width of the container. @default 'auto' */
  width?: GroupWidth;
  /** The height of the container. @default 'auto' */
  height?: GroupHeight;
  /** The content of the group to be arranged. */
  children?: ReactNode;
  /** Sets the CSS position property */
  position?: CSSProperties['position'];
  /** The semantic meaning of the element. */
  role?: AriaRole;
  /** Determines which type of element the component should be rendered as. @default 'div' */
  as?: ElementType;
} & HTMLAttributes<HTMLDivElement>;
