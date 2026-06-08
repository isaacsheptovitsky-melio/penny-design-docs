import type { Decorator, StoryContext, StoryFn } from '@storybook/react-vite';

export const syncSourceCodeDecorator: Decorator = (StoryComponent: StoryFn, context: StoryContext) => {
  const { parameters } = context;

  // If this story has source code specified in docs parameters Sync it to the storysource parameters
  if (parameters.docs?.source?.code) {
    parameters.storySource = {
      ...parameters.storySource,
      source: parameters.docs.source.code,
    };
  }

  return <StoryComponent />;
};
