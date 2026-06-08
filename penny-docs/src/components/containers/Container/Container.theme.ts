import { type ComponentSingleStyleConfig } from '@/theme/component-style-config-types';
import { type HeightProp, heightsMapping, type WidthProp, widthsMapping } from '@/theme/utils/utils';

import { BackgroundStyle, BorderStyle } from './Container.theme.utils';
import { type BackgroundColorOptions, type BorderOptions, type ContainerProps } from './Container.types';

export const containerTheme: ComponentSingleStyleConfig<ContainerProps> = {
  baseStyle: ({
    paddingX,
    paddingY,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    border,
    backgroundColor,
    width,
    height,
    isSticky,
    alignItems,
    justifyContent,
    textAlign,
    overflow,
    position,
    maxWidth,
    top,
    bottom,
    left,
    right,
  }) => ({
    paddingX,
    paddingY,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    alignItems,
    justifyContent,
    textAlign,
    ...BorderStyle[border as BorderOptions],
    backgroundColor: BackgroundStyle[backgroundColor as BackgroundColorOptions],
    width: widthsMapping[width as WidthProp],
    height: heightsMapping[height as HeightProp],
    overflow,
    display: justifyContent || alignItems ? 'flex' : 'block',
    maxWidth,
    position,
    top,
    bottom,
    left,
    right,
    ...(isSticky && {
      position: 'sticky',
      top: 0,
    }),
  }),
};
