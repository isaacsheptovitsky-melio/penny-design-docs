import { screen } from '@testing-library/dom';
import { userEvent } from '@testing-library/user-event';

import { themeBreakpoints } from '../../constants/breakpoints';
import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import { KEYBOARD_KEY } from '../../constants/keyboardsKeys';
import type { TestKitProps } from '../../testkit.types';
import { createIconButtonTestKit } from '../IconButton/createIconButtonTestKit';

export function createBaseModalTestKit({ dataTestId = DEFAULT_DATA_TEST_ID.BASE_MODAL }: TestKitProps = {}) {
  const isMobile = window.innerWidth < Number(themeBreakpoints.s.slice(0, -2));

  const getElement = () => screen.getByTestId(dataTestId);
  const getOverlay = () => (isMobile ? screen.getByTestId('base-sheet-overlay') : getElement().parentElement);
  const closeButtonDataTestId = isMobile ? 'sheet-close-button' : 'modal-close-button';

  return {
    dataTestId,
    getElement,
    getVisible: () => getElement().style.display !== 'none' && getElement().style.visibility !== 'hidden',
    getIsLoading: () => !!screen.queryByTestId('loading-container'),
    getRole: () => getElement().getAttribute('role'),
    clickOverlay: async () => await userEvent.click(getOverlay() as HTMLElement),
    pressEscape: async () => await userEvent.type(getElement(), KEYBOARD_KEY.ESCAPE),
    closeButton: createIconButtonTestKit({
      dataTestId: closeButtonDataTestId,
    }),
  };
}
