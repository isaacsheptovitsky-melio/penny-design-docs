import { Controls, Description, DocsContext, Primary, Stories, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { FC, useContext } from 'react';
import { Storybook } from 'storybook-utils';

import { getStoryTitleParts } from '../utils';

const STORY_KIND_PATH_SEPARATOR = /\s*\/\s*/;

export const extractTitle = (title: string) => {
  const groups = title.trim().split(STORY_KIND_PATH_SEPARATOR);
  return groups?.[groups.length - 1] || title;
};

/**
 * This is a custom template to docs page
 * according to this: https://storybook.js.org/docs/writing-docs/autodocs#write-a-custom-template
 * Using DocsContext to get the story title, and then using it to set the header of the docs page.
 */
export const DSDocsPage: FC = () => {
  const context = useContext(DocsContext);
  const title = extractTitle(context.storyById().title);
  const includePrimaryInStories = !context.storyById().parameters?.docs?.hidePrimaryInStories;

  return (
    <>
      {title ? <Storybook.DocsPageTitle {...getStoryTitleParts(title)} /> : <Title />}
      <Subtitle />
      <Description />
      <Primary />
      <Controls />
      <Stories includePrimary={includePrimaryInStories} />
    </>
  );
};
