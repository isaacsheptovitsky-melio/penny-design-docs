import { BadgeProps } from 'storybook-utils';

const storyTags = ['pattern', 'deprecated', 'new', 'composable'];

const isStoryTagType = (type: string) => storyTags.includes(type);

export const removeTagFromName = (name: string, strMatch: string) => name.replace(strMatch, '').trim();

export const getStoryTitleParts = (name: string) => {
  const badgeRegex = /\[([^)]+)]/gi;
  const [badgeTagMatch, badgeNameType] = badgeRegex.exec(name) || [];

  return {
    name: badgeTagMatch ? removeTagFromName(name, badgeTagMatch) : name,
    badgeType: badgeNameType && isStoryTagType(badgeNameType) ? (badgeNameType as BadgeProps['type']) : undefined,
  };
};
