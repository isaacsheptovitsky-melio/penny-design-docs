import { Box, forwardRef, Grid } from '@chakra-ui/react';
import { useRef } from 'react';

import { Text } from '@/components/dataDisplay/Text/Text';
import { Tooltip } from '@/components/dataDisplay/Tooltip/Tooltip';
import { Icon } from '@/components/foundations/Icon/Icon';
import { useStyleConfig } from '@/theme/hooks/use-style-config';
import { mergeRefs } from '@/utils/merge-refs';

import { useTableContext } from '../hooks/useTableContext';
import { TableHeaderCell } from '../TableHeaderCell/TableHeaderCell';
import { TableHeaderCellDescription } from '../TableHeaderCellDescription/TableHeaderCellDescription';

export type TableHeaderMenuTriggerCellProps = {
  label: string;
  onClick: VoidFunction;
  isMenuOpen?: boolean;
  description?: string;
  tooltipLabel?: string;
};

export const TableHeaderMenuTriggerCell = forwardRef<TableHeaderMenuTriggerCellProps, 'div'>(
  ({ label, isMenuOpen, description, tooltipLabel, ...restProps }, propRef) => {
    const { headerVariant } = useTableContext();
    const style = useStyleConfig('TableMenuTriggerHeaderCell', {
      variant: headerVariant,
    });

    const menuTriggerHeaderRef = useRef<HTMLDivElement>(null);
    const ref = mergeRefs([menuTriggerHeaderRef, propRef]);

    return (
      <Tooltip content={tooltipLabel ?? ''} isEnabled={!!tooltipLabel && !isMenuOpen}>
        <TableHeaderCell data-component="TableHeaderMenuTriggerCell" as="button" {...restProps} ref={ref}>
          <Box __css={style}>
            <Grid templateColumns="1fr auto" columnGap="m" rowGap="xxxs" alignItems="center" width="100%">
              <Text textStyle="body3Semi" color="inherit">
                {label}
              </Text>
              <Icon type={isMenuOpen ? 'caret-up' : 'caret-down'} size="small" color="inherit" aria-hidden />
              {description && <TableHeaderCellDescription text={description} />}
            </Grid>
          </Box>
        </TableHeaderCell>
      </Tooltip>
    );
  }
);

TableHeaderMenuTriggerCell.displayName = 'TableHeaderMenuTriggerCell';
