import type { Page } from '@playwright/test';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';

export function createTextFieldTestKit(
  page: Page,
  { dataTestId = DEFAULT_DATA_TEST_ID.TEXT_FIELD }: TestKitProps = {}
) {
  const getElement = () => page.getByTestId(dataTestId);
  const getIsViewMode = async () => (await getElement().getAttribute('data-view-mode')) === 'true';

  const getPlaceholder = async () => {
    if (await getIsViewMode()) {
      return null;
    }

    return await getElement().getAttribute('placeholder');
  };

  const getValue = async () => {
    if (await getIsViewMode()) {
      return await getElement().textContent();
    }

    return await getElement().inputValue();
  };

  const getIsLoading = async () => (await getElement().getAttribute('data-loading')) === 'true';
  const getIsReadOnly = async () => (await getElement().getAttribute('readonly')) !== null;
  const getIsDisabled = async () => await getElement().isDisabled();
  const getIsInvalid = async () => (await getElement().getAttribute('aria-invalid')) === 'true';
  const getIsRequired = async () => (await getElement().getAttribute('required')) !== null;

  const getMaxChars = async () => {
    if (await getIsViewMode()) {
      return 0;
    }

    const attr = await getElement().getAttribute('maxlength');
    return attr ? Number(attr) : 0;
  };

  const getIsPlaceholderVisible = async () => {
    const placeholder = await getPlaceholder();
    const value = await getValue();
    return Boolean(placeholder) && !value;
  };

  const type = async (text: string) => await getElement().fill(text);
  const clear = async () => await getElement().clear();
  const click = async () => await getElement().click();

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
