/* eslint-disable max-lines */
import { act, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { expect } from 'vitest';

import { Button } from '@/components/action/Button';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { Tourtip } from '../Tourtip';
import type { TourtipProps, TourtipSteps } from '../Tourtip.types';

const defaultLabels = {
  nextButtonLabel: 'Next',
  prevButtonLabel: 'Prev',
};

const steps: TourtipSteps = [
  {
    title: 'Step 1 title',
    description: 'Step 1 description',
    target: '[data-testid="Start tour"]',
    beaconAriaLabel: 'Start tour',
  },
  {
    title: 'Step 2 title',
    description: 'Step 2 description',
    target: '[data-testid="Look here"]',
    beaconAriaLabel: 'Look here',
  },
];

const defaultProps = { defaultLabels, steps };

describe('Tourtip', () => {
  const waitForPosition = async () => act(async () => {}); // reference: https://floating-ui.com/docs/react#testing

  const ValidateTourtip = (props: TourtipProps) => (
    <>
      <Tourtip {...props} />
      <Button label="Start tour" data-testid="Start tour" />
    </>
  );
  ValidateTourtip.displayName = 'Tourtip';

  validateComponent(ValidateTourtip, 'Tourtip', {
    skipRefCheck: true,
    props: { ...defaultProps, enableMinimize: true },
    defaultDataTestId: 'tourtip',
    componentParts: ['beacon-0', 'popover-0'],
    beforeRenderCallback: () => {
      window.HTMLElement.prototype.scrollIntoView = () => {};
    },
    afterRenderCallback: async () => await waitForPosition(),
  });

  it('default render correctly, and calls to `onTourStarted` callback', async () => {
    const mockOnTourStart = vi.fn();

    window.HTMLElement.prototype.scrollIntoView = () => {};
    renderComponent(
      <>
        <Tourtip {...defaultProps} onTourStart={mockOnTourStart} />
        <Button label="Start tour" data-testid="Start tour" />
      </>
    );

    await waitForPosition();

    expect(screen.getByTestId('tourtip-beacon-0')).toHaveAttribute('data-state', 'open');
    expect(mockOnTourStart).toHaveBeenCalled();
  });
  it('When enableMinimize is true, the tourtip is show by default, click outside triggers `onTourMinimize` and minimize the tourtip and click on the beacon triggers `onBeaconClick` callback', async () => {
    const mockOnBeaconClick = vi.fn();
    const mockOnMinimize = vi.fn();
    const { user } = renderComponent(
      <>
        <Tourtip {...defaultProps} onBeaconClick={mockOnBeaconClick} onTourMinimize={mockOnMinimize} enableMinimize />
        <Button label="Start tour" data-testid="Start tour" />
      </>
    );

    await waitForPosition();

    expect(screen.getByTestId('tourtip-beacon-0')).toBeInTheDocument();
    expect(screen.getByTestId('tourtip-beacon-0')).toHaveAttribute('data-state', 'open');

    await act(async () => user.click(document.querySelector('body') as HTMLElement));
    expect(mockOnMinimize).toHaveBeenCalled();
    expect(screen.getByTestId('tourtip')).toHaveAttribute('data-state', 'closed');
    expect(screen.getByTestId('tourtip-beacon-0')).toHaveAttribute('data-state', 'closed');

    await act(async () => user.click(screen.getByTestId('tourtip-beacon-0')));
    expect(mockOnBeaconClick).toHaveBeenCalled();
    expect(screen.getByTestId('tourtip-beacon-0')).toHaveAttribute('data-state', 'open');
  });
  it('when enableMinimize and defaultIsMinimize are set to true click on the beacon triggers `onBeaconClick` callback, click outside triggers `onTourMinimize`', async () => {
    const mockOnBeaconClick = vi.fn();
    const mockOnMinimize = vi.fn();
    const { user } = renderComponent(
      <>
        <Tourtip
          {...defaultProps}
          onBeaconClick={mockOnBeaconClick}
          onTourMinimize={mockOnMinimize}
          enableMinimize
          defaultIsMinimize
        />
        <Button label="Start tour" data-testid="Start tour" />
      </>
    );

    await waitForPosition();

    expect(screen.getByTestId('tourtip-beacon-0')).toBeInTheDocument();
    expect(screen.getByTestId('tourtip-beacon-0')).toHaveAttribute('data-state', 'closed');

    await act(async () => user.click(screen.getByTestId('tourtip-beacon-0')));
    expect(mockOnBeaconClick).toHaveBeenCalled();
    expect(screen.getByTestId('tourtip-beacon-0')).toHaveAttribute('data-state', 'open');

    await act(async () => user.click(document.querySelector('body') as HTMLElement));
    expect(mockOnMinimize).toHaveBeenCalled();
    expect(screen.getByTestId('tourtip')).toHaveAttribute('data-state', 'closed');
    expect(screen.getByTestId('tourtip-beacon-0')).toHaveAttribute('data-state', 'closed');
  });
  it('should display the tourtip according to the given default step index ', async () => {
    renderComponent(
      <>
        <Tourtip {...defaultProps} defaultStepIndex={1} />
        <Button label="Start tour" data-testid="Start tour" />
        <Button label="Look here" data-testid="Look here" />
      </>
    );

    await waitForPosition();

    expect(screen.getByTestId('tourtip-beacon-1')).toBeInTheDocument();
    expect(screen.getByTestId('tourtip-beacon-1')).toHaveAttribute('data-state', 'open');
  });
  it('click next and prev buttons should work properly and triggers `onNextClick` and `onPrevClick` callbacks ', async () => {
    const mockOnNextClick = vi.fn();
    const mockOnPrevClick = vi.fn();

    const { user } = renderComponent(
      <>
        <Tourtip {...defaultProps} onNextClick={mockOnNextClick} onPrevClick={mockOnPrevClick} />
        <Button label="Start tour" data-testid="Start tour" />
        <Button label="Look here" data-testid="Look here" />
      </>
    );

    await waitForPosition();

    expect(screen.getByTestId('tourtip-beacon-0')).toHaveAttribute('data-state', 'open');

    await act(async () => user.click(screen.getByTestId('tourtip-popover-0-footer-button-action')));

    expect(mockOnNextClick).toHaveBeenCalled();
    await waitForPosition();
    expect(screen.getByTestId('tourtip-beacon-1')).toHaveAttribute('data-state', 'open');

    await act(async () => user.click(screen.getByTestId('tourtip-popover-1-footer-button-back')));

    expect(mockOnPrevClick).toHaveBeenCalled();
    await waitForPosition();
    expect(screen.getByTestId('tourtip-beacon-0')).toHaveAttribute('data-state', 'open');
  });

  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => null);
    vi.spyOn(console, 'error').mockImplementation(() => null);
  });

  it("When step's target is not found `onTargetNotFound` callback", async () => {
    const mockOnTargetNotFound = vi.fn();
    renderComponent(
      <>
        <Tourtip {...defaultProps} steps={steps} onTargetNotFound={mockOnTargetNotFound} />
      </>
    );

    await waitForPosition();

    expect(mockOnTargetNotFound).toHaveBeenCalled();
  });
  it('click on the last step triggers `onTourComplete` callback', async () => {
    const mockOnTourComplete = vi.fn();
    const { user } = renderComponent(
      <>
        <Tourtip {...defaultProps} steps={steps} defaultStepIndex={1} onTourComplete={mockOnTourComplete} />
        <Button label="Start tour" data-testid="Start tour" />
        <Button label="Look here" data-testid="Look here" />
      </>
    );

    await waitForPosition();

    await act(async () => user.click(screen.getByTestId('tourtip-popover-1-footer-button-action')));

    await waitForPosition();

    expect(mockOnTourComplete).toHaveBeenCalled();
  });
  it('has a back button when default step is the last step', async () => {
    const mockOnTourComplete = vi.fn();
    renderComponent(
      <>
        <Tourtip {...defaultProps} steps={steps} defaultStepIndex={1} onTourComplete={mockOnTourComplete} />
        <Button label="Start tour" data-testid="Start tour" />
        <Button label="Look here" data-testid="Look here" />
      </>
    );

    await waitForPosition();
    expect(screen.getByTestId('tourtip-popover-1-footer-button-back')).toBeInTheDocument();
  });
  it('has a back button when step is the last step', async () => {
    const mockOnTourComplete = vi.fn();
    renderComponent(
      <>
        <Tourtip
          {...defaultProps}
          steps={steps}
          stepIndex={1}
          onNextClick={vi.fn()}
          onPrevClick={vi.fn()}
          onTargetNotFound={vi.fn()}
          onTourComplete={mockOnTourComplete}
        />
        <Button label="Start tour" data-testid="Start tour" />
        <Button label="Look here" data-testid="Look here" />
      </>
    );

    await waitForPosition();
    expect(screen.getByTestId('tourtip-popover-1-footer-button-back')).toBeInTheDocument();
  });
  it("Click on Tourtip's close button, triggers `onTourDismiss`", async () => {
    const mockOnTourDismiss = vi.fn();
    const { user } = renderComponent(
      <>
        <Tourtip {...defaultProps} onTourDismiss={mockOnTourDismiss} />
        <Button label="Start tour" data-testid="Start tour" />
      </>
    );

    await waitForPosition();

    expect(screen.getByTestId('tourtip-beacon-0')).toHaveAttribute('data-state', 'open');

    await act(async () => user.click(screen.getByTestId('tourtip-popover-0-close')));

    expect(mockOnTourDismiss).toHaveBeenCalled();
    expect(screen.getByTestId('tourtip')).toHaveAttribute('data-state', 'closed');
  });

  it('should restart the tour after being dismissed', async () => {
    const TestWrapper = () => {
      const [run, setRun] = useState(true);

      return (
        <>
          <Tourtip
            {...defaultProps}
            run={run}
            onTourDismiss={() => {
              setRun(false); // simulate dismissing
              setTimeout(() => setRun(true), 0); // simulate restart (could be button click, etc.)
            }}
          />
          <Button label="Start tour" data-testid="Start tour" />
        </>
      );
    };

    const { user } = renderComponent(<TestWrapper />);

    await waitForPosition();

    expect(screen.getByTestId('tourtip')).toHaveAttribute('data-state', 'open');

    // Dismiss the tour
    await user.click(screen.getByTestId('tourtip-popover-0-close'));

    // Tour should close then reopen
    await waitFor(() => {
      expect(screen.getByTestId('tourtip')).toHaveAttribute('data-state', 'open');
    });

    expect(screen.getByTestId('tourtip-popover-0-close')).toBeInTheDocument();
  });

  describe('accessibility', () => {
    it('beacon is not render as interactive element by default', async () => {
      renderComponent(
        <>
          <Tourtip {...defaultProps} />
          <Button label="Start tour" data-testid="Start tour" />
        </>
      );

      await waitForPosition();

      const beacon = screen.getByTestId('tourtip-beacon-0');

      expect(beacon.tagName).toBe('DIV');
      expect(beacon).not.toHaveAttribute('aria-label');
      expect(beacon).not.toHaveAttribute('aria-expanded');
    });

    it('when enableMinimize is set to true,beacon is render as interactive element', async () => {
      renderComponent(
        <>
          <Tourtip {...defaultProps} enableMinimize />
          <Button label="Start tour" data-testid="Start tour" />
        </>
      );

      await waitForPosition();

      const beacon = screen.getByTestId('tourtip-beacon-0');

      expect(beacon.tagName).toBe('BUTTON');
      expect(beacon).toHaveAttribute('aria-label', 'Start tour');
      expect(beacon).toHaveAttribute('aria-expanded', 'true');
    });

    it('should trap focus within the popover by default', async () => {
      const { user } = renderComponent(
        <>
          <Tourtip {...defaultProps} />
          <Button label="Start tour" data-testid="Start tour" />
        </>
      );

      await waitForPosition();

      expect(screen.getByTestId('tourtip-beacon-0')).toHaveAttribute('data-state', 'open');
      await waitFor(() => expect(screen.getByTestId('tourtip-popover-0-close')).toHaveFocus());
      // Tab from close button
      await user.tab();
      await waitFor(() => expect(screen.getByTestId('tourtip-popover-0-footer-button-action')).toHaveFocus());

      // Tab from tourtip action button returns to close button
      await user.tab();
      await waitFor(() => expect(screen.getByTestId('tourtip-popover-0-close')).toHaveFocus());
    });

    it("focus is lost from the tourtip's popover when `shouldTrapFocus` is set to false", async () => {
      const { user } = renderComponent(
        <>
          <Tourtip {...defaultProps} shouldTrapFocus={false} />
          <Button label="Start tour" data-testid="Start tour" />
        </>
      );

      await waitForPosition();

      expect(screen.getByTestId('tourtip-beacon-0')).toHaveAttribute('data-state', 'open');
      expect(screen.getByTestId('tourtip-popover-0-close')).toHaveFocus();
      // Tab from close button
      await user.tab();
      expect(screen.getByTestId('tourtip-popover-0-footer-button-action')).toHaveFocus();

      // Tab from tourtip action button returns to close button
      await user.tab();
      expect(screen.getByTestId('tourtip-popover-0-close')).not.toHaveFocus();
      expect(screen.getByTestId('tourtip-beacon-0')).toHaveFocus();
    });
  });
});
