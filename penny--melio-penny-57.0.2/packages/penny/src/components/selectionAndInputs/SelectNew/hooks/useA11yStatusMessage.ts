// https://github.com/downshift-js/downshift/blob/master/src/set-a11y-status.js
import { useDebounceCallback } from '@melio/penny-utils';
import { useCallback, useEffect, useState } from 'react';

import { useBreakpoint } from '@/theme/providers/BreakpointProvider';

import { type SelectNewOption } from '../SelectNew.types';

const createStatusElement = (statusElementId: string, containerId: string) => {
  const statusElement = document.createElement('div');
  statusElement.setAttribute('data-component', 'SelectNew.A11yStatusMessage');
  statusElement.setAttribute('id', statusElementId);
  statusElement.setAttribute('role', 'status');
  statusElement.setAttribute('aria-live', 'polite');
  statusElement.setAttribute('aria-relevant', 'additions text');

  Object.assign(statusElement.style, {
    border: '0',
    clip: 'rect(0 0 0 0)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: '0',
    position: 'absolute',
    width: '1px',
  });

  document.getElementById(containerId)?.appendChild(statusElement);
};

const cleanupStatusElement = (id: string) => {
  document.getElementById(id)?.remove();
};

export const getContainerId = (prefix?: string) => `${prefix}-container`;

type A11yStatusMessageOptions<V, O extends SelectNewOption<V>> = {
  selectedOptionLabel?: O['label'];
  isOpen: boolean;
  optionsCount: number;
  emptyMessage: string;
  idPrefix: string;
};

/**
 * This hook generates a unique accessible status message inside each `SelectNew` component rendered in the DOM.
 * It's meant to indicate important state changes to screen readers.
 */
export const useA11yStatusMessage = <V, O extends SelectNewOption<V>>({
  selectedOptionLabel,
  isOpen,
  optionsCount,
  emptyMessage,
  idPrefix,
}: A11yStatusMessageOptions<V, O>) => {
  const { isExtraSmallScreen: isMobile } = useBreakpoint();
  const statusElementId = `${idPrefix}-a11y-status-message`;
  const containerId = getContainerId(idPrefix);

  // Create debounced functions inside the hook
  const debouncedCleanupStatus = useDebounceCallback((statusElement: Element) => {
    statusElement.textContent = '';
  }, 50);

  const debouncedInjectStatus = useDebounceCallback((status: string, statusElement: Element) => {
    statusElement.textContent = status;
    debouncedCleanupStatus(statusElement);
  }, 600);

  const setStatus = useCallback(
    (status: string, id: string) => {
      const statusElement = document.getElementById(id);

      if (!statusElement) return;

      debouncedInjectStatus(status, statusElement);
    },
    [debouncedInjectStatus]
  );

  useEffect(() => {
    createStatusElement(statusElementId, containerId);

    return () => cleanupStatusElement(statusElementId);
  }, [containerId, statusElementId]);

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!message) return;

    setStatus(message, statusElementId);
    // TODO:https://meliorisk.atlassian.net/browse/ME-110373
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessage('');
  }, [message, statusElementId, setStatus]);

  // Announce the number of options available when the menu is opened or the empty message when there are no options.
  useEffect(() => {
    if (isOpen) {
      const result = `${optionsCount} ${optionsCount > 1 ? 'results' : 'result'} available. ${isMobile ? '' : ' Use up and down arrow keys to navigate. Press Enter key to select.'}`;
      const menuMessage = optionsCount ? result : emptyMessage;

      // TODO:https://meliorisk.atlassian.net/browse/ME-110373
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMessage(menuMessage);
    } else {
      // Passing a non-breaking space so that SR would read the menu's empty message each time it's opened.
      setMessage('\u00A0');
    }
  }, [emptyMessage, isMobile, isOpen, optionsCount]);

  // Announce the newly selected option.
  useEffect(() => {
    if (!selectedOptionLabel) return;

    // TODO:https://meliorisk.atlassian.net/browse/ME-110373
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessage(`${selectedOptionLabel} has been selected.`);
  }, [selectedOptionLabel]);
};
