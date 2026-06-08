import merge from 'lodash/merge';
import { sbBaseTheme } from './base.theme';
import { ThemeVarsPartial } from '@storybook/core/theming';

// @ts-ignore
export const sbLightTheme: ThemeVarsPartial = merge<Partial<ThemeVarsPartial>, Partial<ThemeVarsPartial>>({}, sbBaseTheme, {
  base: 'light',
})
