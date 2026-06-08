import { expect } from 'vitest';

import { type Option } from '../../BaseSelect.types';
import { getOptionKey, getOptionPropsHelper } from '../utils';

describe('getOptionKey helper', () => {
  it('should return option key', () => {
    const key = getOptionKey('label', 0);
    expect(key).toBe('label-0');
  });
});

describe('getOptionPropsHelper', () => {
  const getItemProps = vi.fn();
  const highlightedIndex = 1;
  const focusedIndex = -1;
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3', testId: 'option-3' },
    { label: 'Creatable option', value: 'creatable' },
  ];

  it('should return the correct props for the first option', () => {
    const getTestId = vi.fn().mockReturnValue({ 'data-testid': 'base-select-option-0' });
    const getOptionProps = getOptionPropsHelper<string>({
      getItemProps,
      highlightedIndex,
      focusedIndex,
      getTestId,
      resetFocusedIndex: vi.fn(),
      selectedOption: null,
    });
    const optionProps = getOptionProps({ option: options[0] as Option<string>, index: 0 });

    expect(optionProps).toEqual({
      ...getItemProps({ item: options[0], index: 0 }),
      isFocused: false,
      isHighlighted: false,
      isSelected: false,
      'data-testid': 'base-select-option-0',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onMouseLeave: expect.any(Function),
    });
  });

  it('should return the correct props for the highlighted option', () => {
    const getTestId = vi.fn().mockReturnValue({ 'data-testid': 'base-select-option-1' });
    const getOptionProps = getOptionPropsHelper<string>({
      getItemProps,
      highlightedIndex,
      focusedIndex,
      getTestId,
      resetFocusedIndex: vi.fn(),
      selectedOption: null,
    });
    const optionProps = getOptionProps({ option: options[1] as Option<string>, index: 1 });

    expect(optionProps).toEqual({
      ...getItemProps({ item: options[1], index: 1 }),
      isFocused: false,
      isHighlighted: true,
      isSelected: false,
      'data-testid': 'base-select-option-1',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onMouseLeave: expect.any(Function),
    });
  });

  it('should return the correct props for the last option', () => {
    const getTestId = vi.fn().mockReturnValue({ 'data-testid': 'base-select-option-2' });
    const getOptionProps = getOptionPropsHelper<string>({
      getItemProps,
      highlightedIndex,
      focusedIndex,
      getTestId,
      resetFocusedIndex: vi.fn(),
      selectedOption: null,
    });
    const optionProps = getOptionProps({ option: options[2] as Option<string>, index: 2 });

    expect(optionProps).toEqual({
      ...getItemProps({ item: options[2], index: 2 }),
      isHighlighted: false,
      isFocused: false,
      isSelected: false,
      'data-testid': 'option-3',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onMouseLeave: expect.any(Function),
    });
  });

  it('should not generate any test id for creatable option', () => {
    const getOptionProps = getOptionPropsHelper<string>({
      getItemProps,
      highlightedIndex,
      focusedIndex,
      getTestId: vi.fn(),
      resetFocusedIndex: vi.fn(),
      selectedOption: null,
    });
    const optionProps = getOptionProps({
      option: options[3] as Option<string>,
      index: 3,
      isCreatableOption: true,
    });

    expect(optionProps).toEqual({
      ...getItemProps({ item: options[3], index: 3 }),
      isHighlighted: false,
      isFocused: false,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onMouseLeave: expect.any(Function),
    });
  });

  it('should return the correct props for the focused option', () => {
    const getTestId = vi.fn().mockReturnValue({ 'data-testid': 'base-select-option-1' });
    const focusedIndex = 1;
    const getOptionProps = getOptionPropsHelper<string>({
      getItemProps,
      highlightedIndex: -1,
      focusedIndex,
      getTestId,
      resetFocusedIndex: vi.fn(),
      selectedOption: null,
    });
    const optionProps = getOptionProps({ option: options[1] as Option<string>, index: 1 });

    expect(optionProps).toEqual({
      ...getItemProps({ item: options[1], index: 1 }),
      isFocused: true,
      isHighlighted: false,
      isSelected: false,
      'data-testid': 'base-select-option-1',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onMouseLeave: expect.any(Function),
    });
  });

  it('should return the correct props for the selected option', () => {
    const getTestId = vi.fn().mockReturnValue({ 'data-testid': 'base-select-option-1' });
    const focusedIndex = 1;
    const getOptionProps = getOptionPropsHelper<string>({
      getItemProps,
      highlightedIndex: -1,
      focusedIndex,
      getTestId,
      resetFocusedIndex: vi.fn(),
      selectedOption: options[1],
    });
    const optionProps = getOptionProps({ option: options[1] as Option<string>, index: 1 });

    expect(optionProps).toEqual({
      ...getItemProps({ item: options[1], index: 1 }),
      isFocused: true,
      isHighlighted: false,
      isSelected: true,
      'data-testid': 'base-select-option-1',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onMouseLeave: expect.any(Function),
    });
  });
});
