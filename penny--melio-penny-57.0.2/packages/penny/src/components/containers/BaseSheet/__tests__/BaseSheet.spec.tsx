import { act, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect } from 'vitest';

import { Button } from '@/components/action/Button';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import type { BaseSheetProps } from '../index';
import { BaseSheet, BaseSheetBody, BaseSheetHeader } from '../index';
import { waitForBaseSheetOpenTransitionComplete } from './BaseSheet.driver';

const props: BaseSheetProps = { isOpen: true, onClose: vi.fn(), children: 'Content' };

describe('BaseSheet', () => {
  validateComponent<BaseSheetProps>(BaseSheet, 'BaseSheet', { props });

  it('is not rendered when `isOpen` is false', () => {
    const { queryByTestId } = renderComponent(<BaseSheet {...props} isOpen={false} data-testid="test-sheet" />);
    expect(queryByTestId('test-sheet')).not.toBeInTheDocument();
  });

  it('is rendered when `isOpen` is true', () => {
    const { getByTestId } = renderComponent(<BaseSheet {...props} data-testid="test-sheet" />);
    expect(getByTestId('test-sheet')).toBeInTheDocument();
  });

  it('fires `onClose` handler when clicking the overlay', async () => {
    const handleClose = vi.fn();
    const { getByTestId, user } = renderComponent(<BaseSheet {...props} onClose={handleClose} />);
    await user.click(getByTestId('base-sheet-overlay'));
    expect(handleClose).toHaveBeenCalled();
  });

  it('fires `onClose` handler when clicking the `Esc` key', async () => {
    const handleClose = vi.fn();
    const { user } = renderComponent(<BaseSheet {...props} onClose={handleClose} />);
    await user.keyboard('{escape}');
    expect(handleClose).toHaveBeenCalled();
  });

  describe('when esc typed', () => {
    it('should call on esc and on close', async () => {
      const handleOnEsc = vi.fn();
      const handleOnClose = vi.fn();
      const { user } = renderComponent(<BaseSheet {...props} onClose={handleOnClose} onEsc={handleOnEsc} />);
      await waitForBaseSheetOpenTransitionComplete();
      await act(async () => user.keyboard('{escape}'));

      expect(handleOnEsc).toBeCalledTimes(1);
      expect(handleOnClose).toBeCalledTimes(1);
    });
  });

  describe('when overlay clicked', () => {
    it('should call on overlay click and on close', async () => {
      const handleOverlayClick = vi.fn();
      const handleOnClose = vi.fn();
      const { user, getByTestId } = renderComponent(
        <BaseSheet {...props} onClose={handleOnClose} onOverlayClick={handleOverlayClick} />
      );
      await act(async () => user.click(getByTestId('base-sheet-overlay')));

      expect(handleOverlayClick).toBeCalledTimes(1);
      expect(handleOnClose).toBeCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    const BottomSheetWithOpener = ({
      onClose,
      shouldHaveInputWithAutoFocus = false,
    }: {
      onClose: VoidFunction;
      shouldHaveInputWithAutoFocus?: boolean;
    }) => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <Button label="Open" onClick={() => setIsOpen(true)} data-testid="open-sheet-button" />
          <BaseSheet {...props} isOpen={isOpen} onClose={onClose} data-testid="test-sheet">
            <BaseSheetHeader />
            {shouldHaveInputWithAutoFocus && (
              <BaseSheetBody>
                <input autoFocus data-testid="input-with-autofocus" />
              </BaseSheetBody>
            )}
          </BaseSheet>
        </>
      );
    };

    it('should focus on the close button when the sheet is opened with keyboard', async () => {
      const handleClose = vi.fn();
      const { user, getByTestId, findByTestId } = renderComponent(<BottomSheetWithOpener onClose={handleClose} />);

      await user.tab();
      expect(getByTestId('open-sheet-button')).toHaveFocus();
      await user.keyboard('[Space]');
      await waitFor(async () => {
        expect(await findByTestId('test-sheet')).toBeVisible();
        expect(await findByTestId('sheet-close-button')).toHaveFocus();
      });
    });

    it('should focus on an input with auto-focus attribute when the sheet is opened with keyboard', async () => {
      const handleClose = vi.fn();
      const { user, getByTestId, findByTestId } = renderComponent(
        <BottomSheetWithOpener onClose={handleClose} shouldHaveInputWithAutoFocus />
      );

      await user.tab();
      expect(getByTestId('open-sheet-button')).toHaveFocus();
      await user.keyboard('[Space]');

      expect(await findByTestId('test-sheet')).toBeVisible();
      expect(await findByTestId('input-with-autofocus')).toHaveFocus();
    });
  });
});
