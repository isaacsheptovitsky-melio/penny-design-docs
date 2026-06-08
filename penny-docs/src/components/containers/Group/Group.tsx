import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { Children, forwardRef, Fragment, isValidElement } from 'react';

import { useStyleConfig } from '@/theme/hooks/use-style-config';

import type { GroupProps } from './Group.types';
import { GroupVariants } from './Group.utils';
import { GroupDivider } from './GroupDivider';

/**
 * A layout component that arranges its children in horizontal or vertical flow.
 * Provides flexible spacing, alignment, and optional dividers between elements.
 */
export const Group = forwardRef<HTMLDivElement, GroupProps>(
  (
    {
      children,
      spacing = 's',
      variant = GroupVariants.horizontal,
      hasDivider,
      width = 'auto',
      height = 'auto',
      as,
      allowOverflowX,
      dividerProps,
      ...props
    },
    ref
  ) => {
    const style = useStyleConfig('Group', { variant, spacing, width, height, allowOverflowX });
    // "toArray" removes null values
    const childrenArr = Children.toArray(children);
    const isList = as === 'ul' || as === 'ol';
    const getChildIndex = (child: ReactNode, index: number) => (isValidElement(child) ? child.key : index);
    return (
      <Box data-component="Group" {...props} as={as} ref={ref} __css={style}>
        {childrenArr.map((child, index) =>
          hasDivider && index + 1 < childrenArr.length ? (
            <Fragment key={getChildIndex(child, index)}>
              {child}
              <GroupDivider
                key={index}
                isVertical={variant === GroupVariants.horizontal}
                dividerProps={{ as: isList ? 'li' : 'div', ...dividerProps }}
              />
            </Fragment>
          ) : (
            <Fragment key={getChildIndex(child, index)}>{child}</Fragment>
          )
        )}
      </Box>
    );
  }
);

Group.displayName = 'Group';
