import { type TestIdProp } from '@melio/penny-utils';
import {
  type Dispatch,
  type FocusEvent,
  type MouseEvent,
  type MutableRefObject,
  type ReactElement,
  type RefObject,
  type SetStateAction,
} from 'react';

import type { FormSize } from '@/theme/utils/form.utils';

import type { _BaseCalendarProps } from '../../../internal';
import type { DateFieldProps, DateValidationReasonKey } from '../DateField.types';

export type DateFieldRightElementProps = TestIdProp &
  Pick<DateFieldProps, 'clearDateAriaLabel' | 'hideClear' | 'isDisabled' | 'isTypable' | 'isReadOnly'> & {
    inputRef: MutableRefObject<HTMLInputElement | undefined>;
    inputValue: string;
    isEnabled: boolean;
    onClear: (event: MouseEvent<HTMLButtonElement>) => void;
    setActiveElement: Dispatch<SetStateAction<Element | null>>;
    trigger: ReactElement;
  };

export type DateFieldInputProps = Omit<DateFieldProps, 'onChange' | 'isOpen' | 'value'> & {
  value?: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  isEnabled: boolean;
  displayTypableMode: boolean;
  onInputBlur: (event: FocusEvent<HTMLInputElement>) => void;
  inputRef: MutableRefObject<HTMLInputElement | undefined>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isFocused: boolean;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
  setActiveElement: Dispatch<SetStateAction<Element | null>>;
  containerRef: RefObject<HTMLDivElement>;
  rightElement: ReactElement;
  onDateValidationError?: (reason?: DateValidationReasonKey) => void;
};

export type DateFieldContentProps = TestIdProp &
  Pick<DateFieldProps, 'isTypable' | 'footer'> &
  Pick<_BaseCalendarProps, 'onSelect' | 'selectedDate'>;

export type DateFieldDesktopTriggerProps = Omit<DateFieldInputProps, 'rightElement' | 'containerRef'> & {
  size: FormSize;
  loaderId: string;
};
