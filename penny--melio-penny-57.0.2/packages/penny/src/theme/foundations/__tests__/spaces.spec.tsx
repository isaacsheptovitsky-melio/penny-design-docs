import { expect } from 'vitest';

import { themeSpaces } from '../spaces';

describe('Spaces', () => {
  it('matches the correct default color palette values', () => {
    expect(themeSpaces).toMatchInlineSnapshot(`
      {
        "l": "32px",
        "m": "24px",
        "none": "0",
        "s": "16px",
        "s-m": "20px",
        "xl": "40px",
        "xs": "8px",
        "xs-s": "12px",
        "xxl": "48px",
        "xxs": "4px",
        "xxxl": "72px",
        "xxxs": "2px",
      }
    `);
  });
});
