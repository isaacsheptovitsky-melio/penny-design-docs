import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Floater from 'react-floater';

import { Beacon } from './components';
import { TourPopover } from './components/TourPopover';
import type { Action, TourtipProps, TourtipStep } from './Tourtip.types';
import { getElement, isElementVisible } from './tourtip.utils';

const DEFAULT_BEACON_OFFSET: [number, number] = [0, -24];

/**
 * `Tourtip` component provides guided tours with step-by-step instructions.
 */
export const Tourtip = ({
  run = true,
  steps,
  onTourStart,
  onNextClick,
  onPrevClick,
  onTourComplete,
  onTargetNotFound,
  onStepChange,
  onTourDismiss,
  onTourMinimize,
  onBeaconClick,
  defaultLabels,
  stepIndex,
  defaultStepIndex = stepIndex ?? 0,
  defaultIsMinimize = false,
  enableMinimize = false,
  disableScrolling = false,
  'data-testid': dataTestId = 'tourtip',
  shouldTrapFocus = true,
}: TourtipProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const isRunningRef = useRef(run);

  // Updates the internal running state synchronously using a ref (to avoid re-renders and infinite loops).
  // Also manually updates the DOM `data-state` attribute to reflect the current state for testing and styling purposes.
  // This avoids the need for additional React state, while still keeping the UI and tests in sync.
  const setRunning = (value: boolean) => {
    isRunningRef.current = value;
    // reset action when restarting
    if (value) {
      setAction('ready');
    }
    if (rootRef.current) {
      rootRef.current.setAttribute('data-state', value ? 'open' : 'closed');
    }
  };

  const [currentIndex, setCurrentIndex] = useState(stepIndex ?? defaultStepIndex);
  // TODO:https://meliorisk.atlassian.net/browse/ME-110373
  // eslint-disable-next-line react-hooks/refs
  const [isMinimize, setIsMinimize] = useState<boolean>(defaultIsMinimize && !isRunningRef.current);
  const isControlled = stepIndex !== undefined;

  const step = useMemo(
    () => steps[isControlled ? stepIndex : currentIndex] as TourtipStep,
    [steps, isControlled, stepIndex, currentIndex]
  );

  const { target, placement = 'bottom-end', beaconOffset = DEFAULT_BEACON_OFFSET, ...stepProps } = step;
  const isLastStep = currentIndex === steps.length - 1;
  const [action, setAction] = useState<Action>('ready');

  useEffect(() => {
    if (run !== undefined) {
      setRunning(run);
    }
  }, [run]);

  useEffect(() => {
    if (enableMinimize) {
      setRunning(!defaultIsMinimize);
      setIsMinimize(defaultIsMinimize);
    }
  }, [enableMinimize, defaultIsMinimize]);

  useEffect(() => {
    if (isControlled) {
      setCurrentIndex(stepIndex);
    }
  }, [isControlled, stepIndex]);

  const handleBeaconClick = useCallback(() => {
    if (enableMinimize && isMinimize) {
      setRunning(true);
      setIsMinimize(false);
      onBeaconClick?.({ currentIndex });
    }
  }, [currentIndex, enableMinimize, isMinimize, onBeaconClick]);

  const resetTour = useCallback(() => {
    setRunning(false);
    if (isControlled) return;
    setCurrentIndex(defaultStepIndex);
  }, [defaultStepIndex, isControlled]);

  const handleMinimizeClick = useCallback(() => {
    if (enableMinimize) {
      setRunning(false);
      setIsMinimize(true);
      onTourMinimize?.({ currentIndex });
    }
  }, [enableMinimize, onTourMinimize, currentIndex]);

  const handleNextClick = useCallback(() => {
    setAction('next');

    if (isLastStep) {
      resetTour();
      onTourComplete?.({ currentIndex });
    } else if (currentIndex >= 0) {
      const newIndex = currentIndex + 1;
      onNextClick?.({ currentIndex, newIndex: !isControlled ? newIndex : undefined });

      if (isControlled) return;

      setCurrentIndex(newIndex);
    }
  }, [currentIndex, isLastStep, isControlled, onNextClick, onTourComplete, resetTour]);

  const handlePrevClick = useCallback(() => {
    const newIndex = currentIndex - 1;
    setAction('prev');
    onPrevClick?.({ currentIndex, newIndex: !isControlled ? newIndex : undefined });

    if (isControlled) return;

    setCurrentIndex(newIndex);
  }, [currentIndex, isControlled, onPrevClick]);

  const handleDismissClick = useCallback(() => {
    resetTour();
    onTourDismiss?.({ currentIndex });
  }, [currentIndex, onTourDismiss, resetTour]);

  useEffect(() => {
    if (!isRunningRef.current) return;

    const element = getElement(target);
    const elementExists = !!element;

    if (elementExists && isElementVisible(element)) {
      if (action === 'ready' && currentIndex === defaultStepIndex) {
        onTourStart?.({ currentIndex });
        setAction('start');
      }
      if (!disableScrolling) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onTargetNotFound?.({ currentIndex, action });
      console.warn(elementExists ? 'Target not visible' : 'Target not mounted', step); // eslint-disable-line no-console

      const newIndex = action === 'prev' ? currentIndex - 1 : currentIndex + 1;

      if (currentIndex >= 0 && action !== 'prev') {
        if (isLastStep) {
          resetTour();
          onTourComplete?.({ currentIndex });
        } else {
          if (isControlled) return;
          onStepChange?.({ currentIndex, newIndex: !isControlled ? newIndex : undefined });
          setCurrentIndex(newIndex);
        }
      } else {
        if (isControlled) return;
        onStepChange?.({ currentIndex, newIndex: !isControlled ? newIndex : undefined });
        setCurrentIndex(newIndex);
      }
    }
  }, [
    isControlled,
    target,
    currentIndex,
    step,
    isLastStep,
    action,
    defaultStepIndex,
    disableScrolling,
    onStepChange,
    onTourComplete,
    onTargetNotFound,
    onTourStart,
    resetTour,
  ]);

  const progressText =
    defaultLabels?.progressLabel ??
    (defaultLabels?.progressSeparator
      ? `${currentIndex + 1} ${defaultLabels.progressSeparator} ${steps.length}`
      : undefined);

  const getTestId = useTestId(dataTestId);

  return (
    <Box
      ref={rootRef}
      data-component="Tourtip"
      {...getTestId()}
      key={`Tourtip-${currentIndex}`}
      // TODO:https://meliorisk.atlassian.net/browse/ME-110373
      // eslint-disable-next-line react-hooks/refs
      data-state={isRunningRef.current ? 'open' : 'closed'}
    >
      <Floater
        // TODO:https://meliorisk.atlassian.net/browse/ME-110373
        // eslint-disable-next-line react-hooks/refs
        open={isMinimize || isRunningRef.current}
        component={
          <TourPopover
            {...stepProps}
            {...getTestId(`popover-${currentIndex}`)}
            placement={placement}
            // TODO:https://meliorisk.atlassian.net/browse/ME-110373
            // eslint-disable-next-line react-hooks/refs
            isOpen={isRunningRef.current}
            nextButtonLabel={step?.nextButtonLabel || defaultLabels.nextButtonLabel}
            prevButtonLabel={
              currentIndex > 0 || defaultStepIndex > 0
                ? step?.prevButtonLabel || defaultLabels.prevButtonLabel
                : undefined
            }
            footerText={progressText}
            onNextClick={handleNextClick}
            onPrevClick={handlePrevClick}
            onCloseClick={handleDismissClick}
            onOutsideClick={handleMinimizeClick}
            triggerProps={!enableMinimize ? { 'aria-expanded': undefined } : undefined}
            shouldTrapFocus={shouldTrapFocus}
          >
            <Beacon
              onClick={handleBeaconClick}
              {...getTestId(`beacon-${currentIndex}`)}
              {...(enableMinimize
                ? { cursor: 'pointer', 'aria-label': step?.beaconAriaLabel, as: 'button' }
                : { cursor: 'default', 'aria-expanded': undefined })}
            />
          </TourPopover>
        }
        target={target}
        placement={placement}
        styles={{
          floaterOpening: {
            filter: 'none',
          },
        }}
        hideArrow
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: beaconOffset ?? DEFAULT_BEACON_OFFSET,
            },
          },
        ]}
      />
    </Box>
  );
};

Tourtip.displayName = 'Tourtip';
