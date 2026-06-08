import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

import { type LoadingContainerProps } from './LoadingContainer.types';

export const loadingContainerTheme: ComponentMultiStyleConfig<
  'loadingContainer' | 'loaderContainer' | 'childrenContainer',
  Pick<LoadingContainerProps, 'isLoading'>
> = {
  parts: ['loadingContainer', 'loaderContainer', 'childrenContainer'],
  baseStyle: ({ isLoading }) => ({
    loadingContainer: {
      position: 'relative',
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 'inherit',
    },
    loaderContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    childrenContainer: {
      height: '100%',
      opacity: isLoading ? 0 : 1,
      minHeight: 'inherit',
      display: 'flex',
      flexDirection: 'column',
    },
  }),
};
