/* eslint-disable @typescript-eslint/no-deprecated */
import { Box } from '@chakra-ui/react';
import { screen, waitFor } from '@testing-library/react';
import { expect } from 'vitest';

import { Button } from '@/components/action/Button';
import { renderComponent } from '@/test-utils/render.utils';

import { CLOSE_BUTTON_ARIA_LABEL_PREFIX, Toast } from '../Toast';
import type { ToastProps } from '../Toast.types';
import { useToast } from '../useToast';

describe('UseToast', () => {
  it('invokes the `onAction` handler when clicking the action', async () => {
    const handleClose = vi.fn();
    const handleAction = vi.fn();

    const { user } = renderComponent(
      <Toast
        id={1}
        type="informative"
        onClose={handleClose}
        onAction={handleAction}
        actionText="undo"
        actionType="button"
      />
    );

    await user.click(screen.getByTestId('toast-action'));

    expect(handleAction).toHaveBeenCalled();
  });

  it('closes the toast using the `close` util from `onAction`', async () => {
    const handleClose = vi.fn();
    const handleAction: NonNullable<ToastProps['onAction']> = vi.fn((close: () => void) => {
      close();
    });

    const { user } = renderComponent(
      <Toast
        id={1}
        type="informative"
        onClose={handleClose}
        onAction={handleAction}
        actionText="undo"
        actionType="button"
      />
    );

    await user.click(screen.getByTestId('toast-action'));

    expect(handleAction).toHaveBeenCalled();
    expect(handleClose).toHaveBeenCalled();
  });

  it('displays 1 toast at a time', async () => {
    const ToastTest = () => {
      const { toast } = useToast();

      return (
        <Button
          data-testid="toast-test"
          onClick={() => toast({ type: 'informative', title: 'Hooray!' })}
          label="Do it"
        />
      );
    };
    const { getByTestId, queryAllByTestId, user } = renderComponent(<ToastTest />);

    await user.click(getByTestId('toast-test'));

    await waitFor(() => expect(queryAllByTestId(/toast-[1-9]/)).toHaveLength(1));

    await user.click(getByTestId('toast-test'));

    // 2 toasts should appear only during transition because animation duration is ~200ms
    await waitFor(() => expect(queryAllByTestId(/toast-[1-9]/)).toHaveLength(2));

    // Wait for animation to be over, assert that only 1 toast is visible
    await waitFor(() => expect(queryAllByTestId(/toast-[1-9]/)).toHaveLength(1));
  });

  it('Moves the focus to the toast when popping', async () => {
    const ToastTest = () => {
      const { toast } = useToast();

      return (
        <Button
          data-testid="toast-trigger"
          onClick={() => toast({ type: 'informative', title: 'Hooray!' })}
          label="Do it"
        />
      );
    };

    const { user, getByTestId } = renderComponent(<ToastTest />);

    await user.click(getByTestId('toast-trigger'));

    // The first tab is needed to have focus on the body.
    await waitFor(async () => {
      await user.tab();
    });
    await waitFor(async () => {
      await user.tab();
      expect(getByTestId('toast-close-button')).toHaveFocus();
    });
  });

  it('the default aria-label for the close button equals the value of the title when the title is a string', async () => {
    const title = 'Hooray!';
    const ToastTest = () => {
      const { toast } = useToast();

      return <Button data-testid="toast-trigger" onClick={() => toast({ type: 'informative', title })} label="Do it" />;
    };

    const { user, getByTestId, findAllByTestId } = renderComponent(<ToastTest />);

    await user.click(getByTestId('toast-trigger'));

    expect((await findAllByTestId('toast-close-button'))[0]).toHaveAttribute(
      'aria-label',
      `${CLOSE_BUTTON_ARIA_LABEL_PREFIX} ${title}`
    );
  });

  it('the default aria-label for the close button equals ‘Close toast’ when the title is not a string.', async () => {
    const ToastTest = () => {
      const { toast } = useToast();

      return (
        <Button
          data-testid="toast-trigger"
          onClick={() => toast({ type: 'informative', title: <Box>Hooray!</Box> })}
          label="Do it"
        />
      );
    };

    const { user, getByTestId, findAllByTestId } = renderComponent(<ToastTest />);

    await user.click(getByTestId('toast-trigger'));

    expect((await findAllByTestId('toast-close-button'))[0]).toHaveAttribute('aria-label', 'Close toast');
  });

  it('overrides the close button aria-label', async () => {
    const closeButtonAriaLabel = 'This is closing the toast';
    const ToastTest = () => {
      const { toast } = useToast();

      return (
        <Button
          data-testid="toast-trigger"
          onClick={() => toast({ type: 'informative', title: 'Hooray!', closeButtonAriaLabel })}
          label="Do it"
        />
      );
    };

    const { user, getByTestId, findAllByTestId } = renderComponent(<ToastTest />);

    await user.click(getByTestId('toast-trigger'));

    expect((await findAllByTestId('toast-close-button'))[0]).toHaveAttribute('aria-label', closeButtonAriaLabel);
  });
});
