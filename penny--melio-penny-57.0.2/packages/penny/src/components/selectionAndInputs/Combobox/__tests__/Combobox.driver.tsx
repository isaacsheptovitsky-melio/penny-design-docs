import { createComboboxTestKit } from '@melio/penny-testkit-rtl';
import { screen } from '@testing-library/react';
import { act, type ChangeEvent, useState } from 'react';
import { expect } from 'vitest';

import { renderComponent } from '@/test-utils/render.utils';

import { Combobox } from '../..';
import { type City } from '../__fixtures__/mock-data';
import { type ComboboxProps } from '../Combobox.types';
import { DEBOUNCE_TIME, useFetchOptions, type UseFetchOptionsOptions } from './useFetchOptions';

const testKit = createComboboxTestKit();

export const getTriggerInput = () => screen.getByTestId('combobox-trigger-input');
export const getMenu = () => screen.getByTestId('combobox-menu');
export const getTriggerValue = () => screen.getByTestId('combobox-trigger-value');

export const assertActivedescendant = (id = '') =>
  id
    ? expect(getTriggerInput()).toHaveAttribute('aria-activedescendant', id)
    : expect(getTriggerInput()).not.toHaveAttribute('aria-activedescendant');

export const assertHasNoClearButton = () =>
  expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();

type SetupOptions = Partial<Omit<ComboboxProps<string, City>, 'options'>> & Omit<UseFetchOptionsOptions, 'searchTerm'>;

type SetupReturn = ReturnType<typeof renderComponent> & {
  typeInTriggerInput: (searchTerm: string) => Promise<void>;
  clickOutside: () => Promise<void>;
  selectOption: (option: string) => Promise<void>;
  clearSelect: () => Promise<void>;
  focusByKeyboard: () => Promise<void>;
  openByKeyboard: (key: 'ArrowDown' | 'ArrowUp') => Promise<void>;
  closeByKeyboard: () => Promise<void>;
  onChange: typeof vi.fn;
};

export const getMobileEditModeDialog = () => screen.queryByTestId('combobox-mobile-edit-mode');

export const setup = ({ defaultOptions, presetOptions, ...props }: SetupOptions = {}): SetupReturn => {
  const onChange = vi.fn();

  const ControlledCombobox = () => {
    const [inputValue, setInputValue] = useState('');
    const { options, isFetching } = useFetchOptions({ searchTerm: inputValue, defaultOptions, presetOptions });
    const [value, setValue] = useState(props.value);

    onChange.mockImplementation((e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value));

    return (
      <Combobox
        {...props}
        options={options}
        onChange={onChange}
        value={value}
        onInputChange={setInputValue}
        isLoadingOptions={isFetching}
        isMenuOpen={inputValue.length > 1}
      />
    );
  };

  const { user, ...result } = renderComponent(<ControlledCombobox />, {
    userEventOptions: { advanceTimers: vi.advanceTimersByTime },
  });

  const typeInTriggerInput = async (searchTerm: string) => {
    await act(async () => {
      await testKit.clickTrigger({ advanceTimers: vi.advanceTimersByTime });
      await testKit.type(searchTerm, { advanceTimers: vi.advanceTimersByTime });
      vi.advanceTimersByTime(DEBOUNCE_TIME);
    });
  };

  const clickOutside = async () => await testKit.clickOutside({ advanceTimers: vi.advanceTimersByTime });

  const selectOption = async (option: string) =>
    testKit.clickOptionByText(option, { advanceTimers: vi.advanceTimersByTime });

  const clearSelect = async () => testKit.clickClearButton({ advanceTimers: vi.advanceTimersByTime });

  const focusByKeyboard = async () => user.tab();

  const openByKeyboard = async (key: 'ArrowDown' | 'ArrowUp') => user.keyboard(`{${key}}`);

  const closeByKeyboard = async () => user.keyboard('{Escape}');

  return {
    ...result,
    user,
    typeInTriggerInput,
    clickOutside,
    selectOption,
    clearSelect,
    focusByKeyboard,
    openByKeyboard,
    closeByKeyboard,
    onChange,
  };
};
