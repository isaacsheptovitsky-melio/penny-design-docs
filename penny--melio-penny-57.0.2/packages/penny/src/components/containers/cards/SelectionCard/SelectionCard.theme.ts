import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

export const selectionCardTheme: ComponentMultiStyleConfig<'leftElement' | 'actionArea'> = {
  baseStyle: {
    actionArea: {
      outline: '2px solid transparent',
      borderRadius: 'component.card.default',
      '&[data-focus-visible="true"]': {
        outlineColor: 'semantic.focus.primary',
      },
    },
    leftElement: {
      width: '24px',
      height: '24px',
      alignSelf: 'center',
    },
  },
};
