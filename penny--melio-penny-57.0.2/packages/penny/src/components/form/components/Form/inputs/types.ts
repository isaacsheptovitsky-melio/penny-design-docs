import { type Control } from 'react-hook-form';

import type { _FormFieldProps } from '@/components/internal/_FormField';
import type { AmountFieldProps } from '@/components/selectionAndInputs/AmountField';
import type { CheckboxProps } from '@/components/selectionAndInputs/Checkbox';
import type { ComboboxOption, ComboboxProps, ComboboxSection } from '@/components/selectionAndInputs/Combobox';
import type { DateFieldProps } from '@/components/selectionAndInputs/DateField';
import type { FileUploadProps } from '@/components/selectionAndInputs/FileUpload';
import type {
  MultiSelectOption,
  MultiSelectProps,
  MultiSelectSection,
} from '@/components/selectionAndInputs/MultiSelect';
import type { PhoneFieldProps } from '@/components/selectionAndInputs/PhoneField';
import type { RadioGroupProps } from '@/components/selectionAndInputs/RadioGroup';
import type { SearchProps } from '@/components/selectionAndInputs/Search';
import type { SecuredTextFieldProps } from '@/components/selectionAndInputs/SecuredTextField';
import type { SelectProps } from '@/components/selectionAndInputs/Select';
import type { SelectNewOption, SelectNewProps, SelectNewSection } from '@/components/selectionAndInputs/SelectNew';
import { type SwitchProps } from '@/components/selectionAndInputs/Switch';
import type { TextAreaProps } from '@/components/selectionAndInputs/TextArea';
import type { TextFieldProps } from '@/components/selectionAndInputs/TextField';

type GlobalInputProps = {
  placeholder?: string;
  viewModePlaceholder?: string;
};

export type CommonInputProps = {
  autoFocus?: boolean;
  id?: string;
  autoComplete?: string;
};

export type ControlProps = {
  // Unfortunately, giving a generic to the Control results in an error
  // "RangeError: Value undefined out of range for undefined options property undefined"
  // So for now this will stay `any`
  // https://stackoverflow.com/questions/67780152/how-to-find-the-cause-for-an-undescriptive-typescript-compiler-error
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  placeholder?: string;
};

export type DeprecatedFormFieldProps<P> = _FormFieldProps & P & ControlProps & GlobalInputProps;

export type FormTextFieldProps = DeprecatedFormFieldProps<TextFieldProps>;
export type FormSecuredTextFieldProps = DeprecatedFormFieldProps<SecuredTextFieldProps>;
export type FormAmountFieldProps = DeprecatedFormFieldProps<AmountFieldProps>;
export type FormPhoneFieldProps = DeprecatedFormFieldProps<PhoneFieldProps>;
export type FormDateFieldProps = DeprecatedFormFieldProps<DateFieldProps>;
/**
 * @deprecated Please use `SelectNewProps` instead.
 */

// eslint-disable-next-line @typescript-eslint/no-deprecated
export type FormSelectProps = DeprecatedFormFieldProps<SelectProps>;
export type FormSelectNewOption<V = string> = SelectNewOption<V>;
export type FormSelectNewSection<
  V = string,
  O extends FormSelectNewOption<V> = FormSelectNewOption<V>,
> = SelectNewSection<V, O>;
export type FormSelectNewProps<
  V = string,
  O extends FormSelectNewOption<V> = FormSelectNewOption<V>,
> = DeprecatedFormFieldProps<SelectNewProps<V, O>>;
export type FormMultiSelectOption<V = string> = MultiSelectOption<V>;
export type FormMultiSelectSection<
  V = string,
  O extends FormMultiSelectOption<V> = FormMultiSelectOption<V>,
> = MultiSelectSection<V, O>;
export type FormMultiSelectProps<
  V = string,
  O extends FormMultiSelectOption<V> = FormMultiSelectOption<V>,
> = DeprecatedFormFieldProps<MultiSelectProps<V, O>>;
export type FormComboboxOption<V = string> = ComboboxOption<V>;
export type FormComboboxSection<V = string, O extends FormComboboxOption<V> = FormComboboxOption<V>> = ComboboxSection<
  V,
  O
>;
export type FormComboboxProps<
  V = string,
  O extends FormComboboxOption<V> = FormComboboxOption<V>,
> = DeprecatedFormFieldProps<ComboboxProps<V, O>>;
// eslint-disable-next-line @typescript-eslint/no-deprecated
export type FormSearchProps = DeprecatedFormFieldProps<SearchProps>;
export type FormRadioGroupProps = DeprecatedFormFieldProps<RadioGroupProps>;
export type FormFileUploadProps = DeprecatedFormFieldProps<FileUploadProps>;
export type FormTextAreaProps = DeprecatedFormFieldProps<TextAreaProps>;
export type FormCheckboxProps = DeprecatedFormFieldProps<CheckboxProps>;
export type FormSwitchProps = DeprecatedFormFieldProps<SwitchProps>;
