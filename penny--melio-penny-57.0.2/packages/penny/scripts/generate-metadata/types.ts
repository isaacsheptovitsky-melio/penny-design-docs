/**
 * Types for the component metadata generation system
 */

export type PropTypeMetadata = {
  name: string;
  options?: string[];
};

export type PropMetadata = {
  name: string;
  description: string;
  type: PropTypeMetadata;
  defaultValue?: string;
  required: boolean;
};

export type ComponentMetadata = {
  name: string;
  description: string;
  displayName: string;
  props: PropMetadata[];
  category?: string;
  subCategory?: string;
  exportPath: string;
};

export type ThemeTokenType =
  | 'colors'
  | 'borders'
  | 'breakpoints'
  | 'radii'
  | 'fonts'
  | 'fontWeights'
  | 'textStyles'
  | 'space'
  | 'shadows'
  | 'zIndices';

export type DesignTokenType =
  | 'color'
  | 'border'
  | 'borderRadius'
  | 'breakpoints'
  | 'fontFamily'
  | 'fontWeight'
  | 'fontSize'
  | 'textStyle'
  | 'spacing'
  | 'shadow'
  | 'zIndex';

export type DesignTokenMetadata = {
  name: string;
  value: string | object;
  type: DesignTokenType;
  level?: 'global' | 'semantic' | 'component';
};

export type MetadataOutput = {
  components: ComponentMetadata[];
  designTokens: DesignTokenMetadata[];
};

export type ExportInfo = {
  name: string;
  filePath: string;
  exportPath: string;
};
