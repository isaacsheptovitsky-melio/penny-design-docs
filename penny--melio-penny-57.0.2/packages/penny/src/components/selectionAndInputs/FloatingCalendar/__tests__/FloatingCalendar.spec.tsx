import { createDate } from '@melio/penny-utils';
import { screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { expect } from 'vitest';

import { Button } from '@/components/action/Button';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { FloatingCalendar } from '../FloatingCalendar';
import type { FloatingCalendarProps } from '../FloatingCalendar.types';

const triggerComponent = <Button variant="secondary" size="large" label="Button" />;

const renderControlled = ({
  isOpen = false,
  trigger = triggerComponent,
  value,
  ...props
}: Partial<FloatingCalendarProps>) => {
  const onOpenChange = vi.fn();
  const onSelectDate = vi.fn();

  const ControlledFloatingCalendar = () => {
    const [open, setIsOpen] = useState<boolean>(isOpen);
    const [selection, setSelection] = useState<Date | undefined>(value);

    onSelectDate.mockImplementation((d: Date) => setSelection(d));

    onOpenChange.mockImplementation((o: boolean) => {
      setIsOpen(o);
    });

    return (
      <FloatingCalendar
        {...props}
        isOpen={open}
        trigger={trigger}
        value={selection}
        onSelect={onSelectDate}
        onOpenChange={onOpenChange}
      />
    );
  };

  return renderComponent(<ControlledFloatingCalendar />, {
    userEventOptions: { advanceTimers: vi.advanceTimersByTime },
  });
};

describe('FloatingCalendar', () => {
  const onSelectMock = vi.fn();
  const props = {
    isOpen: true,
    onOpenChange: vi.fn(),
    onSelect: onSelectMock,
    trigger: triggerComponent,
  };
  validateComponent<FloatingCalendarProps>(FloatingCalendar, 'FloatingCalendar', {
    props,
    defaultDataTestId: 'floating-calendar',
  });

  it('calls onSelect when selecting a different date', async () => {
    const { getByTestId, user } = renderComponent(<FloatingCalendar {...props} value={createDate('2022-11-15')} />);

    await user.click(getByTestId('calendar-day-16'));
    expect(onSelectMock).toBeCalled();
  });

  it('does not call onSelect when selecting the same date', async () => {
    const { user } = renderComponent(<FloatingCalendar {...props} value={createDate('2022-11-15')} />);

    await user.click(screen.getByTestId('calendar-day-15'));

    expect(onSelectMock).not.toHaveBeenCalled();
  });

  it('calls onBack when clicking on back button', async () => {
    const onBack = vi.fn();

    const { user } = renderComponent(
      <FloatingCalendar {...props} value={createDate('2022-11-15')} backButton={{ onBack, label: 'Back' }} />
    );

    await user.click(screen.getByTestId('dropdown-floating-calendar-back-button'));

    expect(onBack).toBeCalled();
  });

  it('invokes `onOpenChange` with the correct parameters when clicking the trigger', async () => {
    const onOpenChange = vi.fn();
    const { user, getByRole } = renderComponent(
      <FloatingCalendar {...props} value={createDate('2022-11-15')} isOpen={false} onOpenChange={onOpenChange} />
    );

    await user.click(getByRole('button', { name: 'Button' }));
    expect(onOpenChange).toBeCalledWith(true, 'trigger');
  });

  it('invokes `onSelect` and `onOpenChange` with the correct parameters when selecting a date', async () => {
    const onOpenChange = vi.fn();
    const { user, getByTestId } = renderComponent(
      <FloatingCalendar {...props} value={createDate('2022-11-15')} onOpenChange={onOpenChange} />
    );

    await user.click(getByTestId('calendar-day-16'));
    expect(onSelectMock).toBeCalled();
    expect(onOpenChange).toBeCalledWith(false, 'content');
  });

  it('invokes `onOpenChange` with the correct parameters when clicking outside', async () => {
    const onOpenChange = vi.fn();
    const { user } = renderComponent(
      <FloatingCalendar {...props} value={createDate('2022-11-15')} onOpenChange={onOpenChange} />
    );

    await user.click(document.querySelector('body') as HTMLElement);
    expect(onOpenChange).toBeCalledWith(false, 'outside');
  });

  describe('focus behavior', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });
    it('focus is trapped in the calendar by default', async () => {
      const { user, getByRole, getByTestId } = renderControlled(props);

      // focus is trap in the calendar
      await waitFor(() => {
        // wait for focus to move from the trigger to the calendar
        expect(getByRole('button', { name: /^Previous month/ })).toHaveFocus();
      });
      await user.tab();
      expect(getByRole('button', { name: /Change month or year/ })).toHaveFocus();
      await user.tab();
      expect(getByRole('button', { name: /^Next month/ })).toHaveFocus();
      await user.tab();
      expect(getByTestId('calendar-day-1')).toHaveFocus();

      // returns to the first element
      await user.tab();
      await waitFor(() => {
        // wait for focus to move from the trigger to the calendar
        expect(getByRole('button', { name: /^Previous month/ })).toHaveFocus();
      });

      // closes the calendar
      await user.keyboard('{Esc}');
      expect(getByRole('button', { name: 'Button' })).toHaveAttribute('aria-expanded', 'false');
      expect(screen.queryByTestId('date-field-calendar')).not.toBeInTheDocument();
    });

    it('when focus is not trapped in the calendar, after the last focusable element is blurred the calendar closes', async () => {
      const { user, getByRole, getByTestId } = renderControlled({ ...props, shouldTrapFocus: false });

      await waitFor(() => {
        // wait for focus to move from the input to the calendar
        expect(getByRole('button', { name: /^Previous month/ })).toHaveFocus();
      });
      await user.tab();
      expect(getByRole('button', { name: /Change month or year/ })).toHaveFocus();
      await user.tab();
      expect(getByRole('button', { name: /^Next month/ })).toHaveFocus();
      await user.tab();
      expect(getByTestId('calendar-day-1')).toHaveFocus();

      // closes the calendar
      await user.tab();
      expect(getByRole('button', { name: 'Button' })).toHaveAttribute('aria-expanded', 'false');
      expect(screen.queryByTestId('date-field-calendar')).not.toBeInTheDocument();
    });
  });
});
