import type { TestIdProp } from '@melio/penny-utils';
import type { HTMLAttributes, ReactNode } from 'react';

import type { InternalCSSObject } from '@/theme/types';

/**
 * The ratio variant between the panels.
 */
export type SplitScreenVariant = '1:2' | '2:1' | '1:1';

type PanelProps = {
  /** The panel header content. */
  header?: ReactNode;
  /** The panel content. */
  content: ReactNode;
  /** The panel footer content. */
  footer?: ReactNode;
  /** Custom padding for the panel. */
  padding?: InternalCSSObject['padding'];
  /** Determines if the panel is in loading state. */
  isLoading?: boolean;
  /** Sets the tab index of the panel, needed for accessibility when the content is scrollable. */
  tabIndex?: HTMLAttributes<HTMLDivElement>['tabIndex'];
};

export type SplitScreenProps = {
  /** The ratio variant of between the panels. @default '1:2' */
  variant?: SplitScreenVariant;
  /** Determines if the entire layout is in loading state. */
  isLoading?: boolean;
  /** Use this to add a header for the whole layout. It will be shown above the 2 panels. */
  header?: ReactNode;
  /** Use this to add a footer for the whole layout. It will be shown below the 2 panels. */
  footer?: ReactNode;
  /** The information related to panel A. In large devices this is the left panel, and in small ones it's the top panel. Only panel A can have minimum and maximum definitions, and they must be numbers that represent the percentage width (e.g `50`). */
  panelA?: PanelProps & {
    /** Minimum width percentage for panel A. */
    minWidth?: number;
    /** Maximum width percentage for panel A. */
    maxWidth?: number;
  };
  /** The information related to panel B. In large devices this is the right panel, and in small ones it's the bottom panel. */
  panelB?: PanelProps;
} & TestIdProp;
