import type { FC } from 'react';
import { expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { Illustration } from '../Illustration';

const SuccessIllustration: FC = () => <svg xmlns="http://www.w3.org/2000/svg" data-testid="success-illustration-svg" />;

describe('Illustration', () => {
  validateComponent(Illustration, 'Illustration', {
    props: { type: 'success' },
    defaultDataTestId: 'illustration',
  });

  it('can override an illustration using the theme', () => {
    const { getByTestId } = renderComponent(<Illustration type="success" />, {
      themeOptions: { illustrations: { success: SuccessIllustration } },
    });

    expect(getByTestId('success-illustration-svg')).toBeInTheDocument();
  });
});
