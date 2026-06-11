import type { ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { type InternalCSSObject } from '@/theme/types';

import { BackgroundStyle } from './StatusIndicator.theme.utils';
import type { StatusIndicatorProps } from './StatusIndicator.types';

const getStatusIndicatorStyles = (status: StatusIndicatorProps['status'], hasChildren: boolean): InternalCSSObject => {
  const isStatusSecondary = status === 'secondary';
  const backgroundColor = isStatusSecondary ? 'semantic.icon.inverse' : BackgroundStyle[status];
  const border = isStatusSecondary ? 'global.50' : hasChildren ? 'global.50' : 'global.none';
  const borderColor = isStatusSecondary ? 'semantic.icon.primary' : hasChildren ? 'semantic.icon.inverse' : undefined;
  return { backgroundColor, border, borderColor };
};

const getDisabledStatusIndicatorStyles = (
  status: StatusIndicatorProps['status'],
  hasChildren: boolean
): InternalCSSObject => {
  const isStatusSecondary = status === 'secondary';
  const backgroundColor = isStatusSecondary ? 'semantic.icon.inverse' : 'semantic.icon.disabled';
  const border = isStatusSecondary ? 'global.50' : hasChildren ? 'global.50' : 'global.none';
  const borderColor = isStatusSecondary ? 'semantic.icon.disabled' : hasChildren ? 'semantic.icon.inverse' : undefined;

  return { backgroundColor, border, borderColor };
};

export const statusIndicatorTheme: ComponentMultiStyleConfig<
  'indicator' | 'container',
  StatusIndicatorProps & { hasChildren: boolean }
> = {
  parts: ['indicator', 'container'],
  baseStyle: ({ status, hasChildren }) => ({
    container: {
      display: 'flex',
      position: 'relative',
      width: 'fit-content',
    },
    indicator: {
      position: hasChildren ? 'absolute' : 'relative',
      top: hasChildren ? '-2px' : '0',
      right: hasChildren ? '-2px' : '0',
      pointerEvents: hasChildren ? 'none' : 'all',
      boxSizing: status === 'secondary' ? 'border-box' : 'content-box',
      display: 'inline-flex',
      height: '8px',
      width: '8px',
      borderRadius: 'global.full',
      zIndex: 1,
      ...getStatusIndicatorStyles(status, hasChildren),

      _disabled: {
        ...getDisabledStatusIndicatorStyles(status, hasChildren),
        display: hasChildren ? 'none' : 'inline-flex',
      },
      _readOnly: {
        backgroundColor: status === 'secondary' ? 'semantic.icon.inverse' : 'semantic.icon.readOnly',
        borderColor: status === 'secondary' ? 'semantic.icon.readOnly' : undefined,
      },

      '@media (forced-colors: active)': {
        border: 'global.25',
        borderColor: 'global.neutral.A0',
      },
    },
  }),
};
