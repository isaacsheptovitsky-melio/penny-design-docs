import { type ComponentMultiStyleConfig } from '../../../theme/component-style-config-types';
import { input } from '../../../theme/utils/form.utils';
import { type _CustomInputContainerProps } from './_CustomInputContainer.types';

export const customInputContainerTheme: ComponentMultiStyleConfig<'field', Pick<_CustomInputContainerProps, 'size'>> = {
  parts: ['field'],
  baseStyle: {
    field: {
      ...input.field,
      pb: 'xxs',
      _groupInvalid: {
        ...input.field._invalid,
      },
    },
  },
};
