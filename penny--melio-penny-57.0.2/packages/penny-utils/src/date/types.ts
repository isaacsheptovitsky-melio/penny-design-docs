import { TimeZone } from './timeZone.types';

export const DEFAULT_DATE_TIME_FORMAT: DateTimeFormat = 'MMM d, yyyy';

export type DateTimeFormat =
  | 'MMM d, yyyy'
  | 'EEE, MMM d, yyyy'
  | 'EEEE, MMM d, yyyy'
  | 'dd/MM/yyyy'
  | 'MM/dd/yyyy'
  | 'MM/dd/yyyy, hh:mm aa'
  | 'MM/yyyy';

export type DateTimeOptions = {
  timeZone?: TimeZone;
};

export type DateTimeFormatOptions = DateTimeOptions & {
  format?: DateTimeFormat;
};

export type DateType = string | number | Date;

export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export enum Month {
  JAN,
  FEB,
  MAR,
  APR,
  MAY,
  JUN,
  JUL,
  AUG,
  SEP,
  OCT,
  NOV,
  DEC,
}

export enum Day {
  SUN,
  MON,
  TUE,
  WED,
  THU,
  FRI,
  SAT,
}

export const DaysInOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
