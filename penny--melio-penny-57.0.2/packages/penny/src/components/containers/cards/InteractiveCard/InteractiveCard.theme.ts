import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { type ThemeBorderKey } from '@/theme/foundations/borders/types';
import { type ThemeColorKey } from '@/theme/foundations/colors/types';
import { applySelectableStates } from '@/utils/componentStyle.utils';

import { type InteractiveCardProps } from './InteractiveCard.types';

type BorderStyles = {
  border: ThemeBorderKey;
  borderColor: ThemeColorKey;
};

const pseudoStyles = (beforeBorder: BorderStyles, afterBorder: BorderStyles) => ({
  _before: {
    content: "''",
    position: 'absolute',
    pointerEvents: 'none',
    inset: '0px',
    borderRadius: 'component.card.default',
    ...beforeBorder,
  },
  _after: {
    content: "''",
    position: 'absolute',
    pointerEvents: 'none',
    inset: '0px',
    borderRadius: 'component.card.default',
    ...afterBorder,
  },
});

const disabledStyles = applySelectableStates({
  backgroundColor: 'semantic.surface.primary.disabled',
  shadow: 0,
  ...pseudoStyles(
    {
      border: 'semantic.container.default',
      borderColor: 'semantic.border.interactive.disabled',
    },
    { border: 'global.50', borderColor: 'global.neutral.A0' }
  ),
});

export const interactiveCardTheme: ComponentMultiStyleConfig<'container', Pick<InteractiveCardProps, 'variant'>> = {
  baseStyle: {
    container: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'semantic.surface.primary.rest',
      borderRadius: 'component.card.default',
      overflow: 'hidden',
      outline: '2px solid transparent',
      outlineOffset: '2px',
      transition: 'outline-color 0.2s, box-shadow 0.2s, background-color 0.2s, border-color 0.1s ease-in-out',
      cursor: 'default',
      _readonly: { cursor: 'default' },
      _disabled: { cursor: 'not-allowed' },
      '&[data-is-clickable="true"]': {
        cursor: 'pointer',
      },
    },
  },
  variants: {
    default: {
      container: {
        shadow: 500,
        ...pseudoStyles(
          { border: 'semantic.container.default', borderColor: 'global.neutral.A0' },
          { border: 'global.50', borderColor: 'global.neutral.A0' }
        ),
        '&[data-is-interactive="true"]': {
          _hover: { shadow: '600' },
        },
        _focusVisible: {
          outlineColor: 'semantic.focus.primary',
        },
        '&[data-focus-visible="true"]': {
          outlineColor: 'semantic.focus.primary',
        },
        _selected: {
          _before: {
            border: 'semantic.container.default',
            borderColor: 'global.neutral.A0',
          },
          _after: { border: 'global.50', borderColor: 'semantic.border.brand' },
        },
        _readOnly: applySelectableStates({
          backgroundColor: 'semantic.surface.primary.disabled',
          shadow: 500,
          ...pseudoStyles(
            { border: 'semantic.container.default', borderColor: 'semantic.border.interactive.disabled' },
            { border: 'global.50', borderColor: 'global.neutral.A0' }
          ),
        }),
        _disabled: disabledStyles,
      },
    },
    flat: {
      container: {
        borderRadius: 'component.card.default',
        border: 'global.none',
        backgroundColor: 'semantic.surface.primary.rest',
        ...applySelectableStates({ shadow: 0 }),
        ...pseudoStyles(
          { border: 'semantic.container.default', borderColor: 'semantic.border.interactive.rest' },
          { border: 'global.50', borderColor: 'global.neutral.A0' }
        ),
        '&[data-is-interactive="true"]': {
          _hover: {
            backgroundColor: 'semantic.surface.primary.hover',
            _before: {
              border: 'semantic.container.default',
              borderColor: 'semantic.border.interactive.hover',
            },
          },
        },
        _focusVisible: {
          outlineOffset: '2px',
          outlineColor: 'semantic.focus.primary',
          _hover: {
            _after: {
              border: 'semantic.container.default',
              borderColor: 'semantic.border.interactive.hover',
            },
          },
        },
        '&[data-focus-visible="true"]': {
          outlineColor: 'semantic.focus.primary',
          outlineOffset: '2px',
          _hover: {
            _after: {
              border: 'semantic.container.default',
              borderColor: 'semantic.border.interactive.hover',
            },
          },
        },
        _selected: {
          shadow: 0,
          _before: {
            border: 'semantic.container.default',
            borderColor: 'global.neutral.A0',
          },
          _after: {
            border: 'global.50',
            borderColor: 'semantic.border.brand',
          },
        },
        _readOnly: applySelectableStates({
          backgroundColor: 'semantic.surface.primary.disabled',
          ...pseudoStyles(
            { border: 'semantic.container.default', borderColor: 'semantic.border.interactive.disabled' },
            { border: 'global.50', borderColor: 'global.neutral.A0' }
          ),
        }),
        _disabled: disabledStyles,
      },
    },
  },
};
