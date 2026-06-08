import { expect } from 'vitest';

import { Typography } from '@/components/dataDisplay/typography';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { FormLineItemsHeaderCell } from '../FormLineItemsHeaderCell';

describe('FormLineItemsHeaderCell', () => {
  validateComponent(FormLineItemsHeaderCell, 'FormLineItemsHeaderCell', {
    defaultDataTestId: 'form-line-items-header-cell',
  });

  it('Render Text when string child', () => {
    const { getByTestId } = renderComponent(<FormLineItemsHeaderCell size="s">some child</FormLineItemsHeaderCell>);
    const headerCell = getByTestId('form-line-items-header-cell');
    expect(headerCell.querySelector('span[data-component="Text"]')).toBeInTheDocument();
  });
  it('Render child when child not string', () => {
    const { getByTestId } = renderComponent(
      <FormLineItemsHeaderCell size="s">
        <Typography.Label label="Some label" />
      </FormLineItemsHeaderCell>
    );
    const headerCell = getByTestId('form-line-items-header-cell');
    expect(headerCell.querySelector('span[data-component="Text"]')).not.toBeInTheDocument();
  });
});
