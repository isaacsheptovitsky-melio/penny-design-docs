import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';
import { type InternalCSSObject } from '@/theme/types';

export const securedTextFieldTheme: ComponentMultiStyleConfig<
  'container' | 'inputRightIcon',
  { textVisible: boolean }
> = {
  parts: ['container', 'inputRightIcon'],
  baseStyle: ({ textVisible }) => ({
    container: {
      // While this is a non-standard CSS property, it is supported by all major browsers, and is the only way to not show the password in the input field and also to not prompt the user to save the password.
      // https://caniuse.com/mdn-css_properties_-webkit-text-security
      WebkitTextSecurity: textVisible ? 'none' : 'disc',
    } as InternalCSSObject,
    inputRightIcon: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      marginRight: 'xs-s',
    },
  }),
};
