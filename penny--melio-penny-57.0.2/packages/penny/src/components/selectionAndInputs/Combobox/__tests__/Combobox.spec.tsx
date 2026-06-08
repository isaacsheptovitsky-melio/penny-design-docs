/* eslint-disable max-lines */
import { Box } from '@chakra-ui/react';
import { createComboboxTestKit } from '@melio/penny-testkit-rtl';
import { act, screen, waitFor, within } from '@testing-library/react';
import { useEffect, useState } from 'react';
import { expect } from 'vitest';

import { Button } from '@/components/action/Button';
import { testAutoFocus } from '@/components/form/test/utils/form.test.utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';
import { resizeScreenByBreakpointKey } from '@/test-utils/resize-screen';

import { Combobox, ComboboxFooter } from '..';
import type { City, Region } from '../__fixtures__/mock-data';
import { cities, citiesByRegion, presetCities } from '../__fixtures__/mock-data';
import type { ComboboxProps } from '../Combobox.types';
import {
  assertActivedescendant,
  assertHasNoClearButton,
  getMenu,
  getMobileEditModeDialog,
  getTriggerInput,
  getTriggerValue,
  setup,
} from './Combobox.driver';

describe('Combobox', () => {
  const defaultProps = { options: [] };
  const defaultValueProps = { presetOptions: presetCities, value: 'toronto' };

  validateComponent<ComboboxProps<string, City>>(Combobox, 'Combobox', {
    props: defaultProps,
    defaultDataTestId: 'combobox',
    componentParts: ['trigger'],
  });

  testAutoFocus(Combobox, defaultProps, 'combobox-trigger-input');

  let testKit: ReturnType<typeof createComboboxTestKit>;
  beforeEach(() => {
    testKit = createComboboxTestKit();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('opens the menu', () => {
    it('opens the menu by setting `isMenuOpen` to true', () => {
      renderComponent(<Combobox {...defaultProps} isMenuOpen />);

      expect(testKit.getIsMenuOpen()).toBe(true);
    });

    it('opens the menu by pressing arrow-down key', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const { focusByKeyboard, openByKeyboard } = setup({ presetOptions: presetCities, onFocus, onBlur });

      await focusByKeyboard();

      expect(testKit.getIsMenuOpen()).toBe(false);

      await openByKeyboard('ArrowDown');

      assertActivedescendant('combobox-option-0');
      expect(testKit.getIsMenuOpen()).toBe(true);
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });

    it('opens the menu by pressing arrow-up key', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const { focusByKeyboard, openByKeyboard } = setup({ presetOptions: presetCities, onFocus, onBlur });

      await focusByKeyboard();

      expect(testKit.getIsMenuOpen()).toBe(false);

      await openByKeyboard('ArrowUp');

      assertActivedescendant('combobox-option-5');
      expect(testKit.getIsMenuOpen()).toBe(true);
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });
  });

  describe('closes the menu', () => {
    it('closes the menu by clicking outside', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const { typeInTriggerInput, clickOutside, selectOption } = setup({ onFocus, onBlur });

      await typeInTriggerInput('new');

      expect(testKit.getIsMenuOpen()).toBe(true);

      await clickOutside();

      expect(testKit.getIsMenuOpen()).toBe(false);
      // Making sure that nothing was selected.
      expect(testKit.getPlaceholder()).toBe('Search');
      await waitFor(() => {
        expect(onFocus).toHaveBeenCalledTimes(1);
        expect(onBlur).toHaveBeenCalledTimes(1);
      });

      await typeInTriggerInput('new');
      await selectOption('New York');

      expect(testKit.getIsMenuOpen()).toBe(false);
      expect(testKit.getValue()).toBe('New York');
      expect(onFocus).toHaveBeenCalledTimes(2);
      expect(onBlur).toHaveBeenCalledTimes(1);

      await typeInTriggerInput('new');

      expect(testKit.getIsMenuOpen()).toBe(true);

      await clickOutside();

      expect(testKit.getIsMenuOpen()).toBe(false);
      // Making sure the last selected option is displayed.
      expect(testKit.getValue()).toBe('New York');
      expect(onFocus).toHaveBeenCalledTimes(2);
      expect(onBlur).toHaveBeenCalledTimes(2);
    });

    it('closes the menu by pressing Escape', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const { typeInTriggerInput, closeByKeyboard, selectOption } = setup({ onFocus, onBlur });

      await typeInTriggerInput('new');

      expect(testKit.getIsMenuOpen()).toBe(true);

      await closeByKeyboard();

      expect(testKit.getIsMenuOpen()).toBe(false);
      // Making sure that nothing was selected.
      expect(testKit.getPlaceholder()).toBe('Search');
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);

      await typeInTriggerInput('new');
      await selectOption('New York');

      expect(testKit.getIsMenuOpen()).toBe(false);
      expect(testKit.getValue()).toBe('New York');
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);

      await typeInTriggerInput('new');

      expect(testKit.getIsMenuOpen()).toBe(true);

      await closeByKeyboard();

      expect(testKit.getIsMenuOpen()).toBe(false);
      // Making sure the last selected option is displayed.
      expect(testKit.getValue()).toBe('New York');
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });

    it('closes the menu by pressing Tab', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const { typeInTriggerInput, selectOption, user } = setup({ onFocus, onBlur });

      await typeInTriggerInput('new');

      expect(testKit.getIsMenuOpen()).toBe(true);

      await user.tab();

      expect(testKit.getIsMenuOpen()).toBe(false);
      // Making sure that nothing was selected.
      expect(testKit.getPlaceholder()).toBe('Search');
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);

      await typeInTriggerInput('new');
      await selectOption('New York');

      expect(testKit.getIsMenuOpen()).toBe(false);
      expect(testKit.getValue()).toBe('New York');
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);

      await typeInTriggerInput('new');

      expect(testKit.getIsMenuOpen()).toBe(true);

      await user.tab();

      expect(testKit.getIsMenuOpen()).toBe(false);
      // Making sure the last selected option is displayed.
      expect(testKit.getValue()).toBe('New York');
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
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

      expect(screen.queryByTestId('combobox-menu')).not.toBeInTheDocument();
      expect(onFocus).toHaveBeenCalledTimes(0);
    });

    it('does not open the menu by keyboard navigation when in view-mode', async () => {
      const onFocus = vi.fn();
      const { focusByKeyboard, openByKeyboard } = setup({ onFocus, isViewMode: true });

      await focusByKeyboard();
      await openByKeyboard('ArrowDown');

      expect(screen.queryByTestId('combobox-menu')).not.toBeInTheDocument();
      expect(onFocus).toHaveBeenCalledTimes(0);
    });
  });

  describe('menu states', () => {
    it('sets the menu to loading state by setting `isLoadingOptions` to true', () => {
      renderComponent(<Combobox {...defaultProps} isMenuOpen isLoadingOptions />);

      expect(getMenu()).toHaveTextContent('Loading...');
    });

    it('renders empty state when there are no options', () => {
      renderComponent(<Combobox {...defaultProps} isMenuOpen />);

      expect(getMenu()).toHaveTextContent('No options');
    });

    it('renders custom empty state when there are no options', () => {
      renderComponent(<Combobox {...defaultProps} isMenuOpen emptyState="No cities" />);

      expect(getMenu()).toHaveTextContent('No cities');
    });

    it('highlights the first option by default', async () => {
      const { typeInTriggerInput } = setup();

      await typeInTriggerInput('new');

      expect(testKit.getIsMenuOpen()).toBe(true);

      screen.getAllByRole('option').forEach((option, index) => {
        if (index === 0) {
          expect(option).toHaveAttribute('data-highlighted', 'true');
        } else {
          expect(option).not.toHaveAttribute('data-highlighted');
        }
      });
    });
  });

  describe('selects an option', () => {
    it('selects an option by click', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const { typeInTriggerInput, selectOption } = setup({ onFocus, onBlur });

      await typeInTriggerInput('new');

      expect(testKit.getIsMenuOpen()).toBe(true);

      await selectOption('New York');

      expect(testKit.getIsMenuOpen()).toBe(false);
      expect(testKit.getValue()).toBe('New York');
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });

    it('selects an option by click using custom test-id', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const { typeInTriggerInput, user } = setup({
        defaultOptions: cities.map((option) => ({ ...option, testId: option.label })),
        onFocus,
        onBlur,
      });

      await typeInTriggerInput('new');

      expect(testKit.getIsMenuOpen()).toBe(true);

      await user.click(screen.getByTestId('combobox-option-Newark'));

      expect(testKit.getIsMenuOpen()).toBe(false);
      expect(testKit.getValue()).toBe('Newark');
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });

    it('should not select a disabled option', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const { typeInTriggerInput, user, selectOption } = setup({ onFocus, onBlur });

      await typeInTriggerInput('san a');

      expect(testKit.getIsMenuOpen()).toBe(true);
      expect(screen.getByText('San Antonio')).toHaveAttribute('aria-disabled', 'true');
      assertActivedescendant('combobox-option-0');

      await selectOption('San Antonio');

      expect(testKit.getIsMenuOpen()).toBe(true);

      await user.keyboard('[Enter]');

      expect(testKit.getIsMenuOpen()).toBe(true);
      expect(testKit.getPlaceholder()).toBe('Search');
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });
  });

  describe('selects an option by keyboard navigation', () => {
    it('traverses the options in forward order', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const { typeInTriggerInput, user } = setup({ onFocus, onBlur });

      await typeInTriggerInput('new');

      assertActivedescendant('combobox-option-0');

      await user.keyboard('[ArrowDown]');

      assertActivedescendant('combobox-option-1');

      await user.keyboard('[ArrowDown]');

      assertActivedescendant('combobox-option-2');

      await user.keyboard('[Enter]');

      expect(testKit.getIsMenuOpen()).toBe(false);
      expect(testKit.getValue()).toBe('Newark');
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });

    it('traverses the options in reverse order', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const { typeInTriggerInput, user } = setup({ onFocus, onBlur });

      await typeInTriggerInput('new');

      assertActivedescendant('combobox-option-0');

      await user.keyboard('[ArrowUp]');

      assertActivedescendant('combobox-option-2');

      await user.keyboard('[ArrowUp]');

      assertActivedescendant('combobox-option-1');

      await user.keyboard('[ArrowUp]');

      assertActivedescendant('combobox-option-0');

      await user.keyboard('[Enter]');

      expect(testKit.getIsMenuOpen()).toBe(false);
      expect(testKit.getValue()).toBe('New Orleans');
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });

    it('focus a disabled option when traversing the options using the arrow keys', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const { typeInTriggerInput, user } = setup({ onFocus, onBlur });

      await typeInTriggerInput('san');
      assertActivedescendant('combobox-option-0');

      await user.keyboard('[ArrowDown]');
      assertActivedescendant('combobox-option-1');

      await user.keyboard('[Enter]');

      expect(testKit.getIsMenuOpen()).toBe(false);
      expect(testKit.getValue()).toBe('San Bernardino');
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });
  });

  describe('With sections', () => {
    it('has a menu with with grouped options', async () => {
      const { user } = setup({ presetOptions: citiesByRegion });

      await user.tab();
      await user.keyboard('[ArrowDown]');

      const sections = within(screen.getByTestId('combobox-content')).getAllByRole('group');
      expect(sections.length).toEqual(citiesByRegion.length);

      sections.forEach((section, i) => {
        const options = within(section).getAllByRole('option');

        expect(section).toHaveAccessibleName(citiesByRegion[i]?.label);
        expect(options.length).toEqual(citiesByRegion[i]?.options.length);
      });
    });

    it('traverses the options in forward order', async () => {
      const { typeInTriggerInput, user } = setup({ defaultOptions: citiesByRegion });

      await typeInTriggerInput('an');

      const firstSection = screen.getByTestId('combobox-section-0');
      const firstOptionInFirstSection = within(firstSection).getByTestId('combobox-option-0');
      assertActivedescendant(firstOptionInFirstSection.id);

      // Navigate to the 3rd section.
      await user.keyboard('[ArrowDown][ArrowDown][ArrowDown]');

      const secondSection = screen.getByTestId('combobox-section-2');
      const firstOptionInSecondSection = within(secondSection).getByTestId('combobox-option-3');
      assertActivedescendant(firstOptionInSecondSection.id);
    });

    it('traverses the options in reverse order', async () => {
      const { typeInTriggerInput, user } = setup({ defaultOptions: citiesByRegion });

      await typeInTriggerInput('an');

      const firstSection = screen.getByTestId('combobox-section-0');
      const firstOptionInFirstSection = within(firstSection).getByTestId('combobox-option-0');
      assertActivedescendant(firstOptionInFirstSection.id);

      // Navigate to the 2nd section.
      await user.keyboard('[ArrowUp][ArrowUp][ArrowUp][ArrowUp]');

      const secondSection = screen.getByTestId('combobox-section-2');
      const firstOptionInSecondSection = within(secondSection).getByTestId('combobox-option-3');
      assertActivedescendant(firstOptionInSecondSection.id);
    });
  });

  describe('clear button', () => {
    it('clears the combobox value and input', async () => {
      const onClear = vi.fn();
      const { typeInTriggerInput, selectOption, clearSelect } = setup({ onClear });

      await typeInTriggerInput('new');
      await selectOption('New York');

      expect(testKit.getValue()).toBe('New York');

      await clearSelect();

      expect(testKit.getPlaceholder()).toBe('Search');
      expect(onClear).toHaveBeenCalledTimes(1);
      // Focus should be on the trigger after clearing the combobox.
      expect(getTriggerInput()).toHaveFocus();
      expect(getTriggerInput()).toHaveValue('');
    });

    it('does not display the clear button when it has no value', () => {
      setup();

      assertHasNoClearButton();
    });

    it('does not display the clear button when it has both a value and an input value', async () => {
      const { typeInTriggerInput } = setup(defaultValueProps);

      await typeInTriggerInput('t');

      assertHasNoClearButton();
    });

    it('does not display the clear button when read-only', () => {
      setup({ ...defaultValueProps, isReadOnly: true });

      expect(testKit.getValue()).toBe('Toronto');
      assertHasNoClearButton();
    });

    it('does not display the clear button when loading', () => {
      setup({ ...defaultValueProps, isLoading: true });

      expect(testKit.getValue()).toBe('Toronto');
      assertHasNoClearButton();
    });

    it('does not display the clear button when disabled', () => {
      setup({ ...defaultValueProps, isDisabled: true });

      expect(testKit.getValue()).toBe('Toronto');
      assertHasNoClearButton();
    });

    it('does not display the clear button when in view-mode', () => {
      const { getByText } = setup({ ...defaultValueProps, isViewMode: true });

      expect(getByText('Toronto')).toBeInTheDocument();
      assertHasNoClearButton();
    });
  });

  describe('has a header', () => {
    it('renders the header content', async () => {
      const { typeInTriggerInput } = setup({
        header: <Box data-testid="combobox-header">Custom Header</Box>,
      });

      await typeInTriggerInput('new');
      expect(testKit.getIsMenuOpen()).toBe(true);

      expect(screen.getByTestId('combobox-header')).toBeInTheDocument();
      expect(screen.getByTestId('combobox-header')).toHaveTextContent('Custom Header');
    });
  });

  describe('has a footer', () => {
    it('navigates to the interactive element inside the footer by keyboard', async () => {
      const onClick = vi.fn();
      const { focusByKeyboard, openByKeyboard, user } = setup({
        presetOptions: presetCities,
        footer: (
          <ComboboxFooter>
            <Button label="Add new city" onClick={onClick} />
          </ComboboxFooter>
        ),
      });

      await focusByKeyboard();

      expect(testKit.getIsMenuOpen()).toBe(false);

      await openByKeyboard('ArrowDown');

      assertActivedescendant('combobox-option-0');
      expect(testKit.getIsMenuOpen()).toBe(true);

      await user.keyboard('[ArrowDown]');
      // Navigating to another option by keyboard as usual, focus remains on the input.
      assertActivedescendant('combobox-option-1');
      expect(getTriggerInput()).toHaveFocus();

      // Navigating to the footer button.
      await user.tab();

      const footerButton = screen.getByRole('button', { name: 'Add new city' });

      expect(footerButton).toHaveFocus();

      await user.keyboard('[Space]');

      expect(onClick).toHaveBeenCalledTimes(1);

      // Navigating back to the input skipping the options list.
      await act(async () => user.tab({ shift: true }));

      expect(getTriggerInput()).toHaveFocus();
    });

    it('has the correct `aria` attributes for a dialog', async () => {
      const { focusByKeyboard, openByKeyboard } = setup({
        presetOptions: presetCities,
        menuAriaLabel: 'Cities',
        footer: (
          <ComboboxFooter>
            <Button label="Add new city" />
          </ComboboxFooter>
        ),
      });

      expect(getTriggerInput()).toHaveAttribute('aria-haspopup', 'dialog');

      await focusByKeyboard();

      expect(testKit.getIsMenuOpen()).toBe(false);

      await openByKeyboard('ArrowDown');

      assertActivedescendant('combobox-option-0');
      expect(testKit.getIsMenuOpen()).toBe(true);

      const menuContainer = screen.getByTestId('combobox-menu');

      expect(menuContainer).toHaveAttribute('role', 'dialog');
      expect(menuContainer).not.toHaveAttribute('role', 'listbox');
      expect(menuContainer).not.toHaveAttribute('aria-label');
      expect(menuContainer).not.toHaveAttribute('aria-orientation');

      const menuList = screen.getByTestId('combobox-content');

      expect(menuList).toHaveAttribute('role', 'listbox');
      expect(menuList).toHaveAttribute('aria-label', 'Cities');
    });
  });

  describe('value and value changes', () => {
    it('displays a default value', () => {
      setup(defaultValueProps);

      expect(testKit.getValue()).toBe('Toronto');
    });

    it('renders a `data-value` attribute when a value is selected', async () => {
      const { typeInTriggerInput, selectOption } = setup();

      expect(testKit.getPlaceholder()).toBe('Search');
      expect(getTriggerValue()).not.toHaveAttribute('data-value');

      await typeInTriggerInput('new');
      await selectOption('New York');

      expect(testKit.getValue()).toBe('New York');
      expect(getTriggerValue()).toHaveAttribute('data-value', 'new_york');
    });

    it('should render the correct trigger content when value changes', () => {
      const props = { options: cities, onChange: vi.fn(), value: 'new_york' };
      const { rerender } = renderComponent(<Combobox {...props} />);

      expect(testKit.getValue()).toBe('New York');

      rerender(<Combobox {...props} value="" />);

      expect(testKit.getPlaceholder()).toBe('Search');

      rerender(<Combobox {...props} value="houston" />);

      expect(testKit.getValue()).toBe('Houston');
    });

    it('should fire `onChange` with correct parameters when value changes', async () => {
      const { typeInTriggerInput, selectOption, onChange, clearSelect } = setup();

      await typeInTriggerInput('new');
      await selectOption('New York');

      expect(onChange).toHaveBeenLastCalledWith({ target: { value: 'new_york' } });
      expect(onChange).toHaveBeenCalledTimes(1);

      await typeInTriggerInput('new');
      // Selecting the same option should not fire `onChange`.
      await selectOption('New York');

      expect(onChange).toHaveBeenCalledTimes(1);

      await clearSelect();

      expect(onChange).toHaveBeenLastCalledWith({ target: { value: null } });
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('updates correctly when using a default value and setting the options afterwards', () => {
      const ComboboxWithDeafultValue = () => {
        const [options, setOptions] = useState<City[]>([]);
        const [isFetching, setIsFetching] = useState(true);

        useEffect(() => {
          // TODO:https://meliorisk.atlassian.net/browse/ME-110373
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setOptions(cities);
          setIsFetching(false);
        }, []);

        return <Combobox options={options} onChange={vi.fn()} value="new_york" isLoadingOptions={isFetching} />;
      };

      renderComponent(<ComboboxWithDeafultValue />);

      expect(testKit.getValue()).toBe('New York');
    });
  });

  describe('component attributes', () => {
    it('overrides the `autocomplete` attribute', () => {
      setup({ autoComplete: 'city' });

      expect(getTriggerInput()).toHaveAttribute('autocomplete', 'city');
    });

    it('should have a `required` attribute', () => {
      setup({ isRequired: true });

      expect(getTriggerInput()).toHaveAttribute('required');
    });

    it('should support custom `aria-label`', () => {
      setup({ 'aria-label': 'Select a city' });

      expect(getTriggerInput()).toHaveAttribute('aria-label', 'Select a city');
    });

    it('should not have combobox related attributes when disabled', () => {
      setup({ isDisabled: true });

      expect(getTriggerInput()).not.toHaveAttribute('aria-autocomplete');
      expect(getTriggerInput()).not.toHaveAttribute('aria-haspopup');
      expect(getTriggerInput()).not.toHaveAttribute('aria-expanded');
      expect(getTriggerInput()).not.toHaveAttribute('role');
    });

    it('has the correct `aria` attributes for a listbox', async () => {
      const { focusByKeyboard, openByKeyboard } = setup({ presetOptions: presetCities, menuAriaLabel: 'Cities' });

      expect(getTriggerInput()).toHaveAttribute('aria-haspopup', 'listbox');

      await focusByKeyboard();

      expect(testKit.getIsMenuOpen()).toBe(false);

      await openByKeyboard('ArrowDown');

      assertActivedescendant('combobox-option-0');
      expect(testKit.getIsMenuOpen()).toBe(true);

      const menuContainer = screen.getByTestId('combobox-menu');

      expect(menuContainer).toHaveAttribute('role', 'listbox');
      expect(menuContainer).toHaveAttribute('aria-label', 'Cities');
      expect(menuContainer).not.toHaveAttribute('aria-orientation');

      const menuList = screen.getByTestId('combobox-content');

      expect(menuList).not.toHaveAttribute('role', 'listbox');
      expect(menuList).not.toHaveAttribute('aria-label');
    });

    it('should include the section index in the `data-testid` attribute', async () => {
      const { typeInTriggerInput } = setup({ defaultOptions: citiesByRegion });
      await typeInTriggerInput('new');

      expect(screen.getByTestId('combobox-section-0')).toBeInTheDocument();
    });

    it('should include the section test id in the `data-testid` attribute', async () => {
      const defaultOptions = [...citiesByRegion];
      const northeastSection = defaultOptions.find((section) => section.label === 'Northeast') as Region;
      northeastSection.testId = 'northeast';

      const { typeInTriggerInput } = setup({ defaultOptions });
      await typeInTriggerInput('boston');

      expect(screen.getByTestId('combobox-section-northeast')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have an a11y message element inside the trigger container', () => {
      setup();

      expect(screen.getByTestId('combobox')).toContainElement(document.querySelector('[id$="a11y-status-message"]'));
    });
  });

  describe('Mobile View', () => {
    beforeEach(() => {
      resizeScreenByBreakpointKey('xs');
    });

    const getMobileTriggerInput = () => {
      return screen.getByTestId(`combobox-trigger-input`);
    };

    const assertMobileViewIsOpen = () => {
      expect(testKit.getIsMenuOpen()).toBe(true);
      const mobileView = getMobileEditModeDialog();

      expect(mobileView).toBeInTheDocument();
      expect(mobileView).toHaveAttribute('role', 'dialog');
      expect(mobileView).toHaveAttribute('aria-modal', 'true');
    };

    const assertMobileViewIsClosed = () => {
      expect(testKit.getIsMenuOpen()).toBe(false);
      const mobileView = getMobileEditModeDialog();

      expect(mobileView).toBeNull();
    };

    it('should render a mobile trigger button', () => {
      setup();

      const mobileTrigger = getMobileTriggerInput();

      expect(mobileTrigger.tagName).toBe('BUTTON');
      expect(mobileTrigger).toHaveAttribute('aria-haspopup', 'dialog');
      expect(mobileTrigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('should render the header in mobile view', async () => {
      setup({
        header: <Box data-testid="combobox-header">Mobile Header</Box>,
      });

      await testKit.type('new', { advanceTimers: vi.advanceTimersByTime });

      assertMobileViewIsOpen();
      expect(screen.getByTestId('combobox-header')).toBeInTheDocument();
      expect(screen.getByTestId('combobox-header')).toHaveTextContent('Mobile Header');
    });

    it('should focus the combobox when fullscreen page opens', async () => {
      setup();

      await testKit.clickTrigger({ advanceTimers: vi.advanceTimersByTime });

      const getMobileEditModeTriggerInput = () =>
        screen.getByTestId('combobox-mobile-edit-mode-trigger-container-trigger-input');
      assertMobileViewIsOpen();
      expect(getMobileEditModeTriggerInput()).toHaveFocus();
    });

    it('should close the fullscreen page when clicking the close button', async () => {
      const closeButtonClickHandler = vi.fn();
      const { user } = setup({
        mobileViewProps: {
          closeButtonProps: {
            'data-testid': 'close-button',
            onClick: closeButtonClickHandler,
          },
        },
      });

      await testKit.clickTrigger({ advanceTimers: vi.advanceTimersByTime });
      await user.click(screen.getByTestId('close-button'));

      assertMobileViewIsClosed();
      expect(closeButtonClickHandler).toHaveBeenCalledTimes(1);
      expect(getMobileTriggerInput()).toHaveFocus();
    });

    it('should close the fullscreen page when selecting an option', async () => {
      const { typeInTriggerInput, selectOption } = setup();

      expect(testKit.getPlaceholder()).toBe('Search');

      await testKit.clickTrigger({ advanceTimers: vi.advanceTimersByTime });
      await typeInTriggerInput('new');
      await selectOption('New York');

      assertMobileViewIsClosed();
      expect(testKit.getValue()).toBe('New York');
      assertHasNoClearButton();
    });

    it('should close the fullscreen page when value is changed programmatically', async () => {
      const ComboboxWithUpdateButton = () => {
        const [value, setValue] = useState('new_york');

        return (
          <Combobox
            options={cities}
            onChange={vi.fn()}
            value={value}
            // We need a visible button to update the value so we use the menu footer.
            isMenuOpen
            footer={<Button label="Update Value" onClick={() => setValue('houston')} />}
          />
        );
      };

      const { user } = renderComponent(<ComboboxWithUpdateButton />, {
        userEventOptions: { advanceTimers: vi.advanceTimersByTime },
      });

      expect(testKit.getValue()).toBe('New York');
      assertHasNoClearButton();

      await testKit.clickTrigger({ advanceTimers: vi.advanceTimersByTime });
      await user.click(screen.getByRole('button', { name: 'Update Value' }));

      assertMobileViewIsClosed();
      expect(testKit.getValue()).toBe('Houston');
      assertHasNoClearButton();
    });

    it('should disable scrolling when the fullscreen page is open', async () => {
      setup();

      await testKit.clickTrigger({ advanceTimers: vi.advanceTimersByTime });

      assertMobileViewIsOpen();
      expect(document.body.style.overflow).toBe('hidden');
    });

    describe('Accessibility', () => {
      it('should have an a11y message element only inside the mobile view', async () => {
        setup();

        expect(screen.getByTestId('combobox')).not.toContainElement(
          document.querySelector('[id$="a11y-status-message"]')
        );

        await testKit.clickTrigger({ advanceTimers: vi.advanceTimersByTime });

        assertMobileViewIsOpen();
        const mobileView = getMobileEditModeDialog();
        expect(mobileView).toContainElement(document.querySelector('[id$="a11y-status-message"]'));
      });
    });
  });
});
