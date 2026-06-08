import { expect } from 'vitest';

import { getThemeBordersFromTokens } from '../utils';

// Mock the defaultDesignTokens object

vi.mock('../../tokens/defaultDesignTokens', () => ({
  defaultDesignTokens: {
    borders: {
      global: { none: '0px solid', 25: '1px solid', 50: '2px solid' },
      semantic: {
        action: { default: '{global.25}' },
        input: { default: '{global.25}' },
      },
      component: {
        button: { primary: { rest: '{semantic.action.default}' } },
        iconButton: { brand: { rest: '{global.none}' } },
      },
    },
  },
}));

describe('transform tokens to borders', () => {
  it('default borders when no custom borders', () => {
    const borders = getThemeBordersFromTokens();
    expect(borders).toEqual({
      global: { none: '0px solid', 25: '1px solid', 50: '2px solid' },
      semantic: {
        action: { default: '1px solid' },
        input: { default: '1px solid' },
      },
      component: {
        button: { primary: { rest: '1px solid' } },
        iconButton: { brand: { rest: '0px solid' } },
      },
    });
  });

  it('customized borders when has custom global borders', () => {
    const borders = getThemeBordersFromTokens({ global: { 25: '100px solid' } });
    expect(borders).toEqual({
      global: { none: '0px solid', 25: '100px solid', 50: '2px solid' },
      semantic: {
        action: { default: '100px solid' },
        input: { default: '100px solid' },
      },
      component: {
        button: { primary: { rest: '100px solid' } },
        iconButton: { brand: { rest: '0px solid' } },
      },
    });
  });

  it('customized borders when has custom semantic borders', () => {
    const borders = getThemeBordersFromTokens({ semantic: { action: { default: '{global.none}' } } });
    expect(borders).toEqual({
      global: { none: '0px solid', 25: '1px solid', 50: '2px solid' },
      semantic: {
        action: { default: '0px solid' },
        input: { default: '1px solid' },
      },
      component: {
        button: { primary: { rest: '0px solid' } },
        iconButton: { brand: { rest: '0px solid' } },
      },
    });
  });

  it('customized borders when has custom semantic border not in tokens list', () => {
    const borders = getThemeBordersFromTokens({ semantic: { action: { default: '1px dashed' } } });
    expect(borders).toEqual({
      global: { none: '0px solid', 25: '1px solid', 50: '2px solid' },
      semantic: {
        action: { default: '1px dashed' },
        input: { default: '1px solid' },
      },
      component: {
        button: { primary: { rest: '1px dashed' } },
        iconButton: { brand: { rest: '0px solid' } },
      },
    });
  });

  it('customized border radii when has custom component border radius token', () => {
    const borders = getThemeBordersFromTokens({ component: { button: { primary: { rest: 'bird' } } } });
    expect(borders).toEqual({
      global: { none: '0px solid', 25: '1px solid', 50: '2px solid' },
      semantic: {
        action: { default: '1px solid' },
        input: { default: '1px solid' },
      },
      component: {
        button: { primary: { rest: 'bird' } },
        iconButton: { brand: { rest: '0px solid' } },
      },
    });
  });
});
