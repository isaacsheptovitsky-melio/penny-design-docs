import { type TestIdProp } from '@melio/penny-utils';
import { type PropsWithChildren } from 'react';

import { type InternalCSSObject } from '@/theme/types';

type CommonCellProps = {
  /** Size of the cell */
  size: ColSize;
  /** Whether the cell is sticky */
  isSticky?: boolean;
} & TestIdProp;
type LoadingProps = {
  /** Whether the component is in loading state */
  isLoading?: boolean;
};

export type FormLineItemsProps = PropsWithChildren<TestIdProp>;
export type HeaderRowProps = PropsWithChildren<TestIdProp>;
export type HeaderCellProps = PropsWithChildren<CommonCellProps>;
export type BodyProps = PropsWithChildren<LoadingProps & TestIdProp>;
export type RowProps = PropsWithChildren<LoadingProps & TestIdProp>;
export type CellProps = PropsWithChildren<CommonCellProps>;
export type MobileListProps = PropsWithChildren<TestIdProp>;
export type MobileListItemProps = PropsWithChildren<
  TestIdProp & {
    /** Index of the mobile list item */
    index: number;
  }
>;

/** Size options for columns */
export type ColSize = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | number;

export const getFixedCellSize = (size?: ColSize): InternalCSSObject =>
  typeof size === 'number'
    ? {
        minWidth: `${size}px`,
        width: `${size}px`,
        maxWidth: `${size}px`,
      }
    : {};
