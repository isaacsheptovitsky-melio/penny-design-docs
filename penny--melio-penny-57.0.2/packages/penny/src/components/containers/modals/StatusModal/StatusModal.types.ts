import { type BoxProps } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';
import { type ReactNode } from 'react';

import { type StatusIconSolidProps } from '@/components/foundations/StatusIconSolid';

import { type BaseModalProps } from '../BaseModal';
import { type ModalBodyTabIndex, type ModalButtons } from '../Modal/Modal.types';

export const criticalVariants = ['cancel', 'decline', 'alert'];

export type StatusModalProps = BaseModalProps &
  ModalBodyTabIndex &
  ModalButtons & {
    /** The header text for the status modal. */
    header: string;
    /** Additional props for the header container. */
    headerProps?: BoxProps;
    /** The status variant that determines the icon and styling. */
    variant: StatusIconSolidProps['variant'];
    /** The main content of the modal body. */
    children?: ReactNode;
    /** @deprecated - Put this content in the `body` of the modal. */
    footer?: ReactNode;
  } & TestIdProp;
