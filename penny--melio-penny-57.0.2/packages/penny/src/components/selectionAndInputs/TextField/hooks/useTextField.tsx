import { type InputProps as ChakraInputProps } from '@chakra-ui/react';
import { useMergeRefs } from '@floating-ui/react';
import { isEmpty, useIntersectionObserver } from '@melio/penny-utils';
import { type ForwardedRef, type MutableRefObject, useEffect, useRef } from 'react';
import MaskedInput, { type MaskedInputProps } from 'react-text-mask';

import { useFormControlContext } from '@/components/internal/FormControl';
import { getPlaceholder } from '@/components/selectionAndInputs/utils';

import { calculateRightLeftPadding as calculateRightPadding } from '../../utils/calculateRightLeftPadding';
import { type TextFieldProps } from '../TextField.types';
import { useElementRef } from './useElementRef';

type UseTextFieldType = TextFieldProps & { propRef: ForwardedRef<HTMLInputElement> };

type UseTextFieldResult = {
  ref: ReturnType<typeof useMergeRefs>;
  placeholderText: string | undefined;
  leftElementRef: ReturnType<typeof useElementRef>['elementRef'];
  rightElementRef: ReturnType<typeof useElementRef>['elementRef'];
  containerTargetRef: ReturnType<typeof useIntersectionObserver>['targetRef'];
  props: ChakraInputProps;
};

export const useTextField = ({
  isLoading,
  isViewMode,
  maskProps,
  align,
  placeholder,
  viewModePlaceholder,
  propRef,
  autoFocus,
  isDisabled,
  isReadOnly,
  size,
  'aria-required': ariaRequired,
  isRequired,
  ...otherProps
}: UseTextFieldType): UseTextFieldResult => {
  const inputRef = useRef<HTMLElement>();
  const ref = useMergeRefs([inputRef, propRef]);
  const { targetRef: containerTargetRef, isVisible: isContainerVisible } = useIntersectionObserver();

  const isFormContext = !isEmpty(useFormControlContext());
  const placeholderText = getPlaceholder(placeholder, viewModePlaceholder, isViewMode, isFormContext);

  const { elementRef: leftElementRef, elementWidth: leftElementWidth } = useElementRef([isLoading, isContainerVisible]);
  const { elementRef: rightElementRef, elementWidth: rightElementWidth } = useElementRef([
    isLoading,
    isContainerVisible,
  ]);

  useEffect(() => {
    inputRef.current?.setAttribute('aria-invalid', otherProps.isInvalid ? 'true' : 'false');
  }, [otherProps.isInvalid]);

  const { paddingLeft, paddingRight } = calculateRightPadding({ leftElementWidth, rightElementWidth, align });

  const inputMaskProps = {
    as: MaskedInput,
    guide: false,
    ref: (textMaskClass: MaskedInput) => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(textMaskClass?.inputElement);
        } else if (typeof ref === 'object') {
          // TODO:https://meliorisk.atlassian.net/browse/ME-110373
          // eslint-disable-next-line react-hooks/immutability
          (ref as MutableRefObject<HTMLElement | null>).current = textMaskClass?.inputElement;
        }
      }
    },
    ...maskProps,
  } as MaskedInputProps;

  const sharedProps = {
    ref,
    'data-component': 'TextField',
    autoFocus,
    'data-loading': isLoading || undefined,
    isDisabled,
    // We need to mark the input as readOnly when it's in view mode for accessibility reasons.
    isReadOnly: isReadOnly || isLoading || isViewMode,
    className: size,
    textAlign: align,
    placeholder: placeholderText,
    'aria-label': 'text field input',
    ...otherProps,
    paddingLeft,
    paddingRight,
    isRequired: (ariaRequired as boolean) || isRequired,
  };

  const props = maskProps ? { ...sharedProps, ...inputMaskProps } : sharedProps;

  return {
    ref,
    placeholderText,
    leftElementRef,
    rightElementRef,
    containerTargetRef,
    props,
  };
};
