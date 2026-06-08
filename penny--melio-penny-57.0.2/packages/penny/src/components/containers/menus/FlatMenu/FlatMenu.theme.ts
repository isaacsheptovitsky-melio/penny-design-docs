import { type ComponentSingleStyleConfig } from '@/theme/component-style-config-types';

import { type MenuContextProps } from '../Context';

export const flatMenuTheme: ComponentSingleStyleConfig<Pick<MenuContextProps, 'height'>> = {
  baseStyle: ({ height }) => ({
    position: 'fixed',
    zIndex: 'overlay',
    left: 0,
    width: '100%',
    height,
    backgroundColor: 'semantic.surface.primary.rest',
    borderTop: 'global.25',
    borderColor: 'global.neutral.A0',
  }),
};
