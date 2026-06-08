import { useState } from 'react';
import { expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { InteractiveCard } from '../InteractiveCard';
import { type InteractiveCardProps } from '../InteractiveCard.types';

const onClick = vi.fn();
const defaultProps = { children: 'Card content', onClick };

describe('InteractiveCard', () => {
  validateComponent<InteractiveCardProps>(InteractiveCard, 'InteractiveCard', { props: defaultProps });

  it('handles click', async () => {
    const { getByTestId, user } = renderComponent(<InteractiveCard {...defaultProps} />);

    await user.click(getByTestId('interactive-card'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('fires click handler when pressing Enter or Space', async () => {
    const { user } = renderComponent(<InteractiveCard {...defaultProps} />);

    await user.tab();
    await user.keyboard('[Enter]');

    expect(onClick).toHaveBeenCalledTimes(1);

    await user.keyboard('[Space]');

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('does not fire click handler when disabled', async () => {
    const { getByTestId, user } = renderComponent(<InteractiveCard {...defaultProps} disabled />);

    await user.click(getByTestId('interactive-card'));

    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it('does not fire click handler when inactive', async () => {
    const { getByTestId, user } = renderComponent(<InteractiveCard {...defaultProps} readOnly />);

    await user.click(getByTestId('interactive-card'));
    expect(getByTestId('interactive-card')).not.toHaveAttribute('aria-pressed');

    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it('triggers hover events', async () => {
    const handleMouseOver = vi.fn();
    const handleMouseLeave = vi.fn();
    const handleMouseEnter = vi.fn();

    const { getByTestId, user } = renderComponent(
      <InteractiveCard
        {...defaultProps}
        onMouseEnter={handleMouseEnter}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      />
    );

    await user.hover(getByTestId('interactive-card'));
    await user.unhover(getByTestId('interactive-card'));

    expect(handleMouseEnter).toHaveBeenCalled();
    expect(handleMouseOver).toHaveBeenCalled();
    expect(handleMouseLeave).toHaveBeenCalled();
  });

  it('should toggle selected state and update aria-pressed when clicked', async () => {
    const TestComponent = () => {
      const [selected, setSelected] = useState(true);
      return (
        <InteractiveCard selected={selected} onClick={() => setSelected(!selected)}>
          Selected Card
        </InteractiveCard>
      );
    };

    const { getByTestId, user } = renderComponent(<TestComponent />);
    const card = getByTestId('interactive-card');

    // Initial selected state
    expect(card).toHaveAttribute('aria-pressed', 'true');

    // Click to deselect
    await user.click(card);
    expect(card).toHaveAttribute('aria-pressed', 'false');

    // Click again to re-select
    await user.click(card);
    expect(card).toHaveAttribute('aria-pressed', 'true');
  });
});
