import type { ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

import type { _ParagraphListProps } from './_ParagraphList.types';

export const _paragraphListTheme: ComponentMultiStyleConfig<
  'container' | 'bulletWrapper' | 'number' | 'listItem',
  Pick<_ParagraphListProps, 'size' | 'type'> & { icon?: boolean }
> = {
  parts: ['container', 'bulletWrapper', 'number', 'listItem'],
  baseStyle: ({ icon, type }) => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    bulletWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      _after: {
        content: '"•"',
        fontSize: '15px',
      },
    },
    number: {
      wordBreak: 'keep-all',
    },
    listItem: {
      listStyleType: 'none',
      display: 'flex',
      alignItems: type === 'unordered' && !icon ? 'baseline' : undefined,
    },
  }),
  sizes: {
    large: ({ icon, type }) => ({
      container: {
        gap: type === 'unordered' && !icon ? 'xxs' : 'm',
      },
      bulletWrapper: {
        height: '24px',
        width: '24px',
      },
      number: {
        textStyle: 'body2Semi',
      },
      listItem: {
        gap: icon ? 's' : 'xxs',
      },
    }),
    small: ({ icon, type }) => ({
      container: {
        gap: type === 'unordered' && !icon ? 'xxxs' : 's',
      },
      bulletWrapper: {
        height: '20px',
        width: '20px',
      },
      number: {
        textStyle: 'body3Semi',
      },
      listItem: {
        gap: icon ? 's' : 'xxs',
      },
    }),
  },
};
