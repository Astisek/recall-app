/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
interface ImportMetaEnv {
  readonly MAIN_VITE_STORE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
