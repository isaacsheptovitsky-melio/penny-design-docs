import { Box } from '@chakra-ui/react';
import { type TestIdProp, useTestId } from '@melio/penny-utils';

import { useStyleConfig } from '@/theme/hooks/use-style-config';

import { type PromotionalModalProps } from '../PromotionalModal.types';

type PromotionalModalBodyProps = Pick<PromotionalModalProps, 'primaryButton' | 'secondaryButton'> & {
  asset: PromotionalModalProps['asset'];
  assetAspectRatio?: PromotionalModalProps['assetAspectRatio'];
  children: PromotionalModalProps['children'];
} & TestIdProp;

export const PromotionalModalBody = ({
  children,
  assetAspectRatio,
  asset,
  'data-testid': dataTestId = 'promotional-modal-body',
}: PromotionalModalBodyProps) => {
  const style = useStyleConfig('PromotionalModal', { assetAspectRatio });
  const getTestId = useTestId(dataTestId);

  return (
    <>
      <Box __css={style} data-aspect-ratio={assetAspectRatio} {...getTestId()}>
        {asset}
      </Box>
      {children}
    </>
  );
};

PromotionalModalBody.displayName = 'PromotionalModalBody';
