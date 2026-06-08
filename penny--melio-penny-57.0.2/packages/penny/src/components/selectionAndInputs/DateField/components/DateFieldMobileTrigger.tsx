import { Box } from '@chakra-ui/react';
import { useMergeRefs } from '@floating-ui/react';
import { uniqueId, useTestId } from '@melio/penny-utils';
import type { ForwardedRef, MouseEventHandler } from 'react';
import { forwardRef, useMemo, useRef } from 'react';

import { ActionArea, useActionArea } from '@/components/accessibility/ActionArea';
import { Text } from '@/components/dataDisplay/Text';
import { Loader } from '@/components/foundations/Loader';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { getAriaProps } from '@/utils/getAriaProps';

import type { DateFieldInputProps } from './types';

export const DateFieldMobileTrigger = forwardRef<HTMLInputElement, Partial<DateFieldInputProps>>(
  (
    {
      rightElement,
      onClick,
      value,
      isTypable,
      isFocused,
      isOpen,
      placeholder,
      isViewMode,
      isReadOnly,
      isDisabled,
      isLoading,
      size,
      'data-testid': dataTestId = 'date-field',
      isInvalid,
      'aria-required': ariaRequired,
      ...otherProps
    },
    ref
  ) => {
    const styles = useMultiStyleConfig('DateField', { isTypable });
    const actionAreaRef = useRef<HTMLButtonElement>(null);

    const nonTypableFieldRef = useMergeRefs([ref as ForwardedRef<HTMLButtonElement>, actionAreaRef]);
    const getTestId = useTestId(dataTestId);

    const { actionAreaProps, containerProps } = useActionArea({
      ...(!isReadOnly && !isViewMode && !isLoading && { onClick: onClick as MouseEventHandler<HTMLButtonElement> }),
      isDisabled: isDisabled || isViewMode,
    });

    const loaderId = useMemo(() => uniqueId('loader-'), []);
    const ariaDescribedby = getAriaProps('aria-describedby', [isLoading ? loaderId : undefined]);

    return (
      <Box
        {...containerProps}
        __css={styles['trigger']}
        className={size}
        data-readonly={isLoading || isReadOnly || undefined}
        data-disabled={isDisabled || undefined}
        data-focus={isOpen || isFocused || null}
        data-view-mode={isViewMode}
        data-invalid={isInvalid || undefined}
        {...otherProps}
      >
        <ActionArea
          data-component="DateField"
          aria-haspopup="dialog"
          aria-busy={isLoading || undefined}
          aria-readonly={isLoading || isReadOnly || undefined}
          aria-disabled={isDisabled || undefined}
          aria-required={ariaRequired || undefined}
          aria-expanded={isOpen}
          {...getTestId()}
          {...actionAreaProps}
          {...ariaDescribedby}
          ref={nonTypableFieldRef}
        />
        {value ? (
          <Text textStyle="inline" color="inherit" shouldSupportEllipsis>
            {value}
          </Text>
        ) : (
          <Text textStyle="inline" color={isDisabled ? 'semantic.text.disabled' : 'semantic.text.secondary'}>
            {placeholder}
          </Text>
        )}
        <Box position="relative">{isLoading ? <Loader id={loaderId} /> : !isViewMode && rightElement}</Box>
      </Box>
    );
  }
);

DateFieldMobileTrigger.displayName = 'DateFieldMobileTrigger';
