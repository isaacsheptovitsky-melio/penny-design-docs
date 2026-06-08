import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

export const tableSelectCellTheme: ComponentMultiStyleConfig<'leftIcon' | 'rightIcon' | 'warningIcon'> = {
  parts: ['leftIcon', 'rightIcon', 'warningIcon'],
  baseStyle: {
    leftIcon: {
      display: 'inline-flex',
      marginRight: 'xs',
      flexShrink: 0,
    },
    rightIcon: {
      display: 'inline-flex',
      marginLeft: 'auto',
      paddingLeft: 'm',
      flexShrink: 0,
    },
    warningIcon: {
      display: 'inline-flex',
      marginLeft: 'xxs',
      flexShrink: 0,
    },
  },
};
