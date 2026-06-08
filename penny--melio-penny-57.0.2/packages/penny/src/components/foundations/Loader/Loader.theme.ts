import type { ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import type { ThemeColorKey } from '@/theme/foundations/colors/types';
import { type InternalCSSObject } from '@/theme/types';

const getSharedStyles = (color: ThemeColorKey) =>
  ({
    position: 'absolute',
    left: '8px',
    width: '8px',
    height: '8px',
    borderRadius: 'global.full',
    backgroundColor: color,
    border: 'global.25',
    borderColor: 'global.neutral.A0',
  }) as InternalCSSObject;

export const loaderTheme: ComponentMultiStyleConfig<
  'container' | 'dots' | 'first' | 'second' | 'third' | 'forth',
  { color: ThemeColorKey }
> = {
  parts: ['container', 'dots', 'first', 'second', 'third', 'forth'],
  baseStyle: ({ color }) => ({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '16px',
      overflow: 'hidden',
    },
    dots: {
      position: 'relative',
      width: '56px',
      height: '8px',
    },
    first: getSharedStyles(color),
    second: getSharedStyles(color),
    third: { ...getSharedStyles(color), left: '24px' },
    forth: { ...getSharedStyles(color), left: '40px' },
  }),
};
