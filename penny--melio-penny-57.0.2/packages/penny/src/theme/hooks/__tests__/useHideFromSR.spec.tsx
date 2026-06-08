import { renderHook } from '@testing-library/react';
import { expect } from 'vitest';

import { useHideFromSR, VISIBLE_MELIO_WRAPPER_ATTRIBUTE } from '../useHideFromSR';

// Mock document structure
const setupDocumentStructure = () => {
  const melioWrapper1 = document.createElement('melio-wrapper');
  const melioWrapper2 = document.createElement('melio-wrapper');
  const melioWrapper3 = document.createElement('melio-wrapper');

  const ariaLive1 = document.createElement('div');
  ariaLive1.setAttribute('aria-live', 'polite');
  const ariaLive2 = document.createElement('div');
  ariaLive2.setAttribute('aria-live', 'polite');
  const ariaLiveInsideIgnoredEl = document.createElement('div');
  ariaLiveInsideIgnoredEl.setAttribute('aria-live', 'polite');

  const statusMessage = document.createElement('div');
  statusMessage.setAttribute('id', 'a11y-status-message');

  const ariaLive3 = document.createElement('div');
  ariaLive3.setAttribute('aria-live', 'polite');
  melioWrapper3.setAttribute(VISIBLE_MELIO_WRAPPER_ATTRIBUTE, 'true');
  melioWrapper3.appendChild(ariaLive3);

  document.body.appendChild(melioWrapper1);
  document.body.appendChild(melioWrapper2);
  document.body.appendChild(melioWrapper3);
  melioWrapper1.appendChild(ariaLive1);
  melioWrapper2.appendChild(ariaLive2);
  document.body.appendChild(statusMessage);

  const ignoreEl = document.createElement('div');
  ignoreEl.setAttribute('data-component', 'ignoredEl');
  melioWrapper1.appendChild(ignoreEl);
  ignoreEl.appendChild(ariaLiveInsideIgnoredEl);

  return {
    melioWrapper1,
    melioWrapper2,
    melioWrapper3,
    ariaLive1,
    ariaLive2,
    ignoreEl,
    ariaLiveInsideIgnoredEl,
    statusMessage,
  };
};

describe('useHideFromSR', () => {
  it('sets the correct attributes when enabled', () => {
    const {
      melioWrapper1,
      melioWrapper2,
      melioWrapper3,
      ariaLive1,
      ariaLive2,
      ignoreEl,
      ariaLiveInsideIgnoredEl,
      statusMessage,
    } = setupDocumentStructure();

    renderHook(() => useHideFromSR({ ignoreEl, enable: true }));

    expect(melioWrapper1).not.toHaveAttribute('aria-hidden');
    expect(melioWrapper1).not.toHaveAttribute('data-floating-ui-inert');
    expect(melioWrapper1).not.toHaveAttribute('inert');

    expect(melioWrapper2).toHaveAttribute('aria-hidden', 'true');
    expect(melioWrapper2).toHaveAttribute('data-floating-ui-inert');
    expect(melioWrapper2).toHaveAttribute('inert');

    expect(melioWrapper3).not.toHaveAttribute('aria-hidden');
    expect(melioWrapper3).not.toHaveAttribute('data-floating-ui-inert');
    expect(melioWrapper3).not.toHaveAttribute('inert');

    expect(ariaLive1).not.toHaveAttribute('aria-hidden');
    expect(ariaLive1).not.toHaveAttribute('data-floating-ui-inert');
    expect(ariaLive1).not.toHaveAttribute('inert');

    expect(ariaLive2).toHaveAttribute('aria-hidden', 'true');
    expect(ariaLive2).toHaveAttribute('data-floating-ui-inert');
    expect(ariaLive2).toHaveAttribute('inert');

    expect(ariaLiveInsideIgnoredEl).not.toHaveAttribute('aria-hidden');
    expect(ariaLiveInsideIgnoredEl).not.toHaveAttribute('data-floating-ui-inert');
    expect(ariaLiveInsideIgnoredEl).not.toHaveAttribute('inert');

    expect(statusMessage).not.toHaveAttribute('aria-hidden');
    expect(statusMessage).not.toHaveAttribute('data-floating-ui-inert');
    expect(statusMessage).not.toHaveAttribute('inert');
  });

  it('removes the attributes when disabled', () => {
    const { melioWrapper1, melioWrapper2, ariaLive1, ariaLive2, ignoreEl, ariaLiveInsideIgnoredEl, statusMessage } =
      setupDocumentStructure();

    renderHook(() => useHideFromSR({ ignoreEl, enable: false }));

    // Assert that attributes are removed
    expect(melioWrapper1).not.toHaveAttribute('aria-hidden');
    expect(melioWrapper1).not.toHaveAttribute('data-floating-ui-inert');
    expect(melioWrapper1).not.toHaveAttribute('inert');

    expect(melioWrapper2).not.toHaveAttribute('aria-hidden');
    expect(melioWrapper2).not.toHaveAttribute('data-floating-ui-inert');
    expect(melioWrapper2).not.toHaveAttribute('inert');

    expect(ariaLive1).not.toHaveAttribute('aria-hidden');
    expect(ariaLive1).not.toHaveAttribute('data-floating-ui-inert');
    expect(ariaLive1).not.toHaveAttribute('inert');

    expect(ariaLive2).not.toHaveAttribute('aria-hidden');
    expect(ariaLive2).not.toHaveAttribute('data-floating-ui-inert');
    expect(ariaLive2).not.toHaveAttribute('inert');

    expect(ariaLiveInsideIgnoredEl).not.toHaveAttribute('aria-hidden');
    expect(ariaLiveInsideIgnoredEl).not.toHaveAttribute('data-floating-ui-inert');
    expect(ariaLiveInsideIgnoredEl).not.toHaveAttribute('inert');

    expect(statusMessage).not.toHaveAttribute('aria-hidden');
    expect(statusMessage).not.toHaveAttribute('data-floating-ui-inert');
    expect(statusMessage).not.toHaveAttribute('inert');
  });

  it('does not set attributes if ignoreEl is null', () => {
    const { melioWrapper1, melioWrapper2, ariaLive1, ariaLive2, ariaLiveInsideIgnoredEl, statusMessage } =
      setupDocumentStructure();

    renderHook(() => useHideFromSR({ ignoreEl: null, enable: true }));

    // Assert that attributes are not set
    expect(melioWrapper1).not.toHaveAttribute('aria-hidden');
    expect(melioWrapper1).not.toHaveAttribute('data-floating-ui-inert');
    expect(melioWrapper1).not.toHaveAttribute('inert');

    expect(melioWrapper2).not.toHaveAttribute('aria-hidden');
    expect(melioWrapper2).not.toHaveAttribute('data-floating-ui-inert');
    expect(melioWrapper2).not.toHaveAttribute('inert');

    expect(ariaLive1).not.toHaveAttribute('aria-hidden');
    expect(ariaLive1).not.toHaveAttribute('data-floating-ui-inert');
    expect(ariaLive1).not.toHaveAttribute('inert');

    expect(ariaLive2).not.toHaveAttribute('aria-hidden');
    expect(ariaLive2).not.toHaveAttribute('data-floating-ui-inert');
    expect(ariaLive2).not.toHaveAttribute('inert');

    expect(ariaLiveInsideIgnoredEl).not.toHaveAttribute('aria-hidden');
    expect(ariaLiveInsideIgnoredEl).not.toHaveAttribute('data-floating-ui-inert');
    expect(ariaLiveInsideIgnoredEl).not.toHaveAttribute('inert');

    expect(statusMessage).not.toHaveAttribute('aria-hidden');
    expect(statusMessage).not.toHaveAttribute('data-floating-ui-inert');
    expect(statusMessage).not.toHaveAttribute('inert');
  });

  it('preserve aria-hidden state when initially true', () => {
    const { ariaLive2, ignoreEl } = setupDocumentStructure();
    ariaLive2.setAttribute('aria-hidden', 'true');
    expect(ariaLive2).toHaveAttribute('aria-hidden', 'true');
    const { rerender } = renderHook(({ enable }) => useHideFromSR({ ignoreEl, enable }), {
      initialProps: { enable: true },
    });
    expect(ariaLive2).toHaveAttribute('aria-hidden', 'true');

    rerender({ enable: false });

    expect(ariaLive2).toHaveAttribute('aria-hidden', 'true');
  });
});
