import { forwardRef } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';

import { IconButton } from '@/components/action/IconButton';
import { useDataTestIdContext } from '@/utils/dataTestIdContext';

export type SectionBannerCloseButtonProps = TestIdProp;

export const SectionBannerCloseButton = forwardRef<SectionBannerCloseButtonProps, 'button'>(
  (props: SectionBannerCloseButtonProps, ref) => {
    const getTestId = useDataTestIdContext();

    return (
      <IconButton
        data-component="SectionBannerCloseButton"
        ref={ref}
        icon="close"
        {...getTestId('close-button')}
        aria-label="close"
        variant="naked"
        size="extra-small"
        {...props}
      />
    );
  }
);

SectionBannerCloseButton.displayName = 'SectionBannerCloseButton';
