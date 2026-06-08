import { createTextFieldTestKit } from '@melio/penny-testkit-rtl';
import { beforeEach, expect } from 'vitest';

import { testAutoFocus, testReadOnly } from '@/components/form/test/utils/form.test.utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { TextField, type TextFieldProps } from '..';

describe('TextField', () => {
  validateComponent<TextFieldProps>(TextField, 'TextField', {
    props: { 'aria-label': 'label' },
  });

  testAutoFocus(TextField, {});

  testReadOnly({ Comp: TextField });

  let testKit: ReturnType<typeof createTextFieldTestKit>;

  beforeEach(() => {
    testKit = createTextFieldTestKit();
  });

  it('should render the value', async () => {
    renderComponent(<TextField aria-label="text field" />);
    await testKit.type('bla');
    expect(testKit.getValue()).toBe('bla');
  });

  it('should render the default value', () => {
    const handleChange = vi.fn();
    renderComponent(<TextField value="default value" aria-label="text field" onChange={handleChange} />);
    expect(testKit.getValue()).toBe('default value');
  });

  it('should trigger a change event', async () => {
    const handleChange = vi.fn();
    renderComponent(<TextField aria-label="text field" onChange={handleChange} />);
    await testKit.type('b');
    expect(handleChange).toBeCalledTimes(1);
  });

  it('should focus on the input when clicked and blur on click outside', async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    const { user } = renderComponent(<TextField aria-label="text field" onFocus={onFocus} onBlur={onBlur} />);
    await testKit.click();
    expect(testKit.getElement()).toHaveFocus();
    expect(onFocus).toHaveBeenCalledTimes(1);
    await user.click(document.body);
    expect(testKit.getElement()).not.toHaveFocus();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('should focus on the input on tab', async () => {
    const onFocus = vi.fn();

    const { user } = renderComponent(<TextField aria-label="text field" onFocus={onFocus} />);
    await user.tab();
    expect(testKit.getElement()).toHaveFocus();
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('should not focus the input when disabled', async () => {
    renderComponent(<TextField aria-label="text field" isDisabled />);
    await testKit.click();
    expect(testKit.getElement()).not.toHaveFocus();
  });

  it('should render the placeholder', () => {
    renderComponent(<TextField aria-label="text field" placeholder="placeholder" />);
    expect(testKit.getPlaceholder()).toBe('placeholder');
    expect(testKit.getIsPlaceholderVisible()).toBe(true);
  });

  describe('View Mode', () => {
    it('should display the viewModePlaceholder in view-mode', () => {
      renderComponent(<TextField isViewMode viewModePlaceholder="viewModePlaceholder" />);
      expect(testKit.getValue()).toBe('viewModePlaceholder');
    });

    it("should display the placeholder if there's no viewModePlaceholder in view-mode", () => {
      renderComponent(<TextField isViewMode placeholder="placeholder" />);
      expect(testKit.getValue()).toBe('placeholder');
    });

    it('should receive data attributes', () => {
      const { rerender } = renderComponent(<TextField isViewMode placeholder="placeholder" data-something />);
      expect(testKit.getElement().getAttribute('data-something')).toBe('true');

      rerender(<TextField isViewMode placeholder="placeholder" data-something={false} />);
      expect(testKit.getElement().getAttribute('data-something')).toBe('false');

      rerender(<TextField isViewMode placeholder="placeholder" data-something="something" />);
      expect(testKit.getElement().getAttribute('data-something')).toBe('something');
    });
  });

  it('should have a data-loading attribute set to true', () => {
    renderComponent(<TextField aria-label="text field" isLoading />);
    expect(testKit.getIsLoading()).toBeTruthy();
  });

  it('should have aria-invalid false when isInvalid false', () => {
    renderComponent(<TextField isInvalid={false} />);
    expect(testKit.getIsInvalid()).toBeFalsy();
  });

  it('should have aria-invalid true when isInvalid true', () => {
    renderComponent(<TextField isInvalid />);
    expect(testKit.getIsInvalid()).toBeTruthy();
  });
});
