import { renderHook } from '@testing-library/react';
import { expect } from 'vitest';

import { options, sections } from '../../__fixtures__/mock-data';
import { type BaseProps, type Option } from '../../BaseSelect.types';
import { useOptions } from '../useOptions';

const filterOptions: BaseProps<string>['filterOptions'] = (options, query) =>
  query ? options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase())) : [];

const hookOptions = {
  options,
  filterOptions,
  query: '',
  shouldShowPresetOptions: false,
};

const optionsWithSection = [
  { label: 'Tel Aviv', value: 'Tel Aviv', section: { label: 'Center' } },
  { label: 'Kefar Sava', value: 'Kefar Sava', section: { label: 'Center' } },
  { label: 'Lod', value: 'Lod', section: { label: 'Center' } },
  { label: 'Haifa', value: 'Haifa', section: { label: 'North' } },
  { label: 'Nahariyya', value: 'Nahariyya', section: { label: 'North' } },
  { label: 'Eilat', value: 'Eilat', section: { label: 'South' } },
];

describe('useOptions', () => {
  it('keeps the options updated when the `options` prop changes', () => {
    const { result, rerender } = renderHook((props) => useOptions(props), {
      initialProps: { ...hookOptions, options: [] as Option<string>[] },
    });

    expect(result.current).toStrictEqual({
      hasSections: false,
      options: [],
      filteredOptions: [],
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      clearOptions: expect.any(Function),
    });

    rerender(hookOptions);

    expect(result.current).toStrictEqual({
      hasSections: false,
      options,
      filteredOptions: [],
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      clearOptions: expect.any(Function),
    });

    rerender({ ...hookOptions, options: sections as never });

    expect(result.current).toStrictEqual({
      hasSections: true,
      options: optionsWithSection,
      filteredOptions: [],
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      clearOptions: expect.any(Function),
    });
  });

  it('returns the correct filtered options', () => {
    const { result, rerender } = renderHook((props) => useOptions(props), {
      initialProps: hookOptions,
    });

    expect(result.current).toStrictEqual({
      hasSections: false,
      options,
      filteredOptions: [],
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      clearOptions: expect.any(Function),
    });

    rerender({ ...hookOptions, query: 'test' });

    expect(result.current).toStrictEqual({
      hasSections: false,
      options,
      filteredOptions: [],
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      clearOptions: expect.any(Function),
    });

    rerender({ ...hookOptions, query: 't' });

    expect(result.current).toStrictEqual({
      hasSections: false,
      options,
      filteredOptions: [
        { label: 'Tel Aviv', value: 'Tel Aviv' },
        { label: 'Eilat', value: 'Eilat' },
      ],
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      clearOptions: expect.any(Function),
    });

    rerender({ ...hookOptions, query: 'tel aviv' });

    expect(result.current).toStrictEqual({
      hasSections: false,
      options,
      filteredOptions: [{ label: 'Tel Aviv', value: 'Tel Aviv' }],
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      clearOptions: expect.any(Function),
    });
  });

  it('returns the correct filtered options with section', () => {
    const { result, rerender } = renderHook((props) => useOptions(props), {
      initialProps: { ...hookOptions, options: sections },
    });

    expect(result.current).toStrictEqual({
      hasSections: true,
      options: optionsWithSection,
      filteredOptions: [],
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      clearOptions: expect.any(Function),
    });

    rerender({ ...hookOptions, options: sections, query: 'test' });

    expect(result.current).toStrictEqual({
      hasSections: true,
      options: optionsWithSection,
      filteredOptions: [],
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      clearOptions: expect.any(Function),
    });

    rerender({ ...hookOptions, options: sections, query: 't' });

    expect(result.current).toStrictEqual({
      hasSections: true,
      options: optionsWithSection,
      filteredOptions: [
        { label: 'Tel Aviv', value: 'Tel Aviv', section: { label: 'Center' } },
        { label: 'Eilat', value: 'Eilat', section: { label: 'South' } },
      ],
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      clearOptions: expect.any(Function),
    });

    rerender({ ...hookOptions, options: sections, query: 'tel aviv' });

    expect(result.current).toStrictEqual({
      hasSections: true,
      options: optionsWithSection,
      filteredOptions: [{ label: 'Tel Aviv', value: 'Tel Aviv', section: { label: 'Center' } }],
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      clearOptions: expect.any(Function),
    });
  });

  it('returns the options as filtered options when `shouldShowPresetOptions` is enabled', () => {
    const { result } = renderHook(() => useOptions({ ...hookOptions, shouldShowPresetOptions: true }));

    expect(result.current).toStrictEqual({
      hasSections: false,
      options,
      filteredOptions: options,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      clearOptions: expect.any(Function),
    });
  });
});
