import type { ThemeColorKey } from '@/theme/foundations/colors/types';

import type { ToastType } from './Toast.types';

// eslint-disable-next-line @typescript-eslint/no-deprecated
export const BackgroundStyle: Record<ToastType, ThemeColorKey> = {
  success: 'semantic.fill.success.primary',
  error: 'semantic.fill.critical.primary',
  informative: 'semantic.fill.inverse',
};
