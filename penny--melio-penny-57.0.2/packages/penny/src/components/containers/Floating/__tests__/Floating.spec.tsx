import { Box } from '@chakra-ui/react';
import { act, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { expect } from 'vitest';

import { Button } from '@/components/action/Button';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { Floating } from '../Floating';
import { type FloatingProps } from '../types';

const triggerComponent = <Button label="Button" data-testid="trigger" />;
const contentComponent = <Box data-testid="Content">Content</Box>;
const renderControlled = ({ isOpen = false, trigger = triggerComponent, ...props }: Partial<FloatingProps>) => {
  const onOpenChange = vi.fn();

  const ControlledFloating = () => {
    const [open, setIsOpen] = useState<boolean>(isOpen);

    onOpenChange.mockImplementation((o: boolean) => {
      setIsOpen(o);
    });
    return (
      <Floating {...props} trigger={trigger} isOpen={open} onOpenChange={onOpenChange} data-testid="floating-content">
        <Box>
          <Button label="first button" data-testid="btn-1" />
          <Button label="secound button" data-testid="btn-2" />
        </Box>
      </Floating>
    );
  };

  return renderComponent(<ControlledFloating />, {
    userEventOptions: { advanceTimers: vi.advanceTimersByTime },
  });
};

describe('Floating', () => {
  const onOpenChangeMock = vi.fn();

  const props = {
    isOpen: true,
    onOpenChange: onOpenChangeMock,
    trigger: triggerComponent,
    children: contentComponent,
  };
  validateComponent<FloatingProps>(Floating, 'Floating', {
    props,
    customDataComponentValidation: (getByTestId, testId, componentName) => {
      // The Floating component renders the data-component on the Floater element
      // which is accessible via the test ID when isOpen is true
      const element = getByTestId(testId);
      expect(element).toHaveAttribute('data-component', componentName);
    },
  });

  it('does not open the content when disabled and applies the appropriate attributes to the trigger', async () => {
    const { user, getByTestId } = renderComponent(
      <Floating trigger={triggerComponent} isOpen={false} onOpenChange={onOpenChangeMock} isDisabled>
        {contentComponent}
      </Floating>
    );
    await act(async () => user.click(getByTestId('trigger')));
    expect(onOpenChangeMock).not.toBeCalledWith(true, 'trigger');
    expect(getByTestId('trigger')).toBeDisabled();
  });

  it('calls `onOpenChange` when the trigger is clicked', async () => {
    const { user, getByTestId } = renderComponent(
      <Floating trigger={triggerComponent} isOpen={false} onOpenChange={onOpenChangeMock}>
        {contentComponent}
      </Floating>
    );
    await act(async () => user.click(getByTestId('trigger')));
    expect(onOpenChangeMock).toBeCalledWith(true, 'trigger');
  });

  it('calls `onOpenChange` when the clicking outside', async () => {
    const { user } = renderComponent(
      <Floating trigger={triggerComponent} isOpen onOpenChange={onOpenChangeMock}>
        {contentComponent}
      </Floating>
    );
    await act(async () => user.click(document.querySelector('body') as HTMLElement));
    expect(onOpenChangeMock).toBeCalledWith(false, 'outside');
  });

  it('opens the content when `isOpen` is true', () => {
    const { getByTestId } = renderComponent(
      <Floating trigger={triggerComponent} isOpen onOpenChange={onOpenChangeMock} data-testid="floating-test">
        {contentComponent}
      </Floating>
    );
    expect(getByTestId('floating-test')).toBeVisible();
  });

  it("doesn't open the content when `isOpen` is false", () => {
    const { queryByTestId } = renderComponent(
      <Floating trigger={triggerComponent} isOpen={false} onOpenChange={onOpenChangeMock} data-testid="floating-test">
        {contentComponent}
      </Floating>
    );
    expect(queryByTestId('floating-test')).not.toBeInTheDocument();
  });

  it('shows the children when the content is open', () => {
    const { getByText } = renderComponent(
      <Floating trigger={triggerComponent} isOpen onOpenChange={onOpenChangeMock} data-testid="floating-test">
        {contentComponent}
      </Floating>
    );

    expect(getByText('Content')).toBeVisible();
  });

  it('should not propagate click event', async () => {
    const handleClick = vi.fn();
    const handleParentClick = vi.fn();
    const { getByTestId, user } = renderComponent(
      <Box onClick={handleParentClick}>
        <Floating trigger={triggerComponent} isOpen onOpenChange={onOpenChangeMock}>
          <Box data-testid="child" onClick={handleClick}>
            Content
          </Box>
        </Floating>
      </Box>
    );

    await user.click(getByTestId('child'));

    expect(handleClick).toHaveBeenCalled();
    expect(handleParentClick).not.toHaveBeenCalled();
  });

  it('should not propagate keyboard event', async () => {
    const handleKeyDown = vi.fn();
    const handleParentKeyDown = vi.fn();
    const { getByTestId, user } = renderComponent(
      <Box onKeyDown={handleParentKeyDown}>
        <Floating trigger={triggerComponent} isOpen onOpenChange={onOpenChangeMock}>
          <Box data-testid="child" tabIndex={0} onKeyDown={handleKeyDown}>
            Content
          </Box>
        </Floating>
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

  describe('Focus behavior', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });
    it('focus is trapped in the content by default', async () => {
      const { user, getByRole, queryByTestId } = renderControlled(props);

      await waitFor(() => {
        // wait for focus to move from the trigger to the Content
        expect(getByRole('button', { name: /first button/ })).toHaveFocus();
      });
      await user.tab();
      expect(getByRole('button', { name: /secound button/ })).toHaveFocus();
      await user.tab();
      await waitFor(() => {
        // returns to the first element
        expect(getByRole('button', { name: /first button/ })).toHaveFocus();
      });

      // closes the Content
      await act(async () => await user.keyboard('{Esc}'));

      await waitFor(() => {
        expect(getByRole('button', { name: 'Button' })).toHaveAttribute('aria-expanded', 'false');
        expect(queryByTestId('floating-content')).not.toBeInTheDocument();
      });
    });
    it('when focus is not trapped in the content, after the last focusable element is blurred the content closes', async () => {
      const { user, getByRole, queryByTestId } = renderControlled({ shouldTrapFocus: false, ...props });

      await waitFor(() => {
        // wait for focus to move from the trigger to the Content
        expect(getByRole('button', { name: /first button/ })).toHaveFocus();
      });
      await user.tab();
      expect(getByRole('button', { name: /secound button/ })).toHaveFocus();

      // closes the content
      await act(async () => await user.tab());
      expect(getByRole('button', { name: 'Button' })).toHaveFocus();

      await waitFor(() => {
        expect(getByRole('button', { name: 'Button' })).toHaveAttribute('aria-expanded', 'false');
        expect(queryByTestId('floating-content')).not.toBeInTheDocument();
      });
    });
  });

  describe('Floating Trigger ARIA attributes', () => {
    it('renders ARIA attributes correctly when open', () => {
      const { getByTestId } = renderComponent(
        <Floating
          trigger={
            <div role="button" data-testid="trigger">
              trigger div
            </div>
          }
          isOpen
          onOpenChange={onOpenChangeMock}
        >
          <Box>Content</Box>
        </Floating>
      );

      const trigger = getByTestId('trigger');

      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
      expect(trigger).toHaveAttribute('aria-controls');
    });

    it('renders ARIA attributes correctly when closed', () => {
      const { getByTestId } = renderComponent(
        <Floating
          trigger={
            <div role="button" data-testid="trigger">
              trigger div
            </div>
          }
          isOpen={false}
          onOpenChange={onOpenChangeMock}
        >
          <Box>Content</Box>
        </Floating>
      );

      const trigger = getByTestId('trigger');

      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    });
  });
});
