import { chakra, forwardRef } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';
import { type PropsWithChildren } from 'react';

import { Text as _Text } from '@/components/dataDisplay/Text';
import { useDataTestIdContext } from '@/utils/dataTestIdContext';

import { useStyles } from './SectionBanner.context';

const Text = chakra(_Text);

export type SectionBannerDescriptionProps = PropsWithChildren & TestIdProp;

export const SectionBannerDescription = forwardRef<SectionBannerDescriptionProps, 'div'>(
  ({ children, ...restProps }: SectionBannerDescriptionProps, ref) => {
    const getTestId = useDataTestIdContext();
    const styles = useStyles();

    return (
      <Text
        data-component="SectionBannerDescription"
        ref={ref}
        textStyle="body3"
        {...getTestId('description')}
        as="div"
        __css={styles['description']}
        {...restProps}
      >
        {children}
      </Text>
    );
  }
);

SectionBannerDescription.displayName = 'SectionBannerDescription';
