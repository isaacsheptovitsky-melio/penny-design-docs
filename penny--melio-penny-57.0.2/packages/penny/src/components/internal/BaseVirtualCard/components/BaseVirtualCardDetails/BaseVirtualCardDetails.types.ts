import { type TestIdProp } from '@melio/penny-utils';
import { type AriaAttributes, type MouseEvent, type ReactNode } from 'react';

/**
 * @private
 */
export type BaseVirtualCardDetailsProps = {
  label: string;
  mainLabel: ReactNode;
  onCopy?: (e?: MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  variant?: 'default' | 'inverse';
  enableCopy?: boolean;
  dataDogPrivacy?: 'allow' | 'mask' | 'hidden' | 'mask-user-input';
} & TestIdProp &
  AriaAttributes;
