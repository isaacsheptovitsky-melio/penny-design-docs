/* eslint-disable max-lines, @typescript-eslint/no-deprecated */
import { act, renderHook, screen, waitFor, within } from '@testing-library/react';
import { expect } from 'vitest';

import { Drawer } from '@/components/containers/Drawer';
import { FormField } from '@/components/form/components/FormField';
import { useMelioForm } from '@/components/form/hooks/useMelioForm';
import { testAutoFocus } from '@/components/form/test/utils/form.test.utils';
import { Icon } from '@/components/foundations/Icon';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { cities, citiesWithSections } from '../__fixtures__/mock-data';
import { Search } from '../Search';
import { type SearchProps } from '../Search.types';

const defaultProps = {
  options: cities,
  emptyState: { label: 'No options' },
  formatSelectedValue: (option) => option.label,
} as SearchProps;

const propsWithSections = {
  ...defaultProps,
  options: citiesWithSections,
} as SearchProps;

const setup = (props: Partial<SearchProps> = {}) => {
  const { user, ...rest } = renderComponent(<Search {...defaultProps} {...props} />, {
    // https://github.com/testing-library/react-testing-library/issues/1197#issuecomment-1488104495
    userEventOptions: { advanceTimers: vi.advanceTimersByTime },
  });

  const assertMenuOpenState = ({ open }: { open: boolean }) =>
    open
      ? expect(screen.getByTestId('base-select-dropdown-menu')).toBeInTheDocument()
      : expect(screen.queryByTestId('base-select-dropdown-menu')).not.toBeInTheDocument();

  const clickOnTrigger = async () => user.click(screen.getByRole('combobox'));

  const clickOutside = async () => act(async () => user.click(document.body));

  const clearInput = async () => act(async () => user.clear(screen.getByRole('combobox')));

  const typeInSearch = async (type: string) => {
    await act(async () => user.type(screen.getByRole('combobox'), type));
    vi.advanceTimersByTime(500);
  };

  return {
    user,
    assertMenuOpenState,
    clickOnTrigger,
    clickOutside,
    clearInput,
    typeInSearch,
    ...rest,
  };
};

describe('Search', () => {
  validateComponent<SearchProps>(Search, 'Search', {
    props: defaultProps,
  });

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Menu', () => {
    it("doesn't open the menu when clicking on the input", async () => {
      const { clickOnTrigger, assertMenuOpenState } = setup();

      await clickOnTrigger();
      assertMenuOpenState({ open: false });
    });

    it("doesn't open the menu when input is focused with tab", async () => {
      const { user, assertMenuOpenState } = setup();

      await user.tab();
      assertMenuOpenState({ open: false });
    });

    it('shows the menu while loading', async () => {
      const { assertMenuOpenState, rerender, getByText, typeInSearch } = setup({ options: [] });

      await typeInSearch('holon');

      rerender(<Search {...defaultProps} options={[]} isLoading />);

      assertMenuOpenState({ open: true });
      expect(getByText('Loading...')).toBeInTheDocument();
    });

    it('does not close the menu on Enter press while loading', async () => {
      const { assertMenuOpenState, rerender, getByText, typeInSearch } = setup({ options: [] });

      await typeInSearch('holon');

      rerender(<Search {...defaultProps} options={[]} isLoading />);

      await typeInSearch('{enter}');

      assertMenuOpenState({ open: true });
      expect(getByText('Loading...')).toBeInTheDocument();
    });

    it('hides the creatable option while loading', async () => {
      const creatableOption = {
        label: (inputValue: string) => `Create ${inputValue}`,
      };
      const { queryByText, getByText, rerender, queryByTestId, getByTestId, assertMenuOpenState, typeInSearch } = setup(
        {
          creatableOption,
          options: [],
        }
      );

      await typeInSearch('holon');

      rerender(<Search {...defaultProps} options={[]} creatableOption={creatableOption} isLoading />);

      assertMenuOpenState({ open: true });
      expect(getByText('Loading...')).toBeVisible();
      expect(queryByTestId('base-select-creatable-option')).not.toBeInTheDocument();

      await typeInSearch('holon');

      rerender(<Search {...defaultProps} options={[]} creatableOption={creatableOption} isLoading={false} />);

      assertMenuOpenState({ open: true });

      expect(queryByText('Loading...')).not.toBeInTheDocument();
      expect(getByTestId('base-select-creatable-option')).toBeVisible();
    });

    it('highlights the first option by default after filtering', async () => {
      const { getByTestId, rerender, typeInSearch } = setup();

      await typeInSearch('a');

      rerender(<Search {...defaultProps} isLoading />);
      rerender(<Search {...defaultProps} isLoading={false} />);

      expect(getByTestId('base-select-option-0')).toHaveAttribute('data-focus', 'true');

      await typeInSearch('i');

      rerender(<Search {...defaultProps} isLoading />);
      rerender(<Search {...defaultProps} isLoading={false} />);
      expect(getByTestId('base-select-option-0')).toHaveAttribute('data-focus', 'true');
    });
  });

  it('debounces the onInputChange', async () => {
    const searchTerm = 'bla bla';
    const handleInputChange = vi.fn();

    const { typeInSearch } = setup({ options: [], onInputChange: handleInputChange });

    await typeInSearch(searchTerm);

    expect(handleInputChange).toHaveBeenCalledTimes(1);
    expect(handleInputChange).toHaveBeenCalledWith(searchTerm);

    expect(handleInputChange).toHaveBeenCalledTimes(1);
  });

  it('keeps showing the selected option when there are no options in the list', async () => {
    const optionLabel = 'bla bla';
    const handleInputChange = vi.fn();
    const { getByRole, rerender, typeInSearch } = setup({
      options: [{ label: optionLabel, value: optionLabel }],
      onInputChange: handleInputChange,
    });

    await typeInSearch(optionLabel);

    expect(handleInputChange).toHaveBeenCalledTimes(1);
    expect(handleInputChange).toHaveBeenCalledWith(optionLabel);

    await typeInSearch('{enter}');

    const optionLabel2 = 'Label';

    rerender(
      <Search
        {...defaultProps}
        options={[{ label: optionLabel2, value: optionLabel2 }]}
        onInputChange={handleInputChange}
      />
    );

    await typeInSearch('{backspace}something');

    expect(getByRole('combobox')).toHaveValue('bla blsomething');
  });

  it('displays a default value', () => {
    const { getByRole } = setup({ options: [], value: cities[0]?.value });

    expect(getByRole('combobox')).toHaveValue(cities[0]?.value as string);
  });

  it('removes `data-active` from the option after hovering a section title', async () => {
    const { getByTestId, getByText, clickOnTrigger, assertMenuOpenState, user } = setup({
      ...propsWithSections,
      shouldShowPresetOptions: true,
    });

    await clickOnTrigger();
    assertMenuOpenState({ open: true });

    await user.hover(getByTestId('base-select-option-0'));

    expect(getByTestId('base-select-option-0')).toHaveAttribute('data-active', 'true');

    await user.hover(getByText('Center'));

    expect(getByTestId('base-select-option-0')).not.toHaveAttribute('data-active', 'true');
  });

  it('shows the default selected option when the options are not passed in the beginning', async () => {
    const { getByRole, getByText, queryByText, rerender, clickOutside } = setup(
      // Using `propsWithSections` so we can query the trigger overlay's text content.
      { ...propsWithSections, options: [], value: 'Haifa', isLoading: true }
    );
    // Blurring the input so trigger overlay will be visible and we can query its text content.
    await clickOutside();

    expect(getByRole('combobox')).toHaveValue('');
    // Asserting that the default value is not yet visible.
    expect(queryByText('Haifa')).not.toBeInTheDocument();

    rerender(<Search {...propsWithSections} value="Haifa" />);
    // Blurring the input so trigger overlay will be visible and we can query its text content.
    await clickOutside();

    expect(getByRole('combobox')).toHaveValue('Haifa');
    // Asserting that the default value is visible.
    expect(getByText('Haifa')).toBeInTheDocument();
  });

  it('doesnt reset the input query when the user tabs away from the input', async () => {
    const { getByRole, user, typeInSearch, clearInput } = setup({
      shouldShowPresetOptions: true,
    });

    await waitFor(async () => user.tab());
    await typeInSearch('tel');
    await waitFor(async () => user.tab());

    expect(getByRole('combobox')).toHaveValue('tel');

    await waitFor(async () => user.tab({ shift: true }));
    await clearInput();
    await typeInSearch('tel');

    await waitFor(async () => user.keyboard('[DownArrow]'));
    await waitFor(async () => user.keyboard('{Enter}'));

    await waitFor(() => expect(getByRole('combobox')).toHaveValue('Tel Aviv'));

    await typeInSearch('[Backspace]');

    expect(getByRole('combobox')).toHaveValue('Tel Avi');

    await user.tab();

    expect(getByRole('combobox')).toHaveValue('Tel Avi');
  });

  describe('Clear button', () => {
    it('shows a clear button when input has value', () => {
      const { getByTestId } = setup({ value: cities[0]?.value });

      expect(getByTestId('clear-search-input')).toBeInTheDocument();
    });

    it("doens't show a clear button when input has no value", () => {
      const { queryByTestId } = setup();

      expect(queryByTestId('clear-search-input')).not.toBeInTheDocument();
    });

    it("doens't show a clear button when input has value and `isDisabled`", () => {
      const { queryByTestId } = setup({ value: cities[0]?.value, isDisabled: true });

      expect(queryByTestId('clear-search-input')).not.toBeInTheDocument();
    });

    it("doens't show a clear button when input has value and `isViewMode`", () => {
      const { queryByTestId } = setup({ value: cities[0]?.value, isViewMode: true });

      expect(queryByTestId('clear-search-input')).not.toBeInTheDocument();
    });

    it("doens't show a clear button when input has value and `isReadOnly`", () => {
      const { queryByTestId } = setup({ value: cities[0]?.value, isReadOnly: true });

      expect(queryByTestId('clear-search-input')).not.toBeInTheDocument();
    });

    it('clears the `inputValue` when clicked', async () => {
      const onClear = vi.fn();
      const { getByTestId, getByRole, user, typeInSearch } = setup({ onClear });

      await typeInSearch('Holon');
      await act(async () => user.click(getByTestId('clear-search-input')));
      expect(getByRole('combobox')).not.toHaveValue();
      expect(getByRole('combobox')).toHaveFocus();
      expect(onClear).toHaveBeenCalled();
    });

    it('clears the `inputValue` when clicked if there is a selected option', async () => {
      const onClear = vi.fn();
      const { getByTestId, getByRole, user } = setup({ value: 'Haifa', onClear });

      await user.click(getByTestId('clear-search-input'));
      expect(getByRole('combobox')).not.toHaveValue();
      expect(onClear).toHaveBeenCalled();
      expect(getByRole('combobox')).toHaveFocus();
    });

    it('supports custom aria-label for clear button', () => {
      const clearButtonAriaLabel = 'Click here to clear the search input';
      const { getByLabelText } = setup({ value: 'a', clearButtonAriaLabel });

      expect(getByLabelText(clearButtonAriaLabel)).toBeInTheDocument();
    });
  });

  describe('Filtering the options', () => {
    it('filters the options according to the search term', async () => {
      const { getAllByTestId, rerender, typeInSearch } = setup();

      await typeInSearch('e');

      rerender(<Search {...defaultProps} isLoading />);
      rerender(<Search {...defaultProps} isLoading={false} />);

      expect(getAllByTestId(/base-select-option-/).map((option) => option.textContent)).toStrictEqual([
        'Tel Aviv',
        'Eilat',
        'Kefar Sava',
        'Yavne',
        'Acre',
        'Tiberias',
        'Netivot',
      ]);
    });

    it('returns an empty array if there is no search term', async () => {
      const { getByTestId, clearInput, typeInSearch } = setup();

      await typeInSearch('e');
      await clearInput();
      await typeInSearch('{arrowdown}');
      expect(getByTestId('base-select-empty-state')).toBeVisible();
    });

    it('filters the options using an external `filterOptions` prop', async () => {
      const filterOptions: SearchProps['filterOptions'] = (options, searchTerm) =>
        searchTerm ? options.filter((option) => option.label.toLowerCase().startsWith(searchTerm.toLowerCase())) : [];

      const { getAllByTestId, rerender, typeInSearch } = setup({ filterOptions });

      await typeInSearch('e');

      rerender(<Search {...defaultProps} isLoading />);
      rerender(<Search {...defaultProps} isLoading={false} />);

      expect(getAllByTestId(/base-select-option-/).map((option) => option.textContent)).toStrictEqual(['Eilat']);
    });
  });

  it('displays an element next to the selected value', () => {
    const { getByTestId } = setup({
      ...propsWithSections,
      value: 'Lod',
      valueRightElement: <Icon type="repeat" size="small" />,
    });

    const inputOverlay = getByTestId('base-select-input-overlay');
    const rightElementIcon = within(inputOverlay).getByTestId('icon');

    expect(rightElementIcon).toBeInTheDocument();
  });

  describe('shouldShowPresetOptions', () => {
    it('opens the menu when clicking the input and shows the options', async () => {
      const { getByTestId, clickOnTrigger } = setup({ ...propsWithSections, shouldShowPresetOptions: true });

      await clickOnTrigger();

      expect(getByTestId('base-select-options-container')).toBeVisible();
    });

    it('opens the menu when clicking the input and shows the empty state message', async () => {
      const { getByTestId, clickOnTrigger } = setup({
        ...propsWithSections,
        options: [],
        shouldShowPresetOptions: true,
      });

      await clickOnTrigger();

      expect(getByTestId('base-select-empty-state')).toBeVisible();
    });

    it('trigger onClick when clicking empty state', async () => {
      const onClick = vi.fn();
      const { getByTestId, clickOnTrigger, user } = setup({
        ...propsWithSections,
        emptyState: { label: 'no results', onClick },
        options: [],
        shouldShowPresetOptions: true,
      });

      await clickOnTrigger();

      await user.click(getByTestId('base-select-clickable-empty-state'));
      expect(onClick).toHaveBeenCalled();
    });

    it('keeps the dropdown open after typing on multiple batches', async () => {
      const { getByTestId, clickOnTrigger, typeInSearch } = setup({
        ...propsWithSections,
        emptyState: { label: 'no results' },
        options: [],
        shouldShowPresetOptions: true,
      });

      await clickOnTrigger();

      expect(getByTestId('base-select-empty-state')).toBeVisible();

      await typeInSearch('a');
      expect(getByTestId('base-select-empty-state')).toBeVisible();

      await typeInSearch('a');
      expect(getByTestId('base-select-empty-state')).toBeVisible();
    });
  });

  describe('Custom creatable option condition', () => {
    it('shows a creatable option even if nothing is typed', async () => {
      const onClick = vi.fn();
      const label = 'Add new city';
      const { getByText, clickOnTrigger, assertMenuOpenState, user } = setup({
        shouldShowPresetOptions: true,
        creatableOption: { label, shouldDisplay: () => true, onClick },
      });

      await clickOnTrigger();
      assertMenuOpenState({ open: true });

      await user.click(getByText(label));

      expect(onClick).toHaveBeenCalled();
    });

    // https://meliorisk.atlassian.net/browse/ME-65819
    // eslint-disable-next-line vitest/no-disabled-tests
    it.skip('shows a creatable option when the custom condition is met', async () => {
      const value = 'My New City';
      const { getByText, clickOnTrigger, assertMenuOpenState, typeInSearch } = setup({
        creatableOption: { label: `Add ${value}`, shouldDisplay: (inputValue) => inputValue === 'My New City' },
      });

      await clickOnTrigger();
      await typeInSearch(value);
      assertMenuOpenState({ open: true });

      expect(getByText(`Add ${value}`)).toBeInTheDocument();
    });

    // https://meliorisk.atlassian.net/browse/ME-65819
    // eslint-disable-next-line vitest/no-disabled-tests
    it.skip('does not show a creatable option when the custom condition is not met', async () => {
      const value = 'Oh no!';
      const { queryByText, clickOnTrigger, assertMenuOpenState, typeInSearch } = setup({
        creatableOption: { label: `Add ${value}`, shouldDisplay: (inputValue) => inputValue === 'My New City' },
      });

      await clickOnTrigger();
      await typeInSearch(value);
      assertMenuOpenState({ open: true });

      expect(queryByText(`Add ${value}`)).not.toBeInTheDocument();
    });
  });

  testAutoFocus(Search, {
    options: [],
    emptyState: undefined,
  });

  describe('Search Term Reset', () => {
    it('doesnt call the onSearchTermReset event when typing in an empty search and blurring', async () => {
      const handleSearchTermReset = vi.fn();
      const { clickOutside, typeInSearch } = setup({ onSearchTermReset: handleSearchTermReset });

      await typeInSearch('hai');
      await clickOutside();

      expect(handleSearchTermReset).not.toHaveBeenCalled();
    });

    it('calls the onSearchTermReset event when typing in an empty search and pressing ESC', async () => {
      const handleSearchTermReset = vi.fn();
      const { typeInSearch } = setup({ onSearchTermReset: handleSearchTermReset });

      await typeInSearch('hai');
      await typeInSearch('{escape}');
      expect(handleSearchTermReset).not.toHaveBeenCalled();
    });

    it('calls the onSearchTermReset event when typing in a search with a selected option and blurring', async () => {
      const handleSearchTermReset = vi.fn();
      const { clickOutside, typeInSearch, clearInput } = setup({
        value: cities[0]?.label,
        options: cities,
        onSearchTermReset: handleSearchTermReset,
      });

      await typeInSearch('hai');
      await clickOutside();
      await clearInput();
      await clickOutside();

      expect(handleSearchTermReset).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have a link between the label and the trigger', async () => {
      const { result } = renderHook(() =>
        useMelioForm({ defaultValues: { field1: 'chocolate' }, onSubmit: () => null })
      );

      const { getByTestId, getByLabelText, user } = renderComponent(
        <FormField
          labelProps={{ label: 'Field 1' }}
          {...result.current.registerField('field1')}
          render={(fieldProps) => <Search {...fieldProps} {...defaultProps} />}
        />,
        { userEventOptions: { advanceTimers: vi.advanceTimersByTime } }
      );

      // Need to click the `label` element, and not any other container.
      await waitFor(async () => user.click(getByLabelText(/Field 1/)));

      await waitFor(() => expect(getByTestId('form-field-render-field')).toHaveFocus());
    });

    it('should focus on clear button when tab', async () => {
      const { getByTestId, user } = renderComponent(<Search {...defaultProps} value="a" />, {});

      const searchElement = await waitFor(() => screen.getByRole('combobox'));
      await waitFor(() => searchElement.focus());
      await waitFor(async () => user.tab());
      expect(getByTestId('clear-search-input')).toHaveFocus();
    });

    it('should focus the correct item on navigating with arrows key', async () => {
      const { getByTestId, rerender, typeInSearch, user, container } = setup({ ...propsWithSections });
      await waitFor(() => expect(container).toBeInTheDocument());
      await typeInSearch('e');

      rerender(<Search {...defaultProps} isLoading />);
      rerender(<Search {...defaultProps} isLoading={false} />);

      expect(getByTestId('base-select-option-0')).toHaveAttribute('data-focus', 'true');
      expect(getByTestId('base-select-option-0')).not.toHaveAttribute('data-active');

      await user.hover(getByTestId('base-select-option-0'));
      expect(getByTestId('base-select-option-0')).toHaveAttribute('data-active', 'true');
      expect(getByTestId('base-select-option-0')).toHaveAttribute('data-focus', 'true');

      await waitFor(async () => user.keyboard('{arrowDown}'));
      expect(getByTestId('base-select-option-0')).toHaveAttribute('data-active', 'true');
      expect(getByTestId('base-select-option-1')).toHaveAttribute('data-focus', 'true');
      expect(getByTestId('base-select-option-1')).not.toHaveAttribute('data-active');

      await waitFor(async () => user.keyboard('{arrowUp}{arrowUp}'));
      // the last filtered option for this search term should be focused.
      expect(getByTestId('base-select-option-6')).toHaveAttribute('data-focus', 'true');
    });

    it('the a11y message should renders correctly on the page body', () => {
      const { rerender } = setup({ ...defaultProps });

      const status = screen.getByTestId(/^search-a11y-status-message/);
      const parent = status.parentElement;

      expect(parent).toBe(document.body);
      expect(status).toBeInTheDocument();
      expect(status).toBeEmptyDOMElement();

      rerender(<Search {...defaultProps} isLoading />);
      expect(status).toHaveTextContent('Loading options.');
    });

    it('the a11y message should renders correctly inside the drawer', async () => {
      const { rerender } = renderComponent(
        <Drawer
          data-testid="drawer"
          isOpen
          onClose={vi.fn()}
          header="header"
          footer="footer"
          body={
            <Search
              {...defaultProps}
              statusMessageParentSelector={`[id^="floating-"][aria-modal="true"][role="dialog"]`}
            />
          }
        />
      );
      const status = await waitFor(() => screen.getByTestId(/^search-a11y-status-message-/));
      const parent = status.parentElement;
      expect(parent).not.toBe(document.body);
      expect(parent).toBe(screen.getByTestId('drawer'));

      expect(status).toBeInTheDocument();
      expect(status).toBeEmptyDOMElement();

      rerender(
        <Drawer
          data-testid="drawer"
          isOpen
          onClose={vi.fn()}
          header="header"
          footer="footer"
          body={
            <Search
              {...defaultProps}
              statusMessageParentSelector={`[id^="floating-"][aria-modal="true"][role="dialog"]`}
              isLoading
            />
          }
        />
      );
      expect(status).toHaveTextContent('Loading options.');
    });
  });
});
