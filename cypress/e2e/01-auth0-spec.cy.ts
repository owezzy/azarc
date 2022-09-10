import * as jwt from 'jsonwebtoken';
import { environment } from '../../src/environments/environment';

if (environment.AUTH0_CLIENT_SECRET) {
  describe('Test Auth0 Authentication ', () => {
    it('Login Test User to Auth0', () => {
      cy.visit('/');
      cy.contains('azarc-solutions');

      // cy.loginByAuth0Api(
      //   Cypress.env('auth0_username'),
      //   Cypress.env('auth0_password')
      // );
      const username = environment.AUTH0_USERNAME;

      const log = Cypress.log({
        displayName: 'AUTH0 LOGIN',
        message: [`🔐 Authenticating | ${username}`],
        // @ts-ignore
        autoEnd: false,
      });

      log.snapshot('before');

      // login function
      cy.loginTestUser();

      //sign-out function
      cy.logOutTestUser();

      log.snapshot('after');
      log.end();
    });
  });
}
