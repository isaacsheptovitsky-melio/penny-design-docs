import type { ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

import type { _MainLabelProps } from './_MainLabel.types';

export const _mainLabelTheme: ComponentMultiStyleConfig<
  'label' | 'iconIndicator' | 'secondaryLabel' | 'placeholder',
  Pick<_MainLabelProps, 'variant' | 'size'>
> = {
  parts: ['label', 'iconIndicator', 'secondaryLabel', 'placeholder'],
  baseStyle: {
    label: {
      display: 'contents',
      color: 'semantic.text.primary',

      _readOnly: {
        color: 'semantic.text.secondary',
        cursor: 'default',
      },
      _disabled: {
        color: 'semantic.text.disabled',
      },
    },
    placeholder: {
      textStyle: 'body2',
      display: 'contents',
      color: 'semantic.text.secondary',
    },
    secondaryLabel: {
      textStyle: 'body2',
      color: 'semantic.text.primary',

      _readOnly: {
        color: 'semantic.text.secondary',
        cursor: 'default',
      },
      _disabled: {
        color: 'semantic.text.disabled',
      },
    },
    iconIndicator: {
      display: 'inline-flex',
      color: 'semantic.text.primary',
      position: 'relative',

      _readOnly: {
        color: 'semantic.text.secondary',
        cursor: 'default',
      },
      _disabled: {
        color: 'semantic.text.disabled',
      },
    },
  },
  variants: {
    default: ({ size }) => ({
      label: {
        textStyle: size === 'small' ? 'body3' : 'body2',
      },
    }),
    bold: ({ size }) => ({
      label: {
        textStyle: size === 'small' ? 'body3Semi' : 'body2Semi',
      },
    }),
  },
};
