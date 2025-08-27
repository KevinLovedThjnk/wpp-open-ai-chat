/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APPS_FACADE_BASE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.scss' {
  const src: Record<string, string>
  export default src
}

declare module '*.svg' {
  const src: string
  export default src
}
