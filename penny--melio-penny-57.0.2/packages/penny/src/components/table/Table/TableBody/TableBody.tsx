import { Box, type BoxProps } from '@chakra-ui/react';
import { useScrollWidth } from '@melio/penny-utils';
import { forwardRef, useImperativeHandle } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

type TableBodyProps = BoxProps & { isLoading?: boolean };

export const TableBody = forwardRef<HTMLDivElement, TableBodyProps>(({ isLoading, ...props }, propRef) => {
  const { ref, scrollWidth } = useScrollWidth();

  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(propRef, () => ref.current);

  const style = useMultiStyleConfig('Table', { tableWidth: scrollWidth, isLoading });

  return <Box ref={ref} role="rowgroup" data-component="TableBody" __css={style['tableBody']} {...props} />;
});

TableBody.displayName = 'TableBody';
