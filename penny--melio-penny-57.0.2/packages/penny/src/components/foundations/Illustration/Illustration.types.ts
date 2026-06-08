import type { TestIdProp } from '@melio/penny-utils';

import type { IllustrationSizes, ThemeIllustrationType } from '@/theme/defaultIllustrations';

export type IllustrationProps = {
  size?: IllustrationSizes;
  type: ThemeIllustrationType;
} & TestIdProp;
