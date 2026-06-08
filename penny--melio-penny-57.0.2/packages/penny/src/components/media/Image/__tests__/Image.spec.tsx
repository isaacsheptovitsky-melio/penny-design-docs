import { fireEvent } from '@testing-library/react';
import { expect } from 'vitest';

import SpongeBob from '@/test/assets/SpongeBob.png';
import { renderComponent } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { Image } from '../Image';
import type { ImageProps } from '../Image.types';

const props = {
  src: SpongeBob,
  alt: 'SpongeBob SquarePants',
} as ImageProps;

describe('Image', () => {
  validateComponent<ImageProps>(Image, 'Image', { props, defaultDataTestId: 'image' });

  it('invokes the provided onClick handler when clicking the button', async () => {
    const handleClick = vi.fn();

    const { getByTestId, user } = renderComponent(
      <Image {...props} onClick={handleClick} data-testid="image-component" />
    );

    await user.click(getByTestId('image-component'));

    expect(handleClick).toHaveBeenCalled();
  });
  describe('Error handling', () => {
    it('invokes the provided onLoad handler when error', () => {
      const handleOnLoad = vi.fn();

      const { getByTestId } = renderComponent(<Image {...props} onLoad={handleOnLoad} data-testid="image-component" />);
      fireEvent.load(getByTestId('image-component'));

      expect(handleOnLoad).toHaveBeenCalled();
    });

    it('invokes the provided onError handler when error', () => {
      const handleError = vi.fn();

      const { getByTestId, queryByTestId } = renderComponent(
        <Image {...props} onError={handleError} data-testid="image-component" />
      );
      fireEvent.error(getByTestId('image-component'));

      expect(getByTestId('image-component-fallback')).toBeInTheDocument();
      expect(queryByTestId('image-component')).not.toBeInTheDocument();
      expect(handleError).toHaveBeenCalled();
    });

    // Regression test for https://meliorisk.atlassian.net/browse/ME-60561
    it('restes the error state', () => {
      const handleError = vi.fn();

      const { getByTestId, rerender } = renderComponent(
        <Image {...props} onError={handleError} data-testid="image-component" />
      );

      fireEvent.error(getByTestId('image-component'));
      expect(handleError).toHaveBeenCalledTimes(1);

      // Upload an image with an error again
      rerender(<Image {...props} onError={handleError} />);
      fireEvent.error(getByTestId('image-fallback'));
      // Expect an error to be thrown again
      expect(handleError).toHaveBeenCalledTimes(1);

      // Upload an image without an error
      rerender(<Image {...props} onError={handleError} />);
      expect(handleError).not.toHaveBeenCalledTimes(0);
    });
  });
});
