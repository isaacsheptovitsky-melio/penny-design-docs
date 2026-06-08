import * as useHasOverflow from '@melio/penny-utils/src/hooks/useHasOverflow';
import { expect } from 'vitest';

import { renderComponent } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { Text } from '../Text';
import type { TextProps } from '../Text.types';

describe('Text', () => {
  validateComponent<TextProps>(Text, 'Text', {
    props: { children: 'Label' },
  });

  it('Renders the title attribute when shouldSupportEllipsis is true', () => {
    vi.spyOn(useHasOverflow, 'useHasOverflow').mockImplementation(() => ({ hasOverflowX: true, hasOverflowY: false }));

    const { getByTestId } = renderComponent(
      <Text data-testid="text-test" shouldSupportEllipsis>
        Long test test test test test
      </Text>
    );
    expect(getByTestId('text-test')).toHaveAttribute('title', 'Long test test test test test');
  });

  it('Doesnt render the title attribute when shouldSupportEllipsis is false.', () => {
    vi.spyOn(useHasOverflow, 'useHasOverflow').mockImplementation(() => ({ hasOverflowX: true, hasOverflowY: false }));

    const { getByTestId } = renderComponent(
      <Text data-testid="text-test" shouldSupportEllipsis={false}>
        Long test test test test test
      </Text>
    );
    expect(getByTestId('text-test')).not.toHaveAttribute('title');
  });
});
