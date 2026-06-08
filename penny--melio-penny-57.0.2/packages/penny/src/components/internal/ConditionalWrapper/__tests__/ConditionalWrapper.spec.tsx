import { Box } from '@chakra-ui/react';
import { type ReactNode } from 'react';
import { Storybook } from 'storybook-utils';
import { expect } from 'vitest';

import { renderComponent } from '../../../../test-utils';
import { ConditionalWrapper } from '..';

const props = {
  condition: true,
  wrapper: (children: ReactNode) => <Box data-testid="wrapper">{children}</Box>,
  children: <Storybook.ContentPlaceholder />,
};

describe('ConditionalWrapper', () => {
  it('the conditional wrapper renders properly when the condition is true', () => {
    const { getByTestId } = renderComponent(<ConditionalWrapper {...props} />);
    expect(getByTestId('wrapper')).toBeInTheDocument();
  });
  it('the conditional wrapper should not render when the condition is false', () => {
    const { queryByTestId } = renderComponent(<ConditionalWrapper {...props} condition={false} />);
    expect(queryByTestId('wrapper')).not.toBeInTheDocument();
  });
});
