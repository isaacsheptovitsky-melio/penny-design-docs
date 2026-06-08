import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

const DESKTOP_EXPANDED_MAX_WIDTH = '380px';

export const searchBarTheme: ComponentMultiStyleConfig<
  'field' | 'container' | 'label' | 'divider',
  { isExpanded: boolean; isFullWidth: boolean }
> = {
  parts: ['field', 'container', 'label', 'divider'],
  baseStyle: ({ isExpanded, isFullWidth }) => ({
    container: {
      display: 'flex',
      height: '40px',
      isolation: 'isolate',
      position: 'relative',
      borderBottom: 'global.none',
      borderRadius: 'semantic.input.default',
      border: 'semantic.input.default',
      borderColor: 'semantic.border.interactive.rest',
      width: '100%',
      maxWidth: { xs: '100%', s: isFullWidth ? '100%' : isExpanded ? DESKTOP_EXPANDED_MAX_WIDTH : '330px' },
      transition: 'max-width 0.4s ease-in-out, border 0.1s ease-in-out, color 0.1s ease-in-out',
      bg: 'semantic.surface.primary.rest',
      color: 'semantic.text.primary',
      paddingLeft: 's',
      paddingRight: 'xs-s',
      overflow: 'hidden',

      _hover: {
        borderColor: 'semantic.border.interactive.rest',
        color: 'semantic.text.primary',
        cursor: 'text',
      },
      _focus: {
        maxWidth: { xs: '100%', s: isFullWidth ? '100%' : DESKTOP_EXPANDED_MAX_WIDTH },
        color: 'semantic.text.primary',
        outlineOffset: '2px',
        outlineWidth: '2px',
        outlineStyle: 'solid',
        outlineColor: 'semantic.focus.primary',
        border: 'semantic.input.default',
        borderColor: 'semantic.border.interactive.selected',
      },
      _disabled: {
        border: 'semantic.input.default',
        borderColor: 'semantic.border.interactive.disabled',
        color: 'semantic.text.disabled',
        cursor: 'not-allowed',
        backgroundColor: 'semantic.surface.primary.disabled',
      },
    },
    field: {
      bg: 'inherit',
      height: '100%',
      width: '100%',
      padding: 'none',
      borderBottom: 'global.none',
      position: 'relative',
      color: 'semantic.text.primary',
      textStyle: 'body2',
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      _placeholder: {
        color: 'semantic.text.secondary',
      },
      _hover: {
        borderBottom: 'none',
      },
      _focus: {
        borderBottom: 'none',
      },
      _disabled: {
        borderBottom: 'none',
        color: 'semantic.text.disabled',
        pointerEvents: 'none',
        _placeholder: {
          color: 'semantic.text.disabled',
        },
      },
    },
    label: {
      textStyle: 'body3Semi',
      color: 'semantic.text.secondary',
      whiteSpace: 'nowrap',
      _disabled: {
        color: 'semantic.text.disabled',
      },
    },
    divider: {
      height: '100%',
      paddingX: 'xs',
    },
  }),
};
