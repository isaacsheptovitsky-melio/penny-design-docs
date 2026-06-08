import { renderHook as renderHook_, type RenderHookOptions } from '@testing-library/react';

import { BreakpointProvider } from '../theme/providers/BreakpointProvider';

export const renderHook = <P, R>(callback: (props: P) => R, options?: RenderHookOptions<P>) =>
  renderHook_(callback, {
    ...options,
    wrapper: ({ children }) => <BreakpointProvider>{children}</BreakpointProvider>,
  });
