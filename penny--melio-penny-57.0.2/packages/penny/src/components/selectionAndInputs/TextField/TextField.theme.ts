import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { input } from '@/theme/utils/form.utils';

import { type TextFieldProps } from './TextField.types';

export const textFieldTheme: ComponentMultiStyleConfig<
  'field' | 'leftElement' | 'rightElement' | 'loader',
  Pick<TextFieldProps, 'size'>
> = {
  parts: ['field', 'leftElement', 'rightElement', 'loader'],
  baseStyle: {
    field: {
      ...input.field,
    },
    leftElement: {
      height: '100%',
      pointerEvents: 'none', // Fixes this bug ME-67292
    },
    rightElement: {
      height: '100%',
    },
    loader: {
      marginRight: 's',
    },
  },
};
