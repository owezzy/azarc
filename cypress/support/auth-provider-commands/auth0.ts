// @ts-check
///<reference path="../../global.d.ts" />
import * as jwt from 'jsonwebtoken';

Cypress.Commands.add(
  'loginByAuth0Api',
  (username: string, password?: string) => {
    const log = Cypress.log({
      displayName: 'AUTH0 LOGIN',
      message: [`🔐 Authenticating | ${username}`],
      // @ts-ignore
      autoEnd: false,
    });

    const client_id = Cypress.env('auth0_client_id');
    const client_secret = Cypress.env('auth0_client_secret');
    const audience = Cypress.env('auth0_audience');
    const scope = Cypress.env('auth0_scope');

    log.snapshot('before');

    cy.request({
      method: 'POST',
      url: `https://${Cypress.env('auth0_domain')}/oauth/token`,
      body: {
        grant_type: 'password',
        username,
        password,
        audience,
        scope,
        client_id,
        client_secret,
      },
    }).then(({ body }) => {
      const user: any = jwt.decode(body.id_token);

      const userItem = {
        token: body.access_token,
        user: {
          sub: user.sub,
          nickname: user.nickname,
          picture: user.name,
          email: user.email,
        },
      };

      window.localStorage.setItem('auth0Cypress', JSON.stringify(userItem));

      log.snapshot('after');
      log.end();
    });

    cy.visit('/');
  }
);

Cypress.Commands.add('loginTestUser', () => {
  const username = Cypress.env('auth0_username');
  const password = Cypress.env('auth0_password');

  const usernameInput = cy.get('.auth0-lock-input-email');
  if (usernameInput) {
    cy.get('.auth0-lock-input-email').type(username);
    cy.get('.auth0-lock-input-show-password').type(password);
    cy.get('.auth0-lock-submit').click();
    cy.wait(1000);
    cy.url().should('include', ['/employees']);
  }
});

Cypress.Commands.add('logOutTestUser', () => {
  const menu = cy.get(
    '.mat-toolbar > .mat-focus-indicator > .mat-button-wrapper > .mat-icon'
  );
  cy.get('.mat-drawer-inner-container');
  menu.click();
  cy.wait(1000);

  const signOut = cy.get(':nth-child(3) > .mat-list-item-content');

  signOut.click({ force: true });
  cy.wait(1000);
  cy.url().should('include', ['https://owezzy.auth0.com/login']);
});
