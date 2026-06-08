import { fireEvent, waitFor } from '@testing-library/react';
import { expect } from 'vitest';

import { renderComponent } from '@/test-utils/render.utils';

import { AlternativeSlide } from '../AlternativeSlide';

describe('AlternativeSlide', () => {
  it('renders correctly when open', async () => {
    const { getByText } = renderComponent(<AlternativeSlide isOpen>Content</AlternativeSlide>);
    await waitFor(() => expect(getByText('Content')).toHaveAttribute('data-open', 'true'));
  });

  it('renders correctly when closed', () => {
    const { getByText } = renderComponent(<AlternativeSlide isOpen={false}>Content</AlternativeSlide>);
    expect(getByText('Content')).toHaveAttribute('data-open', 'false');
  });

  it('calls onAnimationComplete when transition ends', async () => {
    const onAnimationComplete = vi.fn();
    const { getByTestId } = renderComponent(
      <AlternativeSlide data-testid="si" isOpen={false} direction="right" onAnimationComplete={onAnimationComplete}>
        Content
      </AlternativeSlide>
    );

    const element = getByTestId('si');

    const event = new Event('transitionend', { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'propertyName', { value: 'right' });
    fireEvent(element, event);

    await waitFor(() => expect(onAnimationComplete).toHaveBeenCalledWith('exit'));
  });

  it('does not call onAnimationComplete for unrelated transitions', () => {
    const onAnimationComplete = vi.fn();
    const { getByText } = renderComponent(
      <AlternativeSlide isOpen={false} onAnimationComplete={onAnimationComplete}>
        Content
      </AlternativeSlide>
    );

    const element = getByText('Content');
    const event = new Event('transitionend', { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'propertyName', { value: 'opacity' });
    fireEvent(element, event);

    expect(onAnimationComplete).not.toHaveBeenCalled();
  });
});
