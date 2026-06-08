import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

export const popoverTheme: ComponentMultiStyleConfig<'icon' | 'title' | 'footerText'> = {
  parts: ['icon', 'title', 'footerText'],
  baseStyle: {
    icon: {
      display: 'inline-flex',
      marginY: 'xxxs',
      marginRight: 'xs',
    },
    title: {
      textStyle: 'body3Semi',
      display: 'inline-block',
      maxWidth: '100%',
      paddingX: 'none',
      paddingY: 'none',
    },
    footerText: {
      opacity: 0.8,
    },
  },
};
