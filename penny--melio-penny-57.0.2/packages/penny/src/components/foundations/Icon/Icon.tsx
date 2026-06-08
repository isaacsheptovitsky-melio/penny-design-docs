import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { _BaseIcon, type _BaseIconProps, iconColorMapping } from '@/components/internal/_BaseIcon';

import type { IconProps, IconSize } from './Icon.types';
import { ICON_DEFAULT_DATA_TEST_ID } from './Icon.utils';

const iconSizeToBaseIconSize: Partial<Record<IconSize, _BaseIconProps['size']>> = {
  'extra-small': 'extra-small',
  small: 'small',
  large: 'medium',
};

export const Icon = forwardRef<HTMLSpanElement, IconProps>(
  (
    { size = 'large', type, color = 'default', 'data-testid': dataTestId = ICON_DEFAULT_DATA_TEST_ID, ...rest },
    ref
  ) => {
    const getTestId = useTestId(dataTestId);

    // Passing medium instead of large to the _BaseIcon component in order to get sizes 16px and 24px
    const iconSize = iconSizeToBaseIconSize[size] ?? 'medium';

    return (
      <_BaseIcon
        data-component="Icon"
        {...getTestId()}
        ref={ref}
        size={iconSize}
        type={type}
        color={iconColorMapping[color]}
        {...rest}
      />
    );
  }
);

Icon.displayName = 'Icon';
