import { defaultComponentBorders } from './borders/defaultComponentBorders';
import { defaultGlobalBorders } from './borders/defaultGlobalBorders';
import { defaultSemanticBorders } from './borders/defaultSemanticBorders';
import { defaultComponentColors } from './colors/defaultComponentColors';
import { defaultGlobalColors } from './colors/defaultGlobalColors';
import { defaultSemanticColors } from './colors/defaultSemanticColors';
import { defaultComponentBorderRadii } from './radii/defaultComponentBorderRadii';
import { defaultGlobalBorderRadii } from './radii/defaultGlobalBorderRadii';
import { defaultSemanticBorderRadii } from './radii/defaultSemanticBorderRadii';
import { type ThemeDesignTokens } from './types';

export const defaultDesignTokens: ThemeDesignTokens = {
  colors: {
    global: defaultGlobalColors,
    semantic: defaultSemanticColors,
    component: defaultComponentColors,
  },
  borderRadii: {
    global: defaultGlobalBorderRadii,
    semantic: defaultSemanticBorderRadii,
    component: defaultComponentBorderRadii,
  },
  borders: {
    global: defaultGlobalBorders,
    semantic: defaultSemanticBorders,
    component: defaultComponentBorders,
  },
};
