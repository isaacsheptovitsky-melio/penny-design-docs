import { type ComponentType, type SVGAttributes } from 'react';

import { type ThemeColors } from '../foundations/colors/types';
import { type FlagKey } from './assets/flags/flags.generated.types';
import { type IconKey } from './icons.generated.types';

export type AllIconKey = IconKey | FlagKey;

export type ThemeIcons = Record<IconKey, ThemeIconBySizes | IconType>;

export type ThemeIconBySizes = {
  small: IconType;
  medium: IconType;
};

export type IconTypeProps = SVGAttributes<SVGElement> & {
  size?: string | number;
};

export type IconType = ComponentType<IconTypeProps> | string;

export type IconsMap = ThemeIcons & Record<Exclude<AllIconKey, IconKey>, IconType>;

export const iconSizes = ['extra-small', 'small', 'small-medium', 'medium', 'large', 'extra-large'] as const;

export type IconSize = (typeof iconSizes)[number];

export const iconSizeMapping: Record<IconSize, string> = {
  'extra-small': '12px',
  small: '16px',
  'small-medium': '20px',
  medium: '24px',
  large: '32px',
  'extra-large': '40px',
};

export type BaseIconColorKey = Join<PathsToStringProps<ThemeColors & { inherit: 'inherit' }>, '.'>;

export type { IconKey };
