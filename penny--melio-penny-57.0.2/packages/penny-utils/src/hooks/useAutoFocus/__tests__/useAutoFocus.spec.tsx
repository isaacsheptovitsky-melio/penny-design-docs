import { renderHook } from '@testing-library/react';
import { RefObject } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { useAutoFocus } from '../useAutoFocus';

describe('useAutoFocus', () => {
  it('should call focus when autoFocus is true', () => {
    const focus = vi.fn();
    const ref = { current: { focus } };
    renderHook(() => useAutoFocus(ref as unknown as RefObject<HTMLElement>, true));

    expect(focus).toHaveBeenCalled();
  });

  it('should not call focus when autoFocus is false', () => {
    const focus = vi.fn();
    const ref = { current: { focus } };
    renderHook(() => useAutoFocus(ref as unknown as RefObject<HTMLElement>, false));

    expect(focus).not.toHaveBeenCalled();
  });
});
