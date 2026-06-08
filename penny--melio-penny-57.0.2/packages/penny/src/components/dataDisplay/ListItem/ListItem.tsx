import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { Group, type GroupProps } from '@/components/containers/Group';

import { Typography } from '../typography';
import type { ListItemProps } from './ListItem.types';

/**
 * `ListItem` component provides a structured layout for displaying hierarchical text content.
 */
export const ListItem = forwardRef<HTMLDivElement, ListItemProps>(
  (
    {
      labelProps,
      descriptionProps,
      mainLabelProps,
      isDisabled,
      isReadOnly,
      isInvalid,
      textAlign = 'start',
      'data-testid': dataTestId = 'list-item',
      ...props
    },
    ref
  ) => {
    const alignItemsMap: Record<Required<ListItemProps>['textAlign'], GroupProps['alignItems']> = {
      start: 'flex-start',
      center: 'center',
    };

    const getTestId = useTestId(dataTestId);

    return (
      <Group
        data-component="ListItem"
        ref={ref}
        {...props}
        {...getTestId()}
        variant="vertical"
        spacing="xxxs"
        alignItems={alignItemsMap[textAlign]}
      >
        {labelProps && <Typography.Label {...labelProps} {...getTestId('label')} isDisabled={isDisabled} />}
        <Group variant="vertical" spacing="none" alignItems={alignItemsMap[textAlign]}>
          <Typography.MainLabel
            {...mainLabelProps}
            {...getTestId('main-label')}
            isDisabled={isDisabled}
            isReadOnly={isReadOnly}
          />
          {descriptionProps && (
            <Typography.Description
              {...descriptionProps}
              {...getTestId('description')}
              isDisabled={isDisabled}
              isInvalid={isInvalid}
              isReadOnly={isReadOnly}
            />
          )}
        </Group>
      </Group>
    );
  }
);

ListItem.displayName = 'ListItem';
