import MockDate from 'mockdate';
import { makeDecorator } from 'storybook/preview-api';
// Create a date mock decorator to control the dates/"today" date in stories (e.g. for snapshots).
// Based on the https://github.com/bitttttten/storybook-mock-date-decorator package.
export const mockDateDecorator = makeDecorator({
  name: 'withDate',
  parameterName: 'date',
  wrapper: (storyFn, context, { parameters: date }) => {
    MockDate.reset();
    if (date instanceof Date) {
      MockDate.set(date);
    }
    return storyFn(context);
  },
});
