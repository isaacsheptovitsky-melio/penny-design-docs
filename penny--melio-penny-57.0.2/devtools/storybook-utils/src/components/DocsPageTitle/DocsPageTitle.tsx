import { Box } from '@chakra-ui/react';

import { Badge, BadgeProps } from '../Badge';

export type DocsPageTitleProps = {
  /**
   * The Docs Page's title
   */
  name: string;
  /**
   * The Docs Page's type (it will be used to render a badge with the component's type)
   */
  badgeType?: BadgeProps['type'];
};

export const DocsPageTitle = ({ name, badgeType }: DocsPageTitleProps) => (
  <Box data-component="DocsPageTitle">
    <h1>{name}</h1>
    {badgeType && <Badge type={badgeType} />}
  </Box>
);

DocsPageTitle.displayName = 'Storybook.DocsPageTitle';
