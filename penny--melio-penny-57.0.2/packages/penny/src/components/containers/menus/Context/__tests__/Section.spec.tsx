import { expect } from 'vitest';

import { renderComponent } from '@/test-utils/render.utils';

import { Section } from '../components/Section/Section';

describe('Section', () => {
  describe('Accessibility', () => {
    it('should render the section with the correct HTML tag and attributes', () => {
      const { getByTestId } = renderComponent(<Section label="label">Content</Section>);

      expect(getByTestId('section').tagName).toBe('UL');
      expect(getByTestId('section')).toHaveAttribute('role', 'group');
      expect(getByTestId('section-title').tagName).toBe('LI');
      expect(getByTestId('section-title')).toHaveAttribute('role', 'presentation');
      expect(getByTestId('section')).toHaveAttribute('aria-labelledby', getByTestId('section-title').id);
    });
  });
});
