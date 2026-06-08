import { act, screen, waitFor } from '@testing-library/react';
import { expect } from 'vitest';

import { renderComponent } from '@/test-utils/render.utils';

import { SelectNew } from '..';
import { type SelectNewProps } from '../SelectNew.types';
import { cities, type City } from './mock-data';

export const getTriggerValue = () => screen.getByTestId('select-trigger-value');

export const getTriggerInput = () => screen.getByTestId('select-trigger-input');

export const getSearchBar = () => screen.getByRole('combobox', { name: /search/i });

export const assertActivedescendant = async (id = '') => {
  await waitFor(() => expect(getTriggerInput()).toHaveAttribute('aria-activedescendant', id));
};

export const assertMenuIsClosed = async () => {
  await waitFor(() => {
    expect(getTriggerInput()).toHaveAttribute('aria-expanded', 'false');
  });
  await assertActivedescendant();
  await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
};

export const assertTriggerValue = (value = 'Select') => expect(getTriggerValue()).toHaveTextContent(value);

export const assertHasNoClearButton = () =>
  expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();

export const defaultProps = { options: cities, menuAriaLabel: 'Cities' };

type SetupOptions = Partial<SelectNewProps<string, City>>;

type SetupReturn = ReturnType<typeof renderComponent> & {
  openByKeyboard: (key: 'Space' | 'Enter' | 'ArrowDown' | 'ArrowUp') => Promise<void>;
};

export const setup = (props: SetupOptions = {}): SetupReturn => {
  const { user, ...result } = renderComponent(<SelectNew {...defaultProps} {...props} />);

  const openByKeyboard = async (key: 'Space' | 'Enter' | 'ArrowDown' | 'ArrowUp') =>
    act(async () => user.keyboard(`[${key}]`));

  return { ...result, user, openByKeyboard };
};
