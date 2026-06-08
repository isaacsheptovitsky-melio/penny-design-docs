import { act, renderHook } from '@testing-library/react';
import { expect } from 'vitest';

import { useMelioForm } from '@/components/form/hooks';
import { renderComponent } from '@/test-utils/render.utils';

import { Form } from '../..';

describe('Form.Search', () => {
  // Regression for ME-20025
  it('doesn\'t submit the form when hitting "enter"', async () => {
    const handleSubmit = vi.fn();

    const { result } = renderHook(() => useMelioForm({ defaultValues: { field1: 'chocolate' }, onSubmit: () => null }));

    const { getByRole, user } = renderComponent(
      <Form onSubmit={handleSubmit}>
        {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
        <Form.Search
          {...result.current.registerField('field1')}
          options={[]}
          emptyState={{ label: 'No options' }}
          labelProps={{ label: 'Flavor' }}
          formatSelectedValue={(option) => option.label}
        />
      </Form>
    );

    await user.type(getByRole('combobox'), '{enter}');

    expect(handleSubmit).not.toBeCalled();
  });

  it("overrides the field's autocomplete attribute", () => {
    const { result } = renderHook(() => useMelioForm({ defaultValues: { field1: 'chocolate' }, onSubmit: () => null }));

    const { getByRole } = renderComponent(
      <Form onSubmit={vi.fn()}>
        {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
        <Form.Search
          {...result.current.registerField('field1')}
          options={[]}
          emptyState={{ label: 'No options' }}
          labelProps={{ label: 'Flavor' }}
          formatSelectedValue={(option) => option.label}
          autoComplete="flavor"
        />
      </Form>
    );

    expect(getByRole('combobox')).toHaveAttribute('autocomplete', 'flavor');
  });

  it('updates the input value in case the value is changed from outside', () => {
    const { result } = renderHook(() => useMelioForm({ defaultValues: { search: 'tel_aviv' }, onSubmit: () => null }));

    const { getByRole } = renderComponent(
      <Form>
        {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
        <Form.Search
          {...result.current.registerField('search')}
          labelProps={{ label: 'My city' }}
          options={[
            { label: 'Tel Aviv', value: 'tel_aviv' },
            { label: 'Jerusalem', value: 'jerusalem' },
          ]}
          emptyState={{ label: 'No options' }}
        />
      </Form>
    );

    expect(getByRole('combobox')).toHaveValue('Tel Aviv');

    act(() => result.current.setValue('search', 'jerusalem'));

    expect(getByRole('combobox')).toHaveValue('Jerusalem');
  });
});
