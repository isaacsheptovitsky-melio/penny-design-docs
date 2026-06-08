import { useEffect, useMemo, useState } from 'react';

import { fetchIcon, getCachedIcon } from './iconCache';

type CachedSvgState = {
  readonly content: string;
  readonly iconUrl: string;
};

export function useCachedUrlIcon(iconUrl: string | undefined) {
  const [svgContent, setSvgContent] = useState<CachedSvgState | undefined>(undefined);

  const cachedIcon = useMemo(() => {
    return iconUrl ? getCachedIcon(iconUrl) : undefined;
  }, [iconUrl]);

  useEffect(() => {
    if (!iconUrl || cachedIcon) return;

    const abortController = new AbortController();

    const loadIcon = async () => {
      try {
        const content = await fetchIcon(iconUrl, abortController.signal);
        if (!abortController.signal.aborted && content.startsWith('<svg')) {
          setSvgContent({ content, iconUrl });
        }
      } catch (error) {
        if (abortController.signal.aborted) return;
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    };

    void loadIcon();

    return () => {
      abortController.abort();
    };
  }, [iconUrl, cachedIcon]);

  return cachedIcon ?? (svgContent?.iconUrl === iconUrl ? svgContent?.content : undefined);
}
