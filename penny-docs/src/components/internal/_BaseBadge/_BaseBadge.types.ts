import { type BoxProps } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';
import { type AriaAttributes, type ReactNode } from 'react';

/**
 * @private For internal use only.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export type _BaseBadgeProps = Pick<BoxProps, '__css'> &
  AriaAttributes &
  TestIdProp & {
    status: 'warning' | 'critical' | 'success' | 'neutral' | 'brand' | 'informative';
    label: string;
    type?: 'primary' | 'secondary' | 'tertiary';
    children?: never;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    leftElement?: ReactNode;
    rightElement?: ReactNode;
  };

// export for stories
export const statuses = ['warning', 'critical', 'success', 'neutral', 'brand', 'informative'];
