import { renderHook } from '@testing-library/react';
import { expect } from 'vitest';

import { options } from '../../__fixtures__/mock-data';
import { useDropdownMenuProps } from '../useDropdownMenuProps';

const menuProps = {
  id: 'downshift-0-menu',
  role: 'listbox',
  'aria-labelledby': 'downshift-0-label',
};

const menuContentProps = {
  closeMenu: vi.fn(),
  emptyState: { label: 'No options' },
  hasSections: false,
  options,
  shouldShowCreatableOption: false,
  ...menuProps,
};

const hookOptions = {
  ref: vi.fn(),
  isOpen: false,
  getMenuProps: vi.fn().mockReturnValue(menuProps),
  ...menuContentProps,
};

describe('useDropdownMenuProps', () => {
  it("returns the `anchorRef` and `dropdownProps` and passes along the menu's `contentProps`", () => {
    const { result } = renderHook(() => useDropdownMenuProps(hookOptions));

    expect(result.current).toStrictEqual({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      anchorRef: expect.any(Function),
      dropdownMenuProps: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        context: expect.any(Object),
        isOpen: false,
        x: 0,
        y: 0,
        strategy: 'fixed',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        ref: expect.any(Function),
        contentProps: menuContentProps,
      },
    });
  });
});
