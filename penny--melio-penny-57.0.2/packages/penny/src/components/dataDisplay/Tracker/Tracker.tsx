import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { Children, cloneElement, forwardRef, isValidElement, type ReactElement } from 'react';

import { useStyleConfig } from '@/theme/hooks/use-style-config';

import {
  type DataAttributes,
  DEFAULT_TRACKER_STATUS,
  DEFAULT_TRACKER_VARIANT,
  DEFAULT_TRACKER_WIDTH,
  type TrackerProps,
} from './Tracker.types';
import { TrackerContext } from './TrackerContext';

/**
 * The `Tracker` component shows progress through a multi-step process.
 */
export const Tracker = forwardRef<HTMLDivElement, TrackerProps>(
  (
    {
      variant = DEFAULT_TRACKER_VARIANT,
      status = DEFAULT_TRACKER_STATUS,
      width = DEFAULT_TRACKER_WIDTH,
      children,
      'data-testid': dataTestId = 'tracker',
      ...props
    },
    ref
  ) => {
    const styles = useStyleConfig('Tracker', { variant });
    const getTestId = useTestId(dataTestId);

    const stepsAmount = Children.count(children);

    // Map over children and add index prop
    const childrenWithData = Children.map(children, (child, index) => {
      const isSingle = (1 === stepsAmount && 'true') || undefined;
      const isFirstElement = (!isSingle && index === 0 && 'true') || undefined;
      const isLastElement = (!isSingle && index === stepsAmount - 1 && 'true') || undefined;
      // Add `data-is-first`|`data-is-last`|`data-is-single` attributes to children to detect first/last/single elements for styling.
      return isValidElement(child)
        ? cloneElement(child as ReactElement<DataAttributes>, {
            'data-is-first': isFirstElement,
            'data-is-last': isLastElement,
            'data-is-single': isSingle,
            'data-index': `${index}`,
          })
        : null;
    });

    return (
      <TrackerContext.Provider value={{ variant, width, stepsAmount, status, ...getTestId() }}>
        <Box as="ol" data-component="Tracker" {...getTestId()} ref={ref} __css={styles} {...props}>
          {childrenWithData}
        </Box>
      </TrackerContext.Provider>
    );
  }
);

Tracker.displayName = 'Tracker';
