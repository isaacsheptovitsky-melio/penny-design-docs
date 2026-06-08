import { type BoxProps } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';
import { type AriaAttributes, type HTMLAttributes, type ReactNode } from 'react';

import { type ButtonProps } from '@/components/action/Button';

import { type BaseModalProps } from '../BaseModal';

type ModalButtonProps = Pick<ButtonProps, 'isDisabled' | 'isLoading' | 'loadingText'> & {
  /** The label text for the button. */
  label: string;
  /** Callback fired when the button is clicked. */
  onClick?: VoidFunction;
} & AriaAttributes;

export type ModalButtons = {
  /** Configuration for the primary action button. */
  primaryButton?: ModalButtonProps & {
    /** The style variant of the primary button. */
    variant: 'primary' | 'critical';
  };
  /** Configuration for the secondary action button. */
  secondaryButton?: ModalButtonProps & {
    /** The style variant of the secondary button. */
    variant: 'tertiary' | 'secondary';
  };
};

export type ModalBodyTabIndex = {
  /** The tab index for the modal body for accessibility. */
  bodyTabIndex?: HTMLAttributes<HTMLDivElement>['tabIndex'];
};

export type ModalProps = BaseModalProps &
  ModalButtons &
  ModalBodyTabIndex & {
    /** The header content. Can be a string or custom ReactNode. */
    header: string | ReactNode;
    /** Additional props for the header container. */
    headerProps?: BoxProps;
    /** The main content of the modal body. */
    children?: ReactNode;
    /**
     * @deprecated - Put this content in the `body` of the modal.
     */
    footer?: ReactNode;
  } & TestIdProp;
