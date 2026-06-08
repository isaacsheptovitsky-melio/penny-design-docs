import { act, waitFor } from '@testing-library/react';
import { useEffect } from 'react';
import { describe, expect } from 'vitest';

import { useToast } from '@/components/feedback/Toast';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { Drawer } from '../Drawer';
import { type DrawerProps } from '../Drawer.types';

describe('Drawer', () => {
  validateComponent<DrawerProps>(Drawer, 'Drawer', {
    props: { isOpen: true, onClose: vi.fn() },
  });

  it('hides the drawer when `isOpen` is false', () => {
    const { queryByTestId } = renderComponent(<Drawer isOpen={false} onClose={vi.fn()} />);

    expect(queryByTestId('drawer')).not.toBeInTheDocument();
  });

  it('shows the drawer when `isOpen` is true', () => {
    const { getByTestId } = renderComponent(<Drawer isOpen onClose={vi.fn()} />);

    expect(getByTestId('drawer')).toBeInTheDocument();
  });

  it('closes the drawer by clicking the overlay', async () => {
    const onClose = vi.fn();

    const { getByTestId, user } = renderComponent(<Drawer isOpen onClose={onClose} />);

    await act(async () => user.click(getByTestId('drawer-overlay')));

    expect(onClose).toHaveBeenCalled();
  });

  it('closes the drawer by clicking the close button', async () => {
    const onClose = vi.fn();

    const { getByTestId, user } = renderComponent(<Drawer isOpen onClose={onClose} />);

    await act(async () => user.click(getByTestId('drawer-close-button')));

    expect(onClose).toHaveBeenCalled();
  });

  describe('when esc typed', () => {
    it('should call on esc and on close', async () => {
      const handleOnEsc = vi.fn();
      const handleOnClose = vi.fn();
      const { user } = await waitFor(() =>
        renderComponent(<Drawer isOpen onClose={handleOnClose} onEsc={handleOnEsc} />)
      );

      await user.keyboard('{escape}');

      expect(handleOnEsc).toBeCalledTimes(1);
      expect(handleOnClose).toBeCalledTimes(1);
    });
  });

  describe('when overlay clicked', () => {
    it('should call on click and on close', async () => {
      const handleOverlayClick = vi.fn();
      const handleOnClose = vi.fn();
      const { user, getByTestId } = renderComponent(
        <Drawer isOpen onClose={handleOnClose} onOverlayClick={handleOverlayClick} />
      );

      await act(async () => user.click(getByTestId('drawer-overlay')));

      expect(handleOverlayClick).toBeCalledTimes(1);
      expect(handleOnClose).toBeCalledTimes(1);
    });
  });

  it('has a custom close button aria-label', async () => {
    const onClose = vi.fn();

    const { getByRole, user } = renderComponent(
      <Drawer isOpen onClose={onClose} closeButtonAriaLabel="Click to close drawer" />
    );

    await act(async () => user.click(getByRole('button', { name: 'Click to close drawer' })));

    expect(onClose).toHaveBeenCalled();
  });

  it('does not set aria-labelledby by default', () => {
    const onClose = vi.fn();

    const { getByTestId } = renderComponent(<Drawer isOpen onClose={onClose} />);

    expect(getByTestId('drawer')).not.toHaveAttribute('aria-labelledby');
  });

  it('sets aria-labelledby when provided as a prop', () => {
    const onClose = vi.fn();

    const { getByTestId } = renderComponent(<Drawer isOpen onClose={onClose} aria-labelledby="test" />);

    expect(getByTestId('drawer')).toHaveAttribute('aria-labelledby', 'test');
  });

  // Regression test for https://meliorisk.atlassian.net/browse/ME-60339
  it('should not dismiss the drawer when clicking on a toast', async () => {
    const onClose = vi.fn();

    const DrawerTest = () => {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      const { toast } = useToast();

      useEffect(() => {
        toast({ title: 'I am a toast', type: 'informative' });
      }, [toast]);

      return <Drawer isOpen onClose={onClose} closeButtonAriaLabel="Click to close drawer" />;
    };

    const { getByTestId, user } = renderComponent(<DrawerTest />);

    await act(async () => user.click(getByTestId('toast-close-button')));

    expect(onClose).not.toHaveBeenCalled();
  });

  it('should associate to the loader element when is loading', () => {
    const { getByTestId, queryByTestId, queryByText, rerender } = renderComponent(
      <Drawer onClose={vi.fn()} isOpen isLoading />
    );
    expect(getByTestId('drawer-close-button')).toHaveAttribute('aria-labelledby', expect.stringMatching(/^loader-/));
    expect(queryByText('Loading...')).toBeInTheDocument();
    expect(queryByTestId('drawer-body')).not.toBeInTheDocument();

    rerender(<Drawer onClose={vi.fn()} isOpen />);

    expect(getByTestId('drawer-close-button')).not.toHaveAttribute('aria-labelledby');
    expect(queryByTestId('drawer-body')).toBeInTheDocument();
    expect(queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('the close button gets the correct aria-labelledby space-separated list', () => {
    const { getByTestId, queryByTestId, queryByText, rerender } = renderComponent(
      <Drawer onClose={vi.fn()} isOpen isLoading closeButtonAriaLabelledBy="test-id" />
    );
    expect(getByTestId('drawer-close-button')).toHaveAttribute(
      'aria-labelledby',
      expect.stringMatching(/^loader-\d+ test-id$/)
    );
    expect(queryByText('Loading...')).toBeInTheDocument();
    expect(queryByTestId('drawer-body')).not.toBeInTheDocument();

    rerender(<Drawer onClose={vi.fn()} isOpen closeButtonAriaLabelledBy="test-id" />);

    expect(getByTestId('drawer-close-button')).toHaveAttribute('aria-labelledby', 'test-id');
    expect(queryByTestId('drawer-body')).toBeInTheDocument();
    expect(queryByText('Loading...')).not.toBeInTheDocument();
  });
});
