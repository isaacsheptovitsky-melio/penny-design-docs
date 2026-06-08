import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '@/components/action/Button';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { Menu } from '../../../Menu';
import { SortItem } from '../SortItem';
import type { SortItemProps } from '../SortItem.types';

describe('Sort Item', () => {
  const triggerComponent = <Button variant="secondary" size="large" label="Button" />;

  const defaultProps: SortItemProps = {
    label: 'test',
    onClick: () => {},
  };

  const renderComponent = (props: Partial<SortItemProps> = {}) =>
    render(
      <Menu trigger={triggerComponent} isOpen onOpenChange={vi.fn()}>
        <SortItem {...defaultProps} {...props} />
      </Menu>
    );

  validateComponent<SortItemProps>(SortItem, 'Menu.SortItem', {
    props: defaultProps,
    wrapper: ({ children }) => (
      <Menu trigger={triggerComponent} isOpen onOpenChange={vi.fn()}>
        {children}
      </Menu>
    ),
  });

  it('should render arrow up icon when sort direction is ascending', () => {
    const dataTestId = 'test-item';
    const { getByTestId } = renderComponent({ sortDirection: 'asc', dataTestId });

    const item = getByTestId(dataTestId);
    expect(within(item).getByTestId('icon')).toBeInTheDocument();
  });

  it('should render arrow down icon when sort direction is descending', () => {
    const dataTestId = 'test-item';
    const { getByTestId } = renderComponent({ sortDirection: 'desc', dataTestId });

    const item = getByTestId(dataTestId);
    expect(within(item).getByTestId('icon')).toBeInTheDocument();
  });

  it('should not render an icon when sort direction is none', () => {
    renderComponent({ sortDirection: 'none' });

    expect(screen.queryByTestId('arrow-up-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('arrow-down-icon')).not.toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const onClick = vi.fn();
    renderComponent({ onClick });
    fireEvent.click(screen.getByText('test'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should not call onClick when disabled', () => {
    const onClick = vi.fn();
    renderComponent({ onClick, disabled: true });
    fireEvent.click(screen.getByText('test'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should have correct aria-label for accessibility', () => {
    const { rerender } = renderComponent({ sortDirection: 'asc' });
    expect(screen.getByRole('menuitem')).toHaveAttribute('aria-label', 'test ascending');

    rerender(
      <Menu trigger={triggerComponent} isOpen onOpenChange={vi.fn()}>
        <SortItem {...defaultProps} sortDirection="desc" />
      </Menu>
    );
    expect(screen.getByRole('menuitem')).toHaveAttribute('aria-label', 'test descending');

    rerender(
      <Menu trigger={triggerComponent} isOpen onOpenChange={vi.fn()}>
        <SortItem {...defaultProps} sortDirection="none" />
      </Menu>
    );
    expect(screen.getByRole('menuitem')).toHaveAttribute('aria-label', 'test ');
  });

  it('should be disabled when disabled prop is true', () => {
    renderComponent({ disabled: true });
    expect(screen.getByRole('menuitem')).toHaveAttribute('aria-disabled', 'true');
  });
});
