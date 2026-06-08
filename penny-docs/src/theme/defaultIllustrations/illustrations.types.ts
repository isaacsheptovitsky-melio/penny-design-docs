import { type ComponentType } from 'react';

import { type ThemeIllustrationType } from './defaultIllustrations.generated.types';

export type IllustrationSizes = 'small' | 'medium' | 'large';

export type ThemeIllustrations = Record<ThemeIllustrationType, ComponentType | string>;
