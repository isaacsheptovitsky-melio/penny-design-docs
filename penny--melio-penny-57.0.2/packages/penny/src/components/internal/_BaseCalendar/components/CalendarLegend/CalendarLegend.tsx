import { Box } from '@chakra-ui/react';
import { useHasOverflow } from '@melio/penny-utils';
import { forwardRef, useRef } from 'react';

import { useMultiStyleConfig } from '../../../../../theme/hooks/use-style-config';
import { Tooltip } from '../../../../dataDisplay';

export type CalendarLegendProps = {
  variant?: 'primary' | 'secondary' | 'today';
  label: string;
  date?: string;
  testId?: string;
  legendWidth?: 'fit-content' | 'full';
  legendMaxWidth?: string;
};

export const CalendarLegend = forwardRef<HTMLDivElement, CalendarLegendProps>(
  ({ label, date, variant = 'primary', legendWidth, legendMaxWidth = '100%', ...props }, ref) => {
    const styles = useMultiStyleConfig('CalendarLegend', { legendWidth, legendMaxWidth });
    const labelRef = useRef(null);
    const dateRef = useRef(null);

    const { hasOverflowX: labelHasOverflow } = useHasOverflow(labelRef);
    const { hasOverflowX: dateHasOverflow } = useHasOverflow(dateRef);

    const showTooltip = labelHasOverflow || dateHasOverflow;

    return (
      <Box __css={styles['container']} data-component="CalendarLegend" {...props} ref={ref}>
        <Box data-variant={variant} __css={styles['indicator']} />
        <Tooltip content={date ? `${label} - ${date}` : label} isEnabled={showTooltip}>
          <Box __css={styles['textContainer']}>
            <Box __css={styles['label']} as="span" ref={labelRef}>
              {label}
            </Box>
            {date ? (
              <Box __css={styles['date']} as="span" ref={dateRef}>
                {date}
              </Box>
            ) : null}
          </Box>
        </Tooltip>
      </Box>
    );
  }
);

CalendarLegend.displayName = 'CalendarLegend';
