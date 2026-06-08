import type { ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { themeSpaces } from '@/theme/foundations/spaces';

import { BackgroundStyle } from './Toast.theme.utils';
import type { ToastProps } from './Toast.types';

export const toastTheme: ComponentMultiStyleConfig<
  'container' | 'toast' | 'content',
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  { type: ToastProps['type']; isMobile: boolean }
> = {
  parts: ['container', 'toast', 'content'],
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  baseStyle: ({ type, isMobile }: { type: ToastProps['type']; isMobile: boolean }) => ({
    container: {
      minWidth: 'auto',
      marginTop: (isMobile ? themeSpaces.m : themeSpaces.xl) as never,
      marginBottom: 0 as never,
      marginLeft: 0 as never,
      marginRight: 0 as never,
    },
    toast: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: isMobile ? 'space-between' : 'center',
      gap: 's',
      borderRadius: 'global.200',
      height: '48px',
      width: isMobile ? `calc(100vw - ${themeSpaces.s} * 2)` : 'max-content',
      maxWidth: '480px',
      boxShadow: 500,
      paddingX: 's',
      color: 'semantic.text.inverse',
      bgColor: BackgroundStyle[type],
    },
    content: {
      flexGrow: 1,
      textStyle: 'body3',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  }),
};
