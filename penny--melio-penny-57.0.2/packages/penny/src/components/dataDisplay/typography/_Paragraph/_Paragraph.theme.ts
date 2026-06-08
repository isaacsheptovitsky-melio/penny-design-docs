import type { ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

import type { _ParagraphProps } from './_Paragraph.types';

export const _paragraphTheme: ComponentMultiStyleConfig<
  'container' | 'title' | 'content',
  Pick<_ParagraphProps, 'size'>
> = {
  parts: ['container', 'title', 'content'],
  baseStyle: () => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'xxs',
      width: '100%',
    },
    title: {},
    content: {},
  }),
  sizes: {
    large: {
      title: {
        textStyle: 'body2Semi',
      },
      content: {
        textStyle: 'body2',
      },
    },
    small: {
      title: {
        textStyle: 'body3Semi',
      },
      content: {
        textStyle: 'body3',
      },
    },
  },
};
