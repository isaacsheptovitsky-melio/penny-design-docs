import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { applyInteractiveStates } from '@/utils/componentStyle.utils';

import { type TextAreaProps } from './TextArea.types';

export const textAreaTheme: ComponentMultiStyleConfig<
  'container' | 'field' | 'loaderContainer' | 'footerContainer',
  TextAreaProps
> = {
  parts: ['container', 'field', 'loaderContainer', 'footerContainer'],
  baseStyle: {
    container: {
      position: 'relative',
      border: 'semantic.input.default',
      borderColor: 'semantic.border.interactive.rest',
      borderRadius: 'semantic.input.default',

      _hover: { borderColor: 'semantic.border.interactive.hover' },

      _focus: { borderColor: 'semantic.border.interactive.selected' },

      '&[data-editable="false"]': applyInteractiveStates({
        borderColor: 'semantic.border.static',
      }),
      _disabled: {
        borderColor: 'semantic.border.interactive.disabled',
        backgroundColor: 'semantic.surface.primary.disabled',
        color: 'semantic.text.disabled',
      },
      '&[data-focus="true"]': {
        borderColor: 'semantic.border.interactive.selected',
      },
      '&[data-readonly="true"]': applyInteractiveStates({
        cursor: 'default',
        borderColor: 'semantic.border.interactive.disabled',
        backgroundColor: 'semantic.surface.primary.disabled',
        color: 'semantic.text.secondary',
      }),
      _invalid: applyInteractiveStates({ borderColor: 'semantic.border.critical' }),
    },
    field: {
      bg: 'semantic.surface.primary.rest',
      resize: 'none',
      padding: 's',
      width: '100%',
      borderRadius: 'semantic.input.default',
      textStyle: 'body2',
      overflow: 'auto',
      outlineColor: 'transparent',
      transition: 'outline-color 0.1s ease-in-out',
      _placeholder: {
        color: 'semantic.text.secondary',
      },
      '&[data-editable="false"]': {
        color: 'semantic.text.primary',
        textStyle: 'body4',
        cursor: 'default',
        _placeholder: {
          color: 'semantic.text.secondary',
          textStyle: 'body4',
        },
      },
      _readOnly: {
        cursor: 'default',
        backgroundColor: 'inherit',
        _placeholder: {
          color: 'semantic.text.secondary',
        },
      },
      _disabled: {
        cursor: 'not-allowed',
        color: 'inherit',
        backgroundColor: 'inherit',
        _placeholder: {
          color: 'semantic.text.disabled',
        },
      },

      _focusVisible: {
        outlineStyle: 'solid',
        outlineColor: 'semantic.focus.primary',
        outlineWidth: '2px',
        // This is done here with 4px instead of 2px because of the input-group that wraps the actual textarea element
        outlineOffset: '4px',
      },
      '&[data-loading="true"]': {
        // add loader width padding - left padding (8px) + loader (56px) + right padding (16px)
        paddingRight: '80px' as never,
      },
    },
    loaderContainer: {
      right: 0,
      position: 'absolute',
      width: 'fit-content',
      paddingRight: 's',
    },
    footerContainer: {
      padding: 's',
      display: 'flex',
      alignItems: 'center',
    },
  },
};
