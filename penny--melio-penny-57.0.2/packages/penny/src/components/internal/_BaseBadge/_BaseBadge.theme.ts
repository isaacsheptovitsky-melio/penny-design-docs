import { type ComponentSingleStyleConfig } from '../../../theme/component-style-config-types';
import { getBackgroundColor, getBorder, getBorderColor, getColor } from './_BaseBadge.theme.utils';
import { type _BaseBadgeProps } from './_BaseBadge.types';

export const _baseBadgeTheme: ComponentSingleStyleConfig<Pick<_BaseBadgeProps, 'status' | 'type'>> = {
  baseStyle: ({ status, type }) => ({
    paddingX: 'xs',
    paddingY: 'xxxs',
    display: 'inline-flex',
    flexShrink: 0,
    minWidth: '16px',
    height: '20px',
    textStyle: 'body4',
    borderRadius: 'component.pill.default',
    whiteSpace: 'nowrap',
    backgroundColor: getBackgroundColor(status, type),
    color: getColor(status, type),
    border: getBorder(status, type),
    borderColor: getBorderColor(status, type),
    width: 'fit-content',
    alignItems: 'center',
    justifyContent: 'center',
    _readOnly: {
      backgroundColor: 'semantic.fill.secondary',
      color: 'semantic.text.secondary',
    },
    _disabled: {
      backgroundColor: 'semantic.fill.disabled',
      color: 'semantic.text.disabled',
    },

    '@media (forced-colors: active)': {
      border: 'global.25',
      borderColor: 'global.neutral.A0',
    },
  }),
};
