import { render } from '@testing-library/react';
import React, { type FC, forwardRef, useImperativeHandle } from 'react';
import { expect } from 'vitest';

import { mergeRefs } from '../merge-refs';

// Source code: https://github.com/gregberge/react-merge-refs/blob/main/src/index.test.tsx
describe('mergeRefs', () => {
  const Dummy = forwardRef(function Dummy(_, ref) {
    useImperativeHandle(ref, () => 'refValue');
    return null;
  });
  const refAsFunc = vi.fn();
  const refAsObj = { current: undefined };
  const Example: FC<{ visible: boolean }> = ({ visible }) =>
    visible ? <Dummy ref={mergeRefs([refAsObj, refAsFunc])} /> : null;

  it('works as expected', () => {
    const { rerender } = render(<Example visible />);

    expect(refAsFunc).toHaveBeenCalledTimes(1);
    expect(refAsFunc).toHaveBeenCalledWith('refValue');
    expect(refAsObj.current).toBe('refValue');

    rerender(<Example visible={false} />);

    expect(refAsFunc).toHaveBeenCalledTimes(2);
    expect(refAsFunc).toHaveBeenCalledWith(null);
    expect(refAsObj.current).toBe(null);
  });
});
