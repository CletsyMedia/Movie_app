/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_ACCESS_TOKEN: string;
    VITE_API_KEY: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
