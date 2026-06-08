import type { ComponentSingleStyleConfig } from '@/theme/component-style-config-types';

import type { TrackerProps } from './Tracker.types';

export const trackerTheme: ComponentSingleStyleConfig<Pick<TrackerProps, 'variant'>> = {
  baseStyle: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  variants: {
    horizontal: {
      flexDirection: 'row',
    },
    vertical: {
      flexDirection: 'column',
    },
  },
};
