import { type ComponentSingleStyleConfig } from '@/theme/component-style-config-types';

export const skeletonTheme: ComponentSingleStyleConfig = {
  baseStyle: {
    borderRadius: 'global.full',
    backgroundColor: 'global.neutral.400',
  },
};

export const skeletonTextTheme: ComponentSingleStyleConfig = {
  baseStyle: {
    borderColor: 'global.neutral.400',
  },
};
