import { forwardRef } from 'react';

import { Group, GroupItem } from '@/components/containers/Group';
import { Text, type TextProps } from '@/components/dataDisplay/Text';

import { FloatingMenuItem } from '../../../FloatingMenu';
import type { MenuItemProps } from './MenuItem.types';

const variantColor: Record<NonNullable<MenuItemProps['variant']>, TextProps['color']> = {
  critical: 'semantic.text.critical.rest',
  default: 'inherit',
};

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>((props, ref) => {
  const {
    label,
    disabled,
    onClick,
    variant = 'default',
    dataTestId,
    leftElement,
    rightElement,
    textStyle = 'inline',
    ...rest
  } = props;

  const itemContent = (
    <>
      <Group alignItems="center" width="full">
        {leftElement}
        <Text textStyle={textStyle} color={variantColor[variant]}>
          {label}
        </Text>
        <GroupItem grow={1} />
        {rightElement}
      </Group>
    </>
  );

  return (
    <FloatingMenuItem
      ref={ref}
      data-component="MenuItem"
      data-testid={dataTestId}
      onClick={!disabled ? () => onClick?.('content') : undefined}
      disabled={disabled}
      {...rest}
    >
      {itemContent}
    </FloatingMenuItem>
  );
});

MenuItem.displayName = 'MenuItem';
