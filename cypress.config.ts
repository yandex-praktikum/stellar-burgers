import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    // Increase timeouts for more reliable tests
    defaultCommandTimeout: 30000,
    requestTimeout: 30000,
    responseTimeout: 30000,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts'
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack'
    },
    supportFile: false
  }
});
