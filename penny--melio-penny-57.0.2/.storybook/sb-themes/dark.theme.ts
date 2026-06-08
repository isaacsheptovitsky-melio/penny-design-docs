import merge from 'lodash/merge';
import { sbBaseTheme } from './base.theme';
import { ThemeVarsPartial } from '@storybook/core/theming';

// @ts-ignore
export const sbDarkTheme: ThemeVarsPartial = merge<Partial<ThemeVarsPartial>, Partial<ThemeVarsPartial>>({}, sbBaseTheme, {
  brandImage: '/penny-logo-light.svg',
  textMutedColor: '#ccdde6',
  colorSecondary: '#b79eff',
  barTextColor: '#ccdde6',
  barHoverColor: '#c9b6ff',
  barSelectedColor: '#c9b6ff',
  buttonBg: '#46494d',
})
