import type { ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { type InternalCSSObject } from '@/theme/types';

const getPanelPadding = (panelPadding?: InternalCSSObject['padding']) =>
  (panelPadding
    ? { padding: panelPadding }
    : {
        paddingX: { s: 'xxl', xs: 's' },
        paddingY: { xs: 's', s: 'xl', xl: 'xxl' },
      }) as InternalCSSObject;

export const splitScreenTheme: ComponentMultiStyleConfig<
  'container' | 'resizableBar' | 'handle' | 'panel' | 'panelHeader' | 'panelFooter' | 'panelContent',
  { panelPadding?: InternalCSSObject['padding'] }
> = {
  parts: ['container', 'resizableBar', 'handle', 'panel', 'panelHeader', 'panelFooter', 'panelContent'],
  baseStyle: ({ panelPadding }) => ({
    container: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',

      _loading: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    resizableBar: {
      flexBasis: '1px',
      flexShrink: '0',
      flexDirection: 'column',
      position: 'relative',
      outline: 'none',
      transition: 'background-color 0.2s ease-in-out',
      backgroundColor: 'semantic.fill.tertiary',

      '&[data-resize-handle-active]': {
        backgroundColor: 'global.neutral.600',
      },
    },
    handle: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'semantic.fill.secondary',
      padding: 'xxs',
      borderRadius: 'global.100',
    },
    panel: {
      height: { l: '100%', xs: 'initial' },
      display: 'flex',
      flexDirection: 'column',
      overflow: { l: 'initial', xs: 'auto' },
      flexGrow: { l: 'initial', xs: '1' },

      _loading: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    panelHeader: { display: 'flex', flexShrink: 0 },
    panelFooter: { display: 'flex', flexShrink: 0 },
    panelContent: {
      ...getPanelPadding(panelPadding),
      flexGrow: '1',
      overflow: { l: 'auto', xs: 'initial' },
    },
  }),
};
