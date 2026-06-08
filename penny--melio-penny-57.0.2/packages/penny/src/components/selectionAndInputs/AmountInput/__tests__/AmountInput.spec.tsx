import { noop } from '@melio/penny-utils';
import { act, screen } from '@testing-library/react';
import { createRef, type FocusEventHandler, type RefAttributes } from 'react';
import { expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { AmountInput } from '../AmountInput';
import { type AmountInputProps } from '../AmountInput.types';

validateComponent<AmountInputProps>(AmountInput, 'AmountInput', {
  props: { value: 2000 },
  skipRefCheck: true,
});

const render = ({
  onChange = noop,
  value = 2000,
  ...props
}: Partial<AmountInputProps> & RefAttributes<HTMLInputElement> = {}) => {
  const renderResult = renderComponent(<AmountInput onChange={onChange} value={value} {...props} />);

  return {
    ...renderResult,
    // get amount input field (only when isEditMode is true)
    getAmountInput: () => renderResult.getByTestId('amount-input'),
    // to get amount input text (only when isEditMode is false)
    getAmountInputDisplay: () => renderResult.getByTestId('amount-input-display'),
    getEditButton: () => renderResult.getByTestId('amount-edit-button'),
    queryEditButton: () => renderResult.queryByTestId('amount-edit-button'),
  };
};

describe('AmountInput', () => {
  describe('Currency formatting', () => {
    it('adds a thousands separator in case the number bigger then 999', async () => {
      const { getAmountInput, getEditButton, user } = render();

      const inputText = '1000';
      await user.click(getEditButton());

      await user.type(getAmountInput(), inputText);

      expect(getAmountInput()).toHaveValue('$1,000');
    });

    it('adds one point for decimal number', async () => {
      const { getAmountInput, getEditButton, user } = render();

      const inputText = '123.12.';
      await user.click(getEditButton());

      const amountInput = getAmountInput();
      await user.type(amountInput, inputText);

      expect(amountInput).toHaveValue('$123.12');
    });

    it("overrides the field's autocomplete attribute", async () => {
      const { getAmountInput, getEditButton, user } = render({ autoComplete: 'amount' });
      await user.click(getEditButton());
      const amountInput = getAmountInput();
      expect(amountInput).toHaveAttribute('autocomplete', 'amount');
    });
  });

  describe('Component Validation', () => {
    it('in case the input is invalid, edit button is hidden and error message is shown', () => {
      const { queryEditButton } = render({ errorMessage: 'error message' });

      expect(queryEditButton()).not.toBeInTheDocument();
      expect(screen.getByText('error message')).toBeInTheDocument();
    });

    it('emits the change event when changing the input value', async () => {
      const handleChange = vi.fn();
      const value = '2';
      const { getAmountInput, getEditButton, user } = render({ onChange: handleChange });

      await user.click(getEditButton());
      await user.type(getAmountInput(), value);

      expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ target: { value } }));
    });

    it('emits the blur event when blurring out of the component', async () => {
      const handleBlur = vi.fn<FocusEventHandler<HTMLInputElement>>();
      const value = '2';
      const { getAmountInput, getEditButton, user } = render({ onBlur: handleBlur });

      await user.click(getEditButton());
      await user.type(getAmountInput(), value);

      await user.click(document.body);

      // toHaveBeenCalledWith causes memory leak exception, probably due to big event object
      // expect.objectContaining didn't help
      const onBlurEventValue = handleBlur.mock.lastCall?.[0].target.value;
      expect(onBlurEventValue).toBe('$2');
    });

    it('emits the correct value when backspacing all the content in the input', async () => {
      const handleChange = vi.fn();
      const value = '2';
      const { getAmountInput, getEditButton, user } = render({ onChange: handleChange });

      await user.click(getEditButton());
      await user.type(getAmountInput(), value);
      await user.type(getAmountInput(), '{backspace}');

      expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ target: { value } }));
    });

    it("can't type more digits then the integer limit", async () => {
      const { getAmountInput, getAmountInputDisplay, getEditButton, user } = render({ value: 1 });

      expect(getAmountInputDisplay()).toBeInTheDocument();

      await user.click(getEditButton());

      const amountInput = getAmountInput();
      await user.type(amountInput, '12');

      expect(amountInput).toHaveValue('$1');
    });

    it('focuses the input with the ref', () => {
      const errorMessage = 'error message';
      const value = 1;
      const ref = createRef<HTMLInputElement>();

      const { getAmountInput } = render({
        value,
        errorMessage,
        ref,
      });

      expect(getAmountInput()).not.toHaveFocus();

      act(() => {
        ref.current?.focus();
      });

      expect(getAmountInput()).toHaveFocus();
      expect(screen.getByText('error message')).toBeVisible();
    });

    it('allows removing the error message after a change in the input', () => {
      const handleChange = vi.fn();
      const { queryEditButton, rerender } = render({ errorMessage: 'error message' });

      expect(queryEditButton()).not.toBeInTheDocument();

      rerender(<AmountInput onChange={handleChange} value={2000} errorMessage="" />);

      expect(queryEditButton()).not.toBeInTheDocument();
    });

    it('does not allow invalid value after 2 enters and a backspace', async () => {
      const { getAmountInput, queryEditButton, rerender, user } = render({ errorMessage: 'error message' });

      await user.type(getAmountInput(), '6000');

      await user.type(getAmountInput(), '{enter}');
      await user.type(getAmountInput(), '{enter}');

      expect(screen.getByText('error message')).toBeVisible();

      await user.type(getAmountInput(), '{backspace}');
      rerender(<AmountInput onChange={() => null} value={2000} errorMessage="" />);

      expect(queryEditButton()).not.toBeInTheDocument();
      expect(screen.queryByText('error message')).not.toBeInTheDocument();
    });
  });
});
