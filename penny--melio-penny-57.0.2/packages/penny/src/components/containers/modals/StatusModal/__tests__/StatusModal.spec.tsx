import { act } from '@testing-library/react';
import { describe, expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { StatusModal } from '../StatusModal';
import type { StatusModalProps } from '../StatusModal.types';

describe('StatusModal', () => {
  validateComponent<StatusModalProps>(StatusModal, 'StatusModal', {
    props: {
      header: 'header',
      isOpen: true,
      onClose: vi.fn(),
      variant: 'alert',
    },
    componentParts: ['header', 'header-text', 'body'],
  });

  it('verifies loading state for the modal', () => {
    const handleClose = vi.fn();
    const { getByTestId } = renderComponent(
      <StatusModal isLoading header="headerText" isOpen variant="alert" onClose={handleClose} />
    );

    expect(getByTestId('loading-container-loader')).toBeInTheDocument();
  });

  it('closes the modal by clicking the overlay when the modal is not loading', async () => {
    const handleClose = vi.fn();
    const { user } = renderComponent(<StatusModal header="headerText" isOpen variant="alert" onClose={handleClose} />);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await act(async () => user.click(document.getElementsByClassName('chakra-modal__content-container')[0]!));
    expect(handleClose).toHaveBeenCalled();
  });

  it('call on close callback when the close button is clicked', async () => {
    const handleClose = vi.fn();
    const { getByTestId, user } = renderComponent(
      <StatusModal header="headerText" isOpen variant="alert" onClose={handleClose} />
    );

    await act(async () => user.click(getByTestId('modal-close-button')));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  describe('when esc typed', () => {
    it('should call on esc and on close', async () => {
      const handleOnEsc = vi.fn();
      const handleOnClose = vi.fn();
      const { user } = renderComponent(
        <StatusModal header="headerText" isOpen variant="alert" onClose={handleOnClose} onEsc={handleOnEsc} />
      );

      await act(async () => user.keyboard('{escape}'));

      expect(handleOnEsc).toBeCalledTimes(1);
      expect(handleOnClose).toBeCalledTimes(1);
    });
  });

  describe('when overlay clicked', () => {
    it('should call on click and on close', async () => {
      const handleOverlayClick = vi.fn();
      const handleOnClose = vi.fn();
      const { user, getByTestId } = renderComponent(
        <StatusModal
          header="headerText"
          isOpen
          variant="alert"
          onClose={handleOnClose}
          onOverlayClick={handleOverlayClick}
        />
      );

      await user.click(getByTestId('status-modal').parentElement as HTMLElement);

      expect(handleOverlayClick).toBeCalledTimes(1);
      expect(handleOnClose).toBeCalledTimes(1);
    });
  });

  it("shouldn't primary button and secondary button exist", () => {
    const handleClose = vi.fn();
    const { queryByTestId } = renderComponent(
      <StatusModal header="headerText" isOpen variant="alert" onClose={handleClose} />
    );

    expect(queryByTestId('status-modal-footer-primary-button')).not.toBeInTheDocument();
    expect(queryByTestId('status-modal-footer-secondary-button')).not.toBeInTheDocument();
  });

  describe('when have primary button and secondary button', () => {
    it('should exist', async () => {
      const handleClose = vi.fn();

      const { getByTestId, user } = renderComponent(
        <StatusModal header="headerText" isOpen variant="alert" onClose={handleClose} />
      );

      await act(async () => user.click(getByTestId('modal-close-button')));

      expect(handleClose).toHaveBeenCalled();
    });

    it("shouldn't primary button and secondary button exist", () => {
      const handleClose = vi.fn();
      const { queryByTestId } = renderComponent(
        <StatusModal header="headerText" isOpen variant="alert" onClose={handleClose} />
      );

      expect(queryByTestId('status-modal-footer-primary-button')).not.toBeInTheDocument();
      expect(queryByTestId('status-modal-footer-secondary-button')).not.toBeInTheDocument();
    });
  });

  describe('footer', () => {
    it("shouldn't show", () => {
      const { queryByTestId } = renderComponent(
        <StatusModal header="headerText" isOpen variant="alert" onClose={() => {}} />
      );

      expect(queryByTestId('status-modal-footer')).not.toBeInTheDocument();
    });

    it('should show', () => {
      const { getByTestId } = renderComponent(
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        <StatusModal header="headerText" isOpen variant="alert" onClose={() => {}} footer="This is footer" />
      );

      expect(getByTestId('status-modal-footer')).toBeInTheDocument();
    });
  });
});
