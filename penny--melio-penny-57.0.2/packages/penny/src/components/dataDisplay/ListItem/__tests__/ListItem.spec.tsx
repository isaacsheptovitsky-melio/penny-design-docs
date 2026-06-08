import { act, waitFor } from '@testing-library/react';
import { expect } from 'vitest';

import { renderComponent } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { ListItem } from '../ListItem';
import type { ListItemProps } from '../ListItem.types';

validateComponent<ListItemProps>(ListItem, 'ListItem', {
  props: {
    labelProps: { label: 'List item label' },
    mainLabelProps: { label: 'List item main label' },
    descriptionProps: { label: 'List item description' },
  },
  defaultDataTestId: 'list-item',
  componentParts: ['label', 'main-label', 'description'],
});

describe('ListItem', () => {
  it('shows tooltips for label and line item', async () => {
    const labelTooltip = "Don't go chasing waterfalls";
    const lineItemTooltip = "Please stick to the rivers and the lakes that you're used to";

    const { getByTestId, getByText, user } = renderComponent(
      <ListItem
        labelProps={{ label: 'Label', tooltipProps: { content: labelTooltip } }}
        descriptionProps={{ label: 'Description' }}
        mainLabelProps={{ label: 'Main Label', tooltipProps: { content: lineItemTooltip } }}
      />
    );

    await act(async () => user.hover(getByTestId('label-tooltip-trigger')));

    await waitFor(() => expect(getByText(labelTooltip)).toBeVisible());

    await act(async () => user.hover(getByTestId('line-item-tooltip-trigger')));

    await waitFor(() => expect(getByText(lineItemTooltip)).toBeVisible());
  });
});
