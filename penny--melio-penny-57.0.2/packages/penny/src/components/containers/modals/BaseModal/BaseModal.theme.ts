import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { themeSpaces } from '@/theme/foundations';

import { type BaseSheetContextData } from '../../BaseSheet/BaseSheetContext';
import { type BaseModalProps } from './BaseModal.types';

export const baseModalTheme: ComponentMultiStyleConfig<
  'modalContent' | 'modalFloatingContent' | 'mobileModalContent' | 'closeButton' | 'header' | 'body' | 'footer',
  Partial<BaseModalProps> & {
    showBorderTop?: boolean;
    showBorderBottom?: boolean;
  } & { baseSheetProps?: Pick<BaseSheetContextData, 'isOverflow' | 'showFooterBorder' | 'paddingY' | 'paddingX'> }
> = {
  parts: ['modalContent', 'modalFloatingContent', 'mobileModalContent', 'closeButton', 'header', 'body', 'footer'],
  baseStyle: ({ isLoading, showBorderTop, showBorderBottom, baseSheetProps }) => {
    const modalDesktopXPadding = themeSpaces['l'];

    return {
      modalFloatingContent: {
        display: 'flex',
        flexDirection: 'column',
        height: 'inherit',
        maxHeight: 'inherit',
        minHeight: 'inherit',
        paddingBottom: 'm',
        justifyContent: 'inherit',
      },
      modalContent: {
        minHeight: isLoading ? '248px' : 'unset',
        top: `${modalDesktopXPadding}`,
        maxHeight: `calc(100vh - 2*${modalDesktopXPadding})`,
        justifyContent: isLoading ? 'center' : 'flex-start',
        padding: 'none',
        overflow: 'hidden',
        zIndex: 'modal',
        marginY: 'none',
        borderRadius: 'component.baseModal.default',
        backgroundColor: 'semantic.surface.primary.rest',
        boxShadow: 500,
        position: 'relative',
      },
      header: {
        flexShrink: 0,
        paddingLeft: { xs: 'none', s: 'm' },
        paddingRight: {
          xs: 'none',
          // header right padding + close icon + padding from close icon
          s: `calc(${themeSpaces['m']} + ${themeSpaces['xl']} + ${themeSpaces['m']})` as never,
        },
        paddingTop: { xs: 'none', s: 'm' },
        paddingBottom: { xs: 'none', s: 'm' },
      },
      mobileModalContent: {
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: 's',
        height: 'inherit',
        maxHeight: 'inherit',
        minHeight: 'inherit',
        position: 'relative',
      },
      body: {
        height: '100%',
        width: '100%',
        flexGrow: 1,
        /// BottomSheet have overflowY:auto, so When it warppes the BaseModalBody (on mobile), the BaseModalBody don't need an overflowY.
        overflowY: { xs: 'unset', s: 'auto' },
        display: 'flex',
        flexDirection: 'column',
        paddingX: { xs: 's', s: 'm' },
        paddingTop: { xs: 's', s: 'xs' },
        paddingBottom: { xs: 's', s: 'xs' },
        ...(showBorderTop && { borderTop: 'global.25', borderColor: 'semantic.border.static' }),
        // Has footer
        '&:not(:last-child)': {
          ...(showBorderBottom && { borderBottom: 'global.25', borderColor: 'semantic.border.static' }),
        },
      },
      footer: {
        flexShrink: 0,
        ...(baseSheetProps
          ? {
              position: 'sticky',
              bottom: 0,
              zIndex: 'sticky',
              backgroundColor: 'semantic.surface.primary.rest',
              paddingX: baseSheetProps.paddingX,
              ...(baseSheetProps.isOverflow
                ? { paddingY: baseSheetProps.paddingY }
                : { paddingTop: baseSheetProps.paddingY }),
              ...(baseSheetProps.showFooterBorder && {
                borderTop: 'global.25',
                borderColor: 'semantic.border.static',
              }),
            }
          : {
              paddingX: 'm',
              paddingTop: 'm',
            }),
      },
      closeButton: {
        position: 'absolute',
        top: { xs: 's', s: 'm' },
        right: { xs: 's', s: 'm' },
        zIndex: 'docked',
      },
    };
  },
  sizes: {
    small: {
      modalContent: {
        width: '560px',
        marginX: 'none',
      },
    },
    medium: {
      modalContent: {
        width: { s: '100%', m: '858px' },
        marginX: { s: 'xxl', l: 'none' },
      },
    },
    large: {
      modalContent: {
        width: '100%',
        marginX: 'xxl',
      },
    },
  },
};
