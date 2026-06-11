import type { ThemeColorKey } from '@/theme/foundations/colors/types';

import type { StatusType } from './StatusIndicator.types';

export const BackgroundStyle: Record<StatusType, ThemeColorKey> = {
  brand: 'semantic.fill.brand.primary',
  critical: 'semantic.fill.critical.primary',
  warning: 'semantic.fill.warning.primary',
  success: 'semantic.fill.success.primary',
  informative: 'semantic.fill.informative.primary',
  neutral: 'semantic.fill.inverse',
  secondary: 'semantic.fill.primary',
};
