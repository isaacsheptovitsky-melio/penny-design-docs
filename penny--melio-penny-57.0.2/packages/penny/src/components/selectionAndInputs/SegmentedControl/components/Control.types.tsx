import { type TestIdProp } from '@melio/penny-utils';
import { type HTMLAttributes, type PropsWithChildren } from 'react';

import { type SegmentedControlProps } from '../SegmentedControl.types';

export type ControlProps = PropsWithChildren<
  TestIdProp & Pick<SegmentedControlProps, 'isFullWidth'> & HTMLAttributes<HTMLDivElement>
>;
