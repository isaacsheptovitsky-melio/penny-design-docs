import { type ComponentSingleStyleConfig } from '@/theme/component-style-config-types';

import { type RadioGroupProps } from './RadioGroup.types';

export const radioGroupTheme: ComponentSingleStyleConfig<Pick<RadioGroupProps, 'variant'>> = {
  baseStyle: {
    display: 'flex',
    alignItems: 'flex-start',
    paddingY: 'xxs',
  },
  variants: {
    horizontal: {
      flexDir: 'row',
      gridGap: { xs: 's', s: 'm' },
      flexWrap: 'wrap',
    },
    vertical: {
      flexDir: 'column',
      gridGap: 's',
    },
  },
};
