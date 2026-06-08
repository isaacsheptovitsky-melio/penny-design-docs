import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

export const largeFileUploadTheme: ComponentMultiStyleConfig<
  'previewFileContainer' | 'fileFallbackContainer' | 'container' | 'outerContainer',
  { isPdfPreview?: boolean; hasError?: boolean }
> = {
  parts: ['previewFileContainer', 'fileFallbackContainer', 'container', 'outerContainer'],
  baseStyle: ({ isPdfPreview = false, hasError = false }) => ({
    outerContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      gap: 's',
    },
    container: {
      display: 'flex',
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'semantic.input.default',
      border: 'global.50',
      borderStyle: 'dashed',
      borderColor: 'semantic.border.interactive.rest',
      padding: 's',
      cursor: 'pointer',
      transition:
        'color 0.1s ease-in-out, background-color 0.1s ease-in-out, border-color 0.1s ease-in-out, outline-color 0.2s',
      color: 'semantic.text.secondary',
      outline: 'transparent solid 2px',
      position: 'relative',
      '&[data-is-draging="true"]': {
        backgroundColor: 'semantic.surface.primary.selected',
        border: 'global.50',

        borderColor: 'semantic.border.interactive.selected',
        _hover: {
          border: 'global.50',
          borderColor: 'semantic.border.interactive.selected',
        },
      },
      _hover: {
        color: 'global.neutral.900',
        borderColor: 'semantic.border.neutral',
      },
      _active: {
        color: 'semantic.text.primary',
      },
      _readOnly: {
        cursor: 'default',
        borderColor: 'semantic.border.static',
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
      '&[data-focus-visible="true"]': {
        outlineColor: 'semantic.focus.primary',
        outlineOffset: '2px',
      },
      _selected: {
        justifyContent: 'center',
        pointerEvents: 'all',
        gap: 'l',
        border: 'none',
        _invalid: {
          border: 'global.25',
          borderStyle: 'dashed',
          borderColor: 'semantic.border.critical',
        },
      },
      '&[data-loading="true"]': {
        justifyContent: 'center',
        cursor: 'progress',
      },
    },
    previewFileContainer: {
      display: 'flex',
      height: '100%',
      ...((isPdfPreview || hasError) && { width: '100%' }),
      shadow: 400,
      zIndex: 2,
      _disabled: {
        cursor: 'not-allowed',
        opacity: 0.35,
      },
    },
    fileFallbackContainer: {
      display: 'flex',
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      border: 'global.50',
      borderColor: 'semantic.border.static',
      borderRadius: 'semantic.input.default',
      padding: 's',
      zIndex: 2,
      color: 'global.neutral.700',
      wordBreak: 'break-all',
      textAlign: 'center',
      cursor: 'default',
      _disabled: {
        color: 'global.neutral.700',
        backgroundColor: 'global.neutral.300',
        opacity: 1,
      },
    },
  }),
};
