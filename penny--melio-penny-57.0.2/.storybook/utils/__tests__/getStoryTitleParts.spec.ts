import { getStoryTitleParts } from '../getStoryTitleParts';

describe('getStoryTitleParts', () => {
  it("gets the only story's name", () => {
    expect(getStoryTitleParts('Storybook title')).toStrictEqual({ name: 'Storybook title', badgeType: undefined });
  });
  it("gets the story's name with badge type", () => {
    expect(getStoryTitleParts('Storybook title [pattern]')).toStrictEqual({
      name: 'Storybook title',
      badgeType: 'pattern',
    });
  });
});
