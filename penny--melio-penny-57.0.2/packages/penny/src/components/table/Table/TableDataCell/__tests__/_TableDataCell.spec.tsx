import { Box } from '@chakra-ui/react';
import { waitFor } from '@testing-library/react';
import { expect } from 'vitest';

import { renderComponent } from '@/test-utils/render.utils';

import { TableDataCell } from '../TableDataCell';

describe('Table Data Cell', () => {
  it('should not propagate keyboard event', async () => {
    const handleKeyDown = vi.fn();
    const handleParentKeyDown = vi.fn();
    const { getByTestId, user } = renderComponent(
      <Box data-testid="parent" onKeyDown={handleParentKeyDown}>
        <TableDataCell onKeyDown={handleKeyDown} tabIndex={0} data-testid="cell" />
      </Box>
    );

    getByTestId('cell').focus();

    await waitFor(() => {
      expect(getByTestId('cell')).toHaveFocus();
    });

    await user.keyboard('{enter}');

    expect(handleKeyDown).toHaveBeenCalled();
    expect(handleParentKeyDown).not.toHaveBeenCalled();
  });
});
