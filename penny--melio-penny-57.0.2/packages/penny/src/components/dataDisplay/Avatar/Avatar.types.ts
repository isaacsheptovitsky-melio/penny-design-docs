import type { TestIdProp } from '@melio/penny-utils';
import type { ReactNode } from 'react';

import type { _BaseIconProps } from '../../internal';

/**
 * Set the avatar's background color
 */
export type AvatarColor = 'avatar1' | 'avatar2' | 'avatar3' | 'avatar4' | 'avatar5' | 'avatar6' | 'default';

/**
 * Determines the shape of the avatar
 */
export type AvatarVariant = 'circle' | 'square';

export type AvatarProps = {
  /**
   * The description of the content of the avatar.
   */
  name: string;

  /**
   * The source of the image of the avatar.
   */
  src?: string;

  /**
   * The alt text for the avatar image.
   * If not provided, defaults to "{name}".
   */
  alt?: string;

  /**
   * Determines if the avatar is selected.
   * @default false
   */
  isSelected?: boolean;

  /**
   * Determines if the avatar is disabled.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Click handler for the avatar
   */
  onClick?: VoidFunction;

  /**
   * The `data-testid` attribute for testing purposes.
   * @default 'avatar'
   */
  'data-testid'?: string;

  /**
   * Set the avatar's background color
   * @default 'default'
   */
  bgColor?: AvatarColor;

  /**
   * Determines the shape of the avatar.
   * @default 'circle'
   */
  variant?: AvatarVariant;

  /**
   * Determines the size of the avatar.
   * @default 'medium'
   */
  size?: Extract<_BaseIconProps['size'], 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large'>;

  /**
   * The element to set as badge.
   */
  badge?: ReactNode;
} & TestIdProp;
