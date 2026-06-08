import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

import { type SwitchProps } from './Switch.types';

export const switchTheme: ComponentMultiStyleConfig<'label' | 'thumb' | 'container' | 'track', SwitchProps> = {
  parts: ['label', 'thumb', 'container', 'track'],
  baseStyle: ({ isFullWidth }) => ({
    container: {
      display: 'inline-flex',
      alignItems: 'center',
      columnGap: 'xs',
      minHeight: '24px',
      cursor: 'pointer',
      width: isFullWidth ? '100%' : 'fit-content',
      justifyContent: isFullWidth ? 'space-between' : 'unset',
      _disabled: {
        cursor: 'not-allowed',
      },
      _readOnly: {
        cursor: 'default',
      },
    },
    track: {
      padding: 'none',
      position: 'relative',
      input: {
        border: 'semantic.input.default',
        borderColor: 'global.neutral.A0',
        cursor: 'pointer',
        appearance: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 'global.full',
        backgroundColor: 'semantic.fill.readOnly',
        transition: 'background-color .2s',
        _checked: {
          backgroundColor: 'semantic.fill.brand.primary',

          _disabled: {
            backgroundColor: 'semantic.fill.brand.secondary',
          },
        },
        _readOnly: {
          backgroundColor: 'semantic.fill.primary',
          borderColor: 'semantic.border.interactive.rest',
          borderWidth: '1px',
          cursor: 'default',
        },
        _disabled: {
          cursor: 'not-allowed',
          backgroundColor: 'semantic.fill.disabled',
        },
      },
    },
    thumb: {
      content: '""',
      position: 'absolute',
      top: '2px',
      left: '2px',
      borderRadius: 'global.full',
      transition: '0.2s',
      border: 'semantic.input.default',
      borderColor: 'global.neutral.A0',
      backgroundColor: 'semantic.fill.primary',
      _readOnly: {
        backgroundColor: 'semantic.fill.readOnly',
      },
      _checked: {
        left: 'calc(100% - 2px)',
        transform: 'translate(-100%)',
      },
      _disabled: {
        backgroundColor: 'semantic.icon.disabled',
        _checked: {
          backgroundColor: 'semantic.icon.inverse',
        },
      },
    },
    label: {
      color: 'semantic.text.primary',
      _readOnly: {
        color: 'semantic.text.secondary',
      },
      _disabled: {
        color: 'semantic.text.disabled',
      },
    },
  }),
  sizes: {
    large: {
      track: {
        input: {
          width: '36px',
          height: '20px',
        },
      },
      thumb: {
        width: '16px',
        height: '16px',
      },
      label: {
        textStyle: 'body2',
      },
    },
    small: {
      track: {
        input: {
          width: '28px',
          height: '16px',
        },
      },
      thumb: {
        width: '12px',
        height: '12px',
      },
      label: {
        textStyle: 'body4',
      },
    },
  },
};
