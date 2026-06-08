import * as pennyUtils from '@melio/penny-utils';
import { noop } from '@melio/penny-utils';
import { screen, waitFor, within } from '@testing-library/react';
import { expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { TableHeaderSortableCell, type TableHeaderSortableCellProps } from '../TableHeaderSortableCell';

const props: TableHeaderSortableCellProps = { children: 'Header Text', onClick: noop, sortDirection: undefined };

validateComponent<TableHeaderSortableCellProps>(TableHeaderSortableCell, 'TableHeaderSortableCell', { props });

describe('TableHeaderSortableCell', () => {
  // Will be fixed in https://meliorisk.atlassian.net/browse/ME-48125
  // eslint-disable-next-line vitest/no-disabled-tests
  it.skip("the icon doesn't show when sorting is not active, only on hover.", async () => {
    const { getByTestId, user } = renderComponent(<TableHeaderSortableCell {...props} />);
    const icon = getByTestId('header-sortable-cell-icon-none');
    expect(icon).not.toBeVisible();

    await user.hover(screen.getByTestId('header-sortable-cell'));

    expect(icon).toBeVisible();
    expect(getByTestId('icon')).toBeInTheDocument();
  });

  it("the correct icon show according to 'desc' sort direction", () => {
    const { getByTestId } = renderComponent(<TableHeaderSortableCell {...props} sortDirection="desc" />);
    const icon = getByTestId('header-sortable-cell-icon-desc');
    expect(icon).toBeVisible();
    expect(getByTestId('icon')).toBeInTheDocument();
  });

  it("the correct icon show according to 'asc' sort direction", () => {
    const { getByTestId } = renderComponent(<TableHeaderSortableCell {...props} sortDirection="asc" />);
    const icon = getByTestId('header-sortable-cell-icon-asc');
    expect(icon).toBeVisible();
    expect(getByTestId('icon')).toBeInTheDocument();
  });

  it('invokes onClick with the next correct sort direction', async () => {
    const onClick = vi.fn();
    const { getByTestId, rerender, user } = renderComponent(<TableHeaderSortableCell {...props} onClick={onClick} />);

    const headerCell = getByTestId('header-sortable-cell');

    await user.click(headerCell);
    expect(onClick).toHaveBeenCalledWith('desc');

    rerender(<TableHeaderSortableCell {...props} onClick={onClick} sortDirection="desc" />);

    await user.click(headerCell);
    expect(onClick).toHaveBeenCalledWith('asc');

    rerender(<TableHeaderSortableCell {...props} onClick={onClick} sortDirection="asc" />);

    await user.click(headerCell);
    expect(onClick).toHaveBeenCalledWith(undefined);
  });

  it('not on windows the header cell get the correct aria-labelledby', () => {
    const onClick = vi.fn();

    const { getByTestId } = renderComponent(<TableHeaderSortableCell {...props} onClick={onClick} />);

    const headerSortableCell = getByTestId('header-sortable-cell');

    expect(headerSortableCell).toHaveAttribute(
      'aria-labelledby',
      expect.stringMatching(/^header-sortable-cell-children-\d+$/)
    );
  });

  it('on windows the header cell get the correct aria-labelledby on focus - (for SR)', async () => {
    const onClick = vi.fn();
    vi.spyOn(pennyUtils, 'isWindowsOS').mockReturnValue(true);
    vi.spyOn(pennyUtils, 'isVitestEnv').mockReturnValue(false);
    const { getByTestId } = renderComponent(
      <TableHeaderSortableCell
        {...props}
        onClick={onClick}
        sortDirection="asc"
        aria-labelledby="test-aria-labelledby"
      />
    );

    const headerSortableCell = getByTestId('header-sortable-cell');

    expect(headerSortableCell).toHaveAttribute('aria-labelledby', 'test-aria-labelledby');

    headerSortableCell.focus();
    await waitFor(() =>
      expect(headerSortableCell).toHaveAttribute(
        'aria-labelledby',
        expect.stringMatching(/^test-aria-labelledby header-sortable-cell-children-\d+$/)
      )
    );
  });

  // Will be fixed in https://meliorisk.atlassian.net/browse/ME-48125
  // eslint-disable-next-line vitest/no-disabled-tests
  it.skip('displays the arrow icon correctly', () => {
    const { getByTestId, rerender } = renderComponent(<TableHeaderSortableCell {...props} onClick={undefined} />);

    const headerCell = getByTestId('header-sortable-cell');
    expect(within(headerCell).getByTestId(/header-sortable-cell-icon/)).not.toBeVisible();

    rerender(<TableHeaderSortableCell {...props} onClick={undefined} sortDirection="asc" />);
    expect(within(headerCell).getByTestId(/header-sortable-cell-icon/)).toBeVisible();
    expect(getByTestId('icon')).toBeInTheDocument();

    rerender(<TableHeaderSortableCell {...props} onClick={undefined} sortDirection="desc" />);
    expect(within(headerCell).getByTestId(/header-sortable-cell-icon/)).toBeVisible();
    expect(getByTestId('icon')).toBeInTheDocument();
  });
});
