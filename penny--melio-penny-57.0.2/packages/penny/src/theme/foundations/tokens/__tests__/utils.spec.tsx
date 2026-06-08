import { expect } from 'vitest';

import { replaceReferenceTokens } from '../utils';

describe('replaceReferenceTokens', () => {
  it('replaces tokens references', () => {
    const tokens = replaceReferenceTokens(
      { action: { primary: '{global.brand.700}', secondary: 'red', tertiary: '{global.not.exists}' } },
      {
        global: { brand: { 700: 'blue' } },
      }
    );
    expect(tokens).toEqual({ action: { primary: 'blue', secondary: 'red', tertiary: '{global.not.exists}' } });
  });
});
