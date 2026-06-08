import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

export const dropzoneTheme: ComponentMultiStyleConfig<'root' | 'area' | 'hiddenInput' | 'content'> = {
  parts: ['root', 'area', 'hiddenInput', 'content'],
  baseStyle: {
    root: {
      display: 'flex',
      width: '100%',
      height: '100%',
    },
    area: {
      display: 'flex',
      flex: '1 0 0',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      borderRadius: 'semantic.input.default',
      border: 'global.50',
      borderStyle: 'dashed' as never,
      borderColor: 'semantic.border.interactive.rest',
      padding: 's',
      cursor: 'pointer',
      position: 'relative',
      transition:
        'color 0.1s ease-in-out, background-color 0.1s ease-in-out, border-color 0.1s ease-in-out, outline-color 0.2s',
      outline: 'transparent solid 2px',
      _hover: {
        borderColor: 'semantic.border.neutral',
      },
      '&[data-dragging]': {
        backgroundColor: 'semantic.surface.primary.selected',
        border: 'global.50',
        borderColor: 'semantic.border.interactive.selected',
      },
      _invalid: {
        border: 'global.50',
        borderStyle: 'dashed',
        borderColor: 'semantic.border.critical',
      },
      _disabled: {
        cursor: 'not-allowed',
        borderColor: 'semantic.border.static',
      },
      _readOnly: {
        cursor: 'default',
        borderColor: 'semantic.border.static',
      },
      _focusVisible: {
        outlineColor: 'semantic.focus.primary',
        outlineOffset: '2px',
      },
    },
    hiddenInput: {
      border: '0px' as never,
      clip: 'rect(0, 0, 0, 0)' as never,
      height: '1px',
      margin: '-1px' as never,
      overflow: 'hidden',
      padding: '0px' as never,
      position: 'absolute',
      width: '1px',
      whiteSpace: 'nowrap',
      overflowWrap: 'normal' as never,
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      pointerEvents: 'none',
      width: '100%',
    },
  },
};
