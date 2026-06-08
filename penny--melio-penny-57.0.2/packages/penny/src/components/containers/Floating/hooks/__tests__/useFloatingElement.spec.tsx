import { renderHook } from '@testing-library/react';
import { expect } from 'vitest';

import { useFloatingElement } from '../useFloatingElement';

describe('useFloatingElement (Props)', () => {
  it('should pass the correct props to the trigger element', () => {
    const mockOnOpenChange = vi.fn();
    const { result } = renderHook(() =>
      useFloatingElement({
        isOpen: false,
        onOpenChange: mockOnOpenChange,
        placement: 'bottom',
        triggerDropdownGap: 8,
      })
    );

    const { getReferenceProps } = result.current.triggerProps;

    // Ensure `getReferenceProps` is callable
    expect(getReferenceProps).toBeDefined();

    const triggerProps = getReferenceProps();

    // Test if the trigger element has necessary props (like `aria-haspopup`)
    expect(triggerProps['aria-haspopup']).toBe('dialog');
    expect(triggerProps['aria-expanded']).toBe('false');
  });

  it('should pass the correct props to the floating element', () => {
    const mockOnOpenChange = vi.fn();
    const { result } = renderHook(() =>
      useFloatingElement({
        isOpen: true,
        onOpenChange: mockOnOpenChange,
        placement: 'bottom',
        triggerDropdownGap: 8,
        role: 'menu',
      })
    );

    const { floatingProps } = result.current;

    // Test if the floating element has correct props (like role)
    expect(floatingProps.role).toBe('menu');
    expect(floatingProps.isOpen).toBe(true);
    expect(floatingProps.context).toBeDefined();
  });

  it('should assign the correct style to the floating element', () => {
    const mockOnOpenChange = vi.fn();
    const { result } = renderHook(() =>
      useFloatingElement({
        isOpen: true,
        onOpenChange: mockOnOpenChange,
        placement: 'bottom',
        triggerDropdownGap: 8,
      })
    );

    const { floatingProps } = result.current;

    // Test if the floating element styles are defined
    expect(floatingProps.styles).toBeDefined();
    expect(floatingProps.styles.position).toBeDefined();
  });

  it('should correctly pass testId to the floating element', () => {
    const mockOnOpenChange = vi.fn();
    const { result } = renderHook(() =>
      useFloatingElement({
        isOpen: true,
        onOpenChange: mockOnOpenChange,
        placement: 'bottom',
        triggerDropdownGap: 8,
        'data-testid': 'dropdown-menu',
      })
    );

    const { floatingProps } = result.current;

    // Test if the testId is correctly passed
    expect(floatingProps['data-testid']).toBe('dropdown-menu');
  });
});
