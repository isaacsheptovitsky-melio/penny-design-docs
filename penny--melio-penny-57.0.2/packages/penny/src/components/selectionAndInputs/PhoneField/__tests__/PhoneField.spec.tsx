import { createPhoneFieldTestKit } from '@melio/penny-testkit-rtl';
import { expect } from 'vitest';

import { testAutoFocus, testReadOnly } from '@/components/form/test/utils/form.test.utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { PhoneField } from '../PhoneField';

validateComponent(PhoneField, 'PhoneField');

describe('Phone Field', () => {
  let testKit: ReturnType<typeof createPhoneFieldTestKit>;

  beforeEach(() => {
    testKit = createPhoneFieldTestKit();
  });

  it('masks the value correctly', () => {
    renderComponent(<PhoneField value="5551234567" />);

    expect(testKit.getValue()).toBe('(555) 123-4567');
  });

  it('should render an input field with autoComplete="tel"', () => {
    renderComponent(<PhoneField value="5551234567" />);

    expect(testKit.getElement()).toHaveAttribute('autoComplete', 'tel');
  });

  it('shoots the on change event with the raw phone number', async () => {
    const handleChange = vi.fn();
    const phoneNumber = '5551234567';
    renderComponent(<PhoneField onChange={handleChange} />);

    await testKit.type(phoneNumber);

    expect(handleChange).toHaveBeenNthCalledWith(10, expect.objectContaining({ target: { value: phoneNumber } }));
  });

  testAutoFocus(PhoneField, {});

  testReadOnly({ Comp: PhoneField });
});
