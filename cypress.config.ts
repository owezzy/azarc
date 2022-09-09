// @ts-nocheck

import { defineConfig } from 'cypress';
require('dotenv').config();

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    baseUrl: 'http://localhost:4200',
    supportFile: 'cypress/support/commands.ts',
    chromeWebSecurity: false,
    waitForAnimations: true,
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
  screenshotOnRunFailure: true,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  projectId: 'azarc',
  env: {
    auth0_username: process.env.AUTH0_USERNAME,
    auth0_password: process.env.AUTH0_PASSWORD,
    auth0_domain: process.env.AZARC_AUTH0_DOMAIN,
    auth0_scope: process.env.AZARC_APP_AUTH0_SCOPE,
    auth0_client_id: process.env.AZARC_APP_AUTH0_CLIENTID,
    auth0_client_secret: process.env.AZARC_CLIENT_SECRET,
  },
});
