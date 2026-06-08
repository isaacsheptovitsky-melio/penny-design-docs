import { expect } from 'vitest';

import { renderComponent } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { NavigationItem } from '../NavigationItem';
import type { NavigationItemProps } from '../NavigationItem.types';

const setup = (props: Partial<NavigationItemProps> = {}) => {
  const testId = 'test-nav-item';
  const { getByTestId, user, ...result } = renderComponent(
    <NavigationItem data-testid={testId} {...props}>
      Settings
    </NavigationItem>
  );
  const navItemElement = getByTestId(testId);
  const clickOnItem = async () => user.click(navItemElement);

  return { clickOnItem, user, navItemElement, ...result };
};

describe('NavigationItem', () => {
  validateComponent(NavigationItem, 'NavigationItem');
  const onClickHandler = vi.fn();

  it('should call `onClick`', async () => {
    const { clickOnItem } = setup({ onClick: onClickHandler });
    await clickOnItem();
    expect(onClickHandler).toHaveBeenCalled();
  });

  it('should have data-selected attribute true, when isSelected is true`', () => {
    const { navItemElement } = setup({ onClick: onClickHandler, isSelected: true });
    expect(navItemElement).toHaveAttribute('data-selected', 'true');
  });

  it('should have data-selected attribute false, when isSelected is false`', () => {
    const { navItemElement } = setup({ onClick: onClickHandler, isSelected: false });
    expect(navItemElement).not.toHaveAttribute('data-selected');
  });

  it('should render as a button element tag', () => {
    const { navItemElement } = setup({ onClick: onClickHandler });
    expect(navItemElement.tagName).toBe('BUTTON');
  });

  it('should render as an anchor tag', async () => {
    const { user, navItemElement } = setup({ onClick: onClickHandler, link: { href: '#' } });

    expect(navItemElement.tagName).toBe('A');
    await user.click(navItemElement);
    expect(onClickHandler).toHaveBeenCalled();
  });

  it('should apply custom aria-label when provided', () => {
    const customLabel = 'Custom Navigation Label';
    const { navItemElement } = setup({ 'aria-label': customLabel });
    expect(navItemElement).toHaveAttribute('aria-label', customLabel);
  });

  it('should allow custom role override', () => {
    const customRole = 'menuitem';
    const { navItemElement } = setup({ role: customRole });
    expect(navItemElement).toHaveAttribute('role', customRole);
  });
});
