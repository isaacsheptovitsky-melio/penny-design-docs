import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

export const drawerTheme: ComponentMultiStyleConfig<'content' | 'body' | 'header' | 'footer'> = {
  parts: ['content', 'body', 'header', 'footer'],
  baseStyle: {
    content: {
      display: 'flex',
      flexDirection: 'column',
      zIndex: 'modal',
      backgroundColor: 'semantic.surface.primary.rest',
      height: '100%',
      width: '100%',
      border: 'global.25',
      borderColor: 'global.neutral.A0',
    },
    header: {
      display: 'flex',
      flexDirection: 'row-reverse',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 's',
      paddingY: { xs: 's', s: 'm' },
      paddingX: { xs: 's', s: 'l' },
    },
    body: {
      padding: { xs: 's', s: 'l' },
    },
    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      borderTop: 'global.25',
      borderColor: 'semantic.border.static',
      height: '80px',
      paddingY: 's',
      paddingX: 's',
    },
  },
};
