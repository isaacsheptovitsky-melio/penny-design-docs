import { useFocus } from '@floating-ui/react';

import * as FloatingFocus from '../utils';

const spyOnUseFloatingFocus = () => {
  // Mock the useFocus hook
  vi.spyOn(FloatingFocus, 'useFloatingFocus').mockImplementation((context, props) =>
    // override the visibleOnly prop to false to allow testing the open state on focus event. (default is true)
    useFocus(context, { ...props, visibleOnly: false })
  );
};

/**
 * Mocks the useFloatingFocus hook.
 * This is useful when testing components that use the floating-ui's useFocus hook.
 * allows to mock the hook before tests and restore it after.
 */
export const mockUseFloatingFocus = (
  options: {
    beforeCallbackWrapper?: (callback: () => void) => void;
    restoreAllMocksCallbackWrapper?: (callback: () => void) => void;
  } = {}
) => {
  const { beforeCallbackWrapper, restoreAllMocksCallbackWrapper } = options;
  if (beforeCallbackWrapper) {
    beforeCallbackWrapper(() => spyOnUseFloatingFocus());
  } else {
    spyOnUseFloatingFocus();
  }

  if (restoreAllMocksCallbackWrapper) {
    restoreAllMocksCallbackWrapper(() => vi.restoreAllMocks());
  }
};
