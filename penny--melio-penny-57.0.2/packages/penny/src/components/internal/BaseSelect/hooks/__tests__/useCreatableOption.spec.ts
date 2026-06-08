import { renderHook } from '@testing-library/react';
import { expect } from 'vitest';

import { options } from '../../__fixtures__/mock-data';
import { useCreatableOption } from '../useCreatableOption';

const hookOptions = {
  query: '',
  options,
  creatableOption: {
    label: (value: string) => `Add ${value} as a new option`,
  },
};

describe('useCreatableOption', () => {
  it('returns a new option if query does not already exists', () => {
    const { result, rerender } = renderHook((props) => useCreatableOption(props), {
      initialProps: hookOptions,
    });

    expect(result.current).toStrictEqual({
      shouldShowCreatableOption: false,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      setShouldShowCreatableOption: expect.any(Function),
      newOption: null,
    });

    rerender({ ...hookOptions, query: 'test' });

    expect(result.current).toStrictEqual({
      shouldShowCreatableOption: true,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      setShouldShowCreatableOption: expect.any(Function),
      newOption: {
        value: 'test',
        label: 'test',
      },
    });

    rerender({ ...hookOptions, query: 'tel aviv' });

    expect(result.current).toStrictEqual({
      shouldShowCreatableOption: false,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      setShouldShowCreatableOption: expect.any(Function),
      newOption: null,
    });
  });

  describe('Creatable option', () => {
    it('decides not to display the creatable option if the input value does not match any option', () => {
      const { result } = renderHook((props) => useCreatableOption(props), {
        initialProps: {
          query: options[0]?.label,
          options,
          creatableOption: {
            label: 'Add new option',
          },
        },
      });

      expect(result.current.shouldShowCreatableOption).toBe(false);
    });

    it('decides to display the creatable option if the input value matches an option', () => {
      const { result } = renderHook((props) => useCreatableOption(props), {
        initialProps: {
          query: 'My New City',
          options,
          creatableOption: {
            label: 'Add new option',
          },
        },
      });

      expect(result.current.shouldShowCreatableOption).toBe(true);
    });

    describe('Custom creatable option display condition', () => {
      it('decides to display the creatable option if the custom condition is met without any query', () => {
        const { result } = renderHook((props) => useCreatableOption(props), {
          initialProps: {
            query: '',
            options,
            creatableOption: {
              label: 'Add new option',
              shouldDisplay: () => true,
            },
          },
        });

        expect(result.current.shouldShowCreatableOption).toBe(true);
      });

      it('decides to display the creatable option if the custom condition is met', () => {
        const { result } = renderHook((props) => useCreatableOption(props), {
          initialProps: {
            query: 'My New City',
            options,
            creatableOption: {
              label: 'Add new option',
              shouldDisplay: (inputValue: string) => inputValue === 'My New City',
            },
          },
        });

        expect(result.current.shouldShowCreatableOption).toBe(true);
      });

      it('decides not to display the creatable option if the passed custom condition is not met', () => {
        const { result } = renderHook((props) => useCreatableOption(props), {
          initialProps: {
            query: 'My New City',
            options,
            creatableOption: {
              label: 'Add new option',
              shouldDisplay: (inputValue: string) => inputValue !== 'My New City',
            },
          },
        });

        expect(result.current.shouldShowCreatableOption).toBe(false);
      });
    });
  });
});
