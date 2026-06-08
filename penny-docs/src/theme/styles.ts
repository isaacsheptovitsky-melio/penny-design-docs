/**
 * Copied css reset from ChakraUI
 * https://github.com/chakra-ui/chakra-ui/blob/main/packages/css-reset/src/css-reset.tsx
 */

export const styles = {
  global: {
    // Compensates for the parent `ul`'s `paddingInlineStart` since it's not inside melio-wrapper.
    '#chakra-toast-manager-top': {
      padding: 0,
    },
    'melio-wrapper > div': {
      isolation: 'isolate',
      display: 'block',
      fontFamily: 'primary',
      color: 'semantic.text.primary',
      bg: 'semantic.surface.primary.rest',

      // `html` tag reset
      lineHeight: '1.5',
      webkitTextSizeAdjust: '100%',
      webkitFontSmoothing: 'antialiased',
      textRendering: 'optimizeLegibility',
      mozOsxFontSmoothing: 'grayscale',
      touchAction: 'manipulation',

      // `body` tag reset
      height: '100%',
      minHeight: '100%',
      fontFeatureSettings: 'kern',

      // Nested
      '*, *::before, *::after': {
        borderWidth: '0',
        borderStyle: 'solid',
        boxSizing: 'border-box',
      },
      main: {
        display: 'block',
      },
      '.emphasize': {
        color: 'global.neutral.900',
        fontStyle: 'inherit',
      },
      hr: {
        borderTopWidth: '1px',
        boxSizing: 'content-box',
        height: '0',
        overflow: 'visible',
      },
      a: {
        backgroundColor: 'transparent',
        color: 'inherit',
        textDecoration: 'inherit',
      },
      'abbr[title]': {
        borderBottom: 'none',
        textDecoration: 'underline dotted',
        webkitTextDecoration: 'underline dotted',
        fallbacks: [
          {
            textDecoration: 'underline',
          },
        ],
      },
      'b, strong': {
        fontWeight: 700,
      },
      mark: {
        backgroundColor: 'transparent',
        color: 'inherit',
        fontWeight: 700,
        '@media (forced-colors: active)': {
          color: 'CanvasText',
        },
      },
      small: {
        fontSize: '80%',
      },
      'sub, sup': {
        fontSize: '75%',
        lineHeight: '0',
        position: 'relative',
        verticalAlign: 'baseline',
      },
      sub: {
        bottom: '-0.25em',
      },
      sup: {
        top: '-0.5em',
      },
      img: {
        borderStyle: 'none',
        maxWidth: '100%',
        height: 'auto',
      },
      'button, input, optgroup, select, textarea': {
        fontFamily: 'inherit',
        fontSize: '100%',
        lineHeight: 'inherit',
        margin: '0',
        padding: '0',
        fallbacks: [
          {
            lineHeight: '1.15',
          },
        ],
        color: 'inherit',
      },
      'button, input': {
        overflow: 'visible',
      },
      'button, select': {
        textTransform: 'none',
      },
      'button::-moz-focus-inner, [type="button"]::-moz-focus-inner, [type="reset"]::-moz-focus-inner, [type="submit"]::-moz-focus-inner':
        {
          borderStyle: 'none',
          padding: '0',
        },
      fieldset: {
        padding: '0',
        margin: '0',
        fallbacks: [
          {
            padding: '0.35em 0.75em 0.625em',
          },
        ],
      },
      legend: {
        boxSizing: 'border-box',
        color: 'inherit',
        display: 'table',
        maxWidth: '100%',
        padding: '0',
        whiteSpace: 'normal',
      },
      progress: {
        verticalAlign: 'baseline',
      },
      textarea: {
        overflow: 'auto',
        resize: 'vertical',
      },
      '[type="checkbox"], [type="radio"]': {
        boxSizing: 'border-box',
        padding: '0',
      },
      '[type="number"]': {
        '::-webkit-inner-spin-button, ::-webkit-outer-spin-button': {
          appearance: 'none !important',
        },
      },
      'input[type="text"]': {
        outline: 'none',
      },
      'input[type="text"]:disabled': {
        backgroundColor: 'semantic.primary.disabled',
      },
      'input[type="number"]': {
        mozAppearance: 'textfield',
      },
      '[type="search"]': {
        appearance: 'textfield',
        outlineOffset: '-2px',
      },
      '[type="search"]::-webkit-search-decoration': {
        appearance: 'none !important',
      },
      '::-webkit-file-upload-button': {
        appearance: 'button',
        font: 'inherit',
      },
      'input[type="date"]::-webkit-inner-spin-button, input[type="date"]::-webkit-calendar-picker-indicator': {
        display: 'none',
        appearance: 'none',
      },
      details: {
        display: 'block',
      },
      summary: {
        display: 'list-item',
      },
      template: {
        display: 'none',
      },
      '[hidden]': {
        display: 'none !important',
      },
      'body, blockquote, dl, dd, h1, h2, h3, h4, h5, h6, hr, figure, p, pre': {
        margin: '0',
      },
      button: {
        background: 'transparent',
        padding: '0',
        textAlign: 'initial',
      },
      'ol, ul': {
        margin: '0',
        padding: '0',
      },
      'button, [role="button"]': {
        cursor: 'pointer',
      },
      'button::-moz-focus-inner': {
        border: '0 !important',
      },
      table: {
        borderCollapse: 'collapse',
      },
      'h1, h2, h3, h4, h5, h6': {
        fontSize: 'inherit',
        fontWeight: 'inherit',
      },
      'img, svg, video, canvas, audio, iframe, embed, object': {
        display: 'block',
      },
      '[data-js-focus-visible] :focus:not([data-focus-visible-added])': {
        outline: 'none',
        boxShadow: 'none',
      },
      'select::-ms-expand': {
        display: 'none',
      },
    },
  },
};
