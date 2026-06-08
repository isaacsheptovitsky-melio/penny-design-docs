import { expect } from 'vitest';

import { renderComponent } from '@/test-utils/render.utils';

import { TableRow } from './TableRow';

describe('TableRow', () => {
  it('highlights a row', () => {
    const { getByTestId } = renderComponent(
      <TableRow isRowHighlighted isSubRow={false} isLastSubRow={false} data-testid="test-row" />
    );
    expect(getByTestId('test-row')).toHaveAttribute('data-highlighted', 'true');
  });

  it("should not allow tabbing on the row when there's a click handler on it", () => {
    const { getByTestId } = renderComponent(
      <TableRow
        isRowHighlighted={false}
        isSubRow={false}
        isLastSubRow={false}
        onClick={vi.fn()}
        data-testid="test-row"
      />
    );
    expect(getByTestId('test-row')).not.toHaveAttribute('tabIndex');
  });

  it('should trigger the click event of an interactive row', async () => {
    const handleClick = vi.fn();

    const { user, getByTestId } = renderComponent(
      <TableRow
        isRowHighlighted={false}
        isSubRow={false}
        isLastSubRow={false}
        onClick={handleClick}
        data-testid="test-row"
      />
    );

    await user.click(getByTestId('test-row'));

    expect(handleClick).toHaveBeenCalled();
  });
});
