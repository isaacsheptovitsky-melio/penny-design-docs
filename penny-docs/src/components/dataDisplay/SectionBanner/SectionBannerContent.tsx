import { chakra, forwardRef } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';
import { type PropsWithChildren } from 'react';

import { Group as _Group } from '@/components/containers/Group';
import { useDataTestIdContext } from '@/utils/dataTestIdContext';

import { useSectionBannerContext, useStyles } from './SectionBanner.context';

const Group = chakra(_Group);

export type SectionBannerContentProps = PropsWithChildren & TestIdProp;

export const SectionBannerContent = forwardRef<SectionBannerContentProps, 'div'>(
  ({ children, ...restProps }: SectionBannerContentProps, ref) => {
    const { isCompact } = useSectionBannerContext();
    const styles = useStyles();
    const getTestId = useDataTestIdContext();

    return (
      <Group
        data-component="SectionBannerContent"
        variant="vertical"
        justifyContent="center"
        spacing={isCompact ? 'none' : 'xxxs'}
        ref={ref}
        {...getTestId('content')}
        __css={styles['content']}
        {...restProps}
      >
        {children}
      </Group>
    );
  }
);

SectionBannerContent.displayName = 'SectionBannerContent';
