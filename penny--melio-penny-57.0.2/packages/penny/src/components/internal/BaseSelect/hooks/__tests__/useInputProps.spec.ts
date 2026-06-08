import { renderHook } from '@testing-library/react';
import { expect } from 'vitest';

import { useInputProps } from '../useInputProps';

const inputProps = {
  'aria-activedescendant': '',
  'aria-autocomplete': 'list',
  'aria-controls': 'downshift-0-menu',
  'aria-expanded': false,
  'aria-labelledby': 'downshift-0-label',
  autoComplete: 'off',
  id: 'downshift-0-input',
  role: 'combobox',
  value: '',
  onBlur: vi.fn(),
  onChange: vi.fn(),
  onKeyDown: vi.fn(),
  ref: vi.fn(),
};

const hookOptions = {
  ref: vi.fn(),
  getInputProps: vi.fn().mockReturnValue(inputProps),
  disableClick: false,
  onClick: vi.fn(),
  onKeyDown: vi.fn(),
  closeMenu: vi.fn(),
};

describe('useInputProps', () => {
  it('returns the necessary input props', () => {
    const { result } = renderHook(() => useInputProps(hookOptions));

    expect(result.current).toStrictEqual({
      ...inputProps,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onClick: expect.any(Function),
    });
  });
});
