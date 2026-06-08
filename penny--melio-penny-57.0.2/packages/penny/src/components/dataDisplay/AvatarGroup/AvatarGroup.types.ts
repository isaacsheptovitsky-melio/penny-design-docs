import type { TestIdProp } from '@melio/penny-utils';

import { type AvatarProps } from '../Avatar';

/**
 * Props for individual avatar items within an avatar group
 */
export type AvatarItemProps = Pick<AvatarProps, 'name' | 'src' | 'bgColor' | 'data-testid'>;

export type AvatarGroupProps = {
  /**
   * An array of the avatar-group's list items
   */
  items: AvatarItemProps[];
} & TestIdProp;
