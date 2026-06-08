import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { SegmentedControl, SegmentedControlItem } from '..';
import { type SegmentedControlProps } from '../SegmentedControl.types';
import {
  defaultOnChangeMock,
  defaultSegments,
  defaultValue,
  type MultiRenderProps,
  type RenderProps,
  testMultiOptionSegmentedControl,
  testSegmentedControl,
} from './SegmentedControl.spec.util';

describe('SegmentedControl', () => {
  validateComponent<SegmentedControlProps>(SegmentedControl, 'SegmentedControl', {
    props: {},
  });
});

describe('Single option', () => {
  function renderSingleOptionComponent({
    segments = defaultSegments,
    value = defaultValue,
    onChange = defaultOnChangeMock,
  }: RenderProps = {}) {
    return renderComponent(
      <SegmentedControl onChange={onChange}>
        {segments.map(({ label, ...segmentProps }, index) => (
          <SegmentedControlItem
            key={index}
            {...segmentProps}
            checked={value === segmentProps.value}
            data-testid={`segmented-control.segment-${index + 1}`}
          >
            {label}
          </SegmentedControlItem>
        ))}
      </SegmentedControl>
    );
  }

  testSegmentedControl(renderSingleOptionComponent);
});

describe('Multi option', () => {
  function renderMultiOptionComponent({
    segments = defaultSegments,
    value = '1',
    values,
    onChange = defaultOnChangeMock,
  }: MultiRenderProps = {}) {
    return renderComponent(
      <SegmentedControl onChange={onChange} isMulti>
        {segments.map(({ label, ...segmentProps }, index) => (
          <SegmentedControlItem
            key={index}
            {...segmentProps}
            checked={values ? values.includes(segmentProps.value) : value === segmentProps.value}
            data-testid={`segmented-control.segment-${index + 1}`}
          >
            {label}
          </SegmentedControlItem>
        ))}
      </SegmentedControl>
    );
  }

  testSegmentedControl(renderMultiOptionComponent);

  testMultiOptionSegmentedControl(renderMultiOptionComponent);
});
