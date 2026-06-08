import type { HTMLAttributes } from 'react';

import type { Button, ButtonProps } from '@/components/action/Button';
import type { IconButton, IconButtonProps } from '@/components/action/IconButton';
import type { NakedButton, NakedButtonProps } from '@/components/action/NakedButton';
import type { SlideProps } from '@/components/foundations/transitions/Slide';
import type { MaxWidthType } from '@/components/layouts/Layout/Layout.types';
import type { ThemeColorKey } from '@/theme/foundations/colors/types';

type SummaryItem = {
  label: string;
  value: string;
  testId?: string;
};

type Action = {
  component: typeof Button | typeof IconButton | typeof NakedButton;
  props: ButtonProps | IconButtonProps | NakedButtonProps;
  testId?: string;
};

export const paddingByBreakpoint = { xs: 's', m: 'm', l: 'l', xl: 'xxl' };

export type ActionBarProps = {
  /**
   * The action bar's max width - should be aligned with the Layout.
   */
  maxWidth?: MaxWidthType;

  /**
   * Determines if the component is visible or not.
   */
  isOpen?: boolean;

  /**
   * Items placed at the left side of the component.
   */
  summaryItems?: SummaryItem[];

  /**
   * Actions placed at the right side of the component.
   */
  actions?: Action[];

  /**
   * Determines if the action bar is loading.
   * @default false
   */
  isLoading?: boolean;

  /**
   * The actions bar loading text.
   */
  loadingText?: string;

  /**
   * The background color of the sticky panel.
   * @default 'semantic.surface.inverse'
   */
  backgroundColor?: ThemeColorKey;
} & Pick<SlideProps, 'shouldRenderAlternativeSlide'> &
  Pick<HTMLAttributes<HTMLDivElement>, 'id'>;
