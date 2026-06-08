import { renderHook } from '@testing-library/react';

import { useTestId } from '../useTestId';

describe('useTestId', () => {
  it('should generate a data-testid attribute', () => {
    const {
      result: { current: getTestId },
    } = renderHook(() => useTestId('my-component'));

    expect(getTestId()).toEqual({ 'data-testid': 'my-component' });
    expect(getTestId('child-node')).toEqual({ 'data-testid': 'my-component-child-node' });
    expect(getTestId('child-node', 'label')).toEqual({ 'data-testid': 'my-component-child-node-label' });
  });
});
