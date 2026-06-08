import { expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { Card } from '../Card';
import { type CardProps } from '../Card.types';

const defaultProps = { children: 'Card content' };

describe('Card', () => {
  validateComponent<CardProps>(Card, 'Card', { props: defaultProps });

  it('handles click', async () => {
    const onClick = vi.fn();
    const { getByTestId, user } = renderComponent(<Card {...defaultProps} onClick={onClick} />);

    await user.click(getByTestId('card'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('fires click handler when pressing Enter or Space', async () => {
    const onClick = vi.fn();
    const { user } = renderComponent(<Card {...defaultProps} onClick={onClick} />);

    await user.tab();
    await user.keyboard('[Enter]');

    expect(onClick).toHaveBeenCalledTimes(1);

    await user.keyboard('[Space]');

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('does not fire click handler when disabled', async () => {
    const onClick = vi.fn();
    const { getByTestId, user } = renderComponent(<Card {...defaultProps} onClick={onClick} disabled />);

    await user.click(getByTestId('card'));

    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it('does not fire click handler when readonly', async () => {
    const onClick = vi.fn();
    const { getByTestId, user } = renderComponent(<Card {...defaultProps} onClick={onClick} readOnly />);

    await user.click(getByTestId('card'));

    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it('triggers hover events', async () => {
    const handleMouseOver = vi.fn();
    const handleMouseLeave = vi.fn();
    const handleMouseEnter = vi.fn();

    const { getByTestId, user } = renderComponent(
      <Card
        {...defaultProps}
        onMouseEnter={handleMouseEnter}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      />
    );

    await user.hover(getByTestId('card'));
    await user.unhover(getByTestId('card'));

    expect(handleMouseEnter).toHaveBeenCalled();
    expect(handleMouseOver).toHaveBeenCalled();
    expect(handleMouseLeave).toHaveBeenCalled();
  });

  it('renders as div when onClick is not provided', () => {
    const { getByTestId } = renderComponent(<Card {...defaultProps} />);

    expect(getByTestId('card')?.tagName).toBe('DIV');
  });

  it('renders as button when onClick is provided', () => {
    const { getByTestId } = renderComponent(<Card {...defaultProps} onClick={() => {}} />);

    expect(getByTestId('card')?.tagName).toBe('BUTTON');
  });
});
