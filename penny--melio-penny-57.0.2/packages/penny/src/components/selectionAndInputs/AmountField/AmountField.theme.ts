import { type ComponentSingleStyleConfig } from '@/theme/component-style-config-types';

import { type AmountFieldEndElementProps } from './EndElement';

export const amountFieldTheme: ComponentSingleStyleConfig<AmountFieldEndElementProps> = {
  baseStyle: {
    height: 'calc(100% - 2px)', // the 2px is the text field's border width
    borderLeft: 'semantic.input.default',
    borderColor: 'semantic.border.static',
    minWidth: '112px',
    borderRightRadius: 'semantic.input.default',
    backgroundColor: 'semantic.surface.primary.rest',
    marginRight: '1px' as never, // we need this because the background color is overriding the right border of the TextField
    _disabled: {
      cursor: 'not-allowed',
      backgroundColor: 'semantic.surface.primary.disabled',
    },
    _readOnly: {
      cursor: 'initial',
      backgroundColor: 'semantic.surface.primary.disabled',
    },
  },
};
