import { forwardRef, type Ref } from 'react';

import { IconButton } from '@/components/action/IconButton';
import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { Tooltip } from '@/components/dataDisplay/Tooltip';

import { getEndIndex, getNextEnabled, getPreviousEnabled, getStartIndex } from './utils';

export type PaginationProps = {
  /** Function called on next/prev click. */
  onPageChange?: (newPageNumber: number) => void;
  /** Current page number. @default 1 */
  currentPage?: number;
  /** Total number of items in all pages combined. */
  totalItems: number;
  /** Number of items per single page. */
  pageSize: number;
  /** Determines whether the pagination component is disabled. */
  isDisabled?: boolean;
  /** Set aria-label for each chevron button. @default {} */
  ariaLabels?: { chevronLeftLabel?: string; chevronRightLabel?: string };
  /** A ref for the "previous" button. */
  previousButtonRef?: Ref<HTMLButtonElement>;
  /** A ref for the "next" button. */
  nextButtonRef?: Ref<HTMLButtonElement>;
};

/**
 * A pagination component that allows users to navigate through large sets of data by breaking them into pages.
 */
export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      onPageChange,
      currentPage = 1,
      totalItems,
      pageSize,
      ariaLabels,
      isDisabled,
      previousButtonRef,
      nextButtonRef,
      ...rest
    },
    ref
  ) => {
    const startIndex = getStartIndex(pageSize, currentPage, totalItems);
    const endIndex = getEndIndex(pageSize, currentPage, totalItems);
    const isPreviousEnabled = getPreviousEnabled(currentPage) && !isDisabled;
    const isNextEnabled = getNextEnabled(currentPage, totalItems, pageSize) && !isDisabled;
    // Github discussion: https://github.com/melio/penny/discussions/454
    // TODO: No localization inside components library (for now)
    const paginationText = `${startIndex}-${endIndex} of ${totalItems}`;

    return (
      <Group
        data-component="Pagination"
        alignItems="center"
        aria-label="Pagination"
        role="navigation"
        {...rest}
        ref={ref}
      >
        <Text textStyle="body4" data-testid="pagination-text">
          {paginationText}
        </Text>
        <Group spacing="xs-s">
          <Tooltip content="Previous page" dontDescribeChild isEnabled={!isDisabled}>
            <IconButton
              aria-label={ariaLabels?.chevronLeftLabel ?? 'Previous page'}
              data-testid="chevron-left"
              icon="chevron-left"
              variant="naked"
              size="extra-small"
              onClick={() => onPageChange?.(currentPage - 1)}
              isDisabled={!isPreviousEnabled}
              ref={previousButtonRef}
            />
          </Tooltip>
          <Tooltip content="Next page" dontDescribeChild isEnabled={!isDisabled}>
            <IconButton
              aria-label={ariaLabels?.chevronRightLabel ?? 'Next page'}
              data-testid="chevron-right"
              icon="chevron-right"
              variant="naked"
              size="extra-small"
              onClick={() => onPageChange?.(currentPage + 1)}
              isDisabled={!isNextEnabled}
              ref={nextButtonRef}
            />
          </Tooltip>
        </Group>
      </Group>
    );
  }
);

Pagination.displayName = 'Pagination';
