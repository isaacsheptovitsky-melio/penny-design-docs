import { screen } from '@testing-library/react';
import { expect } from 'vitest';

import { mockUseFloatingFocus, renderComponent } from '../../../../test-utils';
import { validateComponent } from '../../../../test-utils/__tests__/component.validation';
import { _IconIndicator } from '../_IconIndicator';

validateComponent(_IconIndicator, '_IconIndicator', { defaultDataTestId: 'icon-indicator' });

describe('_IconIndicator', () => {
  mockUseFloatingFocus({
    beforeCallbackWrapper: beforeEach,
    restoreAllMocksCallbackWrapper: afterEach,
  });

  it('focus the button only once during tab navigation', async () => {
    const content = 'Beware! The lord of the land approaches.';
    const { getByTestId, user } = renderComponent(<_IconIndicator tooltip={{ content }} />);
    const indicator = getByTestId('tooltip-trigger-wrapper');
    expect(document.activeElement).toBe(document.body);
    await user.tab();
    expect(document.activeElement).toBe(indicator);
    await user.tab();
    expect(document.activeElement).not.toBe(indicator);
  });

  it('shows the tooltip when the indicator focused', async () => {
    const content = 'Beware! The lord of the land approaches.';
    const { getByTestId, user } = renderComponent(<_IconIndicator tooltip={{ content }} />);

    expect(getByTestId('tooltip-trigger-wrapper')).toHaveAttribute('data-state', 'closed');
    expect(screen.queryByText(content)).not.toBeInTheDocument();

    await user.click(document.body);
    await user.tab();
    expect(getByTestId('tooltip-trigger-wrapper')).toHaveFocus();

    expect(getByTestId('tooltip-trigger-wrapper')).toHaveAttribute('data-state', 'open');
    expect(screen.getByText(content)).toBeInTheDocument();
  });
});
