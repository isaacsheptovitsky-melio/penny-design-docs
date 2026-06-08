import type { ComponentSingleStyleConfig } from '@/theme/component-style-config-types';

import type { _DescriptionProps } from './_Description.types';

export const _descriptionTheme: ComponentSingleStyleConfig<_DescriptionProps> = {
  baseStyle: {
    textStyle: 'body3',
    color: 'semantic.text.secondary',

    _invalid: {
      color: 'semantic.text.critical.rest',
    },
    _readOnly: {
      color: 'semantic.text.secondary',
    },
    _disabled: {
      color: 'semantic.text.disabled',
    },
  },
};
