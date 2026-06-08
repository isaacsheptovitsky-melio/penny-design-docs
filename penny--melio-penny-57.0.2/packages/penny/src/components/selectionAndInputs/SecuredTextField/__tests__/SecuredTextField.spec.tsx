import { createSecuredTextFieldTestKit } from '@melio/penny-testkit-rtl';
import { act, waitFor } from '@testing-library/react';
import { beforeEach, expect } from 'vitest';

import { testAutoFocus, testReadOnly } from '@/components/form/test/utils/form.test.utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { SecuredTextField, type SecuredTextFieldProps } from '..';

describe('SecuredTextField', () => {
  const defaultProps = {
    onChange: vi.fn(),
  };

  validateComponent<SecuredTextFieldProps>(SecuredTextField, 'SecuredTextField', {
    wrapper: ({ children }) => <label>label{children}</label>,
  });

  testAutoFocus(SecuredTextField, {});

  testReadOnly({ Comp: SecuredTextField });

  let securedTextFiekdTestKit: ReturnType<typeof createSecuredTextFieldTestKit>;

  beforeEach(() => {
    securedTextFiekdTestKit = createSecuredTextFieldTestKit();
  });

  it('has a data-private attribute', () => {
    renderComponent(<SecuredTextField {...defaultProps} />);
    expect(securedTextFiekdTestKit.getElement()).toHaveAttribute('data-private');
  });

  it('should disable the toggle button when the value is empty', async () => {
    await act(() => renderComponent(<SecuredTextField {...defaultProps} />));
    expect(securedTextFiekdTestKit.maskIconButton.getDisabled()).toBeTruthy();
  });

  it('supports custom aria-label for toggle visibility button', async () => {
    const { getByLabelText, user } = await act(() =>
      renderComponent(
        <SecuredTextField
          value="3sR2FRx!mn3KzQVz"
          {...defaultProps}
          getToggleVisibilityAriaLabel={(isTextVisible: boolean) =>
            `Click to ${isTextVisible ? 'hide' : 'show'} password`
          }
        />
      )
    );

    await user.click(getByLabelText('Click to show password'));
    await user.click(getByLabelText('Click to hide password'));

    expect(getByLabelText('Click to show password')).toBeInTheDocument();
  });

  describe('field type', () => {
    it("the field's type is 'text' when the field value is visible", async () => {
      await act(() => renderComponent(<SecuredTextField value="1234" isTextVisible {...defaultProps} />));
      expect(securedTextFiekdTestKit.getIsTextVisible()).toBeTruthy();
    });

    it("the field's type is 'password' when the field value is not visible and not focus", async () => {
      await act(() => renderComponent(<SecuredTextField value="1234" {...defaultProps} />));
      expect(securedTextFiekdTestKit.getIsTextVisible()).toBeFalsy();
    });

    it("the field's type changed correctly according to the visibility and the focus state", async () => {
      await act(() => renderComponent(<SecuredTextField value="1234" type="number" isTextVisible {...defaultProps} />));
      expect(securedTextFiekdTestKit.getIsTextVisible()).toBeTruthy();

      // turn off the field text visibility
      await securedTextFiekdTestKit.toggleTextVisibility(false);
      expect(securedTextFiekdTestKit.getIsTextVisible()).toBeFalsy();

      // focus the field
      act(() => securedTextFiekdTestKit.getElement().focus());
      await waitFor(() => expect(securedTextFiekdTestKit.getElement()).toHaveAttribute('type', 'number'));
    });
  });
});
