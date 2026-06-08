import type { ThemeColorKey } from '@/theme/foundations/colors/types';

import type { CounterProps } from './Counter.types';

export const BackgroundStyle: Record<CounterProps['status'], ThemeColorKey> = {
  warning: 'semantic.fill.warning.primary',
  critical: 'semantic.fill.critical.primary',
  success: 'semantic.fill.success.primary',
  neutral: 'semantic.fill.inverse',
  brand: 'semantic.fill.brand.primary',
  informative: 'semantic.fill.informative.primary',
};
