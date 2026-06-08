import { act, screen, waitFor } from '@testing-library/react';
import { expect } from 'vitest';

import { Button } from '@/components/action/Button';
import { ActionItem } from '@/components/containers/menus/ActionsDropdownMenu/ActionItem';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { Menu } from '..';
import type { MenuProps } from '../Menu.types';

const defaultProps = {
  isOpen: true,
  onOpenChange: vi.fn(),
  trigger: <Button variant="secondary" size="large" label="Button" data-testid="trigger" />,
  children: <ActionItem label="option 1" />,
};

const setup = ({ itemClick, ...props }: Partial<MenuProps> & { itemClick?: VoidFunction } = {}) => {
  const { user, ...rest } = renderComponent(
    <Menu {...defaultProps} {...props}>
      <ActionItem label="option 1" onClick={itemClick} data-testid="item-1" />
    </Menu>
  );

  const clickOnMenu = async () => act(async () => user.click(screen.getByTestId('trigger')));

  // Since the menu is opened with transition need to wait for it to end
  const waitForMenu = async ({ open }: { open: boolean }) =>
    open ? await screen.findByTestId('menu') : expect(screen.queryByTestId('menu')).not.toBeInTheDocument();

  return { user, clickOnMenu, waitForMenu, ...rest };
};

describe('Menu', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  validateComponent<MenuProps>(Menu, 'Menu', { props: defaultProps });

  it('calls onOpenChange when trigger is clicked', async () => {
    const onOpenChange = vi.fn();
    const { clickOnMenu } = setup({ onOpenChange });

    await clickOnMenu();
    expect(onOpenChange).toHaveBeenCalledTimes(1);
  });

  it('calls onOpenChange when clicking outside', async () => {
    const onOpenChange = vi.fn();
    const { user } = setup({ onOpenChange });

    await act(async () => user.click(document.body));
    expect(onOpenChange).toHaveBeenCalledTimes(1);
  });

  it('the menu is open by default', async () => {
    const { waitForMenu } = setup();

    await waitForMenu({ open: true });
  });

  it('triggers the onClick of an item when it is clicked', async () => {
    const itemClick = vi.fn();
    const { user } = setup({ itemClick });

    await user.click(screen.getByTestId('item-1'));
    expect(itemClick).toHaveBeenCalledTimes(1);
  });

  it("doesn't trigger onOpenChange when disabled", async () => {
    const onOpenChange = vi.fn();
    const { clickOnMenu } = setup({ onOpenChange, isDisabled: true });

    await clickOnMenu();
    expect(onOpenChange).toHaveBeenCalledTimes(0);
  });

  it("doesn't trigger onOpenChange when in read only mode", async () => {
    const onOpenChange = vi.fn();
    const { clickOnMenu } = setup({ onOpenChange, isReadOnly: true });

    await clickOnMenu();
    expect(onOpenChange).toHaveBeenCalledTimes(0);
  });

  it('renders a title', () => {
    const title = 'test-title';
    setup({ title });

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('clicks on the footer', async () => {
    const footerClick = vi.fn();
    const footerProps = {
      label: 'footer',
      children: <Button label="footer button" data-testid="footer-button" />,
      onClick: footerClick,
    };
    const { user } = setup({ footer: footerProps });

    await act(async () => user.click(screen.getByTestId('footer-button')));
    expect(footerClick).toHaveBeenCalledTimes(1);
  });

  describe('Navigation', () => {
    it('Focus on the first menu item', async () => {
      const footerProps = { label: 'footer', children: <Button label="footer button" />, onClick: vi.fn() };
      const { clickOnMenu, user } = setup({ footer: footerProps });

      await clickOnMenu();
      await user.keyboard('[ArrowDown]');
      await waitFor(() => expect(screen.getAllByRole('menuitem')[0]).toHaveFocus());
    });

    it('Focus on footer when navigate with keyboard', async () => {
      const footerProps = {
        label: 'footer',
        children: <Button label="footer button" data-testid="footer-button" />,
        onClick: vi.fn(),
      };
      const { clickOnMenu, user } = setup({ footer: footerProps });

      await clickOnMenu();
      await user.keyboard('[ArrowDown]');
      await waitFor(() => expect(screen.getAllByRole('menuitem')[0]).toHaveFocus());
      await user.keyboard('[ArrowDown]');
      await waitFor(() => expect(screen.getByTestId('footer-button')).toHaveFocus());
    });
  });
});
