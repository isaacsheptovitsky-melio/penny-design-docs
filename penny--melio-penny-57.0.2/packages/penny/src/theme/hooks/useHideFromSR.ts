import { isMobileIOS } from '@melio/penny-utils';
import { useEffect } from 'react';

export const VISIBLE_MELIO_WRAPPER_ATTRIBUTE = 'data-always-visible';

const shouldHideElement = (element: Element, ignoreParent: Element) => {
  const isNotDescendant = !ignoreParent.contains(element);
  const isNotStatusMessage = !/a11y-status-message/.test(element.id);
  const isNotVisibleMelioWrapper = !element.hasAttribute(VISIBLE_MELIO_WRAPPER_ATTRIBUTE);

  return isNotDescendant && isNotStatusMessage && isNotVisibleMelioWrapper;
};
const setAttributes = (elements: NodeListOf<Element>, ignoreParent: Element) => {
  elements.forEach((element) => {
    if (shouldHideElement(element, ignoreParent)) {
      element.setAttribute('aria-hidden', 'true');
      element.setAttribute('data-floating-ui-inert', '');
      element.setAttribute('inert', '');
    }
  });
};

const removeAttributes = (elements: NodeListOf<Element>, ignoreParent: Element) => {
  elements.forEach((element) => {
    if (shouldHideElement(element, ignoreParent)) {
      element.removeAttribute('aria-hidden');
      element.removeAttribute('data-floating-ui-inert');
      element.removeAttribute('inert');
    }
  });
};

/**
 *
 * Adds `aria-hidden="true"` and `data-floating-ui-inert` to all `melio-wrapper` and `aria-live` elements,
 * ignoring the active floating element.
 *
 * This is a workaround to handle focus escaping from the current active floating element on mobile and **should only be used inside Penny**.
 *
 * @param ignoreEl The element to ignore
 * @param enable When to add the attributes
 */
export const useHideFromSR = ({ ignoreEl, enable }: { ignoreEl: HTMLElement | null; enable: boolean }) => {
  const ignoreParent = ignoreEl?.closest('melio-wrapper');
  const shouldHideElements = enable && ignoreParent;

  useEffect(() => {
    const melioWrapperElements = document.querySelectorAll('melio-wrapper');
    const ariaLiveElements = document.querySelectorAll('[aria-live]:not([aria-hidden])');

    let timeoutId: NodeJS.Timeout;

    if (shouldHideElements) {
      // This fixes an issue on iOS devices, when floating UI focus guard elements are not hidden when the dropdown is open.
      if (isMobileIOS()) {
        timeoutId = setTimeout(() => {
          ignoreEl?.querySelectorAll('[data-floating-ui-focus-guard]').forEach((element) => {
            element.setAttribute('aria-hidden', 'true');
            element.removeAttribute('role');
          });
        }, 100);
      }

      setAttributes(melioWrapperElements, ignoreParent);
      setAttributes(ariaLiveElements, ignoreParent);
    }

    return () => {
      if (shouldHideElements) {
        removeAttributes(melioWrapperElements, ignoreParent);
        removeAttributes(ariaLiveElements, ignoreParent);

        clearTimeout(timeoutId);
      }
    };
  }, [ignoreEl, ignoreParent, shouldHideElements]);
};
