# Melio Web Platform

Hello!

![](https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif)

We're so glad you want to help us with this project and we want to give you the best experience doing so, as we want you to contribute more!  
It's important to know that this project is an infrastructure for Melio products and that makes it important to watch for bugs and breaking changes.  
To do so, we have rather strict process and conventions to contribute, as we want you to contribute code that will work for all the existing and future products of Melio.

Hope you will love working in the project, and our team is available for everything.

### Table of Contents

- [TL;DR Development Steps](#tldr-development-steps)
- [Mental Model](#mental-model)
- [Running Scripts](#running-scripts)
  - [Relevant Scripts](#relevant-scripts)
- [Linking to platform-app](#linking-to-platform-app)
- [Storybook](#storybook)
  - [How To Write a Story](#how-to-write-a-story)
  - [What Stories Should I Add](#what-stories-should-i-add)
    - [Main Story](#main-story)
    - [Scenario Stories](#scenario-stories)
    - [Controls](#controls)
- [Tests](#tests)
  - [Unit Testing](#unit-testing)
  - [Visual Testing](#visual-testing)
    - [Excluding Stories](#excluding-stories)
  - [Accessibility Testing](#accessibility-testing)
- [Create a Pull Request](#create-a-pull-request)
- [Developer Experience](#developer-experience)

---

# TL;DR Development Steps

To save you from reading everything and only then starting to work, here's the steps you need to do and their guidelines.

- Read the [coding conventions](#coding-conventions)
- Create a [tech-design](https://www.notion.so/meliopayments/Design-Doc-for-topic-39c8b41b16184698afc1f3558e4bf65e), and let us review and approve
- Use the [branch name](#git-branch-naming) taken from the Jira ticket
- Create the [component/widget](#contribute-to-our-packages), etc…
- [Create stories](#storybook) for the said component (if it's a component/widget/screen)
- Create [tests](#tests)
- [Open a PR](#create-a-pull-request)
- [Open a Champagne](https://www.youtube.com/watch?v=oHg5SJYRHA0) 🍾

---

# Mental Model

When we're talking about a platform the main thing we need to keep in mind is that we need to think about supporting many consumers, each of them wants the experience a bit different, with the same offering.

The platform allows Melio to white-label (embed its product inside another product) its product and the requirements change between each consumer we work with.

It can start with color changes!  
When white-labeling, the consumer is seeking to embed the Melio product in the most natural way so the end-user won't even know he's using Melio (this offers a smooth transition and helps gaining the user's trust in the system to make payments).

When we're working on the platform we **have** to think platform.  
Thinking how to implement a feature for 1 consumer is not enough.  
This solution probably won't work for the next consumer or the next afterwards.  
Can other consumers make use of the feature the way we're developing it?  
Are we developing something that in the following integrations will come back to bite us?

Think platform.

![](https://media3.giphy.com/media/xT0xeJpnrWC4XWblEk/200w.gif?cid=5a38a5a2jljygi1skp48dcagjmcgu14f7uygbuaybdetplrw&rid=200w.gif&ct=g)

# Running Scripts

This repository is a monorepo.  
That means we have several projects under the same roof.  
To help us work with dependencies, changes, releases and isolation - we're using 2 tools:

- [`lerna`](https://github.com/lerna/lerna) for projects orchestration.
- [`yarn`](https://yarnpkg.com/) as a package manager.

### Relevant Scripts

The root of the project has some scripts for you to use

| Script           | Description                                                            |
| ---------------- | ---------------------------------------------------------------------- |
| `yarn storybook` | Start the Storybook.                                                   |
| `yarn typecheck` | Check for TypeScript errors in all packages changed since origin/main. |
| `yarn lint`      | Run linting in all packages changed since origin/main.                 |
| `yarn test`      | Run vitest tests in all packages changed since origin/main.            |

---

# Linking to `platform-app`

We can link `penny` with the `platform-app` application.  
This will give us the power to see how changes in the design-system affect the usages **without us needing to release a version**.

To do this, you basically following the regular yarn link documentation.

**In DS**:  
From the root folder run the following commands:

```
yarn link --cwd packages/penny
```

**In App**:  
In the root (`platform-app`) folder - run

```
yarn link @melio/penny
```

To make sure it’s working - run `npm list @melio/penny` and you should see a redirect from the version listing of the package (see image)
It’s basically following the regular

![image](https://github-production-user-asset-6210df.s3.amazonaws.com/8065975/253285785-7c59df4f-7757-4e30-bdcc-f88394c80043.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20230718%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230718T100006Z&X-Amz-Expires=300&X-Amz-Signature=e125d1c580fe80b6e184901dc9b7f1053ec303a63c06d3f53a76da7474799110&X-Amz-SignedHeaders=host&actor_id=8065975&key_id=0&repo_id=371079632)

Now, if you change anything in the `penny` project, you would be able to see it in `platform-app` project.

![image](https://github-production-user-asset-6210df.s3.amazonaws.com/8065975/253284474-b563c4e0-57b2-4ac2-bbe3-22e3ae0b597c.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20230718%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230718T100144Z&X-Amz-Expires=300&X-Amz-Signature=e2a32db44537fa9561210d6cfadebfc2ee25a3be7cdc6ee0c97444f3a3e753d6&X-Amz-SignedHeaders=host&actor_id=8065975&key_id=0&repo_id=371079632)

---

# Storybook

Storybook is a fine fine fine tool that helps us build and present stand-alone components in a gallery-like view, while allowing us to manipulate them.

Stories are like documentation for the component's functionality and abilities.  
Instead of writing it with text, just show it to the world with actions~!

## How to write a story

Follow the [official instructions](https://storybook.js.org/docs/react/writing-stories/introduction) on how to write a story. We will later talk about how to add controls to show the capabilities of the component.

## What stories should I add?

We will have a main story, and other scenario stories (see sections below).  
You can also visit [our storybook](https://penny.melio.com) and see examples for stories.

### Main story

This is the component in its default state.
No added property should be added here.

<img width="1006" alt="image" src="https://user-images.githubusercontent.com/8065975/182140513-3f80909e-38c2-46d2-a074-9f31eca4cc8d.png">

The story's code can be as simple as this:

```tsx
export const Main: ComponentStory<typeof Button> = (args) => <Button {...args} />;
```

### Scenario stories

In these stories we want to show how the component looks and behaves in different scenarios (usually based on each prop).  
Let's take the scenarios for the button:

<img width="1008" alt="image" src="https://user-images.githubusercontent.com/8065975/182140622-c8aa462f-2e89-45f7-aa81-57eb5c2e6e0f.png">

<img width="1010" alt="image" src="https://user-images.githubusercontent.com/8065975/182140668-bca372b5-0f81-4e77-bcd4-1f166d9acc1f.png">

<img width="1013" alt="image" src="https://user-images.githubusercontent.com/8065975/182140742-a804cefe-8968-43ba-9c7d-8cbfefa03cb1.png">

<img width="1009" alt="image" src="https://user-images.githubusercontent.com/8065975/182140793-5a95cdb1-5164-44e5-91e9-ce15254e6f05.png">

<img width="1009" alt="image" src="https://user-images.githubusercontent.com/8065975/182141116-4e55f958-bdd7-4e97-8810-5fe481e04262.png">

<img width="1007" alt="image" src="https://user-images.githubusercontent.com/8065975/182141177-1b368361-b06c-4675-b551-64c0a7b76a74.png">

And so on...

### Controls

The idea of the controls in storybook is to allow the user to play with the component's capabilities and see them live.

For example - with the controls the user can see how a button in `secondary` variant and in loading state looks like.

It's also a great manifest of the component's capabilities (designers and developers can see if something is missing for a feature).

See the official guide to [controls](https://storybook.js.org/docs/react/essentials/controls) and the [`argeTypes`](https://storybook.js.org/docs/react/api/argtypes).

Let's create controls for the `Button` component according to the stories we have in the previous section.

```tsx
{
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the button.',
      table: { defaultValue: { summary: 'medium' }, type: { summary: 'small | medium | large' }, category: 'props' },
    },
    children: {
      control: 'text',
      description: 'The text inside the button',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'naked', 'success', 'danger'],
      description: 'The variant of the button.',
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: 'primary | secondary | tertiary | naked | success | danger' },
        category: 'props',
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Determines if the button is disabled.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isLoading: {
      control: 'boolean',
      description: 'Determines if the button is in loading state.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isFullWidth: {
      control: 'boolean',
      description: 'Determines if the button should take the full width of its container.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    icon: {
      description: 'Shows an icon before the label.',
      table: { type: { summary: 'React.ReactElement' }, category: 'props' },
    },
    onClick: {
      description: 'Handles the click event from the button.',
      table: {
        type: { summary: "DOMAttributes<HTMLButtonElement>['onClick']" },
        category: 'events',
      },
    },
  },
  args: {
    children: 'Button',
    isDisabled: false,
    isLoading: false,
    isFullWidth: false,
  },
}
```

This will yield you the following control panel:

<img width="1020" alt="image" src="https://user-images.githubusercontent.com/8065975/182141707-c3696fb4-522d-4841-907a-06f63b2a5e08.png">

\*Note that we want the initial state of the story to show the default states without stating them explicitly.  
So we don't add `variant: 'primary'` to the `args` section, as we want to test that the default value given in the code matches what we expect it to be.

### Showing Code Examples

When creating stories, it's often helpful to show the actual source code to users.
By default, Storybook shows the source code for the story. When the story is simple, it's enough.

However, when the story requires a more complex example, like:

- Requires internal state or effect.
- Has other smaller components that needs to be defined.
- Relays on constants or data structures that are shared between stories.

Storybook will not be able to show the complete source code of the story and will instead show something like:

```tsx
const tableProps = useTable({ ...args, data, columns, captionId, onRowClick: () => null });
```

This is not helpful for the user and it's not a good experience. To solve this, we use the following approach:

1. Create a new file named `<COMPONENT>.examples.tsx`.
2. In the story file, import the `module` as usual:

```tsx
import { ButtonExample } from './Button.examples';
```

and the raw file using the `?raw` suffix:

```tsx
import ButtonExamplesRaw from './Button.examples?raw';
```

> This is using built in `Vite`'s asset import [feature](https://vite.dev/guide/assets#importing-asset-as-string).
> This imports the file contents as a string rather than executing it as a module, allowing us to display the source code.

3. When adding the story, use the `extractComponentSource` utility to extract the source code:

```tsx
import { extractComponentSource } from 'test-utils/storybook.utils';

...

export const YourStory: StoryObj<YourComponent> = {
  // From the import above (step 2) ☝️
  render: () => <ButtonExample />,
  // Display the source code of the example
  parameters: { docs: { source: { code: extractComponentSource(ButtonExamplesRaw, 'ButtonExample') } } },
};
```

---

# Tests

🎉 ~~ Testing time ~~ 🎉

![](https://media.giphy.com/media/3i7zenReaUuI0/giphy.gif)

## Unit Testing

Our unit-tests (or integration tests) are done with [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

Our purpose in testing is to have confidence in our code that it works properly.

This directs us on what we want to test.  
Here's an [excellent article](https://kentcdodds.com/blog/how-to-know-what-to-test) by Kent C. Dodds that shows how to gain confidence with the testing.

See our [conventions on testing](#tests).

Each package has its own testing tools and additional conventions, so be sure to read and use them.

## Visual Testing

Visual tests, also called UI tests, or screenshot tests, catch bugs in UI appearance. They work by taking screenshots of every story and comparing them commit-to-commit to identify changes.

![](https://camo.githubusercontent.com/e770e5c46e9f4e92f5161fd35b60c8de78d8934a21a3d526f37d9995db22a505/68747470733a2f2f73746f7279626f6f6b2e6a732e6f72672f62326435636337356438346634353139653339306134393565626330623934392f636f6d706f6e656e742d76697375616c2d74657374696e672e676966)

For visual testing we're using [Chromatic](https://www.chromatic.com/features/test).  
Chromatic is a CI tool built especially for Storybook by the Storybook team.

This tool allows us among other things to:

- Capture screenshots of the stories and allow reviewing the changes in them.
- Provide a gate-keeping step to GitHub's pull-requests (if a component's UI was changed - it must be approved first by a reviewer).
- Deploy our storybook to the cloud and make it available with a link (see our [deployed storybook](https://penny.melio.com/)).

Chromatic is capturing screenshots automatically for every story of the component (this is done in the CI).
This is one of the reasons why it's super important to create stories for every variation of the component.

Chromatic is then comparing these screenshots with the last

Chromatic is saving these images in its database and compares them every run. See the next document as for how to resolve differences in the screenshots.

Learn more on screenshot testing in storybook [here](https://storybook.js.org/docs/react/writing-tests/visual-testing#catching-ui-changes).

### Excluding Stories

As Storybook is used for visual testing we might want to add stories that we want to visually test.  
This can include specific cases of a component, or regression tests.  
However, Storybook is most and foremost a documentation tool.  
It aims to help users see what he has in his arsenal.

#### Chromatic-only Stories

When you're adding a story that is intended to be tested, and does not yield any new value to the user - this is a sign that we need to hide this story for the user while still visually test it.

Take for example a bug in the `Button` component with `primary` variant that with the content `Tugi` looks broken.  
To visually test that this specific button looks correct, I create a story for a button with `variant="primary"` and its content is `Tugi`.  
We already have an example of how this kind of button will look like in the `variants` story.  
The story I created does not show anything new to the user, though I still need it to test a regression bug.

In this case, I will create a `Button.chromatic.stories.tsx` file next to the regular stories file, and I will put my story there.  
This is picked up by our configuration only when running in chromatic. When running locally you will not see it.

We will put all the chromatic stories in a root-level `Chromatic` folder and inside a folder with the name of the component so they won't be visible to the developers.

```tsx
// Button.chromatic.stories.tsx

export default {
  title: 'Chromatic/Button', // <-- This needs to match the title in `Button.stories.tsx` so they would sit together.
  component: Button,
};

export const TugiButton = () => (
  // ^ Don't use args here. State the props explicitly.
  <Button variant="primary">Tugi</Button>
);
```

#### Documentation-only Stories

On the other side of the previous section - if we want to enrich the documentation of a component, and show more examples,
and those examples don't give anything new to the tests coverage - we can disable the story's screenshot via a parameter.

See [Chromatic docs](https://www.chromatic.com/docs/disable-snapshots/#with-storybook) for more information.

```tsx
// Button.stories.tsx

export default {
  title: 'Action Components/Button', // <-- This needs to match the title in `Button.stories.tsx` so they would sit together.
  component: Button,
};

export const Main = () => <Button variant="primary">Button</Button>;

export const AnotherExampleStory = () => <Button variant="primary">I can also be this</Button>;

AnotherExampleStory.parameters = {
  chromatic: { disableSnapshot: true },
};
```

#### Accessibility Testing

Accessibility tests are done with [axe-playwright](https://www.npmjs.com/package/axe-playwright).

See [axe-playwright docs](https://www.npmjs.com/package/axe-playwright) for more information.
By default, all stories are tested for accessibility. You can find the rules at `.storybook/test-runner.ts`.

To customize a11y tests for specific components, you can use:

```tsx
// In your story
export default {
  title: 'Components/Example',
  parameters: {
    a11y: {
      // Test only a specific element
      context: '#my-component',
      // Override specific rules manually
      config: {
        rules: {
          'color-contrast': { enabled: true }, // Enable a rule that's disabled by default
        },
      },
      // Skip a11y tests entirely for this component
      // disable: true
    },
  },
};
```
