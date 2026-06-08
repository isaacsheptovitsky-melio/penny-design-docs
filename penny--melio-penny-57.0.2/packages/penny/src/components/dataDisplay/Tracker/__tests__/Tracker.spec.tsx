import { expect } from 'vitest';

import { renderComponent } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import type { TrackerStepDescriptionProps, TrackerStepTitleProps } from '..';
import { Tracker, TrackerStep, TrackerStepDescription, TrackerStepTitle } from '..';
import type { TrackerProps } from '../Tracker.types';

type StepMetadata = {
  title: TrackerStepTitleProps;
  description?: TrackerStepDescriptionProps;
};

const steps: StepMetadata[] = [
  { title: { label: 'Step 1' }, description: { label: 'Month XX, 20XX' } },
  { title: { label: 'Step 2' } },
  {
    title: { label: 'Step 3' },
    description: { label: 'Description text' },
  },
];

const renderChildren = (steps: StepMetadata[], currentStepIndex: number = 0) =>
  steps.map((step, index) => (
    <TrackerStep
      key={`tracker-step-${index}`}
      isActive={index === currentStepIndex}
      isCompleted={index < currentStepIndex}
    >
      <TrackerStepTitle {...step.title} />
      {step.description && <TrackerStepDescription {...step.description} />}
    </TrackerStep>
  ));

describe('Tracker', () => {
  validateComponent<TrackerProps>(Tracker, 'Tracker', {
    props: {
      children: renderChildren(steps),
    },
    defaultDataTestId: 'tracker',
    componentParts: [
      'step-0',
      'step-1',
      'step-2',
      'step-0-indicator',
      'step-1-indicator',
      'step-2-indicator',
      'step-0-content',
      'step-1-content',
      'step-2-content',
    ],
  });

  it('set the tracker to have 3 steps', () => {
    const currentStepIndex = 0;
    const { getByTestId } = renderComponent(
      <Tracker data-testid="tracker-test">{renderChildren(steps, currentStepIndex)}</Tracker>
    );

    expect(getByTestId('tracker-test').childNodes.length).toBe(3);
  });

  it('renders list of steps', () => {
    const currentStepIndex = 0;
    const { getByTestId, getAllByRole } = renderComponent(
      <Tracker data-testid="tracker-test">{renderChildren(steps, currentStepIndex)}</Tracker>
    );

    const tracker = getByTestId('tracker-test');
    expect(tracker.tagName).toBe('OL');
    expect(getAllByRole('listitem').length).toBe(3);
  });

  it('the active list item marks as aria-current', () => {
    const currentStepIndex = 0;
    const { getAllByRole } = renderComponent(
      <Tracker data-testid="tracker-test">{renderChildren(steps, currentStepIndex)}</Tracker>
    );
    getAllByRole('listitem').forEach((listItem, index) => {
      expect(listItem.getAttribute('aria-current')).toBe(index === currentStepIndex ? 'step' : null);
    });
  });

  it('list items marks with the correct data attributes', () => {
    const currentStepIndex = 1;
    const { getAllByRole } = renderComponent(
      <Tracker data-testid="tracker-test">{renderChildren(steps, currentStepIndex)}</Tracker>
    );
    const items = getAllByRole('listitem');
    expect((items[0] as HTMLElement).getAttribute('data-is-first')).toBe('true');
    expect((items[0] as HTMLElement).getAttribute('data-is-completed')).toBe('true');
    expect((items[1] as HTMLElement).getAttribute('data-is-active')).toBe('true');
    expect((items[2] as HTMLElement).getAttribute('data-is-last')).toBe('true');
  });

  it('single item in tracker gets the correct data attribute', () => {
    const currentStepIndex = 1;
    const { getAllByRole } = renderComponent(
      <Tracker data-testid="tracker-test">
        {renderChildren([{ title: { label: 'Step 1' }, description: { label: 'Month XX, 20XX' } }], currentStepIndex)}
      </Tracker>
    );
    const items = getAllByRole('listitem');
    expect(items.length).toBe(1);
    expect((items[0] as HTMLElement).getAttribute('data-is-single')).toBe('true');
  });
});
