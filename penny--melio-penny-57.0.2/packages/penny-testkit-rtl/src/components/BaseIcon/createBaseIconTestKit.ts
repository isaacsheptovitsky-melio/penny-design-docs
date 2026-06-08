import { screen } from '@testing-library/dom';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';

export function createBaseIconTestKit({ dataTestId = DEFAULT_DATA_TEST_ID.BASE_ICON }: TestKitProps = {}) {
  const getElement = () => screen.getByTestId(dataTestId);

  return {
    dataTestId,
    getElement,
    getVisible: () => getElement().style.display !== 'none' && getElement().style.visibility !== 'hidden',
    getActive: () => getElement().hasAttribute('data-active'),
    getDisabled: () => getElement().hasAttribute('data-disabled'),
    getReadOnly: () => getElement().hasAttribute('data-readonly'),
    getIsBrandColor: () => getElement().getAttribute('data-is-brand-color') === 'true',
    getRole: () => getElement().getAttribute('role'),
  };
}
