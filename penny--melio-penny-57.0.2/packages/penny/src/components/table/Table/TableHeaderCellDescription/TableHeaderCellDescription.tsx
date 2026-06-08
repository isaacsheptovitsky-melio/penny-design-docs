import { forwardRef } from 'react';

import { Text } from '@/components/dataDisplay/Text/Text';

export type TableHeaderCellDescriptionProps = {
  text: string;
};

export const TableHeaderCellDescription = forwardRef<HTMLDivElement, TableHeaderCellDescriptionProps>(
  ({ text, ...restProps }, ref) => (
    <Text
      data-component="TableHeaderCellDescription"
      {...restProps}
      textStyle="body4"
      color="semantic.text.secondary"
      ref={ref}
    >
      {text}
    </Text>
  )
);

TableHeaderCellDescription.displayName = 'TableHeaderCellDescription';
