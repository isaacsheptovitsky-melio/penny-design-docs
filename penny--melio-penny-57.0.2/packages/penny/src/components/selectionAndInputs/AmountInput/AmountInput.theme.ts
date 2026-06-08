import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

export const amountInputTheme: ComponentMultiStyleConfig<
  'field' | 'inputElement' | 'inputDisplay' | 'description',
  { inputWidthInChars: number; descriptionAlignment?: 'center' | 'start' }
> = {
  parts: ['field', 'inputElement', 'inputDisplay', 'description'],
  baseStyle: ({ inputWidthInChars, descriptionAlignment }) => ({
    field: {
      display: 'inline-flex',
      flexDirection: 'row',
      rowGap: 'none',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputElement: {
      textStyle: 'display2',
      paddingBottom: 'none',
      margin: 'none',
      border: 'global.none',
      width: `${inputWidthInChars}ch`,
      height: '1.2em',
      justifySelf: 'center',
      backgroundColor: 'transparent',

      _placeholder: {
        color: 'semantic.text.secondary',
      },
      _focus: {
        border: 'global.none',
        outline: 'none',
      },
      '&[data-view-mode="true"]': { border: 'global.none', pointerEvents: 'none' },
    },
    inputDisplay: {
      textStyle: 'display2',
      marginRight: 'xs',
    },
    description: {
      display: 'flex',
      justifyContent: descriptionAlignment === 'start' ? 'start' : 'center',
    },
  }),
};
