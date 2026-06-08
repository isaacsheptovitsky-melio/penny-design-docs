import { useTestId } from '@melio/penny-utils';
import React, { forwardRef } from 'react';

import { Modal } from '../Modal';
import { PromotionalModalBody } from './components';
import { type PromotionalModalProps } from './PromotionalModal.types';

/**
 * A modal component designed for promotional content with visual assets.
 * Combines text content with images or videos for marketing purposes.
 */
export const PromotionalModal = forwardRef<HTMLDivElement, PromotionalModalProps>(
  (
    {
      header,
      primaryButton,
      secondaryButton,
      children,
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      footer,
      asset,
      assetAspectRatio = '7 / 3',
      'data-testid': dataTestId = 'promotional-modal',
      ...props
    },
    ref
  ) => {
    const getTestId = useTestId(dataTestId);

    return (
      <Modal
        header={header}
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        footer={footer}
        primaryButton={primaryButton}
        secondaryButton={secondaryButton}
        data-component="PromotionalModal"
        {...getTestId()}
        {...props}
        ref={ref}
      >
        <PromotionalModalBody asset={asset} assetAspectRatio={assetAspectRatio} {...getTestId('content')}>
          {children}
        </PromotionalModalBody>
      </Modal>
    );
  }
);

PromotionalModal.displayName = 'PromotionalModal';
