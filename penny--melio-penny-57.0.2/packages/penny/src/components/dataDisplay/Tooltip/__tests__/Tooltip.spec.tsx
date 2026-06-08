/* eslint-disable max-lines */
import * as pennyUtils from '@melio/penny-utils';
import { screen, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { expect, vi } from 'vitest';

import { VisuallyHidden } from '@/components/accessibility/VisuallyHidden';
import { Button } from '@/components/action/Button';
import { IconButton } from '@/components/action/IconButton';
import { Modal } from '@/components/containers/modals/Modal';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { mockUseFloatingFocus } from '@/test-utils/mockUseFloatingFocus';
import { renderComponent } from '@/test-utils/render.utils';

import { Tooltip } from '../Tooltip';
import type { TooltipProps } from '../tooltip.types';

const label = 'Info button';

describe('Tooltip', () => {
  validateComponent(Tooltip, 'Tooltip', {
    props: {
      children: <IconButton data-testid="trigger" icon="help-circle" aria-label={label} />,
    },
    afterRenderCallback: async (res) => await res.user.hover(screen.getByLabelText(label)),
  });

  it('opens and closes on trigger hover', async () => {
    const { user } = renderComponent(
      <Tooltip content={label}>
        <IconButton data-testid="trigger" icon="help-circle" aria-label={label} />
      </Tooltip>
    );

    // Get the trigger element and check initial closed state
    const trigger = screen.getByLabelText(label);
    expect(trigger).toHaveAttribute('data-state', 'closed');
    expect(screen.queryByText(label)).not.toBeInTheDocument();

    await user.hover(trigger);

    expect(trigger).toHaveAttribute('data-state', 'open');
    expect(screen.getByText(label)).toBeInTheDocument();

    await user.unhover(trigger);

    await waitFor(() => {
      expect(trigger).toHaveAttribute('data-state', 'closed');
      expect(screen.queryByText(label)).not.toBeInTheDocument();
    });
  });

  it("doesn't show the tooltip when is not enabled", async () => {
    const { user } = renderComponent(
      <Tooltip content={label} isEnabled={false}>
        <IconButton data-testid="trigger" icon="help-circle" aria-label={label} />
      </Tooltip>
    );

    expect(screen.getByLabelText(label)).toHaveAttribute('data-state', 'closed');
    expect(screen.queryByText(label)).not.toBeInTheDocument();

    await user.hover(screen.getByLabelText(label));

    expect(screen.getByLabelText(label)).toHaveAttribute('data-state', 'closed');
    expect(screen.queryByText(label)).not.toBeInTheDocument();
  });

  it('focuses on the trigger when the tab key is pressed', async () => {
    const { user } = renderComponent(
      <Tooltip content={label}>
        <IconButton icon="help-circle" aria-label={label} />
      </Tooltip>
    );

    await user.click(document.body);
    await user.tab();

    expect(screen.getByLabelText(label)).toHaveFocus();
  });

  it('wraps the trigger with a tabbable wrapper if `shouldAddTriggerFocus` is true', async () => {
    const { user } = renderComponent(
      <Tooltip content={label} shouldAddTriggerFocus>
        <IconButton icon="help-circle" aria-label={label} isDisabled data-testid="test-button" />
      </Tooltip>
    );

    await user.click(document.body);
    await user.tab();
    expect(screen.getByTestId('tooltip-trigger-wrapper')).toHaveFocus();
    expect(screen.getByTestId('test-button')).not.toHaveFocus();
  });

  it('when dontDescribeChild is true, the tooltip aria-describedby attribute is undefind when tooltip is open ', async () => {
    const { user, getByTestId } = renderComponent(
      <Tooltip content={label} dontDescribeChild triggerAriaLabel={label} data-testid="tooltip-content">
        <IconButton data-testid="trigger" icon="help-circle" />
      </Tooltip>
    );

    await user.hover(getByTestId('trigger'));
    expect(getByTestId('trigger')).not.toHaveAttribute('aria-describedby');
  });

  const renderWithTooltip = (children: ReactNode, tooltipProps?: Partial<TooltipProps>) =>
    renderComponent(
      <Tooltip content={label} {...tooltipProps}>
        {children}
      </Tooltip>
    );

  describe('controlled', () => {
    it('should show the tooltip when isOpen is true', () => {
      const { getByRole } = renderWithTooltip(<IconButton icon="help-circle" aria-label={label} />, { isOpen: true });

      expect(getByRole('button', { name: label })).toHaveAttribute('data-state', 'open');
    });

    it('invoke onOpenChange handler when hovering the button', async () => {
      const onOpenChange = vi.fn();
      const { getByRole, user } = renderWithTooltip(<IconButton icon="help-circle" aria-label={label} />, {
        onOpenChange,
      });

      await user.hover(getByRole('button', { name: label }));

      expect(onOpenChange).toHaveBeenCalled();
    });

    it('invoke onOpenChange handler when the button is focus', async () => {
      const onOpenChange = vi.fn();
      const { getByRole, user } = renderWithTooltip(<IconButton icon="help-circle" aria-label={label} />, {
        onOpenChange,
      });

      await user.hover(getByRole('button', { name: label }));

      expect(onOpenChange).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    mockUseFloatingFocus({
      beforeCallbackWrapper: beforeEach,
      restoreAllMocksCallbackWrapper: afterEach,
    });

    it('interactive element with tooltip is focusable and triggers the tooltip on focus', async () => {
      const { user, getByRole } = renderWithTooltip(<Button label="Button" />);

      const button = getByRole('button', { name: 'Button' });

      expect(button).toHaveAttribute('data-state', 'closed');
      expect(screen.queryByText(label)).not.toBeInTheDocument();

      await user.click(document.body);
      await user.tab();

      expect(button).toHaveFocus();

      expect(button).toHaveAttribute('data-state', 'open');
      expect(screen.getByText(label)).toBeInTheDocument();

      await user.tab();

      expect(button).not.toHaveFocus();

      await waitFor(() => {
        expect(button).toHaveAttribute('data-state', 'closed');
        expect(screen.queryByText(label)).not.toBeInTheDocument();
      });
    });

    it('tooltip closes when esc is pressed', async () => {
      const { user, getByRole } = renderWithTooltip(<Button label="Button" />);

      const button = getByRole('button', { name: 'Button' });

      expect(button).toHaveAttribute('data-state', 'closed');
      expect(screen.queryByText(label)).not.toBeInTheDocument();

      await user.click(document.body);
      await user.tab();

      expect(button).toHaveFocus();

      expect(button).toHaveAttribute('data-state', 'open');
      expect(screen.getByText(label)).toBeInTheDocument();

      await user.keyboard('{Esc}');

      await waitFor(() => {
        expect(button).toHaveAttribute('data-state', 'closed');
        expect(screen.queryByText(label)).not.toBeInTheDocument();
      });
    });
  });

  it('renders the preTitle', async () => {
    const preTitle = 'pre title';
    const triggerLabel = 'trigger label';
    const tooltipLabel = 'tooltip label';
    const { user } = renderComponent(
      <Tooltip
        content={
          <>
            <VisuallyHidden>{preTitle} tooltip</VisuallyHidden>
            {tooltipLabel}
          </>
        }
      >
        <IconButton data-testid="trigger" icon="help-circle" aria-label={triggerLabel} />
      </Tooltip>
    );

    const trigger = screen.getByLabelText(triggerLabel);
    expect(trigger).toHaveAttribute('data-state', 'closed');
    expect(screen.queryByText(`${preTitle} tooltip`)).not.toBeInTheDocument();
    expect(screen.queryByText(tooltipLabel)).not.toBeInTheDocument();

    await user.hover(trigger);
    expect(trigger).toHaveAttribute('data-state', 'open');

    const preTitleElement = screen.getByText(`${preTitle} tooltip`);
    const tooltipLabelElement = screen.getByText(tooltipLabel);

    expect(preTitleElement).toBeInTheDocument();
    expect(tooltipLabelElement).toBeInTheDocument();

    await user.unhover(trigger);

    await waitFor(() => {
      expect(trigger).toHaveAttribute('data-state', 'closed');
      expect(screen.queryByText(tooltipLabel)).not.toBeInTheDocument();
      expect(screen.queryByText(`${preTitle} tooltip`)).not.toBeInTheDocument();
    });
  });

  describe("tooltip content's portal", () => {
    it('tooltip content portal is rendered in the root body by default', async () => {
      const tooltipText = "Tooltip's content";
      const { getByRole, getByText, queryByText, user } = renderComponent(
        <Tooltip content={tooltipText}>
          <IconButton icon="help-circle" aria-label={label} />
        </Tooltip>
      );

      const trigger = getByRole('button', { name: label });
      expect(queryByText(tooltipText)).not.toBeInTheDocument();
      expect(document.body.querySelector('[data-floating-ui-portal]')).not.toBeInTheDocument();

      await user.hover(trigger);

      expect(trigger).toHaveAttribute('data-state', 'open');
      expect(getByText(tooltipText)).toBeInTheDocument();

      const tooltipPortal = document.body.querySelector('[data-floating-ui-portal]');

      expect(tooltipPortal?.parentElement).toBe(document.body);
      expect(tooltipPortal).toContainElement(getByText(tooltipText));
      expect(getByText(tooltipText)).toBeInTheDocument();
      expect(document.body.querySelectorAll('[data-floating-ui-portal]')).toHaveLength(1);
    });

    it("when rendering tooltip in modal, the tooltip content's portal renders as floating nested element in the modal", () => {
      const rootTriggerTooltipText = 'Click here to open the modal';
      const triggerInModalTooltipText = 'Tooltip content in modal';
      const triggerInModalLabel = 'Trigger in modal';

      const TestNestedTooltipFlow = () => (
        <>
          <Tooltip content={rootTriggerTooltipText} isOpen>
            <IconButton icon="help-circle" aria-label={label} />
          </Tooltip>
          <Modal header="headerText" onClose={vi.fn()} isOpen>
            <Tooltip content={triggerInModalTooltipText} isOpen>
              <IconButton icon="help-circle" aria-label={triggerInModalLabel} />
            </Tooltip>
          </Modal>
        </>
      );

      const { getByRole, getByText } = renderComponent(<TestNestedTooltipFlow />);

      const portals = document.body.querySelectorAll('[data-floating-ui-portal]');
      expect(portals).toHaveLength(3);

      const [rootTooltipPortal, modalPortal, tooltipPortalInModal] = Array.from(portals);

      expect(rootTooltipPortal?.parentElement).toBe(document.body);
      expect(modalPortal?.parentElement).toBe(document.body);

      expect(rootTooltipPortal).toContainElement(getByText(rootTriggerTooltipText));

      expect(modalPortal).toContainElement(getByRole('button', { name: triggerInModalLabel }));
      expect(modalPortal).toContainElement(tooltipPortalInModal as HTMLElement);

      expect(tooltipPortalInModal).toContainElement(getByText(triggerInModalTooltipText));
    });
  });

  it('tooltip in mobile device should be rendered in the root body without portal', () => {
    vi.spyOn(pennyUtils, 'isMobileDevice').mockImplementation(() => true);

    const tooltipText = "Tooltip's content";

    const { getByText } = renderComponent(
      <Tooltip content={tooltipText} isOpen>
        <IconButton icon="help-circle" aria-label={label} />
      </Tooltip>
    );

    expect(document.body.querySelector('[data-floating-ui-portal]')).not.toBeInTheDocument();
    expect(getByText(tooltipText)).toBeInTheDocument();
  });
});
