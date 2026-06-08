import { act } from '@testing-library/react';
import { describe, expect } from 'vitest';

import { Image } from '@/components/media/Image';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { PromotionalModal } from '../PromotionalModal';
import type { PromotionalModalProps } from '../PromotionalModal.types';

const defaultAsset = (
  <Image src="//www.html.am/images/samples/remarkables_queenstown_new_zealand-300x225.jpg" alt="asset" />
);

describe('PromotionalModal', () => {
  validateComponent<PromotionalModalProps>(PromotionalModal, 'PromotionalModal', {
    props: {
      header: 'some header',
      isOpen: true,
      onClose: vi.fn(),
      asset: defaultAsset,
      primaryButton: { label: 'primary', variant: 'primary' },
      secondaryButton: { label: 'secondary', variant: 'secondary' },
    },
    componentParts: ['content'],
  });

  it('verifies loading state for the modal', () => {
    const handleClose = vi.fn();

    const { getByTestId } = renderComponent(
      <PromotionalModal
        isLoading
        header="headerText"
        isOpen
        asset={defaultAsset}
        onClose={handleClose}
        primaryButton={{ label: 'primary', variant: 'primary' }}
      />
    );

    expect(getByTestId('loading-container-loader')).toBeInTheDocument();
  });

  it('closes the modal by clicking the overlay when the modal is not loading', async () => {
    const handleClose = vi.fn();

    const { user } = renderComponent(
      <PromotionalModal
        header="headerText"
        isOpen
        asset={defaultAsset}
        onClose={handleClose}
        primaryButton={{ label: 'primary', variant: 'primary' }}
      />
    );

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await act(async () => user.click(document.getElementsByClassName('chakra-modal__content-container')[0]!));
    expect(handleClose).toHaveBeenCalled();
  });

  it('closes the modal by clicking the closing button', async () => {
    const handleClose = vi.fn();

    const { getByTestId, user } = renderComponent(
      <PromotionalModal
        header="headerText"
        isOpen
        asset={defaultAsset}
        onClose={handleClose}
        primaryButton={{ label: 'primary', variant: 'primary' }}
      />
    );

    await act(async () => user.click(getByTestId('modal-close-button')));

    expect(handleClose).toHaveBeenCalled();
  });

  it('calls on close callback when the close button is clicked', async () => {
    const handleClose = vi.fn();
    const { getByTestId, user } = renderComponent(
      <PromotionalModal header="headerText" isOpen asset={defaultAsset} onClose={handleClose} />
    );

    await act(async () => user.click(getByTestId('modal-close-button')));

    expect(handleClose).toBeCalledTimes(1);
  });

  describe('when esc typed', () => {
    it('should call on esc and on close', async () => {
      const handleOnEsc = vi.fn();
      const handleOnClose = vi.fn();
      const { user } = renderComponent(
        <PromotionalModal header="headerText" isOpen asset={defaultAsset} onClose={handleOnClose} onEsc={handleOnEsc} />
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
        <PromotionalModal
          header="headerText"
          isOpen
          asset={defaultAsset}
          onClose={handleOnClose}
          onOverlayClick={handleOverlayClick}
        />
      );
      await user.click(getByTestId('promotional-modal').parentElement as HTMLElement);

      expect(handleOverlayClick).toBeCalledTimes(1);
      expect(handleOnClose).toBeCalledTimes(1);
    });
  });

  it("clicking the modal-actions' primary button and secondary button", async () => {
    const handleClose = vi.fn();
    const handlePrimaryBtn = vi.fn();
    const handleSecondaryBtn = vi.fn();

    const { getByTestId, user } = renderComponent(
      <PromotionalModal
        header="headerText"
        isOpen
        asset={defaultAsset}
        onClose={handleClose}
        primaryButton={{ label: 'primary', onClick: handlePrimaryBtn, variant: 'primary' }}
        secondaryButton={{ label: 'primary', onClick: handleSecondaryBtn, variant: 'secondary' }}
      />
    );

    await act(async () => user.click(getByTestId('modal-btn-primary')));
    expect(handlePrimaryBtn).toHaveBeenCalled();
    await act(async () => user.click(getByTestId('modal-btn-secondary')));
    expect(handleSecondaryBtn).toHaveBeenCalled();
  });
});
