import { createBaseIconTestKit } from '@melio/penny-testkit-rtl';
import { waitFor } from '@testing-library/react';
import { afterEach, expect, vi } from 'vitest';

import { type AllIconKey } from '@/theme/icons/icon.types';

import { renderComponent } from '../../../../test-utils';
import { validateComponent } from '../../../../test-utils/__tests__/component.validation';
import { _BaseIcon as BaseIcon } from '../_BaseIcon';
import { type _BaseIconProps as BaseIconProps } from '../_BaseIcon.types';
import { clearCache, getCachedIcon } from '../iconCache';

describe('_BaseIcon', () => {
  const dataTestId = 'base-icon';
  let baseIconTestKit: ReturnType<typeof createBaseIconTestKit>;

  beforeEach(() => {
    baseIconTestKit = createBaseIconTestKit({ dataTestId });
    clearCache();
    vi.clearAllMocks();
  });

  afterEach(() => {
    clearCache();
  });

  validateComponent<BaseIconProps>(BaseIcon, '_BaseIcon', {
    props: { size: 'small', type: 'calculator', color: 'semantic.icon.brand' },
  });

  it('should render and be accessible through test kit', () => {
    renderComponent(<BaseIcon size="small" type="calculator" color="semantic.icon.brand" data-testid={dataTestId} />);

    expect(baseIconTestKit.getElement()).toBeInTheDocument();

    expect(baseIconTestKit.getVisible()).toBe(true);
  });

  it('should handle disabled state', () => {
    renderComponent(
      <BaseIcon size="small" type="calculator" color="semantic.icon.brand" isDisabled data-testid={dataTestId} />
    );

    expect(baseIconTestKit.getDisabled()).toBe(true);
    expect(baseIconTestKit.getReadOnly()).toBe(false);
  });

  it('should handle read-only state', () => {
    renderComponent(
      <BaseIcon size="small" type="calculator" color="semantic.icon.brand" isReadOnly data-testid={dataTestId} />
    );

    expect(baseIconTestKit.getReadOnly()).toBe(true);
    expect(baseIconTestKit.getDisabled()).toBe(false);
  });

  it('should identify brand color icons', () => {
    renderComponent(<BaseIcon size="small" type="calculator" color="semantic.icon.brand" data-testid={dataTestId} />);

    expect(baseIconTestKit.getIsBrandColor()).toBe(true);
  });

  it('should not identify non-brand color icons as brand', () => {
    renderComponent(<BaseIcon size="small" type="calculator" color="semantic.icon.primary" data-testid={dataTestId} />);

    expect(baseIconTestKit.getIsBrandColor()).toBe(false);
  });

  it('should access ARIA attributes', () => {
    renderComponent(
      <BaseIcon
        size="small"
        type="calculator"
        color="semantic.icon.brand"
        aria-label="Calculator icon"
        role="img"
        data-testid={dataTestId}
      />
    );

    expect(baseIconTestKit.getElement().getAttribute('aria-label')).toBe('Calculator icon');
    expect(baseIconTestKit.getRole()).toBe('img');
    expect(baseIconTestKit.getElement().getAttribute('aria-hidden')).toBeNull();
  });

  it('should access data attributes', () => {
    renderComponent(<BaseIcon size="small" type="calculator" color="semantic.icon.brand" data-testid={dataTestId} />);

    expect(baseIconTestKit.getElement().getAttribute('data-component')).toBe('_BaseIcon');
  });

  it('should handle active state check', () => {
    renderComponent(<BaseIcon size="small" type="calculator" color="semantic.icon.brand" data-testid={dataTestId} />);

    expect(baseIconTestKit.getActive()).toBe(false);
    const element = baseIconTestKit.getElement();

    element.setAttribute('data-active', 'true');
    expect(baseIconTestKit.getActive()).toBe(true);
  });

  describe('URL Icon Caching', () => {
    const setThemeOptions = (iconUrls: string[]) => {
      const icons = iconUrls.reduce<Record<string, string>>((acc, iconUrl) => {
        acc[iconUrl] = iconUrl;
        return acc;
      }, {});

      return {
        icons,
      };
    };
    const setUp = (content: string, options: Record<string, string | number | boolean> = {}) => {
      // Pre-populate cache by fetching first
      global.fetch = vi.fn(async () =>
        Promise.resolve({
          ok: true,
          ...options,
          text: async () => Promise.resolve(content),
        } as Response)
      );
    };

    it('should render cached URL icon synchronously using dangerouslySetInnerHTML', async () => {
      const iconUrl = 'https://example.com/icon.svg';
      const svgContent = '<svg><path d="M10 10"/></svg>';
      setUp(svgContent);

      const { unmount } = renderComponent(
        <BaseIcon type={iconUrl as AllIconKey} size="small" color="semantic.icon.brand" data-testid={dataTestId} />,
        {
          themeOptions: setThemeOptions([iconUrl]),
        }
      );

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          iconUrl,
          expect.objectContaining({ signal: expect.any(AbortSignal) as AbortSignal })
        );
      });

      unmount();
      vi.clearAllMocks();

      const { container } = renderComponent(
        <BaseIcon type={iconUrl as AllIconKey} size="small" color="semantic.icon.brand" data-testid={dataTestId} />,
        {
          themeOptions: setThemeOptions([iconUrl]),
        }
      );

      const iconElement = container.querySelector('span[data-component="_BaseIcon"]');
      expect(iconElement?.innerHTML).toContain('<svg>');
      expect(container.querySelector('[data-testid="mock-svg-inject"]')).not.toBeInTheDocument();
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should use InlineSVGComponent when URL icon is not cached', () => {
      const iconUrl = 'https://example.com/uncached-icon.svg';

      const { container } = renderComponent(
        <BaseIcon type={iconUrl as AllIconKey} size="small" color="semantic.icon.brand" data-testid={dataTestId} />,
        {
          themeOptions: setThemeOptions([iconUrl]),
        }
      );
      expect(container.querySelector('[data-testid="mock-svg-inject"]')).toBeInTheDocument();
    });

    it('should not show cached content from previous icon when icon URL changes', async () => {
      const iconUrl1 = 'https://example.com/icon1.svg';
      const iconUrl2 = 'https://example.com/icon2.svg';
      const svgContent1 = '<svg id="icon1"><path d="M10 10"/></svg>';
      const svgContent2 = '<svg id="icon2"><path d="M20 20"/></svg>';

      global.fetch = vi.fn(async (input: RequestInfo | URL) => {
        let urlString: string;
        if (typeof input === 'string') {
          urlString = input;
        } else if (input instanceof Request) {
          urlString = input.url;
        } else {
          urlString = input.toString();
        }
        return Promise.resolve({
          ok: true,
          text: async () => Promise.resolve(urlString.includes('icon1') ? svgContent1 : svgContent2),
        } as Response);
      });

      const { rerender } = renderComponent(
        <BaseIcon type={iconUrl1 as AllIconKey} size="small" color="semantic.icon.brand" data-testid={dataTestId} />,
        {
          themeOptions: setThemeOptions([iconUrl1, iconUrl2]),
        }
      );

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          iconUrl1,
          expect.objectContaining({ signal: expect.any(AbortSignal) as AbortSignal })
        );
      });

      await waitFor(() => {
        const cached = getCachedIcon(iconUrl1);
        expect(cached).toContain('id="icon1"');
        expect(cached).toContain('d="M10 10"');
      });

      rerender(
        <BaseIcon type={iconUrl2 as AllIconKey} size="small" color="semantic.icon.brand" data-testid={dataTestId} />
      );

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          iconUrl2,
          expect.objectContaining({ signal: expect.any(AbortSignal) as AbortSignal })
        );
      });

      await waitFor(() => {
        const container = document.querySelector('[data-component="_BaseIcon"]');
        if (container) {
          expect(container.innerHTML).not.toContain('id="icon1"');
        }
      });
    });

    it('should deduplicate fetch requests for the same URL icon', async () => {
      const iconUrl = 'https://example.com/icon.svg';
      const svgContent = '<svg><path d="M10 10"/></svg>';
      setUp(svgContent);

      renderComponent(
        <>
          <BaseIcon type={iconUrl as AllIconKey} size="small" color="semantic.icon.brand" />
          <BaseIcon type={iconUrl as AllIconKey} size="small" color="semantic.icon.brand" />
          <BaseIcon type={iconUrl as AllIconKey} size="small" color="semantic.icon.brand" />
        </>,
        {
          themeOptions: setThemeOptions([iconUrl]),
        }
      );

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(1);
      });
    });

    it('should not cache non-SVG content', async () => {
      const iconUrl = 'https://example.com/not-svg.txt';
      const nonSvgContent = 'This is not an SVG';
      setUp(nonSvgContent);

      renderComponent(
        <BaseIcon type={iconUrl as AllIconKey} size="small" color="semantic.icon.brand" data-testid={dataTestId} />,
        {
          themeOptions: setThemeOptions([iconUrl]),
        }
      );

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
      });

      expect(getCachedIcon(iconUrl)).toBeUndefined();
    });
  });
});
