import { Box } from '@chakra-ui/react';

import { Group } from '@/components/containers/Group';
import { Avatar } from '@/components/dataDisplay/Avatar';
import { BrandSymbol } from '@/components/dataDisplay/BrandSymbol';
import { Pill } from '@/components/dataDisplay/Pill';
import { Text } from '@/components/dataDisplay/Text';
import { Typography } from '@/components/dataDisplay/typography';
import { Icon } from '@/components/foundations/Icon';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { type Option } from '../BaseSelect.types';

type OptionContentProps<T> = Pick<
  Option<T>,
  'avatarProps' | 'pillProps' | 'description' | 'label' | 'leftIcon' | 'rightIcon'
> & {
  isSelected?: boolean;
};

export const OptionContent = <T,>({
  avatarProps,
  leftIcon,
  rightIcon,
  pillProps,
  description,
  label,
  isSelected,
}: OptionContentProps<T>) => {
  const styles = useMultiStyleConfig('BaseSelect', {});

  return (
    <>
      {leftIcon && <BrandSymbol type={leftIcon} size="small" />}
      {avatarProps && (
        <Avatar {...avatarProps} name={avatarProps.name ?? label} size="small" isSelected={isSelected} aria-hidden />
      )}
      <Group variant="vertical" spacing="xxs">
        <Group spacing="xxs" alignItems="center">
          <Text textStyle="inline" color="inherit" shouldSupportEllipsis>
            {label}
          </Text>
          {rightIcon && <Icon type={rightIcon} size="small" />}
          {pillProps && <Pill type="secondary" {...pillProps} />}
        </Group>
        {description && <Typography.Description label={description} />}
      </Group>
      {isSelected && (
        <Box __css={styles['checkedIcon']}>
          <Icon type="checked" color="brand" size="small" />
        </Box>
      )}
    </>
  );
};

OptionContent.displayName = 'BaseSelect.OptionContent';
