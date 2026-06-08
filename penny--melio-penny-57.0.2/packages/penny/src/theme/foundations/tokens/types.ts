import { type ComponentBorderTokens } from './borders/defaultComponentBorders.types';
import { type GlobalBorderTokens } from './borders/defaultGlobalBorders.types';
import { type SemanticBorderTokens } from './borders/defaultSemanticBorders.types';
import { type ComponentColorTokenKey, type ComponentColorTokens } from './colors/defaultComponentColors.types';
import { type GlobalColorTokens } from './colors/defaultGlobalColors.types';
import { type SemanticColorTokenKey, type SemanticColorTokens } from './colors/defaultSemanticColors.types';
import { type ComponentBorderRadiusTokens } from './radii/defaultComponentBorderRadii.types';
import { type GlobalBorderRadiusTokenKey, type GlobalBorderRadiusTokens } from './radii/defaultGlobalBorderRadii.types';
import { type SemanticBorderRadiusTokens } from './radii/defaultSemanticBorderRadii.types';

export type ThemeDesignTokens = {
  colors: {
    global: GlobalColorTokens;
    semantic: SemanticColorTokens;
    component: ComponentColorTokens;
  };
  borderRadii: {
    global: GlobalBorderRadiusTokens;
    semantic: SemanticBorderRadiusTokens;
    component: ComponentBorderRadiusTokens;
  };
  borders: {
    global: GlobalBorderTokens;
    semantic: SemanticBorderTokens;
    component: ComponentBorderTokens;
  };
};

export type {
  ComponentBorderRadiusTokens,
  ComponentBorderTokens,
  ComponentColorTokenKey,
  ComponentColorTokens,
  GlobalBorderRadiusTokenKey,
  GlobalBorderRadiusTokens,
  GlobalBorderTokens,
  GlobalColorTokens,
  SemanticBorderRadiusTokens,
  SemanticBorderTokens,
  SemanticColorTokenKey,
  SemanticColorTokens,
};
