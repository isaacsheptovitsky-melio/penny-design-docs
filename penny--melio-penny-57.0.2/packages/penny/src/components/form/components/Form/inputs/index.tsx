import { type ForwardRefExoticComponent, type RefAttributes } from 'react';

import { _ContentBox as ContentBox } from '@/components/internal/_ContentBox';
import { AmountField } from '@/components/selectionAndInputs/AmountField';
import { Checkbox } from '@/components/selectionAndInputs/Checkbox';
import { DateField } from '@/components/selectionAndInputs/DateField';
import { FileUpload } from '@/components/selectionAndInputs/FileUpload';
import {
  MultiSelect,
  type MultiSelectOption,
  type MultiSelectProps,
} from '@/components/selectionAndInputs/MultiSelect';
import { PhoneField } from '@/components/selectionAndInputs/PhoneField';
import { RadioGroup } from '@/components/selectionAndInputs/RadioGroup';
import { Search } from '@/components/selectionAndInputs/Search';
import { SecuredTextField } from '@/components/selectionAndInputs/SecuredTextField';
import { Select } from '@/components/selectionAndInputs/Select';
import { SelectNew, type SelectNewOption, type SelectNewProps } from '@/components/selectionAndInputs/SelectNew';
import { Switch } from '@/components/selectionAndInputs/Switch';
import { TextArea } from '@/components/selectionAndInputs/TextArea';
import { TextField, type TextFieldProps } from '@/components/selectionAndInputs/TextField';

import {
  type FormAmountFieldProps,
  type FormCheckboxProps,
  type FormDateFieldProps,
  type FormFileUploadProps,
  type FormMultiSelectProps,
  type FormPhoneFieldProps,
  type FormRadioGroupProps,
  type FormSearchProps,
  type FormSecuredTextFieldProps,
  type FormSelectNewProps,
  type FormSelectProps,
  type FormSwitchProps,
  type FormTextAreaProps,
  type FormTextFieldProps,
} from './types';
import { createFormFieldInput } from './utils';

// This is exported as a workaround for moving the form widgets from Penny to app.
// This correct way of doing things will be to enable adding logic on top of `Form.X` components
export { createFormFieldInput as _createFormFieldInput };

type FormFieldType<P> = ForwardRefExoticComponent<P & RefAttributes<HTMLInputElement>>;

export const inputs = {
  /**
   * @deprecated Please use `<FormField>` instead and pass `<TextField/>` to render prop.
   */
  TextField: createFormFieldInput(
    TextField as ForwardRefExoticComponent<TextFieldProps>
  ) as FormFieldType<FormTextFieldProps>,
  /**
   * @deprecated Please use `<FormField>` instead and pass `<TextArea/>` to render prop.
   */
  TextArea: createFormFieldInput(
    TextArea as ForwardRefExoticComponent<FormTextAreaProps>
  ) as FormFieldType<FormTextAreaProps>,
  /**
   * @deprecated Please use `<FormField>` instead and pass `<SecuredTextField/>` to render prop.
   */
  SecuredTextField: createFormFieldInput(SecuredTextField) as FormFieldType<FormSecuredTextFieldProps>,
  /**
   * @deprecated Please use `<FormField>` instead and pass `<AmountField/>` to render prop.
   */
  AmountField: createFormFieldInput(AmountField) as FormFieldType<FormAmountFieldProps>,
  /**
   * @deprecated Please use `SelectNew` instead.
   */

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  Select: createFormFieldInput(Select) as FormFieldType<FormSelectProps>,
  /**
   * @deprecated Please use `<FormField>` instead and pass `<SelectNew/>` to render prop.
   */
  SelectNew: createFormFieldInput(
    SelectNew as unknown as ForwardRefExoticComponent<SelectNewProps<unknown, SelectNewOption<unknown>>>
  ) as FormFieldType<FormSelectNewProps>,
  /**
   * @deprecated Please use `<FormField>` instead and pass `<MultiSelect/>` to render prop.
   */
  MultiSelect: createFormFieldInput(
    MultiSelect as unknown as ForwardRefExoticComponent<MultiSelectProps<unknown, MultiSelectOption<unknown>>>
  ) as FormFieldType<FormMultiSelectProps>,
  /**
   * @deprecated Please use `Combobox` instead.
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  Search: createFormFieldInput(Search) as FormFieldType<FormSearchProps>,
  /**
   * @deprecated Please use `<FormField>` instead and pass `<RadioGroup/>` to render prop.
   */
  RadioGroup: createFormFieldInput(RadioGroup) as FormFieldType<FormRadioGroupProps>,
  /**
   * @deprecated Please use `<FormField>` instead and pass `<Checkbox/>` to render prop.
   */
  Checkbox: createFormFieldInput(Checkbox) as FormFieldType<FormCheckboxProps>,
  /**
   * @deprecated Please use `<FormField>` instead and pass `<DateField/>` to render prop.
   */
  DateField: createFormFieldInput(DateField) as FormFieldType<FormDateFieldProps>,
  /**
   * @deprecated Please use `<FormField>` instead and pass `<FileUpload/>` to render prop.
   */
  FileUpload: createFormFieldInput(FileUpload) as FormFieldType<FormFileUploadProps>,
  /**
   * @deprecated Please use `<FormField>` instead and pass `<PhoneField/>` to render prop.
   */
  PhoneField: createFormFieldInput(PhoneField) as FormFieldType<FormPhoneFieldProps>,
  /**
   * @deprecated Use `FormField` instead
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  ContentBox,
  /**
   * @deprecated Please use `<FormField>` instead  and pass `<Switch/>` to render prop.
   */
  Switch: createFormFieldInput(Switch as ForwardRefExoticComponent<FormSwitchProps>) as FormFieldType<FormSwitchProps>,
};
