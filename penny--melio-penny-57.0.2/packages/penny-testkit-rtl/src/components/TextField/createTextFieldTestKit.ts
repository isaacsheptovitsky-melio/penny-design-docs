import { screen } from '@testing-library/dom';
import { type Options, type UserEvent, userEvent } from '@testing-library/user-event';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';

export function createTextFieldTestKit({ dataTestId = DEFAULT_DATA_TEST_ID.TEXT_FIELD }: TestKitProps = {}) {
  const getElement = () => screen.getByTestId<HTMLInputElement>(dataTestId);
  const getIsViewMode = () => getElement().getAttribute('data-view-mode') === 'true';

  const getPlaceholder = () => {
    if (getIsViewMode()) {
      return null;
    }

    return getElement().placeholder;
  };

  const getValue = () => {
    if (getIsViewMode()) {
      return getElement().textContent;
    }

    return getElement().value;
  };

  const getMaxChars = () => {
    if (getIsViewMode()) {
      return 0;
    }

    return getElement().maxLength || 0;
  };

  const getIsLoading = () => getElement().getAttribute('data-loading') === 'true';
  const getIsReadOnly = () => getElement().readOnly;
  const getIsDisabled = () => getElement().disabled;
  const getIsInvalid = () => getElement().ariaInvalid === 'true';
  const getIsRequired = () => getElement().required;
  const getIsPlaceholderVisible = () => !!getPlaceholder() && !getValue();

  const type = async (text: string, options?: Options & Parameters<UserEvent['type']>[2]) =>
    await userEvent.type(getElement(), text, options);

  const clear = async () => await userEvent.clear(getElement());
  const click = async () => await userEvent.click(getElement());

  return {
    dataTestId,
    getElement,
    getIsViewMode,
    getIsLoading,
    getIsReadOnly,
    getIsDisabled,
    getIsInvalid,
    getIsRequired,
    getMaxChars,
    getValue,
    getPlaceholder,
    getIsPlaceholderVisible,
    type,
    clear,
    click,
  };
}
