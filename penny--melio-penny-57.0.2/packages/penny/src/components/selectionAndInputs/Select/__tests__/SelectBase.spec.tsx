/* eslint-disable max-lines, @typescript-eslint/no-deprecated */
import { screen } from '@testing-library/react';
import { expect, vi } from 'vitest';

import { renderComponent } from '@/test-utils/render.utils';

import { cities } from '../__fixtures__/mock-data';
import { Select } from '../Select';
import { type SelectProps } from '../Select.types';

const emptyStateMessage = 'No options';

const emptyState = { label: emptyStateMessage };

const defaultProps = {
  options: cities,
  emptyState,
};

const setup = (props: Partial<SelectProps> = {}) => {
  const { user, ...rest } = renderComponent(<Select {...defaultProps} {...props} />);

  const clickOnTrigger = async () => {
    await user.click(screen.getByRole('combobox'));
  };

  const clickOnCaret = async () => {
    await user.click(screen.getByTestId('select-toggle-button'));
  };

  const clickOutside = async () => {
    await user.click(document.body);
  };

  const clearInput = async () => {
    await user.clear(screen.getByRole('combobox'));
  };

  const typeInSelect = async (type: string) => {
    await user.type(screen.getByRole('combobox'), type);
  };

  return {
    user,
    clickOnTrigger,
    clickOnCaret,
    clickOutside,
    clearInput,
    typeInSelect,
    ...rest,
  };
};

// These tests are copied from `BaseSelect` and should be tweaked to accomnodate the `Search` component
// We've split Select spec cause of error in ci:
//
// [@melio/penny   ] Error: [birpc] timeout on calling "onTaskUpdate"
// [@melio/penny   ]  ❯ Timeout._onTimeout ../../node_modules/vitest/dist/vendor/index.cAUulNDf.js:38:22
// [@melio/penny   ]  ❯ listOnTimeout node:internal/timers:573:17
// [@melio/penny   ]  ❯ processTimers node:internal/timers:514:7
// [@melio/penny   ]
// [@melio/penny   ] This error originated in "src/components/cl/components/Select/__tests__/Select.spec.tsx" test file. It doesn't mean the error was thrown inside the file itself, but while it was running.
//
// https://github.com/vitest-dev/vitest/issues/4497
describe('Select - BaseSelect', () => {
  describe('opening and closing the menu', () => {
    it('opens the menu when clicking the input', async () => {
      const { getByTestId, clickOnTrigger } = setup();

      await clickOnTrigger();
      expect(getByTestId('base-select-dropdown-menu')).toBeInTheDocument();
    });

    it('toggles the menu when clicking the caret', async () => {
      const { getByTestId, queryByTestId, clickOnCaret } = setup();

      await clickOnCaret();
      expect(getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      await clickOnCaret();
      expect(queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();
    });

    it('closes the menu when clicking outside', async () => {
      const { getByTestId, queryByTestId, clickOnTrigger, clickOutside } = setup();

      await clickOnTrigger();
      expect(getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      await clickOutside();
      expect(queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();
    });

    it('closes the menu when selecting an option', async () => {
      const { findByText, clickOnTrigger, user } = setup();

      await clickOnTrigger();
      expect(screen.getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      await user.click(await findByText('Haifa'));
      expect(screen.queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();
    });

    it('closes the menu when pressing escape', async () => {
      const { findByText, getByRole, clickOnTrigger, clickOnCaret, user } = setup();

      await clickOnTrigger();
      expect(screen.getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      await user.click(await findByText('Haifa'));

      expect(getByRole('combobox')).toHaveValue('Haifa');
      expect(screen.queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();

      await clickOnCaret();
      expect(screen.getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      await user.type(getByRole('combobox'), '{escape}');
      expect(screen.queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();

      expect(getByRole('combobox')).toHaveValue('Haifa'); // Make sure that last selected option is displayed
    });

    it('closes the menu when pressing tab', async () => {
      const { findByText, getByRole, clickOnTrigger, clickOnCaret, user } = setup();

      await clickOnTrigger();
      expect(screen.getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      await user.click(await findByText('Haifa'));

      expect(getByRole('combobox')).toHaveValue('Haifa');
      expect(screen.queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();

      await clickOnCaret();
      expect(screen.getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      await user.tab();
      expect(screen.queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();

      expect(getByRole('combobox')).toHaveValue('Haifa'); // Make sure that last selected option is displayed
    });

    it('opens menu with emptyState when there are no options', async () => {
      const { getByTestId, clickOnTrigger, clickOnCaret, clickOutside } = setup({
        options: [],
      });

      await clickOnTrigger();
      expect(screen.getByTestId('base-select-dropdown-menu')).toBeInTheDocument();
      expect(getByTestId('base-select-empty-state')).toHaveTextContent(emptyStateMessage);

      await clickOutside();

      expect(screen.queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();

      await clickOnCaret();
      expect(screen.getByTestId('base-select-dropdown-menu')).toBeInTheDocument();
      expect(getByTestId('base-select-empty-state')).toHaveTextContent(emptyStateMessage);
    });

    it('does not open the menu with toggle button click if the select is read-only', async () => {
      const { clickOnCaret } = setup({ isReadOnly: true });

      await clickOnCaret();
      expect(screen.queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();
    });

    it('does not open the menu with keyboard navigation if the select is read-only', async () => {
      const { user } = setup({ isReadOnly: true });

      await user.tab();
      await user.keyboard('{arrowdown}');
      expect(screen.queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();
    });

    it('opens menu when pressing arrow down / up key', async () => {
      const { getByRole, typeInSelect } = setup();

      getByRole('combobox').focus();
      expect(screen.queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();

      await typeInSelect('{arrowdown}');
      expect(screen.getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      await typeInSelect('{escape}');
      expect(screen.queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();

      await typeInSelect('{arrowup}');
      expect(screen.getByTestId('base-select-dropdown-menu')).toBeInTheDocument();
    });
  });

  describe('selecting an option', () => {
    it('displays selected option in the input value', async () => {
      const { getByRole, findByText, clickOnTrigger, user } = setup();

      await clickOnTrigger();
      expect(screen.getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      await user.click(await findByText('Haifa'));

      expect(getByRole('combobox')).toHaveValue('Haifa');
    });

    it('selects an option by keyboard navigation', async () => {
      const { getByRole, clickOnTrigger, user } = setup();

      await clickOnTrigger();
      expect(screen.getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      await user.keyboard('{arrowdown}');
      await user.keyboard('{enter}');
      expect(getByRole('combobox')).toHaveValue('Haifa');
    });

    it('highlights the first option by default', async () => {
      const { getByTestId, clickOnTrigger } = setup();

      await clickOnTrigger();
      expect(screen.getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      expect(getByTestId('base-select-option-0')).toHaveAttribute('data-focus', 'true');
    });

    it('resets selected option when deleting inputValue', async () => {
      const { getByRole, clickOnTrigger, typeInSelect, clearInput, clickOutside } = setup();

      await clickOnTrigger();
      expect(screen.getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      await typeInSelect('Eilat{enter}');

      expect(getByRole('combobox')).toHaveValue('Eilat');

      expect(screen.queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();

      await clearInput();
      await clickOutside();

      expect(getByRole('combobox')).toHaveValue('');
    });

    it('clears the input and calls onBlur when the selected option is cleared and the input is blurred', async () => {
      const handleBlur = vi.fn();
      const { findByText, getByRole, clickOnTrigger, user, clickOutside, clearInput } = setup({
        onBlur: handleBlur,
      });

      await clickOnTrigger();
      expect(screen.getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      await user.click(await findByText('Haifa'));

      expect(screen.queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();

      await clearInput();
      await clickOutside();

      expect(getByRole('combobox')).toHaveValue('');
      expect(handleBlur).toBeCalled();
    });

    it('displays last selected option when typing a non existing value', async () => {
      const { getByRole, findByText, clickOnTrigger, user, typeInSelect, clickOutside } = setup();

      await clickOnTrigger();
      expect(screen.getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      await user.click(await findByText('Haifa'));

      expect(getByRole('combobox')).toHaveValue('Haifa');
      expect(screen.queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();

      await typeInSelect('ramat gan');
      await clickOutside();

      expect(getByRole('combobox')).toHaveValue('Haifa');
    });

    it('displays last selected option when typing, then backspacing and clicking out', async () => {
      const { getByRole, findByText, clickOnTrigger, user, typeInSelect, clickOutside } = setup();

      await clickOnTrigger();
      expect(screen.getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      await user.click(await findByText('Yavne'));

      expect(screen.queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();

      await clickOnTrigger();
      await typeInSelect('{backspace}');
      await clickOutside();

      expect(getByRole('combobox')).toHaveValue('Yavne');
    });
  });

  it('clears the input and calls onBlur when there is no selected option and the input is blurred', async () => {
    const handleBlur = vi.fn();
    const { getByRole, clickOnTrigger, typeInSelect, clickOutside } = setup({
      onBlur: handleBlur,
    });

    await clickOnTrigger();
    expect(screen.getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

    await typeInSelect('hai');
    await clickOutside();

    expect(getByRole('combobox')).toHaveValue('');
    expect(handleBlur).toBeCalled();
  });

  describe('Default Value', () => {
    it('resets the selected option when value is falsy', async () => {
      const { getByRole, rerender, typeInSelect } = setup();

      await typeInSelect('Eilat{enter}');
      expect(getByRole('combobox')).toHaveValue('Eilat');
      expect(screen.queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();

      rerender(<Select {...defaultProps} value="" />);
      expect(getByRole('combobox')).toHaveValue('');
    });
  });

  describe('empty state', () => {
    it('renders empty state message when emptyState prop is passed', async () => {
      const { findByText, typeInSelect, clickOnTrigger } = setup({
        emptyState: { label: 'empty' },
      });

      await clickOnTrigger();
      expect(screen.getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      await typeInSelect('ramat gan');

      expect(await findByText('empty')).toBeInTheDocument();
    });

    it('calls onClick when empty state message is clicked', async () => {
      const mockCallBack = vi.fn();
      const { findByText, typeInSelect, clickOnTrigger, user } = setup({
        emptyState: { label: 'empty', onClick: mockCallBack },
      });

      await clickOnTrigger();
      expect(screen.getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      await typeInSelect('ramat gan');

      await user.click(await findByText('empty'));

      expect(mockCallBack).toBeCalled();

      expect(screen.queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();
    });
  });

  describe('creatable - with options', () => {
    it("shows a creatable option when inputValue doesn't exist in options", async () => {
      const value = 'ramat gan';
      const { findByText, clickOnTrigger, typeInSelect } = setup({
        creatableOption: { label: `Add ${value}` },
      });

      await clickOnTrigger();
      expect(screen.getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      await typeInSelect(value);

      expect(await findByText(`Add ${value}`)).toBeInTheDocument();
    });

    it("shows a creatable option when options include inputValue but don't match it", async () => {
      const value = 'ne';
      const { findByText, getAllByRole, clickOnTrigger, typeInSelect } = setup({
        creatableOption: { label: `Add ${value}` },
      });

      await clickOnTrigger();
      expect(screen.getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      await typeInSelect(value);

      expect(await findByText(`Add ${value}`)).toBeInTheDocument();
      expect(getAllByRole('option')).toHaveLength(2);
    });

    it("doesn't show the creatable option if the options are updated with that option", async () => {
      const searchTerm = 'Some option';
      const options = [{ label: searchTerm, value: 'value' }];
      const { findByText, getByTestId, rerender, queryByText, queryByTestId, clickOnTrigger, typeInSelect } = setup({
        creatableOption: { label: (inputValue) => `Add ${inputValue}` },
        emptyState: { label: 'No options' },
        options: [],
      });

      await clickOnTrigger();
      expect(screen.getByTestId('base-select-dropdown-menu')).toBeInTheDocument();
      await typeInSelect(searchTerm);

      expect(queryByTestId('base-select-option-0')).not.toBeInTheDocument();
      expect(await findByText(`Add ${searchTerm}`)).toBeVisible();

      rerender(
        <Select {...defaultProps} creatableOption={{ label: (inputValue) => `Add ${inputValue}` }} options={options} />
      );

      expect(getByTestId('base-select-option-0')).toHaveTextContent(searchTerm);
      expect(queryByText(`Add ${searchTerm}`)).not.toBeInTheDocument();
    });

    it('shows a creatable option when both `creatableOption` and `emptyState` are passed', async () => {
      const value = 'ramat gan';
      const { findByText, clickOnTrigger, typeInSelect } = setup({
        options: [],
        creatableOption: { label: `Add ${value}` },
      });

      await clickOnTrigger();
      expect(screen.getByTestId('base-select-dropdown-menu')).toBeInTheDocument();
      expect(await findByText(emptyStateMessage)).toBeInTheDocument();

      await typeInSelect(value);

      expect(await findByText(`Add ${value}`)).toBeInTheDocument();
    });

    it('shows a creatable option', async () => {
      const value = 'ramat gan';
      const { findByText, clickOnTrigger, typeInSelect, clearInput } = setup({
        options: [],
        creatableOption: { label: `Add ${value}` },
      });

      await clickOnTrigger();
      await typeInSelect(value);

      expect(await findByText(`Add ${value}`)).toBeInTheDocument();
      await clearInput();
      expect(screen.queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();
    });

    it('shows an emptyState message', async () => {
      const { findByText, clickOnTrigger } = setup({ options: [] });

      await clickOnTrigger();
      expect(screen.getByTestId('base-select-dropdown-menu')).toBeInTheDocument();
      expect(await findByText(emptyStateMessage)).toBeInTheDocument();
    });

    it('opens menu when pressing arrow down key with emptyState and creatableOption', async () => {
      const { findByText, getByRole, queryByTestId, getByTestId, user } = setup({
        options: [],
        creatableOption: { label: 'add' },
      });

      getByRole('combobox').focus();
      expect(queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();

      await user.keyboard('{arrowdown}');

      expect(getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      expect(screen.queryByTestId('base-select-dropdown-menu')).toBeInTheDocument();
      expect(await findByText(emptyStateMessage)).toBeInTheDocument();

      await user.keyboard('{escape}');

      expect(screen.queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();

      expect(queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();

      await user.keyboard('{arrowdown}');

      expect(getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      expect(getByTestId('base-select-dropdown-menu')).toBeInTheDocument();
      expect(await findByText(emptyStateMessage)).toBeInTheDocument();
    });

    it('opens menu when pressing arrow down key with only emptyState', async () => {
      const { findByText, getByRole, user, getByTestId, queryByTestId } = setup({ options: [] });
      getByRole('combobox').focus();

      await user.keyboard('{arrowdown}');

      expect(getByTestId('base-select-dropdown-menu')).toBeInTheDocument();
      expect(await findByText(emptyStateMessage)).toBeInTheDocument();

      await user.keyboard('{escape}');
      expect(queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();

      await user.keyboard('{arrowdown}');
      expect(getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      expect(await findByText(emptyStateMessage)).toBeInTheDocument();
    });

    it("doesn't show a creatable option when inputValue and new option are the same", async () => {
      const value = 'yavne';
      const { queryByTestId, clickOnTrigger, typeInSelect } = setup({
        creatableOption: { label: `Add ${value}` },
      });

      await clickOnTrigger();
      expect(screen.getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      await typeInSelect(value);
      expect(queryByTestId(`Add ${value}`)).not.toBeInTheDocument();
    });

    it('calls the callback when the creatable option is clicked', async () => {
      const creatableOptionClick = vi.fn();
      const { user, getByRole, getByTestId, queryByTestId, clickOnTrigger, typeInSelect } = setup({
        creatableOption: { label: 'add', onClick: creatableOptionClick },
      });

      await clickOnTrigger();
      expect(getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      await typeInSelect('hadera');

      await user.click(getByTestId('base-select-creatable-option'));
      expect(queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();

      expect(creatableOptionClick).toBeCalledWith('hadera');

      expect(getByRole('combobox')).toHaveValue('hadera');
    });

    it('calls the callback when the creatable option is selected by pressing Enter key', async () => {
      const creatableOptionClick = vi.fn();
      const { getByTestId, queryByTestId, getByRole, clickOnTrigger, typeInSelect } = setup({
        creatableOption: { label: 'add', onClick: creatableOptionClick },
      });

      await clickOnTrigger();
      expect(getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      await typeInSelect('hadera{enter}');

      expect(creatableOptionClick).toBeCalledWith('hadera');

      expect(queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();

      expect(getByRole('combobox')).toHaveValue('hadera');
    });
  });

  it('invokes the onChange handler with the correct selected option', async () => {
    const onChange = vi.fn();
    const { getByTestId, findByText, clickOnTrigger, user } = setup({ onChange });

    await clickOnTrigger();
    expect(getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

    await user.click(await findByText('Haifa'));

    expect(onChange).toHaveBeenCalledWith({ target: { value: 'Haifa' } });
  });

  describe('Custom creatable option condition', () => {
    it('shows a creatable option even if nothing is typed', async () => {
      const onClick = vi.fn();
      const label = 'Add new city';
      const { getByTestId, findByText, clickOnTrigger, user } = setup({
        creatableOption: { label, shouldDisplay: () => true, onClick },
      });

      await clickOnTrigger();
      expect(getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      await user.click(await findByText(label));

      expect(onClick).toHaveBeenCalled();
    });

    it('shows a creatable option when the custom condition is met', async () => {
      const value = 'My New City';
      const { findByText, clickOnTrigger, typeInSelect } = setup({
        creatableOption: { label: `Add ${value}`, shouldDisplay: (inputValue) => inputValue === 'My New City' },
      });

      await clickOnTrigger();
      expect(screen.getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      await typeInSelect(value);

      expect(await findByText(`Add ${value}`)).toBeInTheDocument();
    });

    it('does not show a creatable option when the custom condition is not met', async () => {
      const value = 'Oh no!';
      const { getByTestId, queryByText, clickOnTrigger, typeInSelect } = setup({
        creatableOption: { label: `Add ${value}`, shouldDisplay: (inputValue) => inputValue === 'My New City' },
      });

      await clickOnTrigger();
      expect(getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      await typeInSelect(value);

      expect(queryByText(`Add ${value}`)).not.toBeInTheDocument();
    });
  });

  describe('loading state', () => {
    it('sets the field as read only when isLoading is true', () => {
      const { getByRole } = setup({ isLoading: true });
      expect(getByRole('combobox')).toHaveAttribute('aria-readonly', 'true');
      expect(getByRole('combobox')).toHaveAttribute('readonly');
    });

    it('sets the input read only when isLoading is true and there are no options', () => {
      const { getByRole } = setup({ options: [], isLoading: true });

      expect(getByRole('combobox')).toHaveAttribute('aria-readonly', 'true');
      expect(getByRole('combobox')).toHaveAttribute('readonly');
    });
  });

  describe('Format Selected Value', () => {
    it('uses a custom formatter for the selected value', () => {
      const { getByRole } = setup({
        value: cities[0]?.value,
        formatSelectedValue: (option) => `You have selected - ${option.label}`,
      });

      expect(getByRole('combobox')).toHaveValue('You have selected - Tel Aviv');
    });
  });

  describe('Filtering the options', () => {
    it('resets the input value when clicking outside', async () => {
      const { getByTestId, queryByTestId, getAllByRole, typeInSelect, clickOutside, clickOnTrigger } = setup();

      await typeInSelect('h');

      expect(getByTestId('base-select-dropdown-menu')).toBeInTheDocument();
      expect(getAllByRole('option').map((option) => option.textContent)).toStrictEqual(['Haifa', 'Nahariyya']);

      await clickOutside();

      expect(queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();

      await clickOnTrigger();

      expect(getByTestId('base-select-dropdown-menu')).toBeInTheDocument();
      expect(getAllByRole('option').map((option) => option.textContent)).toStrictEqual(
        cities.map((city) => city.label)
      );

      await typeInSelect('h');

      expect(getByTestId('base-select-dropdown-menu')).toBeInTheDocument();
      expect(getAllByRole('option').map((option) => option.textContent)).toStrictEqual(['Haifa', 'Nahariyya']);
    });

    it('resets the input value when pressing Escape', async () => {
      const { getByTestId, queryByTestId, getAllByRole, typeInSelect, clickOnCaret } = setup();

      await typeInSelect('h');
      expect(getByTestId('base-select-dropdown-menu')).toBeInTheDocument();
      expect(getAllByRole('option').map((option) => option.textContent)).toStrictEqual(['Haifa', 'Nahariyya']);

      await typeInSelect('{escape}');
      expect(queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();

      await clickOnCaret();
      expect(getByTestId('base-select-dropdown-menu')).toBeInTheDocument();
      expect(getAllByRole('option').map((option) => option.textContent)).toStrictEqual(
        cities.map((city) => city.label)
      );

      await typeInSelect('h');
      expect(getByTestId('base-select-dropdown-menu')).toBeInTheDocument();
      expect(getAllByRole('option').map((option) => option.textContent)).toStrictEqual(['Haifa', 'Nahariyya']);
    });

    it('shows all options in the menu after selecting an option', async () => {
      const {
        getByTestId,
        queryByTestId,
        getAllByRole,
        getByRole,
        findByText,
        typeInSelect,
        user,
        clickOnTrigger,
        clickOutside,
        clearInput,
      } = setup();

      await clickOnTrigger();
      expect(getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      await user.click(await findByText('Haifa'));

      expect(queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();

      await typeInSelect('{backspace}{backspace}{backspace}{backspace}'); // input value is 'H'

      expect(getByTestId('base-select-dropdown-menu')).toBeInTheDocument();
      expect(getAllByRole('option').map((option) => option.textContent)).toStrictEqual(['Haifa', 'Nahariyya']);

      await clickOutside();

      expect(queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();
      expect(getByRole('combobox')).toHaveValue('Haifa');

      await clickOnTrigger();

      expect(getByTestId('base-select-dropdown-menu')).toBeInTheDocument();
      expect(getAllByRole('option').map((option) => option.textContent)).toStrictEqual(
        cities.map((city) => city.label)
      );

      await clearInput();
      await clickOutside();

      expect(queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();

      await clickOnTrigger();

      expect(getByTestId('base-select-dropdown-menu')).toBeInTheDocument();
      expect(getAllByRole('option').map((option) => option.textContent)).toStrictEqual(
        cities.map((city) => city.label)
      );
    });

    it('shows all options in the menu after pressing Escape', async () => {
      const {
        getByTestId,
        queryByTestId,
        getAllByRole,
        getByRole,
        findByText,
        typeInSelect,
        user,
        clickOnTrigger,
        clickOutside,
      } = setup();

      await clickOnTrigger();
      expect(getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      await user.click(await findByText('Haifa'));

      expect(queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();

      await typeInSelect('{backspace}{backspace}{backspace}{backspace}'); // input value is 'H'

      expect(getByTestId('base-select-dropdown-menu')).toBeInTheDocument();

      await typeInSelect('{escape}');

      expect(getByRole('combobox')).toHaveValue('Haifa');

      await clickOutside();

      expect(queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();

      await clickOnTrigger();

      expect(getByTestId('base-select-dropdown-menu')).toBeInTheDocument();
      expect(getAllByRole('option').map((option) => option.textContent)).toStrictEqual(
        cities.map((city) => city.label)
      );
    });
  });
});
