import { sanitizeSvg } from './sanitizeSvg';

const contentCache = new Map<string, string>();
const promiseCache = new Map<string, Promise<string>>();

function normalizeSvg(svg: string): string {
  return svg.replace(/>\s+</g, '><').trim();
}

/**
 * Get cached icon content synchronously
 * @param src - The icon URL
 * @returns The cached SVG string, or undefined if not cached
 */
export function getCachedIcon(src: string) {
  return contentCache.get(src);
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Fetch and cache an icon. Returns cached content immediately if available,
 * otherwise fetches and caches for future use.
 * @param src - The icon URL
 * @param signal - AbortSignal to cancel the fetch request
 * @returns Promise that resolves to the SVG string
 */
export async function fetchIcon(src: string, signal: AbortSignal) {
  const cachedContent = contentCache.get(src);
  if (cachedContent !== undefined) return Promise.resolve(cachedContent);

  const existingPromise = promiseCache.get(src);
  if (existingPromise !== undefined) return existingPromise;

  /**
   * SAFETY CHECK: If we are in an environment without fetch (like older Jest).
   */
  if (typeof fetch === 'undefined') {
    return Promise.resolve('');
  }

  /**
   * In test environments (jsdom), relative URLs fail to parse without a base URL.
   */
  if (!isValidUrl(src)) {
    return Promise.resolve('');
  }

  const promise = fetch(src, { signal })
    .then(async (res) => {
      if (!res.ok) throw new Error(`Failed to load icon: ${src}`);
      return res.text();
    })
    .then((text) => {
      if (text.startsWith('<svg')) {
        const sanitized = sanitizeSvg(text);
        const normalized = normalizeSvg(sanitized);
        contentCache.set(src, normalized);
        return normalized;
      }
      return text;
    })
    .finally(() => {
      promiseCache.delete(src);
    });

  promiseCache.set(src, promise);
  return promise;
}

/**
 * Clear the icon cache. Useful for testing.
 */
export function clearCache(): void {
  contentCache.clear();
  promiseCache.clear();
}
