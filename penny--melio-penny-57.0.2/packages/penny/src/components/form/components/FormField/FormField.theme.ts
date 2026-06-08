import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

import { type FormFieldProps } from './FormField.types';

export const formFieldTheme: ComponentMultiStyleConfig<
  'container' | 'fieldGroup' | 'field' | 'helperText',
  Pick<FormFieldProps, 'size' | 'error' | 'helperText' | 'isViewMode' | 'align'>
> = {
  parts: ['container', 'fieldGroup', 'field', 'helperText'],
  baseStyle: ({ error, helperText, isViewMode, align }) => ({
    container: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 'xs',
      width: 'auto',
    },
    label: {
      width: '100%',
      display: 'flex',
      '&[data-hidden="true"]': {
        opacity: 0,
        position: 'absolute',
      },
    },
    fieldGroup: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: '100%',
      height: 'auto',
      gap: 'xs',
    },
    field: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '100%',
    },
    helperText: {
      textStyle: 'body4',
      gap: 'm',
      width: '100%',
      display: 'flex',
      justifyContent: !!error || (helperText && !isViewMode) ? 'space-between' : 'flex-end',
      flexDirection: align === 'end' ? 'row-reverse' : undefined,
      color: 'semantic.text.secondary',
      height: '16px',

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
  }),
  sizes: {
    small: ({ isViewMode }) => ({
      field: {
        minHeight: isViewMode ? 'auto' : '40px',
      },
    }),
    large: ({ isViewMode }) => ({
      field: {
        minHeight: isViewMode ? 'auto' : '48px',
      },
    }),
  },
};
