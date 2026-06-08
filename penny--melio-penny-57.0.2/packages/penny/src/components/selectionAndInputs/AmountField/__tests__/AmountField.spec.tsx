import { createAmountFieldTestKit } from '@melio/penny-testkit-rtl';
import { expect } from 'vitest';

import { FloatingMenu } from '@/components/containers/menus/FloatingMenu';
import { testAutoFocus, testReadOnly } from '@/components/form/test/utils/form.test.utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { AmountField, AmountFieldEndElement, type AmountFieldProps } from '..';
import { renderAmountFieldWithEndElement } from './AmountField.driver';

validateComponent<AmountFieldProps>(AmountField, 'AmountField', {
  props: {
    placeholder: '0.00',
    integerLimit: 5,
    decimalLimit: 2,
    currencySign: '$',
    locale: 'en-US',
    currency: 'USD',
  },
});

describe('AmountField', () => {
  let testKit: ReturnType<typeof createAmountFieldTestKit>;
  beforeEach(() => {
    testKit = createAmountFieldTestKit();
  });

  it('value changed when `value` prop changes', () => {
    const { rerender } = renderComponent(<AmountField value="1" currencySign="$" locale="en-US" currency="USD" />);

    expect(testKit.getValue()).toBe('$1');
    rerender(<AmountField value="12" currencySign="$" locale="en-US" currency="USD" />);
    expect(testKit.getValue()).toBe('$12');
  });

  describe('Currency formatting', () => {
    it('adds a currency symbol to the end of the input container', () => {
      const inputText = '123';
      renderComponent(<AmountField value={inputText} currencySign="$" locale="en-US" currency="USD" />);

      expect(testKit.getValue()).toBe(`$${inputText}`);
    });

    it('adds a thousands separator in case the number bigger then 999', () => {
      const inputText = '1000';
      renderComponent(<AmountField currencySign="$" locale="en-US" currency="USD" value={inputText} />);

      expect(testKit.getValue()).toBe('$1,000');
    });

    it('handles decimal numbers', () => {
      const inputText = '123.12';
      renderComponent(<AmountField currencySign="$" locale="en-US" currency="USD" value={inputText} />);

      expect(testKit.getValue()).toBe(`$${inputText}`);
    });

    it('respects the integerLimit property', () => {
      const onChange = vi.fn();
      const inputText = '12344';
      renderComponent(
        <AmountField
          currencySign="$"
          locale="en-US"
          currency="USD"
          integerLimit={2}
          onChange={onChange}
          value={inputText}
        />
      );

      expect(testKit.getValue()).toBe('$12');
    });

    it('triggers `onChange` while respecting the `integerLimit` property', async () => {
      const onChange = vi.fn();
      const inputText = '12344';
      renderComponent(
        <AmountField currencySign="$" locale="en-US" currency="USD" integerLimit={2} onChange={onChange} />
      );
      await testKit.click();
      await testKit.type(inputText);

      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ target: { value: '12' } }));
    });

    it('fire `onBlur` when leave focus', async () => {
      const onChange = vi.fn();
      const onBlur = vi.fn();
      const inputText = '12344';
      const { user } = renderComponent(
        <AmountField
          currencySign="$"
          locale="en-US"
          currency="USD"
          integerLimit={2}
          onBlur={onBlur}
          onChange={onChange}
          value={inputText}
        />
      );
      await testKit.click();

      // Blur
      await user.click(document.body);
      expect(onBlur).toHaveBeenCalledOnce();
      // `toHaveBeenCalledWith` with `objectContaining` fails with an out of memory exception
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(onBlur.mock.calls[0]?.[0].target.value).toBe('$12');
      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ target: { value: '12' } }));
    });

    it('supports negative numbers', async () => {
      const handleChange = vi.fn();
      renderComponent(
        <AmountField currencySign="$" locale="en-US" currency="USD" integerLimit={4} onChange={handleChange} />
      );

      await testKit.type('-12');
      expect(testKit.getValue()).toBe('-$12');

      expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ target: { value: '-12' } }));

      await testKit.clear();

      await testKit.type('-123.12.');
      expect(testKit.getValue()).toBe('-$123.12');
      expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ target: { value: '-123.12' } }));

      await testKit.clear();

      await testKit.type('-1000');
      expect(testKit.getValue()).toBe('-$1,000');
      expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ target: { value: '-1000' } }));
    });

    it('remove leading zeroes', () => {
      const inputText = '001.23';
      renderComponent(<AmountField currencySign="$" locale="en-US" currency="USD" value={inputText} />);

      expect(testKit.getValue()).toBe('$1.23');
    });

    it('changes the placeholder prefix when the currency changes', () => {
      const { rerender } = renderComponent(<AmountField currencySign="$" locale="en-US" currency="USD" />);

      expect(testKit.getPlaceholder()).toBe('$0.00');
      rerender(<AmountField currency="ILS" currencySign="₪" locale="en-IL" />);
      expect(testKit.getPlaceholder()).toBe('₪0.00');
    });

    it('removes the decimals from non-decimal currencies', () => {
      const { rerender } = renderComponent(<AmountField value={1.23} currencySign="₪" locale="en-IL" currency="ILS" />);
      expect(testKit.getValue()).toBe('₪1.23');

      rerender(<AmountField currencySign="₩" locale="en-KR" value={1.23} currency="KRW" />);
      expect(testKit.getValue()).toBe('₩1');
    });

    it('show decimal digits when `decimalScale` prop is set', () => {
      const inputText = '123';
      renderComponent(
        <AmountField currencySign="$" locale="en-US" currency="USD" value={inputText} decimalScale={2} />
      );

      expect(testKit.getValue()).toBe(`$${inputText}.00`);
    });
  });

  describe('End element', () => {
    it("doesn't trigger a click if disabled", async () => {
      const onClick = vi.fn();
      const { getByRole, user } = renderComponent(
        <AmountField
          currencySign="$"
          locale="en-US"
          currency="USD"
          endElement={
            <FloatingMenu
              isOpen={false}
              onOpenChange={onClick}
              trigger={<AmountFieldEndElement isDisabled>end element</AmountFieldEndElement>}
              content="children"
            />
          }
        />
      );

      await user.click(getByRole('button'));

      expect(onClick).not.toHaveBeenCalled();
    });

    it('should allow focusing the end element when read-only by tab', async () => {
      const { user, getByText } = renderAmountFieldWithEndElement({ isReadOnly: true });

      await user.tab(); // focus should go to the input
      await user.tab(); // focus should now move to the end element

      const endElement = getByText('end element');
      expect(endElement).toHaveFocus();
    });

    it('should allow focusing the end element when read-only by click', async () => {
      const { user, getByText } = renderAmountFieldWithEndElement({ isReadOnly: true });
      const endElement = getByText('end element');
      await user.click(endElement);
      expect(endElement).toHaveFocus();
    });

    it('should not allow focusing the end element when disabled', async () => {
      const { user, getByText } = renderAmountFieldWithEndElement({ isDisabled: true });

      await user.tab(); // focus should go to the input
      await user.tab(); // focus should now move to the end element

      const endElement = getByText('end element');
      expect(endElement).not.toHaveFocus();
    });
  });

  describe('foreign exchange support', () => {
    it('uses currency sign and locale', () => {
      renderComponent(<AmountField value="100" currencySign="฿" locale="th-TH" currency="THB" />);
      expect(testKit.getValue()).toBe('฿100');
    });

    it('view mode', () => {
      const { rerender } = renderComponent(
        <AmountField value="1000" currencySign="$" locale="en-US" currency="USD" isViewMode />
      );
      expect(testKit.getValue()).toBe('$1,000');

      rerender(<AmountField value="1000" currencySign="฿" locale="th-TH" currency="THB" isViewMode />);
      expect(testKit.getValue()).toBe('฿1,000');
    });
  });

  testAutoFocus(AmountField, { currencySign: '$', locale: 'en-US', currency: 'USD' });
  testReadOnly({ Comp: AmountField });
});
