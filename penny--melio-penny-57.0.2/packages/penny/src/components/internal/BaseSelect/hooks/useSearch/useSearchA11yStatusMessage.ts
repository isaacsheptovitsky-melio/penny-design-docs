// https://github.com/downshift-js/downshift/blob/master/src/set-a11y-status.js
import { uniqueId, useDebounceCallback } from '@melio/penny-utils';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useBreakpoint } from '@/theme/providers/BreakpointProvider';

const getStatusMessageParentSelectorElement = (statusMessageParentSelector?: string) =>
  (statusMessageParentSelector && document.querySelector(statusMessageParentSelector)) || document.body;

// Get the status node or create it if it does not already exist.
const getStatusElement = ({
  statusMessageParentSelector,
  id,
}: {
  statusMessageParentSelector?: string;
  id: string;
}) => {
  let statusElement = document.getElementById(id);

  if (statusElement) return statusElement;

  statusElement = document.createElement('div');
  statusElement.setAttribute('data-component', 'Search.A11yStatusMessage');
  statusElement.setAttribute('id', id);
  statusElement.setAttribute('data-testid', id);
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

  getStatusMessageParentSelectorElement(statusMessageParentSelector).appendChild(statusElement);

  return statusElement;
};

const cleanupStatusElement = (id: string) => {
  document.getElementById(id)?.remove();
};

type A11ySearchStatusMessageOptions = {
  isOpen: boolean;
  isLoading?: boolean;
  optionsCount?: number;
  statusMessageParentSelector?: string;
  emptyStateLabel?: string;
  selectedOptionLabel?: string;
};

/**
 * This hook generates a single accessible status message for all `Search` components rendered in the DOM.
 * It's meant to indicate important state changes to screen readers.
 */
export const useSearchA11yStatusMessage = ({
  isOpen,
  selectedOptionLabel,
  optionsCount,
  statusMessageParentSelector,
  isLoading,
  emptyStateLabel,
}: A11ySearchStatusMessageOptions) => {
  // Generate a unique ID for the status message element, in case the component is rendered multiple times.
  const id = useMemo(() => uniqueId('search-a11y-status-message-'), []);

  const debouncedCleanupStatus = useDebounceCallback(
    ({ statusMessageParentSelector, id }: { statusMessageParentSelector?: string; id: string }) => {
      getStatusElement({ statusMessageParentSelector, id }).textContent = '';
    },
    500
  );

  const setStatus = useCallback(
    ({
      status,
      statusMessageParentSelector,
      id,
    }: {
      status: string;
      statusMessageParentSelector?: string;
      id: string;
    }) => {
      getStatusElement({ statusMessageParentSelector, id }).textContent = status;
      debouncedCleanupStatus({ statusMessageParentSelector, id });
    },
    [debouncedCleanupStatus]
  );

  useEffect(() => {
    getStatusElement({ statusMessageParentSelector, id });

    return () => cleanupStatusElement(id);
  }, [statusMessageParentSelector, id]);

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!message) return;

    setStatus({ status: message, statusMessageParentSelector, id });
    // TODO:https://meliorisk.atlassian.net/browse/ME-110373
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessage('');
  }, [message, statusMessageParentSelector, id, setStatus]);

  const { isExtraSmallScreen } = useBreakpoint();

  // Announce the number of options available when the menu is opened and there are filtered options.
  useEffect(() => {
    if (!isOpen || optionsCount === undefined) return;

    const searchResult = optionsCount
      ? `${optionsCount} ${optionsCount > 1 ? 'results' : 'result'} available.${isExtraSmallScreen ? '' : ' Use up and down arrow keys to navigate. Press Enter key to select.'}`
      : (emptyStateLabel ?? 'No results available.');

    // TODO:https://meliorisk.atlassian.net/browse/ME-110373
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessage(isLoading ? 'Loading options.' : searchResult);
  }, [isOpen, optionsCount, isLoading, emptyStateLabel, isExtraSmallScreen]);

  // Announce the newly selected option.
  // We are using this workaround due to an issue on iOS where the selected option is not properly announced by the screen reader.
  useEffect(() => {
    if (!selectedOptionLabel) return;
    setTimeout(() => setMessage(`${selectedOptionLabel} has been selected.`), 500);
  }, [selectedOptionLabel]);
};
