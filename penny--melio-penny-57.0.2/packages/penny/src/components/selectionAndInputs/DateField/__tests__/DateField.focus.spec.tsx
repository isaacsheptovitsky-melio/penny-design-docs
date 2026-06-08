import { createDateFieldTestKit } from '@melio/penny-testkit-rtl';
import { createDate } from '@melio/penny-utils';
import { screen, waitFor } from '@testing-library/react';
import { expect } from 'vitest';

import { renderComponent } from '@/test-utils/render.utils';

import { DateField, type DateFieldProps } from '..';
import { getClearButton, getDayElement, getIconButton, getInput } from './DateField.spec';

const renderDateField = (props?: Partial<DateFieldProps>) => {
  const { user, ...result } = renderComponent(<DateField {...props} />, {
    userEventOptions: { advanceTimers: vi.advanceTimersByTime },
  });

  return {
    ...result,
    user,
  };
};

describe('Date Field', () => {
  let testKit: ReturnType<typeof createDateFieldTestKit>;

  beforeEach(() => {
    testKit = createDateFieldTestKit();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should focus is trapped in the calendar by default', async () => {
    const { user, getByRole } = renderDateField({
      value: createDate('2022-09-01'),
      isTypable: true,
    });
    await user.tab();
    expect(getInput()).toHaveFocus();

    await user.tab();
    expect(getClearButton()).toHaveFocus();

    await user.tab();
    await user.keyboard('[Enter]');
    expect(testKit.isCalendarOpen()).toBe(true);

    // focus trap in the calendar
    await waitFor(() => {
      // wait for focus to move from the input to the calendar
      expect(getByRole('button', { name: /^Previous month/ })).toHaveFocus();
    });
    await user.tab();
    expect(getByRole('button', { name: /Change month or year/ })).toHaveFocus();
    await user.tab();
    expect(getByRole('button', { name: /^Next month/ })).toHaveFocus();
    await user.tab();
    expect(getDayElement(1)).toHaveFocus();

    // returns to the first element
    await user.tab();
    await waitFor(() => {
      // wait for changing the focus from the input to the first element in the calendar
      expect(getByRole('button', { name: /^Previous month/ })).toHaveFocus();
    });

    // closes the calendar
    await user.keyboard('{Esc}');
    expect(testKit.isCalendarOpen()).toBe(false);
  });

  it('should focus the date field after returning from loading state', async () => {
    const { user, rerender } = renderDateField({
      isLoading: false,
      value: createDate('2022-02-09'),
      isTypable: true,
    });
    await user.tab();
    expect(getInput()).toHaveFocus();

    await user.tab();
    expect(getClearButton()).toHaveFocus();

    await user.tab();
    expect(getIconButton()).toHaveFocus();
    await user.keyboard('[Enter]');

    expect(testKit.isCalendarOpen()).toBe(true);
    getDayElement(2).focus();

    await user.keyboard('[Enter]');

    expect(testKit.isCalendarOpen()).toBe(false);

    rerender(<DateField value={createDate('2022-02-09')} onChange={vi.fn()} isLoading />);
    expect(screen.queryByTestId('date-field-toggle')).not.toBeInTheDocument();

    rerender(<DateField value={createDate('2022-02-09')} onChange={vi.fn()} isLoading={false} />);
    expect(getIconButton()).toBeInTheDocument();

    expect(getIconButton()).toHaveFocus();
  });

  it('when focus is not trapped in the calendar, after the last focusable element is blurred the calendar closes', async () => {
    const { user, getByRole } = renderDateField({
      isTypable: true,
      shouldTrapFocus: false,
      value: createDate('2022-09-01'),
    });
    await user.tab();
    expect(getInput()).toHaveFocus();

    await user.tab();
    expect(getClearButton()).toHaveFocus();

    await user.tab();
    expect(getIconButton()).toHaveFocus();
    await user.keyboard('[Enter]');
    expect(testKit.isCalendarOpen()).toBe(true);

    await waitFor(() => {
      // wait for focus to move from the input to the calendar
      expect(getByRole('button', { name: /^Previous month/ })).toHaveFocus();
    });
    await user.tab();
    expect(getByRole('button', { name: /Change month or year/ })).toHaveFocus();
    await user.tab();
    expect(getByRole('button', { name: /^Next month/ })).toHaveFocus();
    await user.tab();
    expect(getDayElement(1)).toHaveFocus();

    // closes the calendar
    await user.tab();
    expect(testKit.isCalendarOpen()).toBe(false);
  });

  it('should focus the icon button after selecting a date', async () => {
    const { user } = renderDateField({
      isTypable: true,
      value: createDate('2022-02-09'),
    });
    await user.tab();
    expect(getInput()).toHaveFocus();

    await user.tab();
    expect(getClearButton()).toHaveFocus();

    await user.tab();

    expect(getIconButton()).toHaveFocus();
    await user.keyboard('[Enter]');
    expect(testKit.isCalendarOpen()).toBe(true);

    getDayElement(2).focus();
    await user.keyboard('[Enter]');

    expect(testKit.isCalendarOpen()).toBe(false);
    expect(getIconButton()).toHaveFocus();
  });

  it('should focus the icon button after closing the calendar by pressing Escape', async () => {
    const { user, getByRole } = renderDateField({
      isTypable: true,
      value: createDate('2022-02-09'),
    });
    await user.tab();
    expect(getInput()).toHaveFocus();

    await user.tab();
    expect(getClearButton()).toHaveFocus();

    await user.tab();
    expect(getIconButton()).toHaveFocus();
    await user.keyboard('[Enter]');
    expect(testKit.isCalendarOpen()).toBe(true);

    await waitFor(() => {
      expect(getByRole('button', { name: /^Previous month/ })).toHaveFocus();
    });

    await user.keyboard('{Esc}');
    expect(testKit.isCalendarOpen()).toBe(false);
    expect(getIconButton()).toHaveFocus();
  });
});
