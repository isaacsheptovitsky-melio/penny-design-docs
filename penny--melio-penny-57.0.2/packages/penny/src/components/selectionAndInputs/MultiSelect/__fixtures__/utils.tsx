import { screen } from '@testing-library/react';
import { expect } from 'vitest';

import { renderComponent } from '@/test-utils/render.utils';

import { MultiSelect } from '..';
import { type MultiSelectProps } from '../MultiSelect.types';
import { cities, type City } from './mock-data';

export const getTriggerInput = () => screen.getByTestId('multi-select-trigger-input');

const getMenu = () => screen.getByRole('listbox');

export const assertActivedescendant = (id = '') =>
  expect(getTriggerInput()).toHaveAttribute('aria-activedescendant', id);

export const defaultProps = { options: cities };

type SetupOptions = Partial<MultiSelectProps<string, City>>;

type SetupReturn = ReturnType<typeof renderComponent> & {
  selectOption: (option: string) => Promise<void>;
  focusByKeyboard: () => Promise<void>;
  openByKeyboard: (key: 'Space' | 'Enter' | 'ArrowDown' | 'ArrowUp') => Promise<void>;
  closeByKeyboard: () => Promise<void>;
};

export const setup = (props: SetupOptions = {}): SetupReturn => {
  const { user, ...result } = renderComponent(<MultiSelect {...defaultProps} {...props} />);

  const selectOption = async (option: string) => {
    await user.selectOptions(getMenu(), [screen.getByRole('option', { name: option })]);
  };

  const focusByKeyboard = async () => {
    await user.tab();
  };

  const openByKeyboard = async (key: 'Space' | 'Enter' | 'ArrowDown' | 'ArrowUp') => {
    await user.keyboard(`[${key}]`);
  };

  const closeByKeyboard = async () => {
    await user.keyboard('[Escape]');
  };

  return {
    ...result,
    user,
    selectOption,
    focusByKeyboard,
    openByKeyboard,
    closeByKeyboard,
  };
};
