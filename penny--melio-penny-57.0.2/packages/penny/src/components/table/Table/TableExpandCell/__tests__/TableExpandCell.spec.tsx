import { expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { TableExpandCell, type TableExpandCellProps } from '../TableExpandCell';

const props = { toggleExpanded: vi.fn(), isExpanded: false };

validateComponent<TableExpandCellProps>(TableExpandCell, 'TableExpandCell', { props });

describe('TableExpandCell', () => {
  it('fires `toggleExpanded` callback on click', async () => {
    const onClick = vi.fn();
    const { user, getByTestId } = renderComponent(
      <TableExpandCell {...props} toggleExpanded={onClick} data-testid="expand-cell" />
    );

    await user.click(getByTestId('expand-cell'));

    expect(onClick).toBeCalledTimes(1);
  });
});
