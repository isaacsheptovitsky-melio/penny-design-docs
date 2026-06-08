/* eslint-disable max-lines */
import { createCheckboxTestKit } from '@melio/penny-testkit-rtl';
import * as pennyUtils from '@melio/penny-utils';
import { act, screen, waitFor } from '@testing-library/react';
import { expect } from 'vitest';

import { Group } from '@/components/containers/Group/Group';
import { Text } from '@/components/dataDisplay/Text/Text';
import { renderComponent } from '@/test-utils/render.utils';

import { data as mockData, type Person } from '../__fixtures__/mock-data';
import type { TableColumnDef } from '../hooks/types';
import { TableCell } from '../TableCell/TableCell';
import { TestTable } from './Table.spec';

describe('Selectable Table', () => {
  it('checkbox have valid attributes', () => {
    renderComponent(<TestTable onRowSelectionChange={vi.fn()} />);

    const headerCheckboxTestKit = createCheckboxTestKit({ dataTestId: 'table-selectable-header-cell' });
    const rowCheckboxTestKit = createCheckboxTestKit({ dataTestId: 'table-row-0-selectable-cell' });

    expect(headerCheckboxTestKit.getInputElement()).toHaveAttribute(
      'aria-controls',
      'selectable-row-checkbox-0 selectable-row-checkbox-1 selectable-row-checkbox-2 selectable-row-checkbox-3'
    );

    expect(rowCheckboxTestKit.getInputElement()).toHaveAttribute('id', 'selectable-row-checkbox-0');
  });

  it('is unchecked when row is not selected', () => {
    renderComponent(<TestTable onRowSelectionChange={vi.fn()} />);

    const rowCheckboxTestKit = createCheckboxTestKit({ dataTestId: 'table-row-0-selectable-cell' });
    expect(rowCheckboxTestKit.getIsChecked()).toBe(false);
  });

  it('is checked when row is selected', () => {
    renderComponent(<TestTable onRowSelectionChange={vi.fn()} defaultSelectedRows={{ '0': true }} />);

    const rowCheckboxTestKit = createCheckboxTestKit({ dataTestId: 'table-row-0-selectable-cell' });
    expect(rowCheckboxTestKit.getIsChecked()).toBe(true);
  });

  it('selects and deselects all rows', async () => {
    const { getAllByTestId } = renderComponent(<TestTable onRowSelectionChange={vi.fn()} />);

    const headerCheckboxTestKit = createCheckboxTestKit({ dataTestId: 'table-selectable-header-cell' });

    getAllByTestId(/selectable-cell$/).forEach((el) => {
      const testId = el.getAttribute('data-testid');
      if (testId) {
        const rowCheckboxTestKit = createCheckboxTestKit({ dataTestId: testId });
        expect(rowCheckboxTestKit.getIsChecked()).toBe(false);
      }
    });

    await headerCheckboxTestKit.click();

    getAllByTestId(/selectable-cell$/).forEach((el) => {
      const testId = el.getAttribute('data-testid');
      if (testId) {
        const rowCheckboxTestKit = createCheckboxTestKit({ dataTestId: testId });
        expect(rowCheckboxTestKit.getIsChecked()).toBe(true);
      }
    });

    await headerCheckboxTestKit.click();

    getAllByTestId(/selectable-cell$/).forEach((el) => {
      const testId = el.getAttribute('data-testid');
      if (testId) {
        const rowCheckboxTestKit = createCheckboxTestKit({ dataTestId: testId });
        expect(rowCheckboxTestKit.getIsChecked()).toBe(false);
      }
    });
  });

  it('selects and deselects a single row', async () => {
    renderComponent(<TestTable onRowSelectionChange={vi.fn()} />);

    const rowCheckboxTestKit = createCheckboxTestKit({ dataTestId: 'table-row-1-selectable-cell' });

    expect(rowCheckboxTestKit.getIsChecked()).toBe(false);

    await rowCheckboxTestKit.click();

    expect(rowCheckboxTestKit.getIsChecked()).toBe(true);

    await rowCheckboxTestKit.click();

    expect(rowCheckboxTestKit.getIsChecked()).toBe(false);
  });

  it('has selected rows by default', () => {
    renderComponent(<TestTable onRowSelectionChange={vi.fn()} defaultSelectedRows={{ '1': true, '3': true }} />);

    const row1TestKit = createCheckboxTestKit({ dataTestId: 'table-row-1-selectable-cell' });
    const row3TestKit = createCheckboxTestKit({ dataTestId: 'table-row-3-selectable-cell' });

    expect(row1TestKit.getIsChecked()).toBe(true);
    expect(row3TestKit.getIsChecked()).toBe(true);
  });

  it("displays the header's selectable-cell in indeterminate state if some rows are selected", () => {
    renderComponent(<TestTable onRowSelectionChange={vi.fn()} defaultSelectedRows={{ '1': true, '3': true }} />);

    const headerCheckboxTestKit = createCheckboxTestKit({ dataTestId: 'table-selectable-header-cell' });
    expect(headerCheckboxTestKit.getIsIndeterminate()).toBe(true);
  });

  it('fires `onRowSelectionChange` with `rowSelectionState` as param', async () => {
    const onRowSelectionChange = vi.fn();
    renderComponent(<TestTable onRowSelectionChange={onRowSelectionChange} />);

    const rowCheckboxTestKit = createCheckboxTestKit({ dataTestId: 'table-row-1-selectable-cell' });

    await rowCheckboxTestKit.click();

    expect(onRowSelectionChange).toHaveBeenLastCalledWith({
      rowId: '1',
      rowData: mockData[1],
      isSelected: true,
    });

    await rowCheckboxTestKit.click();

    expect(onRowSelectionChange).toHaveBeenLastCalledWith({
      rowId: '1',
      rowData: mockData[1],
      isSelected: false,
    });
  });

  it('fires `onAllRowsSelectionChange` with correct boolean as param', async () => {
    const onAllRowsSelectionChange = vi.fn();
    renderComponent(<TestTable onAllRowsSelectionChange={onAllRowsSelectionChange} />);

    const headerCheckboxTestKit = createCheckboxTestKit({ dataTestId: 'table-selectable-header-cell' });

    await headerCheckboxTestKit.click();

    expect(onAllRowsSelectionChange).toHaveBeenLastCalledWith(true);

    await headerCheckboxTestKit.click();

    expect(onAllRowsSelectionChange).toHaveBeenLastCalledWith(false);
  });

  it('has a disabled row for selection', async () => {
    renderComponent(<TestTable onRowSelectionChange={vi.fn()} disableRowSelection={(rowData) => rowData.id === '1'} />);

    const rowCheckboxTestKit = createCheckboxTestKit({ dataTestId: 'table-row-1-selectable-cell' });

    expect(rowCheckboxTestKit.getIsChecked()).toBe(false);
    expect(rowCheckboxTestKit.getIsDisabled()).toBe(true);

    await rowCheckboxTestKit.click();

    expect(rowCheckboxTestKit.getIsChecked()).toBe(false);
  });

  it('hovering the checkbox triggers a tooltip', async () => {
    const { user } = renderComponent(
      <TestTable
        onRowSelectionChange={vi.fn()}
        rowSelectionTooltips={{
          row: () => ({ content: 'Hello!' }),
        }}
      />
    );
    const rowCheckboxTestKit = createCheckboxTestKit({ dataTestId: 'table-row-0-selectable-cell' });
    await act(async () => user.hover(rowCheckboxTestKit.getInputElement()));
    expect(screen.getByText(/hello/i)).toBeInTheDocument();
  });

  it("hovering the disabled checkbox with tooltip doesn't trigger a tooltip", async () => {
    const { user } = renderComponent(
      <TestTable
        onRowSelectionChange={vi.fn()}
        disableRowSelection={(row) => row.id === '0'}
        rowSelectionTooltips={{
          row: () => ({ content: 'Hello!' }),
        }}
      />
    );
    const rowCheckboxTestKit = createCheckboxTestKit({ dataTestId: 'table-row-0-selectable-cell' });
    await act(async () => user.hover(rowCheckboxTestKit.getInputElement()));
    expect(screen.queryByText(/hello/i)).not.toBeInTheDocument();
  });

  it('has all rows disabled for selection', async () => {
    const { getAllByTestId } = renderComponent(<TestTable onRowSelectionChange={vi.fn()} disableAllRowsSelection />);

    const headerCheckboxTestKit = createCheckboxTestKit({ dataTestId: 'table-selectable-header-cell' });

    getAllByTestId(/selectable-cell$/).forEach((el) => {
      const testId = el.getAttribute('data-testid');
      if (testId) {
        const rowCheckboxTestKit = createCheckboxTestKit({ dataTestId: testId });
        expect(rowCheckboxTestKit.getIsChecked()).toBe(false);
        expect(rowCheckboxTestKit.getIsDisabled()).toBe(true);
      }
    });

    expect(headerCheckboxTestKit.getIsChecked()).toBe(false);
    expect(headerCheckboxTestKit.getIsDisabled()).toBe(true);

    await headerCheckboxTestKit.click();

    expect(headerCheckboxTestKit.getIsChecked()).toBe(false);

    getAllByTestId(/selectable-cell$/).forEach((el) => {
      const testId = el.getAttribute('data-testid');
      if (testId) {
        const rowCheckboxTestKit = createCheckboxTestKit({ dataTestId: testId });
        expect(rowCheckboxTestKit.getIsChecked()).toBe(false);
      }
    });
  });

  it('set `aria-label` for header checkbox when `selectable` and `aria-label` set', () => {
    const { getByLabelText } = renderComponent(
      <TestTable onRowSelectionChange={vi.fn()} allRowsSelectionAriaLabel="All results" />
    );

    expect(getByLabelText('All results', { selector: '[role=checkbox]' })).toBeInTheDocument();
  });

  describe('Header Checkbox', () => {
    it('is unchecked when no rows are selected', () => {
      renderComponent(<TestTable onRowSelectionChange={vi.fn()} />);

      const headerCheckboxTestKit = createCheckboxTestKit({ dataTestId: 'table-selectable-header-cell' });
      expect(headerCheckboxTestKit.getIsChecked()).toBe(false);
    });

    it('is checked when all rows are selected', () => {
      renderComponent(
        <TestTable
          onRowSelectionChange={vi.fn()}
          defaultSelectedRows={{ '0': true, '1': true, '2': true, '3': true }}
        />
      );

      const headerCheckboxTestKit = createCheckboxTestKit({ dataTestId: 'table-selectable-header-cell' });
      expect(headerCheckboxTestKit.getIsChecked()).toBe(true);
    });

    it('is disabled when `disableAllRowsSelection` is true', async () => {
      renderComponent(<TestTable onRowSelectionChange={vi.fn()} disableAllRowsSelection />);

      const headerCheckboxTestKit = createCheckboxTestKit({ dataTestId: 'table-selectable-header-cell' });
      expect(headerCheckboxTestKit.getIsDisabled()).toBe(true);
      expect(headerCheckboxTestKit.getIsChecked()).toBe(false);

      await headerCheckboxTestKit.click();

      expect(headerCheckboxTestKit.getIsChecked()).toBe(false);
    });

    it('has correct aria-label when `allRowsSelectionAriaLabel` is provided', () => {
      renderComponent(<TestTable onRowSelectionChange={vi.fn()} allRowsSelectionAriaLabel="Select all rows" />);

      const headerCheckboxTestKit = createCheckboxTestKit({ dataTestId: 'table-selectable-header-cell' });
      expect(headerCheckboxTestKit.getInputElement()).toHaveAttribute('aria-label', 'Select all rows');
      expect(headerCheckboxTestKit.getInputElement()).toHaveAccessibleName('Select all rows');
    });
  });

  it('set `aria-label` for row checkbox when `selectable` and `aria-label` set', () => {
    const { getByLabelText } = renderComponent(
      <TestTable onRowSelectionChange={vi.fn()} getRowSelectionAriaLabel={(row) => `label ${row.id}`} />
    );

    mockData.forEach(({ id }) => {
      expect(getByLabelText(`label ${id}`, { selector: '[role=checkbox]' })).toBeInTheDocument();
    });
  });

  it('get correct checkbox aria-label', () => {
    renderComponent(<TestTable onRowSelectionChange={vi.fn()} getRowSelectionAriaLabel={() => 'Custom checkbox'} />);
    const rowCheckboxTestKit = createCheckboxTestKit({ dataTestId: 'table-row-0-selectable-cell' });
    expect(rowCheckboxTestKit.getInputElement()).toHaveAttribute('aria-label', 'Custom checkbox');
    expect(rowCheckboxTestKit.getInputElement()).toHaveAccessibleName('Custom checkbox');
  });

  it('windows environment get correct checkbox aria-label only when is focused', async () => {
    const isWindowsOSSpy = vi.spyOn(pennyUtils, 'isWindowsOS').mockReturnValue(true);
    const isVitestEnvSpy = vi.spyOn(pennyUtils, 'isVitestEnv').mockReturnValue(false);

    renderComponent(<TestTable onRowSelectionChange={vi.fn()} getRowSelectionAriaLabel={() => 'Custom checkbox'} />);
    const rowCheckboxTestKit = createCheckboxTestKit({ dataTestId: 'table-row-0-selectable-cell' });
    const checkbox = rowCheckboxTestKit.getInputElement();

    expect(checkbox).not.toHaveAttribute('aria-label');
    expect(checkbox).not.toHaveAccessibleName('Custom checkbox');
    await waitFor(() => checkbox.focus());
    expect(checkbox).toHaveFocus();
    expect(checkbox).toHaveAttribute('aria-label', 'Custom checkbox');
    expect(checkbox).toHaveAccessibleName('Custom checkbox');

    isWindowsOSSpy.mockRestore();
    isVitestEnvSpy.mockRestore();
  });

  /* A regression visual test for focus behavior */
  it('the selectable checkbox stays focus after check / uncheck', async () => {
    const { user, getByLabelText, rerender } = renderComponent(
      <TestTable
        onRowSelectionChange={vi.fn()}
        allRowsSelectionAriaLabel="Select all rows"
        getRowSelectionAriaLabel={(row) => `label ${row.id}`}
      />
    );

    await user.tab();
    expect(getByLabelText('Select all rows', { selector: '[role=checkbox]' })).toHaveFocus();
    expect(getByLabelText('Select all rows', { selector: '[role=checkbox]' })).not.toBeChecked();
    // press 'Space' to change the checkbox state
    await user.keyboard('[Space]');
    rerender(
      <TestTable
        onRowSelectionChange={vi.fn()}
        allRowsSelectionAriaLabel="Select all rows"
        getRowSelectionAriaLabel={(row) => `label ${row.id}`}
      />
    );
    expect(getByLabelText('Select all rows', { selector: '[role=checkbox]' })).toBeChecked();
    expect(getByLabelText('Select all rows', { selector: '[role=checkbox]' })).toHaveFocus();
  });

  it("set the provided allRowsSelectionAriaLabel as aria-label to the columnheder table's element", () => {
    const { getByTestId } = renderComponent(
      <TestTable
        onRowSelectionChange={vi.fn()}
        rowsSelectionHeaderCellAriaLabel="Select vendor"
        allRowsSelectionAriaLabel="Select all rows"
        getRowSelectionAriaLabel={(row) => `label ${row.id}`}
      />
    );

    expect(getByTestId('table-header-cell-selectable')).toHaveRole('columnheader');
    expect(getByTestId('table-header-cell-selectable')).toHaveAttribute('aria-label', 'Select vendor');
  });

  it("when row selection has aria-labelledby attribute, row selection doesn't show the aria-label", () => {
    const columnsNew: TableColumnDef<Person>[] = [
      {
        id: 'firstName',
        header: 'First Name',
        cell: ({ row, rowIndex }) => (
          <TableCell>
            <Group variant="vertical" spacing="xxs">
              <Text>{row.firstName}</Text>
              {rowIndex === 1 && (
                <Group alignItems="center" spacing="s">
                  <Text color="semantic.text.secondary" textStyle="body4" id={`selection-info-${rowIndex}`}>
                    {`${row.firstName}$ age is less than 18`}
                  </Text>
                </Group>
              )}
            </Group>
          </TableCell>
        ),
        size: 'l',
      },
      {
        id: 'lastName',
        header: 'Last Name',
        cell: ({ row }) => row.lastName,
        size: 'm',
      },
    ];
    renderComponent(
      <TestTable
        columns={columnsNew}
        onRowSelectionChange={vi.fn()}
        getRowSelectionAriaLabel={(row) => `label ${row.id}`}
        getRowSelectionAriaLabelledBy={(row) => (row.index === 1 ? `selection-info-${row.index}` : undefined)}
      />
    );

    const row1TestKit = createCheckboxTestKit({ dataTestId: 'table-row-1-selectable-cell' });
    const row2TestKit = createCheckboxTestKit({ dataTestId: 'table-row-2-selectable-cell' });

    expect(row1TestKit.getInputElement()).toHaveAttribute('aria-labelledby', 'selection-info-1');
    expect(row1TestKit.getInputElement()).not.toHaveAttribute('aria-label', 'label 1');
    expect(row2TestKit.getInputElement()).not.toHaveAttribute('aria-labelledby');
    expect(row2TestKit.getInputElement()).toHaveAttribute('aria-label', 'label 2');
  });
});
