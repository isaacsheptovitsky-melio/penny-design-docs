import { renderHook } from '@testing-library/react';
import { expect } from 'vitest';

import { ThemeProvider } from '../../providers';
import { type Theme } from '../../types';
import { useTheme } from '../useTheme';

describe('useTheme', () => {
  const theme = {
    logos: {
      light: () => <></>,
      dark: () => <></>,
    },
  };

  it('exposes the correct theme variables', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: (props: object) => <ThemeProvider {...props} theme={theme} />,
    });

    // Testing for exact match in the top-level keys
    expect(result.current).toStrictEqual({
      borderRadii: expect.objectContaining({}) as Theme['borderRadii'],
      colors: expect.objectContaining({}) as Theme['colors'],
      textStyles: expect.objectContaining({}) as Theme['textStyles'],
      fonts: expect.objectContaining({}) as Theme['fonts'],
      borders: expect.objectContaining({}) as Theme['borders'],
    });
  });

  it('borderRadii - returns the correct tokens', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: (props) => <ThemeProvider theme={theme} {...props} />,
    });
    expect(result.current.borderRadii.global[100]).toEqual('4px');
    expect(result.current.borderRadii.global[200]).toEqual('8px');
  });
});
