import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

export const tableAmountCellTheme: ComponentMultiStyleConfig<'value' | 'additionalAmount', { hasValue: boolean }> = {
  parts: ['value', 'additionalAmount'],
  baseStyle: ({ hasValue }) => ({
    value: {
      textStyle: 'body3Semi',
      color: hasValue ? 'semantic.text.primary' : 'semantic.text.secondary',

      _disabled: {
        color: 'semantic.text.disabled',
        cursor: 'not-allowed',
      },
    },
    additionalAmount: {
      color: 'semantic.text.secondary',
      textStyle: 'body4',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      columnGap: 'xxs',

      _disabled: {
        color: 'semantic.text.disabled',
        cursor: 'not-allowed',
      },
    },
  }),
};
