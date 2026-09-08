/**
 * `process.env.BURGER_API_URL` is not a real Node global here: Vite replaces it
 * at build time via the `define` option in vite.config.ts, and injects it as a
 * page global in dev. Declared explicitly so browser code does not rely on
 * @types/node leaking in.
 */
declare const process: {
  env: {
    BURGER_API_URL: string;
  };
};
