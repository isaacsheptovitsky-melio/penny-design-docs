import type { ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { applyAllPressableStates } from '@/utils/componentStyle.utils';

import { getColorComponentToken } from './NakedButton.theme.utils';
import type { NakedButtonProps } from './NakedButton.types';

export const nakedButtonTheme: ComponentMultiStyleConfig<
  'container' | 'label',
  Pick<NakedButtonProps, 'variant' | 'shouldSupportEllipsis' | 'size'>
> = {
  parts: ['container', 'label'],
  baseStyle: ({ shouldSupportEllipsis }) => ({
    container: {
      maxWidth: '100%',
      // Reset browser default <button> styles
      border: 'none',
      background: 'transparent',
      padding: 0,
      cursor: 'pointer',
      transitionProperty: 'color',
      transitionDuration: '0.2s',
      outline: '2px solid transparent',
      borderRadius: 'global.100',
      _hover: {
        textDecoration: 'underline',
      },
      _active: {
        textDecoration: 'underline',
      },
      _disabled: {
        textDecoration: 'none',
        cursor: 'not-allowed',
      },
    },
    label: {
      height: 'fit-content',
      flexGrow: 1,
      ...(shouldSupportEllipsis && {
        maxWidth: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }),
    },
  }),
  sizes: {
    medium: {
      label: {
        textStyle: 'body3Semi',
      },
    },
    large: {
      label: {
        textStyle: 'body2Semi',
      },
    },
  },
  variants: {
    primary: ({ theme }) => ({
      container: {
        color: getColorComponentToken('primary', 'rest'),
        _hover: {
          color: getColorComponentToken('primary', 'hover'),
        },
        _active: {
          color: getColorComponentToken('primary', 'pressed'),
        },
        _disabled: applyAllPressableStates({
          color: getColorComponentToken('primary', 'disabled'),
        }),
        _focusVisible: {
          outlineColor: 'semantic.focus.primary',
          outlineOffset: theme.space['xxs'] as never,
          transition: 'outline-color 0.2s',
        },
      },
    }),
    secondary: ({ theme }) => ({
      container: {
        color: getColorComponentToken('secondary', 'rest'),
        _hover: {
          color: getColorComponentToken('secondary', 'hover'),
        },
        _active: {
          color: getColorComponentToken('secondary', 'pressed'),
        },
        _disabled: applyAllPressableStates({
          color: getColorComponentToken('secondary', 'disabled'),
        }),
        _focusVisible: {
          outlineColor: 'semantic.focus.primary',
          outlineOffset: theme.space['xxs'] as never,
          transition: 'outline-color 0.2s',
        },
      },
    }),
    invert: ({ theme }) => ({
      container: {
        color: getColorComponentToken('invert', 'rest'),
        _hover: {
          color: getColorComponentToken('invert', 'hover'),
        },
        _active: {
          color: getColorComponentToken('invert', 'pressed'),
        },
        _disabled: applyAllPressableStates({
          color: getColorComponentToken('invert', 'disabled'),
        }),
        _focusVisible: {
          outlineColor: 'semantic.focus.inverse',
          outlineOffset: theme.space['xxs'] as never,
          transition: 'outline-color 0.2s',
        },
      },
    }),
    critical: ({ theme }) => ({
      container: {
        color: getColorComponentToken('critical', 'rest'),
        _hover: {
          color: getColorComponentToken('critical', 'hover'),
        },
        _active: {
          color: getColorComponentToken('critical', 'pressed'),
        },
        _disabled: applyAllPressableStates({
          color: getColorComponentToken('critical', 'disabled'),
        }),
        _focusVisible: {
          outlineColor: 'semantic.focus.primary',
          outlineOffset: theme.space['xxs'] as never,
          transition: 'outline-color 0.2s',
        },
      },
    }),
  },
};
