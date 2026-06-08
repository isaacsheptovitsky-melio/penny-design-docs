import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { themeSpaces } from '@/theme/foundations/spaces';

import { type BaseSheetProps } from './BaseSheet.types';

export const baseSheetTheme: ComponentMultiStyleConfig<
  'mainContainer' | 'loadingContainer' | 'closeButtonContainer' | 'header',
  Pick<BaseSheetProps, 'isLoading' | 'paddingX' | 'paddingY'> & {
    placement?: 'left' | 'bottom';
    showFooterBorder?: boolean;
    hasTitle?: boolean;
  }
> = {
  parts: ['mainContainer', 'loadingContainer', 'closeButtonContainer', 'header'],
  baseStyle: ({ placement, paddingX = 's', paddingY, showFooterBorder, hasTitle }) => ({
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      minHeight: '88px',
      maxHeight: placement === 'bottom' ? `calc(100dvh - ${themeSpaces.s})` : 'inherit',
      borderTopRightRadius: placement === 'bottom' ? 'component.bottomSheet.default' : 'global.600',
      borderTopLeftRadius: placement === 'bottom' ? 'component.bottomSheet.default' : 'global.none',
      borderBottomRightRadius: placement === 'left' ? 'global.600' : 'global.none',
      backgroundColor: 'semantic.surface.primary.rest',
      overflow: 'auto',
      position: 'relative',
      border: 'global.25',
      borderColor: 'global.neutral.A0',
    },
    loadingContainer: {
      minHeight: 'inherit',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 'm',
    },
    closeButtonContainer: {
      position: 'absolute',
      top: paddingY,
      right: paddingX,
      zIndex: 1,
    },
    header: {
      display: 'flex',
      flexDirection: hasTitle ? 'row' : 'row-reverse',
      justifyContent: 'space-between',
      gap: 's',
      paddingLeft: paddingX,
      // header right padding + close icon + padding from close icon
      paddingRight: `calc(${themeSpaces[paddingX]} + ${themeSpaces['l']} + ${themeSpaces[paddingX]})` as never,
      paddingY,
      minHeight: '32px',
      boxSizing: 'content-box',
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
    footer: {
      paddingX,
      paddingY,
      backgroundColor: 'semantic.surface.primary.rest',
      position: 'sticky',
      bottom: 0,
      zIndex: 'sticky',
      ...(showFooterBorder && { borderTop: 'global.25', borderColor: 'semantic.border.static' }),
    },
  }),
};
