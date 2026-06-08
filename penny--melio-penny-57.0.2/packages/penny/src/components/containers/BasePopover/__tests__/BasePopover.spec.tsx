import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';

import { Button } from '@/components/action/Button';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { BasePopover, BasePopoverBody, BasePopoverFooter, BasePopoverHeader } from '..';
import { description, renderBasePopover, triggerText } from './BasePopover.driver';

describe('BasePopover', () => {
  validateComponent(BasePopover, 'BasePopover', {
    props: {
      isOpen: true,
      trigger: triggerText,
    },
  });

  describe('when trigger click', () => {
    it('should open and close', async () => {
      const { user } = renderBasePopover({ triggerEvent: 'click' });

      expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'closed');
      expect(screen.queryByText(description)).not.toBeInTheDocument();

      await user.click(screen.getByText(triggerText));

      expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'open');
      expect(screen.getByText(description)).toBeInTheDocument();

      await user.click(screen.getByText(triggerText));

      expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'closed');
      await waitForElementToBeRemoved(screen.getByText(description));
    });

    it('should fire `onOpenChange` with the correct arguments', async () => {
      const onOpenChange = vi.fn();

      const { getByText, user } = renderBasePopover({ triggerEvent: 'click', onOpenChange });

      await user.click(getByText(triggerText));
      expect(onOpenChange).toBeCalledWith(true, 'children');
    });
  });

  describe('when click outside', () => {
    it('should close', async () => {
      const { user } = renderBasePopover({ triggerEvent: 'click', defaultIsOpen: true });

      expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'open');
      expect(screen.getByText(description)).toBeInTheDocument();

      await user.click(document.body);

      expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'closed');

      await waitFor(() => {
        expect(screen.queryByText(description)).not.toBeInTheDocument();
      });
    });

    it('should fire `onOpenChange` with the correct triggerEvent', async () => {
      const onOpenChange = vi.fn();

      const { user } = renderBasePopover({ triggerEvent: 'click', defaultIsOpen: true, onOpenChange });

      await user.click(document.body);
      expect(onOpenChange).toBeCalledWith(false, 'outside');
    });
  });

  describe('when hover/unhover trigger', () => {
    it('should open and close', async () => {
      const { user } = renderBasePopover({});

      expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'closed');
      expect(screen.queryByText(description)).not.toBeInTheDocument();

      await user.hover(screen.getByText(triggerText));

      await waitFor(() => expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'open'));
      expect(screen.getByText(description)).toBeInTheDocument();

      await user.unhover(screen.getByText(triggerText));

      await waitFor(() => expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'closed'));
      await waitForElementToBeRemoved(screen.getByText(description));
    });
  });

  describe('when click close button', () => {
    it('should fire `onOpenChange` with the correct triggerEvent', async () => {
      const onOpenChange = vi.fn();

      const { getByTestId, user } = renderBasePopover({ triggerEvent: 'click', defaultIsOpen: true, onOpenChange });

      await user.click(getByTestId('base-popover-close'));
      expect(onOpenChange).toBeCalledWith(false, 'close');
    });
  });

  describe('accessibility', () => {
    it('popover is associated with its header and body', async () => {
      const title = 'I am a title';
      const { getByTestId, getByText } = renderBasePopover({
        triggerEvent: 'click',
        children: (
          <>
            <BasePopoverHeader>{title}</BasePopoverHeader>
            <BasePopoverBody>{description}</BasePopoverBody>
          </>
        ),
        isOpen: true,
      });

      const popover = getByTestId('base-popover');

      expect(popover).toContainElement(getByText(title));
      await waitFor(() => {
        expect(popover).toHaveAccessibleName(title);
        expect(popover).toHaveAccessibleDescription(description);
      });
    });

    it('when no title has an accessible name related to the provided aria-label', () => {
      const ariaLabel = 'I have no title but I have an accessible name';
      const { getByTestId, queryByRole } = renderBasePopover({
        triggerEvent: 'click',
        children: <BasePopoverBody>{description}</BasePopoverBody>,
        isOpen: true,
        'aria-label': ariaLabel,
      });

      const popover = getByTestId('base-popover');

      expect(popover).not.toContainElement(queryByRole('heading'));
      expect(popover).toHaveAccessibleName(ariaLabel);
    });
  });

  describe('Keyboard Navigation', () => {
    const anotherButtonText = 'another button';
    const getAnotherButton = () => screen.getByRole('button', { name: anotherButtonText });

    function rendererWithButtonAfter(children: ReactNode) {
      return (
        <>
          {children}
          <Button label={anotherButtonText} />
        </>
      );
    }

    describe('when hitting tab', () => {
      describe('and hover trigger', () => {
        it('should navigate forward', async () => {
          const { user, getByTestId } = renderBasePopover({ renderer: rendererWithButtonAfter });

          await user.tab();
          await user.keyboard('{enter}');

          await waitFor(() => {
            expect(getByTestId('base-popover-close')).toHaveFocus();
          });

          await user.tab();

          await waitFor(() => {
            expect(getAnotherButton()).toHaveFocus();
            expect(getByTestId('base-popover-close')).not.toHaveFocus();
          });
        });
      });

      describe('and click trigger', () => {
        it('navigate forward', async () => {
          const { user, getByTestId } = renderBasePopover({ triggerEvent: 'click', renderer: rendererWithButtonAfter });

          await user.tab();
          await user.keyboard('{enter}');

          await waitFor(() => {
            expect(getByTestId('base-popover-close')).toHaveFocus();
          });

          await user.tab();

          await waitFor(() => {
            expect(getAnotherButton()).toHaveFocus();
            expect(getByTestId('base-popover-close')).not.toHaveFocus();
          });
        });
      });

      describe('and `shouldTrapFocus` is true', () => {
        it('should trap focus within the popover', async () => {
          const popoverContent = (
            <>
              <BasePopoverHeader>Title</BasePopoverHeader>
              <BasePopoverFooter>
                <Button label="Footer click" />
              </BasePopoverFooter>
            </>
          );
          const { user, getByTestId } = renderBasePopover({
            shouldTrapFocus: true,
            children: popoverContent,
            renderer: rendererWithButtonAfter,
          });

          await user.tab();
          await user.keyboard('{enter}');

          await waitFor(() => {
            expect(getByTestId('base-popover-close')).toHaveFocus();
          });

          // Tab from close button - wait for focus to move to action
          await user.tab();
          await waitFor(() => {
            expect(screen.getByRole('button', { name: 'Footer click' })).toHaveFocus();
          });

          // Tab from action - wait for focus to return to close button (focus trap)
          await user.tab();
          await waitFor(() => {
            expect(getByTestId('base-popover-close')).toHaveFocus();
          });

          // Tab from close button returns to action button - wait for focus change
          await user.tab();
          await waitFor(() => {
            expect(screen.getByRole('button', { name: 'Footer click' })).toHaveFocus();
          });

          // Shift-tab from action button - wait for focus to return to close button
          await user.tab({ shift: true });
          await waitFor(() => {
            expect(getByTestId('base-popover-close')).toHaveFocus();
          });
        });
      });
    });

    describe('when hitting shift + tab', () => {
      describe('and hover trigger', () => {
        it('should navigate backwards', async () => {
          const { user, getByTestId } = renderBasePopover({ renderer: rendererWithButtonAfter });

          getAnotherButton().focus();

          await user.tab({ shift: true });
          await user.keyboard('{enter}');

          await waitFor(() => {
            expect(getByTestId('base-popover-close')).toHaveFocus();
          });

          await user.tab({ shift: true });

          await waitFor(() => {
            expect(screen.getByText(triggerText)).toHaveFocus();
          });
        });
      });

      describe('and click trigger', () => {
        it('should navigate backwards', async () => {
          const { user, getByTestId } = renderBasePopover({ triggerEvent: 'click', renderer: rendererWithButtonAfter });

          getAnotherButton().focus();

          await user.tab({ shift: true });
          await user.keyboard('{enter}');

          await waitFor(() => {
            expect(getByTestId('base-popover-close')).toHaveFocus();
          });

          await user.tab({ shift: true });

          await waitFor(() => {
            expect(screen.getByText(triggerText)).toHaveFocus();
          });
        });
      });
    });
  });
});
