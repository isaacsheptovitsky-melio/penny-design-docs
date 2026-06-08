import type { ComponentSingleStyleConfig } from '@/theme/component-style-config-types';

import type { SlideVariantsType } from './AlternativeSlide.utils';

export const alternativeSlideTheme: ComponentSingleStyleConfig<{ transition: SlideVariantsType }> = {
  baseStyle: ({ transition }) => ({
    position: 'fixed',
    height: 'auto',
    transition: `all 0.3s ease-in-out`,
    ...transition['position'],
    '&[data-open=true]': {
      ...transition['enter'],
    },
    '&[data-open=false]': {
      ...transition['exit'],
    },
  }),
};
