import { type TestIdProp } from '@melio/penny-utils';

import { type ContainerProps } from '../Container';
import { BorderOptions as ContainerBorderOptions } from '../Container/Container.types';

const { None, ...BorderOptionsTemp } = ContainerBorderOptions;

export const BorderOptions = BorderOptionsTemp;

/**
 * Border options for the stacked container (excluding 'none').
 */
export type BorderOptions = (typeof BorderOptions)[keyof typeof BorderOptions];

/**
 * Number of background stacks to display behind the main container.
 */
export type StacksToDisplay = 0 | 1 | 2;

export type StackedContainerProps = Omit<ContainerProps, 'border' | 'backgroundColor'> & {
  /** Determines the stackedContainer's stacksToDisplay styles. @default 0 */
  stacksToDisplay: StacksToDisplay;
  /** Determines the stackedContainer's border styles. @default 'regular' */
  border?: BorderOptions;
  /** The stackedContainer's x-axis padding. @default 'none' */
  paddingX?: ContainerProps['paddingX'];
  /** The stackedContainer's y-axis padding. @default 'none' */
  paddingY?: ContainerProps['paddingY'];
} & TestIdProp;

export type StackedContainerItemsProps = StackedContainerProps;
