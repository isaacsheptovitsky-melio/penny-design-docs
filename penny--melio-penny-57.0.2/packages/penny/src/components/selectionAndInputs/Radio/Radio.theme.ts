import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { type InternalCSSObject } from '@/theme/types';
import { applyInteractiveStates } from '@/utils/componentStyle.utils';

const disabledInputStyle: InternalCSSObject = {
  borderColor: 'semantic.border.interactive.disabled',
  backgroundColor: 'semantic.surface.primary.disabled',
  cursor: 'not-allowed',
};

const readOnlyInputStyle: InternalCSSObject = {
  borderColor: 'semantic.border.interactive.disabled',
  backgroundColor: 'semantic.surface.primary.disabled',
  cursor: 'default',
};

export const radioTheme: ComponentMultiStyleConfig<'radio' | 'iconIndicator' | 'label' | 'description'> = {
  parts: ['radio', 'iconIndicator', 'label', 'description'],
  baseStyle: {
    radio: {
      cursor: 'pointer',
      appearance: 'none',
      border: 'semantic.input.default',
      borderColor: 'semantic.border.interactive.rest',
      minWidth: '20px',
      height: '20px',
      borderRadius: 'global.full',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'semantic.surface.primary.rest',
      _before: {
        content: "''",
        width: '10px',
        height: '10px',
        borderRadius: 'global.full',
        backgroundColor: 'transparent',
        border: 'transparent',
      },
      _hover: {
        border: 'semantic.input.default',
        borderColor: 'semantic.border.interactive.hover',
      },
      _readOnly: readOnlyInputStyle,
      _focusVisible: {
        outlineStyle: 'solid',
        outlineColor: 'semantic.focus.primary',
        outlineOffset: '2px',
        outlineWidth: '2px',
      },
      _invalid: {
        border: 'semantic.input.default',
        borderColor: 'semantic.border.critical',
      },
      _checked: {
        border: 'semantic.input.default',
        borderColor: 'semantic.border.interactive.selected',
        _before: {
          backgroundColor: 'semantic.action.primary.rest',
          border: 'semantic.input.default',
          borderColor: 'semantic.border.brand',
        },
        _disabled: applyInteractiveStates({
          ...disabledInputStyle,
          opacity: 1, //  override chakra's 0.4 opacity

          _before: {
            backgroundColor: 'semantic.icon.disabled',
            border: 'global.none',
          },
        } as InternalCSSObject),
        _readOnly: {
          ...readOnlyInputStyle,
          _before: {
            backgroundColor: 'semantic.icon.readOnly',
            border: 'global.none',
          },
          _hover: {
            _before: {
              backgroundColor: 'semantic.icon.readOnly',
              border: 'global.none',
            },
            borderColor: 'semantic.border.interactive.disabled',
          },
        },
        _invalid: {
          border: 'semantic.input.default',
          borderColor: 'semantic.border.critical',
          _before: {
            border: 'semantic.input.default',
            borderColor: 'semantic.border.critical',
            backgroundColor: 'semantic.action.criticalPrimary.rest',
          },
          _hover: {
            _before: {
              backgroundColor: 'semantic.action.criticalPrimary.rest',
              border: 'global.none',
            },
            borderColor: 'semantic.border.critical',
          },
        },
        _hover: {
          _before: {
            borderColor: 'semantic.border.interactive.selected',
            backgroundColor: 'semantic.action.primary.rest',
          },
          borderColor: 'semantic.border.interactive.selected',
        },
      },
      _disabled: {
        ...disabledInputStyle,
        opacity: 1, //  override chakra's 0.4 opacity
      },
    },
    iconIndicator: {
      display: 'flex',
    },
    label: {
      cursor: 'pointer',
      paddingLeft: 'xs',
      _disabled: {
        cursor: 'not-allowed',
        opacity: 1, //  override chakra's 0.4 opacity
        color: 'semantic.text.disabled',
      },
      _readOnly: {
        cursor: 'default',
        color: 'semantic.text.secondary',
      },
    },
    description: {
      paddingLeft: 'xs',
    },
  },
};
