import { expect } from 'vitest';

import { type ThemeDesignTokens } from '../../tokens/types';
import { getThemeColorsFromTokens } from '../utils';

describe('transform tokens to colors', () => {
  const defaultColorTokens = {
    global: { neutral: { 100: 'white' }, brand: { 700: 'purple' } },
    semantic: {
      action: { primary: { rest: '{global.brand.700}' } },
      text: { inverse: '{global.neutral.100}' },
    },
    component: {
      button: {
        textPrimary: {
          rest: { label: '{semantic.text.inverse}' },
          pressed: { label: '{semantic.action.primary.rest}' },
        },
      },
    },
  };

  it('default colors when no custom colors', () => {
    const colors = getThemeColorsFromTokens(defaultColorTokens as ThemeDesignTokens['colors'], {});
    expect(colors).toEqual({
      global: { neutral: { 100: 'white' }, brand: { 700: 'purple' } },
      semantic: { action: { primary: { rest: 'purple' } }, text: { inverse: 'white' } },
      component: {
        button: { textPrimary: { rest: { label: 'white' }, pressed: { label: 'purple' } } },
      },
    });
  });

  it('customized colors when has custom global colors', () => {
    const colors = getThemeColorsFromTokens(defaultColorTokens as ThemeDesignTokens['colors'], {
      global: { brand: { 700: 'red' } },
    });
    expect(colors).toEqual({
      global: { neutral: { 100: 'white' }, brand: { 700: 'red' } },
      semantic: { action: { primary: { rest: 'red' } }, text: { inverse: 'white' } },
      component: {
        button: { textPrimary: { rest: { label: 'white' }, pressed: { label: 'red' } } },
      },
    });
  });

  it('customized colors when has custom semantic colors', () => {
    const colors = getThemeColorsFromTokens(defaultColorTokens as ThemeDesignTokens['colors'], {
      semantic: { action: { primary: { rest: '{global.neutral.100}' } } },
    });
    expect(colors).toEqual({
      global: { neutral: { 100: 'white' }, brand: { 700: 'purple' } },
      semantic: { action: { primary: { rest: 'white' } }, text: { inverse: 'white' } },
      component: {
        button: { textPrimary: { rest: { label: 'white' }, pressed: { label: 'white' } } },
      },
    });
  });

  it('customized colors when has custom semantic color not in tokens list', () => {
    const colors = getThemeColorsFromTokens(defaultColorTokens as ThemeDesignTokens['colors'], {
      semantic: { action: { primary: { rest: 'red' } } },
    });
    expect(colors).toEqual({
      global: { neutral: { 100: 'white' }, brand: { 700: 'purple' } },
      semantic: { action: { primary: { rest: 'red' } }, text: { inverse: 'white' } },
      component: {
        button: { textPrimary: { rest: { label: 'white' }, pressed: { label: 'red' } } },
      },
    });
  });

  it('customized colors when has custom component color token', () => {
    const colors = getThemeColorsFromTokens(defaultColorTokens as ThemeDesignTokens['colors'], {
      component: { button: { textPrimary: { rest: { label: 'green' } } } },
    });
    expect(colors).toEqual({
      global: { neutral: { 100: 'white' }, brand: { 700: 'purple' } },
      semantic: { action: { primary: { rest: 'purple' } }, text: { inverse: 'white' } },
      component: {
        button: { textPrimary: { rest: { label: 'green' }, pressed: { label: 'purple' } } },
      },
    });
  });
});
