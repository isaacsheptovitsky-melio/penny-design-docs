import { type TestIdProp } from '@melio/penny-utils';
import { type HTMLAttributes, type ReactElement, type ReactNode } from 'react';

import type { SpacingValue } from '@/theme/foundations/spaces';
import { type InternalCSSObject } from '@/theme/types';

export type MaxWidthType = 'full' | '1600px' | '1200px' | '900px' | '800px' | '600px' | '480px' | number;

export const LayoutMaxWidthDefault: MaxWidthType = '1600px';

export type LayoutBackgroundColor = 'default' | 'white' | 'lightest';

export type LayoutProps = {
  /** The layout's max width. @default '1600px' */
  maxWidth?: MaxWidthType;
  /** Determines if the layout is in loading state. @default false */
  isLoading?: boolean;
  /** The layout's background color. @default 'default' */
  backgroundColor?: LayoutBackgroundColor;
  /** Overrides the content's default padding. */
  paddingContent?: SpacingValue | InternalCSSObject['padding'];
  /** The layout's header. */
  header?: {
    /** The header content. */
    content: ReactElement;
    /** Whether the header should be sticky. */
    isSticky?: boolean;
  };
  /** The layout's footer. */
  footer?: {
    /** The footer content. */
    content: ReactElement;
    /** Whether the footer should be sticky. */
    isSticky?: boolean;
  };
  /** The layout's content. */
  children?: ReactNode;
} & TestIdProp &
  Pick<HTMLAttributes<HTMLDivElement>, 'tabIndex'>;
