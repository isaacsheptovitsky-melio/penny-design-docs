import { createAmountFieldTestKit } from '../AmountField/createAmountFieldTestKit';
import { createCheckboxTestKit } from '../Checkbox/createCheckboxTestKit';
import { createComboboxTestKit } from '../Combobox/createComboboxTestKit';
import { createDateFieldTestKit } from '../DateField/createDateFieldTestKit';
import { createDropzoneTestKit } from '../Dropzone/createDropzoneTestKit';
import { createMultiSelectTestKit } from '../MultiSelect/createMultiSelectTestKit';
import { createPhoneFieldTestKit } from '../PhoneField/createPhoneFieldTestKit';
import { createRadioGroupTestKit } from '../RadioGroup/createRadioGroupTestKit';
import { createSecuredTextFieldTestKit } from '../SecuredTextField/createSecuredTextFieldTestKit';
import { createSegmentedControlTestKit } from '../SegmentedControl/createSegmentedControlTestKit';
import { createSelectNewTestKit } from '../SelectNew/createSelectNewTestKit';
import { createSwitchTestKit } from '../Switch/createSwitchTestKit';
import { createTextAreaTestKit } from '../TextArea/createTextAreaTestKit';
import { createTextFieldTestKit } from '../TextField/createTextFieldTestKit';
import { createVerificationCodeFieldTestKit } from '../VerificationCodeField/createVerificationCodeFieldTestKit';

export const formFieldTestKitMap = {
  TextField: createTextFieldTestKit,
  Dropzone: createDropzoneTestKit,
  TextArea: createTextAreaTestKit,
  Switch: createSwitchTestKit,
  SecuredTextField: createSecuredTextFieldTestKit,
  Checkbox: createCheckboxTestKit,
  Combobox: createComboboxTestKit,
  SegmentedControl: createSegmentedControlTestKit,
  SelectNew: createSelectNewTestKit,
  RadioGroup: createRadioGroupTestKit,
  DateField: createDateFieldTestKit,
  MultiSelect: createMultiSelectTestKit,
  PhoneField: createPhoneFieldTestKit,
  AmountField: createAmountFieldTestKit,
  VerificationCodeField: createVerificationCodeFieldTestKit,
};
