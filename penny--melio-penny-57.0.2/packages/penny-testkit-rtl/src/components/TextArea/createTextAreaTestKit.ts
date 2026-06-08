import { screen } from '@testing-library/dom';
import { type Options, type UserEvent, userEvent } from '@testing-library/user-event';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';

export function createTextAreaTestKit({ dataTestId = DEFAULT_DATA_TEST_ID.TEXT_AREA }: TestKitProps = {}) {
  const getElement = () => screen.getByTestId<HTMLTextAreaElement>(dataTestId);
  const getPlaceholder = () => getElement().getAttribute('placeholder') || '';

  const getValue = () => {
    if (getIsViewMode()) {
      return getElement().textContent;
    }
    return getElement().value;
  };

  const getIsLoading = () => getElement().getAttribute('data-loading') === 'true';
  const getIsReadOnly = () => getElement().readOnly;
  const getIsDisabled = () => getElement().disabled;
  const getIsInvalid = () => getElement().getAttribute('aria-invalid') === 'true';
  const getIsEditable = () => getElement().getAttribute('data-editable') === 'true';
  const getIsViewMode = () => getElement().getAttribute('data-view-mode') === 'true';

  const getMaxChars = () => {
    const maxLength = getElement().maxLength;
    return !maxLength || maxLength < 0 ? 0 : maxLength;
  };

  const getIsPlaceholderVisible = () => {
    const placeholder = getPlaceholder();
    const value = getValue();
    return Boolean(placeholder) && !value;
  };

  const type = async (text: string, options?: Options & Parameters<UserEvent['type']>[2]) =>
    await userEvent.type(getElement(), text, options);

  const clear = async () => await userEvent.clear(getElement());
  const click = async () => await userEvent.click(getElement());

  return {
    dataTestId,
    getElement,
    getIsLoading,
    getIsReadOnly,
    getIsDisabled,
    getIsInvalid,
    getIsEditable,
    getIsViewMode,
    getMaxChars,
    getValue,
    getPlaceholder,
    getIsPlaceholderVisible,
    type,
    clear,
    click,
  };
}
