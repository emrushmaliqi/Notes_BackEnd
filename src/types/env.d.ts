declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      ATLAS_URI: string;
      SECRET: string;
    }
  }
}

export {};
