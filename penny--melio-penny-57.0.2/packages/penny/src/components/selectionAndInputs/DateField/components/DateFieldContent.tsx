import { Box } from '@chakra-ui/react';
import { forwardRef } from 'react';

import { Card } from '@/components/containers/cards/Card';
import { Group } from '@/components/containers/Group';
import { Divider } from '@/components/dataDisplay/Divider';
import { _BaseCalendar } from '@/components/internal/_BaseCalendar';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import type { DateFieldContentProps } from './types';

export const DateFieldContent = forwardRef<HTMLInputElement, DateFieldContentProps>(
  ({ footer, isTypable, onSelect, selectedDate, ...otherProps }, ref) => {
    const styles = useMultiStyleConfig('DateField', { isTypable });
    return (
      <Box as={Card} __css={styles['popover']} ref={ref}>
        <Group variant="vertical" spacing="none">
          {/* We need to wrap the calendar so it would render its `YearSelection` properly */}
          <Box __css={styles['calendar']}>
            <_BaseCalendar selectedDate={selectedDate} onSelect={onSelect} {...otherProps} />
          </Box>
          {footer && (
            <>
              <Divider />
              {footer}
            </>
          )}
        </Group>
      </Box>
    );
  }
);

DateFieldContent.displayName = 'DateFieldContent';
