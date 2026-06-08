import { expect } from 'vitest';

import { textStyles } from '../text-styles';
describe('textStyles', () => {
  it('matches the correct default text styles values', () => {
    expect(textStyles).toMatchInlineSnapshot(`
      {
        "body1": {
          "fontFamily": "primary",
          "fontSize": "20px",
          "fontWeight": 400,
          "lineHeight": "28px",
        },
        "body1Semi": {
          "fontFamily": "primary",
          "fontSize": "20px",
          "fontWeight": 600,
          "lineHeight": "28px",
        },
        "body2": {
          "fontFamily": "primary",
          "fontSize": "16px",
          "fontWeight": 400,
          "lineHeight": "24px",
        },
        "body2Semi": {
          "fontFamily": "primary",
          "fontSize": "16px",
          "fontWeight": 600,
          "lineHeight": "24px",
        },
        "body3": {
          "fontFamily": "primary",
          "fontSize": "14px",
          "fontWeight": 400,
          "lineHeight": "20px",
        },
        "body3Semi": {
          "fontFamily": "primary",
          "fontSize": "14px",
          "fontWeight": 600,
          "lineHeight": "20px",
        },
        "body4": {
          "fontFamily": "primary",
          "fontSize": "12px",
          "fontWeight": 400,
          "lineHeight": "16px",
        },
        "body4Semi": {
          "fontFamily": "primary",
          "fontSize": "12px",
          "fontWeight": 600,
          "lineHeight": "16px",
        },
        "body4SemiUpper": {
          "fontFamily": "primary",
          "fontSize": "12px",
          "fontWeight": 600,
          "letterSpacing": "0.4px",
          "lineHeight": "16px",
          "textTransform": "uppercase",
        },
        "body5SemiUpper": {
          "fontFamily": "primary",
          "fontSize": "10px",
          "fontWeight": 600,
          "letterSpacing": "0.4px",
          "lineHeight": "16px",
          "textTransform": "uppercase",
        },
        "caption1": {
          "fontFamily": "primary",
          "fontSize": "10px",
          "fontWeight": 400,
          "letterSpacing": "0.2px",
          "lineHeight": "14px",
        },
        "caption1Semi": {
          "fontFamily": "primary",
          "fontSize": "10px",
          "fontWeight": 600,
          "letterSpacing": "0.2px",
          "lineHeight": "14px",
        },
        "caption1SemiUpper": {
          "fontFamily": "primary",
          "fontSize": "10px",
          "fontWeight": 600,
          "letterSpacing": "0.2px",
          "lineHeight": "14px",
          "textTransform": "uppercase",
        },
        "caption2Semi": {
          "fontFamily": "primary",
          "fontSize": "8px",
          "fontWeight": 600,
          "letterSpacing": "0.2px",
          "lineHeight": "12px",
        },
        "display1Semi": {
          "fontFamily": "primary",
          "fontSize": {
            "s": "48px",
            "xs": "40px",
          },
          "fontWeight": 600,
          "lineHeight": {
            "s": "60px",
            "xs": "48px",
          },
        },
        "display2": {
          "fontFamily": "primary",
          "fontSize": {
            "s": "40px",
            "xs": "32px",
          },
          "fontWeight": 400,
          "lineHeight": {
            "s": "48px",
            "xs": "40px",
          },
        },
        "display2Semi": {
          "fontFamily": "primary",
          "fontSize": {
            "s": "40px",
            "xs": "32px",
          },
          "fontWeight": 600,
          "lineHeight": {
            "s": "48px",
            "xs": "40px",
          },
        },
        "heading1Semi": {
          "fontFamily": "primary",
          "fontSize": {
            "s": "32px",
            "xs": "28px",
          },
          "fontWeight": 600,
          "lineHeight": {
            "s": "40px",
            "xs": "36px",
          },
        },
        "heading2": {
          "fontFamily": "primary",
          "fontSize": "24px",
          "fontWeight": 400,
          "lineHeight": "32px",
        },
        "heading2Semi": {
          "fontFamily": "primary",
          "fontSize": "24px",
          "fontWeight": 600,
          "lineHeight": "32px",
        },
        "heading3Semi": {
          "fontFamily": "primary",
          "fontSize": "20px",
          "fontWeight": 600,
          "lineHeight": "28px",
        },
        "inline": {
          "fontFamily": "inherit",
          "fontSize": "inherit",
          "fontWeight": "inherit",
          "lineHeight": "inherit",
        },
        "metric1Semi": {
          "fontFamily": "primary",
          "fontSize": {
            "s": "32px",
            "xs": "28px",
          },
          "fontWeight": 600,
          "lineHeight": {
            "s": "40px",
            "xs": "36px",
          },
        },
        "metric2Semi": {
          "fontFamily": "primary",
          "fontSize": "24px",
          "fontWeight": 600,
          "lineHeight": "32px",
        },
      }
    `);
  });
});
