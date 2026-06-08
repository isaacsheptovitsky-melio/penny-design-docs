import { createBaseModalTestKit } from '@melio/penny-testkit-rtl';
import { screen } from '@testing-library/dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { renderComponent } from '@/test-utils/render.utils';
import { resizeScreenByBreakpointKey } from '@/test-utils/resize-screen';

import { BaseModal, BaseModalBody, BaseModalFooter, BaseModalHeader } from '..';
import { ModalEvents } from '../useDispatchState';

describe('BaseModal - Mobile Breakpoint', () => {
  const onClose = () => {};
  let testKit: ReturnType<typeof createBaseModalTestKit>;

  beforeEach(() => {
    resizeScreenByBreakpointKey('xs');
    testKit = createBaseModalTestKit();
  });

  it('should be close', () => {
    renderComponent(<BaseModal isOpen={false} onClose={onClose} />);

    expect(screen.queryByTestId(testKit.dataTestId)).not.toBeInTheDocument();
  });

  it('should be open', () => {
    renderComponent(<BaseModal isOpen onClose={onClose} />);

    expect(testKit.getElement()).toBeInTheDocument();
    expect(testKit.getVisible()).toBe(true);
  });

  it('should not be loading', () => {
    renderComponent(<BaseModal isOpen onClose={onClose} />);

    expect(testKit.getIsLoading()).toBe(false);
  });

  describe('when is loading', () => {
    it('should show a loader', () => {
      renderComponent(<BaseModal isOpen onClose={onClose} isLoading />);

      expect(testKit.getIsLoading()).toBe(true);
    });

    it('should shows close button', () => {
      renderComponent(<BaseModal isOpen onClose={onClose} isLoading />);

      expect(testKit.closeButton.getElement()).toBeInTheDocument();
    });
  });

  describe('when click close button', () => {
    it('should call on close', async () => {
      const handleClose = vi.fn();
      renderComponent(<BaseModal isOpen onClose={handleClose} />);

      await testKit.closeButton.click();

      expect(handleClose).toBeCalledTimes(1);
    });
  });

  it('should supports aria-label', () => {
    const ariaLabel = 'test';
    renderComponent(<BaseModal isOpen onClose={onClose} aria-label={ariaLabel} />);

    expect(testKit.getElement().getAttribute('aria-label')).toBe(ariaLabel);
  });

  it('should notifies when the modal is opened', () => {
    const eventCb = vi.fn<EventListener>();
    document.addEventListener(ModalEvents.OPENED, eventCb);
    renderComponent(<BaseModal isOpen onClose={onClose} />);

    expect(eventCb.mock.calls[0]?.[0]?.type).toBe(ModalEvents.OPENED);
  });

  it('should show header, body and footer', () => {
    const { getByTestId } = renderComponent(
      <BaseModal isOpen onClose={onClose}>
        <BaseModalHeader>Modal header</BaseModalHeader>
        <BaseModalBody>Modal body</BaseModalBody>
        <BaseModalFooter>Modal footer</BaseModalFooter>
      </BaseModal>
    );

    expect(getByTestId('base-modal-header')).toBeInTheDocument();
    expect(getByTestId('base-modal-body')).toBeInTheDocument();
    expect(getByTestId('base-modal-footer')).toBeInTheDocument();
  });

  describe('when esc typed', () => {
    it('should call onEsc and onClose', async () => {
      const handleOnEsc = vi.fn();
      const handleOnClose = vi.fn();
      renderComponent(<BaseModal isOpen onClose={handleOnClose} onEsc={handleOnEsc} />);

      await testKit.pressEscape();

      expect(handleOnEsc).toBeCalledTimes(1);
      expect(handleOnClose).toBeCalledTimes(1);
    });
  });

  describe('when overlay clicked', () => {
    it('should call onOverlayClick and onClose', async () => {
      const handleOverlayClick = vi.fn();
      const handleOnClose = vi.fn();
      renderComponent(<BaseModal isOpen onClose={handleOnClose} onOverlayClick={handleOverlayClick} />);

      await testKit.clickOverlay();

      expect(handleOverlayClick).toBeCalledTimes(1);
      expect(handleOnClose).toBeCalledTimes(1);
    });
  });
});
