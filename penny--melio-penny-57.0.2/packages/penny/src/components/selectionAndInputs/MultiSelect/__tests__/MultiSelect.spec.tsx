/* eslint-disable max-lines */
import { createMultiSelectTestKit } from '@melio/penny-testkit-rtl';
import { screen, waitFor, within } from '@testing-library/react';
import { expect, vi } from 'vitest';

import { Button } from '@/components/action/Button';
import { testAutoFocus, testReadOnly } from '@/components/form/test/utils/form.test.utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { MultiSelect, MultiSelectFooter } from '..';
import type { City } from '../__fixtures__';
import { assertActivedescendant, cities, citiesByRegion, defaultProps, getTriggerInput, setup } from '../__fixtures__';
import type { MultiSelectProps } from '../MultiSelect.types';

describe('MultiSelect', () => {
  let testKit: ReturnType<typeof createMultiSelectTestKit>;

  beforeEach(() => {
    testKit = createMultiSelectTestKit();
  });

  validateComponent<MultiSelectProps<string, City>>(MultiSelect, 'MultiSelect', {
    props: defaultProps,
    defaultDataTestId: 'multi-select',
    componentParts: ['trigger'],
  });

  testAutoFocus(MultiSelect, { options: [] }, 'multi-select-trigger-input');

  testReadOnly({
    Comp: MultiSelect,
    compProps: { options: [] },
    options: { customTestIdToGet: 'multi-select-trigger-input', attributeToGet: 'data-readonly' },
  });

  describe('opens and closes the menu', () => {
    it('toggles the menu when clicking the trigger', async () => {
      const onClick = vi.fn();
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      setup({ onClick, onFocus, onBlur });

      await testKit.click();

      expect(testKit.getIsMenuOpen()).toBe(true);
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onFocus).toHaveBeenCalledTimes(1);

      await testKit.click();

      expect(testKit.getIsMenuOpen()).toBe(false);
      expect(testKit.getPlaceholder()).toBe('Select');
      expect(onClick).toHaveBeenCalledTimes(2);
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });

    it('opens the menu by pressing `ArrowDown` key', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const { focusByKeyboard, openByKeyboard } = setup({ onFocus, onBlur });

      await focusByKeyboard();

      expect(testKit.getIsMenuOpen()).toBe(false);

      await openByKeyboard('ArrowDown');

      assertActivedescendant('multi-select-option-0');
      expect(testKit.getIsMenuOpen()).toBe(true);
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });

    it('opens the menu by pressing `ArrowUp` key', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const { focusByKeyboard, openByKeyboard } = setup({ onFocus, onBlur });

      await focusByKeyboard();

      expect(testKit.getIsMenuOpen()).toBe(false);

      await openByKeyboard('ArrowUp');

      assertActivedescendant('multi-select-option-83');
      expect(testKit.getIsMenuOpen()).toBe(true);
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });

    it('opens the menu by pressing `Enter` key', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const { focusByKeyboard, openByKeyboard } = setup({ onFocus, onBlur });

      await focusByKeyboard();

      expect(testKit.getIsMenuOpen()).toBe(false);

      await openByKeyboard('Enter');

      assertActivedescendant('multi-select-option-0');
      expect(testKit.getIsMenuOpen()).toBe(true);
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });

    it('opens the menu by pressing `Space` key', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const { focusByKeyboard, openByKeyboard } = setup({ onFocus, onBlur });

      await focusByKeyboard();

      expect(testKit.getIsMenuOpen()).toBe(false);

      await openByKeyboard('Space');

      await waitFor(() => assertActivedescendant('multi-select-option-0'));
      expect(testKit.getIsMenuOpen()).toBe(true);
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });

    it('closes the menu by pressing `Escape` key', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const { closeByKeyboard } = setup({ onFocus, onBlur });

      await testKit.click();

      expect(testKit.getIsMenuOpen()).toBe(true);

      await closeByKeyboard();

      expect(testKit.getIsMenuOpen()).toBe(false);
      expect(testKit.getValue()).toBe(''); // Making sure that nothing was selected.
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);

      await testKit.click();
      await testKit.clickOptionByText('New York');
      await testKit.clickOptionByText('Chicago');

      expect(testKit.getIsMenuOpen()).toBe(true);
      expect(testKit.getValue()).toBe('new_york, chicago');
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);

      await closeByKeyboard();

      expect(testKit.getIsMenuOpen()).toBe(false);
      expect(testKit.getValue()).toBe('new_york, chicago'); // Making sure the last selected options are displayed.
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });

    it('closes the menu by pressing `Tab` key', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const { user } = setup({ onFocus, onBlur });

      await testKit.click();

      expect(testKit.getIsMenuOpen()).toBe(true);

      await user.keyboard('[Tab]');

      expect(testKit.getIsMenuOpen()).toBe(false);
      expect(testKit.getValue()).toBe(''); // Making sure that nothing was selected.
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);

      await testKit.click();
      await testKit.clickOptionByText('New York');
      await testKit.clickOptionByText('Chicago');

      expect(testKit.getIsMenuOpen()).toBe(true);
      expect(testKit.getValue()).toBe('new_york, chicago');
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);

      await user.keyboard('[Tab]');

      expect(testKit.getIsMenuOpen()).toBe(false);
      expect(testKit.getValue()).toBe('new_york, chicago'); // Making sure the last selected options are displayed.
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });

    it('closes the menu by clicking outside', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      setup({ onFocus, onBlur });

      await testKit.click();

      expect(testKit.getIsMenuOpen()).toBe(true);

      await testKit.clickOutside();

      expect(testKit.getIsMenuOpen()).toBe(false);
      expect(testKit.getPlaceholder()).toBe('Select');
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(1);

      await testKit.click();
      await testKit.clickOptionByText('New York');
      await testKit.clickOptionByText('Chicago');

      expect(testKit.getIsMenuOpen()).toBe(true);
      expect(testKit.getValue()).toBe('new_york, chicago');
      expect(onFocus).toHaveBeenCalledTimes(2);
      expect(onBlur).toHaveBeenCalledTimes(1);

      await testKit.clickOutside();

      expect(testKit.getIsMenuOpen()).toBe(false);
      expect(testKit.getValue()).toBe('new_york, chicago');
      expect(onFocus).toHaveBeenCalledTimes(2);
      expect(onBlur).toHaveBeenCalledTimes(2);
    });
  });

  describe('does not open the menu by keyboard', () => {
    it('does not open the menu by keyboard navigation when read-only', async () => {
      const onFocus = vi.fn();
      const { focusByKeyboard, openByKeyboard } = setup({ onFocus, isReadOnly: true });

      await focusByKeyboard();
      await openByKeyboard('ArrowDown');

      expect(testKit.getIsMenuOpen()).toBe(false);
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('does not open the menu by keyboard navigation when loading', async () => {
      const onFocus = vi.fn();
      const { focusByKeyboard, openByKeyboard } = setup({ onFocus, isLoading: true });

      await focusByKeyboard();
      await openByKeyboard('ArrowDown');

      expect(testKit.getIsMenuOpen()).toBe(false);
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('does not open the menu by keyboard navigation when disabled', async () => {
      const onFocus = vi.fn();
      const { focusByKeyboard, openByKeyboard } = setup({ onFocus, isDisabled: true });

      await focusByKeyboard();
      await openByKeyboard('ArrowDown');

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      expect(onFocus).toHaveBeenCalledTimes(0);
    });

    it('does not open the menu by keyboard navigation when in view-mode', async () => {
      const onFocus = vi.fn();
      const { focusByKeyboard, openByKeyboard } = setup({ onFocus, isViewMode: true });

      await focusByKeyboard();
      await openByKeyboard('ArrowDown');

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      expect(onFocus).toHaveBeenCalledTimes(0);
    });
  });

  describe('menu states', () => {
    it('renders empty state when there are no options', async () => {
      setup({ options: [] });

      await testKit.click();

      expect(screen.getByTestId('multi-select-content').tagName).toBe('DIV');
      expect(screen.getByText(/no options/i)).toBeInTheDocument();
    });

    it('renders custom empty state when there are no options', async () => {
      setup({ options: [], emptyState: 'No cities' });

      await testKit.click();

      expect(screen.getByTestId('multi-select-content').tagName).toBe('DIV');
      expect(screen.getByText(/no cities/i)).toBeInTheDocument();
    });

    it('highlights the first option by default', async () => {
      setup();

      await testKit.click();

      screen.getAllByRole('option').forEach((option, index) => {
        expect(option).toHaveAttribute('tabIndex', index === 0 ? '0' : '-1');

        if (index === 0) {
          expect(option).toHaveAttribute('data-highlighted', 'true');
        } else {
          expect(option).not.toHaveAttribute('data-highlighted');
        }
      });
    });
  });

  describe('selects options', () => {
    it('selects options by click', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      setup({ onFocus, onBlur });

      await testKit.click();

      expect(testKit.getIsMenuOpen()).toBe(true);

      await testKit.clickOptionByText('New York');

      expect(testKit.getIsMenuOpen()).toBe(true);
      expect(testKit.getValue()).toBe('new_york');

      await testKit.clickOptionByText('Chicago');

      expect(testKit.getIsMenuOpen()).toBe(true);
      expect(testKit.getValue()).toBe('new_york, chicago');
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });

    it('selects options by click using custom test-id', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const options = cities.map((option: City) => ({ ...option, testId: option.label }));
      setup({ options, onFocus, onBlur });

      await testKit.click();

      expect(testKit.getIsMenuOpen()).toBe(true);

      await testKit.clickOptionByTestId('New York');

      expect(testKit.getIsMenuOpen()).toBe(true);
      expect(testKit.getValue()).toBe('new_york');

      await testKit.clickOptionByTestId('Chicago');

      expect(testKit.getIsMenuOpen()).toBe(true);
      expect(testKit.getValue()).toBe('new_york, chicago');
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });

    it('should not select a disabled option', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const { focusByKeyboard, openByKeyboard, selectOption } = setup({ onFocus, onBlur });

      await focusByKeyboard();
      await openByKeyboard('Space');

      expect(testKit.getIsMenuOpen()).toBe(true);
      assertActivedescendant('multi-select-option-0');
      expect(screen.getByRole('option', { name: 'San Antonio' })).toHaveAttribute('aria-disabled', 'true');

      await selectOption('San Antonio');

      assertActivedescendant();
      expect(testKit.getIsMenuOpen()).toBe(true);
      expect(testKit.getValue()).toBe('');
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });
  });

  describe('selects options in sections', () => {
    const smallData = citiesByRegion.map((region) => ({ ...region, options: region.options.slice(0, 2) })).slice(0, 2);

    it('renders menu with proper markup', async () => {
      setup({ options: smallData });
      await testKit.click();
      const sections = within(screen.getByTestId('multi-select-content')).getAllByRole('group');

      expect(sections.length).toEqual(smallData.length);
      sections.forEach((section, i) => {
        expect(section).toHaveAccessibleName(smallData[i]?.label);
        const options = within(section).getAllByRole('option');
        expect(options.length).toEqual(smallData[i]?.options.length);
      });
    });

    it('highlights the first option in the first section by default', async () => {
      setup({ options: smallData });
      await testKit.click();
      const firstSection = screen.getByTestId('multi-select-section-0');

      within(firstSection)
        .getAllByRole('option')
        .forEach((option, index) => {
          expect(option).toHaveAttribute('tabIndex', index === 0 ? '0' : '-1');

          if (index === 0) {
            expect(option).toHaveAttribute('data-highlighted', 'true');
          } else {
            expect(option).not.toHaveAttribute('data-highlighted');
          }
        });
    });

    it('traverses the options in forward order', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const { user, focusByKeyboard, openByKeyboard } = setup({ onFocus, onBlur });

      // Focus the component first
      await focusByKeyboard();

      // Open the dropdown with arrow down
      await openByKeyboard('ArrowDown');

      // Wait for the first option to be highlighted
      await waitFor(() => {
        assertActivedescendant('multi-select-option-0');
        expect(screen.getByRole('option', { name: 'Albuquerque' })).toHaveFocus();
      });

      // Navigate down with separate steps and proper waits between actions
      await user.keyboard('[ArrowDown]');

      // Wait for first arrow down to take effect
      await waitFor(() => {
        expect(screen.getByRole('option', { name: 'Arlington' })).toHaveFocus();
        assertActivedescendant('multi-select-option-1');
      });

      // Continue navigation
      await user.keyboard('[ArrowDown]');

      // Wait for second arrow down to take effect
      await waitFor(() => {
        expect(screen.getByRole('option', { name: 'Atlanta' })).toHaveFocus();
        assertActivedescendant('multi-select-option-2');
      });

      // Select the option with Enter
      await user.keyboard('[Enter]');

      // Wait for selection to be applied
      await waitFor(() => {
        assertActivedescendant('multi-select-option-2');
        expect(testKit.getIsMenuOpen()).toBe(true);
        expect(testKit.getValue()).toBe('atlanta');
      });

      // Continue navigation
      await user.keyboard('[ArrowDown]');

      // Wait for first arrow down to take effect
      await waitFor(() => {
        expect(screen.getByRole('option', { name: 'Austin' })).toHaveFocus();
        assertActivedescendant('multi-select-option-3');
      });

      await user.keyboard('[ArrowDown]');

      // Wait for second arrow down to take effect
      await waitFor(() => {
        expect(screen.getByRole('option', { name: 'Baltimore' })).toHaveFocus();
        assertActivedescendant('multi-select-option-4');
      });

      await user.keyboard('[ArrowDown]');

      // Wait for third arrow down to take effect
      await waitFor(() => {
        expect(screen.getByRole('option', { name: 'Boston' })).toHaveFocus();
        assertActivedescendant('multi-select-option-5');
      });

      // Select the second option
      await user.keyboard('[Enter]');

      // Verify both selections are present
      await waitFor(() => {
        expect(testKit.getIsMenuOpen()).toBe(true);
        expect(testKit.getValue()).toBe('atlanta, boston');
      });

      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });

    it('navigates to an option by typing the first letter of the option', async () => {
      const { user, focusByKeyboard, openByKeyboard } = setup({ options: smallData });

      // First tab to focus the component
      await focusByKeyboard();

      // Open the dropdown with Space
      await openByKeyboard('Space');

      // Wait for the first option to be highlighted
      await waitFor(() => {
        const firstSection = screen.getByTestId('multi-select-section-0');
        expect(within(firstSection).getByTestId('multi-select-option-0')).toHaveFocus();
        assertActivedescendant(within(firstSection).getByTestId('multi-select-option-0').id);
      });

      // Type 'A' to jump to first option starting with A
      await user.keyboard('[KeyA]');

      // Wait for the option navigation to complete
      await waitFor(() => {
        const secondSection = screen.getByTestId('multi-select-section-1');
        expect(within(secondSection).getByTestId('multi-select-option-2')).toHaveFocus();
        assertActivedescendant(within(secondSection).getByTestId('multi-select-option-2').id);
      });
    });
  });

  describe('selects options by keyboard navigation', () => {
    it('selects options by pressing either `Enter` or `Space` keys', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const onChange = vi.fn();
      const { user, focusByKeyboard, openByKeyboard } = setup({ onFocus, onBlur, onChange });

      // Focus the component
      await focusByKeyboard();

      // Open the dropdown
      await openByKeyboard('ArrowDown');

      // Wait for menu to open and focus the first item
      await waitFor(() => {
        expect(testKit.getIsMenuOpen()).toBe(true);
        assertActivedescendant('multi-select-option-0');
        expect(screen.getByRole('option', { name: 'Albuquerque' })).toHaveFocus();
      });

      // Select the first option with Enter and ensure it worked properly
      await user.keyboard('{Enter}');

      // Wait for the selection to be applied - check the actual element content directly
      await waitFor(() => {
        expect(testKit.getValue()).toBe('albuquerque');
        // Verify onChange was called
        expect(onChange).toHaveBeenCalled();
      });

      // Reset the onChange mock to track the next call clearly
      onChange.mockClear();

      // Navigate to next option
      await user.keyboard('{ArrowDown}');

      // Wait for focus to move
      await waitFor(() => {
        assertActivedescendant('multi-select-option-1');
        expect(screen.getByRole('option', { name: 'Arlington' })).toHaveFocus();
      });

      // Navigate once more to Atlanta (option 2)
      await user.keyboard('{ArrowDown}');

      // Wait for focus to move again and confirm we're on Atlanta
      await waitFor(() => {
        assertActivedescendant('multi-select-option-2');
        expect(screen.getByRole('option', { name: 'Atlanta' })).toHaveFocus();
      });

      // Select with Space - make sure to use the actual space character
      await user.keyboard(' ');

      // Verify final state - ensure onChange was called again
      await waitFor(() => {
        // Verify change handler was called for the second selection
        expect(onChange).toHaveBeenCalled();

        // Check the displayed value shows both selections
        expect(testKit.getValue()).toBe('albuquerque, atlanta');

        // Verify menu is still open
        expect(testKit.getIsMenuOpen()).toBe(true);
      });

      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });

    it('traverses the options in forward order', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const { user, focusByKeyboard, openByKeyboard } = setup({ onFocus, onBlur });

      await focusByKeyboard();
      await openByKeyboard('ArrowDown');

      await waitFor(() => assertActivedescendant('multi-select-option-0'));

      await user.keyboard('[ArrowDown]');
      await user.keyboard('[ArrowDown]');
      await user.keyboard('[Enter]');

      await waitFor(() => {
        assertActivedescendant('multi-select-option-2');
        expect(testKit.getIsMenuOpen()).toBe(true);
        expect(testKit.getValue()).toBe('atlanta');
      });

      await user.keyboard('[ArrowDown]');
      await user.keyboard('[ArrowDown]');
      await user.keyboard('[ArrowDown]');
      await user.keyboard('[Enter]');

      await waitFor(() => {
        assertActivedescendant('multi-select-option-5');
        expect(testKit.getIsMenuOpen()).toBe(true);
        expect(testKit.getValue()).toBe('atlanta, boston');
      });

      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });

    it('traverses the options in reverse order', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const { user, focusByKeyboard, openByKeyboard } = setup({ onFocus, onBlur });

      await focusByKeyboard();
      await openByKeyboard('ArrowUp');

      await waitFor(() => assertActivedescendant('multi-select-option-83'));

      await user.keyboard('[ArrowUp]');
      await user.keyboard('[ArrowUp]');
      await user.keyboard('[ArrowUp]');
      await user.keyboard('[Enter]');

      await waitFor(() => assertActivedescendant('multi-select-option-80'));
      await waitFor(() => expect(testKit.getIsMenuOpen()).toBe(true));
      await waitFor(() => expect(testKit.getValue()).toBe('washington'));

      await user.keyboard('[ArrowUp]');
      await user.keyboard('[ArrowUp]');
      await user.keyboard('[Enter]');

      await waitFor(() => assertActivedescendant('multi-select-option-78'));
      await waitFor(() => expect(testKit.getIsMenuOpen()).toBe(true));
      await waitFor(() => expect(testKit.getValue()).toBe('washington, tulsa'));
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });

    it('navigates to an option by typing the first letter of the option', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const { user, focusByKeyboard, openByKeyboard } = setup({ onFocus, onBlur });

      await focusByKeyboard();
      await openByKeyboard('Space');

      await waitFor(() => assertActivedescendant('multi-select-option-0'));

      await user.keyboard('[KeyN]');

      await waitFor(() => assertActivedescendant('multi-select-option-42'));

      await user.keyboard('[KeyN]');

      await waitFor(() => assertActivedescendant('multi-select-option-43'));

      await user.keyboard('[KeyN]');

      await waitFor(() => assertActivedescendant('multi-select-option-44'));

      await user.keyboard('[KeyQ]'); // No match for `q` query so the highlighted option should remain the same.

      await waitFor(() => assertActivedescendant('multi-select-option-44'));

      await user.keyboard('[Enter]');

      expect(testKit.getIsMenuOpen()).toBe(true);
      expect(testKit.getValue()).toBe('new_york');
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });

    it('focus a disabled option when traversing the options using the arrow keys', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const { user, focusByKeyboard, openByKeyboard } = setup({ onFocus, onBlur });

      await focusByKeyboard();
      await openByKeyboard('Enter');

      await waitFor(() => assertActivedescendant('multi-select-option-0'));

      await user.keyboard('[KeyS]');

      await waitFor(() => assertActivedescendant('multi-select-option-61'));

      await user.keyboard('{ArrowDown}{ArrowDown}');

      await waitFor(() => assertActivedescendant('multi-select-option-63'));

      await user.keyboard('[Enter]');

      expect(testKit.getIsMenuOpen()).toBe(true);
      expect(testKit.getValue()).toBe('san_bernardino');

      await user.keyboard('[ArrowUp][ArrowUp]');

      await waitFor(() => assertActivedescendant('multi-select-option-61'));

      await user.keyboard('[Enter]');

      expect(testKit.getIsMenuOpen()).toBe(true);
      expect(testKit.getValue()).toBe('san_bernardino, sacramento');
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });
  });

  describe('has a footer', () => {
    it('navigates to the interactive element inside the footer by keyboard', async () => {
      const onClick = vi.fn();
      const { focusByKeyboard, openByKeyboard, user } = setup({
        footer: (
          <MultiSelectFooter>
            <Button label="Add new city" onClick={onClick} />
          </MultiSelectFooter>
        ),
      });

      await focusByKeyboard();

      expect(testKit.getIsMenuOpen()).toBe(false);

      await openByKeyboard('ArrowDown');

      await waitFor(() => {
        assertActivedescendant('multi-select-option-0');
        expect(testKit.getIsMenuOpen()).toBe(true);
      });

      await user.keyboard('{ArrowDown}');

      await waitFor(() => {
        assertActivedescendant('multi-select-option-1'); // Navigating to another option by keyboard as usual.
        expect(screen.getByRole('option', { name: 'Arlington' })).toHaveFocus();
      });

      await user.tab(); // Navigating to the footer button.

      const footerButton = screen.getByRole('button', { name: 'Add new city' });

      expect(footerButton).toHaveFocus();

      await user.keyboard('[Space]');

      expect(onClick).toHaveBeenCalledTimes(1);

      await user.tab({ shift: true }); // Navigating back to the options list.

      await waitFor(() => expect(screen.getByRole('option', { name: 'Arlington' })).toHaveFocus());

      await user.tab(); // Navigating to the footer button again.

      expect(footerButton).toHaveFocus();

      await user.keyboard('{ArrowDown}');
      // Focus moves back to the options list and to the next option.
      await user.keyboard('{Enter}');

      await waitFor(() => {
        assertActivedescendant('multi-select-option-2');
        expect(testKit.getIsMenuOpen()).toBe(true);
        expect(screen.getByRole('option', { name: 'Atlanta' })).toHaveFocus();
      });

      await user.tab(); // Navigating to the footer button again.
      await user.tab(); // Another tab should close the menu.

      await waitFor(() => {
        expect(testKit.getIsMenuOpen()).toBe(false);
        expect(testKit.getValue()).toBe('atlanta');
        expect(getTriggerInput()).toHaveFocus();
      });
    });

    it('has the correct `aria` attributes for a dialog', async () => {
      setup({
        menuAriaLabel: 'Cities',
        footer: (
          <MultiSelectFooter>
            <Button label="Add new city" />
          </MultiSelectFooter>
        ),
      });

      expect(getTriggerInput()).toHaveAttribute('aria-haspopup', 'dialog');

      await testKit.click();

      const menuContainer = screen.getByTestId('multi-select-menu');

      expect(menuContainer).toHaveAttribute('role', 'dialog');
      expect(menuContainer).not.toHaveAttribute('role', 'listbox');
      expect(menuContainer).not.toHaveAttribute('aria-multiselectable');
      expect(menuContainer).not.toHaveAttribute('aria-label');
      expect(menuContainer).not.toHaveAttribute('aria-orientation');

      const menuList = screen.getByTestId('multi-select-content');

      expect(menuList).toHaveAttribute('role', 'listbox');
      expect(menuList).toHaveAttribute('aria-multiselectable', 'true');
      expect(menuList).toHaveAttribute('aria-label', 'Cities');
    });
  });

  describe('value and value changes', () => {
    it('displays a default value', () => {
      setup({ onChange: vi.fn(), value: ['new_york', 'chicago'] });

      expect(testKit.getValue()).toBe('new_york, chicago');
    });

    it('renders a `data-value` attribute when a value is selected', async () => {
      setup();

      expect(testKit.getValue()).toBe('');

      await testKit.click();
      await testKit.clickOptionByText('New York');
      await testKit.clickOptionByText('Chicago');

      expect(testKit.getValue()).toBe('new_york, chicago');
    });

    it('should render correct trigger content if value changes', () => {
      const { rerender } = setup({ onChange: vi.fn(), value: ['new_york', 'chicago'] });

      expect(testKit.getValue()).toBe('new_york, chicago');

      rerender(<MultiSelect {...defaultProps} onChange={vi.fn()} value={undefined} />);

      expect(testKit.getValue()).toBe('');

      rerender(<MultiSelect {...defaultProps} onChange={vi.fn()} value={['houston', 'tulsa']} />);

      expect(testKit.getValue()).toBe('houston, tulsa');
    });

    it('should fire `onChange` with correct parameters when value changes', async () => {
      const onChange = vi.fn();
      setup({ onChange, value: ['new_york'] });

      await testKit.click();
      await testKit.clickOptionByText('Chicago');

      expect(testKit.getValue()).toBe('new_york, chicago');
      expect(onChange).toHaveBeenLastCalledWith({ target: { value: ['new_york', 'chicago'] } });
      expect(onChange).toHaveBeenCalledTimes(1);

      await testKit.clickOptionByText('New York'); // Selecting an already selected option should deselect it.

      expect(testKit.getValue()).toBe('chicago');
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenLastCalledWith({ target: { value: ['chicago'] } });

      await testKit.clickOptionByText('Chicago'); // Selecting an already selected option should deselect it.

      expect(testKit.getPlaceholder()).toBe('Select');
      expect(onChange).toHaveBeenLastCalledWith({ target: { value: [] } });
      expect(onChange).toHaveBeenCalledTimes(3);
    });
  });

  describe('component attributes', () => {
    it("overrides the field's `autocomplete` attribute", () => {
      setup({ autoComplete: 'city' });

      expect(getTriggerInput()).toHaveAttribute('autocomplete', 'city');
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
      expect(getTriggerInput()).not.toHaveAttribute('role');
    });

    it('has the correct `aria` attributes for a listbox', async () => {
      setup({ menuAriaLabel: 'Cities' });

      expect(getTriggerInput()).toHaveAttribute('aria-haspopup', 'listbox');

      await testKit.click();

      const menuContainer = screen.getByTestId('multi-select-menu');

      expect(menuContainer).toHaveAttribute('role', 'listbox');
      expect(menuContainer).toHaveAttribute('aria-multiselectable', 'true');
      expect(menuContainer).toHaveAttribute('aria-label', 'Cities');
      expect(menuContainer).not.toHaveAttribute('aria-orientation');

      const menuList = screen.getByTestId('multi-select-content');

      expect(menuList).not.toHaveAttribute('role', 'listbox');
      expect(menuList).not.toHaveAttribute('aria-multiselectable');
      expect(menuList).not.toHaveAttribute('aria-label');
    });
  });

  describe('Accessibility', () => {
    it('should have an a11y message element inside the trigger container', () => {
      setup();

      expect(screen.getByTestId('multi-select')).toContainElement(
        document.querySelector('[id$="a11y-status-message"]')
      );
    });
  });
});
