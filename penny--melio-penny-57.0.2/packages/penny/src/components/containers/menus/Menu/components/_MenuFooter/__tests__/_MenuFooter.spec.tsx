import { act, screen } from '@testing-library/react';
import { expect } from 'vitest';

import { Button } from '@/components/action/Button';
import { NakedButton } from '@/components/action/NakedButton';
import { ActionItem } from '@/components/containers/menus/ActionsDropdownMenu/ActionItem';
import { renderComponent } from '@/test-utils/render.utils';

import { Menu } from '../../..';
import type { _MenuFooterProps } from '../_MenuFooter.types';

const setup = (props: _MenuFooterProps) => {
  const { user, ...rest } = renderComponent(
    <Menu
      trigger={<Button variant="secondary" size="large" label="Button" />}
      isOpen
      onOpenChange={vi.fn()}
      footer={props}
    >
      <ActionItem label="option 1" />
    </Menu>
  );

  const clickOnFooterBtn = async () => act(async () => user.click(screen.getByTestId('footer-button')));

  return { user, clickOnFooterBtn, ...rest };
};

describe('Menu Footer Item', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('click on item will activate the onClick', async () => {
    const onClick = vi.fn();
    const { clickOnFooterBtn } = setup({
      label: 'test',
      onClick,
      children: <NakedButton label="+ Add payment method" data-testid="footer-button" />,
    });
    await clickOnFooterBtn();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('when isDisabled is true, the footer item is disabled and onClick is not activated', async () => {
    const onClick = vi.fn();
    const { getByTestId, clickOnFooterBtn } = setup({
      label: 'test',
      isDisabled: true,
      onClick,
      children: <NakedButton label="+ Add payment method" data-testid="footer-button" />,
    });
    expect(getByTestId('footer-button')).toBeDisabled();
    expect(getByTestId('menu-footer-btn')).toHaveAttribute('data-disabled', 'true');
    await clickOnFooterBtn();
    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
