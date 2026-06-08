import { expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { TableDataCell } from '../../TableDataCell/TableDataCell';
import { TableCell, type TableCellProps } from '../TableCell';

const props = { placeholder: 'placeholder', children: 'Text', 'data-testid': 'cell' };

describe('TableCell', () => {
  validateComponent<TableCellProps>(TableCell, 'TableCell', { props });

  it('renders placeholder correctly depending on children visibility', () => {
    // eslint-disable-next-line react/no-children-prop
    const { getByText, queryByText, rerender } = renderComponent(<TableCell {...props} children={undefined} />);

    expect(getByText('placeholder')).toBeInTheDocument();

    rerender(<TableCell {...props} />);

    expect(queryByText('placeholder')).not.toBeInTheDocument();
  });

  it('calls the click event if a handler is passed', async () => {
    const handleClick = vi.fn();
    const { getByTestId, user } = renderComponent(<TableCell {...props} onClick={handleClick} />);

    await user.click(getByTestId('cell'));

    expect(handleClick).toBeCalled();
  });

  it('does not propagate the event if a handler is passed', async () => {
    const handleClick = vi.fn();
    const handleParentClick = vi.fn();
    const { getByTestId, user } = renderComponent(
      <TableDataCell onClick={handleParentClick}>
        <TableCell {...props} onClick={handleClick} />
      </TableDataCell>
    );

    await user.click(getByTestId('cell'));

    expect(handleClick).toBeCalled();
    expect(handleParentClick).not.toBeCalled();
  });

  it('propagates the event if no handler is passed', async () => {
    const handleParentClick = vi.fn();
    const { getByTestId, user } = renderComponent(
      <TableDataCell onClick={handleParentClick}>
        <TableCell {...props} />
      </TableDataCell>
    );

    await user.click(getByTestId('cell'));

    expect(handleParentClick).toBeCalled();
  });

  it('does not call the click event if the cell is disabled', async () => {
    const handleClick = vi.fn();
    const { getByTestId, user } = renderComponent(<TableCell {...props} onClick={handleClick} isDisabled />);

    await user.click(getByTestId('cell'));

    expect(handleClick).not.toBeCalled();
  });
});
