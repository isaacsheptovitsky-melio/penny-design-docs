import { expect } from 'vitest';

import { renderComponent } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { NavigationItem } from '../../NavigationItem';
import { NavigationListItem } from '../components/NavigationListItem';
import { NavigationList } from '../NavigationList';
import type { NavigationListProps } from '../types';

/**
 * Unit tests for NavigationList component
 */
describe('NavigationList', () => {
  validateComponent<NavigationListProps>(NavigationList, 'NavigationList');

  it('renders navigation list items correctly', () => {
    const { getByText } = renderComponent(
      <NavigationList role="menu" orientation="vertical">
        <NavigationListItem render={<NavigationItem>Item 1</NavigationItem>} />
        <NavigationListItem render={<NavigationItem>Item 2</NavigationItem>} />
        <NavigationListItem render={<NavigationItem>Item 3</NavigationItem>} />
      </NavigationList>
    );

    expect(getByText('Item 1')).toBeInTheDocument();
    expect(getByText('Item 2')).toBeInTheDocument();
    expect(getByText('Item 3')).toBeInTheDocument();
  });

  it('handles keyboard navigation', async () => {
    const { getByText, user } = renderComponent(
      <NavigationList role="menu" orientation="vertical">
        <NavigationListItem>Item 1</NavigationListItem>
        <NavigationListItem>Item 2</NavigationListItem>
        <NavigationListItem>Item 3</NavigationListItem>
      </NavigationList>
    );

    await user.tab();
    expect(getByText('Item 1')).toHaveAttribute('data-active');

    await user.keyboard('{ArrowDown}');
    expect(getByText('Item 2')).toHaveAttribute('data-active');

    await user.keyboard('{ArrowDown}');
    expect(getByText('Item 3')).toHaveAttribute('data-active');
  });

  it('disables specified indices', async () => {
    const { getByText, user } = renderComponent(
      <NavigationList role="menu" orientation="vertical" disabledIndices={[1]}>
        <NavigationListItem render={<NavigationItem>Item 1</NavigationItem>} />
        <NavigationListItem render={<NavigationItem>Item 2</NavigationItem>} />
        <NavigationListItem render={<NavigationItem>Item 3</NavigationItem>} />
      </NavigationList>
    );

    await user.tab();
    expect(getByText('Item 1')).toHaveAttribute('data-active');

    await user.keyboard('{ArrowDown}');
    expect(getByText('Item 3')).toHaveAttribute('data-active');
  });
});
