import { act } from '@testing-library/react';
import { expect } from 'vitest';

import { renderComponent } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { _Label } from '../_Label';

describe('_Label', () => {
  validateComponent(_Label, '_Label', { props: { label: 'text' } });

  it('renders as label element', () => {
    const { getByText } = renderComponent(<_Label label="Hello" as="label" />);

    const labelText = getByText('Hello');
    // Find the closest label element
    expect(labelText.closest('label')).toBeInTheDocument();
  });

  // Regression test for ME-62831
  it("doesn't show a tooltip if `labelShouldSupportEllipsis` is undefiend", async () => {
    const { user, getByText, queryByText } = renderComponent(
      <_Label label="label" labelShouldSupportEllipsis={undefined} tooltipProps={{ content: 'Tooltip label' }} />
    );

    await act(async () => user.hover(getByText('label')));
    expect(getByText('label')).toHaveAttribute('data-state', 'closed');
    expect(queryByText('Tooltip label')).not.toBeInTheDocument();
  });

  // Regression test for ME-63844
  it("doesn't show a tooltip if `descriptionShouldSupportEllipsis` is undefiend", async () => {
    const { user, getByText, queryByText } = renderComponent(
      <_Label
        label="label"
        description="description"
        descriptionShouldSupportEllipsis={undefined}
        tooltipProps={{ content: 'Tooltip label' }}
      />
    );

    await act(async () => user.hover(getByText('description')));
    expect(getByText('description')).toHaveAttribute('data-state', 'closed');
    expect(queryByText('Tooltip label')).not.toBeInTheDocument();
  });
});
