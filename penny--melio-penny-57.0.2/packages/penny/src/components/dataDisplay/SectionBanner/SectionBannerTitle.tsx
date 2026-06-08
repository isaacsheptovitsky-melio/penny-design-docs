import { chakra, forwardRef } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';
import { type PropsWithChildren } from 'react';

import { Text as _Text } from '@/components/dataDisplay/Text';
import { useDataTestIdContext } from '@/utils/dataTestIdContext';

import { useStyles } from './SectionBanner.context';

const Text = chakra(_Text);
export type SectionBannerTitleProps = PropsWithChildren & TestIdProp;

export const SectionBannerTitle = forwardRef<SectionBannerTitleProps, 'div'>(
  ({ children, ...restProps }: SectionBannerTitleProps, ref) => {
    const getTestId = useDataTestIdContext();
    const styles = useStyles();

    return (
      <Text
        data-component="SectionBannerTitle"
        ref={ref}
        textStyle="body3Semi"
        {...getTestId('title')}
        as="div"
        __css={styles['title']}
        {...restProps}
      >
        {children}
      </Text>
    );
  }
);

SectionBannerTitle.displayName = 'SectionBannerTitle';
