import { Box } from '@chakra-ui/react';
import { forwardRef } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { type TableRootProps } from '../Table.types';

export const TableRoot = forwardRef<HTMLDivElement, TableRootProps>(
  ({ isLoading, headerVariant, isHeaderSticky, ...props }, ref) => {
    const style = useMultiStyleConfig('Table', { isLoading });

    return (
      <Box __css={style['container']} data-testid="table-container" ref={ref} data-has-header-sticky={isHeaderSticky}>
        <Box role="table" data-component="TableRoot" __css={style['table']} {...props} />
      </Box>
    );
  }
);

TableRoot.displayName = 'TableRoot';
