import { act } from '@testing-library/react';
import { expect } from 'vitest';

import { renderComponent } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { Button } from '../../Button';
import { ActionBar } from '../ActionBar';
import type { ActionBarProps } from '../ActionBar.types';

describe('ActionBar', () => {
  validateComponent<ActionBarProps>(ActionBar, 'ActionBar', { props: { isOpen: true } });

  it("invokes the action's `onClick` handler when clicking the action", async () => {
    const handleClick = vi.fn();

    const { getByTestId, user } = renderComponent(
      <ActionBar isOpen actions={[{ component: Button, props: { label: 'Label', onClick: handleClick } }]} />
    );

    await user.click(getByTestId('action-bar-action-0'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders a tooltip if necessary prop is passed', async () => {
    const tooltipLabel = 'Tooltip content';
    const { getByTestId, getByText, user } = renderComponent(
      <ActionBar isOpen summaryItems={[{ label: 'Label', value: 'Value', tooltip: { content: tooltipLabel } }]} />
    );

    await act(async () => user.hover(getByTestId('icon-indicator')));

    expect(getByText(tooltipLabel)).toBeInTheDocument();
  });

  it('supports passing an id', () => {
    const id = 'action-bar-id';
    renderComponent(<ActionBar isOpen id={id} />);

    expect(document.querySelector(`#${id}`)).toBeInTheDocument();
  });
});
