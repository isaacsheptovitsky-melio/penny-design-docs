import { createTextAreaTestKit } from '@melio/penny-testkit-rtl';
import { beforeEach, expect } from 'vitest';

import { testAutoFocus, testReadOnly } from '@/components/form/test/utils/form.test.utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { TextArea } from '../TextArea';
import { type TextAreaProps } from '../TextArea.types';

describe('TextArea', () => {
  validateComponent<TextAreaProps>(TextArea, 'TextArea');

  testAutoFocus<TextAreaProps>(TextArea, {});

  testReadOnly<TextAreaProps>({ Comp: TextArea });

  let textareaTestKit: ReturnType<typeof createTextAreaTestKit>;

  beforeEach(() => {
    textareaTestKit = createTextAreaTestKit();
  });

  it('should render the value', async () => {
    renderComponent(<TextArea aria-label="text area" />);
    await textareaTestKit.type('bla');
    expect(textareaTestKit.getValue()).toBe('bla');
  });

  it('should focus on the input when clicked and blur on click outside', async () => {
    const { user } = renderComponent(<TextArea aria-label="text area" />);
    await textareaTestKit.click();
    expect(textareaTestKit.getElement()).toHaveFocus();
    await user.click(document.body);
    expect(textareaTestKit.getElement()).not.toHaveFocus();
  });

  it('should focus on the input on tab', async () => {
    const { user } = renderComponent(<TextArea aria-label="text area" />);
    await user.tab();
    expect(textareaTestKit.getElement()).toHaveFocus();
  });

  it('should not focus the input when disabled', async () => {
    const { getByLabelText, user } = renderComponent(<TextArea aria-label="text area" isDisabled />);
    await user.click(getByLabelText('text area'));
    expect(textareaTestKit.getElement()).not.toHaveFocus();
  });

  it('should render the placeholder', () => {
    renderComponent(<TextArea aria-label="text area" placeholder="placeholder" />);
    expect(textareaTestKit.getPlaceholder()).toBe('placeholder');
  });

  it('should have a data-loading attribute set to true', () => {
    renderComponent(<TextArea aria-label="text area" isLoading />);
    expect(textareaTestKit.getIsLoading()).toBeTruthy();
  });

  it('numberOfRows prop should have default value of 4', () => {
    const dataTestId = 'test-text-area';
    const textareaTestKit = createTextAreaTestKit({ dataTestId });
    renderComponent(<TextArea data-testid={dataTestId} />);

    expect(textareaTestKit.getElement()).toHaveAttribute('rows', '4');
  });

  it('Should use numberOfRows prop value', () => {
    const dataTestId = 'test-text-area';
    const textareaTestKit = createTextAreaTestKit({ dataTestId });
    renderComponent(<TextArea data-testid={dataTestId} numberOfRows={2} />);

    expect(textareaTestKit.getElement()).toHaveAttribute('rows', '2');
  });
});
