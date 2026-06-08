import { chakra, forwardRef } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';

import {
  StatusIconSolid as _StatusIconSolid,
  type StatusIconSolidProps,
} from '@/components/foundations/StatusIconSolid';
import { useDataTestIdContext } from '@/utils/dataTestIdContext';

import { useSectionBannerContext } from './SectionBanner.context';
import type { SectionBannerVariant } from './SectionBanner.types';

const iconMapping: Record<
  SectionBannerVariant,
  Extract<StatusIconSolidProps['variant'], 'alert' | 'success' | 'help' | 'warning' | 'informative'>
> = {
  neutral: 'help',
  warning: 'warning',
  critical: 'alert',
  informative: 'informative',
  success: 'success',
  brand: 'help',
  secondary: 'help',
};

const StatusIconSolid = chakra(_StatusIconSolid);

export type SectionBannerIconProps = TestIdProp;

export const SectionBannerIcon = forwardRef<SectionBannerIconProps, 'div'>((props: SectionBannerIconProps, ref) => {
  const { variant } = useSectionBannerContext();
  const getTestId = useDataTestIdContext();

  return (
    <StatusIconSolid
      data-component="SectionBannerIcon"
      ref={ref}
      {...getTestId('icon')}
      variant={iconMapping[variant]}
      size="medium"
      aria-hidden
      {...props}
    />
  );
});

SectionBannerIcon.displayName = 'SectionBannerIcon';
