import { validateComponent } from '../../../../test-utils/__tests__/component.validation';
import { CalendarLegend, type CalendarLegendProps } from '../components';

describe('Calendar Legend', () => {
  validateComponent<CalendarLegendProps>(CalendarLegend, 'CalendarLegend', {
    props: {
      label: 'Label',
    },
  });
});
