import { Box } from '@chakra-ui/react';
import { screen } from '@testing-library/react';
import { expect } from 'vitest';

import { Button } from '@/components/action/Button';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { FloatingMenu, FloatingMenuSelectionItem } from '../../FloatingMenu';
import { SelectionItem } from '../components/SelectionItem/SelectionItem';
import { type SelectionItemProps } from '../components/SelectionItem/SelectionItem.types';

describe('SelectionItem', () => {
  const triggerComponent = <Button label="Button" data-testid="trigger" />;
  const itemContent = <Box>Item</Box>;
  const onOpenChangeMock = vi.fn();
  const onClickMock = vi.fn();

  validateComponent<SelectionItemProps>(SelectionItem, 'SelectionItem', {
    props: {
      onClick: onClickMock,
      children: 'Item',
    },
    wrapper: ({ children, ...props }) => (
      <FloatingMenu
        trigger={triggerComponent}
        isOpen
        onOpenChange={vi.fn()}
        content={<Box>{children}</Box>}
        {...props}
      />
    ),
    skipRefCheck: true,
  });

  describe('Single Selection', () => {
    function renderSingleSelection(itemProps: Partial<SelectionItemProps> = {}) {
      const result = renderComponent(
        <FloatingMenu
          trigger={triggerComponent}
          isOpen
          onOpenChange={onOpenChangeMock}
          content={
            <FloatingMenuSelectionItem onClick={onClickMock} data-testid="floating-menu-item-0" {...itemProps}>
              {itemContent}
            </FloatingMenuSelectionItem>
          }
        />
      );

      return {
        ...result,
        item: screen.getByTestId('floating-menu-item-0'),
      };
    }

    it('calls `onClick` when the item is clicked', async () => {
      const { user, item } = renderSingleSelection();
      await user.click(item);
      expect(onClickMock).toBeCalledTimes(1);
    });

    it('calls `onClick` when pressing Enter', async () => {
      const { item, user } = renderSingleSelection();

      item.focus();
      await user.keyboard('{enter}');
      expect(onClickMock).toBeCalledTimes(1);
    });

    it('adds data-selected attribute to the selected item', () => {
      const { item } = renderSingleSelection({ isSelected: true });

      expect(item).toHaveAttribute('data-selected', 'true');
    });

    it('does not call the menu item click event if the item is disabled', async () => {
      const handleClick = vi.fn();

      const { user, item } = renderSingleSelection({ onClick: handleClick, disabled: true });

      await user.click(item);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Multi Selection', () => {
    function renderMultiSelection(itemProps: Partial<SelectionItemProps> = {}) {
      const result = renderComponent(
        <FloatingMenu
          trigger={triggerComponent}
          isOpen
          onOpenChange={onOpenChangeMock}
          content={
            <FloatingMenuSelectionItem isMulti onClick={onClickMock} data-testid="floating-menu-item-0" {...itemProps}>
              {itemContent}
            </FloatingMenuSelectionItem>
          }
        />
      );

      return {
        ...result,
        item: screen.getByTestId('floating-menu-item-0'),
      };
    }

    it('calls `onClick` when the item is clicked', async () => {
      const { user, item } = renderMultiSelection();
      await user.click(item);
      expect(onClickMock).toBeCalledTimes(1);
    });

    it('calls `onClick` when pressing Enter', async () => {
      const { item, user } = renderMultiSelection();

      item.focus();
      await user.keyboard('{enter}');
      expect(onClickMock).toBeCalledTimes(1);
    });

    it('adds data-selected attribute to the selected item', () => {
      const { item } = renderMultiSelection({ isSelected: true });

      expect(item).toHaveAttribute('data-selected', 'true');
    });

    it('does not call the menu item click event if the item is disabled', async () => {
      const handleClick = vi.fn();

      const { user, item } = renderMultiSelection({ onClick: handleClick, disabled: true });

      await user.click(item);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
