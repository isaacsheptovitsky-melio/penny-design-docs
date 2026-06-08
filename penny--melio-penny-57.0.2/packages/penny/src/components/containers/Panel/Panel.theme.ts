import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

import { type PanelProps } from './Panel.types';

export const panelTheme: ComponentMultiStyleConfig<
  'container' | 'bar',
  Pick<PanelProps, 'backgroundColor' | 'paddingX' | 'paddingY' | 'maxWidth' | 'width' | 'borderRadius'>
> = {
  parts: ['container', 'bar'],
  baseStyle: ({
    backgroundColor = 'semantic.surface.inverse',
    paddingX,
    paddingY,
    maxWidth = '100%',
    width = '100%',
    borderRadius,
  }) => ({
    container: {
      position: 'sticky',
      zIndex: 'sticky',
      boxSizing: 'content-box',
      width,
      maxWidth,
      '&[data-position="fixed"]': {
        position: 'fixed',
      },
      '&[data-position="absolute"]': {
        position: 'absolute',
      },

      '&[data-placement="bottom"]': {
        bottom: 0,
      },
      '&[data-placement="top"]': {
        top: 0,
      },
      '&[data-placement="left"]': {
        top: 0,
        left: 0,
        bottom: 0,
        width: 'auto',
      },
      '&[data-placement="right"]': {
        top: 0,
        right: 0,
        bottom: 0,
        width: 'auto',
      },
    },
    bar: {
      backgroundColor,
      paddingY: paddingY ?? 's',
      paddingX: paddingX ?? 'm',
      border: 'global.25',
      borderColor: 'global.neutral.A0',
      '&[data-placement="bottom"]': {
        borderTopRadius: borderRadius,
      },
      '&[data-placement="top"]': {
        borderBottomRadius: borderRadius,
      },
      '&[data-placement="left"]': {
        borderRightRadius: borderRadius,
        paddingX: paddingX ?? 's',
        height: '100%',
      },
      '&[data-placement="right"]': {
        borderLeftRadius: borderRadius,
        paddingX: paddingX ?? 's',
        height: '100%',
      },
    },
  }),
};
