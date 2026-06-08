import {
  useMultiStyleConfig as chakraUseMultiStyleConfig,
  useStyleConfig as chakraUseStyleConfig,
} from '@chakra-ui/react';
import { renderHook } from '@testing-library/react';
import { expect } from 'vitest';

import { useMultiStyleConfig, useStyleConfig } from '../use-style-config';

vi.mock('@chakra-ui/react', () => ({
  useStyleConfig: vi.fn(),
  useMultiStyleConfig: vi.fn(),
}));

describe('useStyleConfig', () => {
  it('should pass hook params correctly', () => {
    const singleKey = 'IconButton';
    const props = { a: 1, b: 2, c: 3 };
    renderHook(() => useStyleConfig(singleKey as never, props as never));
    expect(chakraUseStyleConfig).toHaveBeenCalledWith(singleKey, props);

    const multiKey = 'Button';
    renderHook(() => useMultiStyleConfig(multiKey, props as never));
    expect(chakraUseMultiStyleConfig).toHaveBeenCalledWith(multiKey, props);
  });
});
