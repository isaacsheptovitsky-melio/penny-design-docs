import { type AriaAttributes, type ComponentType } from 'react';

import { type ThemeColorKey } from './colors/types';

export type ThemeLoaderProps = { color: ThemeColorKey } & AriaAttributes;

export type ThemeLoader = ComponentType<ThemeLoaderProps>;
