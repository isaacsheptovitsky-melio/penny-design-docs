/* eslint-disable max-lines */
import { Box } from '@chakra-ui/react';
import { createDateFieldTestKit } from '@melio/penny-testkit-rtl';
import { createDate } from '@melio/penny-utils';
import { act, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { expect } from 'vitest';

import { Button } from '@/components/action/Button';
import { Modal } from '@/components/containers/modals/Modal';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import type { DateFieldProps } from '..';
import { DateField, dateValidationReason } from '..';

const getTestKit = () => createDateFieldTestKit();
export const getDayElement = (day: number) => screen.getByTestId(`date-field-calendar-day-${day}`);

export const getInput = () => getTestKit().getElement();

export const getIconButton = () => screen.getByTestId('date-field-toggle');

export const getClearButton = () => screen.getByTestId('date-field-toggle-clear');

const assertHasNoClearButton = () =>
  expect(screen.queryByRole('button', { name: 'Clear date' })).not.toBeInTheDocument();

export const renderDateField: (props?: Partial<DateFieldProps> & { isControlled?: boolean }) => {
  user: ReturnType<typeof renderComponent>['user'];
  testKit: ReturnType<typeof createDateFieldTestKit>;
  clickIconButton: () => Promise<void>;
  clickInput: () => Promise<void>;
  selectDate: (day: number) => Promise<void>;
  typeDate: (date: string) => Promise<void>;
  clearDate: () => Promise<void>;
  clearInput: () => Promise<void>;
  clickOutside: () => Promise<void>;
  saveSelectedDate?: () => Promise<void>;
  onChange?: () => void;
  onSelectDate?: () => void;
} = ({ isControlled, ...props }: Partial<DateFieldProps> & { isControlled?: boolean } = {}) => {
  const onChange = vi.fn();
  const onSelectDate = vi.fn();

  // https://github.com/testing-library/user-event/issues/549#issuecomment-1900790275
  const ControlledDateField = () => {
    const [value, setValue] = useState(props.value);
    const [selectedDate, setSelectedDate] = useState(value);
    const [isOpen, setIsOpen] = useState(false);

    const onOpenChange = (open: boolean) => {
      // Sync selected date with the value each time the calendar is opened.
      if (open) setSelectedDate(value);

      setIsOpen(open);
    };

    const saveSelectedDate = () => {
      setValue(selectedDate);
      onOpenChange(false);
    };

    onChange.mockImplementation((v: Date) => setValue(v));
    onSelectDate.mockImplementation((d: Date) => setSelectedDate(d));

    return (
      <DateField
        {...props}
        data-testid="date-field"
        value={value}
        onChange={onChange}
        selectedDate={selectedDate}
        onSelectDate={onSelectDate}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        footer={
          <>
            <Button label="Close" onClick={() => onOpenChange(false)} />
            <Button label="Apply" onClick={saveSelectedDate} />
          </>
        }
      />
    );
  };

  const { user, ...result } = renderComponent(isControlled ? <ControlledDateField /> : <DateField {...props} />);

  const testKit = createDateFieldTestKit();

  const clickIconButton = async () => await waitFor(async () => testKit.clickCalendarButton(), { timeout: 30000 });

  const clickInput = async () => await waitFor(async () => testKit.click(), { timeout: 30000 });

  const selectDate = async (day: number) => await waitFor(async () => testKit.selectDay(day), { timeout: 30000 });

  const typeDate = async (date: string) => {
    await waitFor(async () => testKit.type(date));
  };

  const clearDate = async () =>
    await waitFor(async () => {
      await testKit.clickClearButton();
    });

  const clickOutside = async () => await waitFor(async () => user.click(document.body));

  const saveSelectedDate = async () =>
    await waitFor(async () => user.click(screen.getByRole('button', { name: 'Apply' })));

  const clearInput = async () => {
    await waitFor(async () => {
      await testKit.click();
      await testKit.clear();
    });
  };

  return {
    ...result,
    user,
    testKit,
    clickIconButton,
    clickInput,
    selectDate,
    typeDate,
    clearDate,
    clearInput,
    clickOutside,
    ...(isControlled && {
      onChange,
      onSelectDate,
      saveSelectedDate,
    }),
  };
};

describe('Date Field', () => {
  validateComponent<DateFieldProps>(DateField, 'DateField', {
    wrapper: ({ children }) => <label>label{children}</label>,
    defaultDataTestId: 'date-field',
    props: {
      isTypable: true,
    },
  });

  it('opens and closes the calendar on toggle date-picker click', async () => {
    const { testKit } = renderDateField({ value: createDate('2022-02-09') });

    expect(testKit.isCalendarOpen()).toBe(false);
    await testKit.clickCalendarButton();
    expect(testKit.isCalendarOpen()).toBe(true);
    await testKit.clickCalendarButton();
    expect(testKit.isCalendarOpen()).toBe(false);
  });

  it('opens the calendar on input click', async () => {
    const { testKit } = renderDateField({ value: createDate('2022-02-09') });

    expect(testKit.isCalendarOpen()).toBe(false);
    await testKit.click();
    expect(testKit.isCalendarOpen()).toBe(true);
  });

  it('opens and closes the calendar by keyboard', async () => {
    const { user, testKit } = renderDateField({ value: createDate('2022-02-09') });
    await waitFor(() => expect(testKit.isCalendarOpen()).toBe(false));
    // Open with Enter
    await user.tab();
    await user.keyboard('[Enter]');

    await waitFor(() => expect(testKit.isCalendarOpen()).toBe(true));

    // Close with Escape
    await testKit.clickOutside();
    await waitFor(() => expect(testKit.isCalendarOpen()).toBe(false));

    // Open with Space
    await user.tab();
    await user.keyboard('[Space]');

    expect(testKit.isCalendarOpen()).toBe(true);

    // Close with Escape again
    await user.keyboard('{Escape}');
    await waitFor(() => expect(testKit.isCalendarOpen()).toBe(false));
  });

  it('closes the calendar upon clicking outside the calendar', async () => {
    const { clickIconButton, clickOutside, testKit } = renderDateField({ value: createDate('2022-02-09') });

    await clickIconButton();
    expect(testKit.isCalendarOpen()).toBe(true);
    await clickOutside();
    expect(testKit.isCalendarOpen()).toBe(false);
  });

  it('closes the calendar upon selecting a date', async () => {
    const { clickIconButton, selectDate, testKit } = renderDateField({ value: createDate('2022-02-09') });

    await clickIconButton();
    await selectDate(15);
    expect(testKit.isCalendarOpen()).toBe(false);
  });

  it('opens the date input on the current month and year when no value is given', async () => {
    vi.useFakeTimers().setSystemTime(createDate('2021-10-15').getTime());

    const { clickIconButton } = renderDateField();

    await act(async () => clickIconButton());

    expect(screen.getByTestId('today-marker')).toBeInTheDocument();
    expect(screen.getByText('October 2021')).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('opens the date input on the correct month and year when given', async () => {
    const { clickIconButton, testKit } = renderDateField({ value: createDate('2022-02-09') });

    await clickIconButton();

    expect(screen.getByText('February 2022')).toBeInTheDocument();
    expect(testKit.isDaySelected(9)).toBe(true);
  });

  it('should apply shouldDisableDate when only it is set', async () => {
    const { clickIconButton, testKit } = renderDateField({
      value: createDate('2026-07-01'),
      shouldDisableDate: () => false,
    });

    await clickIconButton();

    expect(testKit.isDayDisabled(3)).toBe(false);
  });

  describe('when disabled dates', () => {
    it('should show custom disabled dates in calendar when shouldDisableDate is set', async () => {
      const disabledDays = [10, 20];
      const shouldDisableDate = (date: Date) => disabledDays.includes(date.getDate());
      const { clickIconButton, testKit } = renderDateField({
        value: createDate('2022-02-15'),
        shouldDisableDate,
      });

      await clickIconButton();

      expect(testKit.isDayDisabled(10)).toBe(true);
      expect(testKit.isDayDisabled(20)).toBe(true);
      expect(testKit.isDayDisabled(15)).toBe(false);
    });

    it('should call onDateValidationError with DISABLED_DATE for custom disabled dates when typing', async () => {
      const onDateValidationError = vi.fn();
      const onChange = vi.fn();
      const disabledDay = 13;
      const shouldDisableDate = (date: Date) => date.getDate() === disabledDay;

      const { typeDate, clickOutside } = renderDateField({
        onDateValidationError,
        onChange,
        isTypable: true,
        shouldDisableDate,
      });

      await typeDate('02/13/2025');
      await clickOutside();

      expect(onDateValidationError).toHaveBeenCalledWith(dateValidationReason['DISABLED_DATE']);
      expect(onChange).toHaveBeenCalledWith(null);
    });
  });

  it('has a minimum date in the calendar when using `minDate`', async () => {
    const { clickIconButton, testKit } = renderDateField({
      value: createDate('2022-02-09'),
      minDate: createDate('2022-02-09'),
    });

    await clickIconButton();

    expect(testKit.isDayDisabled(9)).toBe(false);
    expect(testKit.isDayDisabled(8)).toBe(true);
    expect(screen.getByTestId('date-field-calendar-header-previous-month-button')).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  });

  it('has a maximum date in the calendar when using `maxDate`', async () => {
    const { clickIconButton, testKit } = renderDateField({
      value: createDate('2022-02-09'),
      maxDate: createDate('2022-02-09'),
    });

    await clickIconButton();

    expect(testKit.isDayDisabled(9)).toBe(false);
    expect(testKit.isDayDisabled(10)).toBe(true);
    expect(screen.getByTestId('date-field-calendar-header-next-month-button')).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not open the calendar when disabled', async () => {
    const { clickIconButton, testKit } = renderDateField({ isDisabled: true });

    await clickIconButton();
    expect(testKit.isCalendarOpen()).toBe(false);
  });

  it('does not open the calendar when is read-only', async () => {
    const { clickIconButton, testKit } = renderDateField({ isReadOnly: true });

    await clickIconButton();
    expect(testKit.isCalendarOpen()).toBe(false);
  });

  it('opens the calendar by default when `defaultIsOpen` is set', () => {
    const { testKit } = renderDateField({
      defaultIsOpen: true,
      value: createDate('2022-02-09'),
      selectedDate: createDate('2022-02-09'),
    });

    expect(testKit.isCalendarOpen()).toBe(true);
    expect(testKit.getValue()).toBe('Feb 9, 2022');
    expect(testKit.isDaySelected(9)).toBe(true);
  });

  it('does not open the calendar by default when `defaultIsOpen` and `isViewMode` are set', () => {
    renderDateField({ defaultIsOpen: true, isViewMode: true });

    expect(screen.queryByTestId('date-field-calendar')).not.toBeInTheDocument();
  });

  it('does not open the calendar by default when `defaultIsOpen` and `isDisabled` are set', () => {
    const { testKit } = renderDateField({ defaultIsOpen: true, isDisabled: true });

    expect(testKit.isCalendarOpen()).toBe(false);
  });

  it('does not open the calendar by default when `defaultIsOpen` and `isReadOnly` are set', () => {
    const { testKit } = renderDateField({ defaultIsOpen: true, isReadOnly: true });

    expect(testKit.isCalendarOpen()).toBe(false);
  });

  it('does not open the calendar by default when `defaultIsOpen` and `isLoading` are set', () => {
    renderDateField({ defaultIsOpen: true, isLoading: true });

    expect(screen.queryByTestId('date-field-calendar')).not.toBeInTheDocument();
  });

  it('does not fire the `onChange` callback when changing the value from outside', () => {
    const onChange = vi.fn();
    const { rerender } = renderComponent(<DateField onChange={onChange} value={createDate('2022-02-09')} />);

    expect(getInput().textContent).toBe('Feb 9, 2022');
    expect(onChange).not.toHaveBeenCalled();

    rerender(<DateField onChange={onChange} value={createDate('2022-02-15')} />);

    expect(getInput().textContent).toBe('Feb 15, 2022');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('toggle formats when `isTypable` on focus and blur', async () => {
    const onChange = vi.fn();
    const { clickInput, clickOutside, testKit } = renderDateField({
      isTypable: true,
      value: createDate('2022-02-09'),
      onChange,
    });
    expect(testKit.getValue()).toBe('Feb 9, 2022');

    await clickInput();
    expect(testKit.getValue()).toBe('02/09/2022');

    await clickOutside();
    expect(testKit.getValue()).toBe('Feb 9, 2022');

    expect(onChange).not.toHaveBeenCalled();
  });

  it('fires the `onChange` callback when selecting a new date by typing in the input', async () => {
    const onChange = vi.fn();
    const { typeDate, clearInput, clickOutside, testKit } = renderDateField({
      isTypable: true,
      value: createDate('2022-02-09'),
      onChange,
    });

    expect(testKit.getValue()).toBe('Feb 9, 2022');

    await clearInput();

    await typeDate('02/16/2022');

    expect(testKit.getValue()).toBe('02/16/2022');

    // Blur the input to trigger the `onChange` callback.
    await clickOutside();

    expect(onChange).toHaveBeenCalledWith(expect.objectContaining(createDate('2022-02-16')));
  });

  it('does not fires the `onChange` callback when selecting the same date by typing in the input', async () => {
    const onChange = vi.fn();
    const { clearInput, typeDate, clickOutside, testKit } = renderDateField({
      isTypable: true,
      value: createDate('2022-02-09'),
      onChange,
    });

    expect(testKit.getValue()).toBe('Feb 9, 2022');

    await clearInput();
    await typeDate('02/09/2022');

    expect(testKit.getValue()).toBe('02/09/2022');

    // Blur the input to attempt to trigger the `onChange` callback.
    await clickOutside();

    expect(testKit.getValue()).toBe('Feb 9, 2022');

    expect(onChange).not.toHaveBeenCalled();
  });

  it('fires the `onChange` callback with `undefined` when clearing the date by typing in the input', async () => {
    const onChange = vi.fn();
    const { clearInput, clickOutside, testKit } = renderDateField({
      isTypable: true,
      value: createDate('2022-02-09'),
      onChange,
    });

    expect(testKit.getValue()).toBe('Feb 9, 2022');

    await clearInput();

    expect(testKit.getValue()).toBe('');

    // Blur the input to attempt to trigger the `onChange` callback.
    await clickOutside();

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it('selects a date when not typeable and uncontrolled', async () => {
    vi.useFakeTimers().setSystemTime(createDate('2022-02-02').getTime());

    const { clickIconButton, selectDate, testKit } = renderDateField();

    await clickIconButton();
    await selectDate(10);

    expect(testKit.isCalendarOpen()).toBe(false);
    expect(getInput().textContent).toBe('Feb 10, 2022');

    await clickIconButton();

    expect(testKit.isDaySelected(10)).toBe(true);
  });

  it('fires the `onChange` callback when selecting a new date', async () => {
    const onChange = vi.fn();
    const { clickIconButton, selectDate, testKit } = renderDateField({ value: createDate('2022-02-09'), onChange });

    expect(getInput().textContent).toBe('Feb 9, 2022');

    await clickIconButton();
    await selectDate(16);
    expect(testKit.isCalendarOpen()).toBe(false);
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining(createDate('2022-02-16')));
  });

  it('does not fire the `onChange` callback when selecting the same date', async () => {
    const onChange = vi.fn();
    const { clickIconButton, selectDate, testKit } = renderDateField({ value: createDate('2022-02-09'), onChange });

    expect(getInput().textContent).toBe('Feb 9, 2022');

    await clickIconButton();
    await selectDate(9);

    expect(getInput().textContent).toBe('Feb 9, 2022');
    expect(testKit.isCalendarOpen()).toBe(false);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('selects a date when it is in a modal', async () => {
    const testKit = createDateFieldTestKit();
    const onChange = vi.fn();
    renderComponent(
      <Modal header="header" isOpen onClose={vi.fn()}>
        <DateField data-testid="date-field" onChange={onChange} value={createDate('2022-02-09')} />
      </Modal>
    );

    expect(testKit.getValue()).toBe('Feb 9, 2022');

    await waitFor(async () => testKit.clickCalendarButton(), { timeout: 30000 });
    await waitFor(async () => testKit.selectDay(16));

    expect(getInput().textContent).toBe('Feb 9, 2022');
    expect(testKit.isCalendarOpen()).toBe(false);
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining(createDate('2022-02-16')));
  });

  it('shows the clear button when there is a value', () => {
    renderDateField({ value: createDate('2022-02-09') });

    expect(screen.getByRole('button', { name: 'Clear date' })).toBeInTheDocument();
  });

  it('shows the clear button when `isTypable` is set and there is an input value', async () => {
    const { typeDate } = renderDateField({ isTypable: true });

    await typeDate('02/09/');

    expect(screen.getByRole('button', { name: 'Clear date' })).toBeInTheDocument();
  });

  it('hides the clear button when there is no value', () => {
    renderDateField();

    assertHasNoClearButton();
  });

  it('hides the clear button if there is a value and `hideClear` is set', () => {
    renderDateField({ value: createDate('2022-02-09'), hideClear: true });

    assertHasNoClearButton();
  });

  it('hides the clear button if there is a value and the field is disabled', () => {
    renderDateField({ value: createDate('2022-02-09'), isDisabled: true });

    assertHasNoClearButton();
  });

  it('hides the clear button if there is a value and the field is in read-only', () => {
    renderDateField({ value: createDate('2022-02-09'), isReadOnly: true });

    assertHasNoClearButton();
  });

  it('supports a custom aria-label for toggle date-picker button', () => {
    const clickIconButtonAriaLabel = 'Click here to toggle the date picker';
    renderDateField({ value: createDate('2022-02-09'), toggleDatePickerAriaLabel: clickIconButtonAriaLabel });

    expect(screen.getByLabelText(clickIconButtonAriaLabel)).toBeInTheDocument();
  });

  it('supports a custom aria-label for clear date button', () => {
    const clearDateAriaLabel = 'Click here to clear the date';
    renderDateField({ value: createDate('2022-02-09'), clearDateAriaLabel });

    expect(screen.getByLabelText(clearDateAriaLabel)).toBeInTheDocument();
  });

  it('renders a calendar footer', () => {
    renderDateField({ footer: <Box data-testid="calendar-footer">Calendar footer</Box>, defaultIsOpen: true });

    expect(screen.getByTestId('calendar-footer')).toBeInTheDocument();
  });

  describe('format is `dd/MM/yyyy`', () => {
    it('fires the `onChange` callback when selecting a new date by typing in the input', async () => {
      const onChange = vi.fn();
      const { clearInput, typeDate, clickOutside, testKit } = renderDateField({
        isTypable: true,
        value: createDate('2022-02-09'),
        onChange,
        format: 'dd/MM/yyyy',
      });

      expect(testKit.getValue()).toBe('Feb 9, 2022');

      await clearInput();
      await typeDate('16/02/2022');

      expect(testKit.getValue()).toBe('16/02/2022');

      // Blur the input to trigger the `onChange` callback.
      await clickOutside();

      expect(onChange).toHaveBeenCalledWith(expect.objectContaining(createDate('2022-02-16')));
    });

    it('does not fires the `onChange` callback when selecting the same date by typing in the input', async () => {
      const onChange = vi.fn();
      const { clearInput, typeDate, clickOutside, testKit } = renderDateField({
        isTypable: true,
        value: createDate('2022-02-09'),
        onChange,
        format: 'dd/MM/yyyy',
      });

      expect(testKit.getValue()).toBe('Feb 9, 2022');

      await clearInput();
      await typeDate('09/02/2022');

      expect(testKit.getValue()).toBe('09/02/2022');

      // Blur the input to attempt to trigger the `onChange` callback.
      await clickOutside();

      expect(onChange).not.toHaveBeenCalled();
    });

    it('fires the `onChange` callback with `null` when selecting an invalid date by typing in the input', async () => {
      const onChange = vi.fn();
      const { clearInput, typeDate, clickOutside, testKit } = renderDateField({
        isTypable: true,
        value: createDate('2022-02-09'),
        onChange,
        format: 'dd/MM/yyyy',
      });

      expect(testKit.getValue()).toBe('Feb 9, 2022');

      await clearInput();
      // February 30th does not exist.
      await typeDate('30/02/2022');

      expect(testKit.getValue()).toBe('30/02/2022');

      // Blur the input to attempt to trigger the `onChange` callback.
      await clickOutside();

      expect(testKit.getValue()).toBe('Feb 9, 2022');

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(null);
    });

    it('fires the `onChange` callback with `null` when clearing the date by typing in the input', async () => {
      const onChange = vi.fn();
      const { clearInput, clickOutside, testKit } = renderDateField({
        isTypable: true,
        value: createDate('2022-02-09'),
        onChange,
        format: 'dd/MM/yyyy',
      });

      expect(testKit.getValue()).toBe('Feb 9, 2022');

      await clearInput();

      expect(testKit.getValue()).toBe('');

      // Blur the input to attempt to trigger the `onChange` callback.
      await clickOutside();

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(undefined);
    });
  });

  describe('fully controlled component', () => {
    it('selects a date and saves it', async () => {
      const { onChange, onSelectDate, clickInput, selectDate, saveSelectedDate, testKit } = renderDateField({
        isControlled: true,
        value: createDate('2022-02-09'),
      });

      await clickInput();
      await selectDate(16);

      expect(onSelectDate).toHaveBeenLastCalledWith(createDate('2022-02-16'));
      expect(onChange).not.toHaveBeenCalled();

      await saveSelectedDate?.();

      expect(onChange).toHaveBeenLastCalledWith(createDate('2022-02-16'));
      expect(testKit.isCalendarOpen()).toBe(false);
      expect(getInput().textContent).toBe('Feb 16, 2022');
    });

    it('does not fire `onSelectDate` and `onChange` when selecting and saving the same date', async () => {
      const { onChange, onSelectDate, clickIconButton, selectDate, saveSelectedDate, testKit } = renderDateField({
        isControlled: true,
        value: createDate('2022-02-09'),
      });

      await clickIconButton();
      await selectDate(9);

      expect(onSelectDate).not.toHaveBeenCalled();

      await saveSelectedDate?.();

      expect(onChange).not.toHaveBeenCalled();
      expect(testKit.isCalendarOpen()).toBe(false);
      expect(getInput().textContent).toBe('Feb 9, 2022');
    });

    it('does not fire `onChange` when selecting a new date and closing the calendar', async () => {
      const { onChange, onSelectDate, user, clickIconButton, selectDate, testKit } = renderDateField({
        isControlled: true,
        value: createDate('2022-02-09'),
      });

      await clickIconButton();
      await selectDate(16);

      expect(onSelectDate).toHaveBeenLastCalledWith(createDate('2022-02-16'));

      await waitFor(async () => await user.click(screen.getByRole('button', { name: 'Close' })));

      expect(onChange).not.toHaveBeenCalled();
      expect(testKit.isCalendarOpen()).toBe(false);
      expect(getInput().textContent).toBe('Feb 9, 2022');

      await clickIconButton();
      // Make sure the calendar is opened on the last saved date.
      expect(testKit.isDaySelected(9)).toBe(true);
    });

    it('does not fire `onChange` when selecting a new date and clicking outside', async () => {
      const { onChange, onSelectDate, clickIconButton, selectDate, clickOutside, testKit } = renderDateField({
        isControlled: true,
        value: createDate('2022-02-09'),
      });

      await clickIconButton();
      await selectDate(16);

      expect(onSelectDate).toHaveBeenLastCalledWith(createDate('2022-02-16'));

      await clickOutside();

      expect(onChange).not.toHaveBeenCalled();
      expect(testKit.isCalendarOpen()).toBe(false);
      expect(getInput().textContent).toBe('Feb 9, 2022');

      await clickIconButton();
      // Make sure the calendar is opened on the last saved date.
      expect(testKit.isDaySelected(9)).toBe(true);
    });
  });

  describe('fully controlled component and typable', () => {
    it('saves a date by typing in the input', async () => {
      const { onChange, onSelectDate, clearInput, typeDate, clickIconButton, testKit } = renderDateField({
        isControlled: true,
        isTypable: true,
        value: createDate('2022-02-09'),
        selectedDate: createDate('2022-02-09'),
      });

      await clearInput();
      await typeDate('02/04/2022');

      expect(onSelectDate).not.toHaveBeenCalled();
      expect(onChange).not.toHaveBeenCalled();

      await clickIconButton();

      expect(testKit.getValue()).toBe('Feb 4, 2022');
      expect(onSelectDate).not.toHaveBeenCalled();
      expect(onChange).toHaveBeenLastCalledWith(createDate('2022-02-04'));
      expect(testKit.isCalendarOpen()).toBe(true);
      // Make sure the calendar is opened on the new saved date.
      expect(testKit.isDaySelected(4)).toBe(true);
    });

    it('resets the selected date in the calendar if typing an invalid date value', async () => {
      const { onChange, clickIconButton, typeDate, clickOutside, selectDate, clickInput, testKit } = renderDateField({
        isControlled: true,
        isTypable: true,
        value: createDate('2022-02-09'),
      });

      await clickIconButton();
      await waitFor(() => {});

      expect(testKit.isCalendarOpen()).toBe(true);
      await waitFor(() => {});
      expect(testKit.isDaySelected(9)).toBe(true);

      await clickInput();
      await typeDate('[Backspace]');

      expect(testKit.isCalendarOpen()).toBe(false);
      expect(testKit.getValue()).toBe('02/09/202');

      await clickIconButton();

      expect(onChange).toHaveBeenLastCalledWith(null);
      expect(testKit.isDaySelected(9)).toBe(false);

      await selectDate(16);
      await clickOutside();

      expect(testKit.isCalendarOpen()).toBe(false);
      expect(testKit.getValue()).toBe('02/09/202');
    });

    it('does not fire `onSelectDate` and `onChange` when typing and saving the same date', async () => {
      const { onChange, onSelectDate, clearInput, typeDate, clickIconButton, testKit } = renderDateField({
        isControlled: true,
        isTypable: true,
        value: createDate('2022-02-09'),
      });

      await clearInput();
      await typeDate('02/09/2022');
      await clickIconButton();

      expect(onSelectDate).not.toHaveBeenCalled();
      expect(onChange).not.toHaveBeenCalled();

      expect(testKit.getValue()).toBe('Feb 9, 2022');
      expect(testKit.isCalendarOpen()).toBe(true);
      // Make sure the calendar is opened on the last saved date.
      expect(testKit.isDaySelected(9)).toBe(true);
    });
  });

  describe('validations', () => {
    it('fires the `onChange` callback with `null` when typing a year before the 20th century', async () => {
      const onChange = vi.fn();
      const { typeDate, clickIconButton, testKit } = renderDateField({
        isTypable: true,
        onChange,
      });

      // The year 1000 is before the 20th century.
      await typeDate('02/02/1000');

      await clickIconButton();

      expect(testKit.getValue()).toBe('02/02/1000');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(null);

      expect(testKit.isCalendarOpen()).toBe(true);
      expect(screen.getByTestId('today-marker')).toBeInTheDocument();
    });

    it('fires the `onChange` callback with `null` when selecting an invalid date by typing in the input', async () => {
      const onChange = vi.fn();
      const { clearInput, typeDate, clickOutside, testKit } = renderDateField({
        isTypable: true,
        value: createDate('2022-02-09'),
        onChange,
      });

      expect(testKit.getValue()).toBe('Feb 9, 2022');

      await clearInput();
      // February 30th does not exist.
      await typeDate('02/30/2022');

      expect(testKit.getValue()).toBe('02/30/2022');

      // Blur the input to attempt to trigger the `onChange` callback.
      await clickOutside();

      expect(testKit.getValue()).toBe('Feb 9, 2022');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(null);
    });

    it('calls onDateValidationError with INVALID_FORMAT and onChange with null for invalid date input', async () => {
      const onDateValidationError = vi.fn();
      const onChange = vi.fn();
      const { typeDate, clickOutside, testKit } = renderDateField({
        onDateValidationError,
        onChange,
        isTypable: true,
      });

      await typeDate('52/52/1955');

      // Blur the input to attempt to trigger the `onChange` callback.
      await clickOutside();
      expect(testKit.getValue()).toBe('52/52/1955');

      expect(onDateValidationError).toHaveBeenCalledWith(dateValidationReason['INVALID_FORMAT']);
      expect(onChange).toHaveBeenCalledWith(null);
    });

    it('calls onDateValidationError with UNSUPPORTED_YEAR and onChange with null for dates before 1900', async () => {
      const onDateValidationError = vi.fn();
      const onChange = vi.fn();
      const { typeDate, clickOutside, testKit } = renderDateField({
        onDateValidationError,
        onChange,
        isTypable: true,
      });

      await typeDate('02/02/1800');

      // Blur the input to attempt to trigger the `onChange` callback.
      await clickOutside();
      expect(testKit.getValue()).toBe('02/02/1800');

      expect(onDateValidationError).toHaveBeenCalledWith(dateValidationReason['UNSUPPORTED_YEAR']);
      expect(onChange).toHaveBeenCalledWith(null);
    });

    it('calls onDateValidationError with OUT_OF_RANGE and onChange with null for dates not in range', async () => {
      const onDateValidationError = vi.fn();
      const onChange = vi.fn();
      const { typeDate, clickOutside, testKit } = renderDateField({
        onDateValidationError,
        onChange,
        isTypable: true,
        minDate: createDate('2028-02-06'),
        maxDate: createDate('2028-02-12'),
      });

      await typeDate('02/02/2020');

      // Blur the input to attempt to trigger the `onChange` callback.
      await clickOutside();
      expect(testKit.getValue()).toBe('02/02/2020');

      expect(onDateValidationError).toHaveBeenCalledWith(dateValidationReason['OUT_OF_RANGE']);
      expect(onChange).toHaveBeenCalledWith(null);
    });

    it('calls onDateValidationError with OUT_OF_RANGE and onChange with null for dates not in range', async () => {
      const onDateValidationError = vi.fn();
      const onChange = vi.fn();
      const { typeDate, clickOutside, testKit } = renderDateField({
        onDateValidationError,
        onChange,
        isTypable: true,
        minDate: createDate('2028-02-06'),
        maxDate: createDate('2028-02-12'),
      });

      await typeDate('02/02/2020');

      // Blur the input to attempt to trigger the `onChange` callback.
      await clickOutside();
      expect(testKit.getValue()).toBe('02/02/2020');

      expect(onDateValidationError).toHaveBeenCalledWith(dateValidationReason['OUT_OF_RANGE']);
      expect(onChange).toHaveBeenCalledWith(null);
    });

    it('calls onDateValidationError with DISABLED_DATE and onChange with null for dates in weekend', async () => {
      const onDateValidationError = vi.fn();
      const onChange = vi.fn();
      const { typeDate, clickOutside, testKit } = renderDateField({
        onDateValidationError,
        onChange,
        isTypable: true,
      });
      const dateToType = '07/05/2025';

      await typeDate(dateToType);

      await clickOutside();
      expect(testKit.getValue()).toBe(dateToType);

      expect(onDateValidationError).toHaveBeenCalledWith(dateValidationReason['DISABLED_DATE']);
      expect(onChange).toHaveBeenCalledWith(null);
    });

    it('calls onDateValidationError with DISABLED_DATE and onChange with null for dates that are disabled', async () => {
      const shouldDisableDate = (date: Date) => date.getDate() === 4;
      const onDateValidationError = vi.fn();
      const onChange = vi.fn();
      const { typeDate, clickOutside, testKit } = renderDateField({
        onDateValidationError,
        onChange,
        isTypable: true,
        shouldDisableDate,
      });

      await typeDate('07/04/2025');

      // Blur the input to attempt to trigger the `onChange` callback.
      await clickOutside();
      expect(testKit.getValue()).toBe('07/04/2025');

      expect(onDateValidationError).toHaveBeenCalledWith(dateValidationReason['DISABLED_DATE']);
      expect(onChange).toHaveBeenCalledWith(null);
    });

    it('calls onDateValidationError with undefined when dates is in range', async () => {
      const onDateValidationError = vi.fn();
      const onChange = vi.fn();
      const { typeDate, clickOutside, testKit } = renderDateField({
        onDateValidationError,
        onChange,
        isTypable: true,
        minDate: createDate('2028-02-08'),
        maxDate: createDate('2028-02-12'),
      });

      await typeDate('02/08/2028');

      // Blur the input to attempt to trigger the `onChange` callback.
      await clickOutside();
      expect(testKit.getValue()).toBe('02/08/2028');

      expect(onDateValidationError).toHaveBeenCalledWith();
    });
  });
});
