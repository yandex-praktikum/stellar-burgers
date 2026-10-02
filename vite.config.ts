import { createHash } from 'node:crypto';

import react from '@vitejs/plugin-react';
import { checker } from 'vite-plugin-checker';
import sassDts from 'vite-plugin-sass-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig, loadEnv } from 'vite';

const hash = (input: string): string =>
  createHash('sha256').update(input).digest('hex').slice(0, 5);

/* Читаемые имена классов CSS-модулей вида `profile__container_15a39`.
   Путь нормализуется: при разрешении `composes` на Windows postcss-modules
   передаёт путь с `\`, и без нормализации имя класса не совпадёт с тем,
   что сгенерировано при прямом импорте модуля. */
const generateScopedName = (name: string, filename: string): string => {
  const parts = filename.split('?')[0].replace(/\\/g, '/').split('/');
  const baseFilename = (parts.pop() ?? '').replace(/(\.module)?\.\w+$/, '');
  const className = `${baseFilename}__${name}`;

  return `${className}_${hash(`${hash(parts.join('/'))}-${className}`)}`;
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [checker({
      typescript: { tsconfigPath: 'tsconfig.app.json' }
    }), react(), sassDts({
      enabledMode: ['development'],
      esmExport: true
    }), tsconfigPaths()],
    base: '',
    css: {
      modules: { generateScopedName }
    },
    define: {
      'process.env.BURGER_API_URL': JSON.stringify(env.BURGER_API_URL ?? '')
    },
    server: {
      open: true
    },
  };
});
