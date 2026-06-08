import { Box } from '@chakra-ui/react';
import { act, screen, waitFor } from '@testing-library/react';
import { expect } from 'vitest';

import { Button } from '@/components/action/Button';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { FloatingMenu, FloatingMenuItem } from '..';
import type { FloatingMenuProps } from '../FloatingMenu.types';

describe('FloatingMenu', () => {
  const triggerComponent = <Button label="Button" data-testid="trigger" />;
  const contentComponent = <Box>Content</Box>;
  const onOpenChangeMock = vi.fn();

  validateComponent<FloatingMenuProps>(FloatingMenu, 'FloatingMenu', {
    props: {
      trigger: triggerComponent,
      content: contentComponent,
      isOpen: true,
      onOpenChange: onOpenChangeMock,
    },
  });

  it('calls `onOpenChange` when the trigger is clicked', async () => {
    const { user } = renderComponent(
      <FloatingMenu
        trigger={triggerComponent}
        isOpen={false}
        onOpenChange={onOpenChangeMock}
        content={contentComponent}
      />
    );
    await act(async () => user.click(screen.getByTestId('trigger')));
    expect(onOpenChangeMock).toBeCalledWith(true, 'trigger');
  });

  it('calls `onOpenChange` when the clicking outside', async () => {
    const { user } = renderComponent(
      <FloatingMenu trigger={triggerComponent} isOpen onOpenChange={onOpenChangeMock} content={contentComponent} />
    );
    await act(async () => user.click(document.querySelector('body') as HTMLElement));
    expect(onOpenChangeMock).toBeCalledWith(false, 'outside');
  });

  it('opens the menu when `isOpen` is true', () => {
    const { getByTestId } = renderComponent(
      <FloatingMenu trigger={triggerComponent} isOpen onOpenChange={onOpenChangeMock} content={contentComponent} />
    );
    expect(getByTestId('floating-menu-dropdown')).toBeVisible();
  });

  it("doesn't open the menu when `isOpen` is false", () => {
    const { queryByTestId } = renderComponent(
      <FloatingMenu
        trigger={triggerComponent}
        isOpen={false}
        onOpenChange={onOpenChangeMock}
        content={contentComponent}
      />
    );
    expect(queryByTestId('floating-menu-dropdown')).not.toBeInTheDocument();
  });

  it('shows the children, header and footer when the menu is open', () => {
    const { getByText } = renderComponent(
      <FloatingMenu
        trigger={triggerComponent}
        isOpen
        onOpenChange={onOpenChangeMock}
        header={<Box>Header</Box>}
        content={contentComponent}
        footer={<Box>Footer</Box>}
      />
    );
    expect(getByText('Header')).toBeVisible();
    expect(getByText('Footer')).toBeVisible();
    expect(getByText('Content')).toBeVisible();
  });

  it('should not propagate click event', async () => {
    const handleClick = vi.fn();
    const handleParentClick = vi.fn();
    const { getByTestId, user } = renderComponent(
      <Box onClick={handleParentClick}>
        <FloatingMenu
          trigger={triggerComponent}
          isOpen
          onOpenChange={onOpenChangeMock}
          content={
            <FloatingMenuItem onClick={handleClick} data-testid="floating-menu-item-0">
              Content
            </FloatingMenuItem>
          }
        />
      </Box>
    );

    await user.click(getByTestId('floating-menu-item-0'));

    expect(handleClick).toHaveBeenCalled();
    expect(handleParentClick).not.toHaveBeenCalled();
  });

  it('should not propagate keyboard event', async () => {
    const handleKeyDown = vi.fn();
    const handleParentKeyDown = vi.fn();
    const { getByTestId, user } = renderComponent(
      <Box data-testid="parent" onKeyDown={handleParentKeyDown}>
        <FloatingMenu
          trigger={triggerComponent}
          isOpen
          onOpenChange={onOpenChangeMock}
          header={<Box>Header</Box>}
          content={<Box onKeyDown={handleKeyDown} tabIndex={0} data-testid="child" />}
          footer={<Box>Footer</Box>}
        />
      </Box>
    );

    getByTestId('child').focus();

    await waitFor(() => {
      expect(getByTestId('child')).toHaveFocus();
    });

    await user.keyboard('{enter}');

    expect(handleKeyDown).toHaveBeenCalled();
    expect(handleParentKeyDown).not.toHaveBeenCalled();
  });
});
