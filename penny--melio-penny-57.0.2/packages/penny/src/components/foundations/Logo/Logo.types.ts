import type { TestIdProp } from '@melio/penny-utils';

import type { ThemeLogoSize, ThemeLogoType } from '@/theme/foundations/logos';

export type LogoProps = {
  size?: ThemeLogoSize;
  type: ThemeLogoType;
} & TestIdProp;
