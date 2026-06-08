import { screen } from '@testing-library/react';
import { expect } from 'vitest';

import { renderComponent } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { Video, type VideoProps } from '../Video';

const props = {
  src: 'https://cdn.free-stock.video/2252023/leaf-leaf-plant-green-close-up-nature-backgrounds-73843-small.mp4',
};

describe('Video', () => {
  validateComponent<VideoProps>(Video, 'Video', { props, defaultDataTestId: 'video' });

  it('should render with controls', () => {
    renderComponent(<Video data-testid="video" {...props} />);

    expect(screen.getByTestId('video')).toHaveAttribute('controls');
  });

  it('should auto play', () => {
    renderComponent(<Video data-testid="video" {...props} autoPlay />);

    expect(screen.getByTestId('video')).toHaveAttribute('autoPlay');
    // Should uncomment once this PR is merged:
    // https://github.com/facebook/react/pull/20087
    // expect(screen.getByTestId('video')).toHaveAttribute('muted');
  });

  it('should be muted', () => {
    renderComponent(<Video data-testid="video" {...props} isMuted />);

    // Should uncomment once this PR is merged:
    // https://github.com/facebook/react/pull/20087
    // expect(screen.getByTestId('video')).toHaveAttribute('muted');
  });

  it('should loop', () => {
    renderComponent(<Video data-testid="video" {...props} loop />);

    expect(screen.getByTestId('video')).toHaveAttribute('loop');
  });

  it('should hide controls', () => {
    renderComponent(<Video data-testid="video" {...props} hideControls />);

    expect(screen.getByTestId('video')).not.toHaveAttribute('controls');
  });

  it('should render with custom size', () => {
    renderComponent(<Video data-testid="video" {...props} height={100} width={200} />);

    expect(screen.getByTestId('video')).toHaveAttribute('height', '100');
    expect(screen.getByTestId('video')).toHaveAttribute('width', '200');
  });
});
