import { type Strategy } from '@floating-ui/react';

import type { FadeProps } from '@/components/foundations/transitions/Fade';
import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { zIndices } from '@/theme/foundations/z-indices';

export const tooltipTheme: ComponentMultiStyleConfig<
  'trigger' | 'content',
  { position?: Strategy; top?: number | null; left?: number | null }
> = {
  parts: ['trigger', 'content'],
  baseStyle: ({ position, top, left }) => ({
    trigger: {
      display: 'inline-flex',
      maxWidth: '100%',

      _focusVisible: {
        outlineColor: 'semantic.focus.primary',
        outlineOffset: '2px',
      },
    },
    content: {
      position,
      top: `${top ?? 0}px`,
      left: `${left ?? 0}px`,
      backgroundColor: 'semantic.fill.inverse',
      color: 'semantic.text.inverse',
      border: 'global.25',
      borderColor: 'global.neutral.A0',
      borderRadius: 'global.200',
      paddingX: 's',
      paddingY: 'xs',
      textStyle: 'body4',
      width: 'max-content',
      maxWidth: '296px',
      textAlign: 'start',
      zIndex: 'tooltip',
      boxShadow: 0,
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',

      _focus: {
        boxShadow: 0,
      },
    },
  }),
};

export const fadeStyle: FadeProps['style'] = { position: 'absolute', zIndex: zIndices.tooltip };
