import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

export const collapsibleCardTheme: ComponentMultiStyleConfig<
  'header' | 'customHeader' | 'content' | 'titleRightElement'
> = {
  parts: ['header', 'customHeader', 'content', 'titleRightElement'],
  baseStyle: {
    header: {
      color: 'semantic.text.primary',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: 'm',
      position: 'relative',
      outline: '2px solid transparent',
      outlineOffset: '-3px',

      _readOnly: {
        color: 'semantic.text.secondary',
        cursor: 'not-allowed',
      },
      _disabled: {
        color: 'semantic.text.disabled',
        cursor: 'not-allowed',
      },
      '&[data-focus-visible="true"]': {
        outlineColor: 'semantic.focus.primary',
      },
    },
    customHeader: {
      width: '100%',

      _disabled: {
        opacity: '0.35',
      },
    },
    content: {
      padding: 'm',
      paddingTop: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 'm',
      cursor: 'default',
    },
    titleRightElement: {
      display: 'flex',
      _readOnly: {
        color: 'semantic.icon.readOnly',
      },
    },
  },
};
