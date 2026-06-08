import { describe, expect, it } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { useLinearProgressContext } from '../LinearProgress.context';
import { LinearProgressIndicator } from '../LinearProgressIndicator';
import { LinearProgressRoot } from '../LinearProgressRoot';
import { type LinearProgressRootProps } from '../LinearProgressRoot';
import { LinearProgressTrack } from '../LinearProgressTrack';

describe('LinearProgress', () => {
  validateComponent<LinearProgressRootProps>(LinearProgressRoot, 'LinearProgressRoot', {
    props: {
      value: 50,
      children: (
        <LinearProgressTrack>
          <LinearProgressIndicator />
        </LinearProgressTrack>
      ),
    },
    defaultDataTestId: 'linear-progress',
  });

  it('renders all three components working together', () => {
    const { getByTestId } = renderComponent(
      <LinearProgressRoot value={50} max={100} data-testid="test-root">
        <LinearProgressTrack data-testid="test-track">
          <LinearProgressIndicator data-testid="test-indicator" />
        </LinearProgressTrack>
      </LinearProgressRoot>
    );

    expect(getByTestId('test-root')).toBeInTheDocument();
    expect(getByTestId('test-track')).toBeInTheDocument();
    expect(getByTestId('test-indicator')).toBeInTheDocument();
  });

  it('renders with correct value and max props', () => {
    const { getByTestId } = renderComponent(
      <LinearProgressRoot value={30} max={100} data-testid="test-root">
        <LinearProgressTrack data-testid="test-track">
          <LinearProgressIndicator data-testid="test-indicator" />
        </LinearProgressTrack>
      </LinearProgressRoot>
    );

    const root = getByTestId('test-root');
    expect(root).toHaveAttribute('aria-valuenow', '30');
    expect(root).toHaveAttribute('aria-valuemax', '100');
  });

  it('uses default max value of 100 when not provided', () => {
    const { getByTestId } = renderComponent(
      <LinearProgressRoot value={50} data-testid="test-root">
        <LinearProgressTrack data-testid="test-track">
          <LinearProgressIndicator data-testid="test-indicator" />
        </LinearProgressTrack>
      </LinearProgressRoot>
    );

    const root = getByTestId('test-root');
    expect(root).toHaveAttribute('aria-valuemax', '100');
    expect(root).toHaveAttribute('aria-valuenow', '50');
  });

  it('clamps negative values to 0', () => {
    const { getByTestId } = renderComponent(
      <LinearProgressRoot value={-10} max={100} data-testid="test-root">
        <LinearProgressTrack data-testid="test-track">
          <LinearProgressIndicator data-testid="test-indicator" />
        </LinearProgressTrack>
      </LinearProgressRoot>
    );

    const root = getByTestId('test-root');
    expect(root).toHaveAttribute('aria-valuenow', '0');
    expect(getByTestId('test-indicator')).toBeInTheDocument();
  });

  it('clamps values over max to max', () => {
    const { getByTestId } = renderComponent(
      <LinearProgressRoot value={150} max={100} data-testid="test-root">
        <LinearProgressTrack data-testid="test-track">
          <LinearProgressIndicator data-testid="test-indicator" />
        </LinearProgressTrack>
      </LinearProgressRoot>
    );

    const root = getByTestId('test-root');
    expect(root).toHaveAttribute('aria-valuenow', '100');
    expect(getByTestId('test-indicator')).toBeInTheDocument();
  });

  it('has correct ARIA attributes on root', () => {
    const { getByTestId } = renderComponent(
      <LinearProgressRoot value={50} max={100} data-testid="test-root">
        <LinearProgressTrack data-testid="test-track">
          <LinearProgressIndicator data-testid="test-indicator" />
        </LinearProgressTrack>
      </LinearProgressRoot>
    );

    const root = getByTestId('test-root');
    expect(root).toHaveAttribute('role', 'progressbar');
    expect(root).toHaveAttribute('aria-label', 'Progress');
    expect(root).toHaveAttribute('aria-valuemin', '0');
    expect(root).toHaveAttribute('aria-valuemax', '100');
    expect(root).toHaveAttribute('aria-valuenow', '50');
  });

  it('updates when context value changes', () => {
    const TestChild = () => {
      const { value, max } = useLinearProgressContext();
      return <div data-testid="context-value">{`${value}/${max}`}</div>;
    };

    const { getByTestId, rerender } = renderComponent(
      <LinearProgressRoot value={30} max={100} data-testid="test-root">
        <LinearProgressTrack data-testid="test-track">
          <LinearProgressIndicator data-testid="test-indicator" />
          <TestChild />
        </LinearProgressTrack>
      </LinearProgressRoot>
    );

    expect(getByTestId('context-value')).toHaveTextContent('30/100');
    expect(getByTestId('test-indicator')).toBeInTheDocument();

    rerender(
      <LinearProgressRoot value={60} max={200} data-testid="test-root">
        <LinearProgressTrack data-testid="test-track">
          <LinearProgressIndicator data-testid="test-indicator" />
          <TestChild />
        </LinearProgressTrack>
      </LinearProgressRoot>
    );

    expect(getByTestId('context-value')).toHaveTextContent('60/200');
    expect(getByTestId('test-indicator')).toBeInTheDocument();
  });

  it('supports function children with context access', () => {
    const { getByTestId } = renderComponent(
      <LinearProgressRoot value={75} max={100} data-testid="test-root">
        {({ value, max }) => (
          <LinearProgressTrack data-testid="test-track">
            <LinearProgressIndicator data-testid="test-indicator" />
            <div data-testid="context-display">{`${value}/${max}`}</div>
          </LinearProgressTrack>
        )}
      </LinearProgressRoot>
    );

    expect(getByTestId('test-indicator')).toBeInTheDocument();
    expect(getByTestId('context-display')).toHaveTextContent('75/100');
  });

  it('handles values over 100% correctly (clamped)', () => {
    const { getByTestId } = renderComponent(
      <LinearProgressRoot value={150} max={100} data-testid="test-root">
        <LinearProgressTrack data-testid="test-track">
          <LinearProgressIndicator data-testid="test-indicator" />
        </LinearProgressTrack>
      </LinearProgressRoot>
    );

    const root = getByTestId('test-root');
    expect(root).toHaveAttribute('aria-valuenow', '100');
    expect(getByTestId('test-indicator')).toBeInTheDocument();
  });

  it('handles custom max values correctly', () => {
    const { getByTestId } = renderComponent(
      <LinearProgressRoot value={25} max={50} data-testid="test-root">
        <LinearProgressTrack data-testid="test-track">
          <LinearProgressIndicator data-testid="test-indicator" />
        </LinearProgressTrack>
      </LinearProgressRoot>
    );

    const root = getByTestId('test-root');
    expect(root).toHaveAttribute('aria-valuemax', '50');
    expect(root).toHaveAttribute('aria-valuenow', '25');
    expect(getByTestId('test-indicator')).toBeInTheDocument();
  });
});
