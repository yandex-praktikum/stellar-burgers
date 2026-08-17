import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  use: {
    baseURL: 'http://localhost:4000',
    headless: true,
    serviceWorkers: 'block'
  },

  webServer: {
    command: 'npm start',
    url: 'http://localhost:4000',
    reuseExistingServer: true,
    timeout: 120000
  }
});
