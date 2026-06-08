/* eslint-disable max-lines, @typescript-eslint/no-deprecated */
import { act, screen, within } from '@testing-library/react';
import { expect } from 'vitest';

import { testAutoFocus, testReadOnly } from '@/components/form/test/utils/form.test.utils';
import { Icon } from '@/components/foundations/Icon';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { cities, citiesWithSections } from '../__fixtures__/mock-data';
import { Select } from '../Select';
import type { SelectProps } from '../Select.types';

const defaultProps = {
  options: cities,
  emptyState: { label: 'No options' },
};

const propsWithSections = {
  ...defaultProps,
  options: citiesWithSections,
};

const setup = (props: Partial<SelectProps> = {}) => {
  const { user, ...rest } = renderComponent(<Select {...defaultProps} {...props} />);

  const assertMenuOpenState = ({ open }: { open: boolean }) =>
    open
      ? expect(screen.getByTestId('base-select-dropdown-menu')).toBeInTheDocument()
      : expect(screen.queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();

  const clickOnTrigger = async () => user.click(screen.getByRole('combobox'));

  const clickOutside = async () => act(async () => user.click(document.body));

  const clearInput = async () => user.clear(screen.getByRole('combobox'));

  const typeInSelect = async (type: string) => user.type(screen.getByRole('combobox'), type);

  return {
    user,
    assertMenuOpenState,
    clickOnTrigger,
    clickOutside,
    clearInput,
    typeInSelect,
    ...rest,
  };
};

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
describe('Select', () => {
  validateComponent<SelectProps>(Select, 'Select', {
    props: defaultProps,
    customDataComponentValidation: (getByTestId, testId) => {
      // The Select component renders through BaseSelect.Input which sets data-component="BaseSelect.Input"
      // The test ID is applied to the input element, not the container
      const element = getByTestId(testId);
      expect(element).toHaveAttribute('data-component', 'BaseSelect.Input');
    },
  });

  testAutoFocus(Select, defaultProps);

  testReadOnly({ Comp: Select, compProps: defaultProps });

  it('highlights the first option by default after filtering', async () => {
    const { getByTestId, clickOnTrigger, typeInSelect, assertMenuOpenState } = setup();

    await clickOnTrigger();
    assertMenuOpenState({ open: true });

    expect(getByTestId('base-select-option-0')).toHaveAttribute('data-focus', 'true');

    await typeInSelect('e');

    expect(getByTestId('base-select-option-0')).toHaveAttribute('data-focus', 'true');
  });

  it('keeps the menu open while typing', async () => {
    const { clickOnTrigger, typeInSelect, assertMenuOpenState } = setup();

    await clickOnTrigger();
    assertMenuOpenState({ open: true });

    await typeInSelect('holon');

    assertMenuOpenState({ open: true });
  });

  it('displays a default value', () => {
    const { getByRole } = setup({ value: cities[0]?.value });

    const defaultValue = cities[0]?.label;

    expect(getByRole('combobox')).toHaveValue(defaultValue);
  });

  it('resets the input query when the user tabs away from the input', async () => {
    const { getByRole, user, typeInSelect } = setup();

    await user.tab();
    await typeInSelect('tel');
    await user.tab();

    expect(getByRole('combobox')).toHaveValue('');

    await user.tab({ shift: true });
    await typeInSelect('tel');
    await user.keyboard('[DownArrow]');
    await user.keyboard('[Enter]');

    expect(getByRole('combobox')).toHaveValue('Tel Aviv');

    await typeInSelect('[Backspace]');

    expect(getByRole('combobox')).toHaveValue('Tel Avi');

    await user.tab();

    expect(getByRole('combobox')).toHaveValue('Tel Aviv');
  });

  it("renders the field's autocomplete attribute with a default value of 'off'", () => {
    const { getByRole } = setup({ value: cities[0]?.value });

    expect(getByRole('combobox')).toHaveAttribute('autocomplete', 'off');
  });

  it("overrides the field's autocomplete attribute", () => {
    const { getByRole } = setup({ value: cities[0]?.value, autoComplete: 'city' });

    expect(getByRole('combobox')).toHaveAttribute('autocomplete', 'city');
  });

  describe('With sections', () => {
    it('filters the options', async () => {
      const { getAllByRole, getAllByTestId, clickOnTrigger, typeInSelect, assertMenuOpenState } =
        setup(propsWithSections);

      await clickOnTrigger();
      assertMenuOpenState({ open: true });

      expect(getAllByTestId('section-label').map((section) => section.textContent)).toStrictEqual([
        'Center',
        'North',
        'South',
        'Outer space',
      ]);

      await typeInSelect('n');

      expect(getAllByTestId('section-label').map((section) => section.textContent)).toStrictEqual([
        'Center',
        'North',
        'South',
      ]);
      expect(getAllByRole('option').map((option) => option.textContent)).toStrictEqual([
        'Yavne',
        'Nahariyya',
        'Netivot',
      ]);

      await typeInSelect('e');

      expect(getAllByTestId('section-label').map((section) => section.textContent)).toStrictEqual(['Center', 'South']);
      expect(getAllByRole('option').map((option) => option.textContent)).toStrictEqual(['Yavne', 'Netivot']);
    });

    it('highlights the first option by default after filtering', async () => {
      const { getByTestId, clickOnTrigger, typeInSelect, assertMenuOpenState } = setup(propsWithSections);

      await clickOnTrigger();
      assertMenuOpenState({ open: true });

      expect(getByTestId('base-select-option-0')).toHaveAttribute('data-focus', 'true');

      await typeInSelect('n');

      expect(getByTestId('base-select-option-0')).toHaveAttribute('data-focus', 'true');
    });

    it('keeps the menu open while typing', async () => {
      const { clickOnTrigger, typeInSelect, assertMenuOpenState } = setup(propsWithSections);

      await clickOnTrigger();
      assertMenuOpenState({ open: true });

      await typeInSelect('ne');

      assertMenuOpenState({ open: true });
    });

    it('displays a default value', () => {
      const defaultValue = 'Tel Aviv';
      const { getByRole } = setup({ ...propsWithSections, value: defaultValue });

      expect(getByRole('combobox')).toHaveValue(defaultValue);
    });

    it('removes `data-active` from the option after hovering a section title', async () => {
      const { clickOnTrigger, getByTestId, getByText, user, assertMenuOpenState } = setup(propsWithSections);

      await clickOnTrigger();
      assertMenuOpenState({ open: true });

      await user.hover(getByTestId('base-select-option-0'));

      expect(getByTestId('base-select-option-0')).toHaveAttribute('data-active', 'true');

      await user.hover(getByText('Center'));

      expect(getByTestId('base-select-option-0')).not.toHaveAttribute('data-active', 'true');
    });
  });

  describe('creatableOption', () => {
    it('adds the new option to the correct section', async () => {
      const creatableOptionClick = vi.fn();
      const { getByTestId, getByRole, clickOnTrigger, typeInSelect, user, assertMenuOpenState } = setup({
        ...propsWithSections,
        creatableOption: { label: 'Add', onClick: creatableOptionClick },
      });

      await clickOnTrigger();
      assertMenuOpenState({ open: true });

      await typeInSelect('Holon');
      await user.click(getByTestId('base-select-creatable-option'));
      assertMenuOpenState({ open: false });
      expect(creatableOptionClick).toBeCalledWith('Holon');

      expect(getByRole('combobox')).toHaveValue('Holon');
    });
  });

  describe('Filtering the options', () => {
    it('filters the options', async () => {
      const { getAllByRole, clickOnTrigger, typeInSelect, assertMenuOpenState } = setup();

      await clickOnTrigger();
      assertMenuOpenState({ open: true });

      await typeInSelect('a');
      expect(getAllByRole('option').map((option) => option.textContent)).toStrictEqual([
        'Tel Aviv',
        'Haifa',
        'Eilat',
        'Nahariyya',
        'Kefar Sava',
        'Yavne',
        'Acre',
        'Tiberias',
        'Mars City',
      ]);

      await typeInSelect('r');
      expect(getAllByRole('option').map((option) => option.textContent)).toStrictEqual([
        'Nahariyya',
        'Kefar Sava',
        'Mars City',
      ]);
    });

    it('shows options when the input is clicked', async () => {
      const { getAllByRole, clickOnTrigger } = setup();
      await clickOnTrigger();
      expect(getAllByRole('option').map((option) => option.textContent)).toStrictEqual(
        cities.map((city) => city.label)
      );
    });

    it('shows all the options after entering a term and deleting it', async () => {
      const { getAllByRole, typeInSelect } = setup();
      await typeInSelect('o');
      await typeInSelect('{backspace}');
      expect(getAllByRole('option').map((option) => option.textContent)).toStrictEqual(
        cities.map((city) => city.label)
      );
    });
  });

  it('displays an element next to the selected value', () => {
    const { getByTestId } = setup({
      value: cities[0]?.label,
      valueRightElement: <Icon type="repeat" size="small" />,
    });

    const inputOverlay = getByTestId('base-select-input-overlay');
    const rightElementIcon = within(inputOverlay).getByTestId('icon');

    expect(rightElementIcon).toBeInTheDocument();
  });

  describe('Search Term Reset', () => {
    it('calls the onSearchTermReset event when typing in an empty select and blurring', async () => {
      const handleSearchTermReset = vi.fn();
      const { clickOutside, typeInSelect } = setup({ onSearchTermReset: handleSearchTermReset });

      await typeInSelect('hai');
      await clickOutside();

      expect(handleSearchTermReset).toHaveBeenCalled();
    });

    it('calls the onSearchTermReset event when typing in an empty select and pressing ESC', async () => {
      const handleSearchTermReset = vi.fn();
      const { typeInSelect } = setup({ onSearchTermReset: handleSearchTermReset });

      await typeInSelect('hai');
      await typeInSelect('{escape}');

      expect(handleSearchTermReset).toHaveBeenCalled();
    });

    it('calls the onSearchTermReset event when typing in a select with a selected option and blurring', async () => {
      const handleSearchTermReset = vi.fn();
      const { clickOutside, typeInSelect } = setup({
        value: cities[0]?.label,
        onSearchTermReset: handleSearchTermReset,
      });

      await typeInSelect('hai');
      await clickOutside();

      expect(handleSearchTermReset).toHaveBeenCalled();
    });
  });
});
