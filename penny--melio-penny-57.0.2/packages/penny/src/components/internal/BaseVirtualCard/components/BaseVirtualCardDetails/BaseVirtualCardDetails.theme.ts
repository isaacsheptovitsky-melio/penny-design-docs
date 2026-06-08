import { type ComponentMultiStyleConfig } from '../../../../../theme/component-style-config-types';
import { type BaseVirtualCardDetailsProps } from './BaseVirtualCardDetails.types';

export const baseVirtualCardDetailsTheme: ComponentMultiStyleConfig<
  'copyButton' | 'label' | 'mainLabel',
  Pick<BaseVirtualCardDetailsProps, 'variant' | 'enableCopy'>
> = {
  parts: ['copyButton', 'label', 'mainLabel'],
  baseStyle: ({ enableCopy }) => ({
    label: {
      display: 'inline-flex',
      width: 'max-content',
      textStyle: 'body4Semi',
    },
    mainLabel: {
      width: 'max-content',
      display: 'inline-flex',
      alignItems: 'center',
      textStyle: 'body2',
      cursor: enableCopy ? 'pointer' : 'default',
      gap: 'xxs',
    },
    copyButton: {
      display: 'inline-flex',
      alignItems: 'center',
      opacity: 0,
      visibility: 'hidden',
      transition: 'opacity 0.2s ease-in-out',

      _hover: {
        visibility: 'visible',
        opacity: 1,
      },
    },
  }),
  variants: {
    default: {
      label: {
        color: 'semantic.text.secondary',
      },
      mainLabel: {
        color: 'semantic.text.primary',
      },
      copyButton: {
        color: 'semantic.icon.primary',
      },
    },
    inverse: {
      label: {
        color: 'semantic.text.inverse',
      },
      mainLabel: {
        color: 'semantic.text.inverse',
      },
      copyButton: {
        color: 'semantic.icon.inverse',
      },
    },
  },
};
