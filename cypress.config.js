const { defineConfig } = require('cypress');

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    baseUrl: 'http://localhost:4200',
    supportFile: 'cypress/support/commands.ts',
    chromeWebSecurity: false,
    waitForAnimations: true,
    video: false,
    videoUploadOnPasses: false,
    screenshotOnRunFailure: true,
    retries: {
      runMode: 2,
      openMode: 0,
    },
  },

  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts',
  },

  projectId: 'azarc',
});
