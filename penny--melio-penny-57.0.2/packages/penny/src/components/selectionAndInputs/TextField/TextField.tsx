import { Box, forwardRef, Input as ChakraInput, InputGroup } from '@chakra-ui/react';
import { uniqueId, useTestId } from '@melio/penny-utils';
import { useMemo } from 'react';
import { conformToMask } from 'react-text-mask';

import { Typography } from '@/components/dataDisplay/typography';
import { Loader } from '@/components/foundations/Loader';
import { InputLeftElement } from '@/components/internal/InputLeftElement';
import { InputRightElement } from '@/components/internal/InputRightElement';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { getAriaProps, mergeRefs } from '@/utils';

import { useTextField } from './hooks/useTextField';
import { type _TextFieldProps as TextFieldProps } from './TextField.types';

/**
 * The Text Field component is a fundamental input element that allows users to enter and edit text.
 * It is used for capturing short textual input, such as names, email addresses, or search queries.
 */
export const TextField = forwardRef<TextFieldProps, 'input'>(
  (
    {
      leftElement,
      rightElement,
      size = 'large',
      isViewMode,
      isLoading,
      maskProps,
      containerRef = null,
      align,
      maxChars,
      'data-testid': dataTestId = 'text-field',
      ...otherProps
    },
    propRef
  ) => {
    const { ref, placeholderText, leftElementRef, rightElementRef, containerTargetRef, props } = useTextField({
      isLoading,
      isViewMode,
      maskProps,
      size,
      propRef,
      align,
      ...otherProps,
    });

    const getTestId = useTestId(dataTestId);
    const dataProps = Object.entries(props).reduce(
      (
        acc: Record<string, string | boolean | null | undefined>,
        [key, value]: [string, string | boolean | null | undefined]
      ) => {
        if (key.startsWith('data-')) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    const loaderId = useMemo(() => uniqueId('loader-'), []);
    const ariaDescribedby = getAriaProps('aria-describedby', [
      props['aria-describedby'],
      isLoading ? loaderId : undefined,
    ]);

    const styles = useMultiStyleConfig('Input', { size });

    if (isViewMode) {
      let value = props.value?.toString();

      if (maskProps?.mask) {
        value = conformToMask(props.value?.toString() ?? '', maskProps?.mask, { guide: false }).conformedValue;
      }

      return (
        <Typography.MainLabel
          ref={ref}
          {...dataProps}
          {...getTestId()}
          data-view-mode
          label={value}
          placeholder={placeholderText}
          shouldSupportEllipsis={false}
        />
      );
    }

    return (
      <InputGroup alignItems="center" ref={mergeRefs([containerRef, containerTargetRef])}>
        {!isViewMode && leftElement && (
          <InputLeftElement ref={leftElementRef} sx={styles['leftElement']} {...getTestId('left-element')}>
            {leftElement}
          </InputLeftElement>
        )}
        <ChakraInput {...props} {...getTestId()} maxLength={maxChars} textAlign={align} {...ariaDescribedby} />
        {(isLoading || rightElement) && (
          <InputRightElement
            ref={rightElementRef}
            sx={styles['rightElement']}
            onClick={isLoading ? undefined : otherProps.onClick}
            {...getTestId('right-element')}
          >
            {isLoading ? (
              <Box as={Loader} __css={styles['loader']} id={loaderId} {...getTestId('loader')} />
            ) : (
              !isViewMode && rightElement
            )}
          </InputRightElement>
        )}
      </InputGroup>
    );
  }
);

TextField.displayName = 'TextField';
