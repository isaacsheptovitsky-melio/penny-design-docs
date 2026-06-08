import { type ComponentType } from 'react';

export type ThemeLogoSize = 'small' | 'large';

export type ThemeLogoType = 'light' | 'dark';

export type ThemeLogos = Record<ThemeLogoType, ComponentType | string>;
