import type { ThemeColorKey } from '@/theme/foundations/colors/types';

import type { statusIconSolidType } from './StatusIconSolid.types';

export const ColorStyle: Record<keyof typeof statusIconSolidType, ThemeColorKey> = {
  pending: 'semantic.icon.warning',
  warning: 'semantic.icon.warning',
  success: 'semantic.icon.success',
  informative: 'semantic.icon.informative',
  scheduled: 'semantic.icon.informative',
  processing: 'semantic.icon.primary',
  help: 'semantic.icon.primary',
  issues: 'semantic.icon.primary',
  cancel: 'semantic.icon.critical',
  decline: 'semantic.icon.critical',
  alert: 'semantic.icon.critical',
};
