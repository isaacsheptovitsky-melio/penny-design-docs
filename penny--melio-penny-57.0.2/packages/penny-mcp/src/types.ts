export interface ComponentPropMeta {
  name: string;
  description: string;
  type: string;
  required: boolean;
  default?: unknown;
  options?: string[];
}

export interface ComponentMetaSummary {
  name: string;
  description: string;
  category: string;
}

export interface ComponentMeta extends ComponentMetaSummary {
  displayName: string;
  props: ComponentPropMeta[];
  exportPath: string;
}

export interface DesignTokenMeta {
  name: string;
  value: string | object;
  type:
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
  level?: 'global' | 'semantic' | 'component';
}

export interface PennyMetadata {
  components: ComponentMeta[];
  designTokens?: DesignTokenMeta[];
}
