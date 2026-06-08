import { type FormEvent, type MouseEvent, type RefObject } from 'react';
import {
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
  type SubmitErrorHandler,
  type SubmitHandler,
  type UseFormProps,
  type UseFormRegisterReturn,
  type UseFormReturn,
} from 'react-hook-form';
import { type SchemaOf } from 'yup';

import { type CommonInputProps } from '@/components/form/components/Form';

export type FormInputProps = UseFormRegisterReturn;

export type FormProps = Pick<CommonInputProps, 'autoComplete'>;

export type UseMelioFormResults<T extends FieldValues> = Omit<UseFormReturn<T>, 'handleSubmit'> & {
  registerField: (fieldName: Path<T>) => {
    error?: FieldError;
    control: Control<T>;
    name: Path<T>;
    id: Path<T>;
  };
  formProps: FormProps & {
    inputRef: RefObject<HTMLInputElement>;
    onSubmit: (e: FormEvent) => void;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isLoading?: boolean;
  };
  handleSubmit: (target?: string) => VoidFunction;
  submitButtonProps: {
    onClick: (event?: MouseEvent<HTMLButtonElement>, target?: string) => void;
    isDisabled: boolean;
    isLoading?: boolean;
  };
  cancelButtonProps: {
    isDisabled?: boolean;
  };
};

type SubmitHandlerParameters<T extends FieldValues> = Parameters<SubmitHandler<T>>;
type MelioSubmitHandler<T extends FieldValues> = (
  data: SubmitHandlerParameters<T>[0],
  event?: SubmitHandlerParameters<T>[1],
  target?: string
) => ReturnType<SubmitHandler<T>>;

export type UseMelioFormProps<T extends FieldValues> = MelioFormProps<T> & {
  schema?: SchemaOf<T>;
  onSubmit: MelioSubmitHandler<T>;
  onError?: SubmitErrorHandler<T>;
  isSaving?: boolean;
  isLoading?: boolean;
  autoFocus?: boolean;
  onSubmissionStateChange?: OnSubmissionStateChange<T>;
  subscribeToDefaultValuesChanges?: boolean;
  subscribeToDefaultValuesChangesOptions?: {
    keepDirtyValues: boolean;
  };
  showOptionalIndicator?: boolean;
};

export type MelioFormProps<T extends FieldValues = FieldValues> = Omit<UseFormProps<T>, 'resolver'>;

export type OnSubmissionStateChange<T extends FieldValues> = (Data: UseMelioFormResults<T>) => void;
