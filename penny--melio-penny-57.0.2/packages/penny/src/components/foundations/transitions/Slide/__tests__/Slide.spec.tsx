import * as pennyUtils from '@melio/penny-utils';
import { describe, expect, it, vi } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { Slide } from '../Slide';
import type { SlideProps } from '../Slide.type';

describe('Slide component', () => {
  validateComponent<SlideProps>(Slide, 'Slide', { props: { in: true, children: 'Content' } });

  it('renders ChakraSlide by default', () => {
    vi.spyOn(pennyUtils, 'isAndroid').mockImplementation(() => false);

    const { getByTestId } = renderComponent(
      <Slide in direction="left" data-testid="slide">
        Test Content
      </Slide>
    );

    const chakraSlide = getByTestId('slide');
    expect(chakraSlide).toHaveAttribute('data-component', 'Slide');
  });

  it('renders alternative slide', () => {
    const { getByTestId } = renderComponent(
      <Slide in direction="left" data-testid="slide" shouldRenderAlternativeSlide>
        Test Content
      </Slide>
    );

    const alternativeSlide = getByTestId('slide-alternative-slide');
    expect(alternativeSlide).toHaveAttribute('data-component', 'AlternativeSlide');
  });

  it('applies correct props', () => {
    vi.spyOn(pennyUtils, 'isAndroid').mockImplementation(() => false);

    const { getByTestId } = renderComponent(
      <Slide in direction="top" style={{ background: 'red' }} data-testid="slide">
        Test Content
      </Slide>
    );

    const chakraSlide = getByTestId('slide');
    expect(chakraSlide).toHaveStyle('background: red');
  });
});
