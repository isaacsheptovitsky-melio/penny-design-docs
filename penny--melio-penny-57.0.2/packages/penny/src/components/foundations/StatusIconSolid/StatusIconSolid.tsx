import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { _BaseIcon } from '@/components/internal/_BaseIcon';
import type { IconKey } from '@/theme/icons';

import { ColorStyle } from './StatusIconSolid.theme.utils';
import { type StatusIconSolidProps, statusIconSolidType } from './StatusIconSolid.types';
import { DEFAULT_DATA_TEST_ID } from './StatusIconSolid.utils';

export const StatusIconSolid = forwardRef<HTMLDivElement, StatusIconSolidProps>(
  ({ variant, size, 'data-testid': dataTestId = DEFAULT_DATA_TEST_ID, ...rest }, ref) => {
    const iconType = statusIconSolidType[variant] as IconKey;
    const getTestId = useTestId(dataTestId);

    return (
      <_BaseIcon
        ref={ref}
        type={iconType}
        size={size}
        color={ColorStyle[variant]}
        data-component="StatusIconSolid"
        {...getTestId()}
        {...rest}
      />
    );
  }
);

StatusIconSolid.displayName = 'StatusIconSolid';
