import { act, screen } from '@testing-library/react';
import { expect } from 'vitest';

import { renderComponent } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { _SectionLabel } from '../_SectionLabel';

describe('_SectionLabel', () => {
  validateComponent(_SectionLabel, '_SectionLabel', { props: { label: 'title' }, defaultDataTestId: 'section-label' });

  it('renders tooltip when hovering the icon indicator', async () => {
    const tooltipLabel = 'Hi!';
    const { user } = renderComponent(<_SectionLabel label="Hello" tooltipProps={{ content: tooltipLabel }} />);

    await act(async () => user.hover(screen.getByTestId('icon-indicator')));

    expect(screen.getByText(tooltipLabel)).toBeInTheDocument();
  });
});
