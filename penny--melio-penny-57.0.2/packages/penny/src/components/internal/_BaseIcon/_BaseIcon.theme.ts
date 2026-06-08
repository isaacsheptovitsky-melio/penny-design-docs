import { type ComponentSingleStyleConfig } from '../../../theme/component-style-config-types';
import { getIconSize } from '../../../theme/icons/utils';
import { type _BaseIconProps, iconColorMapping } from './_BaseIcon.types';

export const baseIconTheme: ComponentSingleStyleConfig<
  Pick<_BaseIconProps, 'size'> & { isInverse?: boolean; isURLIcon?: boolean }
> = {
  baseStyle: ({ isInverse }) => ({
    display: 'inline-flex',
    borderRadius: 'global.50',
    outlineColor: 'transparent',
    transition: 'outline-color 0.2s',

    _readOnly: {
      color: 'semantic.icon.readOnly',

      '&[data-is-brand-color="true"]': {
        opacity: 0.6,
        color: iconColorMapping['brand'],
      },
    },
    _disabled: {
      color: 'semantic.icon.disabled',

      '&[data-is-brand-color="true"]': {
        opacity: 0.35,
        color: iconColorMapping['brand'],
      },
    },
    _focusVisible: {
      outlineColor: isInverse ? 'semantic.focus.inverse' : 'semantic.focus.primary',
      outlineWidth: '2px',
      outlineOffset: '2px',
      outlineStyle: 'solid',
    },
    '& svg path:not([fill="currentColor"])': {
      '@media (forced-colors: active)': {
        fill: 'Canvas',
      },
    },
  }),
  sizes: {
    'extra-small': getIconSize,
    small: getIconSize,
    'small-medium': getIconSize,
    medium: getIconSize,
    large: getIconSize,
    'extra-large': getIconSize,
  },
};
