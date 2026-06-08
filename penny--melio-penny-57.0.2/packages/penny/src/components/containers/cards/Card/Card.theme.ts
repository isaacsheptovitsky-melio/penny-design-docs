import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { applyInteractiveStates } from '@/utils/componentStyle.utils';

import { type CardProps } from './Card.types';

export const cardTheme: ComponentMultiStyleConfig<
  'container',
  Pick<CardProps, 'paddingX' | 'paddingY' | 'variant' | 'width'>
> = {
  parts: ['container'],
  baseStyle: ({ paddingX, paddingY, width }) => ({
    container: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'semantic.surface.primary.rest',
      borderRadius: 'component.card.default',
      paddingY,
      paddingX,
      width,
      overflow: 'hidden',
      outline: '2px solid transparent',
      outlineOffset: '2px',
      transition: 'outline-color 0.2s',
      cursor: 'default',
      _readonly: { cursor: 'default' },
      _disabled: { cursor: 'not-allowed' },
      '&[data-is-clickable="true"]': {
        cursor: 'pointer',
      },
    },
  }),
  variants: {
    default: {
      container: {
        shadow: 500,
        _focusVisible: {
          outlineColor: 'semantic.focus.primary',
        },
        _before: {
          border: 'semantic.container.default',
          borderColor: 'global.neutral.A0',
        },
        _readOnly: applyInteractiveStates({
          backgroundColor: 'semantic.surface.primary.disabled',
          shadow: 500,
          _before: {
            border: 'semantic.container.default',
            borderColor: 'global.neutral.A0',
          },
        }),
        _disabled: applyInteractiveStates({
          backgroundColor: 'semantic.surface.primary.disabled',
          shadow: 0,
          _before: {
            border: 'semantic.container.default',
            borderColor: 'semantic.border.static',
          },
        }),
      },
    },
    flat: {
      container: {
        borderRadius: 'component.card.default',
        border: 'global.none',
        backgroundColor: 'semantic.surface.primary.rest',
        ...applyInteractiveStates({ shadow: 0 }),
        _before: {
          content: "''",
          position: 'absolute',
          pointerEvents: 'none',
          inset: '0px',
          borderRadius: 'component.card.default',
          border: 'semantic.container.default',
          borderColor: 'semantic.border.interactive.rest',
        },
        _focusVisible: {
          outlineWidth: '2px',
          outlineOffset: '2px',
          outlineColor: 'semantic.focus.primary',
          _hover: {
            _after: {
              border: 'semantic.container.default',
              borderColor: 'semantic.border.interactive.hover',
            },
          },
        },
        _readOnly: applyInteractiveStates({
          backgroundColor: 'semantic.surface.primary.disabled',
          _before: {
            border: 'semantic.container.default',
            borderColor: 'semantic.border.interactive.rest',
          },
        }),
        _disabled: applyInteractiveStates({
          backgroundColor: 'semantic.surface.primary.disabled',
          shadow: 0,
          _before: {
            border: 'semantic.container.default',
            borderColor: 'semantic.border.interactive.disabled',
          },
        }),
      },
    },
  },
};
