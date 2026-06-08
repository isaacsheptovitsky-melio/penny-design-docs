/// <reference types="vite/client" />

declare module '*.jpg' {
  const path: string;
  export = path;
}

declare module '*.png' {
  const path: string;
  export = path;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface ImportMetaEnv {
  readonly VITE_ASSETS_CDN: string;
  // more env variables...
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
