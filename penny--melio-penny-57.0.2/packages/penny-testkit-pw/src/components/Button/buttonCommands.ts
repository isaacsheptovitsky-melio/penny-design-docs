import type { Locator } from '@playwright/test';

export function getButtonCommands(element: Locator) {
  return {
    click: async () => await element.click(),
    getDisabled: async () => await element.isDisabled(),
    getIsLink: async () => (await element.evaluate((element: HTMLElement) => element.tagName)) === 'A',
    // consider to remove getHref method
    getHref: async () => await element.getAttribute('href'),
  };
}
