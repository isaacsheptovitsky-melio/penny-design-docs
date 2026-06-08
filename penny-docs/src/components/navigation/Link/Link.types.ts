import type { TestIdProp } from '@melio/penny-utils';
import type { AriaAttributes, MouseEventHandler } from 'react';

export type LinkProps = StandaloneLinkProps | InlineLinkProps;

/** The size of the link - the size being relevant only for the standalone variant. */
export type Sizes = 'large' | 'medium';

/** The color of the link. */
export type LinkColor = 'default' | 'inverse' | 'inherit' | 'secondary';

/** The variant of the link. */
export type LinkVariant = 'standalone' | 'inline';

type LinkBasicProps = TestIdProp &
  AriaAttributes & {
    /** The link address. */
    href: string;
    /** The label of the link. */
    label: string;
    children?: never;
    /** Determines whether the link opens in a new browser tab or in the current tab. */
    newTab?: boolean;
    /** Handles the click event of the link. */
    onClick?: MouseEventHandler<HTMLLinkElement>;
    /** If passed, would render text-ellipsis when the label is too long. */
    shouldSupportEllipsis?: boolean;
    /** The color of the link. @default 'default' */
    color?: LinkColor;
    /** Determines if the link is disabled. */
    isDisabled?: boolean;
    /** Determines if the link's font is bold - bold styles relevant only for the standalone variant. */
    isBold?: boolean;
  };

type StandaloneLinkProps = LinkBasicProps & {
  /** The variant of the link. @default 'inline' */
  variant?: 'standalone';
  /** The size of the link - the size being relevant only for the standalone variant. @default 'medium' */
  size?: Sizes;
};

type InlineLinkProps = LinkBasicProps & {
  /** The variant of the link. @default 'inline' */
  variant?: 'inline';
  size?: never;
};
