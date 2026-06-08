/* eslint-disable max-lines */

import type { ComponentSingleStyleConfig } from '@/theme/component-style-config-types';
import { applyAllPressableStates } from '@/utils/componentStyle.utils';

import type { IconButtonProps } from './IconButton.types';

export const iconButtonTheme: ComponentSingleStyleConfig<Pick<IconButtonProps, 'variant' | 'size'>> = {
  baseStyle: {
    flexShrink: 0,
    // Reset native <button> defaults (grey background, outset border). Penny relies on Chakra's
    // global CSS reset for this, which this docs project doesn't apply — so without these resets
    // the `naked` / `naked-inverse` variants (the only ones that set no background or border) fall
    // through to the browser's default button styling. Variants override these as needed.
    backgroundColor: 'transparent',
    border: 'global.none',
    transitionProperty: 'background-color,border-color,color',
    transitionDuration: '0.2s',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    outline: '2px solid transparent',
    _loading: {
      pointerEvents: 'none',
      cursor: 'default',
    },
    _disabled: {
      cursor: 'not-allowed',
    },
    // 24px target size
    // https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
    width: '24px',
    height: '24px',
  },
  sizes: {
    'extra-small': {
      height: '24px',
      width: '24px',
    },
    small: {
      height: '32px',
      width: '32px',
    },
    medium: {
      height: '40px',
      width: '40px',
    },
    large: {
      height: '48px',
      width: '48px',
    },
  },
  variants: {
    tertiary: {
      borderRadius: 'semantic.action.default',
      padding: 'xs',
      backgroundColor: 'component.iconButton.tertiary.rest.background',
      color: 'component.iconButton.tertiary.rest.content',
      border: 'component.iconButton.tertiary.rest',
      borderColor: 'component.iconButton.tertiary.rest.border',
      _hover: {
        backgroundColor: 'component.iconButton.tertiary.hover.background',
        color: 'component.iconButton.tertiary.hover.content',
        border: 'component.iconButton.tertiary.hover',
        borderColor: 'component.iconButton.tertiary.hover.border',
      },
      _active: {
        backgroundColor: 'component.iconButton.tertiary.pressed.background',
        color: 'component.iconButton.tertiary.pressed.content',
        border: 'component.iconButton.tertiary.pressed',
        borderColor: 'component.iconButton.tertiary.pressed.border',
      },
      _loading: {
        backgroundColor: 'component.iconButton.tertiary.loading.background',
        color: 'component.iconButton.tertiary.loading.content',
        border: 'component.iconButton.tertiary.loading',
        borderColor: 'component.iconButton.tertiary.loading.border',
      },
      _disabled: applyAllPressableStates({
        backgroundColor: 'component.iconButton.tertiary.disabled.background',
        color: 'component.iconButton.tertiary.disabled.content',
        border: 'component.iconButton.tertiary.disabled',
        borderColor: 'component.iconButton.tertiary.disabled.border',
      }),
      _focusVisible: {
        outlineColor: 'semantic.focus.primary',
        outlineOffset: '2px',
        transition: 'outline-color 0.2s',
      },
    },
    naked: {
      color: 'semantic.icon.primary',
      borderRadius: 'semantic.action.default',
      _hover: {
        backgroundColor: 'semantic.action.tertiary.hover',
        color: 'semantic.icon.primary',
      },
      _active: {
        backgroundColor: 'semantic.action.tertiary.pressed',
        color: 'semantic.icon.primary',
      },
      _disabled: applyAllPressableStates({
        color: 'semantic.icon.disabled',
        backgroundColor: 'semantic.action.tertiary.rest',
        border: 'global.none',
      }),
      _focusVisible: {
        outlineColor: 'semantic.focus.primary',
        transition: 'outline-color 0.2s',
      },
    },
    'secondary-inverse': {
      borderRadius: 'semantic.action.default',
      padding: 'xs',
      border: 'component.iconButton.secondaryInverse.rest',
      borderColor: 'component.iconButton.secondaryInverse.rest.border',
      backgroundColor: 'component.iconButton.secondaryInverse.rest.background',
      color: 'component.iconButton.secondaryInverse.rest.content',
      _hover: {
        backgroundColor: 'component.iconButton.secondaryInverse.hover.background',
        color: 'component.iconButton.secondaryInverse.hover.content',
        border: 'component.iconButton.secondaryInverse.hover',
        borderColor: 'component.iconButton.secondaryInverse.hover.border',
      },
      _active: {
        backgroundColor: 'component.iconButton.secondaryInverse.pressed.background',
        color: 'component.iconButton.secondaryInverse.pressed.content',
        border: 'component.iconButton.secondaryInverse.pressed',
        borderColor: 'component.iconButton.secondaryInverse.pressed.border',
      },
      _loading: {
        backgroundColor: 'component.iconButton.secondaryInverse.loading.background',
        color: 'component.iconButton.secondaryInverse.loading.content',
        border: 'component.iconButton.secondaryInverse.loading',
        borderColor: 'component.iconButton.secondaryInverse.loading.border',
      },
      _disabled: applyAllPressableStates({
        backgroundColor: 'component.iconButton.secondaryInverse.disabled.background',
        color: 'component.iconButton.secondaryInverse.disabled.content',
        border: 'component.iconButton.secondaryInverse.disabled',
        borderColor: 'component.iconButton.secondaryInverse.disabled.border',
      }),
      _focusVisible: {
        outlineColor: 'semantic.focus.inverse',
        outlineOffset: '2px',
        transition: 'outline-color 0.2s',
      },
    },
    secondary: {
      borderRadius: 'semantic.action.default',
      padding: 'xs',
      border: 'component.iconButton.secondary.rest',
      borderColor: 'component.iconButton.secondary.rest.border',
      backgroundColor: 'component.iconButton.secondary.rest.background',
      color: 'component.iconButton.secondary.rest.content',
      _hover: {
        backgroundColor: 'component.iconButton.secondary.hover.background',
        color: 'component.iconButton.secondary.hover.content',
        border: 'component.iconButton.secondary.hover',
        borderColor: 'component.iconButton.secondary.hover.border',
      },
      _active: {
        backgroundColor: 'component.iconButton.secondary.pressed.background',
        color: 'component.iconButton.secondary.pressed.content',
        border: 'component.iconButton.secondary.pressed',
        borderColor: 'component.iconButton.secondary.pressed.border',
      },
      _loading: {
        backgroundColor: 'component.iconButton.secondary.loading.background',
        color: 'component.iconButton.secondary.loading.content',
        border: 'component.iconButton.secondary.loading',
        borderColor: 'component.iconButton.secondary.loading.border',
      },
      _disabled: applyAllPressableStates({
        backgroundColor: 'component.iconButton.secondary.disabled.background',
        color: 'component.iconButton.secondary.disabled.content',
        border: 'component.iconButton.secondary.disabled',
        borderColor: 'component.iconButton.secondary.disabled.border',
      }),
      _focusVisible: {
        outlineColor: 'semantic.focus.primary',
        outlineOffset: '2px',
        transition: 'outline-color 0.2s',
      },
    },
    critical: {
      borderRadius: 'semantic.action.default',
      padding: 'xs',
      border: 'component.iconButton.critical.rest',
      borderColor: 'component.iconButton.critical.rest.border',
      backgroundColor: 'component.iconButton.critical.rest.background',
      color: 'component.iconButton.critical.rest.content',
      _hover: {
        backgroundColor: 'component.iconButton.critical.hover.background',
        color: 'component.iconButton.critical.hover.content',
        border: 'component.iconButton.critical.hover',
        borderColor: 'component.iconButton.critical.hover.border',
      },
      _active: {
        backgroundColor: 'component.iconButton.critical.pressed.background',
        color: 'component.iconButton.critical.pressed.content',
        border: 'component.iconButton.critical.pressed',
        borderColor: 'component.iconButton.critical.pressed.border',
      },
      _loading: {
        backgroundColor: 'component.iconButton.critical.loading.background',
        color: 'component.iconButton.critical.loading.content',
        border: 'component.iconButton.critical.loading',
        borderColor: 'component.iconButton.critical.loading.border',
      },
      _disabled: applyAllPressableStates({
        backgroundColor: 'component.iconButton.critical.disabled.background',
        color: 'component.iconButton.critical.disabled.content',
        border: 'component.iconButton.critical.disabled',
        borderColor: 'component.iconButton.critical.disabled.border',
      }),
      _focusVisible: {
        outlineColor: 'semantic.focus.primary',
        outlineOffset: '2px',
        transition: 'outline-color 0.2s',
      },
    },
    'critical-secondary': {
      borderRadius: 'semantic.action.default',
      padding: 'xs',
      border: 'component.iconButton.criticalSecondary.rest',
      borderColor: 'component.iconButton.criticalSecondary.rest.border',
      backgroundColor: 'component.iconButton.criticalSecondary.rest.background',
      color: 'component.iconButton.criticalSecondary.rest.content',
      _hover: {
        backgroundColor: 'component.iconButton.criticalSecondary.hover.background',
        color: 'component.iconButton.criticalSecondary.hover.content',
        border: 'component.iconButton.criticalSecondary.hover',
        borderColor: 'component.iconButton.criticalSecondary.hover.border',
      },
      _active: {
        backgroundColor: 'component.iconButton.criticalSecondary.pressed.background',
        color: 'component.iconButton.criticalSecondary.pressed.content',
        border: 'component.iconButton.criticalSecondary.pressed',
        borderColor: 'component.iconButton.criticalSecondary.pressed.border',
      },
      _loading: {
        backgroundColor: 'component.iconButton.criticalSecondary.loading.background',
        color: 'component.iconButton.criticalSecondary.loading.content',
        border: 'component.iconButton.criticalSecondary.loading',
        borderColor: 'component.iconButton.criticalSecondary.loading.border',
      },
      _disabled: applyAllPressableStates({
        backgroundColor: 'component.iconButton.criticalSecondary.disabled.background',
        color: 'component.iconButton.criticalSecondary.disabled.content',
        border: 'component.iconButton.criticalSecondary.disabled',
        borderColor: 'component.iconButton.criticalSecondary.disabled.border',
      }),
      _focusVisible: {
        outlineColor: 'semantic.focus.primary',
        outlineOffset: '2px',
        transition: 'outline-color 0.2s',
      },
    },
    'naked-inverse': {
      color: 'semantic.text.inverse',
      backgroundColor: 'semantic.action.inverseTertiary.rest',
      borderRadius: 'semantic.action.default',
      _hover: {
        backgroundColor: 'semantic.action.inverseTertiary.hover',
      },
      _active: {
        backgroundColor: 'semantic.action.inverseTertiary.pressed',
      },
      _disabled: applyAllPressableStates({
        color: 'semantic.icon.inverseDisabled',
        backgroundColor: 'semantic.action.inverseTertiary.rest',
      }),
      _focusVisible: {
        outlineColor: 'semantic.focus.inverse',
        transition: 'outline-color 0.2s',
      },
    },
    primary: {
      borderRadius: 'semantic.action.default',
      padding: 'xs',
      border: 'component.iconButton.primary.rest',
      backgroundColor: 'component.iconButton.primary.rest.background',
      color: 'component.iconButton.primary.rest.content',
      borderColor: 'component.iconButton.primary.rest.border',
      _hover: {
        backgroundColor: 'component.iconButton.primary.hover.background',
        color: 'component.iconButton.primary.hover.content',
        border: 'component.iconButton.primary.hover',
        borderColor: 'component.iconButton.primary.hover.border',
      },
      _active: {
        backgroundColor: 'component.iconButton.primary.pressed.background',
        color: 'component.iconButton.primary.pressed.content',
        border: 'component.iconButton.primary.pressed',
        borderColor: 'component.iconButton.primary.pressed.border',
      },
      _loading: {
        backgroundColor: 'component.iconButton.primary.loading.background',
        color: 'component.iconButton.primary.loading.content',
        border: 'component.iconButton.primary.loading',
        borderColor: 'component.iconButton.primary.loading.border',
      },
      _disabled: applyAllPressableStates({
        backgroundColor: 'component.iconButton.primary.disabled.background',
        color: 'component.iconButton.primary.disabled.content',
        border: 'component.iconButton.primary.disabled',
        borderColor: 'component.iconButton.primary.disabled.border',
      }),
      _focusVisible: {
        outlineColor: 'semantic.focus.primary',
        outlineOffset: '2px',
        transition: 'outline-color 0.2s',
      },
    },
    'primary-inverse': {
      borderRadius: 'semantic.action.default',
      border: 'component.iconButton.primaryInverse.rest',
      borderColor: 'component.iconButton.primaryInverse.rest.border',
      backgroundColor: 'component.iconButton.primaryInverse.rest.background',
      color: 'component.iconButton.primaryInverse.rest.content',
      _hover: {
        backgroundColor: 'component.iconButton.primaryInverse.hover.background',
        color: 'component.iconButton.primaryInverse.hover.content',
        border: 'component.iconButton.primaryInverse.hover',
        borderColor: 'component.iconButton.primaryInverse.hover.border',
      },
      _active: {
        backgroundColor: 'component.iconButton.primaryInverse.pressed.background',
        color: 'component.iconButton.primaryInverse.pressed.content',
        border: 'component.iconButton.primaryInverse.pressed',
        borderColor: 'component.iconButton.primaryInverse.pressed.border',
      },
      _loading: {
        backgroundColor: 'component.iconButton.primaryInverse.loading.background',
        color: 'component.iconButton.primaryInverse.loading.content',
        border: 'component.iconButton.primaryInverse.loading',
        borderColor: 'component.iconButton.primaryInverse.loading.border',
      },
      _disabled: applyAllPressableStates({
        backgroundColor: 'component.iconButton.primaryInverse.disabled.background',
        color: 'component.iconButton.primaryInverse.disabled.content',
        border: 'component.iconButton.primaryInverse.disabled',
        borderColor: 'component.iconButton.primaryInverse.disabled.border',
      }),
      _focusVisible: {
        outlineColor: 'semantic.focus.inverse',
        outlineOffset: '2px',
        transition: 'outline-color 0.2s',
      },
    },
  },
};
