import { createModalTestKit } from '@melio/penny-testkit-rtl';
import { describe, expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { Modal } from '..';
import type { ModalProps } from '../Modal.types';

describe('Modal', () => {
  let modalTestKit: ReturnType<typeof createModalTestKit>;

  beforeEach(() => {
    modalTestKit = createModalTestKit();
  });

  validateComponent<ModalProps>(Modal, 'Modal', {
    props: {
      header: 'header',
      isOpen: true,
      onClose: vi.fn(),
      primaryButton: { label: 'primary', variant: 'primary' },
      secondaryButton: { label: 'secondary', variant: 'secondary' },
    },
    componentParts: ['header', 'header-text', 'body'],
  });

  it('verifies loading state for the modal', () => {
    const handleClose = vi.fn();

    renderComponent(
      <Modal
        isLoading
        header="headerText"
        isOpen
        onClose={handleClose}
        primaryButton={{ label: 'primary', variant: 'primary' }}
      />
    );

    expect(modalTestKit.getIsLoading()).toBeTruthy();
  });

  it('closes the modal by clicking the overlay when the modal is not loading', async () => {
    const handleClose = vi.fn();

    renderComponent(
      <Modal
        header="headerText"
        isOpen
        onClose={handleClose}
        primaryButton={{ label: 'primary', variant: 'primary' }}
      />
    );

    await modalTestKit.clickOverlay();
    expect(handleClose).toHaveBeenCalled();
  });

  it('closes the modal by clicking the closing button', async () => {
    const handleClose = vi.fn();

    renderComponent(
      <Modal
        header="headerText"
        isOpen
        onClose={handleClose}
        primaryButton={{ label: 'primary', variant: 'primary' }}
      />
    );

    await modalTestKit.closeButton.click();
    expect(handleClose).toBeCalledTimes(1);
  });

  describe('when esc typed', () => {
    it('should call on esc and on close', async () => {
      const handleOnEsc = vi.fn();
      const handleOnClose = vi.fn();
      renderComponent(<Modal header="headerText" isOpen onClose={handleOnClose} onEsc={handleOnEsc} />);

      await modalTestKit.pressEscape();

      expect(handleOnEsc).toBeCalledTimes(1);
      expect(handleOnClose).toBeCalledTimes(1);
    });
  });

  describe('when overlay clicked', () => {
    it('should call on click and on close', async () => {
      const handleOverlayClick = vi.fn();
      const handleOnClose = vi.fn();
      renderComponent(<Modal header="headerText" isOpen onClose={handleOnClose} onOverlayClick={handleOverlayClick} />);

      await modalTestKit.clickOverlay();
      expect(handleOverlayClick).toBeCalledTimes(1);
      expect(handleOnClose).toBeCalledTimes(1);
    });
  });

  it("clicking the modal-actions' primary button and secondary button", async () => {
    const handleClose = vi.fn();
    const handlePrimaryBtn = vi.fn();
    const handleSecondaryBtn = vi.fn();

    renderComponent(
      <Modal
        header="headerText"
        isOpen
        onClose={handleClose}
        primaryButton={{ label: 'primary', onClick: handlePrimaryBtn, variant: 'primary' }}
        secondaryButton={{ label: 'primary', onClick: handleSecondaryBtn, variant: 'secondary' }}
      />
    );

    await modalTestKit.primaryButton.click();
    expect(handlePrimaryBtn).toBeCalledTimes(1);

    await modalTestKit.secondaryButton.click();
    expect(handleSecondaryBtn).toBeCalledTimes(1);
  });

  describe('footer', () => {
    it("shouldn't show", () => {
      const { queryByTestId } = renderComponent(
        <Modal header="headerText" data-testid="test-modal" isOpen onClose={() => {}} />
      );

      expect(queryByTestId('test-modal-footer')).not.toBeInTheDocument();
    });

    it('should show', () => {
      const { getByTestId } = renderComponent(
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        <Modal header="headerText" data-testid="test-modal" isOpen onClose={() => {}} footer="Modal Footer" />
      );

      expect(getByTestId('test-modal-footer')).toBeInTheDocument();
    });
  });
});
