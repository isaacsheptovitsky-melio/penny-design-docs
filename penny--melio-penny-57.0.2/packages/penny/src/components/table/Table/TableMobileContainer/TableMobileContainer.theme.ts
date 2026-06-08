import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

export const tableMobileContainerTheme: ComponentMultiStyleConfig<'container' | 'row', { isLoading?: boolean }> = {
  parts: ['container', 'row'],
  baseStyle: ({ isLoading }) => ({
    container: {
      isolation: 'isolate',
      overflowY: 'auto',
      overflowX: 'hidden',
      width: '100%',
      opacity: isLoading ? 0 : 1,
      height: isLoading ? 0 : 'auto',
    },
    row: {
      paddingY: 'm',
      backgroundColor: 'semantic.surface.primary.rest',
      transition: `background-color 0.1s ease-in-out`,
      outlineColor: 'transparent',

      _highlighted: {
        backgroundColor: 'semantic.surface.primary.selected',
        transition: `background-color 0.3s ease-in-out`,
      },

      _focusVisible: {
        outlineColor: 'semantic.focus.primary',
        outlineOffset: '-2px',
        transition: 'outline-color 0.2s',
      },
    },
  }),
};
