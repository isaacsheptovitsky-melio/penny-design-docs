import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { type ThemeSpaceKey, themeSpaces } from '@/theme/foundations';
import { input } from '@/theme/utils/form.utils';

export const selectNewTheme: ComponentMultiStyleConfig<
  'trigger' | 'triggerValue' | 'triggerInput' | 'triggerRightElement' | 'clearButton' | 'emptyState',
  { hasCustomValue?: boolean; showClearButton?: boolean; rightElementWidth?: number; clearButtonWidth?: number }
> = {
  parts: ['trigger', 'triggerValue', 'triggerInput', 'triggerRightElement', 'clearButton', 'emptyState'],
  baseStyle: ({ hasCustomValue, showClearButton, rightElementWidth, clearButtonWidth }) => ({
    trigger: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      // Reuse input styles.
      ...input.field,
      ...(hasCustomValue && {
        '&.small': { minHeight: '40px' },
        '&.large': { minHeight: '48px' },
      }),
      paddingRight: (showClearButton
        ? `calc(${clearButtonWidth}px + ${themeSpaces.xxl})`
        : `${rightElementWidth}px`) as ThemeSpaceKey,
    },
    triggerValue: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      minWidth: 0,
    },
    triggerInput: {
      position: 'absolute',
      inset: '-1px', // cover parent's border area
      outline: 0,
    },
    triggerRightElement: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      pointerEvents: 'none',
      paddingRight: 's',
      paddingLeft: 'xs',
      color: 'semantic.text.primary',
      _disabled: { color: 'semantic.text.disabled' },
    },
    clearButton: {
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      marginRight: '36px' as never,
      marginLeft: 'xs',
    },
    emptyState: {
      textAlign: 'center',
      color: 'semantic.text.secondary',
      textStyle: 'body3',
      paddingX: 's',
      paddingY: 'xs-s',
    },
  }),
};
