import { type BoxProps } from '@chakra-ui/react';
import type { TestIdProp } from '@melio/penny-utils';
import type { ReactNode } from 'react';

import type { AspectRatio } from '@/components/media/Image';

import type { BaseModalProps } from '../BaseModal';
import type { ModalBodyTabIndex, ModalButtons } from '../Modal/Modal.types';

export type PromotionalModalProps = BaseModalProps &
  ModalBodyTabIndex &
  ModalButtons & {
    /** The promotional asset (image, video, or custom content) to display. */
    asset: ReactNode;
    /** The aspect ratio for the promotional asset. @default '7 / 3' */
    assetAspectRatio?: AspectRatio;
    /** The header text for the promotional modal. */
    header: string;
    /** Additional props for the header container. */
    headerProps?: BoxProps;
    /** The main content of the modal body. */
    children?: ReactNode;
    /** @deprecated - Put this content in the `body` of the modal. */
    footer?: ReactNode;
  } & TestIdProp;
