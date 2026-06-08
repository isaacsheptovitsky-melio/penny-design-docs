import { type ComponentSingleStyleConfig } from '@/theme/component-style-config-types';

import { type PromotionalModalProps } from './PromotionalModal.types';

const getAssetAspectRatio = (assetAspectRatio: PromotionalModalProps['assetAspectRatio']) => {
  switch (assetAspectRatio) {
    case '1 / 1':
      return '1 / 1';
    case '16 / 9':
      return '16 / 9';
    case '4 / 3':
      return '4 / 3';
    default:
      return '7 / 3';
  }
};

export const promotionalModalTheme: ComponentSingleStyleConfig<{
  assetAspectRatio?: PromotionalModalProps['assetAspectRatio'];
}> = {
  baseStyle: ({ assetAspectRatio }) => ({
    borderTopRadius: 'global.200',
    display: 'block',
    justifyContent: 'center',
    width: '100%',
    height: 'fit-content',
    maxHeight: '560px',
    aspectRatio: getAssetAspectRatio(assetAspectRatio),
    marginBottom: 's',
    '> *': {
      aspectRatio: 'inherit',
    },
  }),
};
