import { type ComponentMultiStyleConfig } from '../../../theme/component-style-config-types';
import { type ThemeColors } from '../../../theme/foundations/colors/types';
import { type BaseVirtualCardProps } from './BaseVirtualCard.types';

export const baseVirtualCardTheme: ComponentMultiStyleConfig<
  'container' | 'content' | 'image',
  Pick<BaseVirtualCardProps, 'variant' | 'backgroundImageSrc'>
> = {
  parts: ['container', 'content', 'image'],
  baseStyle: ({ backgroundImageSrc }) => ({
    container: {
      position: 'relative',
      aspectRatio: '43 / 26',
      width: '100%',
      height: 'auto',
      maxHeight: '208px',
      maxWidth: '344px',
      borderRadius: 'global.400',
      padding: 'm',
      border: 'global.25',
      borderColor: 'semantic.border.static',
      boxShadow: 500,
    },
    image: {
      position: 'absolute',
      overflow: 'hidden',
      borderRadius: 'global.400',
      inset: '0',
      margin: 'auto',
      width: '100%',
      height: 'auto',
      backgroundImage: backgroundImageSrc && `url(${backgroundImageSrc})`,
      backgroundSize: 'cover',
    },
    content: {
      position: 'relative',
      zIndex: 1,
    },
  }),
  variants: {
    white: {
      container: {
        background: 'linear-gradient(228deg, #F1F1F1 21.35%, #FFF 65.63%)',
      },
    },
    black: {
      container: {
        background: 'radial-gradient(188.74% 149.84% at 107.56% -4.33%, #666A79 0%, #313238 100%)',
      },
    },
    brand: ({ theme }) => {
      const globalPalette = theme.colors['global'] as ThemeColors['global'];

      return {
        container: {
          background: `radial-gradient(300.07% 141.42% at 100.00% -0.00%, ${globalPalette?.brand?.['700']} 0%, ${globalPalette?.brand?.['900']} 100%)`,
        },
      };
    },
  },
};
