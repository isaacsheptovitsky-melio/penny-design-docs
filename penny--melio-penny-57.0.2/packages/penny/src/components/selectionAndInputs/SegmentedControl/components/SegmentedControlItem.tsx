import { Box } from '@chakra-ui/react';
import { uniqueId, useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { HiddenOptionInput } from '@/components/selectionAndInputs/HiddenOptionInput';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { useSegmentedControlContext } from '../SegmentedControlContext';
import { SegmentContent } from './SegmentContent';
import { type SegmentedControlItemProps } from './SegmentedControlItem.types';

export const SegmentedControlItem = forwardRef<HTMLInputElement, SegmentedControlItemProps>(
  (
    {
      checked,
      children,
      'data-testid': dataTestId = 'segmented-control.segment',
      size: sizeProps,
      id: idProps,
      ...props
    },
    ref
  ) => {
    const segmentContext = useSegmentedControlContext();

    const { name, size, type, disabled, readOnly, onChange } = { ...segmentContext, ...props };
    const getTestId = useTestId(dataTestId);
    const id = idProps ?? uniqueId();
    const styles = useMultiStyleConfig('SegmentedControl', {});

    return (
      <Box __css={styles['segmentedControlItem']}>
        <HiddenOptionInput
          ref={ref}
          selected={!!checked}
          onChange={onChange}
          id={id}
          {...props}
          type={type}
          name={name}
          disabled={disabled}
          readOnly={readOnly}
          {...getTestId()}
        >
          <SegmentContent
            size={size}
            selected={checked}
            disabled={disabled}
            readOnly={readOnly}
            {...getTestId('content')}
          >
            {children}
          </SegmentContent>
        </HiddenOptionInput>
      </Box>
    );
  }
);

SegmentedControlItem.displayName = 'SegmentedControlItem';
