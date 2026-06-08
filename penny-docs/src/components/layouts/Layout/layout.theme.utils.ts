import type { ThemeColorKey } from '@/theme/foundations/colors/types';
import { getSpaceValue } from '@/theme/foundations/spaces';

import { type LayoutBackgroundColor, type LayoutProps } from './Layout.types';

export const BackgroundStyle: Record<LayoutBackgroundColor, ThemeColorKey | 'transparent'> = {
  default: 'transparent',
  white: 'semantic.background.primary',
  lightest: 'semantic.background.secondary',
};

export const getContentPadding = (paddingContent?: LayoutProps['paddingContent']) => {
  if (typeof paddingContent === 'string') {
    return { padding: getSpaceValue(paddingContent) };
  }
  return { padding: paddingContent ?? { xs: 's', m: 'm', l: 'l', xl: 'xxl' } };
};
