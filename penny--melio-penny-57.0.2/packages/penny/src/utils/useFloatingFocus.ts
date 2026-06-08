import { type ElementProps, type FloatingRootContext, useFocus, type UseFocusProps } from '@floating-ui/react';

/**
 * A wrapper to the `useFocus` hook that uses the floating context. Is used to focus on floating elements.
 * the wrapper created to allow mocking the `useFocus` hook in tests.
 */
export const useFloatingFocus = (context: FloatingRootContext, props?: UseFocusProps): ElementProps =>
  useFocus(context, props);
