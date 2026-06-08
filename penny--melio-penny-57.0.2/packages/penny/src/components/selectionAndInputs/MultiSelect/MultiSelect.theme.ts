import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { input } from '@/theme/utils/form.utils';

export const multiSelectTheme: ComponentMultiStyleConfig<
  'trigger' | 'triggerValue' | 'triggerInput' | 'triggerRightElement' | 'emptyState',
  { hasCustomValue?: boolean; rightElementWidth?: number }
> = {
  parts: ['trigger', 'triggerValue', 'triggerInput', 'triggerRightElement', 'emptyState'],
  baseStyle: ({ hasCustomValue, rightElementWidth }) => ({
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
      paddingRight: `${rightElementWidth}px` as never,
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
    emptyState: {
      textAlign: 'center',
      color: 'semantic.text.secondary',
      textStyle: 'body3',
      paddingX: 's',
      paddingY: 'xs-s',
    },
  }),
};
