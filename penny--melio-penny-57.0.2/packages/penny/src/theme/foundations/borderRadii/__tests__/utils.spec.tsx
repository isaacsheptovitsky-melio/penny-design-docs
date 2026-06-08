import { expect } from 'vitest';

// eslint-disable-next-line no-restricted-imports
import { getThemeRadiiFromTokens } from '../utils';

// Mock the defaultDesignTokens object

vi.mock('../../tokens/defaultDesignTokens', () => ({
  defaultDesignTokens: {
    borderRadii: {
      global: { 200: '200px', 300: '300px' },
      semantic: {
        action: { default: '{global.200}' },
        input: { default: '{global.300}' },
      },
      component: {
        pill: { default: '{semantic.action.default}' },
      },
    },
  },
}));

describe('transform tokens to border radii', () => {
  it('default border radii when no custom border radii', () => {
    const borderRadii = getThemeRadiiFromTokens();
    expect(borderRadii).toEqual({
      global: { 200: '200px', 300: '300px' },
      semantic: {
        action: { default: '200px' },
        input: { default: '300px' },
      },
      component: {
        pill: { default: '200px' },
      },
    });
  });

  it('customized border radii when has custom global border radii', () => {
    const borderRadii = getThemeRadiiFromTokens({ global: { 200: '9999px' } });
    expect(borderRadii).toEqual({
      global: { 200: '9999px', 300: '300px' },
      semantic: {
        action: { default: '9999px' },
        input: { default: '300px' },
      },
      component: {
        pill: { default: '9999px' },
      },
    });
  });

  it('customized border radii when has custom semantic border radii', () => {
    const borderRadii = getThemeRadiiFromTokens({ semantic: { action: { default: '{global.300}' } } });
    expect(borderRadii).toEqual({
      global: { 200: '200px', 300: '300px' },
      semantic: {
        action: { default: '300px' },
        input: { default: '300px' },
      },
      component: {
        pill: { default: '300px' },
      },
    });
  });

  it('customized border radii when has custom semantic border radius not in tokens list', () => {
    const borderRadii = getThemeRadiiFromTokens({ semantic: { action: { default: 'red' } } });
    expect(borderRadii).toEqual({
      global: { 200: '200px', 300: '300px' },
      semantic: {
        action: { default: 'red' },
        input: { default: '300px' },
      },
      component: {
        pill: { default: 'red' },
      },
    });
  });

  it('customized border radii when has custom component border radius token', () => {
    const borderRadii = getThemeRadiiFromTokens({ component: { pill: { default: 'bird' } } });
    expect(borderRadii).toEqual({
      global: { 200: '200px', 300: '300px' },
      semantic: {
        action: { default: '200px' },
        input: { default: '300px' },
      },
      component: {
        pill: { default: 'bird' },
      },
    });
  });
});
