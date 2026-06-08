// https://github.com/downshift-js/downshift/blob/master/src/set-a11y-status.js
import { useDebounceCallback } from '@melio/penny-utils';
import { useCallback, useEffect, useState } from 'react';

import { useBreakpoint } from '@/theme/providers/BreakpointProvider';

import { type ComboboxOption } from '../Combobox.types';

const createStatusElement = (statusElementId: string, containerId: string) => {
  const statusElement = document.createElement('div');
  statusElement.setAttribute('data-component', 'Combobox.A11yStatusMessage');
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

type A11yStatusMessageOptions<V, O extends ComboboxOption<V>> = {
  selectedOptionLabel?: O['label'];
  isLoadingOptions?: boolean;
  loadingMessage: string;
  emptyMessage: string;
  isOpen: boolean;
  optionsCount: number;
  idPrefix: string;
  isMobileTrigger: boolean;
};

/**
 * This hook generates a unique accessible status message inside each `Combobox` component rendered in the DOM.
 * It's meant to indicate important state changes to screen readers.
 */
export const useA11yStatusMessage = <V, O extends ComboboxOption<V>>({
  selectedOptionLabel,
  isLoadingOptions,
  loadingMessage,
  emptyMessage,
  isOpen,
  optionsCount,
  idPrefix,
  isMobileTrigger,
}: A11yStatusMessageOptions<V, O>) => {
  const { isExtraSmallScreen: isMobile } = useBreakpoint();
  const statusElementId = `${idPrefix}-a11y-status-message`;
  const containerId = getContainerId(idPrefix);

  // Create debounced functions inside the hook
  const debouncedCleanupStatus = useDebounceCallback((statusElement: Element) => {
    statusElement.textContent = '';
  }, 50); // We need a delay of 1-100ms in order to avoid duplicate SR announcements.

  const debouncedInjectStatus = useDebounceCallback((status: string, statusElement: Element) => {
    statusElement.textContent = status;
    debouncedCleanupStatus(statusElement);
  }, 600); // We need a delay of 600-1200ms in order to avoid duplicate SR announcements.

  const setStatus = useCallback(
    (status: string, id: string) => {
      const statusElement = document.getElementById(id);

      if (!statusElement) return;

      debouncedInjectStatus(status, statusElement);
    },
    [debouncedInjectStatus]
  );

  useEffect(() => {
    // We don't need an a11y message for the mobile-edit-mode trigger.
    if (isMobileTrigger) return;

    createStatusElement(statusElementId, containerId);

    return () => cleanupStatusElement(statusElementId);
  }, [containerId, isMobileTrigger, statusElementId]);

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!message) return;

    setStatus(message, statusElementId);
    // TODO:https://meliorisk.atlassian.net/browse/ME-110373
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessage('');
  }, [message, statusElementId, setStatus]);

  // Announce the loading state when the options are being fetched.
  useEffect(() => {
    if (!isOpen || !isLoadingOptions) return;

    // TODO:https://meliorisk.atlassian.net/browse/ME-110373
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessage(loadingMessage);
  }, [isLoadingOptions, isOpen, loadingMessage]);

  // Announce the number of options available when the menu is opened and there are filtered options.
  useEffect(() => {
    if (!isOpen || isLoadingOptions) return;

    const searchResult = optionsCount
      ? `${optionsCount} ${optionsCount > 1 ? 'results' : 'result'} available. ${isMobile ? '' : ' Use up and down arrow keys to navigate. Press Enter key to select.'}`
      : emptyMessage;

    // TODO:https://meliorisk.atlassian.net/browse/ME-110373
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessage(searchResult);
  }, [emptyMessage, isOpen, isLoadingOptions, isMobile, optionsCount]);

  // Announce the newly selected option.
  useEffect(() => {
    if (!selectedOptionLabel) return;

    // TODO:https://meliorisk.atlassian.net/browse/ME-110373
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessage(`${selectedOptionLabel} has been selected.`);
  }, [selectedOptionLabel]);
};
