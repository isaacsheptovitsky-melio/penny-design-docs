import { GridItem, type GridItemProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

/**
 * @private
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export type _ContentBoxProps = Pick<GridItemProps, 'colSpan' | 'children'>;

/**
 * @private Please use `Form.ContentBox` from `@melio/penny`.
 */
export const _ContentBox = forwardRef<HTMLDivElement, _ContentBoxProps>((props, ref) => (
  <GridItem data-component="_ContentBox" {...props} ref={ref} />
));

_ContentBox.displayName = '_ContentBox';
