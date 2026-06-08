import { screen } from '@testing-library/react';
import { expect } from 'vitest';

import { renderComponent } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import {
  SectionBannerCloseButton,
  SectionBannerContent,
  SectionBannerDescription,
  SectionBannerIcon,
  SectionBannerRoot,
  type SectionBannerRootProps,
} from '../index';

describe('SectionBanner', () => {
  validateComponent<SectionBannerRootProps>(SectionBannerRoot, 'SectionBannerRoot', {
    defaultDataTestId: 'section-banner',
  });

  it('invokes the onClose handler when clicking close icon button', async () => {
    const handleOnClose = vi.fn();
    const { user } = renderComponent(
      <SectionBannerRoot>
        <SectionBannerIcon />
        <SectionBannerContent>
          <SectionBannerDescription>test</SectionBannerDescription>
        </SectionBannerContent>
        <SectionBannerCloseButton onClick={handleOnClose} />
      </SectionBannerRoot>
    );

    await user.click(screen.getByTestId('section-banner-close-button'));

    expect(handleOnClose).toHaveBeenCalled();
  });

  it("overrides the close button's aria-label", () => {
    const { getByTestId, rerender } = renderComponent(
      <SectionBannerRoot>
        <SectionBannerIcon />
        <SectionBannerContent>
          <SectionBannerDescription>description</SectionBannerDescription>
        </SectionBannerContent>
        <SectionBannerCloseButton />
      </SectionBannerRoot>
    );
    expect(getByTestId('section-banner-close-button')).toHaveAttribute('aria-label', 'close');

    rerender(
      <SectionBannerRoot>
        <SectionBannerIcon />
        <SectionBannerContent>
          <SectionBannerDescription>description</SectionBannerDescription>
        </SectionBannerContent>
        <SectionBannerCloseButton aria-label="test" />
      </SectionBannerRoot>
    );

    expect(getByTestId('section-banner-close-button')).toHaveAttribute('aria-label', 'test');
  });
});
