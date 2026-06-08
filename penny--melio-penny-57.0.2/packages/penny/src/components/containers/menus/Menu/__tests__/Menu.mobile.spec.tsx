import { act, screen, waitFor } from '@testing-library/react';
import { afterAll, beforeAll, expect } from 'vitest';

import { Button } from '@/components/action/Button';
import { ActionItem } from '@/components/containers/menus/ActionsDropdownMenu/ActionItem';
import { renderComponent } from '@/test-utils/render.utils';
import * as useBreakpointObject from '@/theme/providers/BreakpointProvider';

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

  return { user, clickOnMenu, ...rest };
};

describe('Menu - Mobile', () => {
  beforeAll(() => {
    vi.spyOn(useBreakpointObject, 'useBreakpoint').mockImplementation(() => ({
      isExtraSmallScreen: true,
      isExtraLargeScreen: false,
      isLargeScreen: false,
      isMediumScreen: false,
      isSmallScreen: false,
      breakpoint: 's',
    }));
  });
  afterAll(() => {
    vi.clearAllMocks();
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
