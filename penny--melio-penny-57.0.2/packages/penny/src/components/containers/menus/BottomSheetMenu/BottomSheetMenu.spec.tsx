import { Box } from '@chakra-ui/react';
import { act, screen, waitFor } from '@testing-library/react';
import { expect } from 'vitest';

import { Button } from '@/components/action/Button';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { waitForBaseSheetOpenTransitionComplete } from '../../BaseSheet/__tests__/BaseSheet.driver';
import { BottomSheetMenu, BottomSheetMenuDropdownList, BottomSheetMenuFooter, BottomSheetMenuItem } from '.';
import { type BottomSheetMenuProps } from './BottomSheetMenu.types';

describe('BottomSheetMenu', () => {
  const triggerComponent = <Button label="Button" data-testid="trigger" />;
  const contentComponent = <Box>Content</Box>;
  const onOpenChangeMock = vi.fn();

  validateComponent<BottomSheetMenuProps>(BottomSheetMenu, 'BottomSheetMenu', {
    props: {
      trigger: triggerComponent,
      content: contentComponent,
      isOpen: true,
      onOpenChange: onOpenChangeMock,
    },
  });

  it('calls `onOpenChange` when the trigger is clicked', async () => {
    const { user } = renderComponent(
      <BottomSheetMenu
        trigger={triggerComponent}
        isOpen={false}
        onOpenChange={onOpenChangeMock}
        content={contentComponent}
      />
    );
    await act(async () => user.click(screen.getByTestId('trigger')));
    expect(onOpenChangeMock).toHaveBeenCalledWith(true, 'trigger');
  });

  it('calls `onOpenChange` when clicking outside', async () => {
    const { user } = renderComponent(
      <BottomSheetMenu trigger={triggerComponent} isOpen onOpenChange={onOpenChangeMock} content={contentComponent} />
    );
    await act(async () => user.click(document.querySelector('body') as HTMLElement));

    // Clicking outside does not dismiss BottomSheetMenu because BottomSheet is responsible for handling its own dismissal, and BottomSheet doesn't support close reason.
    expect(onOpenChangeMock).toHaveBeenCalledWith(false, undefined);
  });

  it('opens the menu when `isOpen` is true', () => {
    const { getByTestId } = renderComponent(
      <BottomSheetMenu trigger={triggerComponent} isOpen onOpenChange={onOpenChangeMock} content={contentComponent} />
    );
    expect(getByTestId('bottom-sheet-menu-dropdown-list')).toBeVisible();
  });

  it("doesn't open the menu when `isOpen` is false", () => {
    const { queryByTestId } = renderComponent(
      <BottomSheetMenu
        trigger={triggerComponent}
        isOpen={false}
        onOpenChange={onOpenChangeMock}
        content={contentComponent}
      />
    );
    expect(queryByTestId('bottom-sheet-menu-dropdown-list')).not.toBeInTheDocument();
  });

  it('shows the content, title and footer when the menu is open', () => {
    const { getByText } = renderComponent(
      <BottomSheetMenu
        trigger={triggerComponent}
        isOpen
        onOpenChange={onOpenChangeMock}
        content={contentComponent}
        title="Title"
        footer={<Box>Footer</Box>}
      />
    );
    expect(getByText('Title')).toBeVisible();
    expect(getByText('Footer')).toBeVisible();
    expect(getByText('Content')).toBeVisible();
  });

  it('should not propagate click event from menu items', async () => {
    const handleClick = vi.fn();
    const handleParentClick = vi.fn();
    const { getByTestId, user } = renderComponent(
      <Box onClick={handleParentClick}>
        <BottomSheetMenu
          trigger={triggerComponent}
          isOpen
          onOpenChange={onOpenChangeMock}
          content={
            <BottomSheetMenuItem onClick={handleClick} data-testid="menu-item">
              Content
            </BottomSheetMenuItem>
          }
        />
      </Box>
    );

    await user.click(getByTestId('menu-item'));

    expect(handleClick).toHaveBeenCalled();
    expect(handleParentClick).not.toHaveBeenCalled();
  });

  it('handles disabled state correctly', () => {
    const { getByTestId } = renderComponent(
      <BottomSheetMenu
        trigger={triggerComponent}
        isOpen={false}
        onOpenChange={onOpenChangeMock}
        content={contentComponent}
        isDisabled
      />
    );
    const trigger = getByTestId('trigger');
    expect(trigger).toHaveAttribute('aria-disabled', 'true');
  });

  it('handles read-only state correctly', () => {
    const { getByTestId } = renderComponent(
      <BottomSheetMenu
        trigger={triggerComponent}
        isOpen={false}
        onOpenChange={onOpenChangeMock}
        content={contentComponent}
        isReadOnly
      />
    );
    const trigger = getByTestId('trigger');
    expect(trigger).toHaveAttribute('data-readonly', 'true');
  });

  it('applies custom aria-label to close button', () => {
    const customLabel = 'Custom Close Label';
    const { getByTestId } = renderComponent(
      <BottomSheetMenu
        trigger={triggerComponent}
        isOpen
        onOpenChange={onOpenChangeMock}
        content={contentComponent}
        closeButtonAriaLabel={customLabel}
      />
    );
    expect(getByTestId('sheet-close-button')).toHaveAttribute('aria-label', customLabel);
  });

  describe('Navigation', () => {
    const mockItems = (
      <BottomSheetMenuDropdownList paddingY="xs">
        <BottomSheetMenuItem>Item 1</BottomSheetMenuItem>
        <BottomSheetMenuItem>Item 2</BottomSheetMenuItem>
        <BottomSheetMenuItem>Item 3</BottomSheetMenuItem>
      </BottomSheetMenuDropdownList>
    );

    it('Focus on the close button on open', async () => {
      const { getByTestId } = renderComponent(
        <BottomSheetMenu trigger={triggerComponent} isOpen onOpenChange={onOpenChangeMock} content={mockItems} />
      );
      await waitFor(() => expect(getByTestId('sheet-close-button')).toHaveFocus());
    });
    it('Focus on the first menu item when pressing ArrowDown once', async () => {
      const { user } = renderComponent(
        <BottomSheetMenu trigger={triggerComponent} isOpen onOpenChange={onOpenChangeMock} content={mockItems} />
      );
      await waitForBaseSheetOpenTransitionComplete();

      await user.keyboard('[ArrowDown]');

      await waitFor(() => expect(screen.getAllByRole('menuitem')[0]).toHaveFocus());
    });

    it('Focus on the menu items when navigate with Arrow keys', async () => {
      const { user } = renderComponent(
        <BottomSheetMenu trigger={triggerComponent} isOpen onOpenChange={onOpenChangeMock} content={mockItems} />
      );
      await waitForBaseSheetOpenTransitionComplete();
      await user.keyboard('[ArrowDown]');
      await waitFor(() => expect(screen.getAllByRole('menuitem')[0]).toHaveFocus());
      await user.keyboard('[ArrowDown]');
      await waitFor(() => expect(screen.getAllByRole('menuitem')[1]).toHaveFocus());
      await user.keyboard('[ArrowDown]');
      await waitFor(() => expect(screen.getAllByRole('menuitem')[2]).toHaveFocus());
    });

    it('Focus on footer when navigate with tabs', async () => {
      const { getByTestId, user } = renderComponent(
        <BottomSheetMenu
          trigger={triggerComponent}
          isOpen
          onOpenChange={onOpenChangeMock}
          content={mockItems}
          footer={
            <BottomSheetMenuFooter>
              <Button label="Click the footer!" data-testid="footer-component" />
            </BottomSheetMenuFooter>
          }
        />
      );
      await waitForBaseSheetOpenTransitionComplete();
      await act(async () => user.tab());
      await waitFor(() => expect(getByTestId('footer-component')).toHaveFocus());
    });
  });
});
