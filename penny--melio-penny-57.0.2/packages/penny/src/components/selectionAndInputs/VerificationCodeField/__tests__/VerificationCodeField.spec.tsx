import { createVerificationCodeFieldTestKit } from '@melio/penny-testkit-rtl';
import { act, waitFor } from '@testing-library/react';
import { expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { VerificationCodeField } from '../VerificationCodeField';
import { type VerificationCodeFieldProps } from '../VerificationCodeField.types';

const code = '1234';

describe('VerificationCodeField', () => {
  validateComponent<VerificationCodeFieldProps>(VerificationCodeField, 'VerificationCodeField', {
    props: { onComplete: vi.fn() },
  });

  let testKit: ReturnType<typeof createVerificationCodeFieldTestKit>;

  beforeEach(() => {
    vi.useRealTimers();
    testKit = createVerificationCodeFieldTestKit();
  });

  it('should type numbers only', async () => {
    renderComponent(<VerificationCodeField onComplete={vi.fn()} />);

    await testKit.type('T');
    expect(testKit.getValue()).toBe('');

    await testKit.type('1');
    await waitFor(() => expect(testKit.getValue()).toBe('1'));
  });

  it(`should call to 'onComplete' when all field are valid`, async () => {
    const onComplete = vi.fn().mockResolvedValue(true);
    renderComponent(<VerificationCodeField onComplete={onComplete} />);

    await act(async () => testKit.type(code));

    expect(onComplete).toBeCalledWith(code);
    expect(testKit.getIsDisabled()).toBe(true);
  });

  it(`shouldn't call 'onComplete' when the fields are invalid`, async () => {
    const onComplete = vi.fn();
    renderComponent(<VerificationCodeField onComplete={onComplete} />);

    await testKit.type(code.slice(0, 3));

    expect(onComplete).not.toBeCalled();
  });

  it('paste should occur on the first input only.', async () => {
    const { user } = renderComponent(<VerificationCodeField onComplete={vi.fn()} />);

    const inputs = testKit.getInputs();

    inputs[2]?.focus();
    await act(async () => user.paste(code));

    await waitFor(() =>
      inputs.forEach((input, i) => {
        if (i === 2) {
          expect(input).toHaveValue(code[0]);
        } else {
          expect(input).toHaveValue('');
        }
      })
    );
  });

  // TODO: test backspace behavior [https://meliorisk.atlassian.net/browse/ME-23974]
  // eslint-disable-next-line vitest/no-disabled-tests
  it.skip('backspace should work properly', async () => {
    const { user } = renderComponent(<VerificationCodeField onComplete={vi.fn()} />);
    const inputs = testKit.getInputs();

    for (const [i, input] of inputs.splice(0, 2).entries()) {
      await act(async () => user.type(input, code[i] as string));
    }

    // check the input[2] has value
    expect(inputs[1]).toHaveValue(code[1]);

    // delete the input[2]'s value by pressing backspace
    await act(async () => user.type(inputs[1] as HTMLElement, `{Backspace}`));
    expect(inputs[1]).toHaveValue('');

    // delete the input[1]'s value by pressing backspace again.
    await act(async () => user.type(inputs[1] as HTMLElement, `{Backspace}`));
    expect(inputs[0]).toHaveValue('');
  });

  it('supports custom aria-label for fields', () => {
    const { getByLabelText } = renderComponent(
      <VerificationCodeField onComplete={vi.fn()} fieldAriaLabel="Custom label's field" />
    );

    const inputs = testKit.getInputs();
    inputs.forEach((input, i) => {
      expect(getByLabelText(`Custom label's field ${i + 1}`)).toBe(input);
    });
  });

  it('should focus on the first input when autoFocus is true', () => {
    renderComponent(<VerificationCodeField onComplete={vi.fn()} autoFocus />);

    expect(testKit.getInputs()[0]).toHaveFocus();
  });

  describe('disabled', () => {
    it('should mark all inputs as disabled when disabled', () => {
      renderComponent(<VerificationCodeField onComplete={vi.fn()} disabled />);

      expect(testKit.getIsDisabled()).toBe(true);
    });

    it('should not allow typing when disabled', async () => {
      renderComponent(<VerificationCodeField onComplete={vi.fn()} disabled />);

      await testKit.type(code);

      expect(testKit.getValue()).toBe('');
    });
  });

  describe('readOnly', () => {
    it('should mark all inputs as read-only when read only', () => {
      renderComponent(<VerificationCodeField onComplete={vi.fn()} readOnly />);

      expect(testKit.getIsReadOnly()).toBe(true);
    });

    it('should not allow typing when read only', async () => {
      renderComponent(<VerificationCodeField onComplete={vi.fn()} readOnly />);

      await testKit.type(code);

      expect(testKit.getValue()).toBe('');
    });
  });

  describe('value (controlled)', () => {
    it('should render inputs pre-filled with the provided value', () => {
      renderComponent(<VerificationCodeField onComplete={vi.fn()} value={['1', '2', '3', '4']} />);

      expect(testKit.getValue()).toBe(code);
    });

    it('should call onChange when a digit is typed', async () => {
      const onChange = vi.fn();
      renderComponent(<VerificationCodeField onComplete={vi.fn()} value={['', '', '', '']} onChange={onChange} />);

      await testKit.type('1');

      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('defaultValue (uncontrolled)', () => {
    it('should pre-fill inputs with defaultValue on mount', () => {
      renderComponent(<VerificationCodeField onComplete={vi.fn()} defaultValue={['1', '2', '', '']} />);

      const inputs = testKit.getInputs();
      expect(inputs[0]).toHaveValue('1');
      expect(inputs[1]).toHaveValue('2');
      expect(inputs[2]).toHaveValue('');
      expect(inputs[3]).toHaveValue('');
    });

    it('should call onComplete when the pre-filled defaultValue is completed by typing', async () => {
      const onComplete = vi.fn().mockResolvedValue(true);
      const { user } = renderComponent(
        <VerificationCodeField onComplete={onComplete} defaultValue={['1', '2', '3', '']} />
      );

      const inputs = testKit.getInputs();
      await act(async () => user.type(inputs[3] as HTMLElement, '4'));

      await waitFor(() => expect(onComplete).toHaveBeenCalledWith(code));
    });
  });
});
