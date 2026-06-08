import { describe, expect, it } from 'vitest';

import { sanitizeSvg } from '../sanitizeSvg';

describe('sanitizeSvg', () => {
  it('should preserve valid SVG content', () => {
    const validSvg = '<svg viewBox="0 0 24 24"><path d="M10 10"/></svg>';

    const result = sanitizeSvg(validSvg);

    expect(result).toContain('<svg');
    expect(result).toContain('<path');
    expect(result).toContain('d="M10 10"');
  });

  it('should remove script tags', () => {
    const maliciousSvg = '<svg><script>alert("XSS")</script><path d="M10 10"/></svg>';

    const result = sanitizeSvg(maliciousSvg);

    expect(result).not.toContain('<script');
    expect(result).not.toContain('alert');
    expect(result).toContain('<path');
  });

  it('should remove onload event handlers', () => {
    const maliciousSvg = '<svg onload="alert(\'XSS\')"><path d="M10 10"/></svg>';

    const result = sanitizeSvg(maliciousSvg);

    expect(result).not.toContain('onload');
    expect(result).not.toContain('alert');
    expect(result).toContain('<svg');
  });

  it('should remove onclick event handlers', () => {
    const maliciousSvg = '<svg><rect onclick="alert(\'XSS\')" width="100" height="100"/></svg>';

    const result = sanitizeSvg(maliciousSvg);

    expect(result).not.toContain('onclick');
    expect(result).not.toContain('alert');
    expect(result).toContain('<rect');
  });

  it('should remove onerror event handlers', () => {
    const maliciousSvg = '<svg><image onerror="alert(\'XSS\')" href="invalid.jpg"/></svg>';

    const result = sanitizeSvg(maliciousSvg);

    expect(result).not.toContain('onerror');
    expect(result).not.toContain('alert');
  });

  it('should remove foreignObject elements', () => {
    const maliciousSvg =
      '<svg><foreignObject><body xmlns="http://www.w3.org/1999/xhtml"><script>alert("XSS")</script></body></foreignObject></svg>';

    const result = sanitizeSvg(maliciousSvg);

    expect(result).not.toContain('<foreignObject');
    expect(result).not.toContain('<script');
    expect(result).not.toContain('<body');
  });

  it('should remove iframe elements', () => {
    const maliciousSvg = '<svg><iframe src="javascript:alert(\'XSS\')"></iframe></svg>';

    const result = sanitizeSvg(maliciousSvg);

    expect(result).not.toContain('<iframe');
    expect(result).not.toContain('javascript:');
  });

  it('should remove object elements', () => {
    const maliciousSvg = '<svg><object data="malicious.swf"></object></svg>';

    const result = sanitizeSvg(maliciousSvg);

    expect(result).not.toContain('<object');
  });

  it('should remove embed elements', () => {
    const maliciousSvg = '<svg><embed src="malicious.swf"></embed></svg>';

    const result = sanitizeSvg(maliciousSvg);

    expect(result).not.toContain('<embed');
  });

  it('should remove onmouseover event handlers', () => {
    const maliciousSvg = '<svg><rect onmouseover="alert(\'XSS\')" width="100" height="100"/></svg>';

    const result = sanitizeSvg(maliciousSvg);

    expect(result).not.toContain('onmouseover');
    expect(result).not.toContain('alert');
    expect(result).toContain('<rect');
  });

  it('should preserve SVG filters', () => {
    const svgWithFilter =
      '<svg><defs><filter id="blur"><feGaussianBlur stdDeviation="5"/></filter></defs><rect filter="url(#blur)"/></svg>';

    const result = sanitizeSvg(svgWithFilter);

    expect(result).toContain('<filter');
    expect(result).toContain('feGaussianBlur');
  });

  it('should preserve valid SVG attributes', () => {
    const validSvg =
      '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M10 10" fill-rule="evenodd"/></svg>';

    const result = sanitizeSvg(validSvg);

    expect(result).toContain('viewBox');
    expect(result).toContain('fill="currentColor"');
    expect(result).toContain('stroke="none"');
    expect(result).toContain('fill-rule="evenodd"');
  });

  it('should handle combined XSS attack vectors', () => {
    const maliciousSvg = `
      <svg onload="alert('XSS1')">
        <script>alert('XSS2')</script>
        <foreignObject>
          <body xmlns="http://www.w3.org/1999/xhtml">
            <script>alert('XSS3')</script>
          </body>
        </foreignObject>
        <rect onclick="alert('XSS4')" onerror="alert('XSS5')" width="100" height="100"/>
        <path d="M10 10"/>
      </svg>
    `;

    const result = sanitizeSvg(maliciousSvg);

    expect(result).not.toContain('alert');
    expect(result).not.toContain('onload');
    expect(result).not.toContain('<script');
    expect(result).not.toContain('<foreignObject');
    expect(result).not.toContain('onclick');
    expect(result).not.toContain('onerror');
    expect(result).toContain('<path');
    expect(result).toContain('<rect');
  });
});
