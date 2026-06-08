import { ThemeVarsPartial } from '@storybook/core/theming';

// @ts-ignore
export const sbBaseTheme: ThemeVarsPartial = {
  brandTitle: 'Melio',
  brandUrl: 'https://melio.com',
  brandImage: '/penny-logo.svg',
  colorSecondary: '#9470ff',
  barHoverColor: '#9470ff',
  barSelectedColor: '#9470ff',
  buttonBg: '#e8f1f7',
  // We use Poppins for the docs otherwise the default Nunito-sans is used
  // and loaded prior to the Penny fonts from the CDN
  fontBase: '"Poppins", sans-serif',
};
