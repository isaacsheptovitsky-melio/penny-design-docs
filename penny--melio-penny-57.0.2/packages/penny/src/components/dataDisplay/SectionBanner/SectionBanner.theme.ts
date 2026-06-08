import type { ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

import { type SectionBannerRootProps } from './index';

export const sectionBannerTheme: ComponentMultiStyleConfig<
  'root' | 'content' | 'title' | 'description',
  Pick<SectionBannerRootProps, 'variant' | 'isCompact'>
> = {
  parts: ['root', 'content', 'title', 'description'],
  baseStyle: ({ isCompact }) => ({
    root: {
      borderRadius: 'component.sectionBanner.default',
      border: 'global.25',
      borderColor: 'global.neutral.A0',
      paddingX: 'xs-s',
      paddingY: isCompact ? 'xs' : 'xs-s',
    },
    content: {
      flex: 1,
      paddingTop: 'xxxs',
      alignItems: 'flex-start',
    },
    title: {
      wordBreak: 'break-word',
      maxWidth: '920px',
      paddingBottom: isCompact ? 'none' : 'xxxs',
    },
    description: {
      wordBreak: 'break-word',
      maxWidth: '920px',
      paddingBottom: 'xxxs',
    },
  }),
  variants: {
    neutral: {
      root: {
        backgroundColor: 'semantic.fill.secondary',
      },
    },
    warning: {
      root: {
        backgroundColor: 'semantic.fill.warning.secondary',
      },
    },
    success: {
      root: {
        backgroundColor: 'semantic.fill.success.secondary',
      },
    },
    critical: {
      root: {
        backgroundColor: 'semantic.fill.critical.secondary',
      },
    },
    informative: {
      root: {
        backgroundColor: 'semantic.fill.informative.secondary',
      },
    },
    brand: {
      root: {
        backgroundColor: 'semantic.fill.brand.secondary',
      },
    },
    secondary: {
      root: {
        backgroundColor: 'transparent',
        border: 'global.25',
        borderColor: 'semantic.border.static',
      },
    },
  },
};
