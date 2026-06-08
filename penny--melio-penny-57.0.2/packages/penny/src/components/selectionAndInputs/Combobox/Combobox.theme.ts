import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { zIndices } from '@/theme/foundations';

export const comboboxTheme: ComponentMultiStyleConfig<
  'triggerValue' | 'triggerInput' | 'triggerLeftElement' | 'triggerRightElement' | 'emptyState' | 'mobileView',
  { isReselect?: boolean; hideValue?: boolean; showInputCaret?: boolean; isLoading?: boolean }
> = {
  parts: ['triggerValue', 'triggerInput', 'triggerLeftElement', 'triggerRightElement', 'emptyState', 'mobileView'],
  baseStyle: ({ isReselect, hideValue, showInputCaret, isLoading }) => ({
    triggerValue: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      pointerEvents: 'none',
      opacity: hideValue ? 0 : isReselect ? 0.7 : 1,
    },
    triggerInput: {
      position: 'absolute',
      inset: '-1px', // cover parent's border area
      paddingLeft: 'inherit' as never,
      paddingRight: 'inherit' as never,
      outline: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      caretColor: showInputCaret ? undefined : 'transparent',

      _disabled: { cursor: 'default' },
      _readOnly: { cursor: 'default' },
      _loading: { cursor: 'default' },
    },
    triggerLeftElement: {
      paddingLeft: 's',
      paddingRight: 'xs',
      height: '100%',
      pointerEvents: 'none',

      _disabled: { color: 'semantic.icon.disabled' },
      _readOnly: { color: 'semantic.icon.readOnly' },
    },
    triggerRightElement: {
      top: '50%',
      transform: 'translateY(-50%)',
      marginLeft: 'xs',
      marginRight: 'xs-s',
      pointerEvents: isLoading ? 'none' : 'auto',
    },
    emptyState: {
      textAlign: 'center',
      color: 'semantic.text.secondary',
      textStyle: 'body3',
      paddingX: 's',
      paddingY: 'xs-s',
    },
    mobileView: {
      position: 'fixed',
      overflow: 'auto',
      inset: 0,
      zIndex: zIndices.overlay,
      paddingX: 's',
      paddingY: 's',
      backgroundColor: 'semantic.surface.primary.rest',
    },
  }),
};
