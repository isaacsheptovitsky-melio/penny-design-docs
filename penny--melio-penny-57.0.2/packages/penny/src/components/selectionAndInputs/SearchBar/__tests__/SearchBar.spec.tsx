import * as pennyUtils from '@melio/penny-utils';
import { noop } from '@melio/penny-utils';
import { act, screen, waitFor } from '@testing-library/react';
import { type ChangeEvent, createRef, type FocusEvent } from 'react';
import { expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { SearchBar } from '../SearchBar';
import { type SearchBarProps } from '../SearchBar.types';

const SEARCH_INPUT_ID = 'search-bar-input';
const CLEAR_BTN_ID = 'search-bar-clear-button';

describe('SearchBar', () => {
  validateComponent<SearchBarProps>(SearchBar, 'SearchBar');

  const render = ({ value = '', onChange = noop, ...props }: Partial<SearchBarProps> = {}) => {
    const { getByTestId, queryByTestId, rerender } = renderComponent(
      <SearchBar value={value} onChange={onChange} data-testid="search-form" {...props} />
    );

    return {
      searchInput: getByTestId('search-form-input'),
      clearButton: queryByTestId('search-form-clear-button') as Element,
      rerender,
    };
  };

  it('show the clear button when the query has a value. Clicking on the clear button should clear the query value.', async () => {
    let value = '';
    const onChange = (e: FocusEvent<HTMLInputElement>) => {
      value = e.target.value;
    };

    const { getByTestId, rerender, queryByTestId, getByRole, user } = renderComponent(
      <SearchBar onChange={onChange} value={value} />
    );
    expect(queryByTestId(CLEAR_BTN_ID)).not.toBeInTheDocument();
    await user.type(getByTestId(SEARCH_INPUT_ID), '1');

    rerender(<SearchBar onChange={onChange} value={value} />);
    expect(queryByTestId(CLEAR_BTN_ID)).toBeInTheDocument();
    await user.click(getByRole('button', { name: 'clear search' }));

    rerender(<SearchBar onChange={onChange} value={value} />);
    expect(queryByTestId(CLEAR_BTN_ID)).not.toBeInTheDocument();
    expect(getByTestId(SEARCH_INPUT_ID)).toHaveValue('');
    expect(getByTestId(SEARCH_INPUT_ID)).toHaveFocus();
  });

  it('calls onBlur when tabbing away', async () => {
    const onBlur = vi.fn();
    const { getByTestId, user, queryByTestId } = renderComponent(<SearchBar onBlur={onBlur} value="" />);
    await user.click(getByTestId(SEARCH_INPUT_ID));
    expect(queryByTestId(CLEAR_BTN_ID)).not.toBeInTheDocument();
    await user.tab();
    expect(onBlur).toHaveBeenCalled();
  });

  it('calls onBlur when tabbing to clear button', async () => {
    const onBlur = vi.fn();
    const { getByTestId, user, queryByTestId } = renderComponent(<SearchBar onBlur={onBlur} value="" />);
    await user.type(getByTestId(SEARCH_INPUT_ID), 'f');
    await user.tab();
    expect(queryByTestId(CLEAR_BTN_ID)).toHaveFocus();
    expect(onBlur).toHaveBeenCalled();
  });

  it('calls onChange when changing the input', async () => {
    const onChange = vi.fn();
    const { getByTestId, user } = renderComponent(<SearchBar onChange={onChange} value="" />);
    await user.type(getByTestId(SEARCH_INPUT_ID), 'f');
    expect(onChange).toHaveBeenCalled();
  });

  it('sets the focus to the input when clicking the clear button', async () => {
    let value = 'query';
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      value = event.target.value;
    };
    const { getByTestId, user } = renderComponent(<SearchBar onChange={onChange} value={value} />);
    await user.click(getByTestId(CLEAR_BTN_ID));
    expect(getByTestId(SEARCH_INPUT_ID)).toHaveFocus();
  });

  it('when autoFocus is true, the input is focused', () => {
    const { getByTestId } = renderComponent(<SearchBar onChange={noop} value="" autoFocus />);
    expect(getByTestId(SEARCH_INPUT_ID)).toHaveFocus();
  });

  it('focus the input from external ref', () => {
    const ref = createRef<HTMLInputElement>();
    const { getByTestId } = renderComponent(<SearchBar value="" onChange={noop} data-testid="search-form" ref={ref} />);
    if (ref.current) {
      ref.current.focus();
    }
    expect(getByTestId('search-form-input')).toHaveFocus();
  });

  it('invokes the correct event after clicking on the clear button', async () => {
    const onClear = vi.fn();
    const { getByRole, user } = renderComponent(<SearchBar onClear={onClear} value="foo" />);
    await user.click(getByRole('button', { name: 'clear search' }));
    expect(onClear).toHaveBeenCalled();
  });

  it('sets a placeholder', () => {
    const placeholder = 'test placeholder';
    render({ placeholder });
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it('when search bar with value and is disabled, the clear button should be disabled also', () => {
    const { getByRole } = renderComponent(<SearchBar onChange={noop} value="foo" isDisabled />);
    expect(getByRole('button', { name: 'clear search' })).toBeDisabled();
  });

  it('search button is not display if `onSearch` is not provided', () => {
    const { queryByRole } = renderComponent(<SearchBar value="foo" />);
    expect(queryByRole('button', { name: 'Search' })).not.toBeInTheDocument();
  });

  it('invokes `onSearch` event after clicking on the search button', async () => {
    const onSearch = vi.fn();
    const { getByRole, user } = renderComponent(<SearchBar onSearch={onSearch} value="foo" />);
    await user.click(getByRole('button', { name: 'Search' }));
    expect(onSearch).toHaveBeenCalled();
  });

  it('invokes `onSearch` event after press Enter', async () => {
    const onSearch = vi.fn();
    const { getByRole, user } = renderComponent(<SearchBar onSearch={onSearch} value="foo" />);
    getByRole('textbox').focus();
    await user.keyboard('{Enter}');
    expect(onSearch).toHaveBeenCalled();
  });

  describe('accessibility', () => {
    const defaultInstructionsText = 'Type to search';
    const defaultValueClearedMessage = 'Value cleared';

    it('should return "Press the search icon to search" on desktop when onSearch is passed', () => {
      const { getByText, getByRole } = renderComponent(<SearchBar onSearch={vi.fn()} />);

      expect(getByText('Press the search icon to search')).toBeInTheDocument();
      expect(getByRole('textbox')).toHaveAccessibleDescription('Press the search icon to search');
    });

    it('should return "Tap the search icon to search" on mobile when onSearch is passed', () => {
      vi.spyOn(pennyUtils, 'isMobileDevice').mockReturnValue(true);

      const { getByText, getByRole } = renderComponent(<SearchBar onSearch={vi.fn()} />);

      expect(getByText('Tap the search icon to search')).toBeInTheDocument();
      expect(getByRole('textbox')).toHaveAccessibleDescription('Tap the search icon to search');
    });

    it('should return "Type to search" on desktop when onSearch isnt passed', () => {
      const { getByText, getByRole } = renderComponent(<SearchBar />);

      expect(getByText(defaultInstructionsText)).toBeInTheDocument();
      expect(getByRole('textbox')).toHaveAccessibleDescription(defaultInstructionsText);
    });

    it('should return "Type to search" on mobile when onSearch isnt passed', () => {
      vi.spyOn(pennyUtils, 'isMobileDevice').mockReturnValue(true);

      const { getByText, getByRole } = renderComponent(<SearchBar />);

      expect(getByText(defaultInstructionsText)).toBeInTheDocument();
      expect(getByRole('textbox')).toHaveAccessibleDescription(defaultInstructionsText);
    });

    it('the search field has accessible description', () => {
      const { getByText, getByRole } = renderComponent(<SearchBar />);

      expect(getByText(defaultInstructionsText)).toBeInTheDocument();
      expect(getByRole('textbox')).toHaveAccessibleDescription(defaultInstructionsText);
    });

    it('supports a custom accessible description text', () => {
      const customInstructionsText = 'Search for something';
      const { getByText, getByRole } = renderComponent(<SearchBar instructionsText={customInstructionsText} />);

      expect(getByText(customInstructionsText)).toBeInTheDocument();
      expect(getByRole('textbox')).toHaveAccessibleDescription(customInstructionsText);
    });

    it('when the search field is cleared, the accessible description text includes a message indicating that the field has been cleared.', async () => {
      const { getByRole, getByText, queryByText, user } = renderComponent(<SearchBar value="query" />);
      expect(queryByText(defaultValueClearedMessage)).not.toBeInTheDocument();
      expect(getByRole('textbox')).toHaveAccessibleDescription(defaultInstructionsText);

      await user.click(getByRole('button', { name: 'clear search' }));
      expect(getByRole('textbox')).toHaveFocus();

      expect(getByText(`${defaultValueClearedMessage} ${defaultInstructionsText}`)).toBeInTheDocument();
      expect(getByRole('textbox')).toHaveAccessibleDescription(
        `${defaultValueClearedMessage} ${defaultInstructionsText}`
      );
    });

    it('supports a custom accessible description text for when the field has been cleared', async () => {
      const customInstructionsText = 'The value has been cleared';
      const { getByRole, getByText, queryByText, user } = renderComponent(
        <SearchBar value="query" valueClearedMessage={customInstructionsText} />
      );
      expect(queryByText(customInstructionsText)).not.toBeInTheDocument();
      expect(getByRole('textbox')).toHaveAccessibleDescription(defaultInstructionsText);

      await user.click(getByRole('button', { name: 'clear search' }));
      expect(getByRole('textbox')).toHaveFocus();

      expect(getByText(`${customInstructionsText} ${defaultInstructionsText}`)).toBeInTheDocument();
      expect(getByRole('textbox')).toHaveAccessibleDescription(`${customInstructionsText} ${defaultInstructionsText}`);
    });

    it("the accessible description text doesn't include a message indicating that the field has been cleared after entering new value", async () => {
      const { getByRole, queryByText, user } = renderComponent(<SearchBar value="query" />);
      expect(getByRole('textbox')).toHaveAccessibleDescription(defaultInstructionsText);

      await user.click(getByRole('button', { name: 'clear search' }));
      expect(getByRole('textbox')).toHaveFocus();

      expect(getByRole('textbox')).toHaveAccessibleDescription(
        `${defaultValueClearedMessage} ${defaultInstructionsText}`
      );
      await user.type(getByRole('textbox'), 'f');
      expect(queryByText(defaultValueClearedMessage)).not.toBeInTheDocument();
      expect(getByRole('textbox')).toHaveAccessibleDescription(defaultInstructionsText);
    });

    it("the accessible description text doesn't include a message indicating that the field has been cleared after blur the input and focus again", async () => {
      const { getByRole, queryByText, user } = renderComponent(<SearchBar value="query" />);
      expect(getByRole('textbox')).toHaveAccessibleDescription(defaultInstructionsText);

      await waitFor(async () => user.click(getByRole('button', { name: 'clear search' })));
      expect(getByRole('textbox')).toHaveFocus();

      expect(getByRole('textbox')).toHaveAccessibleDescription(
        `${defaultValueClearedMessage} ${defaultInstructionsText}`
      );
      act(() => getByRole('textbox').blur());
      expect(queryByText(defaultValueClearedMessage)).not.toBeInTheDocument();
      expect(getByRole('textbox')).toHaveAccessibleDescription(defaultInstructionsText);
      act(() => getByRole('textbox').focus());
      expect(queryByText(defaultValueClearedMessage)).not.toBeInTheDocument();
      expect(getByRole('textbox')).toHaveAccessibleDescription(defaultInstructionsText);
    });
  });
});
