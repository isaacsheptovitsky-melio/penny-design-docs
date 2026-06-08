import { Box, forwardRef } from '@chakra-ui/react';
import { uniqueId, useBoolean } from '@melio/penny-utils';
import { type SortDirection } from '@tanstack/react-table';
import type { ReactNode } from 'react';
import { useCallback, useMemo, useRef } from 'react';

import { VisuallyHidden } from '@/components/accessibility/VisuallyHidden';
import { Group } from '@/components/containers/Group/Group';
import { Text } from '@/components/dataDisplay/Text/Text';
import { Icon } from '@/components/foundations/Icon/Icon';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import type { IconKey } from '@/theme/icons/icons.generated.types';
import { mergeRefs } from '@/utils/merge-refs';

import { useDelayedAriaId } from '../hooks/useDelayedAriaId';
import { type ColTextAlign } from '../Table.types';
import { TableHeaderCell } from '../TableHeaderCell/TableHeaderCell';
type HeaderSortDirection = 'none' | 'desc' | 'asc';

export type TableHeaderSortableCellProps = {
  children?: ReactNode;
  onClick?: (sortDirection: SortDirection | undefined) => void;
  sortDirection?: SortDirection;
  initialSortDirection?: SortDirection;
  textAlign?: ColTextAlign;
  instructionsText?: string;
};

export const TableHeaderSortableCell = forwardRef<TableHeaderSortableCellProps, 'div'>(
  (
    {
      onClick,
      children,
      sortDirection,
      textAlign = 'start',
      initialSortDirection = 'desc',
      instructionsText = 'Press enter to change sorting',
      'aria-labelledby': ariaLabelledBy,
      ...restProps
    },
    propRef
  ) => {
    const [isHovered, setIsHovered] = useBoolean(false);
    const isSorting = !!sortDirection;

    const style = useMultiStyleConfig('TableHeaderSortableCell', {
      textAlign,
    });
    const sortDirections: HeaderSortDirection[] = useMemo(
      () => (initialSortDirection === 'desc' ? ['none', 'desc', 'asc'] : ['none', 'asc', 'desc']),
      [initialSortDirection]
    );
    const sortDirectionIcons: Record<HeaderSortDirection, IconKey> = {
      none: 'chevron-sort-vertical',
      desc: 'arrow-down',
      asc: 'arrow-up',
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const sortDirIndex = useMemo(() => sortDirections.indexOf(sortDirection ?? 'none'), [sortDirection]);
    const nextSortDirection = useMemo(
      () =>
        (sortDirIndex === sortDirections.length - 1
          ? sortDirections[0]
          : sortDirections[sortDirIndex + 1]) as HeaderSortDirection,
      [sortDirIndex, sortDirections]
    );

    const sortIcon = sortDirectionIcons[sortDirection || 'none'];
    const nextSortIcon = sortDirectionIcons[nextSortDirection];
    const stateBySortDirection: Record<SortDirection, string> = {
      asc: 'sorted ascending',
      desc: 'sorted descending',
    };
    const sortState = sortDirection ? stateBySortDirection[sortDirection] : undefined;

    const handleSort = useCallback(() => {
      onClick?.(nextSortDirection === 'none' ? undefined : nextSortDirection);
    }, [onClick, nextSortDirection]);

    const sortableHeaderCellRef = useRef<HTMLButtonElement>(null);
    const ref = mergeRefs([sortableHeaderCellRef, propRef]);

    const childrenId = useRef(uniqueId('header-sortable-cell-children-'));
    const sortId = useRef(uniqueId('header-sortable-cell-sort-'));

    const { handleBlur, handleFocus, shouldShowId: shouldShowChildrenId, announceKey } = useDelayedAriaId();

    const sortCellAriaLabeledBy = useMemo(() => {
      const ids = [ariaLabelledBy, shouldShowChildrenId ? childrenId.current : undefined].filter(Boolean).join(' ');

      return ids ? { 'aria-labelledby': ids } : {};
    }, [ariaLabelledBy, shouldShowChildrenId]);

    const cellContentColor = isSorting || isHovered ? 'semantic.text.primary' : 'semantic.text.secondary';

    return (
      <TableHeaderCell
        data-testid="header-sortable-cell"
        data-component="TableHeaderSortableCell"
        onClick={onClick && handleSort}
        ref={ref}
        onMouseOver={setIsHovered.on}
        onMouseOut={setIsHovered.off}
        data-hover={(onClick && isHovered) || undefined}
        data-selected={isSorting}
        textAlign={textAlign}
        {...sortCellAriaLabeledBy}
        onFocus={handleFocus}
        onBlur={handleBlur}
        as="button"
        {...restProps}
      >
        <Group spacing="xs" color={cellContentColor}>
          {typeof children === 'string' ? (
            <Text textStyle="inline" color="inherit" id={childrenId.current}>
              {children}
              <VisuallyHidden key={`${sortId.current}-${announceKey}`}>
                &nbsp;{sortState ?? instructionsText}
              </VisuallyHidden>
            </Text>
          ) : (
            <>
              {children}
              <VisuallyHidden key={`header-sortable-cell=${announceKey}-${sortId.current}`}>
                {sortState ?? instructionsText}
              </VisuallyHidden>
            </>
          )}
          <Box
            __css={style['icon']}
            data-hover={(onClick && isHovered) || undefined}
            data-testid={`header-sortable-cell-icon-${sortDirection}`}
          >
            <Icon
              type={!sortDirection && isHovered ? nextSortIcon : sortIcon}
              color="inherit"
              size="small"
              aria-hidden
            />
          </Box>
        </Group>
      </TableHeaderCell>
    );
  }
);

TableHeaderSortableCell.displayName = 'TableHeaderSortableCell';
