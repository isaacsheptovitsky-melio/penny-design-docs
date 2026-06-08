import { createBaseModalTestKit } from '@melio/penny-testkit-rtl';
import { screen } from '@testing-library/dom';
import { describe, expect, it, vi } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { BaseModal, BaseModalBody, BaseModalFooter, BaseModalHeader, type BaseModalProps } from '..';
import { ModalEvents } from '../useDispatchState';

describe('BaseModal', () => {
  const onClose = () => {};
  let testKit: ReturnType<typeof createBaseModalTestKit>;

  beforeEach(() => {
    testKit = createBaseModalTestKit();
  });

  validateComponent<BaseModalProps>(BaseModal, 'BaseModal', {
    props: { isOpen: true, onClose: () => {}, children: <BaseModalBody>Modal content</BaseModalBody> },
    componentParts: ['overlay'],
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

  it('should have default role when not set', () => {
    renderComponent(<BaseModal isOpen onClose={onClose} />);

    expect(testKit.getRole()).toBe('dialog');
  });

  it('have custom role when set', () => {
    renderComponent(<BaseModal isOpen onClose={onClose} role="alertdialog" />);

    expect(testKit.getRole()).toBe('alertdialog');
  });

  it('Associates dialog to header via aria-labelledby when header is provided', () => {
    const titleText = 'Dialog Title';
    const { getByTestId } = renderComponent(
      <BaseModal isOpen onClose={onClose}>
        <BaseModalHeader>
          <div data-testid="custom-header-text">{titleText}</div>
        </BaseModalHeader>
        <BaseModalBody>Content</BaseModalBody>
      </BaseModal>
    );

    const modalEl = testKit.getElement();
    const labelledBy = modalEl.getAttribute('aria-labelledby');
    expect(labelledBy).toBeTruthy();

    const headerEl = document.getElementById(labelledBy as string);
    expect(headerEl).toBeTruthy();
    expect(getByTestId('custom-header-text')).toBeInTheDocument();
    expect(getByTestId('custom-header-text')).toHaveTextContent(titleText);
  });

  it('does not set id on body (prevents SR reading body by default)', () => {
    const { getByTestId } = renderComponent(
      <BaseModal isOpen onClose={onClose}>
        <BaseModalHeader>Header</BaseModalHeader>
        <BaseModalBody data-testid="base-modal-body">Body</BaseModalBody>
      </BaseModal>
    );

    expect(getByTestId('base-modal-body')).not.toHaveAttribute('id');
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
