import type { TestIdProp } from '@melio/penny-utils';

import type { AvatarProps } from '../Avatar';
import type { TypographyDescriptionProps, TypographyMainLabelProps } from '../typography';

/**
 * Props for the main label component within `AvatarWithDetails`
 */
type MainLabelPropsType = Required<Pick<TypographyMainLabelProps, 'label'>> &
  Pick<TypographyMainLabelProps, 'pillProps' | 'data-testid'>;

export type AvatarWithDetailsProps = TestIdProp & {
  /**
   * The properties passed to the main label.
   */
  mainLabelProps: MainLabelPropsType;

  /**
   * The properties passed to the description.
   */
  descriptionProps?: Pick<TypographyDescriptionProps, 'action' | 'label'>;

  /**
   * Props passed to the `Avatar` component.
   */
  avatarProps: Pick<AvatarProps, 'name' | 'src' | 'badge' | 'bgColor'> & {
    size?: Extract<AvatarProps['size'], 'small' | 'medium'>;
  };

  /**
   * Determines if the component is disabled.
   */
  isDisabled?: boolean;

  /**
   * Props passed to show checkbox when hovering on the avatar
   */
  selectionProps?: {
    onSelect: (selected: boolean) => void;
    isSelected: boolean;
  };
};
