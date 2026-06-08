/* eslint-disable max-lines */
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from '@/components/action/Button';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { type ActionRendererProps } from '../components';
import { Popover } from '../Popover';

const description = 'I am a description';
const triggerText = 'Click me!';
const actionProps = {
  label: 'Got it',
  onClick: vi.fn(),
};
const actionRenderer = ({ onClose, ...props }: ActionRendererProps) => (
  <Button
    variant="secondary-inverse"
    size="small"
    {...props}
    {...actionProps}
    onClick={() => {
      onClose();
      actionProps.onClick();
    }}
  />
);

describe('Popover', () => {
  validateComponent(Popover, 'Popover', {
    props: {
      isOpen: true,
      children: triggerText,
      actionRenderer,
    },
    defaultDataTestId: 'popover',
  });

  it('opens and closes on trigger click', async () => {
    const { user } = renderComponent(
      <Popover triggerEvent="click" description={description} actionRenderer={actionRenderer}>
        {triggerText}
      </Popover>
    );

    expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'closed');
    expect(screen.queryByText(description)).not.toBeInTheDocument();

    await user.click(screen.getByText(triggerText));

    expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'open');
    expect(screen.getByText(description)).toBeInTheDocument();

    await user.click(screen.getByText(triggerText));

    expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'closed');
    await waitForElementToBeRemoved(screen.getByText(description));
  });

  it('closes on click away', async () => {
    const { user } = renderComponent(
      <Popover triggerEvent="click" description={description} actionRenderer={actionRenderer} defaultIsOpen>
        {triggerText}
      </Popover>
    );

    expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'open');
    expect(screen.getByText(description)).toBeInTheDocument();

    await user.click(document.body);

    expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'closed');

    await waitFor(() => {
      expect(screen.queryByText(description)).not.toBeInTheDocument();
    });
  });

  it('closes on action click and fires callback (`triggerEvent` === `click`)', async () => {
    const { user } = renderComponent(
      <Popover triggerEvent="click" description={description} defaultIsOpen actionRenderer={actionRenderer}>
        {triggerText}
      </Popover>
    );

    expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'open');
    expect(screen.getByText(description)).toBeInTheDocument();

    await user.click(screen.getByText(actionProps.label));

    expect(actionProps.onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'closed');

    await waitForElementToBeRemoved(screen.getByText(description));
  });

  it('opens and closes on trigger hover/unhover', async () => {
    const { user } = renderComponent(
      <Popover description={description} actionRenderer={actionRenderer}>
        {triggerText}
      </Popover>,
      { userEventOptions: { delay: 500 } }
    );

    expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'closed');
    expect(screen.queryByText(description)).not.toBeInTheDocument();

    await user.hover(screen.getByText(triggerText));

    expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'open');
    expect(screen.getByText(description)).toBeInTheDocument();

    await user.unhover(screen.getByText(triggerText));

    expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'closed');
    await waitForElementToBeRemoved(screen.getByText(description));
  });

  it('closes on action click and fires callback', async () => {
    const { user } = renderComponent(
      <Popover description={description} defaultIsOpen actionRenderer={actionRenderer}>
        {triggerText}
      </Popover>
    );

    expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'open');
    expect(screen.getByText(description)).toBeInTheDocument();

    await user.click(screen.getByText(actionProps.label));

    expect(actionProps.onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'closed');
  });

  it(`close button shows when the popover triggerEvent's prop set to click`, () => {
    const { getByTestId } = renderComponent(
      <Popover triggerEvent="click" description={description} defaultIsOpen actionRenderer={actionRenderer}>
        {triggerText}
      </Popover>
    );

    expect(getByTestId('popover-close')).toBeInTheDocument();
  });

  it('clicking on the popover text trigger fires `onOpenChange` with the correct arguments', async () => {
    const onOpenChange = vi.fn();

    const { getByText, user } = renderComponent(
      <Popover
        triggerEvent="click"
        description={description}
        actionRenderer={actionRenderer}
        onOpenChange={onOpenChange}
      >
        {triggerText}
      </Popover>
    );

    await user.click(getByText(triggerText));
    expect(onOpenChange).toBeCalledWith(true, 'children');
  });

  it('closing the popover on the close button fires `onOpenChange` with the correct triggerEvent', async () => {
    const onOpenChange = vi.fn();

    const { getByTestId, user } = renderComponent(
      <Popover
        triggerEvent="click"
        description={description}
        defaultIsOpen
        actionRenderer={actionRenderer}
        onOpenChange={onOpenChange}
      >
        {triggerText}
      </Popover>
    );

    await user.click(getByTestId('popover-close'));
    expect(onOpenChange).toBeCalledWith(false, 'close');
  });

  it('closing the popover on the CTA fires `onOpenChange` with the correct triggerEvent', async () => {
    const onOpenChange = vi.fn();

    const { user } = renderComponent(
      <Popover description={description} defaultIsOpen actionRenderer={actionRenderer} onOpenChange={onOpenChange}>
        {triggerText}
      </Popover>
    );

    await user.click(screen.getByText(actionProps.label));
    expect(actionProps.onClick).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toBeCalledWith(false, 'cta');
  });

  it('clicking outside the popover fires `onOpenChange` with the correct triggerEvent', async () => {
    const onOpenChange = vi.fn();

    const { user } = renderComponent(
      <Popover description={description} defaultIsOpen actionRenderer={actionRenderer} onOpenChange={onOpenChange}>
        {triggerText}
      </Popover>
    );

    await user.click(document.body);
    expect(onOpenChange).toBeCalledWith(false, 'outside');
  });

  describe('accessibility', () => {
    it('popover associated to title and description', async () => {
      const title = 'I am a title';
      const { getByTestId, getByRole } = renderComponent(
        <Popover
          triggerEvent="click"
          title={title}
          description={description}
          actionRenderer={actionRenderer}
          onOpenChange={vi.fn()}
          isOpen
        >
          {triggerText}
        </Popover>
      );

      const popover = getByTestId('popover');

      expect(popover).toContainElement(getByRole('heading', { name: title }));

      await waitFor(() => {
        expect(popover).toHaveAccessibleName(title);
        expect(popover).toHaveAccessibleDescription(description);
      });
    });

    it('popover without a title has an accessible name related to the provided aria-label', () => {
      const ariaLabel = 'I have no title but I have an accessible name';
      const { getByTestId, queryByRole } = renderComponent(
        <Popover
          triggerEvent="click"
          aria-label={ariaLabel}
          description={description}
          actionRenderer={actionRenderer}
          onOpenChange={vi.fn()}
          isOpen
        >
          {triggerText}
        </Popover>
      );

      const popover = getByTestId('popover');

      expect(popover).not.toContainElement(queryByRole('heading'));
      expect(popover).toHaveAccessibleName(ariaLabel);
    });
  });

  describe('Keyboard Navigation', () => {
    it('should tab over the popover elements when the trigger is hover', async () => {
      const { user } = renderComponent(
        <>
          <Popover description={description} actionRenderer={actionRenderer}>
            {triggerText}
          </Popover>
          <button data-testid="button">Button</button>
        </>
      );

      expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'closed');
      await user.tab();
      await user.keyboard('{enter}');
      expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'open');

      await waitFor(() => {
        expect(screen.getByTestId('popover-footer-button-action')).toHaveFocus();
      });

      await user.tab();
      expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'closed');
      expect(screen.getByTestId('button')).toHaveFocus();
    });

    it('should traverse backward when shift-tabbing when the trigger is hover', async () => {
      const { getByTestId, user } = renderComponent(
        <>
          <Popover description={description} actionRenderer={actionRenderer}>
            {triggerText}
          </Popover>
          <button data-testid="button">Button</button>
        </>
      );

      getByTestId('button').focus();

      expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'closed');

      await user.tab({ shift: true });
      await user.keyboard('{enter}');

      expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'open');

      await waitFor(() => {
        expect(screen.getByTestId('popover-footer-button-action')).toHaveFocus();
      });

      await user.tab({ shift: true });

      await waitFor(() => {
        expect(screen.getByText(triggerText)).toHaveFocus();
      });
    });

    it('should tab over the popover elements when the trigger is click', async () => {
      const { user } = renderComponent(
        <>
          <Popover description={description} actionRenderer={actionRenderer} triggerEvent="click">
            {triggerText}
          </Popover>
          <button data-testid="button">Button</button>
        </>
      );

      expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'closed');
      await user.tab();
      await user.keyboard('{enter}');
      expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'open');

      await waitFor(() => {
        expect(screen.getByTestId('popover-close')).toHaveFocus();
      });

      // Tab from close button
      await user.tab();
      // Tab from action
      await user.tab();
      expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'closed');
      expect(screen.getByTestId('button')).toHaveFocus();
    });

    it('should traverse backward when shift-tabbing when the trigger is click', async () => {
      const { getByTestId, user } = renderComponent(
        <>
          <Popover description={description} actionRenderer={actionRenderer} triggerEvent="click">
            {triggerText}
          </Popover>
          <button data-testid="button">Button</button>
        </>
      );

      getByTestId('button').focus();

      expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'closed');

      await user.tab({ shift: true });
      await user.keyboard('{enter}');

      expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'open');

      await waitFor(() => {
        expect(screen.getByTestId('popover-close')).toHaveFocus();
      });

      await user.tab({ shift: true });

      await waitFor(() => {
        expect(screen.getByText(triggerText)).toHaveFocus();
      });
    });

    it('should trap focus within the popover when `shouldTrapFocus` is true', async () => {
      const { user } = renderComponent(
        <>
          <Popover description={description} actionRenderer={actionRenderer} triggerEvent="click" shouldTrapFocus>
            {triggerText}
          </Popover>
          <button data-testid="button">Button</button>
        </>
      );

      expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'closed');
      await user.tab();
      await user.keyboard('{enter}');
      expect(screen.getByText(triggerText)).toHaveAttribute('data-state', 'open');

      await waitFor(() => {
        expect(screen.getByTestId('popover-close')).toHaveFocus();
      });

      // Tab from close button - wait for focus to move to action
      await user.tab();
      await waitFor(() => {
        expect(screen.getByTestId('popover-footer-button-action')).toHaveFocus();
      });

      // Tab from action - wait for focus to return to close button (focus trap)
      await user.tab();
      await waitFor(() => {
        expect(screen.getByTestId('popover-close')).toHaveFocus();
      });

      // Tab from close button returns to action button - wait for focus change
      await user.tab();
      await waitFor(() => {
        expect(screen.getByTestId('popover-footer-button-action')).toHaveFocus();
      });

      // Shift-tab from action button - wait for focus to return to close button
      await user.tab({ shift: true });
      await waitFor(() => {
        expect(screen.getByTestId('popover-close')).toHaveFocus();
      });
    });
  });
});
