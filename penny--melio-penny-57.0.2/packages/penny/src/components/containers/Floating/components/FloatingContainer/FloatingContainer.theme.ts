import { type ComponentSingleStyleConfig } from '@/theme/component-style-config-types';

export const floatingContainerTheme: ComponentSingleStyleConfig = {
  baseStyle: {
    overflow: 'hidden',
    borderRadius: 'global.200',
    boxShadow: 500,
    border: 'global.25',
    borderColor: 'semantic.border.static',
    backgroundColor: 'semantic.surface.primary.rest',
    display: 'flex',

    _focusVisible: {
      outline: 'none',
    },
  },
};
