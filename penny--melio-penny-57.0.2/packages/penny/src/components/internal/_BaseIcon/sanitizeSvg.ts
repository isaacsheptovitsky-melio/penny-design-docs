import DOMPurify, { type Config } from 'dompurify';

const SVG_PURIFY_CONFIG: Config = {
  USE_PROFILES: { svg: true, svgFilters: true },
  FORBID_TAGS: ['script', 'foreignObject', 'iframe', 'object', 'embed'],
  FORBID_ATTR: [
    'onload',
    'onclick',
    'onerror',
    'onmouseover',
    'onmouseout',
    'onmouseenter',
    'onmouseleave',
    'onmousedown',
    'onmouseup',
    'onfocus',
    'onblur',
    'onchange',
    'oninput',
    'onsubmit',
    'onkeydown',
    'onkeypress',
    'onkeyup',
    'ontouchstart',
    'ontouchend',
    'ontouchmove',
    'onanimationstart',
    'onanimationend',
    'onanimationiteration',
    'ontransitionend',
  ],
};

export function sanitizeSvg(svg: string): string {
  if (typeof window === 'undefined') {
    return svg;
  }
  return DOMPurify.sanitize(svg, SVG_PURIFY_CONFIG);
}
