/* eslint-disable max-lines */
import type { ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { applyAllPressableStates } from '@/utils/componentStyle.utils';

import type { ButtonProps, ButtonSizes } from './Button.types';

export const buttonTheme: ComponentMultiStyleConfig<
  'container' | 'label' | 'loader',
  Pick<ButtonProps, 'isLoading' | 'isFullWidth' | 'variant'> & { size: ButtonSizes }
> = {
  parts: ['container', 'label', 'loader'],
  baseStyle: ({ isLoading, isFullWidth }) => ({
    container: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      borderRadius: 'semantic.action.default',
      transitionProperty: 'background-color,border-color,color',
      transitionDuration: '0.2s',
      width: isFullWidth ? '100%' : 'auto',
      outline: 'transparent solid 2px',
      _loading: {
        pointerEvents: 'none',
      },
      _disabled: {
        cursor: 'not-allowed',
      },
    },
    label: {
      display: 'inherit',
      alignItems: 'inherit',
      justifyContent: 'inherit',
      visibility: isLoading ? 'hidden' : 'visible',
      whiteSpace: 'nowrap',
    },
    loader: {
      display: 'inline-flex',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    },
  }),
  sizes: {
    small: {
      container: {
        height: '32px',
        paddingX: 'xs-s',
        minWidth: '80px',
      },
    },
    medium: {
      container: {
        height: '40px',
        paddingX: 's',
        minWidth: '96px',
      },
    },
    large: {
      container: {
        height: '48px',
        paddingX: 's-m',
        minWidth: '112px',
      },
    },
  },
  variants: {
    primary: {
      container: {
        backgroundColor: 'component.button.primary.rest.background',
        color: 'component.button.primary.rest.content',
        border: 'component.button.primary.rest',
        borderColor: 'component.button.primary.rest.border',
        _hover: {
          backgroundColor: 'component.button.primary.hover.background',
          color: 'component.button.primary.hover.content',
          border: 'component.button.primary.hover',
          borderColor: 'component.button.primary.hover.border',
        },
        _active: {
          backgroundColor: 'component.button.primary.pressed.background',
          color: 'component.button.primary.pressed.content',
          border: 'component.button.primary.pressed',
          borderColor: 'component.button.primary.pressed.border',
        },
        _loading: {
          backgroundColor: 'component.button.primary.loading.background',
          color: 'component.button.primary.loading.content',
          border: 'component.button.primary.loading',
          borderColor: 'component.button.primary.loading.border',
        },
        _focusVisible: {
          outlineColor: 'semantic.focus.primary',
          outlineOffset: '2px',
          transition: 'outline-color 0.2s',
        },
        '&[data-inverse="true"]': {
          _focusVisible: {
            outlineColor: 'semantic.focus.inverse',
            outlineOffset: '2px',
            transition: 'outline-color 0.2s',
          },
        },
        _disabled: applyAllPressableStates({
          backgroundColor: 'component.button.primary.disabled.background',
          color: 'component.button.primary.disabled.content',
          border: 'component.button.primary.disabled',
          borderColor: 'component.button.primary.disabled.border',
        }),
      },
    },
    'primary-inverse': {
      container: {
        backgroundColor: 'component.button.primaryInverse.rest.background',
        color: 'component.button.primaryInverse.rest.content',
        border: 'component.button.primaryInverse.rest',
        borderColor: 'component.button.primaryInverse.rest.border',
        _hover: {
          backgroundColor: 'component.button.primaryInverse.hover.background',
          color: 'component.button.primaryInverse.hover.content',
          border: 'component.button.primaryInverse.hover',
          borderColor: 'component.button.primaryInverse.hover.border',
        },
        _active: {
          backgroundColor: 'component.button.primaryInverse.pressed.background',
          color: 'component.button.primaryInverse.pressed.content',
          border: 'component.button.primaryInverse.pressed',
          borderColor: 'component.button.primaryInverse.pressed.border',
        },
        _loading: {
          backgroundColor: 'component.button.primaryInverse.loading.background',
          color: 'component.button.primaryInverse.loading.content',
          border: 'component.button.primaryInverse.loading',
          borderColor: 'component.button.primaryInverse.loading.border',
        },
        _focusVisible: {
          outlineColor: 'semantic.focus.inverse',
          outlineOffset: '2px',
          transition: 'outline-color 0.2s',
        },
        _disabled: applyAllPressableStates({
          backgroundColor: 'component.button.primaryInverse.disabled.background',
          color: 'component.button.primaryInverse.disabled.content',
          border: 'component.button.primaryInverse.disabled',
          borderColor: 'component.button.primaryInverse.disabled.border',
        }),
      },
    },
    secondary: {
      container: {
        backgroundColor: 'component.button.secondary.rest.background',
        color: 'component.button.secondary.rest.content',
        border: 'component.button.secondary.rest',
        borderColor: 'component.button.secondary.rest.border',
        _hover: {
          backgroundColor: 'component.button.secondary.hover.background',
          color: 'component.button.secondary.hover.content',
          border: 'component.button.secondary.hover',
          borderColor: 'component.button.secondary.hover.border',
        },
        _active: {
          backgroundColor: 'component.button.secondary.pressed.background',
          color: 'component.button.secondary.pressed.content',
          border: 'component.button.secondary.pressed',
          borderColor: 'component.button.secondary.pressed.border',
        },
        _loading: {
          backgroundColor: 'component.button.secondary.loading.background',
          color: 'component.button.secondary.loading.content',
          border: 'component.button.secondary.loading',
          borderColor: 'component.button.secondary.loading.border',
        },
        _focusVisible: {
          outlineColor: 'semantic.focus.primary',
          outlineOffset: '2px',
          transition: 'outline-color 0.2s',
        },
        _disabled: applyAllPressableStates({
          backgroundColor: 'component.button.secondary.disabled.background',
          color: 'component.button.secondary.disabled.content',
          border: 'component.button.secondary.disabled',
          borderColor: 'component.button.secondary.disabled.border',
        }),
      },
    },
    'secondary-inverse': {
      container: {
        backgroundColor: 'component.button.secondaryInverse.rest.background',
        color: 'component.button.secondaryInverse.rest.content',
        border: 'component.button.secondaryInverse.rest',
        borderColor: 'component.button.secondaryInverse.rest.border',
        _hover: {
          backgroundColor: 'component.button.secondaryInverse.hover.background',
          color: 'component.button.secondaryInverse.hover.content',
          border: 'component.button.secondaryInverse.hover',
          borderColor: 'component.button.secondaryInverse.hover.border',
        },
        _active: {
          backgroundColor: 'component.button.secondaryInverse.pressed.background',
          color: 'component.button.secondaryInverse.pressed.content',
          border: 'component.button.secondaryInverse.pressed',
          borderColor: 'component.button.secondaryInverse.pressed.border',
        },
        _loading: {
          backgroundColor: 'component.button.secondaryInverse.loading.background',
          color: 'component.button.secondaryInverse.loading.content',
          border: 'component.button.secondaryInverse.loading',
          borderColor: 'component.button.secondaryInverse.loading.border',
        },
        _focusVisible: {
          outlineColor: 'semantic.focus.inverse',
          outlineOffset: '2px',
          transition: 'outline-color 0.2s',
        },
        _disabled: applyAllPressableStates({
          backgroundColor: 'component.button.secondaryInverse.disabled.background',
          color: 'component.button.secondaryInverse.disabled.content',
          border: 'component.button.secondaryInverse.disabled',
          borderColor: 'component.button.secondaryInverse.disabled.border',
        }),
      },
    },
    tertiary: {
      container: {
        backgroundColor: 'component.button.tertiary.rest.background',
        color: 'component.button.tertiary.rest.content',
        border: 'component.button.tertiary.rest',
        borderColor: 'component.button.tertiary.rest.border',
        _hover: {
          backgroundColor: 'component.button.tertiary.hover.background',
          color: 'component.button.tertiary.hover.content',
          border: 'component.button.tertiary.hover',
          borderColor: 'component.button.tertiary.hover.border',
        },
        _active: {
          backgroundColor: 'component.button.tertiary.pressed.background',
          color: 'component.button.tertiary.pressed.content',
          border: 'component.button.tertiary.pressed',
          borderColor: 'component.button.tertiary.pressed.border',
        },
        _loading: {
          backgroundColor: 'component.button.tertiary.loading.background',
          color: 'component.button.tertiary.loading.content',
          border: 'component.button.tertiary.loading',
          borderColor: 'component.button.tertiary.loading.border',
        },
        _focusVisible: {
          outlineColor: 'semantic.focus.primary',
          outlineOffset: '2px',
          transition: 'outline-color 0.2s',
        },
        _disabled: applyAllPressableStates({
          backgroundColor: 'component.button.tertiary.disabled.background',
          color: 'component.button.tertiary.disabled.content',
          border: 'component.button.tertiary.disabled',
          borderColor: 'component.button.tertiary.disabled.border',
        }),
      },
    },
    success: {
      container: {
        backgroundColor: 'semantic.action.success.rest',
        color: 'semantic.text.inverse',
        _hover: { backgroundColor: 'semantic.action.success.hover' },
        _active: { backgroundColor: 'semantic.action.success.pressed' },
        _loading: { backgroundColor: 'semantic.action.success.hover' },
        _focusVisible: {
          outlineColor: 'semantic.focus.primary',
          outlineOffset: '2px',
          transition: 'outline-color 0.2s',
        },
        _disabled: applyAllPressableStates({
          backgroundColor: 'semantic.action.success.disabled',
          color: 'semantic.text.disabled',
          border: 'global.none',
        }),
      },
    },
    critical: {
      container: {
        backgroundColor: 'component.button.critical.rest.background',
        color: 'component.button.critical.rest.content',
        border: 'component.button.critical.rest',
        borderColor: 'component.button.critical.rest.border',
        _hover: {
          backgroundColor: 'component.button.critical.hover.background',
          color: 'component.button.critical.hover.content',
          border: 'component.button.critical.hover',
          borderColor: 'component.button.critical.hover.border',
        },
        _active: {
          backgroundColor: 'component.button.critical.pressed.background',
          color: 'component.button.critical.pressed.content',
          border: 'component.button.critical.pressed',
          borderColor: 'component.button.critical.pressed.border',
        },
        _loading: {
          backgroundColor: 'component.button.critical.loading.background',
          color: 'component.button.critical.loading.content',
          border: 'component.button.critical.loading',
          borderColor: 'component.button.critical.loading.border',
        },
        _focusVisible: {
          outlineColor: 'semantic.focus.primary',
          outlineOffset: '2px',
          transition: 'outline-color 0.2s',
        },
        _disabled: applyAllPressableStates({
          backgroundColor: 'component.button.critical.disabled.background',
          color: 'component.button.critical.disabled.content',
          border: 'component.button.critical.disabled',
          borderColor: 'component.button.critical.disabled.border',
        }),
      },
    },
    'critical-secondary': {
      container: {
        backgroundColor: 'component.button.criticalSecondary.rest.background',
        color: 'component.button.criticalSecondary.rest.content',
        border: 'component.button.criticalSecondary.rest',
        borderColor: 'component.button.criticalSecondary.rest.border',
        _hover: {
          backgroundColor: 'component.button.criticalSecondary.hover.background',
          color: 'component.button.criticalSecondary.hover.content',
          border: 'component.button.criticalSecondary.hover',
          borderColor: 'component.button.criticalSecondary.hover.border',
        },
        _active: {
          backgroundColor: 'component.button.criticalSecondary.pressed.background',
          color: 'component.button.criticalSecondary.pressed.content',
          border: 'component.button.criticalSecondary.pressed',
          borderColor: 'component.button.criticalSecondary.pressed.border',
        },
        _loading: {
          backgroundColor: 'component.button.criticalSecondary.loading.background',
          color: 'component.button.criticalSecondary.loading.content',
          border: 'component.button.criticalSecondary.loading',
          borderColor: 'component.button.criticalSecondary.loading.border',
        },
        _focusVisible: {
          outlineColor: 'semantic.focus.primary',
          outlineOffset: '2px',
          transition: 'outline-color 0.2s',
        },
        _disabled: applyAllPressableStates({
          backgroundColor: 'component.button.criticalSecondary.disabled.background',
          color: 'component.button.criticalSecondary.disabled.content',
          border: 'component.button.criticalSecondary.disabled',
          borderColor: 'component.button.criticalSecondary.disabled.border',
        }),
      },
    },
  },
};
