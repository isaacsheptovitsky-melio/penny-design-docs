import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { type InternalCSSObject } from '@/theme/types';
import { applyInteractiveStates } from '@/utils/componentStyle.utils';

import type { CheckboxProps } from './Checkbox.types';

const sharedDisabledInputStyle: InternalCSSObject = {
  backgroundColor: 'semantic.action.primary.disabled',
  color: 'semantic.icon.disabled',
  cursor: 'not-allowed',
};

const sharedReadOnlyInputStyle: InternalCSSObject = {
  backgroundColor: 'semantic.action.primary.disabled',
  color: 'semantic.icon.readOnly',
  cursor: 'default',
};

const checkboxSizes = {
  height: '20px',
  width: '20px',
};

const smallCheckboxSizes = {
  height: '16px',
  width: '16px',
};

export const checkboxTheme: ComponentMultiStyleConfig<
  'container' | 'innerIcon' | 'checkboxContainer' | 'checkbox' | 'label',
  Pick<CheckboxProps, 'size'>
> = {
  parts: ['container', 'innerIcon', 'checkboxContainer', 'checkbox', 'label'],
  baseStyle: {
    container: {
      cursor: 'pointer',
      display: 'inline-flex',
      _disabled: {
        cursor: 'not-allowed',
      },
      _readOnly: {
        cursor: 'default',
      },
    },
    checkboxContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'fit-content',
      width: 'fit-content',

      '&[data-with-label="false"]': {
        marginTop: 'none',
      },
    },
    checkbox: {
      appearance: 'none',
      cursor: 'pointer',
      paddingY: 'xxxs',
      borderRadius: 'global.100',
      border: 'semantic.input.default',
      borderColor: 'semantic.border.interactive.rest',
      backgroundColor: 'semantic.surface.primary.rest',
      gridColumn: '1 / -1',
      gridRow: '1 / -1',
      alignSelf: 'center',
      justifySelf: 'center',
      ...checkboxSizes,
      _hover: {
        border: 'semantic.input.default',
        borderColor: 'semantic.border.interactive.hover',
      },
      _checked: {
        border: 'semantic.input.default',
        borderColor: 'global.neutral.A0',
        backgroundColor: 'semantic.action.primary.rest',
        _hover: {
          backgroundColor: 'semantic.action.primary.hover',
          border: 'semantic.input.default',
          borderColor: 'global.neutral.A0',
        },
        _disabled: applyInteractiveStates({ ...sharedDisabledInputStyle, borderColor: 'global.neutral.A0' }),
        _readOnly: { ...sharedReadOnlyInputStyle, borderColor: 'global.neutral.A0' },
        _invalid: {
          border: 'semantic.input.default',
          borderColor: 'global.neutral.A0',
          backgroundColor: 'semantic.action.criticalPrimary.rest',
        },
      },
      _indeterminate: {
        backgroundColor: 'semantic.action.primary.rest',
        border: 'semantic.input.default',
        borderColor: 'global.neutral.A0',
        _disabled: { ...sharedDisabledInputStyle, borderColor: 'global.neutral.A0' },
        _readOnly: { ...sharedReadOnlyInputStyle, borderColor: 'global.neutral.A0' },
        _invalid: {
          border: 'semantic.input.default',
          borderColor: 'global.neutral.A0',
          backgroundColor: 'semantic.action.criticalPrimary.rest',
        },
      },
      _invalid: {
        borderColor: 'semantic.action.criticalPrimary.rest',
      },
      _readOnly: { ...sharedReadOnlyInputStyle, borderColor: 'semantic.border.interactive.disabled' },
      _disabled: { ...sharedDisabledInputStyle, borderColor: 'semantic.border.interactive.disabled' },
      _focusVisible: {
        outlineStyle: 'solid',
        outlineWidth: '2px',
        outlineOffset: '2px',
        outlineColor: 'semantic.focus.primary',
        transition: 'outline-color 0.1s',
      },
    },
    innerIcon: {
      pointerEvents: 'none',
      color: 'semantic.icon.inverse',
      gridColumn: '1 / -1',
      gridRow: '1 / -1',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      justifySelf: 'center',
      ...checkboxSizes,
      _readOnly: {
        color: 'semantic.icon.readOnly',
      },
      _disabled: {
        color: 'semantic.icon.disabled',
      },
    },
    label: {
      cursor: 'pointer',
      color: 'semantic.text.primary',

      _disabled: {
        color: 'semantic.text.disabled',
        opacity: 1, //  override chakra's 0.4 opacity
        cursor: 'not-allowed',
      },

      _readOnly: {
        color: 'semantic.text.secondary',
        cursor: 'default',
      },
    },
  },
  sizes: {
    small: {
      checkboxContainer: {
        marginTop: { xs: 'xxs', s: 'xxxs' },
      },
      checkbox: {
        ...smallCheckboxSizes,
      },
      label: {
        textStyle: 'body3',
      },
      innerIcon: {
        ...smallCheckboxSizes,
      },
    },
    large: {
      checkboxContainer: {
        marginTop: 'xxxs',
      },
      checkbox: {
        ...checkboxSizes,
      },
      label: {
        textStyle: 'body2',
      },
      innerIcon: {
        ...checkboxSizes,
      },
    },
  },
};
