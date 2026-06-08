import { Box } from '@chakra-ui/react';
import { act, screen } from '@testing-library/react';
import { expect } from 'vitest';

import { Button } from '@/components/action/Button';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { FlatMenu, FlatMenuItem } from '.';
import { type FlatMenuProps } from './FlatMenu.types';

describe('FlatMenu', () => {
  const triggerComponent = <Button label="Button" data-testid="trigger" />;
  const contentComponent = <Box>Content</Box>;
  const onOpenChangeMock = vi.fn();

  validateComponent<FlatMenuProps>(FlatMenu, 'FlatMenu', {
    props: {
      trigger: triggerComponent,
      content: contentComponent,
      isOpen: true,
      onOpenChange: onOpenChangeMock,
    },
  });

  it('calls `onOpenChange` when the trigger is clicked', async () => {
    const { user } = renderComponent(
      <FlatMenu trigger={triggerComponent} isOpen={false} onOpenChange={onOpenChangeMock} content={contentComponent} />
    );
    await act(async () => user.click(screen.getByTestId('trigger')));
    expect(onOpenChangeMock).toHaveBeenCalledWith(true, 'trigger');
  });

  it('calls `onOpenChange` when clicking outside', async () => {
    const { user } = renderComponent(
      <FlatMenu trigger={triggerComponent} isOpen onOpenChange={onOpenChangeMock} content={contentComponent} />
    );
    await act(async () => user.click(document.querySelector('body') as HTMLElement));
    expect(onOpenChangeMock).toHaveBeenCalledWith(false, 'outside');
  });

  it('opens the menu when `isOpen` is true', () => {
    const { getByTestId } = renderComponent(
      <FlatMenu trigger={triggerComponent} isOpen onOpenChange={onOpenChangeMock} content={contentComponent} />
    );
    expect(getByTestId('flat-menu-container')).toBeVisible();
  });

  it("doesn't open the menu when `isOpen` is false", () => {
    const { queryByTestId } = renderComponent(
      <FlatMenu trigger={triggerComponent} isOpen={false} onOpenChange={onOpenChangeMock} content={contentComponent} />
    );
    expect(queryByTestId('flat-menu-container')).not.toBeInTheDocument();
  });

  it('shows the content, title and footer when the menu is open', () => {
    const { getByText } = renderComponent(
      <FlatMenu
        trigger={triggerComponent}
        isOpen
        onOpenChange={onOpenChangeMock}
        content={contentComponent}
        header={<Box>Header</Box>}
        footer={<Box>Footer</Box>}
      />
    );
    expect(getByText('Header')).toBeVisible();
    expect(getByText('Footer')).toBeVisible();
    expect(getByText('Content')).toBeVisible();
  });

  it('should not propagate click event from menu items', async () => {
    const handleClick = vi.fn();
    const handleParentClick = vi.fn();
    const { getByTestId, user } = renderComponent(
      <Box onClick={handleParentClick}>
        <FlatMenu
          trigger={triggerComponent}
          isOpen
          onOpenChange={onOpenChangeMock}
          content={
            <FlatMenuItem onClick={handleClick} data-testid="menu-item">
              Content
            </FlatMenuItem>
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
      <FlatMenu
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
      <FlatMenu
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
});
