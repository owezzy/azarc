import { defineConfig } from 'cypress';
import { environment } from './src/environments/environment';

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
    auth0_username: environment.AUTH0_USERNAME,
    auth0_password: environment.AUTH0_PASSWORD,
    auth0_domain: environment.AZARC_AUTH0_DOMAIN,
    auth0_scope: environment.AZARC_APP_AUTH0_SCOPE,
    auth0_client_id: environment.AZARC_APP_AUTH0_CLIENTID,
    auth0_client_secret: environment.AUTH0_CLIENT_SECRET,
  },
});
