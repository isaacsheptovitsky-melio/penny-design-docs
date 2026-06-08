import { Box } from '@chakra-ui/react';
import { type ForwardedRef, forwardRef, type NamedExoticComponent } from 'react';

import { Container } from '@/components/containers/Container/Container';
import { Blanket } from '@/components/internal/Blanket/Blanket';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { useBreakpoint } from '@/theme/providers/BreakpointProvider';
import { useFocusManager } from '@/utils/useFocusManager';

import { DesktopTable } from './DesktopTable/DesktopTable';
import type { TableProps } from './Table.types';
import { shouldUseMobileView } from './Table.utils';
import { TableMobileContainer } from './TableMobileContainer/TableMobileContainer';

const TableComponent = <T,>(
  {
    getRowModel,
    onRowClick,
    isLoading,
    loadingRowIds = [],
    highlightedRowIds = [],
    mobileRowRenderer,
    isHeaderSticky,
    sortingState,
    getHeaderGroups,
    mobileViewBreakpoint = 'xs',
    ...restProps
  }: TableProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const { breakpoint } = useBreakpoint();
  const style = useMultiStyleConfig('Table', {});

  const tableProps = {
    getRowModel,
    onRowClick,
    isLoading,
    getHeaderGroups,
    isHeaderSticky,
  };

  const loaderRef = useFocusManager<HTMLDivElement>(isLoading);

  const isMobileView = shouldUseMobileView(breakpoint, mobileViewBreakpoint);

  return (
    <Container overflow="initial">
      {isMobileView && mobileRowRenderer ? (
        <TableMobileContainer
          {...tableProps}
          highlightedRowIds={highlightedRowIds}
          mobileRowRenderer={mobileRowRenderer}
        />
      ) : (
        <DesktopTable
          ref={ref}
          {...tableProps}
          loadingRowIds={loadingRowIds}
          highlightedRowIds={highlightedRowIds}
          {...restProps}
        />
      )}
      {isLoading && (
        <Box __css={style['loaderContainer']} ref={loaderRef}>
          <Blanket isOpen variant="light" isLoading />
        </Box>
      )}
    </Container>
  );
};

export const Table = forwardRef(TableComponent) as <T>(
  props: TableProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof TableComponent>;

(Table as NamedExoticComponent).displayName = 'Table';
