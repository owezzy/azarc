import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    supportFile: false,
  },

  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts',
  },
  video: false,
  videoUploadOnPasses: false,
  waitForAnimations: true,
  chromeWebSecurity: false,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  projectId: 'azarc',
});
