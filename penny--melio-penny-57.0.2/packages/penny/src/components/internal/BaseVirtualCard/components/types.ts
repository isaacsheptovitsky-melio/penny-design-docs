export type StringDigitOneToNine = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export type Month = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12';

export type StringDigit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export type Year = Exclude<`${StringDigit}${StringDigit}`, '00'>;
