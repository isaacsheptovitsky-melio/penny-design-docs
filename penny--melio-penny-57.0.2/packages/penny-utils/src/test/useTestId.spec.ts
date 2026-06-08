import { renderHook } from '@testing-library/react';

import { useTestId } from './useTestId'; // adjust path as needed

describe('useTestId', () => {
  it('should return only the component name if no children are provided', () => {
    const { result } = renderHook(() => useTestId('my-component'));
    expect(result.current()).toEqual({ 'data-testid': 'my-component' });
  });

  it('should include a single child name', () => {
    const { result } = renderHook(() => useTestId('my-component'));
    expect(result.current('child')).toEqual({ 'data-testid': 'my-component-child' });
  });

  it('should include multiple child names', () => {
    const { result } = renderHook(() => useTestId('my-component'));
    expect(result.current('child', 'label')).toEqual({ 'data-testid': 'my-component-child-label' });
  });

  it('should filter out falsy values correctly', () => {
    const { result } = renderHook(() => useTestId('my-component'));
    expect(result.current(null, undefined, false)).toEqual({ 'data-testid': 'my-component' });
  });

  it('should preserve 0 and filter out other falsy values', () => {
    const { result } = renderHook(() => useTestId('my-component'));
    expect(result.current(0, false, null)).toEqual({ 'data-testid': 'my-component-0' });
  });

  it('should support conditional expressions', () => {
    const isMobile = true;
    const { result } = renderHook(() => useTestId('my-component'));
    expect(result.current(isMobile && 'mobile', 'button')).toEqual({
      'data-testid': 'my-component-mobile-button',
    });
  });
});
