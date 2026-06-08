import { renderHook } from '@testing-library/react';

import { useIsFirstRender } from '../useIsFirstRender';

const render = () => renderHook(() => useIsFirstRender());

describe('useIsFirstRender', () => {
  it('is true on first hook render call', () => {
    const { result } = render();
    expect(result.current).toBe(true);
  });
  it('is false on following render calls ', () => {
    const { result, rerender } = render();
    expect(result.current).toBe(true);
    rerender();
    expect(result.current).toBe(false);
    rerender();
    expect(result.current).toBe(false);
  });
});
