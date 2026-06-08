import { act, renderHook, screen, within } from '@testing-library/react';
import { expect } from 'vitest';

import { FormField } from '@/components/form/components/FormField';
import { useMelioForm } from '@/components/form/hooks';
import { Combobox } from '@/components/selectionAndInputs/Combobox';
import { renderComponent } from '@/test-utils/render.utils';
import { resizeScreenByBreakpointKey } from '@/test-utils/resize-screen';

import { Form } from '../..';

const formProps = {
  defaultValues: { field1: 'tel_aviv' },
  onSubmit: vi.fn(),
};

const formFieldProps = {
  labelProps: { label: 'City' },
  helperText: 'This indicates what type of person you are',
};

const otherProps = {
  options: [
    { label: 'Tel Aviv', value: 'tel_aviv' },
    { label: 'Jerusalem', value: 'jerusalem' },
  ],
  isMenuOpen: true,
};

describe('Form => Combobox', () => {
  it('should set the correct `aria-labelledby` on the menu', () => {
    const { result } = renderHook(() => useMelioForm(formProps));

    const { getByRole } = renderComponent(
      <Form>
        <FormField
          {...formFieldProps}
          {...result.current.registerField('field1')}
          render={(props, fieldContext) => <Combobox {...props} {...fieldContext} {...otherProps} />}
        />
      </Form>
    );

    expect(getByRole('listbox')).toHaveAttribute('aria-labelledby', 'field1-label');
  });

  it('should set the correct `aria-label` on the menu', () => {
    const { result } = renderHook(() => useMelioForm(formProps));

    const { getByRole } = renderComponent(
      <Form>
        <FormField
          {...formFieldProps}
          {...result.current.registerField('field1')}
          render={(props, fieldContext) => (
            <Combobox {...props} {...fieldContext} {...otherProps} menuAriaLabel="Cities" />
          )}
        />
      </Form>
    );

    expect(getByRole('listbox')).not.toHaveAttribute('aria-labelledby', 'field1-label');
    expect(getByRole('listbox')).toHaveAttribute('aria-label', 'Cities');
  });

  it('should focus the input on label click', async () => {
    const { result } = renderHook(() => useMelioForm(formProps));

    const { getByText, getByRole, user } = renderComponent(
      <Form>
        <FormField
          {...formFieldProps}
          {...result.current.registerField('field1')}
          render={(props, fieldContext) => <Combobox {...props} {...fieldContext} {...otherProps} />}
        />
      </Form>
    );

    await act(async () => user.click(getByText('City')));

    expect(getByRole('combobox')).toHaveFocus();
  });

  it("doesn't submit the form on `Enter` press", async () => {
    const onSubmit = vi.fn();

    const { result } = renderHook(() => useMelioForm({ ...formProps, onSubmit }));

    const { getByRole, user } = renderComponent(
      <Form onSubmit={onSubmit}>
        <FormField
          {...formFieldProps}
          {...result.current.registerField('field1')}
          render={(props, fieldContext) => <Combobox {...props} {...fieldContext} {...otherProps} />}
        />
      </Form>
    );

    await user.type(getByRole('combobox'), '[Enter]');

    expect(onSubmit).not.toBeCalled();
  });

  it('updates the value in case it is changed from outside', () => {
    const { result } = renderHook(() => useMelioForm(formProps));

    const { getByTestId } = renderComponent(
      <Form>
        <FormField
          {...formFieldProps}
          {...result.current.registerField('field1')}
          render={(props, fieldContext) => <Combobox {...props} {...fieldContext} {...otherProps} />}
        />
      </Form>
    );

    expect(getByTestId('form-field-render-field-trigger-value')).toHaveTextContent('Tel Aviv');

    act(() => result.current.setValue('field1', 'jerusalem'));

    expect(getByTestId('form-field-render-field-trigger-value')).toHaveTextContent('Jerusalem');
  });

  describe('Mobile View', () => {
    beforeEach(() => {
      resizeScreenByBreakpointKey('xs');
    });

    it('should focus the input on label click', async () => {
      const { result } = renderHook(() => useMelioForm(formProps));

      const { getByTestId, getByRole, user } = renderComponent(
        <Form>
          <FormField
            {...formFieldProps}
            {...result.current.registerField('field1')}
            render={(props, fieldContext) => <Combobox {...props} {...fieldContext} {...otherProps} />}
          />
        </Form>
      );

      await act(async () => user.click(getByTestId('form-field-render-field-trigger-input')));
      const mobileView = screen.getByTestId('form-field-render-field-mobile-edit-mode');
      await act(async () => user.click(within(mobileView).getByText('City')));

      expect(getByRole('combobox')).toHaveFocus();
    });

    it('should set unique ids and associate them correctly', async () => {
      const { result } = renderHook(() => useMelioForm(formProps));

      const { getByLabelText, getByTestId, user } = renderComponent(
        <Form>
          <FormField
            {...formFieldProps}
            {...result.current.registerField('field1')}
            render={(props, fieldContext) => (
              <Combobox {...props} {...fieldContext} {...otherProps} menuAriaLabel="Cities" />
            )}
          />
        </Form>
      );

      const trigger = getByLabelText('City');
      expect(trigger).toHaveAttribute('aria-labelledby', 'field1-label');
      expect(trigger).toHaveAttribute('aria-describedby', 'field1-value field1-helper-text');

      const triggerValue = getByTestId('form-field-render-field-trigger-value');
      expect(triggerValue).toHaveAttribute('id', 'field1-value');

      const triggerHelperText = getByTestId('form-field-helper-text');
      expect(triggerHelperText).toHaveAttribute('id', 'field1-helper-text');

      await act(async () => user.click(trigger));

      const mobileView = screen.getByTestId('form-field-render-field-mobile-edit-mode');

      const combobox = within(mobileView).getByTestId(
        'form-field-render-field-mobile-edit-mode-trigger-container-trigger-input'
      );
      expect(combobox).toHaveAttribute('aria-labelledby', 'mobile-view-field1-label');
      expect(combobox).toHaveAttribute('aria-describedby', 'mobile-view-field1-value mobile-view-field1-helper-text');

      const comboboxValue = within(mobileView).getByTestId(
        'form-field-render-field-mobile-edit-mode-trigger-container-trigger-value'
      );
      expect(comboboxValue).toHaveAttribute('id', 'mobile-view-field1-value');

      const helperTexts = screen.getAllByTestId('form-field-helper-text');
      const comboboxHelperText =
        helperTexts.find((el) => el.getAttribute('id') === 'mobile-view-field1-helper-text') || helperTexts[0];
      expect(comboboxHelperText).toHaveAttribute('id', 'mobile-view-field1-helper-text');
    });
  });
});
