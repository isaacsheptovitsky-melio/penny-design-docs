import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderComponent } from '../../../../test-utils';
import { mockContext } from '../__fixtures__/mock-data';
import { Floater } from '../Floater';
import { type FloaterProps } from '../Floater.types';

// Mock components
vi.mock('..', () => ({
  Box: vi.fn(({ children, ...props }) => <div {...props}>{children}</div>),
  Portal: vi.fn(({ children }) => <>{children}</>),
}));

describe('Floater', () => {
  const defaultProps: FloaterProps = {
    isOpen: true,
    children: <div data-testid="content">Floater Content</div>,
    focusManagerProps: { context: mockContext },
    onKeyDown: vi.fn(),
    role: 'dialog',
    'data-testid': 'floater',
  };

  const renderFloater = (props: Partial<FloaterProps> = {}) =>
    renderComponent(<Floater {...defaultProps} {...props} />);

  it('renders the Floater when isOpen is true', () => {
    const { getByTestId } = renderFloater();
    expect(getByTestId('floater')).toBeInTheDocument();
    expect(getByTestId('content')).toBeInTheDocument();
  });

  it('does not render the Floater when isOpen is false', () => {
    const { queryByTestId } = renderFloater({ isOpen: false });
    expect(queryByTestId('floater')).not.toBeInTheDocument();
    expect(queryByTestId('content')).not.toBeInTheDocument();
  });

  it('renders with the correct role', () => {
    const { getByTestId } = renderFloater({ role: 'alertdialog' });
    expect(getByTestId('floater')).toHaveAttribute('role', 'alertdialog');
  });

  it('applies floating styles correctly', () => {
    const { getByTestId } = renderFloater({ styles: { background: 'red' } });
    expect(getByTestId('floater')).toHaveStyle('background: red');
  });

  it('calls onKeyDown when a key is pressed', async () => {
    const onKeyDown = vi.fn();
    const { user, getByTestId } = renderFloater({ onKeyDown, tabIndex: 0 });

    getByTestId('floater').focus();
    expect(getByTestId('floater')).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(onKeyDown).toHaveBeenCalled();
  });

  it('stops click event propagation on the floater box', async () => {
    const handleClick = vi.fn();
    const { user } = renderComponent(
      <div onClick={handleClick}>
        <Floater {...defaultProps} />
      </div>
    );
    await user.click(screen.getByTestId('floater'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders the overlay when provided', () => {
    const { getByTestId } = renderFloater({ overlay: <div data-testid="custom-overlay">Custom Overlay</div> });
    expect(getByTestId('custom-overlay')).toBeInTheDocument();
  });
});
