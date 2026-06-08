// Reference: Joyride's library https://github.com/gilbarbara/react-joyride/blob/main/src/modules/dom.js

/**
 * Check if the element is visible
 *
 * @param {HTMLElement} element
 *
 * @returns {boolean}
 */
export function isElementVisible(element?: HTMLElement): boolean {
  if (!element) return false;

  let parentElement = element;

  while (parentElement) {
    if (parentElement === document.body) break;

    if (parentElement instanceof HTMLElement) {
      const { display, visibility } = getComputedStyle(parentElement);

      if (display === 'none' || visibility === 'hidden') {
        return false;
      }
    }

    parentElement = parentElement.parentNode as HTMLElement;
  }
  return true;
}

/**
 * Find and return the target DOM element based on a step's 'target'.
 *
 * @private
 * @param {string|HTMLElement} element
 *
 * @returns {HTMLElement|null}
 */
export function getElement(element: string | HTMLElement): HTMLElement | null {
  if (typeof element === 'string') {
    return document.querySelector(element);
  }

  return element;
}
