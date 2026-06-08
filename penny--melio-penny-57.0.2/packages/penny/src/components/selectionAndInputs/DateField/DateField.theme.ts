import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { input } from '@/theme/utils/form.utils';

import { type DateFieldProps } from './DateField.types';

export const dateFieldTheme: ComponentMultiStyleConfig<
  'input' | 'trigger' | 'rightElement' | 'popover' | 'calendar',
  DateFieldProps
> = {
  parts: ['input', 'rightElement', 'popover', 'calendar'],
  baseStyle: ({ isTypable }) => ({
    input: {
      ...(!isTypable && {
        cursor: 'pointer',
        caretColor: 'transparent',
      }),
    },
    trigger: {
      position: 'relative',
      justifyContent: 'space-between',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      // Reuse input styles.
      ...input.field,
      paddingRight: 'none',
      '&.small': {
        height: '40px',
      },
      '&.large': {
        height: '48px',
      },
    },
    inputRightElement: {
      height: '100%',
      position: 'absolute',
      right: 0,
    },
    loader: {
      display: 'flex',
      alignItems: 'center',
      marginRight: 's',
      height: '100%',
    },
    rightElement: {
      display: 'flex',
      alignItems: 'center',
      gap: 'xxxs',
      paddingRight: 'xs-s',
      height: '100%',
      cursor: isTypable ? 'text' : 'pointer',

      _readOnly: {
        cursor: 'default',
      },
      _disabled: {
        cursor: 'default',
      },
    },
    popover: {
      width: 'min-content',
      padding: 'none',
    },
    calendar: {
      paddingBottom: { xs: 'xs', s: 's' },
      paddingLeft: { xs: 'xs', s: 's' },
      paddingRight: { xs: 'xs', s: 's' },
      paddingTop: 'none',
      marginTop: 's',
    },
  }),
};
