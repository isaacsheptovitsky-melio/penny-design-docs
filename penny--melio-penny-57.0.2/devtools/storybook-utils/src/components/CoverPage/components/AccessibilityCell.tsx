import { Box } from '@chakra-ui/react';

import { Icon } from '../../Icon/Icon';
import { StatusIndicator, StatusIndicatorProps } from '../../StatusIndicator/StatusIndicator';
import { Tooltip } from '../../Tooltip';

export type AccessibilityType = 'AA standard' | 'Partially' | 'No';
type AccessibilityHeaderType = { headerTitle: string; type?: never };
type AccessibilityCellType = { type: AccessibilityType; headerTitle?: never };

export type AccessibilityCellProps = AccessibilityHeaderType | AccessibilityCellType;

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
};

export const AccessibilityCell = ({ headerTitle, type = 'No' }: AccessibilityCellProps) => {
  const accessibilityMap: Record<AccessibilityType, StatusIndicatorProps['status']> = {
    'AA standard': 'success',
    Partially: 'warning',
    No: 'error',
  };

  return (
    <Box data-component="AccessibilityCell" style={styles}>
      {headerTitle ? (
        <Tooltip label={headerTitle} placement="top">
          <Box style={styles}>
            {headerTitle}
            <Icon type="info" />
          </Box>
        </Tooltip>
      ) : (
        <>
          {type && accessibilityMap[type] && (
            <StatusIndicator status={accessibilityMap[type] as StatusIndicatorProps['status']} />
          )}
          {type}
        </>
      )}
    </Box>
  );
};

AccessibilityCell.displayName = 'AccessibilityCell';
