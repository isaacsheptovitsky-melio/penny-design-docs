import { waitFor } from '@testing-library/react';
import { afterEach, expect, vi } from 'vitest';

import { type AllIconKey } from '@/theme/icons/icon.types';

import { renderComponent } from '../../../../test-utils';
import { _BaseIcon as BaseIcon } from '../_BaseIcon';
import { clearCache } from '../iconCache';

describe('useCachedUrlIcon', () => {
  const dataTestId = 'base-icon';

  const setThemeOptions = (iconUrls: string[]) => {
    const icons = iconUrls.reduce<Record<string, string>>((acc, iconUrl) => {
      acc[iconUrl] = iconUrl;
      return acc;
    }, {});
    return { icons };
  };

  beforeEach(() => {
    clearCache();
    vi.clearAllMocks();
  });

  afterEach(() => {
    clearCache();
  });

  describe('Abort Signal Behavior', () => {
    it('should pass abort signal to fetch', async () => {
      const iconUrl = 'https://example.com/icon.svg';
      let rejectFetch: (reason: Error) => void = () => {};

      global.fetch = vi.fn(
        async () =>
          new Promise<Response>((_, reject) => {
            rejectFetch = reject;
          })
      );

      const { unmount } = renderComponent(
        <BaseIcon type={iconUrl as AllIconKey} size="small" color="semantic.icon.brand" data-testid={dataTestId} />,
        { themeOptions: setThemeOptions([iconUrl]) }
      );

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          iconUrl,
          expect.objectContaining({ signal: expect.any(AbortSignal) as AbortSignal })
        );
      });

      unmount();
      rejectFetch(new DOMException('The operation was aborted', 'AbortError'));
    });
  });
});
