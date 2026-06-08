import { type KeyboardEvent, useCallback } from 'react';

type UseKeyDownProps = {
  handleArrowKey?: (key: ArrowKeyType) => void;
  handleSelectKey?: (key: SelectKeyType) => void;
  handleFocus?: () => void;
  handleBlur?: () => void;
  handleEscape?: () => void;
};

const arrowKeyArray = [
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'Home',
  'End',
  'PageUp',
  'PageDown',
  'PageDown + Shift',
  'PageUp + Shift',
];
export type ArrowKeyType = (typeof arrowKeyArray)[number];
const isArrowKey = (code: string, callback?: UseKeyDownProps['handleArrowKey']): code is ArrowKeyType =>
  !!(callback && arrowKeyArray.includes(code));

const selectKeyArray = ['Enter', 'Space'];
export type SelectKeyType = (typeof selectKeyArray)[number];
const isSelectKey = (code: string, callback?: UseKeyDownProps['handleSelectKey']): code is SelectKeyType =>
  !!(callback && selectKeyArray.includes(code));

type TabKeyType = 'Tab';
const isTabKey = (code: string, callback?: UseKeyDownProps['handleFocus']): code is TabKeyType =>
  !!(callback && code === 'Tab');

type ShiftTabKeyType = 'Tab + Shift';
const isShiftTabKey = (code: string, callback?: UseKeyDownProps['handleBlur']): code is ShiftTabKeyType =>
  !!(callback && code === 'Tab + Shift');

type EscapeKeyType = 'Escape';
const isEscapeKey = (code: string, callback?: UseKeyDownProps['handleEscape']): code is EscapeKeyType =>
  !!(callback && code === 'Escape');

const getKey = (event: KeyboardEvent<HTMLDivElement>) => (event.shiftKey ? `${event.code} + Shift` : event.code);

/**
 * useKeyDown - A hook that provides keyboard event handling. can be used for arrows navigation, etc.
 *
 * It accepts an optional callback functions:
 * - `handleArrowKey` that is called when an arrow key is pressed.
 * - `handleSelectKey` that is called when an `Enter` or `Space` is pressed.
 * - `handleFocus` that is called when a `Tab` is pressed.
 * - `handleBlur` that is called when a `Shift + Tab` is pressed.
 * - `handleEscape` that is called when an `Escape` is pressed.
 */
export const useKeyDown = ({
  handleArrowKey,
  handleSelectKey,
  handleFocus,
  handleBlur,
  handleEscape,
}: UseKeyDownProps) => {
  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      switch (true) {
        case isArrowKey(getKey(event), handleArrowKey):
          event.preventDefault();
          handleArrowKey?.(getKey(event));
          break;
        case isSelectKey(event.code, handleSelectKey):
          event.preventDefault();
          handleSelectKey?.(event.code);
          break;
        case isTabKey(getKey(event), handleFocus):
          event.preventDefault();
          handleFocus?.();
          break;
        case isShiftTabKey(getKey(event), handleBlur):
          event.preventDefault();
          handleBlur?.();
          break;
        case isEscapeKey(event.code, handleEscape):
          event.preventDefault();
          handleEscape?.();
          break;
        default:
          break;
      }
    },
    [handleArrowKey, handleSelectKey, handleFocus, handleBlur, handleEscape]
  );

  return { onKeyDown };
};
