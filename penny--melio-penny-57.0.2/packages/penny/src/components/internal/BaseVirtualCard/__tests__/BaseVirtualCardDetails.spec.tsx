import { act, screen } from '@testing-library/react';
import { expect } from 'vitest';

import { renderComponent } from '../../../../test-utils';
import { validateComponent } from '../../../../test-utils/__tests__/component.validation';
import { BaseVirtualCardDetails, type BaseVirtualCardDetailsProps } from '../components/BaseVirtualCardDetails';

const props = {
  label: 'Hello, world!',
  mainLabel: 'This is the main label text',
  onCopy: vi.fn(),
  enableCopy: true,
};

validateComponent<BaseVirtualCardDetailsProps>(BaseVirtualCardDetails, 'BaseVirtualCardDetails', { props });

describe('BaseVirtualCardDetails', () => {
  it('copies the text to clipboard when clicked on the copy button / mainLabel and matches the prop value', async () => {
    const onCopy = vi.fn();

    const { getByTestId, getByText, user } = renderComponent(<BaseVirtualCardDetails {...props} onCopy={onCopy} />);
    const copyButton = getByTestId('base-virtual-card-details-copy-button');
    await act(async () => user.click(copyButton));

    expect(await navigator.clipboard.readText()).toBe(props.mainLabel);
    expect(onCopy).toHaveBeenCalled();

    const mainLabel = getByText(props.mainLabel);
    await act(async () => user.click(mainLabel));

    expect(await navigator.clipboard.readText()).toBe(props.mainLabel);
    expect(onCopy).toHaveBeenCalled();
  });

  it("the tooltip should change the value from 'Copy' to 'Copied' after clicking the copy button", async () => {
    const { getByTestId, user } = renderComponent(<BaseVirtualCardDetails {...props} />);
    const copyButton = getByTestId('base-virtual-card-details-copy-button');

    await act(async () => user.hover(copyButton));

    expect(screen.getByText('Copy')).toBeInTheDocument();

    await act(async () => user.click(copyButton));

    expect(screen.getByText('Copied')).toBeInTheDocument();
  });

  it("the tooltip should reset from 'Copied' to 'Copy' after 2 seconds", async () => {
    vi.useFakeTimers(); // Enable fake timers
    const { getByTestId, user } = renderComponent(<BaseVirtualCardDetails {...props} />, {
      userEventOptions: { advanceTimers: vi.advanceTimersByTime },
    });
    const copyButton = getByTestId('base-virtual-card-details-copy-button');
    await act(async () => {
      await user.click(copyButton);
      await user.hover(copyButton);
    });

    expect(screen.getByText('Copied')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000); // Advance timers by 2 seconds
    });

    expect(screen.getByText('Copy')).toBeInTheDocument();

    vi.useRealTimers(); // Restore real timers
  });

  // Will be fixed in https://meliorisk.atlassian.net/browse/ME-48125
  // eslint-disable-next-line vitest/no-disabled-tests
  it.skip('shows the copy button when hovering the main label', async () => {
    const { getByTestId, getByText, user } = renderComponent(<BaseVirtualCardDetails {...props} />);
    const copyButton = getByTestId('base-virtual-card-details-copy-button');

    expect(copyButton).toBeInTheDocument();
    expect(copyButton).not.toBeVisible();

    await act(async () => user.hover(getByText(props.mainLabel)));

    expect(copyButton).toBeVisible();
  });

  it('when enableCopy is not defined / falsy should not show the copy button when hovering the main label', async () => {
    const { queryByTestId, getByText, user } = renderComponent(
      <BaseVirtualCardDetails {...props} enableCopy={false} />
    );

    await act(async () => user.hover(getByText(props.mainLabel)));

    expect(queryByTestId('base-virtual-card-details-copy-button')).not.toBeInTheDocument();
  });
});
