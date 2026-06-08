import { type ComponentMultiStyleConfig } from '../../../theme/component-style-config-types';
import { type _FormProps } from './_Form.types';

export const formTheme: ComponentMultiStyleConfig<
  'form' | 'helperText' | 'formContainer' | 'loader',
  Pick<_FormProps, 'size' | 'error' | 'columns'>
> = {
  parts: ['form', 'helperText', 'formContainer', 'loader'],
  baseStyle: ({ columns }) => ({
    form: {
      width: '100%',
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: { xs: 'repeat(1, minmax(0, 1fr))', s: `repeat(${columns}, minmax(0, 1fr))` },
    },
    helperText: {
      color: 'semantic.text.secondary',
      textStyle: 'body4',

      _readOnly: {
        color: 'semantic.text.secondary',
      },

      _disabled: {
        color: 'semantic.text.disabled',
      },
      _hidden: {
        visibility: 'hidden',
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      rowGap: 'xs',
      width: 'auto',

      _hidden: {
        display: 'none',
      },
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      width: '100%',
    },
    loader: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    },
  }),
  sizes: {
    large: {
      formContainer: {
        rowGap: 'xxl',
      },
      form: {
        rowGap: 'm',
        columnGap: 'm',
      },
    },
    small: {
      formContainer: {
        rowGap: 'xl',
      },
      form: {
        rowGap: 'm',
        columnGap: 'm',
      },
    },
  },
};
