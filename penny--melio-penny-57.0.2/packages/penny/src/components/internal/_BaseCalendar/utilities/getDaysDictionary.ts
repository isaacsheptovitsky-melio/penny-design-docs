import { type DayType } from '../hooks';

/**
 * Converts an array of DayType objects into a dictionary-like object
 * where keys are the timestamp's date and values are DayType object.
 */
export const getDaysDictionary = (days: DayType[]) =>
  days.reduce(
    (acc, day) => {
      if (!day) return acc;

      acc[day.date.getTime()] = day;
      return acc;
    },
    {} as { [key: string]: DayType }
  );
