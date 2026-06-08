import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { themeSpaces } from '@/theme/foundations/spaces';

const sheetMaxHeight = `100vh - ${themeSpaces.l}`;
const menuListPaddingY = `${themeSpaces.s} * 2`;
const titleHeight = '32px';
const titleAndGapHeight = `${titleHeight} - ${themeSpaces.xs}`;

export const bottomSheetMenuTheme: ComponentMultiStyleConfig<'title' | 'items' | 'footer', { hasTitle?: boolean }> = {
  parts: ['title', 'items', 'footer'],
  baseStyle: () => ({
    title: {
      display: 'flex',
      alignItems: 'center',
      minHeight: titleHeight,
      height: '100%',
      textStyle: 'body3Semi',
      color: 'semantic.text.secondary',
    },
    items: {
      overflowY: 'auto',
      maxHeight: `calc(${sheetMaxHeight} - ${menuListPaddingY} - ${titleAndGapHeight})`,
    },
    footer: {
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
  }),
};
