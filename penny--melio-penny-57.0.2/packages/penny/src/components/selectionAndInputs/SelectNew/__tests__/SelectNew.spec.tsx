/* eslint-disable max-lines */
import { createSelectNewTestKit } from '@melio/penny-testkit-rtl';
import { act, screen, waitFor, within } from '@testing-library/react';
import type { ChangeEvent, ComponentPropsWithoutRef } from 'react';
import { useState } from 'react';
import { beforeEach, expect, vi } from 'vitest';

import { Button } from '@/components/action/Button';
import { testAutoFocus, testReadOnly } from '@/components/form/test/utils/form.test.utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { SelectNew, SelectNewFooter } from '..';
import type { City } from '../__fixtures__';
import {
  assertActivedescendant,
  assertHasNoClearButton,
  assertMenuIsClosed,
  assertTriggerValue,
  cities,
  citiesByRegion,
  defaultProps,
  getSearchBar,
  getTriggerInput,
  getTriggerValue,
  setup,
} from '../__fixtures__';
import type { SelectNewProps } from '../SelectNew.types';

describe('SelectNew', () => {
  let testKit: ReturnType<typeof createSelectNewTestKit>;

  beforeEach(() => {
    testKit = createSelectNewTestKit();
  });

  validateComponent<SelectNewProps<string, City>>(SelectNew, 'SelectNew', {
    props: defaultProps,
    defaultDataTestId: 'select',
    componentParts: ['trigger'],
  });
  testAutoFocus(SelectNew, { options: [] }, 'select-trigger-input');
  testReadOnly({
    Comp: SelectNew,
    compProps: { options: [] },
    options: { customTestIdToGet: 'select-trigger-input', attributeToGet: 'data-readonly' },
  });

  it('toggles the menu when clicking the trigger', async () => {
    const onClick = vi.fn();
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const onMenuOpen = vi.fn();
    const onMenuClose = vi.fn();
    setup({ onClick, onFocus, onBlur, onMenuOpen, onMenuClose });

    await testKit.clickTrigger();
    expect(testKit.getIsMenuOpen()).toBeTruthy();
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onMenuOpen).toHaveBeenCalledTimes(1);

    await testKit.clickTrigger();

    await assertMenuIsClosed();
    assertTriggerValue();
    expect(onClick).toHaveBeenCalledTimes(2);
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(0);
    expect(onMenuOpen).toHaveBeenCalledTimes(1);
    expect(onMenuClose).toHaveBeenCalledTimes(1);
  });

  it('does not open the menu by trigger click when select is disabled', async () => {
    const onFocus = vi.fn();
    const onClick = vi.fn();
    setup({ onClick, onFocus, isDisabled: true });

    await testKit.clickTrigger();

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(onClick).toHaveBeenCalledTimes(0);
    expect(onFocus).toHaveBeenCalledTimes(0);
  });

  it('highlights the first option by default', async () => {
    setup();

    await testKit.clickTrigger();

    screen.getAllByRole('option').forEach((option, index) => {
      expect(option).toHaveAttribute('tabIndex', index === 0 ? '0' : '-1');

      if (index === 0) {
        expect(option).toHaveAttribute('data-highlighted', 'true');
      } else {
        expect(option).not.toHaveAttribute('data-highlighted');
      }
    });
  });

  it('selects an option by click', async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const onMenuOpen = vi.fn();
    const onMenuClose = vi.fn();
    setup({ onFocus, onBlur, onMenuOpen, onMenuClose });

    await testKit.clickTrigger();

    expect(testKit.getIsMenuOpen()).toBeTruthy();
    expect(onMenuOpen).toHaveBeenCalledTimes(1);

    await testKit.clickOptionByText('New York');

    await assertMenuIsClosed();
    assertTriggerValue('New York');
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(0);
    expect(onMenuClose).toHaveBeenCalledTimes(1);
  });

  it('should skip a disabled option by typing the first letter', async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const { user, openByKeyboard } = setup({ onFocus, onBlur });

    // Tab to focus the component
    await user.tab();

    // Open the menu
    await openByKeyboard('Space');

    // Wait for menu to be open and first option to be highlighted
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    // Type "S" to navigate to options starting with S
    await user.keyboard('[KeyS]');

    // Wait for the first S option to be highlighted (Sacramento)
    await waitFor(() => {
      const option = screen.getByRole('option', { name: 'Sacramento' });
      expect(option).toHaveAttribute('data-highlighted', 'true');
    });

    // Type another "S" to navigate to next option starting with S
    // This should skip the disabled "San Antonio" and go to "San Bernardino"
    await user.keyboard('[KeyS]');

    // Wait for the option after the disabled one to be highlighted
    await waitFor(() => {
      const option = screen.getByRole('option', { name: 'San Bernardino' });
      expect(option).toHaveAttribute('data-highlighted', 'true');
    });

    // Verify menu is still open
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(0);
  });

  it("overrides the field's autocomplete attribute", () => {
    setup({ autoComplete: 'city' });

    expect(getTriggerInput()).toHaveAttribute('autocomplete', 'city');
  });

  describe('With sections', () => {
    it('has a menu with with grouped options', async () => {
      setup({ options: citiesByRegion });

      await testKit.clickTrigger();

      const sections = within(screen.getByTestId('select-content')).getAllByRole('group');
      expect(sections.length).toEqual(citiesByRegion.length);

      sections.forEach((section, i) => {
        const options = within(section).getAllByRole('option');

        expect(section).toHaveAccessibleName(citiesByRegion[i]?.label);
        expect(options.length).toEqual(citiesByRegion[i]?.options.length);
      });
    });

    it('traverses the options in forward order', async () => {
      const { user } = setup({ options: citiesByRegion });

      // First tab to focus the component
      await user.tab();

      // Open the dropdown with arrow down
      await user.keyboard('[ArrowDown]');

      // Wait for the first option to be highlighted
      const firstSection = screen.getByTestId('select-section-0');
      const firstOptionInFirstSection = within(firstSection).getByTestId('select-option-0');

      await waitFor(() => {
        expect(firstOptionInFirstSection).toHaveFocus();
      });

      await assertActivedescendant(firstOptionInFirstSection.id);

      // Navigate to the next section with multiple arrow downs
      await user.keyboard('[ArrowDown][ArrowDown][ArrowDown][ArrowDown][ArrowDown][ArrowDown][ArrowDown]');

      // Verify we're now at the first option in the second section
      const secondSection = screen.getByTestId('select-section-1');
      const firstOptionInSecondSection = within(secondSection).getByTestId('select-option-7');

      await waitFor(() => {
        expect(firstOptionInSecondSection).toHaveFocus();
      });

      await assertActivedescendant(firstOptionInSecondSection.id);
    });

    it('navigates to an option by typing the first letter of the option', async () => {
      const { user, openByKeyboard } = setup({ options: citiesByRegion });

      // First tab to focus the component
      await user.tab();

      // Open the dropdown with space
      await openByKeyboard('Space');

      // Type 'A' to jump to first option starting with A
      await user.keyboard('[KeyA]');

      // Verify we've jumped to the right section and option
      const secondSection = screen.getByTestId('select-section-1');
      const firstOptionInSecondSection = within(secondSection).getByTestId('select-option-7');

      await waitFor(() => {
        expect(firstOptionInSecondSection).toHaveFocus();
      });

      await assertActivedescendant(firstOptionInSecondSection.id);
    });
  });

  describe('selects an option by keyboard navigation', () => {
    it('traverses the options in forward order', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const { user, openByKeyboard } = setup({ onFocus, onBlur });

      // First tab to focus the component
      await user.tab();

      // Open the dropdown with arrow down
      await openByKeyboard('ArrowDown');

      // Wait for first option to be highlighted
      await waitFor(() => {
        expect(getTriggerInput()).toHaveAttribute('aria-activedescendant', 'select-option-0');
      });

      // Navigate down once
      await user.keyboard('{ArrowDown}');

      await waitFor(() => {
        expect(getTriggerInput()).toHaveAttribute('aria-activedescendant', 'select-option-1');
      });

      // Navigate down again
      await user.keyboard('{ArrowDown}');

      await waitFor(() => {
        expect(getTriggerInput()).toHaveAttribute('aria-activedescendant', 'select-option-2');
      });

      // Select the option with space
      await user.keyboard('[Space]');

      // Wait for menu to close and value to be set
      await assertMenuIsClosed();
      await waitFor(() => {
        assertTriggerValue('Atlanta');
      });

      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });

    it('traverses the options in reverse order', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const { user, openByKeyboard } = setup({ onFocus, onBlur });

      // First tab to focus the component
      await user.tab();

      // Open the dropdown with arrow up
      await openByKeyboard('ArrowUp');

      // Wait for the last option to be highlighted
      await waitFor(() => {
        expect(getTriggerInput()).toHaveAttribute('aria-activedescendant', 'select-option-83');
      });

      // Navigate up once
      await user.keyboard('[ArrowUp]');

      await waitFor(() => {
        expect(getTriggerInput()).toHaveAttribute('aria-activedescendant', 'select-option-82');
      });

      // Navigate up again
      await user.keyboard('[ArrowUp]');

      await waitFor(() => {
        expect(getTriggerInput()).toHaveAttribute('aria-activedescendant', 'select-option-81');
      });

      // Select the option with enter
      await user.keyboard('[Enter]');

      // Wait for menu to close and value to be set
      await assertMenuIsClosed();
      await waitFor(() => {
        assertTriggerValue('Wichita');
      });

      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });

    it('navigates to an option by typing the first letter of the option', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const { user, openByKeyboard } = setup({ onFocus, onBlur });

      // First tab to focus the component
      await user.tab();

      // Open the dropdown with space
      await openByKeyboard('Space');

      // Wait for the first option to be highlighted
      await assertActivedescendant('select-option-0');

      // Type 'T' to jump to first option starting with T
      await user.keyboard('[KeyT]');
      await assertActivedescendant('select-option-75');

      // Type 'T' again to go to the next option starting with T
      await user.keyboard('[KeyT]');
      await assertActivedescendant('select-option-76');

      // Type 'T' again to go to the next option starting with T
      await user.keyboard('[KeyT]');
      await assertActivedescendant('select-option-77');

      // Type 'Q' which has no matches, so selection stays the same
      await user.keyboard('[KeyQ]'); // No match for `q` query so the highlighted option should remain the same.
      await assertActivedescendant('select-option-77');

      // Select the option with enter
      await user.keyboard('[Enter]');

      // Wait for menu to close and value to be set
      await assertMenuIsClosed();
      await waitFor(() => {
        assertTriggerValue('Tucson');
      });

      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });

    it('focus a disabled option when traversing the options using the arrow keys in forward order', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const { user, openByKeyboard } = setup({ onFocus, onBlur });

      await user.tab();

      await openByKeyboard('Enter');

      await waitFor(() => {
        expect(getTriggerInput()).toHaveAttribute('aria-activedescendant', 'select-option-0');
      });

      await user.keyboard('[KeyS]');

      await waitFor(() => {
        expect(getTriggerInput()).toHaveAttribute('aria-activedescendant', 'select-option-61');
      });

      await user.keyboard('[ArrowDown][ArrowDown]');

      await waitFor(() => {
        expect(getTriggerInput()).toHaveAttribute('aria-activedescendant', 'select-option-63');
      });

      await user.keyboard('[Enter]');

      await assertMenuIsClosed();
      assertTriggerValue('San Bernardino');

      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });

    it('skips a disabled option when traversing the options using the arrow keys in reverse order', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const { user, openByKeyboard } = setup({ onFocus, onBlur });

      await act(async () => {
        await user.tab();
      });

      await act(async () => {
        await openByKeyboard('Enter');
      });

      await waitFor(() => {
        expect(getTriggerInput()).toHaveAttribute('aria-activedescendant', 'select-option-0');
      });

      await act(async () => {
        await user.keyboard('[KeyS]');
      });

      await act(async () => {
        await user.keyboard('[KeyS]');
      });

      await waitFor(() => {
        expect(getTriggerInput()).toHaveAttribute('aria-activedescendant', 'select-option-63');
      });

      await act(async () => {
        await user.keyboard('[ArrowUp][ArrowUp]');
      });

      await waitFor(() => {
        expect(getTriggerInput()).toHaveAttribute('aria-activedescendant', 'select-option-61');
      });

      await act(async () => {
        await user.keyboard('[Enter]');
      });

      await assertMenuIsClosed();
      assertTriggerValue('Sacramento');

      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });
  });

  it('selects an option by click using custom test-id', async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const options = cities.map((option) => ({ ...option, testId: option.label }));
    const { user } = setup({ options, onFocus, onBlur });

    await testKit.clickTrigger();

    expect(testKit.getIsMenuOpen()).toBeTruthy();
    await user.click(screen.getByTestId('select-option-Boston'));
    await assertMenuIsClosed();
    assertTriggerValue('Boston');
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(0);
  });

  it('closes the menu by clicking outside', async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const onMenuClose = vi.fn();
    setup({ onFocus, onBlur, onMenuClose });

    await testKit.clickTrigger();

    expect(testKit.getIsMenuOpen()).toBeTruthy();

    await testKit.clickOutside();

    await assertMenuIsClosed();
    // Making sure that nothing was selected.
    assertTriggerValue();
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onMenuClose).toHaveBeenCalledTimes(1);

    await testKit.clickTrigger();
    await testKit.clickOptionByText('New York');

    await assertMenuIsClosed();
    assertTriggerValue('New York');
    expect(onFocus).toHaveBeenCalledTimes(2);
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onMenuClose).toHaveBeenCalledTimes(2);

    await testKit.clickTrigger();

    expect(testKit.getIsMenuOpen()).toBeTruthy();

    await testKit.clickOutside();

    await assertMenuIsClosed();
    // Making sure the last selected option is displayed.
    assertTriggerValue('New York');
    expect(onFocus).toHaveBeenCalledTimes(2);
    expect(onBlur).toHaveBeenCalledTimes(2);
    expect(onMenuClose).toHaveBeenCalledTimes(3);
  });

  it('closes the menu by pressing escape', async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const onMenuClose = vi.fn();
    setup({ onFocus, onBlur, onMenuClose });

    await testKit.clickTrigger();

    expect(testKit.getIsMenuOpen()).toBeTruthy();

    await testKit.pressEsc();

    await assertMenuIsClosed();
    // Making sure that nothing was selected.
    assertTriggerValue();
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(0);
    expect(onMenuClose).toHaveBeenCalledTimes(1);

    await testKit.clickTrigger();
    await testKit.clickOptionByText('New York');

    await assertMenuIsClosed();
    assertTriggerValue('New York');
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(0);
    expect(onMenuClose).toHaveBeenCalledTimes(2);

    await testKit.clickTrigger();

    expect(testKit.getIsMenuOpen()).toBeTruthy();

    await testKit.pressEsc();

    await assertMenuIsClosed();
    // Making sure the last selected option is displayed.
    assertTriggerValue('New York');
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(0);
    expect(onMenuClose).toHaveBeenCalledTimes(3);
  });

  describe('opens the menu by keyboard', () => {
    it('opens the menu by pressing arrow-down key', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const onMenuOpen = vi.fn();
      const { user, openByKeyboard } = setup({ onFocus, onBlur, onMenuOpen });

      await user.tab();

      await assertMenuIsClosed();

      await openByKeyboard('ArrowDown');

      await assertActivedescendant('select-option-0');
      expect(testKit.getIsMenuOpen()).toBeTruthy();
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
      expect(onMenuOpen).toHaveBeenCalledTimes(1);
    });

    it('opens the menu by pressing arrow-up key', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const onMenuOpen = vi.fn();
      const { user, openByKeyboard } = setup({ onFocus, onBlur, onMenuOpen });

      await user.tab();

      await assertMenuIsClosed();

      await openByKeyboard('ArrowUp');

      await assertActivedescendant('select-option-83');
      expect(testKit.getIsMenuOpen()).toBeTruthy();
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
      expect(onMenuOpen).toHaveBeenCalledTimes(1);
    });

    it('opens the menu by pressing Enter key', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const onMenuOpen = vi.fn();
      const { user, openByKeyboard } = setup({ onFocus, onBlur, onMenuOpen });

      await user.tab();

      await assertMenuIsClosed();

      await openByKeyboard('Enter');

      await assertActivedescendant('select-option-0');
      expect(testKit.getIsMenuOpen()).toBeTruthy();
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
      expect(onMenuOpen).toHaveBeenCalledTimes(1);
    });

    it('opens the menu by pressing Space key', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const onMenuOpen = vi.fn();
      const { user, openByKeyboard } = setup({ onFocus, onBlur, onMenuOpen });

      await user.tab();

      await assertMenuIsClosed();

      await openByKeyboard('Space');

      await assertActivedescendant('select-option-0');
      expect(testKit.getIsMenuOpen()).toBeTruthy();
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
      expect(onMenuOpen).toHaveBeenCalledTimes(1);
    });
  });

  it('does not open the menu by keyboard navigation when select is read-only', async () => {
    const onFocus = vi.fn();
    const onMenuOpen = vi.fn();
    const { user, openByKeyboard } = setup({ onFocus, onMenuOpen, isReadOnly: true });

    await user.tab();
    await openByKeyboard('Space');
    await assertMenuIsClosed();
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onMenuOpen).toHaveBeenCalledTimes(0);
  });

  it('does not open the menu by keyboard navigation when select is disabled', async () => {
    const onFocus = vi.fn();
    const onMenuOpen = vi.fn();
    const { user, openByKeyboard } = setup({ onFocus, onMenuOpen, isDisabled: true });

    await user.tab();
    await openByKeyboard('Space');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(onFocus).toHaveBeenCalledTimes(0);
    expect(onMenuOpen).toHaveBeenCalledTimes(0);
  });

  it('does not open the menu by keyboard navigation when select is in view-mode', async () => {
    const onFocus = vi.fn();
    const onMenuOpen = vi.fn();
    const { user, openByKeyboard } = setup({ onFocus, onMenuOpen, isViewMode: true });

    await user.tab();
    await openByKeyboard('Space');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(onFocus).toHaveBeenCalledTimes(0);
    expect(onMenuOpen).toHaveBeenCalledTimes(0);
    expect(testKit.getIsViewMode()).toBeTruthy();
  });

  it('does not open the menu by keyboard navigation when select is loading', async () => {
    const onFocus = vi.fn();
    const onMenuOpen = vi.fn();
    const { user, openByKeyboard } = setup({ onFocus, onMenuOpen, isLoading: true });

    await user.tab();
    await openByKeyboard('Space');
    await assertMenuIsClosed();
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onMenuOpen).toHaveBeenCalledTimes(0);
  });

  it('displays a default value', () => {
    setup({ onChange: vi.fn(), value: 'boston' });

    assertTriggerValue('Boston');
  });

  it('renders a `data-value` attribute when a value is selected', async () => {
    setup();

    assertTriggerValue();
    expect(getTriggerValue()).not.toHaveAttribute('data-value');

    await testKit.clickTrigger();
    await testKit.clickOptionByText('New York');

    assertTriggerValue('New York');
    expect(getTriggerValue()).toHaveAttribute('data-value', 'new_york');
  });

  it('renders empty state when there are no options', async () => {
    setup({ options: [] });

    await testKit.clickTrigger();
    expect(screen.getByText(/no options/i)).toBeInTheDocument();
  });

  it('renders custom empty state when there are no options', async () => {
    setup({ options: [], emptyState: 'No cities' });

    await testKit.clickTrigger();
    expect(screen.getByText(/no cities/i)).toBeInTheDocument();
  });

  it('clears the select', async () => {
    const onClear = vi.fn();
    const onMenuOpen = vi.fn();
    const onMenuClose = vi.fn();
    setup({ onClear, onMenuOpen, onMenuClose });

    await testKit.clickTrigger();

    expect(onMenuOpen).toHaveBeenCalledTimes(1);

    await testKit.clickOptionByText('Boston');

    assertTriggerValue('Boston');
    expect(onMenuClose).toHaveBeenCalledTimes(1);

    await testKit.clickClearButton();

    assertTriggerValue();
    expect(onClear).toHaveBeenCalledTimes(1);
    expect(onMenuClose).toHaveBeenCalledTimes(1);
    // Focus should be on the trigger after clearing the select.
    expect(getTriggerInput()).toHaveFocus();
  });

  it('does not display the clear button when the select has no value', () => {
    setup();

    assertHasNoClearButton();
  });

  it('does not display the clear button when the select is disabled', () => {
    setup({ onChange: vi.fn(), value: 'boston', isDisabled: true });

    assertTriggerValue('Boston');
    assertHasNoClearButton();
  });

  it('does not display the clear button when the select is read-only', () => {
    setup({ onChange: vi.fn(), value: 'boston', isReadOnly: true });

    assertTriggerValue('Boston');
    assertHasNoClearButton();
  });

  it('does not display the clear button when the select is in view-mode', () => {
    const { getByText } = setup({ onChange: vi.fn(), value: 'boston', isViewMode: true });

    expect(getByText('Boston')).toBeInTheDocument();
    assertHasNoClearButton();
  });

  it('does not display the clear button when the select is loading', () => {
    setup({ onChange: vi.fn(), value: 'boston', isLoading: true });

    assertTriggerValue('Boston');
    assertHasNoClearButton();
  });

  it('does not display the clear button when `shouldHideClearButton` is passed', () => {
    setup({ onChange: vi.fn(), value: 'boston', shouldHideClearButton: true });

    assertTriggerValue('Boston');
    assertHasNoClearButton();
  });

  it('should render correct trigger content if value changes', () => {
    const { rerender } = setup({ onChange: vi.fn(), value: 'new_york' });

    assertTriggerValue('New York');

    rerender(<SelectNew {...defaultProps} onChange={vi.fn()} value="" />);
    assertTriggerValue();

    rerender(<SelectNew {...defaultProps} onChange={vi.fn()} value="boston" />);
    assertTriggerValue('Boston');
  });

  it('should fire `onChange` with correct parameters when value changes', async () => {
    const onChange = vi.fn();
    const { rerender } = setup({ onChange, value: 'new_york' });

    await testKit.clickTrigger();
    await testKit.clickOptionByText('Boston');

    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith({ target: { value: 'boston' } });
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    rerender(<SelectNew {...defaultProps} onChange={onChange} value="boston" />);
    await testKit.clickTrigger();
    // Selecting the same option should not fire `onChange`.
    await testKit.clickOptionByText('Boston');

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    await testKit.clickClearButton();

    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith({ target: { value: null } });
      expect(onChange).toHaveBeenCalledTimes(2);
    });
  });

  describe('With search-bar', () => {
    const setupWithSearchBar = (props: Partial<ComponentPropsWithoutRef<typeof SelectNew>> = {}) => {
      const testKit = createSelectNewTestKit({ dataTestId: props['data-testid'] });
      const onSearchChange = vi.fn();

      const ControlledSelect = () => {
        const [filteredOptions, setFilteredOptions] = useState<City[]>(cities);
        const [query, setQuery] = useState('');
        const [value, setValue] = useState('');

        const onChange = (e: ChangeEvent<HTMLInputElement>) => {
          setQuery('');
          setFilteredOptions(cities);
          setValue(e.target.value);
        };

        onSearchChange.mockImplementation((e: ChangeEvent<HTMLInputElement>) => {
          act(() => {
            setQuery(e.target.value);
            setFilteredOptions(
              cities.filter((city) => city.label.toLowerCase().includes(e.target.value.toLowerCase()))
            );
          });
        });

        return (
          <SelectNew
            {...defaultProps}
            {...props}
            onChange={onChange}
            value={value}
            searchBarProps={{
              value: query,
              onChange: onSearchChange,
              options: filteredOptions,
            }}
          />
        );
      };

      const { user, ...result } = renderComponent(<ControlledSelect />);

      const typeInSearchBar = async (text: string) => {
        await act(async () => {
          await testKit.typeSearch(text);
        });
      };

      const getExpectedValue = (value = '') =>
        expect.objectContaining({
          target: expect.objectContaining({ value }) as EventTarget,
        }) as ChangeEvent<HTMLInputElement>;

      return { ...result, user, assertActivedescendant, typeInSearchBar, onSearchChange, getExpectedValue };
    };

    it('has the correct attributes set', async () => {
      const { user } = setupWithSearchBar();

      expect(getTriggerInput()).toHaveAttribute('role', 'button');
      expect(getTriggerInput()).toHaveAttribute('aria-haspopup', 'dialog');
      expect(getTriggerInput()).toHaveAttribute('aria-expanded', 'false');

      await user.click(getTriggerInput());

      expect(screen.getByTestId('select-menu')).toHaveAttribute('role', 'dialog');
      expect(getSearchBar()).toHaveAttribute('role', 'combobox');
      expect(getSearchBar()).toHaveAttribute('aria-label', 'Search options');
      expect(getSearchBar()).toHaveAttribute('autocomplete', 'off');
      expect(getSearchBar()).toHaveAttribute('aria-controls', 'select-listbox');
      expect(getSearchBar()).toHaveAttribute('aria-expanded', 'true');

      const menuList = screen.getByTestId('select-content');

      expect(menuList).toHaveAttribute('aria-label', 'Cities');
      expect(menuList).toHaveAttribute('role', 'listbox');
      expect(menuList).toHaveAttribute('id', 'select-listbox');
    });

    it('has the correct attributes set if read-only', () => {
      setupWithSearchBar({ isReadOnly: true });

      expect(getTriggerInput()).toHaveAttribute('role', 'combobox');
      expect(getTriggerInput()).toHaveAttribute('aria-haspopup', 'dialog');
      expect(getTriggerInput()).toHaveAttribute('aria-expanded', 'false');
    });

    it('has the correct attributes set if loading', () => {
      setupWithSearchBar({ isLoading: true });

      expect(getTriggerInput()).toHaveAttribute('role', 'combobox');
      expect(getTriggerInput()).toHaveAttribute('aria-haspopup', 'dialog');
      expect(getTriggerInput()).toHaveAttribute('aria-expanded', 'false');
    });

    it('should focus the search-bar on menu open and allow searching', async () => {
      const { user } = setupWithSearchBar();

      // First tab to focus the component
      await user.tab();

      // Open the menu with space
      await user.keyboard('[Space]');

      // Wait for the menu to be open before continuing
      await waitFor(() => {
        expect(screen.getByTestId('select-menu')).toBeInTheDocument();
      });

      // Type in search bar - one full operation rather than character by character
      await user.type(getSearchBar(), 'new');

      // Wait for search results to appear
      await waitFor(() => {
        expect(getSearchBar()).toHaveValue('new');

        // Check that search results show the expected option
        const options = screen.getAllByRole('option');
        expect(options.length).toBeGreaterThan(0);
        expect(options[0]).toHaveTextContent('New Orleans');
      });

      // Navigate to the first option - single keyboard action
      await user.keyboard('{ArrowDown}');

      // Wait for the option to receive focus
      await waitFor(() => {
        const option = screen.getByRole('option', { name: 'New Orleans' });
        expect(option).toHaveFocus();
      });

      // Select the option
      await user.keyboard('{Enter}');

      // Wait for the menu to close and value to be set
      await waitFor(() => {
        expect(screen.queryByTestId('select-menu')).not.toBeInTheDocument();
        expect(getTriggerValue()).toHaveTextContent('New Orleans');
      });
    });

    it('should call the search-bar `onChange` with an empty string after selecting an option', async () => {
      const { user, typeInSearchBar, onSearchChange, getExpectedValue } = setupWithSearchBar();

      await user.tab();
      await user.keyboard('[Space]');
      await typeInSearchBar('New York');

      await waitFor(() => {
        expect(onSearchChange).toHaveBeenLastCalledWith(getExpectedValue('New York'));
      });

      await user.keyboard('[ArrowDown]');
      await user.keyboard('[Enter]');

      await waitFor(() => {
        expect(onSearchChange).toHaveBeenLastCalledWith(getExpectedValue());
      });
    });

    it('should call the search-bar `onChange` with an empty string after clicking outside', async () => {
      const { user, typeInSearchBar, onSearchChange, getExpectedValue } = setupWithSearchBar();

      await user.tab();
      await user.keyboard('[Space]');
      await typeInSearchBar('New York');

      await waitFor(() => {
        expect(onSearchChange).toHaveBeenLastCalledWith(getExpectedValue('New York'));
      });

      await act(async () => {
        await user.click(document.body);
      });

      await waitFor(() => {
        expect(onSearchChange).toHaveBeenLastCalledWith(getExpectedValue());
      });
    });

    it('should call the search-bar `onChange` with an empty string after pressing Escape key', async () => {
      const { user, typeInSearchBar, onSearchChange, getExpectedValue } = setupWithSearchBar();

      await user.tab();
      await user.keyboard('[Space]');
      await typeInSearchBar('New York');

      await waitFor(() => {
        expect(onSearchChange).toHaveBeenLastCalledWith(getExpectedValue('New York'));
      });

      await act(async () => {
        await user.keyboard('[Escape]');
      });

      await waitFor(() => {
        expect(onSearchChange).toHaveBeenLastCalledWith(getExpectedValue());
      });
    });
  });

  describe('has a footer', () => {
    it('navigates to the interactive element inside the footer by keyboard', async () => {
      const onClick = vi.fn();
      const { openByKeyboard, user } = setup({
        footer: (
          <SelectNewFooter>
            <Button label="Add new city" onClick={onClick} />
          </SelectNewFooter>
        ),
      });

      await user.tab();

      await assertMenuIsClosed();

      await openByKeyboard('ArrowDown');

      await assertActivedescendant('select-option-0');
      expect(testKit.getIsMenuOpen()).toBeTruthy();

      await user.keyboard('[ArrowDown]');

      await assertActivedescendant('select-option-1'); // Navigating to another option by keyboard as usual.
      expect(screen.getByRole('option', { name: 'Arlington' })).toHaveFocus();

      await user.tab(); // Navigating to the footer button.

      const footerButton = screen.getByRole('button', { name: 'Add new city' });

      expect(footerButton).toHaveFocus();

      await user.keyboard('[Space]');

      expect(onClick).toHaveBeenCalledTimes(1);

      await user.tab({ shift: true }); // Navigating back to the options list.

      expect(screen.getByRole('option', { name: 'Arlington' })).toHaveFocus();

      await user.tab(); // Navigating to the footer button again.

      expect(footerButton).toHaveFocus();

      await user.keyboard('[ArrowDown]'); // Focus moves back to the options list and to the next option.

      await assertActivedescendant('select-option-2');
      expect(testKit.getIsMenuOpen()).toBeTruthy();
      expect(screen.getByRole('option', { name: 'Atlanta' })).toHaveFocus();

      await user.tab(); // Navigating to the footer button again.
      await user.tab(); // Another tab should close the menu.

      await assertMenuIsClosed();
      assertTriggerValue();
      expect(getTriggerInput()).toHaveFocus();
    });

    it('has the correct `aria` attributes for a dialog', async () => {
      setup({
        menuAriaLabel: 'Cities',
        footer: (
          <SelectNewFooter>
            <Button label="Add new city" />
          </SelectNewFooter>
        ),
      });

      expect(getTriggerInput()).toHaveAttribute('aria-haspopup', 'dialog');

      await testKit.clickTrigger();

      const menuContainer = screen.getByTestId('select-menu');

      expect(menuContainer).toHaveAttribute('role', 'dialog');
      expect(menuContainer).not.toHaveAttribute('role', 'listbox');
      expect(menuContainer).not.toHaveAttribute('aria-label');
      expect(menuContainer).not.toHaveAttribute('aria-orientation');

      const menuList = screen.getByTestId('select-content');

      expect(menuList).toHaveAttribute('role', 'listbox');
      expect(menuList).toHaveAttribute('aria-label', 'Cities');
    });
  });

  it('should have an `aria-required` attribute when marking the component as required', () => {
    setup({ isRequired: true });

    expect(getTriggerInput()).toHaveAttribute('aria-required');
  });

  it('should support custom `aria-label`', () => {
    setup({ 'aria-label': 'Select a city' });

    expect(getTriggerInput()).toHaveAttribute('aria-label', 'Select a city');
  });

  it('should not set `aria-label` if `aria-labelledby` if used', () => {
    setup({ 'aria-labelledby': 'custom-label-id' });

    expect(getTriggerInput()).not.toHaveAttribute('aria-label');
    expect(getTriggerInput()).toHaveAttribute('aria-labelledby', 'custom-label-id');
  });

  it('should not have combobox related attributes when disabled', () => {
    setup({ isDisabled: true });

    expect(getTriggerInput()).not.toHaveAttribute('aria-autocomplete');
    expect(getTriggerInput()).not.toHaveAttribute('aria-haspopup');
    expect(getTriggerInput()).not.toHaveAttribute('aria-expanded');
    expect(getTriggerInput()).not.toHaveAttribute('aria-activedescendant');
    expect(getTriggerInput()).not.toHaveAttribute('aria-labelledby');
    expect(getTriggerInput()).not.toHaveAttribute('role');
  });

  describe('Accessibility', () => {
    it('should have an a11y message element inside the trigger container', () => {
      setup();

      expect(screen.getByTestId('select')).toContainElement(document.querySelector('[id$="a11y-status-message"]'));
    });
  });

  describe('Select with useTypeahead', () => {
    it('highlights but does not select on space while typing', async () => {
      const onChange = vi.fn();
      const { user } = setup({ onChange });

      await user.tab();
      await user.keyboard('[Space]');
      expect(testKit.getIsMenuOpen()).toBeTruthy();

      // Start typing "New "
      await user.keyboard('[KeyN]');
      await user.keyboard('[KeyE]');
      await user.keyboard('[KeyW]');
      await user.keyboard('[Space]'); // should not trigger selection while still typing

      // Assert: Still just activeIndex change, no selection yet
      expect(onChange).not.toHaveBeenCalled();
      await assertActivedescendant('select-option-43');

      await user.keyboard('[KeyY]');
      expect(onChange).not.toHaveBeenCalled();
      await assertActivedescendant('select-option-44');
    });

    it('selects the active item on space after typing stops', async () => {
      const onChange = vi.fn();
      const { user } = setup({ onChange });

      await user.tab();
      await user.keyboard('[Space]');
      expect(testKit.getIsMenuOpen()).toBeTruthy();
      // Type "New", wait to simulate pause
      await user.keyboard('[KeyN]');
      await user.keyboard('[KeyE]');
      await user.keyboard('[KeyW]');
      await new Promise((r) => setTimeout(r, 1100)); // simulate typing pause

      await user.keyboard('[Space]'); // now user is no longer typing

      // Wait for menu to close and value to be set
      await assertMenuIsClosed();

      expect(onChange).toHaveBeenCalledOnce();
      assertTriggerValue('New Orleans');
    });

    it('selects the active item on Enter', async () => {
      const onChange = vi.fn();
      const { user } = setup({ onChange });

      await user.tab();
      await user.keyboard('[Space]');
      expect(testKit.getIsMenuOpen()).toBeTruthy();

      await user.keyboard('[KeyN]');
      await user.keyboard('[KeyE]');
      await user.keyboard('[KeyW]');
      await user.keyboard('[Enter]');

      expect(onChange).toHaveBeenCalledOnce();
      assertTriggerValue('New Orleans');
    });
  });
});
