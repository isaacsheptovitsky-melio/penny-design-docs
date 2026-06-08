import type { SemanticColorTokenKey } from '@/theme/foundations/tokens/colors/defaultSemanticColors.types';

import type { AvatarColor } from './Avatar.types';

export const BackgroundStyle: Record<AvatarColor, SemanticColorTokenKey> = {
  default: 'semantic.fill.secondary',
  avatar1: 'semantic.fill.decorative.1',
  avatar2: 'semantic.fill.decorative.2',
  avatar3: 'semantic.fill.decorative.3',
  avatar4: 'semantic.fill.decorative.4',
  avatar5: 'semantic.fill.decorative.5',
  avatar6: 'semantic.fill.inverse',
};
