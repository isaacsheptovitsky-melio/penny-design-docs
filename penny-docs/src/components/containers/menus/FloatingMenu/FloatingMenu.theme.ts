import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

import { type FloatingMenuProps } from './FloatingMenu.types';

export const floatingMenuTheme: ComponentMultiStyleConfig<
  'dropdown',
  Pick<FloatingMenuProps, 'maxHeight' | 'maxWidth' | 'width'>
> = {
  parts: ['dropdown'],
  baseStyle: ({ width, maxHeight, maxWidth }) => ({
    dropdown: {
      ...(width && { width }),
      maxWidth,
      overflow: 'hidden',
      borderRadius: 'global.200',
      boxShadow: 500,
      border: 'global.25',
      borderColor: 'semantic.border.static',
      backgroundColor: 'semantic.surface.primary.rest',
      boxSizing: 'content-box',
      maxHeight,
      display: 'flex',

      _focusVisible: {
        outline: 'none',
      },
    },
  }),
};
