import { Box } from '@chakra-ui/react';
import { createDate, noop } from '@melio/penny-utils';
import { act, screen, waitFor } from '@testing-library/react';
import { expect } from 'vitest';

import { Button } from '@/components/action/Button/Button';
import type { OpenChangeTriggerEvent } from '@/components/containers/menus/Context/types';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { TableDateCell, type TableDateCellProps } from '../TableDateCell';

describe('TableDateCell', () => {
  validateComponent<TableDateCellProps>(TableDateCell, 'TableDateCell', {
    props: {
      placeholder: 'N/A',
      onSelect: noop,
    },
    defaultDataTestId: 'table-date-cell',
    skipRefCheck: true,
  });

  const setup = (props: Partial<TableDateCellProps>) => {
    const { user, ...res } = renderComponent(
      <TableDateCell value={createDate('2022-11-15')} placeholder="N/A" onSelect={vi.fn()} {...props} />
    );
    const selectDate = async (date: string) => user.click(screen.getByTestId(`calendar-day-${date}`));

    const clickOnMenu = async () => user.click(screen.getByTestId('table-date-cell'));

    // Since the menu is opened with transition need to wait for it to end
    const waitForMenu = async ({ open }: { open: boolean }) =>
      open
        ? await screen.findByTestId('dropdown-floating-calendar')
        : expect(screen.queryByTestId('dropdown-floating-calendar')).not.toBeInTheDocument();

    return { selectDate, clickOnMenu, waitForMenu, user, ...res };
  };

  it('displays selected date in cell', async () => {
    const onSelect = vi.fn();
    const { selectDate, clickOnMenu, waitForMenu } = setup({ onSelect });

    await waitForMenu({ open: false });
    await clickOnMenu();
    await waitForMenu({ open: true });
    await selectDate('15');
    await waitForMenu({ open: false });
    expect(screen.getByText('Nov 15, 2022')).toBeInTheDocument();
  });

  it('invokes onSelect when selecting a different date', async () => {
    const onSelect = vi.fn();
    const { selectDate, clickOnMenu, waitForMenu } = setup({ onSelect });

    await waitForMenu({ open: false });
    await clickOnMenu();
    await waitForMenu({ open: true });
    await selectDate('16');
    await waitForMenu({ open: false });
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('does not invoke onSelect when selecting the same date', async () => {
    const onSelect = vi.fn();
    const { selectDate, clickOnMenu, waitForMenu } = setup({ onSelect });

    await waitForMenu({ open: false });
    await clickOnMenu();
    await waitForMenu({ open: true });
    await selectDate('15');
    await waitForMenu({ open: false });
    expect(onSelect).toHaveBeenCalledTimes(0);
  });

  it('is not clickable in read-only state', async () => {
    const { getByTestId, queryByTestId, user } = setup({ isReadOnly: true });
    expect(getByTestId('table-date-cell')).toHaveAttribute('data-readonly', 'true');
    await user.click(getByTestId('table-date-cell'));
    expect(queryByTestId('dropdown-floating-calendar')).not.toBeInTheDocument();
  });

  it('shows placeholder when no selected date is passed', async () => {
    const { waitForMenu } = setup({ value: undefined });

    await waitForMenu({ open: false });
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('supports custom footer', () => {
    const props = {
      value: createDate('2022-11-15'),
      placeholder: 'N/A',
      onSelect: vi.fn(),
      defaultIsOpen: true,
      footer: <Box data-testid="custom-footer">Custom footer</Box>,
    };
    const { getByTestId } = renderComponent(<TableDateCell {...props} />);

    expect(getByTestId('custom-footer')).toBeInTheDocument();
  });

  it("the calendar doesn't open by default when clicking the input field, as the open state is controlled outside of the context", async () => {
    const onOpenChange = vi.fn();
    const onSelect = vi.fn();

    const props = {
      value: createDate('2022-11-15'),
      placeholder: 'N/A',
      onSelect,
      onOpenChange,
    };

    const { user } = renderComponent(<TableDateCell {...props} />);

    expect(screen.queryByTestId('dropdown-floating-calendar')).not.toBeInTheDocument();

    await act(async () => user.click(screen.getByTestId('table-date-cell')));

    expect(onOpenChange).toHaveBeenCalledWith(true, 'trigger');

    expect(screen.queryByTestId('dropdown-floating-calendar')).not.toBeInTheDocument();
  });

  it("the calendar doesn't close by default when clicking outside, as the open state is controlled outside of the context", async () => {
    const onOpenChange = vi.fn();
    const onSelect = vi.fn();

    const props = {
      value: createDate('2022-11-15'),
      placeholder: 'N/A',
      onSelect,
      onOpenChange,
    };

    const { user } = renderComponent(<TableDateCell isOpen {...props} />);

    expect(screen.getByTestId('dropdown-floating-calendar')).toBeInTheDocument();

    await act(async () => user.click(document.body));

    expect(onOpenChange).toHaveBeenCalledWith(false, 'outside');

    expect(screen.getByTestId('dropdown-floating-calendar')).toBeInTheDocument();
  });

  it('the open state is set to true when controlled outside of the context, triggering `onOpenChange` with the correct parameters when clicking the date field', async () => {
    let isOpen: boolean = false;

    const onOpenChange = vi.fn((open: boolean) => {
      if (open) {
        isOpen = open;
      }
    });
    const onSelect = vi.fn();

    const props = {
      value: createDate('2022-11-15'),
      placeholder: 'N/A',
      onSelect,
      onOpenChange,
    };

    const { user, rerender } = renderComponent(<TableDateCell {...props} isOpen={isOpen} />);

    await act(async () => user.click(screen.getByTestId('table-date-cell')));

    expect(screen.queryByTestId('dropdown-floating-calendar')).not.toBeInTheDocument();

    expect(onOpenChange).toHaveBeenCalledWith(true, 'trigger');

    rerender(<TableDateCell {...props} isOpen={isOpen} />);

    expect(screen.getByTestId('dropdown-floating-calendar')).toBeInTheDocument();
  });

  it('the open state is set to false when controlled outside of the context, triggering `onOpenChange` with the correct parameters when clicking outside the calendar', async () => {
    let isOpen: boolean = true;

    const onOpenChange = vi.fn((open: boolean, triggerEvents?: OpenChangeTriggerEvent) => {
      if (!open && triggerEvents === 'outside') {
        isOpen = open;
      }
    });
    const onSelect = vi.fn();

    const props = {
      value: createDate('2022-11-15'),
      placeholder: 'N/A',
      onSelect,
      onOpenChange,
    };

    const { user, rerender } = renderComponent(<TableDateCell {...props} isOpen={isOpen} />);

    expect(screen.getByTestId('dropdown-floating-calendar')).toBeInTheDocument();

    await act(async () => user.click(document.body));

    expect(onOpenChange).toHaveBeenCalledWith(false, 'outside');
    rerender(<TableDateCell {...props} isOpen={isOpen} />);

    await waitFor(() => expect(screen.queryByTestId('dropdown-floating-calendar')).not.toBeInTheDocument());
  });

  it("the date's value state change when using controls out of context - invokes `onOpenChange` and `onSelectChange` with the correct parameters when selecting a date", async () => {
    let value: Date | undefined = createDate('2021-11-15');
    let selectedDate: Date | undefined = value;

    const onOpenChange = vi.fn();
    const saveSelection = vi.fn(() => {
      value = selectedDate;
    });

    const onSelect = vi.fn((newDate?: Date) => {
      selectedDate = newDate;
    });

    const props = {
      placeholder: 'N/A',
      onSelect,
      onOpenChange,
      footer: (
        <Box data-testid="custom-footer">
          <Button variant="primary" label="Apply" onClick={saveSelection} />
        </Box>
      ),
    };

    const { user, getByTestId, getByRole, rerender } = renderComponent(
      <TableDateCell {...props} isOpen value={value} selectedDate={selectedDate} />
    );

    expect(screen.getByTestId('dropdown-floating-calendar')).toBeInTheDocument();

    expect(getByTestId('table-date-cell')).toHaveTextContent('Nov 15, 2021');

    await user.click(getByTestId('calendar-day-16'));

    expect(onOpenChange).toHaveBeenCalledWith(false, 'content');
    expect(onSelect).toHaveBeenCalledWith(createDate('2021-11-16'));
    rerender(<TableDateCell {...props} isOpen value={value} selectedDate={selectedDate} />);

    expect(getByTestId('table-date-cell')).toHaveTextContent('Nov 15, 2021');
    expect(getByTestId('calendar-day-16')).toHaveAttribute('aria-selected', 'true');

    await act(async () => user.click(getByRole('button', { name: 'Apply' })));

    rerender(<TableDateCell {...props} isOpen value={value} selectedDate={selectedDate} />);

    expect(getByTestId('table-date-cell')).toHaveTextContent('Nov 16, 2021');
  });

  describe('when disabled dates', () => {
    it('should show custom disabled dates with aria-disabled=true in table date cell calendar', async () => {
      const disabledDay = 10;
      const shouldDisableDate = (date: Date) => date.getDate() === disabledDay;
      const { clickOnMenu, waitForMenu } = setup({
        shouldDisableDate,
        value: createDate('2022-11-15'),
      });

      await waitForMenu({ open: false });
      await clickOnMenu();
      await waitForMenu({ open: true });

      expect(screen.getByTestId('calendar-day-10')).toHaveAttribute('aria-disabled', 'true');
      expect(screen.getByTestId('calendar-day-15')).not.toHaveAttribute('aria-disabled', 'true');
    });
  });
});
