import type { ComponentSingleStyleConfig } from '@/theme/component-style-config-types';

import type { IllustrationProps } from './Illustration.types';

export const illustrationTheme: ComponentSingleStyleConfig<Pick<IllustrationProps, 'size'>> = {
  baseStyle: {
    display: 'inline-flex',
    // These are classes to support color tokens for illustrations that are stored in the cloud.
    // The cloud SVGs have these classes and we're linking them to the relevant color tokens.
    '& .penny-illustration-border': {
      fill: 'semantic.illustration.border',
    },
    '& .penny-illustration-background': {
      fill: 'semantic.illustration.background',
    },
    '& .penny-illustration-critical': {
      fill: 'semantic.illustration.critical',
    },
    '& .penny-illustration-success': {
      fill: 'semantic.illustration.success',
    },
    '& .penny-illustration-brand-secondary': {
      fill: 'semantic.illustration.brand.secondary',
    },
    '& .penny-illustration-brand-primary': {
      fill: 'semantic.illustration.brand.primary',
    },
    '& .penny-illustration-stroke-border': {
      stroke: 'semantic.illustration.border',
    },
    '& .penny-illustration-stroke-background': {
      stroke: 'semantic.illustration.background',
    },
    '& .penny-illustration-stroke-critical': {
      stroke: 'semantic.illustration.critical',
    },
    '& .penny-illustration-stroke-success': {
      stroke: 'semantic.illustration.success',
    },
    '& .penny-illustration-stroke-brand-secondary': {
      stroke: 'semantic.illustration.brand.secondary',
    },
    '& .penny-illustration-stroke-brand-primary': {
      stroke: 'semantic.illustration.brand.primary',
    },
  },
  sizes: {
    small: {
      height: '96px',
      width: '96px',
    },
    medium: {
      height: '120px',
      width: '120px',
    },
    large: {
      height: '144px',
      width: '144px',
    },
  },
};
