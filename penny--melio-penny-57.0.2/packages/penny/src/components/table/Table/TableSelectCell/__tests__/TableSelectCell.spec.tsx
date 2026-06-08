import { noop } from '@melio/penny-utils';
import { screen } from '@testing-library/react';
import { expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { TableSelectCell, type TableSelectCellProps } from '../TableSelectCell';

describe('TableSelectCell', () => {
  const addButtonLabel = 'Add';
  const onSelect = vi.fn();

  validateComponent<TableSelectCellProps>(TableSelectCell, 'TableSelectCell', {
    props: {
      options: [
        { value: '1', label: 'label 1' },
        { value: '2', label: 'label 2' },
      ],
      addButton: {
        text: addButtonLabel,
        onClick: noop,
      },
      placeholder: 'placeholder',
      value: '1',
      onSelect,
    },
    skipRefCheck: true,
  });

  // Since the menu is opened with transition need to wait for it to end
  const waitForMenu = async ({ open }: { open: boolean }) =>
    open
      ? await screen.findByTestId('table-select-cell-dropdown-selectable')
      : expect(screen.queryByTestId('table-select-cell-dropdown-selectable')).not.toBeInTheDocument();

  describe('clicking on the cell', () => {
    it('opens the dropdown when cell is clicked', async () => {
      const mockCallBack = vi.fn();

      const { user } = renderComponent(
        <TableSelectCell
          addButton={{
            text: addButtonLabel,
            onClick: mockCallBack,
          }}
          options={[
            { value: '1', label: 'test 1' },
            { value: '2', label: 'test 2' },
          ]}
          value="1"
          onSelect={onSelect}
          placeholder="placeholder"
        />
      );

      await waitForMenu({ open: false });
      await user.click(screen.getByTestId('table-select-cell'));
      await waitForMenu({ open: true });
    });

    it('disables clicking on the cell in read-only mode', async () => {
      const mockCallBack = vi.fn();

      const { getByTestId, queryByTestId, user } = renderComponent(
        <TableSelectCell
          addButton={{
            text: addButtonLabel,
            onClick: mockCallBack,
          }}
          options={[
            { value: '1', label: 'test 1' },
            { value: '2', label: 'test 2' },
          ]}
          value="1"
          onSelect={onSelect}
          placeholder="placeholder"
          isReadOnly
        />
      );
      expect(getByTestId('table-select-cell')).toHaveAttribute('data-readonly', 'true');
      await user.click(getByTestId('table-select-cell'));
      expect(queryByTestId('table-select-cell-dropdown-selectable')).not.toBeInTheDocument();
    });
  });

  describe('add button', () => {
    it('fires callback when clicking the add button', async () => {
      const mockCallBack = vi.fn();

      const { user } = renderComponent(
        <TableSelectCell
          addButton={{
            text: addButtonLabel,
            onClick: mockCallBack,
          }}
          options={[]}
          placeholder="placeholder"
          onSelect={onSelect}
        />
      );
      await user.click(screen.getByText(addButtonLabel));
      expect(mockCallBack).toBeCalled();
    });

    it('renders addButton when an empty array of options is passed', () => {
      const mockCallBack = vi.fn();

      renderComponent(
        <TableSelectCell
          addButton={{
            text: addButtonLabel,
            onClick: mockCallBack,
          }}
          options={[]}
          placeholder="placeholder"
          onSelect={onSelect}
        />
      );

      expect(screen.getByText(addButtonLabel)).toBeInTheDocument();
    });

    it('renders addButton when no options are passed', () => {
      const mockCallBack = vi.fn();

      renderComponent(
        <TableSelectCell
          addButton={{
            text: addButtonLabel,
            onClick: mockCallBack,
          }}
          placeholder="placeholder"
          onSelect={onSelect}
        />
      );

      expect(screen.getByText(addButtonLabel)).toBeInTheDocument();
    });
  });

  describe('default value', () => {
    it('displays the default value', async () => {
      const mockCallBack = vi.fn();

      const { user } = renderComponent(
        <TableSelectCell
          addButton={{
            text: addButtonLabel,
            onClick: mockCallBack,
          }}
          options={[
            { value: 'value1', label: 'test 1' },
            { value: 'value2', label: 'test 2' },
          ]}
          value="value1"
          placeholder="placeholder"
          onSelect={onSelect}
        />
      );
      await waitForMenu({ open: false });
      await user.click(screen.getByTestId('table-select-cell'));
      await waitForMenu({ open: true });
      expect(screen.getAllByText('test 1')).toHaveLength(2);
    });

    it('displays the deault value label when provided', () => {
      const mockCallBack = vi.fn();

      renderComponent(
        <TableSelectCell
          addButton={{
            text: addButtonLabel,
            onClick: mockCallBack,
          }}
          options={[
            { value: 'value1', label: 'test 1' },
            { value: 'value2', label: 'test 2' },
          ]}
          optionsToDisplayOnSelect={[
            { value: 'value1', label: 'label 1' },
            { value: 'value2', label: 'label 2' },
          ]}
          value="value1"
          placeholder="placeholder"
          onSelect={onSelect}
        />
      );
      expect(screen.getByText('label 1')).toBeInTheDocument();
    });

    it('displays placeholder when no default value is passed', () => {
      const mockCallBack = vi.fn();

      renderComponent(
        <TableSelectCell
          addButton={{
            text: addButtonLabel,
            onClick: mockCallBack,
          }}
          placeholder="placeholder"
          options={[
            { value: '1', label: 'test 1' },
            { value: '2', label: 'test 2' },
          ]}
          onSelect={onSelect}
        />
      );

      expect(screen.getByText('placeholder')).toBeInTheDocument();
    });
  });

  describe('selecting an item', () => {
    it('does not invoke onSelect when selecting the same item', async () => {
      const mockCallBack = vi.fn();

      const { user } = renderComponent(
        <TableSelectCell
          addButton={{
            text: addButtonLabel,
            onClick: mockCallBack,
          }}
          options={[
            { value: 'value1', label: 'test 1' },
            { value: 'value2', label: 'test 2' },
          ]}
          value="value1"
          onSelect={onSelect}
          placeholder="placeholder"
        />
      );

      await user.click(screen.getByTestId('table-select-cell'));
      await waitForMenu({ open: true });
      await user.click(screen.getByTestId('table-select-cell-dropdown-item-value1'));
      expect(onSelect).not.toHaveBeenCalled();
      await waitForMenu({ open: false });
    });

    it('invokes onSelect when selecting a different item', async () => {
      const mockCallBack = vi.fn();

      const { user } = renderComponent(
        <TableSelectCell
          addButton={{
            text: addButtonLabel,
            onClick: mockCallBack,
          }}
          options={[
            { value: 'value1', label: 'test 1' },
            { value: 'value2', label: 'test 2' },
          ]}
          value="value1"
          onSelect={onSelect}
          placeholder="placeholder"
        />
      );

      await user.click(screen.getByTestId('table-select-cell'));
      await waitForMenu({ open: true });
      await user.click(screen.getByTestId('table-select-cell-dropdown-item-value2'));
      expect(onSelect).toHaveBeenCalledWith('value2');
      await waitForMenu({ open: false });
    });
  });

  describe('invalid state', () => {
    it('shows warning icon when invalid and no options', () => {
      renderComponent(
        <TableSelectCell
          addButton={{
            text: addButtonLabel,
            onClick: noop,
          }}
          onSelect={noop}
          isInvalid
        />
      );

      expect(screen.queryByTestId('table-select-cell-warning-icon')).toBeInTheDocument();
    });

    it('shows warning icon when invalid and there are options', () => {
      renderComponent(
        <TableSelectCell
          options={[
            { value: 'value1', label: 'test 1' },
            { value: 'value2', label: 'test 2' },
          ]}
          onSelect={noop}
          isInvalid
        />
      );

      expect(screen.queryByTestId('table-select-cell-warning-icon')).toBeInTheDocument();
    });
  });
});
