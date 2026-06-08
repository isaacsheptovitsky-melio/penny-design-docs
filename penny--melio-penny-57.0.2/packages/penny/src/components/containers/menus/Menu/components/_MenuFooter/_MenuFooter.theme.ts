import { type ComponentSingleStyleConfig } from '@/theme/component-style-config-types';

export const _menuFooterTheme: ComponentSingleStyleConfig = {
  baseStyle: {
    height: { xs: 'auto', s: '56px' },
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingX: { xs: 'none', s: 's' },
    paddingY: { xs: 'none', s: 'xs' },

    _focusVisible: {
      outlineOffset: '-2px',
    },
  },
};
