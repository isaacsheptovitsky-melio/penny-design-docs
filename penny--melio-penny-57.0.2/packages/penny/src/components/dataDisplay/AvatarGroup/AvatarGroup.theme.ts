import type { ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

export const avatarGroupTheme: ComponentMultiStyleConfig<
  'container' | 'avatar' | 'description',
  {
    isLast?: boolean;
  }
> = {
  parts: ['container', 'avatar', 'description'],
  baseStyle: ({ isLast }) => ({
    container: {
      display: 'flex',
      position: 'relative',
    },
    avatar: {
      display: 'inline-flex',
      marginRight: isLast ? 'none' : ('-4px' as never),
      borderRadius: 'global.full',
      border: 'semantic.input.default',
      borderColor: 'semantic.border.static',
      cursor: 'pointer',
    },
    description: {
      display: 'inline-flex',
      marginLeft: 'xxxs',
      alignItems: 'center',
      color: 'semantic.text.secondary',
      textStyle: 'body4Semi',
      cursor: 'pointer',
    },
  }),
};
