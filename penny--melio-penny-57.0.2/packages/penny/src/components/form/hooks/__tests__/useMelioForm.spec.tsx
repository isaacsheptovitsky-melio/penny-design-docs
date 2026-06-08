import { noop } from '@melio/penny-utils';
import { act, fireEvent, render, renderHook, type RenderHookResult, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { type FormEvent } from 'react';
import { expect, vi } from 'vitest';
import { object, type SchemaOf, string } from 'yup';

import { useMelioForm, type UseMelioFormProps, type UseMelioFormResults } from '..';
import { TestForm } from './TestForm.test.utils';

type Model = {
  firstName: string;
  lastName: string;
};

const defaultValues: Model = {
  firstName: 'John',
  lastName: 'Doe',
};

const schema: SchemaOf<Model> = object().shape({
  firstName: string().required(),
  lastName: string().required(),
});

describe('useMelioForm', () => {
  const defaultProps: UseMelioFormProps<Model> = { onSubmit: noop };
  const init = (props: Partial<UseMelioFormProps<Model>> = {}) =>
    renderHook(() => useMelioForm({ schema, ...defaultProps, ...props }));

  const preventDefault = vi.fn();
  const submitEvent = { preventDefault } as unknown as FormEvent<HTMLFormElement>;

  afterEach(() => {
    preventDefault.mockReset();
  });

  // eslint-disable-next-line @typescript-eslint/require-await
  const submitForm = async (hook: RenderHookResult<UseMelioFormResults<Model>, unknown>) => {
    act(() => {
      hook.result.current.formProps.onSubmit(submitEvent);
    });
  };

  it('is invalid when submitting empty', async () => {
    const hook = init();
    const { result } = hook;

    await submitForm(hook);

    await waitFor(() => {
      expect(result.current.formState.isValid).toBeFalsy();
      expect(result.current.formState.errors.firstName?.message).toEqual('firstName is a required field');
      expect(result.current.formState.errors.lastName?.message).toEqual('lastName is a required field');
    });
  });

  it('is invalid when submitting partly', async () => {
    const hook = init({
      defaultValues: { firstName: defaultValues.firstName },
    });
    const { result } = hook;

    await submitForm(hook);

    await waitFor(() => {
      expect(result.current.formState.isValid).toBeFalsy();
      expect(result.current.formState.errors.firstName).toBeUndefined();
      expect(result.current.formState.errors.lastName?.message).toEqual('lastName is a required field');
    });
  });

  it('is valid when submitting filled', async () => {
    const hook = init({ defaultValues });
    const { result } = hook;

    await submitForm(hook);

    await waitFor(() => {
      expect(result.current.formState.isValid).toBeTruthy();
      expect(result.current.formState.errors.firstName).toBeUndefined();
      expect(result.current.formState.errors.lastName).toBeUndefined();
    });
  });

  it('is calling onSubmit when submitting a valid form', async () => {
    const onSubmit = vi.fn();
    const hook = init({ defaultValues, onSubmit });

    await submitForm(hook);

    await waitFor(() => {
      expect(hook.result.current.formState.isValid).toBeTruthy();
    });

    await submitForm(hook);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenLastCalledWith({ firstName: 'John', lastName: 'Doe' }, { preventDefault }, undefined);
      expect(preventDefault).toHaveBeenCalled();
    });
  });

  it('calls onChange with hook results when passed', async () => {
    const onSubmissionStateChange = vi.fn();

    act(() => {
      init({ defaultValues, onSubmissionStateChange, isSaving: true });
    });

    await waitFor(() => {
      expect(onSubmissionStateChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          formProps: expect.objectContaining({ isReadOnly: true }),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          submitButtonProps: expect.objectContaining({ isLoading: true }),
          cancelButtonProps: { isDisabled: true },
        })
      );
    });
  });

  it('calls onSubmit with correct target when submitting a valid form', async () => {
    const onSubmit = vi.fn();
    const target = 'some_target';

    render(<TestForm target={target} onSubmit={onSubmit} />);

    expect(screen.getByTestId('form')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('form-button'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenLastCalledWith({}, expect.anything(), target);
    });
  });

  it('clears target after submitting a valid form', async () => {
    const onSubmit = vi.fn();
    const target = 'some_target';

    render(<TestForm target={target} onSubmit={onSubmit} />);

    expect(screen.getByTestId('form')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('form-button'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({}, expect.anything(), target);
    });

    fireEvent.submit(screen.getByTestId('form'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({}, expect.anything(), undefined);
    });
  });

  it('calls onError when submitting an invalid form', async () => {
    const onError = vi.fn();
    const onSubmit = vi.fn();
    const hook = init({
      defaultValues: { firstName: defaultValues.firstName },
      onSubmit,
      onError,
    });

    await submitForm(hook);

    await waitFor(() => {
      expect(onError).toHaveBeenLastCalledWith(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        { lastName: expect.objectContaining({ type: 'required' }) },
        expect.anything()
      );
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  it('changes the form values when default values change and subscribing to the changes', async () => {
    const { result, rerender } = renderHook((props: Record<string, unknown>) =>
      useMelioForm({ schema, onSubmit: noop, defaultValues, subscribeToDefaultValuesChanges: true, ...props })
    );

    await waitFor(() => {
      expect(result.current.getValues()).toStrictEqual(defaultValues);
    });

    const newDefaultValues = { lastName: 'Tomeii' };

    rerender({ defaultValues: newDefaultValues });

    await waitFor(() => {
      expect(result.current.getValues()).toStrictEqual(newDefaultValues);
    });
  });

  it('should not change the form value when setting the `reset` callback `keepDirtyValues` flag', async () => {
    const hookOptions = {
      schema: object().shape({ firstName: string().required() }),
      onSubmit: vi.fn(),
      defaultValues: { firstName: 'John' },
      subscribeToDefaultValuesChanges: true,
      subscribeToDefaultValuesChangesOptions: { keepDirtyValues: false },
    };
    const { result } = renderHook(useMelioForm, { initialProps: hookOptions });

    render(
      <form onSubmit={vi.fn()}>
        <input {...result.current.register('firstName')} placeholder="First Name" />
        <button
          onClick={() => {
            result.current.reset({ firstName: 'John' }, { keepDirtyValues: true });
          }}
          type="button"
        >
          Reset
        </button>
        <input type="submit" />
      </form>
    );

    expect(screen.getByPlaceholderText('First Name')).toHaveValue('John');

    await userEvent.clear(screen.getByPlaceholderText('First Name'));
    await userEvent.type(screen.getByPlaceholderText('First Name'), 'Bill');

    expect(screen.getByPlaceholderText('First Name')).toHaveValue('Bill');

    // Attempt to reset the form field should not change the value.
    await userEvent.click(screen.getByText('Reset'));

    expect(screen.getByPlaceholderText('First Name')).toHaveValue('Bill');
  });

  it('does not change the form values when default values change and not subscribing to the changes', async () => {
    const { result, rerender } = renderHook((props: Record<string, unknown>) =>
      useMelioForm({ schema, onSubmit: noop, defaultValues, ...props })
    );

    await waitFor(() => {
      expect(result.current.getValues()).toStrictEqual(defaultValues);
    });

    const newDefaultValues = { lastName: 'Tomeii' };

    rerender({ defaultValues: newDefaultValues });

    await waitFor(() => {
      expect(result.current.getValues()).toStrictEqual(defaultValues);
    });
  });

  it('sets form inputs and buttons in saving mode', async () => {
    const hook = init({
      defaultValues,
      isSaving: true,
    });
    const { result } = hook;

    await submitForm(hook);

    await waitFor(() => {
      expect(result.current.formProps.isReadOnly).toBe(true);
      expect(result.current.submitButtonProps.isLoading).toBe(true);
      expect(result.current.cancelButtonProps.isDisabled).toBe(true);
    });
  });

  it('sets form inputs and buttons in loading form mode', async () => {
    const hook = init({
      defaultValues,
      isLoading: true,
    });
    const { result } = hook;

    await submitForm(hook);

    await waitFor(() => {
      expect(result.current.formProps.isReadOnly).toBe(true);
      expect(result.current.submitButtonProps.isDisabled).toBe(true);
    });
  });
});
