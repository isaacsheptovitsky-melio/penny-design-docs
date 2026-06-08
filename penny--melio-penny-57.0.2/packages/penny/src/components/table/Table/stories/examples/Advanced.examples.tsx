import type { TestIdProp } from '@melio/penny-utils';
import type { MouseEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Storybook } from 'storybook-utils';

import { VisuallyHidden } from '@/components/accessibility/VisuallyHidden/VisuallyHidden';
import { Container } from '@/components/containers/Container/Container';
import { Group } from '@/components/containers/Group/Group';
import { Text } from '@/components/dataDisplay/Text/Text';
import { Link } from '@/components/navigation/Link/Link';

import { columns, data, type PaymentIntent } from '../../__fixtures__/storybook-mock-data';
import type { TableColumnDef, UseTableOptions } from '../../hooks/types';
import { useTable } from '../../hooks/useTable';
import { Table } from '../../Table';
import { TableCell } from '../../TableCell/TableCell';

export const WithAdvancedFeaturesExample = (args: Partial<UseTableOptions<PaymentIntent>>) => {
  const FocusSkipToComponent = ({
    text,
    href,
    'data-testid': dataTestid,
  }: { text: string; href: string } & TestIdProp) => {
    const [isFocus, setFocus] = useState<boolean>(false);
    const linkRef = useRef<HTMLAnchorElement>(null);
    useEffect(() => {
      if (isFocus && linkRef) {
        setTimeout(() => {
          linkRef.current?.focus();
        }, 0);
      }
    }, [isFocus]);

    const onClick = (e: MouseEvent<HTMLLinkElement>) => {
      e.stopPropagation();
    };

    const renderContent = () => (
      <Text textStyle="body4" color="global.brand.700" key="focus-skip-to-component-key" shouldSupportEllipsis>
        <Container border="dashed">
          <Link
            data-testid={`focus-skip-to-component-${dataTestid}`}
            ref={linkRef}
            href={href}
            color="inherit"
            label={text}
            onClick={onClick}
            shouldSupportEllipsis
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        </Container>
      </Text>
    );
    return <>{isFocus ? renderContent() : <VisuallyHidden>{renderContent()}</VisuallyHidden>}</>;
  };

  const pinnedColumns: TableColumnDef<PaymentIntent>[] = useMemo(
    () =>
      columns.map((col) => {
        const isBillDetailsCol = col.id === 'billDetails';
        const shouldPinnedToLeft = isBillDetailsCol;
        const shouldPinnedToRight = col.id === 'actions';
        return {
          ...col,
          ...((shouldPinnedToLeft && { isPinnedToLeft: true }) || (shouldPinnedToRight && { isPinnedToRight: true })),
          ...(isBillDetailsCol && {
            cell: ({ row, rowIndex }) => (
              <TableCell>
                <Group variant="vertical">
                  {row.billDetails}
                  <FocusSkipToComponent
                    text="Skip to review and pay"
                    href="#bills-selection-footer-review-and-pay-button"
                    data-testid={`bills-pay-and-review-${rowIndex}`}
                  />
                </Group>
              </TableCell>
            ),
          }),
        };
      }),
    []
  );
  const tableProps = useTable({
    ...args,
    data,
    columns: pinnedColumns,
    onRowSelectionChange: () => {},
    onAllRowsSelectionChange: () => {},
    getRowSelectionAriaLabel: (row) => 'Vendor ' + row.billDetails,
    allRowsSelectionAriaLabel: 'Select all',
    rowsSelectionHeaderCellAriaLabel: 'Select Vendor',
    rowSelectionTooltips: {
      header: { content: 'Select all vendors' },
      row: ({ rowData }) =>
        rowData.amountToPay > 1300
          ? {
              content: `Recommend to mark vendor ${rowData.billDetails} since the amount to pay is $${rowData.amountToPay} which is more than the minimum of $1300`,
            }
          : undefined,
    },
  });

  return (
    <Storybook.Container
      paddingX="none"
      paddingY="none"
      maxHeight="100vh"
      width="full"
      maxWidth="1000px"
      overflow="auto"
    >
      <Group variant="vertical" width="full">
        <Storybook.Container paddingX="none" paddingY="none">
          <Table {...tableProps} />
        </Storybook.Container>
      </Group>
    </Storybook.Container>
  );
};
