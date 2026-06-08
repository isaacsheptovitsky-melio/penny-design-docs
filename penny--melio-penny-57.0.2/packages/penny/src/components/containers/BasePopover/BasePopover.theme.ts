import type { Strategy } from '@floating-ui/react';

import type { FadeProps } from '@/components/foundations/transitions/Fade';
import type { ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { zIndices } from '@/theme/foundations/z-indices';

export const basePopoverTheme: ComponentMultiStyleConfig<
  'trigger' | 'content' | 'container' | 'close' | 'header' | 'body' | 'footer' | 'arrow',
  { position?: Strategy; top?: number | null; left?: number | null }
> = {
  parts: ['trigger', 'content', 'container', 'close', 'header', 'body', 'footer', 'arrow'],
  baseStyle: ({ position, top, left }) => ({
    trigger: {
      outlineColor: 'transparent',

      _focusVisible: {
        outlineColor: 'semantic.focus.primary',
        transition: 'outline-color 0.2s',
        outlineOffset: '2px',
      },
    },
    content: {
      position,
      top: `${top ?? 0}px`,
      left: `${left ?? 0}px`,
      border: 'global.25',
      borderColor: 'global.neutral.A0',
    },
    container: {
      backgroundColor: 'semantic.surface.inverse',
      color: 'semantic.text.inverse',
      border: 'global.none',
      borderRadius: 'global.200',
      textStyle: 'body4',
      width: 'max-content',
      maxWidth: '296px',
      textAlign: 'start',
      zIndex: 'popover',
      boxShadow: 0,
      paddingX: 's',
      paddingY: 's',
      _focus: {
        boxShadow: 0,
      },
    },
    close: {
      position: 'absolute',
      right: 'xxs',
      top: 'xxs',
    },
    header: {
      display: 'flex',
      alignItems: 'flex-start',
      paddingX: 'none',
      paddingY: 'none',
      marginRight: 'm',
      marginBottom: 'xxs',
      border: 'global.none',
    },
    body: {
      paddingX: 'none',
      paddingY: 'none',
      marginRight: 'm',
      wordBreak: 'break-word',
    },
    footer: {
      paddingX: 'none',
      paddingY: 'none',
      marginTop: 's',
      border: 'global.none',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    arrow: {
      fill: 'semantic.icon.primary',
      height: '22px',
      width: '22px',
    },
  }),
};

export const fadeStyle: FadeProps['style'] = { position: 'absolute', zIndex: zIndices.popover };
