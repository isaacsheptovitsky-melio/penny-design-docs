import { Box } from '@chakra-ui/react';
import { useIntl } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { useMultiStyleConfig } from '../../../../../theme/hooks/use-style-config';
import { Text } from '../../../../dataDisplay';
import { Icon } from '../../../../foundations/Icon';
import { useCalendarContext } from '../../CalendarContext';
import { useKeyDown } from '../../hooks';
import { type YearSelectionHeaderTriggerProps } from './types';

export const YearSelectionHeaderTrigger = forwardRef<HTMLDivElement, YearSelectionHeaderTriggerProps>(
  ({ activeMonth, toggleYearSelection, ...props }, ref) => {
    const { size, isMobileDatePicker, showYearSelection, disableYearSelection } = useCalendarContext();
    const { formatDate } = useIntl();
    const title = formatDate(activeMonth.date, { month: 'long', year: 'numeric' });
    const styles = useMultiStyleConfig('_BaseCalendar', { isMobileDatePicker, size });
    const titleElement = (
      <Text as="h2" textStyle="body3Semi" aria-live="polite">
        {title}
      </Text>
    );

    const { onKeyDown } = useKeyDown({
      handleEscape: () => toggleYearSelection(false),
    });

    return (
      <Box __css={styles['yearSelectionHeader']}>
        {titleElement}
        {!disableYearSelection && (
          <Box
            as="button"
            aria-expanded={showYearSelection}
            __css={styles['yearSelectionHeaderTrigger']}
            onClick={() => toggleYearSelection(!showYearSelection)}
            ref={ref}
            aria-label="Change month or year"
            onKeyDown={onKeyDown}
            tabIndex={0}
            {...props}
          >
            <Icon type={showYearSelection ? 'caret-up' : 'caret-down'} size="large" color="inherit" aria-hidden />
          </Box>
        )}
      </Box>
    );
  }
);

YearSelectionHeaderTrigger.displayName = 'YearSelectionHeaderTrigger';
