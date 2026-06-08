import { renderHook } from '@testing-library/react';
import { type ComponentType } from 'react';
import { expect } from 'vitest';

import { useMelioForm } from '@/components/form/hooks';
import { testReadOnly } from '@/components/form/test/utils';
import { type SelectNewOption, type SelectNewProps } from '@/components/selectionAndInputs/SelectNew';
import { renderComponent } from '@/test-utils/render.utils';

import { Form } from '../..';

describe('Form.SelectNew', () => {
  testReadOnly<SelectNewProps<unknown, SelectNewOption<unknown>>>({
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    Comp: Form.SelectNew as unknown as ComponentType<SelectNewProps<unknown, SelectNewOption<unknown>>>,
    compProps: { options: [] },
    options: {
      isFormField: true,
      customTestIdToGet: 'form-input-read-only-field-trigger-input',
      attributeToGet: 'data-readonly',
    },
  });

  it('should set the correct `aria-labelledby` on the menu', async () => {
    const { result } = renderHook(() => useMelioForm({ defaultValues: { field1: 'tel_aviv' }, onSubmit: () => null }));

    const { getByRole, user } = renderComponent(
      <Form>
        {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
        <Form.SelectNew
          {...result.current.registerField('field1')}
          options={[
            { label: 'Tel Aviv', value: 'tel_aviv' },
            { label: 'Jerusalem', value: 'jerusalem' },
          ]}
          emptyState="No options"
          labelProps={{ label: 'Flavor' }}
        />
      </Form>
    );

    await user.click(getByRole('combobox'));

    expect(getByRole('listbox')).toHaveAttribute('aria-labelledby', 'field1-label');
  });

  it('should focus the select on label click', async () => {
    const { result } = renderHook(() => useMelioForm({ defaultValues: { field1: 'tel_aviv' }, onSubmit: () => null }));

    const { getByText, getByRole, user } = renderComponent(
      <Form>
        {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
        <Form.SelectNew
          {...result.current.registerField('field1')}
          options={[
            { label: 'Tel Aviv', value: 'tel_aviv' },
            { label: 'Jerusalem', value: 'jerusalem' },
          ]}
          emptyState="No options"
          labelProps={{ label: 'Flavor' }}
        />
      </Form>
    );

    await user.click(getByText('Flavor'));

    expect(getByRole('combobox')).toHaveFocus();
  });
});
