import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

export const hiddenOptionInputTheme: ComponentMultiStyleConfig<'container' | 'input'> = {
  parts: ['container', 'input'],
  baseStyle: {
    container: {
      display: 'inline-block',
      position: 'relative',
      width: '100%',
    },
    input: {
      opacity: 0,
      position: 'absolute',
      height: 0,
      zIndex: 1,

      '+ label > *': {
        cursor: 'pointer',
      },

      _disabled: {
        '+ label > *': {
          cursor: 'not-allowed',
        },
      },

      _focusVisible: {
        '+ label > *': {
          outlineStyle: 'solid',
          outlineOffset: '2px',
          outlineWidth: '2px',
          outlineColor: 'semantic.focus.primary',
          zIndex: 1,
        },
      },
    },
  },
};
