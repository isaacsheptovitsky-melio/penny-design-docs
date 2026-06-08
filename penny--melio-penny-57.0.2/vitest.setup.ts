import '@testing-library/jest-dom/vitest';
import 'vitest-canvas-mock';

import { vitest as vi } from 'vitest';

// Polyfill TextDecoder and TextEncoder for Node.js compatibility
// These are Web APIs not available in Node.js by default
/* eslint-disable */
if (typeof globalThis.TextDecoder === 'undefined') {
  const { TextDecoder, TextEncoder } = require('util');
  globalThis.TextDecoder = TextDecoder;
  globalThis.TextEncoder = TextEncoder;
}

// Bypass 'ResizeObserver is not defined' error:
// https://github.com/ZeeCoder/use-resize-observer/issues/40#issuecomment-644536259
class ResizeObserver {
  observe() {
    vi.fn();
  }
  unobserve() {
    vi.fn();
  }
  disconnect() {
    vi.fn();
  }
}
window.ResizeObserver = ResizeObserver;

// Mocking window.matchMedia
// https://github.com/facebook/create-react-app/issues/10126#issuecomment-735272763
window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(), // Deprecated
  removeListener: vi.fn(), // Deprecated
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
});

// Bypass 'unstable_flushDiscreteUpdates' error
// https://github.com/testing-library/react-testing-library/issues/470#issuecomment-710775040
Object.defineProperty(HTMLMediaElement.prototype, 'muted', {
  set: vi.fn(),
});

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();
