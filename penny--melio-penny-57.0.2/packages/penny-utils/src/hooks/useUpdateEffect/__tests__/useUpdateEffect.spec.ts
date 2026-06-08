import { renderHook, waitFor } from '@testing-library/react';

import { useUpdateEffect } from '../useUpdateEffect';

const render = (cb: VoidFunction) =>
  renderHook((value = 'value') => {
    useUpdateEffect(cb, [value]);
  });

describe('useUpdateEffect', () => {
  it('does not call the effect callback on first run', async () =>
    new Promise((done) => {
      const effect = vi.fn();
      render(effect);

      setTimeout(() => {
        expect(effect).not.toHaveBeenCalled();
        done(undefined);
      });
    }));

  it('call the effect callback on following runs', async () => {
    const effect = vi.fn();
    const { rerender } = render(effect);

    rerender('new value');
    await waitFor(() => expect(effect).toHaveBeenCalledTimes(1));
    rerender('new value 1');
    await waitFor(() => expect(effect).toHaveBeenCalledTimes(2));
  }, 100);
});
