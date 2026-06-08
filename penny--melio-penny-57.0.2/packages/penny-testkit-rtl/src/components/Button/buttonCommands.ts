import { screen } from '@testing-library/dom';
import { userEvent } from '@testing-library/user-event';

import type { ButtonTestKitTagType } from './types';

export function getButtonCommands(dataTestId: string) {
  const getElement = <T extends ButtonTestKitTagType = HTMLButtonElement>() => screen.getByTestId<T>(dataTestId);

  return {
    getElement,
    click: async () => await userEvent.click(getElement()),
    getDisabled: () => getElement().hasAttribute('disabled') || getElement().getAttribute('aria-disabled') === 'true',
    getIsLink: () => getElement().tagName === 'A',
    // consider to remove getHref method
    getHref: () => getElement().getAttribute('href'),
  };
}
