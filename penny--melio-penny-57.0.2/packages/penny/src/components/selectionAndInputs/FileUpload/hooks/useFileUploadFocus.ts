import { useAutoFocus } from '@melio/penny-utils';
import {
  type FocusEvent,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type RefObject,
  useRef,
  useState,
} from 'react';

type UseFileUploadFocusOptions = Pick<
  HTMLAttributes<HTMLInputElement>,
  'onFocus' | 'onBlur' | 'onMouseDown' | 'onKeyDown' | 'autoFocus'
>;

type UseFileUploadFocusReturn = {
  inputRef: RefObject<HTMLInputElement>;
  filePreviewRef: RefObject<HTMLDivElement>;
  isInputFocuseVisible: boolean;
} & Pick<HTMLAttributes<HTMLInputElement>, 'onFocus' | 'onBlur' | 'onMouseDown' | 'onKeyDown'>;

export const useFileUploadFocus = ({
  autoFocus,
  onFocus,
  onBlur,
  onKeyDown,
  onMouseDown,
}: UseFileUploadFocusOptions): UseFileUploadFocusReturn => {
  const [isInputFocuseVisible, setIsInputFocuseVisible] = useState(false);
  const [isKeyboardFocusDetection, setIsKeyboardFocusDetection] = useState(true);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const filePreviewRef = useRef<HTMLDivElement | null>(null);

  useAutoFocus(inputRef, autoFocus);

  const handleMouseDown = (event: MouseEvent<HTMLInputElement>) => {
    setIsKeyboardFocusDetection(false);

    onMouseDown?.(event);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Tab') {
      setIsKeyboardFocusDetection(true);
    }

    onKeyDown?.(event);
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (isKeyboardFocusDetection) {
      setIsInputFocuseVisible(true);
    }
    onFocus?.(event);
  };
  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setIsInputFocuseVisible(false);
    onBlur?.(event);
  };

  return {
    inputRef,
    filePreviewRef,
    isInputFocuseVisible,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
    onMouseDown: handleMouseDown,
  };
};
