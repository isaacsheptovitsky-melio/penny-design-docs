import { type ComponentSingleStyleConfig } from '@/theme/component-style-config-types';
import { type InternalCSSObject } from '@/theme/types';

export const actionAreaTheme: ComponentSingleStyleConfig = {
  baseStyle: {
    ...({
      all: 'unset',
      cursor: 'pointer',
    } as InternalCSSObject),
    _disabled: {
      cursor: 'not-allowed',
    },
    '&[data-is-empty="true"]': {
      position: 'absolute',
      inset: 0,
    },
  },
};
