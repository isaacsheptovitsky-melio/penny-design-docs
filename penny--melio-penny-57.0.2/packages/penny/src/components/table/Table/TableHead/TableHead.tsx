import { Box, type BoxProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

type TableHeadProps = BoxProps & {
  isHeaderSticky?: boolean;
};

export const TableHead = forwardRef<HTMLDivElement, TableHeadProps>(({ isHeaderSticky, ...props }, ref) => {
  const style = useMultiStyleConfig('Table', {});
  return (
    <Box
      role="rowgroup"
      data-component="TableHead"
      data-testid="table-head"
      data-is-sticky={isHeaderSticky}
      {...props}
      ref={ref}
      __css={style['tableHead']}
    />
  );
});

TableHead.displayName = 'TableHead';
