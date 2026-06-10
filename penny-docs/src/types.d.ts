/// <reference types="vite/client" />

// ─── Static asset modules ─────────────────────────────────────────────────────
declare module '*.gif' {
  const src: string;
  export default src;
}
declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.jpg' {
  const src: string;
  export default src;
}
declare module '*.svg' {
  const src: string;
  export default src;
}
declare module '*.svg?raw' {
  const src: string;
  export default src;
}

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

type PathsToStringProps<T> = T extends string
  ? []
  : {
      [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>];
    }[Extract<keyof T, string>];

type Join<T extends string[], D extends string> = T extends []
  ? never
  : T extends [infer F]
    ? F
    : T extends [infer F, ...infer R]
      ? F extends string
        ? `${F}${D}${Join<Extract<R, string[]>, D>}`
        : never
      : string;

/*
OneOrNone
Allow at most one of n properties
*/
type OneOrNone<
  T extends {
    [key: string]: unknown;
  },
  P extends keyof T = keyof T,
> =
  | {
      [K in P]?: never;
    }
  | (P extends keyof T
      ? Pick<T, P> & {
          [K in keyof Omit<T, P>]?: never;
        }
      : never);

type Override<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

/**
 * `RequireAtLeastOne<T, Keys>` ensures that at least one of the properties in `Keys` must be present in `T`.
 * Referenced from https://stackoverflow.com/a/49725198
 */
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];
