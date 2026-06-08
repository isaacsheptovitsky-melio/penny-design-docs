import { act, renderHook } from '@testing-library/react';
import { expect } from 'vitest';

import { FormField } from '@/components/form/components/FormField';
import { useMelioForm } from '@/components/form/hooks';
import { testReadOnly } from '@/components/form/test/utils';
import { MultiSelect } from '@/components/selectionAndInputs/MultiSelect';
import { renderComponent } from '@/test-utils/render.utils';

import { Form, type FormMultiSelectProps } from '../..';

describe('Form.MultiSelect', () => {
  const formProps = {
    defaultValues: { field1: ['tel_aviv'] },
    onSubmit: vi.fn(),
  };

  const props = {
    labelProps: { label: 'Flavor' },
    options: [
      { label: 'Tel Aviv', value: 'tel_aviv' },
      { label: 'Jerusalem', value: 'jerusalem' },
    ],
  };

  testReadOnly<FormMultiSelectProps>({
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    Comp: Form.MultiSelect,
    compProps: props as never,
    options: {
      isFormField: true,
      customTestIdToGet: 'form-input-read-only-field-trigger-input',
      attributeToGet: 'data-readonly',
    },
  });

  it('should set the correct `aria-labelledby` on the menu', async () => {
    const { result } = renderHook(() => useMelioForm(formProps));

    const { getByRole, user } = renderComponent(
      <Form>
        {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
        <Form.MultiSelect {...result.current.registerField('field1')} {...props} />
      </Form>
    );

    await user.click(getByRole('combobox'));

    expect(getByRole('listbox')).toHaveAttribute('aria-labelledby', 'field1-label');
  });

  it('should focus the multi-select on label click', async () => {
    const { result } = renderHook(() => useMelioForm(formProps));

    const { getByText, getByRole, user } = renderComponent(
      <Form>
        {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
        <Form.MultiSelect {...result.current.registerField('field1')} {...props} />
      </Form>
    );

    await user.click(getByText('Flavor'));

    expect(getByRole('combobox')).toHaveFocus();
  });

  it('updates the value in case it is changed from outside', () => {
    const { result } = renderHook(() => useMelioForm(formProps));

    const { getByTestId } = renderComponent(
      <Form>
        {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
        <Form.MultiSelect {...result.current.registerField('field1')} {...props} />
      </Form>
    );

    expect(getByTestId('form-input-field1-trigger')).toHaveTextContent('Tel Aviv');

    act(() => result.current.setValue('field1', ['tel_aviv', 'jerusalem']));

    expect(getByTestId('form-input-field1-trigger')).toHaveTextContent('Tel Aviv, Jerusalem');
  });
});

describe('FormField => MultiSelect', () => {
  const formProps = {
    defaultValues: { field1: ['tel_aviv'] },
    onSubmit: vi.fn(),
  };

  const labelProps = { label: 'Flavor' };
  const options = [
    { label: 'Tel Aviv', value: 'tel_aviv' },
    { label: 'Jerusalem', value: 'jerusalem' },
  ];

  it('should set the correct `aria-labelledby` on the menu', async () => {
    const { result } = renderHook(() => useMelioForm(formProps));

    const { getByRole, user } = renderComponent(
      <Form>
        <FormField
          labelProps={labelProps}
          {...result.current.registerField('field1')}
          render={(props) => <MultiSelect {...props} options={options} />}
        />
      </Form>
    );

    await user.click(getByRole('combobox'));

    expect(getByRole('listbox')).toHaveAttribute('aria-labelledby', 'field1-label');
  });

  it('should focus the multi-select on label click', async () => {
    const { result } = renderHook(() => useMelioForm(formProps));

    const { getByText, getByRole, user } = renderComponent(
      <Form>
        <FormField
          {...result.current.registerField('field1')}
          labelProps={labelProps}
          render={(props) => <MultiSelect {...props} options={options} />}
        />
      </Form>
    );

    await user.click(getByText('Flavor'));

    expect(getByRole('combobox')).toHaveFocus();
  });

  it('updates the value in case it is changed from outside', () => {
    const { result } = renderHook(() => useMelioForm(formProps));

    const { getByTestId } = renderComponent(
      <Form>
        <FormField
          labelProps={labelProps}
          {...result.current.registerField('field1')}
          render={(props) => <MultiSelect {...props} options={options} />}
        />
      </Form>
    );

    expect(getByTestId('form-field-render-field-trigger')).toHaveTextContent('Tel Aviv');

    act(() => result.current.setValue('field1', ['tel_aviv', 'jerusalem']));

    expect(getByTestId('form-field-render-field-trigger')).toHaveTextContent('Tel Aviv, Jerusalem');
  });
});
