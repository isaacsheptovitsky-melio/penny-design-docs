import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

import { type FileUploadProps } from './FileUpload.types';

export const fileUploadTheme: ComponentMultiStyleConfig<
  'container' | 'label' | 'linkLabel' | 'previewContainer',
  FileUploadProps
> = {
  parts: ['container', 'label', 'linkLabel', 'previewContainer'],
  baseStyle: {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderRadius: 'semantic.input.default',
      height: '100%',
      width: '100%',
      border: 'global.25',
      borderStyle: 'dashed' as never,
      borderColor: 'semantic.border.interactive.rest',
      padding: 's',
      cursor: 'pointer',
      backgroundColor: 'semantic.surface.primary.rest',
      transition:
        'color 0.1s ease-in-out, background-color 0.1s ease-in-out, border-color 0.1s ease-in-out, outline-color 0.2s',
      color: 'semantic.text.secondary',
      outline: 'transparent solid 2px',
      position: 'relative',
      _hover: {
        color: 'global.neutral.900',
        borderColor: 'semantic.border.neutral',
      },
      _active: {
        color: 'semantic.text.primary',
      },
      _readOnly: {
        cursor: 'not-allowed',

        borderColor: 'semantic.border.static',
        backgroundColor: 'semantic.surface.primary.disabled',
      },
      _invalid: {
        border: 'global.25',
        borderStyle: 'dashed',
        borderColor: 'semantic.border.critical',
      },
      _disabled: {
        cursor: 'not-allowed',
        borderColor: 'semantic.border.static',
        backgroundColor: 'semantic.surface.primary.disabled',
      },
      '&[data-focus-visible="true"]': {
        outlineColor: 'semantic.focus.primary',
        outlineOffset: '2px',
      },
      _selected: {
        justifyContent: 'space-between',
        pointerEvents: 'all',
        cursor: 'default',

        gap: 'none',
        _invalid: {
          border: 'global.25',
          borderStyle: 'dashed',
          borderColor: 'semantic.border.critical',
        },
      },
      '&[data-loading="true"]': {
        justifyContent: 'center',
        cursor: 'progress',
        backgroundColor: 'semantic.surface.primary.rest',
      },
      '&[data-is-draging="true"]': {
        backgroundColor: 'semantic.surface.primary.selected',
        border: 'global.50',
        borderColor: 'semantic.border.interactive.selected',
      },
    },
    label: {
      textStyle: 'body2',
      cursor: 'default',
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: 'semantic.link.primary.rest',
      _focusVisible: {
        outline: 'none',
      },
      _readOnly: {
        cursor: 'not-allowed',
        color: 'semantic.text.secondary',
        _focus: {
          outline: 'none',
          boxShadow: 0,
        },
        _hover: {
          color: 'semantic.text.secondary',
        },
      },
      _disabled: {
        cursor: 'not-allowed',
        color: 'semantic.text.disabled',
        _focus: {
          outline: 'none',
          boxShadow: 0,
        },
      },
    },
    linkLabel: {
      textStyle: 'body2',
      textDecorationLine: 'underline',
      cursor: 'pointer',
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: 'semantic.link.primary.rest',
      _focusVisible: {
        outlineColor: 'semantic.focus.primary',
        transition: 'outline-color 0.2s',
      },
      _readOnly: {
        cursor: 'not-allowed',
        color: 'semantic.text.secondary',
        _focus: {
          outline: 'none',
          boxShadow: 0,
        },
        _hover: {
          color: 'semantic.text.secondary',
          textDecorationLine: 'underline',
        },
      },
      _disabled: {
        cursor: 'not-allowed',
        color: 'semantic.text.disabled',
        _focus: {
          outline: 'none',
          boxShadow: 0,
        },
        _hover: {
          color: 'semantic.text.disabled',
          textDecorationLine: 'underline',
        },
      },
      _hover: {
        color: 'semantic.link.primary.hover',
        textDecorationLine: 'none',
      },
      _active: {
        color: 'semantic.link.primary.pressed',
        textDecorationLine: 'none',
      },
    },
    previewContainer: {
      display: 'flex',
      gap: 's',
      width: 'full',
      height: 'auto',
      minWidth: 0,
      maxWidth: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 2,
      _disabled: {
        zIndex: 'unset',
      },
    },
  },
};
