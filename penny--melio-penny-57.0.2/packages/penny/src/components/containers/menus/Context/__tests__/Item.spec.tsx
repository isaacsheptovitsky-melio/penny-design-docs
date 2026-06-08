import { fireEvent, screen } from '@testing-library/react';
import { expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { Item, type ItemProps } from '../components';
import { type UseMenuReturn } from '../types';
import * as useMenuContextModule from '../useMenu';

vi.mock('../../useMenuContext', () => ({
  useMenuContext: vi.fn(),
}));

describe('Item Component', () => {
  beforeEach(() => {
    vi.spyOn(useMenuContextModule, 'useMenuContext').mockReturnValue({
      getItemProps: vi.fn((userProps) => userProps as UseMenuReturn['getItemProps']),
      activeIndex: 0,
      isOpen: false,
      elementsRef: { current: [] as HTMLElement[] },
    } as unknown as UseMenuReturn);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  validateComponent<ItemProps>(Item, 'Item');

  it('renders the component with children', () => {
    renderComponent(<Item label="Item 1">Test Item</Item>);

    const item = screen.getByRole('menuitem');
    expect(item).toBeInTheDocument();
    expect(item).toHaveTextContent('Test Item');
  });

  it('handles click events when not disabled', () => {
    const handleClick = vi.fn();
    renderComponent(
      <Item label="Item 1" onClick={handleClick}>
        Test Item
      </Item>
    );

    const item = screen.getByRole('menuitem');
    fireEvent.click(item);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(expect.any(Object), 'content');
  });

  it('does not handle click events when disabled', () => {
    const handleClick = vi.fn();
    renderComponent(
      <Item label="Item 1" onClick={handleClick} disabled>
        Test Item
      </Item>
    );

    const item = screen.getByRole('menuitem');
    fireEvent.click(item);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('handles keyboard events for Space and Enter', () => {
    const handleClick = vi.fn();
    renderComponent(
      <Item label="Item 1" onClick={handleClick}>
        Test Item
      </Item>
    );

    const item = screen.getByRole('menuitem');
    fireEvent.keyDown(item, { code: 'Enter' });
    fireEvent.keyDown(item, { code: 'Space' });
    expect(handleClick).toHaveBeenCalledTimes(2);
    expect(handleClick).toHaveBeenCalledWith(expect.any(Object), 'content');
  });

  it('applies the correct styles and attributes', () => {
    renderComponent(
      <Item label="Item 1" isSelected>
        Test Item
      </Item>
    );

    const item = screen.getByRole('menuitem');
    expect(item).toHaveAttribute('data-selected', 'true');
    expect(item).not.toHaveAttribute('aria-disabled', 'true');
  });
});
