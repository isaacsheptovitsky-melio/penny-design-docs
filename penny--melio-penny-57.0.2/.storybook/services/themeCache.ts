import { ThemeOptions } from '../../packages/penny/src/theme/types';
import { defaultTheme } from '../toolbar/theme-switcher/default-theme';
import { THEMES, DYNAMIC_THEMES } from '../toolbar/theme-switcher/themes';

export const CACHE_VERSION = '1.0.0';
export const CACHE_EXPIRY_HOURS = 24;
export const CACHE_PREFIX = 'storybook-theme-cache';

interface CacheMetadata {
  version: string;
  timestamp: number;
  expiry: number;
}

interface CacheEntry {
  metadata: CacheMetadata;
  theme: ThemeOptions;
}

export const getCacheKey = (themeName: string): string => `${CACHE_PREFIX}-${themeName}`;

const getMetadataKey = (): string => `${CACHE_PREFIX}-metadata`;

export const isCacheValid = (): boolean => {
  try {
    const metadataStr = localStorage.getItem(getMetadataKey());
    if (!metadataStr) return false;

    const metadata = JSON.parse(metadataStr) as CacheMetadata;
    const now = Date.now();

    return metadata.version === CACHE_VERSION && metadata.expiry > now;
  } catch {
    return false;
  }
};

const setCacheMetadata = (): void => {
  const now = Date.now();
  const metadata: CacheMetadata = {
    version: CACHE_VERSION,
    timestamp: now,
    expiry: now + CACHE_EXPIRY_HOURS * 60 * 60 * 1000,
  };

  localStorage.setItem(getMetadataKey(), JSON.stringify(metadata));
};

export const setThemeCache = (themeName: string, themeConfig: ThemeOptions): void => {
  try {
    const cacheEntry: CacheEntry = {
      metadata: {
        version: CACHE_VERSION,
        timestamp: Date.now(),
        expiry: Date.now() + CACHE_EXPIRY_HOURS * 60 * 60 * 1000,
      },
      theme: themeConfig,
    };

    localStorage.setItem(getCacheKey(themeName), JSON.stringify(cacheEntry));
  } catch (error) {
    console.warn(`Failed to cache theme ${themeName}:`, error);
  }
};

export const getThemeCache = (themeName: string): ThemeOptions | null => {
  try {
    const cacheStr = localStorage.getItem(getCacheKey(themeName));
    if (!cacheStr) return null;

    const cacheEntry = JSON.parse(cacheStr) as CacheEntry;
    const now = Date.now();

    if (cacheEntry.metadata.expiry <= now) {
      localStorage.removeItem(getCacheKey(themeName));
      return null;
    }

    return cacheEntry.theme;
  } catch (error) {
    console.warn(`Failed to read theme cache for ${themeName}:`, error);
    return null;
  }
};

export const clearThemeCache = (): void => {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.warn('Failed to clear theme cache:', error);
  }
};

async function fetchThemeConfig(themeName: string): Promise<ThemeOptions> {
  const response = await fetch(`/api/themes/${themeName}/config/latest.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch theme config for ${themeName}: ${response.status} ${response.statusText}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const themeConfig = (await response.json()) as { theme: ThemeOptions };

  return themeConfig.theme;
}

export const getCachedTheme = async (themeName: string): Promise<ThemeOptions> => {
  if (themeName === 'default') {
    return defaultTheme;
  }

  const cachedTheme = getThemeCache(themeName);
  if (cachedTheme) {
    return cachedTheme;
  }

  try {
    const themeConfig = await fetchThemeConfig(themeName);

    setThemeCache(themeName, themeConfig);

    return themeConfig;
  } catch (error) {
    console.error(`Failed to fetch theme ${themeName}:`, error);

    if (THEMES[themeName]?.theme) {
      return THEMES[themeName].theme!;
    }

    return defaultTheme;
  }
};

export const preloadAllDynamicThemes = async (): Promise<void> => {
  if (!isCacheValid()) {
    console.log('Theme cache is invalid or expired, preloading all dynamic themes...');
    clearThemeCache();
  }

  const dynamicThemeNames = Object.keys(DYNAMIC_THEMES).filter((name) => name !== 'default');

  setCacheMetadata();

  const concurrencyLimit = 5;
  const chunks = [];

  for (let i = 0; i < dynamicThemeNames.length; i += concurrencyLimit) {
    chunks.push(dynamicThemeNames.slice(i, i + concurrencyLimit));
  }

  for (const chunk of chunks) {
    await Promise.allSettled(
      chunk.map(async (themeName) => {
        try {
          if (!getThemeCache(themeName)) {
            const themeConfig = await fetchThemeConfig(themeName);
            setThemeCache(themeName, themeConfig);
            console.log(`✅ Cached theme: ${themeName}`);
          } else {
            console.log(`📦 Theme already cached: ${themeName}`);
          }
        } catch (error) {
          console.warn(`❌ Failed to cache theme ${themeName}:`, error);
        }
      })
    );
  }

  console.log('🎨 Theme preloading completed');
};

export const getCacheStatus = (): { isValid: boolean; cachedThemes: string[] } => {
  const isValid = isCacheValid();
  const cachedThemes: string[] = [];

  try {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(getCacheKey('')) && key !== getMetadataKey()) {
        const themeName = key.replace(getCacheKey(''), '');
        if (themeName) {
          cachedThemes.push(themeName);
        }
      }
    });
  } catch (error) {
    console.warn('Failed to get cache status:', error);
  }

  return { isValid, cachedThemes };
};
