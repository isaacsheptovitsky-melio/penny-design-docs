import { expect } from 'vitest';

import { shadows } from '../shadows';

describe('Shadows', () => {
  it('matches the correct shadows values', () => {
    expect(shadows).toMatchInlineSnapshot(`
      {
        "0": "none",
        "200": "1px 0px 0px #D8D8D8",
        "300": "0px -5px 15px rgba(33, 33, 36, 0.05)",
        "400": "0px 5px 10px rgba(33, 33, 36, 0.1)",
        "500": "0px 5px 15px rgba(33, 33, 36, 0.1)",
        "600": "0px 5px 15px rgba(33, 33, 36, 0.2)",
      }
    `);
  });
});
