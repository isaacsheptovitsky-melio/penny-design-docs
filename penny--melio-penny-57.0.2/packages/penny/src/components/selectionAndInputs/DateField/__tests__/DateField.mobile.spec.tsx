import * as pennyUtils from '@melio/penny-utils';
import { screen } from '@testing-library/react';
import { expect, vi } from 'vitest';

import { renderDateField } from './DateField.spec';

describe('DateField - mobile behavior', () => {
  describe('typable', () => {
    it('renders input field on mobile', () => {
      vi.spyOn(pennyUtils, 'isMobileDevice').mockReturnValue(true);
      renderDateField({ isTypable: true });

      const input = screen.getByTestId('date-field');
      expect(input).toBeInTheDocument();
      expect(input.tagName).toBe('INPUT'); // should be real input
    });
  });
  describe('not typable', () => {
    it('renders button trigger on mobile', () => {
      vi.spyOn(pennyUtils, 'isMobileDevice').mockReturnValue(true);
      renderDateField({ isTypable: false });

      // The button trigger is the ActionArea button with testId "date-field"
      const fakeInput = screen.getByTestId('date-field');
      expect(fakeInput).toBeInTheDocument();
      expect(fakeInput.tagName).toBe('BUTTON'); // should be ActionArea
    });

    it('opens and closes the calendar on icon button click', async () => {
      vi.spyOn(pennyUtils, 'isMobileDevice').mockReturnValue(true);
      const { clickIconButton, testKit } = renderDateField({ value: pennyUtils.createDate('2022-02-09') });

      expect(testKit.isCalendarOpen()).toBe(false);
      await clickIconButton();
      expect(testKit.isCalendarOpen()).toBe(true);
      await clickIconButton();
      expect(testKit.isCalendarOpen()).toBe(false);
    });

    it('opens the calendar on input click', async () => {
      vi.spyOn(pennyUtils, 'isMobileDevice').mockReturnValue(true);
      const { clickInput, testKit } = renderDateField({ value: pennyUtils.createDate('2022-02-09') });

      expect(testKit.isCalendarOpen()).toBe(false);
      await clickInput();
      expect(testKit.isCalendarOpen()).toBe(true);
    });

    it('closes the calendar upon clicking outside the calendar', async () => {
      vi.spyOn(pennyUtils, 'isMobileDevice').mockReturnValue(true);
      const { clickIconButton, clickOutside, testKit } = renderDateField({
        value: pennyUtils.createDate('2022-02-09'),
      });

      await clickIconButton();
      expect(testKit.isCalendarOpen()).toBe(true);
      await clickOutside();
      expect(testKit.isCalendarOpen()).toBe(false);
    });

    it('closes the calendar upon selecting a date', async () => {
      vi.spyOn(pennyUtils, 'isMobileDevice').mockReturnValue(true);
      const { clickIconButton, selectDate, testKit } = renderDateField({ value: pennyUtils.createDate('2022-02-09') });

      await clickIconButton();
      await selectDate(15);
      expect(testKit.isCalendarOpen()).toBe(false);
    });
  });
});
