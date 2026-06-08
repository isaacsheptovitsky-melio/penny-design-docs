import type { ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

export const _labelTheme: ComponentMultiStyleConfig<
  'container' | 'description' | 'iconIndicator' | 'label',
  { labelShouldSupportEllipsis?: boolean; descriptionShouldSupportEllipsis?: boolean }
> = {
  parts: ['container', 'description', 'iconIndicator', 'label'],
  baseStyle: ({ labelShouldSupportEllipsis, descriptionShouldSupportEllipsis }) => ({
    container: {
      maxWidth: '100%',
      display: 'flex',
    },
    label: {
      textStyle: 'body4Semi',
      color: 'semantic.text.secondary',
      _invalid: {
        color: 'semantic.text.critical.rest',
      },
      '&[data-view-mode="true"]': {
        pointerEvents: 'none',
      },
      _disabled: {
        color: 'semantic.text.disabled',
      },
      ...(labelShouldSupportEllipsis && {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }),
    },
    description: {
      marginStart: 'xxs',
      textStyle: 'body4',
      color: 'semantic.text.secondary',
      ...(descriptionShouldSupportEllipsis && {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }),

      _invalid: {
        color: 'semantic.text.critical.rest',
      },
      _disabled: {
        color: 'semantic.text.disabled',
      },
    },
    iconIndicator: {
      display: 'inline-flex',
      color: 'semantic.text.secondary',

      _disabled: {
        color: 'semantic.text.disabled',
      },
    },
  }),
};
