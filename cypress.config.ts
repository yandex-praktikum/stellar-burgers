import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    viewportWidth: 1024,
    viewportHeight: 768,
    video: false,
    baseUrl: 'http://localhost:4000',
    setupNodeEvents(on, config) {
      // implement node event listeners her
    }
  }
});
