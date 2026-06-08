import { act, screen } from '@testing-library/react';
import { expect } from 'vitest';

import { Button } from '@/components/action/Button';
import { renderComponent } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { Menu, MenuItem } from '../../..';
import type { MenuItemProps } from '../MenuItem.types';

const menuProps = {
  isOpen: true,
  onOpenChange: vi.fn(),
  trigger: <Button variant="secondary" size="large" label="Button" />,
};

const setup = (props: Partial<MenuItemProps>) => {
  const { user, ...rest } = renderComponent(
    <Menu {...menuProps}>
      <MenuItem label="option 1" dataTestId="item-1" {...props} />
      <MenuItem label="option 2" dataTestId="item-2" />
      <MenuItem label="option 3" dataTestId="item-3" />
    </Menu>
  );

  const clickOnItem = async () => act(async () => user.click(screen.getByTestId('item-1')));
  const hoverOnItem = async () => act(async () => user.hover(screen.getByTestId('item-1')));

  return { user, clickOnItem, hoverOnItem, ...rest };
};

describe('Menu Item', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  validateComponent<MenuItemProps>(MenuItem, 'MenuItem', {
    props: {
      label: 'test',
      onClick: vi.fn(),
      isSelected: false,
    },
    wrapper: ({ children }) => <Menu {...menuProps}>{children}</Menu>,
  });

  it('click on item will activate the onClick', async () => {
    const onClick = vi.fn();
    const { clickOnItem } = setup({ onClick });
    await clickOnItem();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('when isSelected is true, the item is selected', () => {
    const { getByTestId } = setup({ isSelected: true });

    expect(getByTestId('item-1')).toHaveAttribute('data-selected', 'true');
  });

  it('selects an option using keyboard navigation', async () => {
    const onClick = vi.fn();
    const { getByTestId, user } = setup({ onClick });

    getByTestId('item-1').focus();
    await user.keyboard('{enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
