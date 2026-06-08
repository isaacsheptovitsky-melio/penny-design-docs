import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

import { BackgroundStyle, getContentPadding } from './layout.theme.utils';
import { type LayoutBackgroundColor, type LayoutProps, type MaxWidthType } from './Layout.types';

export const layoutTheme: ComponentMultiStyleConfig<
  'container' | 'header' | 'content' | 'contentContainer' | 'footer' | 'loadingContainer' | 'contentWrapper',
  {
    maxWidth: MaxWidthType;
    isLoading?: boolean;
    backgroundColor: LayoutBackgroundColor;
    paddingContent?: LayoutProps['paddingContent'];
  }
> = {
  parts: ['container', 'header', 'contentContainer', 'contentWrapper', 'content', 'footer', 'loadingContainer'],
  baseStyle: ({ maxWidth, isLoading, backgroundColor, paddingContent }) => ({
    container: {
      height: '100%',
      width: '100%',
      backgroundColor: BackgroundStyle[backgroundColor],
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      justifyContent: isLoading ? 'center' : 'unset',
    },
    header: {
      width: '100%',
      flexShrink: 0,
    },
    contentContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      alignItems: 'center',
      overflow: 'auto',
    },
    contentWrapper: {
      display: 'flex',
      justifyContent: 'center',
      flexGrow: 1,
      width: '100%',
      ...(getContentPadding(paddingContent) as Record<string, unknown>),
    },
    content: {
      flexGrow: 1,
      width: '100%',
      maxWidth,
    },
    footer: {
      width: '100%',
      flexShrink: 0,
    },
    loadingContainer: {
      position: 'relative',
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 'inherit',
      justifyContent: 'center',
      outline: 0,
    },
  }),
};
