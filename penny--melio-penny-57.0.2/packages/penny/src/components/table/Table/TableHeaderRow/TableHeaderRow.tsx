import { Box, type BoxProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

type TableHeaderRowProps = BoxProps;

export const TableHeaderRow = forwardRef<HTMLDivElement, TableHeaderRowProps>((props, ref) => {
  const style = useMultiStyleConfig('Table', {});

  return <Box role="row" __css={style['headerRow']} data-component="TableHeaderRow" {...props} ref={ref} />;
});

TableHeaderRow.displayName = 'TableHeaderRow';
